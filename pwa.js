(() => {
  'use strict';

  const script = document.currentScript;
  const rootUrl = script ? new URL('.', script.src) : new URL('.', window.location.href);
  const css = document.createElement('style');
  css.textContent = `
    .pwa-connection-status{position:fixed;z-index:10020;top:.7rem;left:50%;max-width:calc(100vw - 1.5rem);min-height:42px;padding:.62rem .85rem;display:flex;align-items:center;gap:.55rem;border:1px solid rgba(253,203,110,.38);border-radius:999px;background:rgba(25,26,38,.96);color:#fdcb6e;box-shadow:0 14px 34px rgba(0,0,0,.32);font:750 .78rem/1.3 Inter,system-ui,sans-serif;transform:translate(-50%,-140%);opacity:0;pointer-events:none;transition:transform .22s ease,opacity .22s ease}
    .pwa-connection-status.visible{transform:translate(-50%,0);opacity:1}
    .pwa-connection-status.online{border-color:rgba(0,184,148,.4);color:#55efc4}
    .pwa-install-card{position:fixed;z-index:10010;right:1rem;bottom:1rem;width:min(380px,calc(100vw - 2rem));padding:1rem;display:grid;grid-template-columns:auto minmax(0,1fr);gap:.8rem;border:1px solid rgba(0,210,211,.3);border-radius:14px;background:linear-gradient(135deg,rgba(0,210,211,.09),rgba(108,92,231,.09)),rgba(25,26,38,.97);box-shadow:0 22px 55px rgba(0,0,0,.4);font-family:Inter,system-ui,sans-serif;color:#fff}
    .pwa-install-card[hidden]{display:none}
    .pwa-install-icon{width:44px;height:44px;display:grid;place-items:center;border-radius:12px;background:rgba(0,210,211,.14);color:#55efc4;font-size:1.05rem}
    .pwa-install-copy{min-width:0}.pwa-install-copy strong,.pwa-install-copy span{display:block}.pwa-install-copy strong{font-size:.92rem}.pwa-install-copy span{margin-top:.2rem;color:#a3a8ba;font-size:.74rem;line-height:1.45}
    .pwa-install-actions{grid-column:1/-1;display:flex;gap:.55rem}.pwa-install-actions button{min-height:42px;padding:.55rem .8rem;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#fff;font:800 .76rem Inter,system-ui,sans-serif;cursor:pointer}.pwa-install-actions button[data-pwa-install]{flex:1;border-color:transparent;background:linear-gradient(135deg,#6c5ce7,#00b8b8)}
    .pwa-install-actions button:focus-visible{outline:3px solid rgba(85,239,196,.4);outline-offset:2px}
    @media(max-width:768px){.pwa-install-card{bottom:calc(82px + env(safe-area-inset-bottom));right:.75rem;width:calc(100vw - 1.5rem)}.pwa-install-actions button{min-height:44px}}
    @media(prefers-reduced-motion:reduce){.pwa-connection-status{transition:none}}
  `;
  document.head.appendChild(css);

  const safeStorage = {
    get(key) { try { return localStorage.getItem(key); } catch (error) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (error) {} }
  };

  const connectionStatus = document.createElement('div');
  connectionStatus.className = 'pwa-connection-status';
  connectionStatus.setAttribute('role', 'status');
  connectionStatus.setAttribute('aria-live', 'polite');
  document.body.appendChild(connectionStatus);
  let statusTimer = 0;

  const showConnectionStatus = online => {
    window.clearTimeout(statusTimer);
    connectionStatus.classList.toggle('online', online);
    connectionStatus.innerHTML = online
      ? '<i class="fa-solid fa-wifi" aria-hidden="true"></i><span>Conexión recuperada. Todo vuelve a estar actualizado.</span>'
      : '<i class="fa-solid fa-cloud-arrow-down" aria-hidden="true"></i><span>Sin conexión. Puedes seguir usando el contenido disponible.</span>';
    connectionStatus.classList.add('visible');
    if (online) statusTimer = window.setTimeout(() => connectionStatus.classList.remove('visible'), 3200);
  };

  window.addEventListener('offline', () => showConnectionStatus(false));
  window.addEventListener('online', () => showConnectionStatus(true));
  if (!navigator.onLine) showConnectionStatus(false);

  let installPrompt = null;
  const installCard = document.createElement('aside');
  installCard.className = 'pwa-install-card';
  installCard.hidden = true;
  installCard.setAttribute('aria-label', 'Instalar Zaleasy');
  installCard.innerHTML = `
    <span class="pwa-install-icon" aria-hidden="true"><i class="fa-solid fa-mobile-screen-button"></i></span>
    <span class="pwa-install-copy"><strong>Instala Zaleasy en este dispositivo</strong><span>Abre la app y tus guías desde la pantalla de inicio, con acceso más rápido.</span></span>
    <span class="pwa-install-actions">
      <button type="button" data-pwa-later>Ahora no</button>
      <button type="button" data-pwa-install><i class="fa-solid fa-download" aria-hidden="true"></i> Instalar</button>
    </span>
  `;
  document.body.appendChild(installCard);

  const canShowInstall = () => {
    const dismissedAt = Number(safeStorage.get('zaleasyInstallDismissedAt') || 0);
    return !dismissedAt || Date.now() - dismissedAt > 14 * 86400000;
  };

  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    if (canShowInstall()) installCard.hidden = false;
  });

  installCard.addEventListener('click', async event => {
    const installButton = event.target.closest('[data-pwa-install]');
    const laterButton = event.target.closest('[data-pwa-later]');
    if (laterButton) {
      safeStorage.set('zaleasyInstallDismissedAt', String(Date.now()));
      installCard.hidden = true;
      return;
    }
    if (!installButton || !installPrompt) return;
    installCard.hidden = true;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
  });

  window.addEventListener('appinstalled', () => {
    installPrompt = null;
    installCard.hidden = true;
    safeStorage.set('zaleasyInstalled', '1');
  });

  if ('serviceWorker' in navigator && /^https?:$/.test(window.location.protocol)) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(new URL('sw.js', rootUrl).href, { scope: rootUrl.pathname }).catch(() => {});
    }, { once: true });
  }
})();
