(() => {
  'use strict';

  const onReady = callback => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', callback, { once: true });
    else callback();
  };

  onReady(() => {
    const article = document.querySelector('article.article-content, article.content, main article, article');
    if (!article || document.body.classList.contains('article-reader-enhanced')) return;

    document.body.classList.add('article-reader-enhanced');
    if (document.querySelector('.listen')) document.body.classList.add('article-reader-has-sticky-audio');

    if (!article.id) article.id = 'articleContent';

    const skipLink = document.createElement('a');
    skipLink.className = 'article-reader-skip';
    skipLink.href = `#${article.id}`;
    skipLink.textContent = 'Saltar al artículo';
    document.body.prepend(skipLink);

    let progress = document.getElementById('reading-progress');
    if (!progress) {
      progress = document.createElement('div');
      progress.id = 'reading-progress';
      document.body.prepend(progress);
    }
    progress.classList.add('article-reader-progress');
    progress.setAttribute('role', 'progressbar');
    progress.setAttribute('aria-label', 'Progreso de lectura');
    progress.setAttribute('aria-valuemin', '0');
    progress.setAttribute('aria-valuemax', '100');
    progress.setAttribute('aria-valuenow', '0');

    const tools = document.createElement('aside');
    tools.className = 'article-reader-tools';
    tools.setAttribute('aria-label', 'Herramientas de lectura');
    tools.innerHTML = `
      <div class="article-reader-summary">
        <span class="article-reader-summary-icon" aria-hidden="true"><i class="fa-solid fa-book-open"></i></span>
        <span><strong>Lectura cómoda</strong><small id="articleReaderProgressText">0% leído</small></span>
      </div>
      <div class="article-reader-actions">
        <div class="article-reader-font-controls" role="group" aria-label="Tamaño del texto">
          <button type="button" data-reader-action="smaller" aria-label="Reducir tamaño del texto">A−</button>
          <button type="button" data-reader-action="larger" aria-label="Aumentar tamaño del texto">A+</button>
        </div>
        <button type="button" data-reader-action="focus" aria-pressed="false"><i class="fa-regular fa-eye" aria-hidden="true"></i><span>Enfoque</span></button>
        <button type="button" data-reader-action="share"><i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i><span>Compartir</span></button>
        <button type="button" data-reader-action="top" aria-label="Volver al inicio del artículo"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
      </div>
      <p class="article-reader-status" id="articleReaderStatus" role="status" aria-live="polite"></p>
    `;
    article.insertAdjacentElement('beforebegin', tools);

    const rootSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const initialArticleSize = parseFloat(getComputedStyle(article).fontSize) || 17;
    const baseRem = initialArticleSize / rootSize;
    let fontStep = Number.parseInt(localStorage.getItem('zaleasyReaderFontStep') || '0', 10);
    if (!Number.isFinite(fontStep)) fontStep = 0;
    fontStep = Math.max(-1, Math.min(2, fontStep));

    const status = tools.querySelector('#articleReaderStatus');
    const progressText = tools.querySelector('#articleReaderProgressText');
    const focusButton = tools.querySelector('[data-reader-action="focus"]');

    const announce = message => {
      if (!status) return;
      status.textContent = message;
      window.clearTimeout(window.__zaleasyReaderStatusTimer);
      window.__zaleasyReaderStatusTimer = window.setTimeout(() => {
        status.textContent = '';
      }, 2600);
    };

    const applyFontSize = shouldAnnounce => {
      const size = Math.max(0.94, baseRem * (1 + fontStep * 0.1));
      article.style.setProperty('--article-reader-font-size', `${size.toFixed(3)}rem`);
      localStorage.setItem('zaleasyReaderFontStep', String(fontStep));
      if (shouldAnnounce) announce(fontStep > 0 ? 'Texto ampliado.' : fontStep < 0 ? 'Texto reducido.' : 'Tamaño de texto restablecido.');
    };
    applyFontSize(false);

    const getArticleProgress = () => {
      const rect = article.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const readableDistance = Math.max(article.offsetHeight - window.innerHeight * 0.35, 1);
      return Math.round(Math.min(Math.max(((window.scrollY - start) / readableDistance) * 100, 0), 100));
    };

    let progressFrame = 0;
    const updateProgress = () => {
      progressFrame = 0;
      const value = getArticleProgress();
      progress.style.width = `${value}%`;
      progress.setAttribute('aria-valuenow', String(value));
      if (progressText) progressText.textContent = `${value}% leído`;
    };
    const requestProgressUpdate = () => {
      if (!progressFrame) progressFrame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', requestProgressUpdate, { passive: true });
    window.addEventListener('resize', requestProgressUpdate, { passive: true });
    updateProgress();

    tools.addEventListener('click', async event => {
      const button = event.target.closest('button[data-reader-action]');
      if (!button) return;
      const action = button.dataset.readerAction;

      if (action === 'smaller') {
        fontStep = Math.max(-1, fontStep - 1);
        applyFontSize(true);
      }

      if (action === 'larger') {
        fontStep = Math.min(2, fontStep + 1);
        applyFontSize(true);
      }

      if (action === 'focus') {
        const enabled = document.body.classList.toggle('article-reader-focus');
        button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
        button.innerHTML = enabled
          ? '<i class="fa-solid fa-eye-slash" aria-hidden="true"></i><span>Salir del enfoque</span>'
          : '<i class="fa-regular fa-eye" aria-hidden="true"></i><span>Enfoque</span>';
        article.scrollIntoView({ behavior: 'smooth', block: 'start' });
        announce(enabled ? 'Modo enfoque activado.' : 'Modo enfoque desactivado.');
      }

      if (action === 'share') {
        const shareData = { title: document.title, text: document.querySelector('meta[name="description"]')?.content || document.title, url: window.location.href };
        try {
          if (navigator.share) {
            await navigator.share(shareData);
            announce('Opciones para compartir abiertas.');
          } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            announce('Enlace del artículo copiado.');
          } else {
            announce('Copia la dirección del navegador para compartir.');
          }
        } catch (error) {
          if (error?.name !== 'AbortError') announce('No pudimos compartir el artículo.');
        }
      }

      if (action === 'top') {
        article.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !document.body.classList.contains('article-reader-focus')) return;
      event.preventDefault();
      focusButton?.click();
    });

    const rawCategory = document.querySelector('.tag, .article-category, .category-badge, [class*="category"]')?.textContent?.trim() || '';
    const category = rawCategory.replace(/\s+/g, ' ').replace(/[^\p{L}\p{N}\s-]/gu, '').trim();
    const blogUrl = new URL('../blog.html', window.location.href);
    if (category) blogUrl.searchParams.set('buscar', category);
    blogUrl.hash = 'blogArticles';

    const nextStep = document.createElement('aside');
    nextStep.className = 'article-reader-next';
    nextStep.setAttribute('aria-labelledby', 'articleReaderNextTitle');
    nextStep.innerHTML = `
      <span><i class="fa-solid fa-route" aria-hidden="true"></i> Siguiente paso</span>
      <h2 id="articleReaderNextTitle">Convierte esta lectura en una acción concreta</h2>
      <p>Explora más guías del mismo tema o lleva el control diario de tu negocio a Zaleasy.</p>
      <div>
        <a class="article-reader-next-primary" href="${blogUrl.pathname}${blogUrl.search}${blogUrl.hash}"><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Ver lecturas relacionadas</a>
        <a href="../app.html"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> Abrir Zaleasy</a>
      </div>
    `;
    article.insertAdjacentElement('afterend', nextStep);
  });
})();
