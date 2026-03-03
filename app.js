document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const dateEl = document.getElementById('current-date');
    const greetingEl = document.getElementById('dynamic-greeting');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const saleForm = document.getElementById('sale-form');
    const quickAmountBtns = document.querySelectorAll('.quick-amount');
    // amountInput/productInput/categoryInput now managed by multi-item system
    let amountInput = null; // legacy ref kept for calculator compat
    let productInput = null; // legacy ref kept for autocomplete compat
    const methodSelect = document.getElementById('method');
    const notesInput = document.getElementById('notes');
    const customerNameInput = document.getElementById('customer-name');
    const categoryInput = null; // now per-item

    // Edit Modal Elements
    const editModal = document.getElementById('edit-modal');
    const editIdInput = document.getElementById('edit-id');
    const editProductInput = document.getElementById('edit-product');
    const editAmountInput = document.getElementById('edit-amount');
    const editMethodSelect = document.getElementById('edit-method');
    const editCategorySelect = document.getElementById('edit-category');
    const editNotesInput = document.getElementById('edit-notes');
    const btnSaveEdit = document.getElementById('btn-save-edit');
    const closeEditModalBtn = document.getElementById('close-edit-modal');
    const editTypeIncome = document.getElementById('edit-type-income');
    const editTypeExpense = document.getElementById('edit-type-expense');
    let editTransactionType = 'income';

    // KPI Elements
    const kpiRevenue = document.getElementById('kpi-revenue');
    const kpiSalesCount = document.getElementById('kpi-sales-count');
    const kpiExpenses = document.getElementById('kpi-expenses');
    const kpiBalance = document.getElementById('kpi-balance');

    // List Elements
    const salesBody = document.getElementById('sales-body');
    const emptyState = document.getElementById('empty-state');
    const toast = document.getElementById('toast');
    const searchSalesInput = document.getElementById('search-sales');
    const clearSalesBtn = document.getElementById('clear-sales');

    // Close Register Elements
    const btnCloseRegister = document.getElementById('btn-close-register');
    const closeRegisterModal = document.getElementById('close-modal');
    const closeSummaryGrid = document.getElementById('close-summary-grid');
    const closeTotalDay = document.getElementById('close-total-day');
    const btnConfirmClose = document.getElementById('confirm-close');

    // Calculator Elements
    const btnCalculator = document.getElementById('btn-calculator');
    const calculatorModal = document.getElementById('calculator-modal');
    const calcTotalInput = document.getElementById('calc-total');
    const calcReceivedInput = document.getElementById('calc-received');
    const calcChangeDisplay = document.getElementById('calc-change');

    // --- Goal & Chart Elements ---
    const goalText = document.getElementById('goal-progress-text');
    const goalPercentage = document.getElementById('goal-percentage');
    const goalProgressBar = document.getElementById('goal-progress-bar');
    const editGoalBtn = document.getElementById('edit-goal');
    const goalModal = document.getElementById('goal-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-close');
    const saveGoalBtn = document.getElementById('save-goal');
    const newGoalInput = document.getElementById('new-goal');
    const chartCanvas = document.getElementById('methodsChart');

    // Receipt Modal Elements
    const receiptModal = document.getElementById('receipt-modal');
    const receiptBody = document.getElementById('receipt-body');
    const btnPrintReceipt = document.getElementById('btn-print-receipt');

    // Auth Elements
    const authScreen = document.getElementById('auth-screen');
    const trialScreen = document.getElementById('trial-screen');
    const mainApp = document.getElementById('main-app');
    const btnGoogleLogin = document.getElementById('btn-google-login');
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userAvatar = document.getElementById('user-avatar');

    // View Elements
    const viewDashboard = document.getElementById('view-dashboard');
    const viewHistorial = document.getElementById('view-historial');
    const viewReportes = document.getElementById('view-reportes');
    const viewConfig = document.getElementById('view-config');
    const viewComingSoon = document.getElementById('view-coming-soon');
    const comingSoonTitle = document.getElementById('coming-soon-title');

    // History Elements
    const historyBody = document.getElementById('history-body');
    const historySearch = document.getElementById('history-search');
    const historyDateFilter = document.getElementById('history-date-filter');
    const historyEmptyState = document.getElementById('history-empty-state');
    const historyExportCsv = document.getElementById('history-export-csv');
    const historyClearAll = document.getElementById('history-clear-all');

    // Navigation Links
    const navDashboard = document.getElementById('nav-dashboard');
    const navHistorial = document.getElementById('nav-historial');
    const navReportes = document.getElementById('nav-reportes');
    const navConfig = document.getElementById('nav-config');
    const allNavItems = document.querySelectorAll('.nav-item');

    // --- State ---
    let sales = JSON.parse(localStorage.getItem('dailySales')) || [];
    let historyData = JSON.parse(localStorage.getItem('allHistoryData')) || []; // Full history
    let isDarkMode = localStorage.getItem('theme') !== 'light';
    let dailyGoal = parseFloat(localStorage.getItem('dailyGoal')) || 100.00;
    let storeName = localStorage.getItem('storeName') || 'Zaleasy';
    let recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
    let methodsChartInstance = null;
    let currentTransactionType = 'income';
    let goalReachedNotified = false;
    let activeCategoryFilter = ''; // for sales table category pill filter
    let alertThreshold = parseFloat(localStorage.getItem('alertThreshold')) || 0;
    let sessionStartTime = localStorage.getItem('sessionStartTime') || Date.now();

    // Type Toggle Elements
    const btnTypeIncome = document.getElementById('btn-type-income');
    const btnTypeExpense = document.getElementById('btn-type-expense');
    const btnSubmitTransaction = document.getElementById('btn-submit-transaction');

    btnTypeIncome.addEventListener('click', () => {
        currentTransactionType = 'income';
        btnTypeIncome.className = 'btn btn-primary type-btn';
        btnTypeIncome.removeAttribute('style');

        btnTypeExpense.className = 'btn btn-outline type-btn';
        btnTypeExpense.removeAttribute('style');
        btnTypeExpense.style.flex = "1";
        btnTypeIncome.style.flex = "1";

        btnSubmitTransaction.innerHTML = '<i class="fa-solid fa-plus"></i> Registrar Venta';
        btnSubmitTransaction.className = 'btn btn-primary btn-block';
        btnSubmitTransaction.removeAttribute('style');
        btnSubmitTransaction.style.flex = "2";
    });

    btnTypeExpense.addEventListener('click', () => {
        currentTransactionType = 'expense';
        btnTypeExpense.className = 'btn type-btn';
        btnTypeExpense.style.background = 'var(--danger)';
        btnTypeExpense.style.color = 'white';
        btnTypeExpense.style.border = 'none';
        btnTypeExpense.style.flex = "1";

        btnTypeIncome.className = 'btn btn-outline type-btn';
        btnTypeIncome.removeAttribute('style');
        btnTypeIncome.style.flex = "1";

        btnSubmitTransaction.innerHTML = '<i class="fa-solid fa-minus"></i> Registrar Gasto';
        btnSubmitTransaction.className = 'btn btn-block';
        btnSubmitTransaction.style.background = 'var(--danger)';
        btnSubmitTransaction.style.color = 'white';
        btnSubmitTransaction.style.flex = "2";
    });

    // --- Navigation Logic ---
    const switchView = (targetId, title) => {
        // Update active class on nav
        allNavItems.forEach(item => item.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');

        if (targetId === 'nav-dashboard') {
            viewDashboard.style.display = 'block';
            viewHistorial.style.display = 'none';
            viewReportes.style.display = 'none';
            viewConfig.style.display = 'none';
            viewComingSoon.style.display = 'none';
        } else if (targetId === 'nav-historial') {
            viewDashboard.style.display = 'none';
            viewHistorial.style.display = 'block';
            viewReportes.style.display = 'none';
            viewConfig.style.display = 'none';
            viewComingSoon.style.display = 'none';
            renderHistory();
        } else if (targetId === 'nav-reportes') {
            viewDashboard.style.display = 'none';
            viewHistorial.style.display = 'none';
            viewReportes.style.display = 'block';
            viewConfig.style.display = 'none';
            viewComingSoon.style.display = 'none';
            renderReports();
        } else if (targetId === 'nav-config') {
            viewDashboard.style.display = 'none';
            viewHistorial.style.display = 'none';
            viewReportes.style.display = 'none';
            viewConfig.style.display = 'block';
            viewComingSoon.style.display = 'none';
            loadConfigData();
        } else {
            viewDashboard.style.display = 'none';
            viewHistorial.style.display = 'none';
            viewReportes.style.display = 'none';
            viewConfig.style.display = 'none';
            viewComingSoon.style.display = 'block';
            comingSoonTitle.innerText = title;
        }
    };

    navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-dashboard'); });
    navHistorial.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-historial'); });
    navReportes.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-reportes'); });
    navConfig.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-config', 'Configuración de Empresa'); });

    // --- Reports Chart Instances ---
    let repWeeklyChartInstance = null;
    let repMethodsChartInstance = null;

    const renderReports = () => {
        const allData = [...historyData, ...sales]; // Include today's sales too
        const incomes = allData.filter(s => s.type !== 'expense');
        const expenses = allData.filter(s => s.type === 'expense');

        // --- Summary KPIs ---
        const totalRevenue = incomes.reduce((sum, s) => sum + s.amount, 0);
        const totalExpenses = expenses.reduce((sum, s) => sum + s.amount, 0);
        const totalTx = incomes.length;
        const avgSale = totalTx > 0 ? totalRevenue / totalTx : 0;

        document.getElementById('rep-total-revenue').textContent = formatCurrency(totalRevenue);
        document.getElementById('rep-total-tx').textContent = totalTx;
        document.getElementById('rep-avg-sale').textContent = formatCurrency(avgSale);
        document.getElementById('rep-total-expenses').textContent = formatCurrency(totalExpenses);

        // --- Weekly Bar Chart (last 7 days) ---
        const labels = [];
        const weeklyTotals = [];
        const isDark = localStorage.getItem('theme') !== 'light';
        const textColor = isDark ? '#8d93aa' : '#636e72';

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dayStr = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
            labels.push(dayStr);
            const dayKey = d.toISOString().split('T')[0];
            const dayTotal = incomes
                .filter(s => new Date(s.timestamp).toISOString().split('T')[0] === dayKey)
                .reduce((sum, s) => sum + s.amount, 0);
            weeklyTotals.push(dayTotal);
        }

        if (repWeeklyChartInstance) repWeeklyChartInstance.destroy();
        const ctxWeekly = document.getElementById('rep-weekly-chart').getContext('2d');
        repWeeklyChartInstance = new Chart(ctxWeekly, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Ingresos',
                    data: weeklyTotals,
                    backgroundColor: 'rgba(99,102,241,0.7)',
                    borderColor: 'rgba(99,102,241,1)',
                    borderWidth: 2,
                    borderRadius: 8,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: textColor, callback: v => '$' + v.toLocaleString('es-AR') }, grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });

        // --- Methods Doughnut Chart ---
        const methodMap = {};
        incomes.forEach(s => { methodMap[s.method] = (methodMap[s.method] || 0) + s.amount; });
        const methodLabels = Object.keys(methodMap);
        const methodValues = Object.values(methodMap);

        if (repMethodsChartInstance) repMethodsChartInstance.destroy();
        const ctxMethods = document.getElementById('rep-methods-chart').getContext('2d');
        repMethodsChartInstance = new Chart(ctxMethods, {
            type: 'doughnut',
            data: {
                labels: methodLabels.length ? methodLabels : ['Sin datos'],
                datasets: [{
                    data: methodValues.length ? methodValues : [1],
                    backgroundColor: ['rgba(99,102,241,0.8)', 'rgba(46,213,115,0.8)', 'rgba(0,158,227,0.8)', 'rgba(255,165,2,0.8)'],
                    borderWidth: 2,
                    borderColor: isDark ? '#1a1d2e' : '#f5f5f5'
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: textColor, padding: 16 } } }
            }
        });

        // --- Top Products ---
        const repTopBody = document.getElementById('rep-top-products-body');
        const repEmptyState = document.getElementById('rep-empty-state');
        repTopBody.innerHTML = '';

        // --- Category Chart ---
        const catMap = {};
        incomes.forEach(s => {
            const cat = s.category || 'Sin categoría';
            catMap[cat] = (catMap[cat] || 0) + s.amount;
        });
        const catLabels = Object.keys(catMap);
        const catValues = Object.values(catMap);
        const catColors = [
            'rgba(108,92,231,0.85)', 'rgba(0,184,148,0.85)', 'rgba(253,203,110,0.85)',
            'rgba(0,158,227,0.85)', 'rgba(253,121,168,0.85)', 'rgba(162,155,254,0.85)',
            'rgba(85,239,196,0.85)', 'rgba(255,165,2,0.85)'
        ];
        const ctxCat = document.getElementById('rep-category-chart');
        if (ctxCat) {
            if (window._repCategoryChartInstance) window._repCategoryChartInstance.destroy();
            window._repCategoryChartInstance = new Chart(ctxCat.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: catLabels.length ? catLabels : ['Sin datos'],
                    datasets: [{
                        data: catValues.length ? catValues : [1],
                        backgroundColor: catColors,
                        borderWidth: 2,
                        borderColor: isDark ? '#1a1d2e' : '#f5f5f5'
                    }]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'right', labels: { color: textColor, padding: 14, boxWidth: 14, font: { size: 11 } } }
                    }
                }
            });
        }

        // --- 30-Day Activity Heatmap ---
        const heatmapEl = document.getElementById('rep-heatmap');
        if (heatmapEl) {
            heatmapEl.innerHTML = '';
            const allTx = [...historyData, ...sales];
            for (let i = 29; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                const dayKey = d.toISOString().split('T')[0];
                const dayTotal = allTx
                    .filter(s => s.type !== 'expense' && new Date(s.timestamp).toISOString().split('T')[0] === dayKey)
                    .reduce((sum, s) => sum + s.amount, 0);

                const dot = document.createElement('div');
                dot.className = 'heatmap-dot';
                if (dayTotal > 0) {
                    const maxPossible = Math.max(...Array.from({ length: 30 }, (_, idx) => {
                        const dd = new Date(); dd.setDate(dd.getDate() - idx);
                        const k = dd.toISOString().split('T')[0];
                        return allTx.filter(s => s.type !== 'expense' && new Date(s.timestamp).toISOString().split('T')[0] === k).reduce((a, s) => a + s.amount, 0);
                    }), 1);
                    const intensity = Math.min(dayTotal / maxPossible, 1);
                    if (intensity > 0.7) dot.classList.add('hm-high');
                    else if (intensity > 0.3) dot.classList.add('hm-mid');
                    else dot.classList.add('hm-low');
                }
                dot.title = `${d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}: ${dayTotal > 0 ? formatCurrency(dayTotal) : 'Sin ventas'}`;
                heatmapEl.appendChild(dot);
            }
        }

        const productMap = {};
        incomes.forEach(s => {
            if (!productMap[s.product]) productMap[s.product] = { count: 0, total: 0 };
            productMap[s.product].count++;
            productMap[s.product].total += s.amount;
        });

        const sorted = Object.entries(productMap).sort((a, b) => b[1].total - a[1].total);

        if (sorted.length === 0) {
            repEmptyState.classList.add('active');
            document.querySelector('#view-reportes .table-container').style.display = 'none';
        } else {
            repEmptyState.classList.remove('active');
            document.querySelector('#view-reportes .table-container').style.display = 'block';
            sorted.forEach(([name, data], idx) => {
                const medals = ['🥇', '🥈', '🥉'];
                const rank = medals[idx] || `#${idx + 1}`;
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="font-size:1.3rem;">${rank}</td>
                    <td><strong>${name}</strong></td>
                    <td><span class="badge">${data.count} veces</span></td>
                    <td style="color: var(--success); font-weight: bold;">${formatCurrency(data.total)}</td>
                `;
                repTopBody.appendChild(tr);
            });
        }
    };

    // --- Config Logic ---
    const configStoreNameInput = document.getElementById('config-store-name');
    const configDailyGoalInput = document.getElementById('config-daily-goal');

    const loadConfigData = () => {
        configStoreNameInput.value = storeName;
        configDailyGoalInput.value = dailyGoal;
        const alertInput = document.getElementById('config-alert-threshold');
        if (alertInput) alertInput.value = alertThreshold || '';
    };

    document.getElementById('btn-save-store-name').addEventListener('click', () => {
        const val = configStoreNameInput.value.trim();
        if (val) {
            storeName = val;
            localStorage.setItem('storeName', storeName);
            document.getElementById('sidebar-brand-name').innerText = storeName;
            showToast('Nombre del negocio actualizado');
        }
    });

    document.getElementById('btn-save-config-goal').addEventListener('click', () => {
        const val = parseFloat(configDailyGoalInput.value);
        if (!isNaN(val) && val > 0) {
            dailyGoal = val;
            localStorage.setItem('dailyGoal', dailyGoal);
            updateKPIs();
            showToast('Meta por defecto actualizada');
        }
    });

    document.getElementById('btn-factory-reset').addEventListener('click', () => {
        if (confirm('¿ESTÁS COMPLETAMENTE SEGURO? Esto borrará tu cuenta, tu historial, tus configuraciones y todos tus datos registrados. La aplicación volverá a quedar como recién instalada.')) {
            if (confirm('ÚLTIMA ADVERTENCIA: Esta acción es final e irreversible. ¿Ejecutar borrado y reiniciar sistema?')) {
                localStorage.clear();
                window.location.reload();
            }
        }
    });

    // --- Alert Threshold Config ---
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'btn-save-alert-threshold') {
            const val = parseFloat(document.getElementById('config-alert-threshold').value);
            alertThreshold = isNaN(val) ? 0 : val;
            localStorage.setItem('alertThreshold', alertThreshold);
            showToast(alertThreshold > 0 ? `Alerta activada para ventas > ${formatCurrency(alertThreshold)}` : 'Alerta de ventas desactivada');
        }
    });

    document.getElementById('btn-backup-data').addEventListener('click', () => {
        const backupData = {
            sales,
            historyData,
            storeName,
            dailyGoal,
            recentProducts,
            exportDate: new Date().toISOString()
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `zaleasy_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Copia de seguridad descargada (JSON)');
    });

    // --- Application Initialization ---
    const init = () => {
        document.getElementById('sidebar-brand-name').innerText = storeName;
        setupDate();
        setupLiveClock();
        setupTheme();
        initChart();
        renderSales();
        updateKPIs();
        updateKPITrends();
        setupAutocomplete();
        setupAuth();
        setupStreakWidget();
        setupImportBackup();
        setupEditModal();
        setupDayNotepad();
        setupCategoryFilters();
        setupFABs();
        updateTopProduct();
        setupPeakHours();
        setupShareSummary();
        setupMultiItems();
    };

    // --- Date & Greeting ---
    const setupDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('es-ES', options);

        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            greetingEl.innerHTML = '¡Buenos días! ☀️';
        } else if (currentHour < 19) {
            greetingEl.innerHTML = '¡Buenas tardes! 🌤️';
        } else {
            greetingEl.innerHTML = '¡Buenas noches! 🌙';
        }
    };

    // --- Live Clock ---
    const setupLiveClock = () => {
        const clockEl = document.getElementById('live-clock');
        if (!clockEl) return;
        const tick = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            clockEl.textContent = `${h}:${m}:${s}`;
        };
        tick();
        setInterval(tick, 1000);
    };

    // --- Day Notepad ---
    const setupDayNotepad = () => {
        const notepad = document.getElementById('day-notepad');
        const savedIndicator = document.getElementById('notepad-saved-indicator');
        if (!notepad) return;

        const todayKey = `dayNotes_${new Date().toISOString().split('T')[0]}`;
        notepad.value = localStorage.getItem(todayKey) || '';

        let saveTimer;
        notepad.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
                localStorage.setItem(todayKey, notepad.value);
                if (savedIndicator) {
                    savedIndicator.style.opacity = '1';
                    setTimeout(() => { savedIndicator.style.opacity = '0'; }, 1800);
                }
            }, 700);
        });

        notepad.addEventListener('focus', () => {
            notepad.style.borderColor = 'var(--primary)';
            notepad.style.boxShadow = '0 0 0 3px var(--primary-light)';
        });
        notepad.addEventListener('blur', () => {
            notepad.style.borderColor = 'var(--border-color)';
            notepad.style.boxShadow = 'none';
        });
    };

    // --- Category Filter Pills ---
    const setupCategoryFilters = () => {
        const container = document.getElementById('category-filters');
        if (!container) return;
        container.querySelectorAll('.cat-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                container.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeCategoryFilter = pill.getAttribute('data-cat');
                renderSales();
            });
        });
    };

    // --- Top Product Widget ---
    const updateTopProduct = () => {
        const nameEl = document.getElementById('top-product-name');
        const amountEl = document.getElementById('top-product-amount');
        const countEl = document.getElementById('top-product-count');
        if (!nameEl) return;

        const incomes = sales.filter(s => s.type !== 'expense');
        if (incomes.length === 0) {
            nameEl.textContent = 'Sin ventas aún';
            amountEl.textContent = '$0.00';
            countEl.textContent = '—';
            return;
        }

        const productMap = {};
        incomes.forEach(s => {
            if (!productMap[s.product]) productMap[s.product] = { total: 0, count: 0 };
            productMap[s.product].total += s.amount;
            productMap[s.product].count++;
        });

        const top = Object.entries(productMap).sort((a, b) => b[1].total - a[1].total)[0];
        nameEl.textContent = top[0];
        amountEl.textContent = formatCurrency(top[1].total);
        countEl.textContent = `${top[1].count} ${top[1].count === 1 ? 'venta' : 'ventas'}`;
    };

    // --- Peak Hour Widget ---
    const setupPeakHours = () => updatePeakHours();

    const updatePeakHours = () => {
        const container = document.getElementById('peak-hour-bars');
        const badge = document.getElementById('peak-hour-badge');
        const subtitle = document.getElementById('peak-hour-subtitle');
        if (!container) return;

        // Build hourly income map from today's sales
        const hourMap = {};
        for (let h = 0; h < 24; h++) hourMap[h] = 0;
        sales.filter(s => s.type !== 'expense').forEach(s => {
            const h = new Date(s.timestamp).getHours();
            hourMap[h] += s.amount;
        });

        const maxVal = Math.max(...Object.values(hourMap));
        const peakHour = maxVal > 0 ? parseInt(Object.entries(hourMap).sort((a, b) => b[1] - a[1])[0][0]) : null;

        container.innerHTML = '';
        const activeHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]; // Show business hours
        activeHours.forEach(h => {
            const val = hourMap[h] || 0;
            const heightPct = maxVal > 0 ? Math.max((val / maxVal) * 100, val > 0 ? 8 : 2) : 2;
            const isPeak = h === peakHour && maxVal > 0;
            const bar = document.createElement('div');
            bar.className = 'peak-bar' + (isPeak ? ' peak-bar-active' : '');
            bar.style.height = `${heightPct}%`;
            bar.title = `${h}:00 — ${val > 0 ? formatCurrency(val) : 'Sin ventas'}`;
            container.appendChild(bar);
        });

        if (peakHour !== null && maxVal > 0) {
            const amPm = peakHour >= 12 ? 'PM' : 'AM';
            const hour12 = peakHour % 12 || 12;
            badge.textContent = `${hour12}${amPm}`;
            subtitle.textContent = `Tu hora pico es a las ${peakHour}:00 hs`;
        } else {
            badge.textContent = '—';
            subtitle.textContent = 'Registra ventas para ver tu hora más activa.';
        }
    };

    // --- Share / Copy Day Summary ---
    const setupShareSummary = () => {
        const btn = document.getElementById('btn-share-summary');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const incomes = sales.filter(s => s.type !== 'expense');
            const expenses = sales.filter(s => s.type === 'expense');
            const totalIncome = incomes.reduce((sum, s) => sum + s.amount, 0);
            const totalExpenses = expenses.reduce((sum, s) => sum + s.amount, 0);
            const net = totalIncome - totalExpenses;
            const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            const topIncome = incomes.length > 0 ? incomes.sort((a, b) => b.amount - a.amount)[0] : null;
            const netEmoji = net >= 0 ? '📈' : '📉';

            const text = `📊 *Resumen Diario — ${storeName}*\n` +
                `📅 ${today}\n\n` +
                `💰 Ingresos: ${formatCurrency(totalIncome)} (${incomes.length} ventas)\n` +
                `💸 Gastos: ${formatCurrency(totalExpenses)}\n` +
                `${netEmoji} Balance Neto: ${formatCurrency(net)}\n` +
                (topIncome ? `🏆 Mejor venta: ${topIncome.product} — ${formatCurrency(topIncome.amount)}\n` : '') +
                `\n_Generado con Zaleasy_`;

            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('✅ Resumen copiado al portapapeles');
                }).catch(() => fallbackCopyText(text));
            } else {
                fallbackCopyText(text);
            }
        });
    };

    // =============================================
    // --- Multi-Item Form System ---
    // =============================================

    const CATEGORY_OPTIONS = [
        { value: '', label: 'Sin categor\u00eda' },
        { value: 'Producto', label: '\ud83d\udce6 Producto' },
        { value: 'Servicio', label: '\u2699\ufe0f Servicio' },
        { value: 'Suscripci\u00f3n', label: '\ud83d\udd04 Suscripci\u00f3n' },
        { value: 'Consultor\u00eda', label: '\ud83d\udcbc Consultor\u00eda' },
        { value: 'Alquiler', label: '\ud83c\udfe0 Alquiler' },
        { value: 'Marketing', label: '\ud83d\udce3 Marketing' },
        { value: 'Insumos', label: '\ud83d\uded2 Insumos' },
        { value: 'Otros', label: '\ud83d\udd16 Otros' },
    ];

    let lastFocusedAmountInput = null;

    const buildCategoryOptions = () => CATEGORY_OPTIONS
        .map(o => `<option value="${o.value}">${o.label}</option>`).join('');

    const createItemRow = (isFirst = false) => {
        const row = document.createElement('div');
        row.className = 'item-row';
        row.style.animation = 'itemSlideIn 0.25s ease';
        row.innerHTML = `
            <div class="item-row-fields">
                <div class="item-field-desc">
                    <div class="input-wrapper" style="margin-bottom:0;">
                        <i class="fa-solid fa-tag"></i>
                        <input type="text" class="item-product-input" placeholder="Producto o descripci\u00f3n" list="products-datalist" required>
                    </div>
                </div>
                <div class="item-field-amount">
                    <div class="input-wrapper" style="margin-bottom:0;">
                        <i class="fa-solid fa-dollar-sign"></i>
                        <input type="number" class="item-amount-input" step="0.01" min="0" placeholder="0.00" value="5000" required>
                    </div>
                </div>
                <div class="item-field-cat">
                    <div class="input-wrapper" style="margin-bottom:0; padding-left:0;">
                        <select class="item-category-select" style="padding-left:.8rem;">
                            ${buildCategoryOptions()}
                        </select>
                    </div>
                </div>
                <button type="button" class="item-remove-btn" title="Eliminar ítem" ${isFirst ? 'style="visibility:hidden;"' : ''}>
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
            </div>
        `;

        // Track last focused amount input (for quick-amount buttons)
        const amtInput = row.querySelector('.item-amount-input');
        amtInput.addEventListener('focus', () => { lastFocusedAmountInput = amtInput; });
        amtInput.addEventListener('input', updateMultiTotal);

        // Remove button
        const removeBtn = row.querySelector('.item-remove-btn');
        removeBtn.addEventListener('click', () => {
            const container = document.getElementById('items-container');
            if (container.querySelectorAll('.item-row').length <= 1) return; // keep at least 1
            row.style.animation = 'itemSlideOut 0.2s ease forwards';
            setTimeout(() => { row.remove(); updateMultiTotal(); syncFirstRowRemoveBtn(); }, 200);
        });

        // Connect autocomplete
        setTimeout(setupAutocomplete, 0);

        return row;
    };

    const syncFirstRowRemoveBtn = () => {
        const container = document.getElementById('items-container');
        const rows = container.querySelectorAll('.item-row');
        rows.forEach((r, i) => {
            const btn = r.querySelector('.item-remove-btn');
            if (btn) btn.style.visibility = (rows.length === 1 && i === 0) ? 'hidden' : 'visible';
        });
    };

    const updateMultiTotal = () => {
        const container = document.getElementById('items-container');
        const totalEl = document.getElementById('multi-item-total');
        const totalValEl = document.getElementById('multi-item-total-value');
        const rows = container.querySelectorAll('.item-row');
        let total = 0;
        rows.forEach(r => {
            const v = parseFloat(r.querySelector('.item-amount-input').value) || 0;
            total += v;
        });
        if (rows.length > 1) {
            totalEl.style.display = 'flex';
            totalValEl.textContent = formatCurrency(total);
        } else {
            totalEl.style.display = 'none';
        }
    };

    const resetMultiItems = () => {
        const container = document.getElementById('items-container');
        container.innerHTML = '';
        const firstRow = createItemRow(true);
        container.appendChild(firstRow);
        firstRow.querySelector('.item-product-input').focus();
        updateMultiTotal();
    };

    const setupMultiItems = () => {
        const container = document.getElementById('items-container');
        const addBtn = document.getElementById('btn-add-item');
        if (!container || !addBtn) return;

        // Create first row
        resetMultiItems();

        addBtn.addEventListener('click', () => {
            const newRow = createItemRow(false);
            container.appendChild(newRow);
            syncFirstRowRemoveBtn();
            updateMultiTotal();
            // Focus the product input of the new row with a slight delay
            setTimeout(() => newRow.querySelector('.item-product-input').focus(), 50);
            // Bounce animation on the button
            addBtn.style.transform = 'scale(0.9)';
            setTimeout(() => addBtn.style.transform = 'scale(1)', 150);
        });
    };

    const fallbackCopyText = (text) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try { document.execCommand('copy'); showToast('✅ Resumen copiado'); } catch (e) { showToast('No se pudo copiar'); }
        document.body.removeChild(ta);
    };

    // --- Floating Action Buttons ---
    const setupFABs = () => {
        const fabQuickAdd = document.getElementById('fab-quick-add');

        if (fabQuickAdd) {
            fabQuickAdd.addEventListener('click', () => {
                // Navigate to dashboard and focus the form
                switchView('nav-dashboard');
                setTimeout(() => {
                    const productInput = document.getElementById('product');
                    if (productInput) {
                        productInput.focus();
                        productInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);
            });
        }
    };

    // --- Theme ---
    const setupTheme = () => {
        if (!isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        themeToggleBtn.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            if (isDarkMode) {
                document.documentElement.removeAttribute('data-theme');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                localStorage.setItem('theme', 'light');
            }
            if (methodsChartInstance) {
                methodsChartInstance.options.plugins.legend.labels.color = isDarkMode ? '#8d93aa' : '#636e72';
                methodsChartInstance.update();
            }
        });
    };

    // --- Firebase Auth ---
    const setupAuth = () => {
        // Fallback for visual testing if Firebase script is commented out or missing
        if (!window.firebaseAuth) {
            console.log("Firebase no configurado aún. Mostrando UI Demo.");

            btnGoogleLogin.addEventListener('click', () => {
                // Simulate login
                authScreen.style.display = 'none';
                mainApp.style.display = 'flex';
                showToast('Modo de Prueba (Sin Nube)');
            });

            userProfileBtn.addEventListener('click', () => {
                if (confirm('¿Cerrar sesión de prueba?')) {
                    mainApp.style.display = 'none';
                    authScreen.style.display = 'flex';
                }
            });
            return;
        }

        // Real Firebase Auth Flow
        window.firebaseOnAuth(window.firebaseAuth, (user) => {
            if (user) {
                // Logged in
                authScreen.style.display = 'none';

                // Trial Logic
                const creationTime = new Date(user.metadata.creationTime).getTime();
                const currentTime = new Date().getTime();
                const daysElapsed = Math.floor((currentTime - creationTime) / (1000 * 60 * 60 * 24));
                const daysLeft = 30 - daysElapsed;

                const trialTitle = document.getElementById('trial-title');
                const trialText = document.getElementById('trial-text');
                const btnContinueTrial = document.getElementById('btn-continue-trial');

                trialScreen.style.display = 'flex'; // Interceptor on!

                if (daysLeft > 0) {
                    trialTitle.innerText = "¡Suscripción / Prueba!";
                    trialTitle.style.color = "white";
                    trialText.innerHTML = `Tienes <strong>${daysLeft} días</strong> restantes de prueba gratuita en tu cuenta de Google. Adquiere tu licencia Mensual para uso continuo.`;
                    btnContinueTrial.style.display = 'inline-flex';
                } else {
                    trialTitle.innerText = "Prueba Expirada";
                    trialTitle.style.color = "var(--danger)";
                    trialText.innerHTML = `Tu prueba gratuita ha terminado. Para seguir usando tu Panel de Ventas, debes adquirir la licencia mensual por $3.500 ARS.`;
                    btnContinueTrial.style.display = 'none'; // Lock the app!
                }

                // Proceed to App only if allowed
                btnContinueTrial.onclick = () => {
                    trialScreen.style.display = 'none';
                    mainApp.style.display = 'flex';
                    userAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff";
                    showToast(`Bienvenid@, ${user.displayName.split(' ')[0]}`);
                };

                // Logout from interceptor
                document.getElementById('logout-trial').onclick = (e) => {
                    e.preventDefault();
                    window.firebaseSignOut(window.firebaseAuth);
                };

            } else {
                // Logged out
                mainApp.style.display = 'none';
                if (trialScreen) trialScreen.style.display = 'none';
                authScreen.style.display = 'flex';
            }
        });

        btnGoogleLogin.addEventListener('click', () => {
            btnGoogleLogin.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Conectando...';
            window.firebaseSignIn(window.firebaseAuth, window.firebaseProvider)
                .catch((error) => {
                    console.error("Error logging in:", error);

                    let errorMsg = "Error en el inicio de sesión.\n\n";
                    if (window.location.protocol === 'file:') {
                        errorMsg += "⚠️ IMPORTANTE: Estás abriendo el archivo localmente (file:///). Firebase requiere que uses un servidor local (como Live Server en VSCode) o que la página esté subida a internet para que el login de Google funcione por motivos de seguridad.\n\n";
                    } else {
                        errorMsg += "Asegúrate de haber 'Habilitado' Google en la pestaña Authentication de tu consola de Firebase.\n\n";
                    }
                    errorMsg += "Detalle técnico: " + error.message;

                    alert(errorMsg);
                    btnGoogleLogin.innerHTML = '<i class="fa-brands fa-google"></i> Continuar con Google';
                });
        });

        userProfileBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                window.firebaseSignOut(window.firebaseAuth);
            }
        });
    };

    // --- Utilities ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const showToast = (message) => {
        toast.querySelector('.toast-message').textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    };

    // --- Chart ---
    const initChart = () => {
        const ctx = chartCanvas.getContext('2d');
        Chart.defaults.color = 'var(--text-muted)';
        Chart.defaults.font.family = 'Inter';

        methodsChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Efectivo', 'Tarjeta', 'Transferencia', 'Cripto'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        '#00b894', // Success (Cash)
                        '#6c5ce7', // Primary (Card)
                        '#fdcb6e', // Warning (Transfer)
                        '#d63031'  // Danger (Crypto)
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: isDarkMode ? '#8d93aa' : '#636e72',
                            padding: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    }
                },
                cutout: '70%'
            }
        });
    };

    const updateChart = () => {
        const dataMap = { 'Efectivo': 0, 'Tarjeta': 0, 'Transferencia': 0, 'Cripto': 0 };
        sales.forEach(sale => {
            if (sale.type !== 'expense') {
                if (dataMap[sale.method] !== undefined) {
                    dataMap[sale.method] += sale.amount;
                }
            }
        });

        methodsChartInstance.data.datasets[0].data = [
            dataMap['Efectivo'],
            dataMap['Tarjeta'],
            dataMap['Transferencia'],
            dataMap['Cripto']
        ];

        methodsChartInstance.update();
    };

    // --- Streak Widget ---
    const setupStreakWidget = () => {
        const streakCount = document.getElementById('streak-count');
        const streakSubtitle = document.getElementById('streak-subtitle');
        const streakBadge = document.getElementById('streak-badge');

        // Build a set of unique dates from historyData (past closes) + today if has sales
        const daySet = new Set();
        historyData.forEach(s => {
            const day = new Date(s.timestamp).toISOString().split('T')[0];
            daySet.add(day);
        });
        // If today has sales, add today
        const todayKey = new Date().toISOString().split('T')[0];
        const todayHasSales = sales.some(s => s.type !== 'expense');
        if (todayHasSales) daySet.add(todayKey);

        // Count consecutive days ending today or yesterday
        let streak = 0;
        let checkDate = new Date();
        // Start from today if has sales, else from yesterday
        if (!todayHasSales) checkDate.setDate(checkDate.getDate() - 1);

        while (true) {
            const key = checkDate.toISOString().split('T')[0];
            if (daySet.has(key)) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        streakCount.textContent = streak;
        if (streak === 0) {
            streakSubtitle.textContent = '¡Registra una venta hoy para comenzar!';
            streakBadge.textContent = '💤';
        } else if (streak < 3) {
            streakSubtitle.textContent = '¡Buen comienzo! Sigue así.';
            streakBadge.textContent = '🔥';
        } else if (streak < 7) {
            streakSubtitle.textContent = `¡${streak} días seguidos! Imparable.`;
            streakBadge.textContent = '🔥🔥';
        } else {
            streakSubtitle.textContent = `¡Racha legen-daria de ${streak} días!`;
            streakBadge.textContent = '🏆';
        }
    };

    // --- Confetti Animation ---
    const fireConfetti = () => {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#6c5ce7', '#00b894', '#fdcb6e', '#fd79a8', '#a29bfe', '#55efc4'];
        for (let i = 0; i < 120; i++) {
            pieces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                size: Math.random() * 12 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 3 + 2,
                angle: Math.random() * Math.PI * 2,
                rotation: Math.random() * 0.3 - 0.15
            });
        }

        let animFrame;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let active = false;
            pieces.forEach(p => {
                p.y += p.speed;
                p.angle += p.rotation;
                if (p.y < canvas.height + 20) active = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
                ctx.restore();
            });
            if (active) animFrame = requestAnimationFrame(draw);
            else ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
        cancelAnimationFrame(animFrame);
        draw();
    };

    // --- KPI Trend Indicators (vs last closed session) ---
    const updateKPITrends = () => {
        if (historyData.length === 0) return;

        // Find dates of the last closed session (max date in historyData)
        const allDates = historyData.map(s => new Date(s.timestamp).toISOString().split('T')[0]);
        allDates.sort((a, b) => b.localeCompare(a));
        const lastDate = allDates[0];

        const lastSessionItems = historyData.filter(s =>
            new Date(s.timestamp).toISOString().split('T')[0] === lastDate
        );

        const lastRevenue = lastSessionItems.filter(s => s.type !== 'expense').reduce((sum, s) => sum + s.amount, 0);
        const lastCount = lastSessionItems.filter(s => s.type !== 'expense').length;
        const lastExpenses = lastSessionItems.filter(s => s.type === 'expense').reduce((sum, s) => sum + s.amount, 0);
        const lastBalance = lastRevenue - lastExpenses;

        // Current values
        const todaySales = sales.filter(s => s.type !== 'expense');
        const todayExpenses = sales.filter(s => s.type === 'expense');
        const todayRevenue = todaySales.reduce((sum, s) => sum + s.amount, 0);
        const todayCount = todaySales.length;
        const todayExpTotal = todayExpenses.reduce((sum, s) => sum + s.amount, 0);
        const todayBalance = todayRevenue - todayExpTotal;

        const renderTrend = (elId, today, yesterday) => {
            const el = document.getElementById(elId);
            if (!el) return;
            if (yesterday === 0) { el.innerHTML = ''; return; }
            const pct = ((today - yesterday) / Math.abs(yesterday)) * 100;
            const up = pct >= 0;
            const color = up ? 'var(--success)' : 'var(--danger)';
            const arrow = up ? '↑' : '↓';
            el.innerHTML = `<span style="color:${color};font-size:.78rem;font-weight:600;">${arrow} ${Math.abs(pct).toFixed(1)}% vs ayer</span>`;
        };

        renderTrend('kpi-trend-revenue', todayRevenue, lastRevenue);
        renderTrend('kpi-trend-count', todayCount, lastCount);
        renderTrend('kpi-trend-expenses', todayExpTotal, lastExpenses);
        renderTrend('kpi-trend-balance', todayBalance, lastBalance);
    };

    // --- KPIs ---
    const updateKPIs = () => {
        let totalRevenue = 0;
        let totalExpenses = 0;
        let totalSalesCount = 0;

        sales.forEach(sale => {
            if (sale.type === 'expense') {
                totalExpenses += sale.amount;
            } else {
                totalRevenue += sale.amount;
                totalSalesCount++;
            }
        });

        const netBalance = totalRevenue - totalExpenses;

        kpiRevenue.textContent = formatCurrency(totalRevenue);
        kpiSalesCount.textContent = totalSalesCount;
        kpiExpenses.textContent = formatCurrency(totalExpenses);
        kpiBalance.textContent = formatCurrency(netBalance);

        if (netBalance < 0) {
            kpiBalance.style.color = 'var(--danger)';
        } else {
            kpiBalance.style.color = '';
        }

        // Update Goal UI using only revenue
        const progressNum = Math.min((totalRevenue / dailyGoal) * 100, 100);
        goalText.textContent = `${formatCurrency(totalRevenue)} / ${formatCurrency(dailyGoal)}`;
        goalPercentage.textContent = `${progressNum.toFixed(1)}%`;
        goalProgressBar.style.width = `${progressNum}%`;

        if (progressNum >= 100) {
            goalProgressBar.style.background = 'var(--success)';
            goalPercentage.style.background = 'var(--success)';
            goalPercentage.style.color = 'white';
            if (!goalReachedNotified) {
                goalReachedNotified = true;
                fireConfetti();
                showToast('🎉 ¡Meta del día alcanzada! Excelente trabajo.');
            }
        } else {
            goalProgressBar.style.background = 'linear-gradient(90deg, var(--primary), var(--success))';
            goalPercentage.style.background = 'var(--primary-light)';
            goalPercentage.style.color = 'var(--primary)';
            goalReachedNotified = false;
        }

        updateChart();
        updateKPITrends();
        updatePeakHours();
        updateTopProduct();

        // Animated counter for KPI numbers
        animateKPICounter(kpiRevenue, totalRevenue, true);
        animateKPICounter(kpiSalesCount, totalSalesCount, false);
        animateKPICounter(kpiExpenses, totalExpenses, true);
        animateKPICounter(kpiBalance, netBalance, true);
    };

    // --- Animated KPI Counter ---
    const animateKPICounter = (el, targetVal, isCurrency) => {
        const duration = 600;
        const startTime = performance.now();
        const startVal = parseFloat(el.getAttribute('data-current') || '0');
        el.setAttribute('data-current', targetVal);

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = startVal + (targetVal - startVal) * eased;
            el.textContent = isCurrency ? formatCurrency(current) : Math.round(current);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = isCurrency ? formatCurrency(targetVal) : targetVal;
        };
        requestAnimationFrame(tick);
    };

    // --- Sales Rendering ---
    const renderSales = () => {
        salesBody.innerHTML = '';

        if (sales.length === 0) {
            emptyState.classList.add('active');
            document.querySelector('.table-container').style.display = 'none';
        } else {
            emptyState.classList.remove('active');
            document.querySelector('.table-container').style.display = 'block';

            const query = searchSalesInput.value.toLowerCase().trim();
            let filteredSales = sales.filter(s => s.product.toLowerCase().includes(query));

            // Apply category filter
            if (activeCategoryFilter) {
                filteredSales = filteredSales.filter(s => (s.category || '') === activeCategoryFilter);
            }

            // Order newest first
            const sortedSales = [...filteredSales].sort((a, b) => b.timestamp - a.timestamp);

            sortedSales.forEach(sale => {
                const tr = document.createElement('tr');

                const timeStr = new Date(sale.timestamp).toLocaleTimeString('es-ES', {
                    hour: '2-digit', minute: '2-digit'
                });

                const isExpense = sale.type === 'expense';
                const typeText = isExpense ? '<span style="color:var(--danger); font-size:0.8rem;"><i class="fa-solid fa-arrow-down"></i> Gasto</span>' : '<span style="color:var(--success); font-size:0.8rem;"><i class="fa-solid fa-arrow-up"></i> Ingreso</span>';
                const sign = isExpense ? '-' : '+';
                const amountColor = isExpense ? 'var(--danger)' : 'var(--text-main)';
                const notesHtml = sale.notes ? `<br><small style="color:var(--text-muted);font-weight:400;">📝 ${sale.notes}</small>` : '';
                const catHtml = sale.category ? `<span style="font-size:.72rem;color:var(--text-muted);margin-left:4px;">${sale.category}</span>` : '';
                const clientHtml = sale.customerName ? `<br><small style="color:var(--primary);font-weight:500;"><i class="fa-solid fa-user" style="font-size:.7rem;"></i> ${sale.customerName}</small>` : '';

                tr.innerHTML = `
                    <td>${timeStr}</td>
                    <td><strong>${sale.product}</strong>${catHtml}${clientHtml}${notesHtml}</td>
                    <td>${typeText}</td>
                    <td><span class="badge" style="background:var(--primary-light); color:var(--primary);">${sale.method}</span></td>
                    <td style="color: ${amountColor}; font-weight: bold;">${sign}${formatCurrency(sale.amount)}</td>
                    <td style="text-align: right;">
                        <button class="btn-icon btn-edit-sale" data-id="${sale.id}" title="Editar" style="color: var(--warning); opacity:0.85; margin-right:3px;">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon btn-receipt-sale" data-id="${sale.id}" title="Ver Recibo" style="color: var(--primary); opacity: 0.8; margin-right:4px;">
                            <i class="fa-solid fa-receipt"></i>
                        </button>
                        <button class="btn-icon btn-delete-sale" data-id="${sale.id}" title="Eliminar Transacción" style="color: var(--danger); opacity: 0.7;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                salesBody.appendChild(tr);
            });

            // Edit sale listeners
            document.querySelectorAll('.btn-edit-sale').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const saleId = parseInt(e.currentTarget.getAttribute('data-id'));
                    const sale = sales.find(s => s.id === saleId);
                    if (sale) openEditModal(sale, 'sales');
                });
            });

            // Delete specific sale listeners
            document.querySelectorAll('.btn-delete-sale').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idToRemove = parseInt(e.currentTarget.getAttribute('data-id'));
                    if (confirm('¿Estás seguro de que deseas eliminar este movimiento individual?')) {
                        sales = sales.filter(s => s.id !== idToRemove);
                        localStorage.setItem('dailySales', JSON.stringify(sales));
                        renderSales();
                        updateKPIs();
                        showToast('Transacción eliminada correctamente.');
                    }
                });
            });

            // Receipt listeners (today's sales)
            document.querySelectorAll('.btn-receipt-sale').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const saleId = parseInt(e.currentTarget.getAttribute('data-id'));
                    const sale = sales.find(s => s.id === saleId);
                    if (sale) openReceiptModal(sale);
                });
            });
        }
    };

    // --- Search Logic ---
    searchSalesInput.addEventListener('input', renderSales);

    // --- History Logic & Rendering ---
    const renderHistory = () => {
        historyBody.innerHTML = '';

        let filteredHistory = [...historyData];

        const dateQuery = historyDateFilter.value; // YYYY-MM-DD
        if (dateQuery) {
            filteredHistory = filteredHistory.filter(s => {
                const saleDate = new Date(s.timestamp).toISOString().split('T')[0];
                return saleDate === dateQuery;
            });
        }

        const textQuery = historySearch.value.toLowerCase().trim();
        if (textQuery) {
            filteredHistory = filteredHistory.filter(s =>
                s.product.toLowerCase().includes(textQuery) ||
                s.method.toLowerCase().includes(textQuery) ||
                (s.type === 'expense' ? 'gasto' : 'ingreso').includes(textQuery)
            );
        }

        if (filteredHistory.length === 0) {
            historyEmptyState.classList.add('active');
            document.querySelector('#view-historial .table-container').style.display = 'none';
        } else {
            historyEmptyState.classList.remove('active');
            document.querySelector('#view-historial .table-container').style.display = 'block';

            // Order newest first
            const sortedHistory = filteredHistory.sort((a, b) => b.timestamp - a.timestamp);

            sortedHistory.forEach(sale => {
                const tr = document.createElement('tr');
                const d = new Date(sale.timestamp);
                const dateStr = d.toLocaleDateString('es-ES') + ' ' + d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

                const isExpense = sale.type === 'expense';
                const typeText = isExpense ? '<span style="color:var(--danger); font-size:0.8rem;"><i class="fa-solid fa-arrow-down"></i> Gasto</span>' : '<span style="color:var(--success); font-size:0.8rem;"><i class="fa-solid fa-arrow-up"></i> Ingreso</span>';
                const sign = isExpense ? '-' : '+';
                const amountColor = isExpense ? 'var(--danger)' : 'var(--text-main)';
                const notesHtml = sale.notes ? `<br><small style="color:var(--text-muted);font-weight:400;">📝 ${sale.notes}</small>` : '';

                tr.innerHTML = `
                    <td>${dateStr}</td>
                    <td><strong>${sale.product}</strong>${notesHtml}</td>
                    <td>${typeText}</td>
                    <td><span class="badge" style="background:var(--primary-light); color:var(--primary);">${sale.method}</span></td>
                    <td style="color: ${amountColor}; font-weight: bold;">${sign}${formatCurrency(sale.amount)}</td>
                    <td style="text-align: right;">
                        <button class="btn-icon btn-receipt-history" data-id="${sale.id}" title="Ver Recibo" style="color: var(--primary); opacity: 0.8; margin-right:4px;">
                            <i class="fa-solid fa-receipt"></i>
                        </button>
                        <button class="btn-icon btn-delete-history" data-id="${sale.id}" title="Eliminar Permanente" style="color: var(--danger); opacity: 0.7;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                historyBody.appendChild(tr);
            });

            // Delete History listeners
            document.querySelectorAll('.btn-delete-history').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idToRemove = parseInt(e.currentTarget.getAttribute('data-id'));
                    if (confirm('¿Estás SEGURO de eliminar este registro del historial general?')) {
                        historyData = historyData.filter(h => h.id !== idToRemove);
                        localStorage.setItem('allHistoryData', JSON.stringify(historyData));
                        renderHistory();
                        showToast('Registro eliminado del historial.');
                    }
                });
            });

            // Receipt listeners (history)
            document.querySelectorAll('.btn-receipt-history').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const saleId = parseInt(e.currentTarget.getAttribute('data-id'));
                    const sale = historyData.find(s => s.id === saleId);
                    if (sale) openReceiptModal(sale);
                });
            });
        }
    };

    historySearch.addEventListener('input', renderHistory);
    historyDateFilter.addEventListener('change', renderHistory);

    historyClearAll.addEventListener('click', () => {
        if (historyData.length === 0) return;
        if (confirm('ALERTA: Vas a limpiar absolutamente TODO EL HISTORIAL MUNDIAL. Esta acción no se puede recuperar nunca. ¿Continuar?')) {
            historyData = [];
            localStorage.setItem('allHistoryData', JSON.stringify(historyData));
            renderHistory();
            showToast('Historial general purgado.');
        }
    });

    historyExportCsv.addEventListener('click', () => {
        if (historyData.length === 0) {
            showToast('No hay historial para exportar');
            return;
        }

        let csvContent = "Fecha,Hora,Descripción,Tipo,Método,Monto\n";
        historyData.forEach(sale => {
            const d = new Date(sale.timestamp);
            const dateStr = d.toLocaleDateString('es-ES');
            const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            const desc = `"${sale.product.replace(/"/g, '""')}"`;
            const typeText = sale.type === 'expense' ? 'Gasto' : 'Ingreso';
            const amountWithSign = sale.type === 'expense' ? -sale.amount : sale.amount;

            csvContent += `${dateStr},${timeStr},${desc},${typeText},${sale.method},${amountWithSign.toFixed(2)}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `historial_global_zaleasy_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Exportación Global Descargada');
    });

    // --- Event Listeners ---
    quickAmountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = parseFloat(btn.getAttribute('data-amount'));
            // Apply to the last focused amount input in the multi-item list
            const focused = document.querySelector('.item-amount-input:focus');
            const target = focused || document.querySelector('.item-amount-input:last-of-type') ||
                document.querySelector('.item-row:last-child .item-amount-input');
            if (target) {
                target.value = val.toFixed(2);
                target.dispatchEvent(new Event('input', { bubbles: true }));
                target.parentElement.style.transform = 'scale(1.05)';
                setTimeout(() => target.parentElement.style.transform = 'scale(1)', 200);
            }
        });
    });

    saleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect all items from the multi-item container
        const itemRows = document.querySelectorAll('.item-row');
        const method = methodSelect.value;
        const notes = notesInput ? notesInput.value.trim() : '';
        const customerName = customerNameInput ? customerNameInput.value.trim() : '';
        const baseTimestamp = Date.now();

        const itemsToAdd = [];
        let hasError = false;

        itemRows.forEach((row, idx) => {
            const prodEl = row.querySelector('.item-product-input');
            const amtEl = row.querySelector('.item-amount-input');
            const catEl = row.querySelector('.item-category-select');
            const product = prodEl ? prodEl.value.trim() : '';
            const amount = amtEl ? parseFloat(amtEl.value) : NaN;
            const category = catEl ? catEl.value : '';

            if (!product || isNaN(amount) || amount <= 0) {
                prodEl && (prodEl.style.borderColor = 'var(--danger)');
                amtEl && (amtEl.style.borderColor = 'var(--danger)');
                hasError = true;
                return;
            }
            prodEl && (prodEl.style.borderColor = '');
            amtEl && (amtEl.style.borderColor = '');
            itemsToAdd.push({ product, amount, category });
        });

        if (hasError || itemsToAdd.length === 0) {
            showToast('\u26a0\ufe0f Revisá los ítems: descripción y monto son obligatorios.');
            return;
        }

        let totalAdded = 0;
        itemsToAdd.forEach((item, idx) => {
            const newSale = {
                id: baseTimestamp + idx,
                timestamp: baseTimestamp + idx,
                product: item.product,
                amount: item.amount,
                method,
                type: currentTransactionType,
                notes,
                category: item.category,
                customerName
            };
            sales.push(newSale);
            totalAdded += item.amount;

            // Autocomplete
            if (!recentProducts.includes(item.product)) {
                recentProducts.unshift(item.product);
                if (recentProducts.length > 20) recentProducts.pop();
            }
        });

        localStorage.setItem('dailySales', JSON.stringify(sales));
        localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
        setupAutocomplete();

        // Reset multi-item form to a single empty row
        if (notesInput) notesInput.value = '';
        if (customerNameInput) customerNameInput.value = '';
        resetMultiItems();

        // Update UI
        renderSales();
        updateKPIs();
        setupStreakWidget();
        updateTopProduct();
        updatePeakHours();

        const label = itemsToAdd.length > 1
            ? `\u2705 ${itemsToAdd.length} ítems registrados por ${formatCurrency(totalAdded)}`
            : `Venta de ${formatCurrency(totalAdded)} registrada!`;
        showToast(label);

        // Alert Threshold Check (use first large item)
        itemsToAdd.forEach(item => {
            if (alertThreshold > 0 && item.amount >= alertThreshold && currentTransactionType !== 'expense') {
                setTimeout(() => showBigSaleAlert(item.amount, item.product), 500);
            }
        });
    });

    clearSalesBtn.addEventListener('click', () => {
        if (sales.length === 0) return;
        if (confirm('¿Estás seguro de que deseas limpiar todo el historial de ventas del día? Esta acción no se puede deshacer.')) {
            sales = [];
            localStorage.setItem('dailySales', JSON.stringify(sales));
            renderSales();
            updateKPIs();
            showToast('Historial limpiado correctamente.');
        }
    });

    // --- Goal Modal Config ---
    editGoalBtn.addEventListener('click', () => {
        newGoalInput.value = dailyGoal;
        goalModal.classList.add('active');
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            goalModal.classList.remove('active');
            closeRegisterModal.classList.remove('active');
            calculatorModal.classList.remove('active');
            if (receiptModal) receiptModal.classList.remove('active');
            if (editModal) editModal.classList.remove('active');
            const converterModal = document.getElementById('converter-modal');
            if (converterModal) converterModal.classList.remove('active');
        });
    });

    if (closeEditModalBtn) closeEditModalBtn.addEventListener('click', () => editModal.classList.remove('active'));

    // --- Edit Modal Setup ---
    const openEditModal = (sale, source) => {
        editIdInput.value = sale.id;
        editIdInput.setAttribute('data-source', source);
        editProductInput.value = sale.product;
        editAmountInput.value = sale.amount;
        editMethodSelect.value = sale.method;
        editCategorySelect.value = sale.category || '';
        editNotesInput.value = sale.notes || '';
        editTransactionType = sale.type || 'income';

        // Set type toggle UI
        if (editTransactionType === 'expense') {
            editTypeExpense.className = 'btn';
            editTypeExpense.style.cssText = 'flex:1;background:var(--danger);color:white;border:none;';
            editTypeIncome.className = 'btn btn-outline';
            editTypeIncome.style.cssText = 'flex:1;';
        } else {
            editTypeIncome.className = 'btn btn-primary';
            editTypeIncome.style.cssText = 'flex:1;';
            editTypeExpense.className = 'btn btn-outline';
            editTypeExpense.style.cssText = 'flex:1;';
        }
        editModal.classList.add('active');
    };

    const setupEditModal = () => {
        if (!editTypeIncome || !editTypeExpense) return;

        editTypeIncome.addEventListener('click', () => {
            editTransactionType = 'income';
            editTypeIncome.className = 'btn btn-primary';
            editTypeIncome.style.cssText = 'flex:1;';
            editTypeExpense.className = 'btn btn-outline';
            editTypeExpense.style.cssText = 'flex:1;';
        });

        editTypeExpense.addEventListener('click', () => {
            editTransactionType = 'expense';
            editTypeExpense.className = 'btn';
            editTypeExpense.style.cssText = 'flex:1;background:var(--danger);color:white;border:none;';
            editTypeIncome.className = 'btn btn-outline';
            editTypeIncome.style.cssText = 'flex:1;';
        });

        btnSaveEdit.addEventListener('click', () => {
            const id = parseInt(editIdInput.value);
            const source = editIdInput.getAttribute('data-source');
            const product = editProductInput.value.trim();
            const amount = parseFloat(editAmountInput.value);

            if (!product || isNaN(amount) || amount <= 0) {
                alert('Por favor, ingresa datos válidos.');
                return;
            }

            const updateFn = (arr) => arr.map(s => s.id === id ? {
                ...s,
                product,
                amount,
                method: editMethodSelect.value,
                category: editCategorySelect.value,
                notes: editNotesInput.value.trim(),
                type: editTransactionType
            } : s);

            if (source === 'sales') {
                sales = updateFn(sales);
                localStorage.setItem('dailySales', JSON.stringify(sales));
                renderSales();
                updateKPIs();
            } else {
                historyData = updateFn(historyData);
                localStorage.setItem('allHistoryData', JSON.stringify(historyData));
                renderHistory();
            }

            editModal.classList.remove('active');
            showToast('✅ Transacción actualizada correctamente.');
        });
    };

    // Also close receipt modal with close-modal-close buttons inside it
    document.querySelectorAll('#receipt-modal .close-modal-close').forEach(btn => {
        btn.addEventListener('click', () => receiptModal.classList.remove('active'));
    });

    // --- Receipt Modal Logic ---
    let currentReceiptSale = null; // Store for printing

    const openReceiptModal = (sale) => {
        currentReceiptSale = sale;
        const d = new Date(sale.timestamp);
        const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const isExpense = sale.type === 'expense';
        const sign = isExpense ? '-' : '+';
        const amountColor = isExpense ? '#d63031' : '#00b894';
        const typeLabel = isExpense ? 'Gasto' : 'Ingreso / Venta';

        receiptBody.innerHTML = `
            <div style="text-align:center; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:2px dashed var(--border-color);">
                <p style="font-size:1.5rem; margin-bottom:.3rem;">${isExpense ? '💸' : '💰'}</p>
                <h3 style="font-size:1.5rem; color:${amountColor};">${sign}${formatCurrency(sale.amount)}</h3>
                <p style="color:var(--text-muted); font-size:.9rem; margin-top:.3rem;">${typeLabel}</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:.8rem;">
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Descripción</span>
                    <strong>${sale.product}</strong>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Método de Pago</span>
                    <span style="background:rgba(108,92,231,0.15);color:#6c5ce7;padding:.2rem .6rem;border-radius:20px;font-size:.75rem;font-weight:600;">${sale.method}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Fecha</span>
                    <span>${dateStr}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Hora</span>
                    <span>${timeStr}</span>
                </div>
                ${sale.notes ? `<div style="display:flex; justify-content:space-between; gap:1rem;">
                    <span style="color:var(--text-muted);">Notas</span>
                    <span style="text-align:right;">${sale.notes}</span>
                </div>` : ''}
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Negocio</span>
                    <strong>${storeName}</strong>
                </div>
            </div>
            <div style="text-align:center; margin-top:1.5rem; padding-top:1rem; border-top:2px dashed var(--border-color); color:var(--text-muted); font-size:.8rem;">
                Generado por Zaleasy • ID: #${sale.id.toString().slice(-6)}
            </div>
        `;
        receiptModal.classList.add('active');
    };

    // --- Print Receipt via dedicated popup window ---
    const printReceipt = () => {
        if (!currentReceiptSale) return;
        const sale = currentReceiptSale;
        const d = new Date(sale.timestamp);
        const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const isExpense = sale.type === 'expense';
        const sign = isExpense ? '-' : '+';
        const amountColor = isExpense ? '#d63031' : '#00b894';
        const typeLabel = isExpense ? 'Gasto' : 'Ingreso / Venta';
        const amountFormatted = formatCurrency(sale.amount);
        const notesRow = sale.notes
            ? `<tr><td style="color:#636e72;padding:.6rem 0;">Notas</td><td style="text-align:right;padding:.6rem 0;">${sale.notes}</td></tr>`
            : '';

        const printHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Recibo - ${storeName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #fff;
            color: #2d3436;
            display: flex;
            justify-content: center;
            padding: 2rem;
        }
        .receipt {
            width: 100%;
            max-width: 380px;
            border: 1px solid #dfe6e9;
            border-radius: 12px;
            overflow: hidden;
        }
        .receipt-header {
            background: linear-gradient(135deg, #6c5ce7, #a29bfe);
            color: white;
            text-align: center;
            padding: 1.5rem;
        }
        .receipt-header .business-name {
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: .2rem;
        }
        .receipt-header .receipt-type {
            font-size: .85rem;
            opacity: .85;
        }
        .receipt-amount {
            text-align: center;
            padding: 1.5rem;
            border-bottom: 2px dashed #dfe6e9;
        }
        .receipt-amount .emoji { font-size: 2rem; margin-bottom: .5rem; }
        .receipt-amount .amount {
            font-size: 2.5rem;
            font-weight: 800;
            color: ${amountColor};
            line-height: 1;
        }
        .receipt-amount .type-label {
            font-size: .85rem;
            color: #636e72;
            margin-top: .3rem;
        }
        .receipt-body {
            padding: 1.2rem 1.5rem;
        }
        .receipt-body table {
            width: 100%;
            border-collapse: collapse;
        }
        .receipt-body td {
            padding: .7rem 0;
            font-size: .9rem;
            border-bottom: 1px solid #f0f0f0;
            vertical-align: top;
        }
        .receipt-body td:first-child {
            color: #636e72;
            width: 40%;
        }
        .receipt-body td:last-child {
            text-align: right;
            font-weight: 600;
        }
        .badge {
            background: rgba(108,92,231,0.12);
            color: #6c5ce7;
            padding: .2rem .6rem;
            border-radius: 20px;
            font-size: .8rem;
            font-weight: 600;
        }
        .receipt-footer {
            text-align: center;
            padding: 1rem 1.5rem;
            border-top: 2px dashed #dfe6e9;
            color: #b2bec3;
            font-size: .75rem;
        }
        @media print {
            body { padding: 0; }
            .receipt { border: none; max-width: 100%; }
        }
    </style>
</head>
<body>
    <div class="receipt">
        <div class="receipt-header">
            <div class="business-name">${storeName}</div>
            <div class="receipt-type">Comprobante de Transacción</div>
        </div>
        <div class="receipt-amount">
            <div class="emoji">${isExpense ? '💸' : '💰'}</div>
            <div class="amount">${sign}${amountFormatted}</div>
            <div class="type-label">${typeLabel}</div>
        </div>
        <div class="receipt-body">
            <table>
                <tr>
                    <td>Descripción</td>
                    <td>${sale.product}</td>
                </tr>
                <tr>
                    <td>Método</td>
                    <td><span class="badge">${sale.method}</span></td>
                </tr>
                <tr>
                    <td>Fecha</td>
                    <td>${dateStr}</td>
                </tr>
                <tr>
                    <td>Hora</td>
                    <td>${timeStr}</td>
                </tr>
                ${notesRow}
            </table>
        </div>
        <div class="receipt-footer">
            Generado por Zaleasy &bull; ID #${sale.id.toString().slice(-6)}
        </div>
    </div>
    <script>
        window.onload = () => { window.print(); window.close(); }
    </script>
</body>
</html>`;

        const printWin = window.open('', '_blank', 'width=460,height=650');
        if (printWin) {
            printWin.document.write(printHtml);
            printWin.document.close();
        } else {
            alert('El navegador bloqueó la ventana emergente. Por favor, permite las ventanas emergentes para esta página e intenta de nuevo.');
        }
    };

    if (btnPrintReceipt) {
        btnPrintReceipt.addEventListener('click', printReceipt);
    }


    saveGoalBtn.addEventListener('click', () => {
        const val = parseFloat(newGoalInput.value);
        if (!isNaN(val) && val > 0) {
            dailyGoal = val;
            localStorage.setItem('dailyGoal', dailyGoal);
            updateKPIs();
            goalModal.classList.remove('active');
            showToast('Meta diaria actualizada');
        } else {
            alert('Ingresa una meta válida');
        }
    });

    // --- Calculator Logic ---
    btnCalculator.addEventListener('click', () => {
        // Get amount from the last focused item, or first item in multi-item list
        const focusedAmt = lastFocusedAmountInput;
        const firstAmt = document.querySelector('.item-amount-input');
        const amount = parseFloat((focusedAmt || firstAmt)?.value) || 0;
        calcTotalInput.value = amount.toFixed(2);
        calcReceivedInput.value = '';
        calcChangeDisplay.textContent = '$0.00';
        calcChangeDisplay.style.color = 'var(--primary)';
        calculatorModal.classList.add('active');

        setTimeout(() => calcReceivedInput.focus(), 100);
    });

    calcReceivedInput.addEventListener('input', () => {
        const total = parseFloat(calcTotalInput.value) || 0;
        const received = parseFloat(calcReceivedInput.value) || 0;
        const change = received - total;

        if (received === 0 || isNaN(received)) {
            calcChangeDisplay.textContent = '$0.00';
            calcChangeDisplay.style.color = 'var(--text-muted)';
        } else if (change >= 0) {
            calcChangeDisplay.textContent = formatCurrency(change);
            calcChangeDisplay.style.color = 'var(--success)';
        } else {
            calcChangeDisplay.textContent = 'Monto insuficiente';
            calcChangeDisplay.style.color = 'var(--danger)';
        }
    });

    // --- Close Register Logic ---
    btnCloseRegister.addEventListener('click', () => {
        if (sales.length === 0) {
            alert('No hay movimientos registrados para hacer un cierre de caja.');
            return;
        }

        const incomeMap = { 'Efectivo': 0, 'Tarjeta': 0, 'Transferencia': 0, 'Cripto': 0 };
        let totalIncome = 0;
        let totalExpense = 0;

        sales.forEach(s => {
            if (s.type === 'expense') {
                totalExpense += s.amount;
            } else {
                incomeMap[s.method] += s.amount;
                totalIncome += s.amount;
            }
        });

        let summaryHtml = Object.entries(incomeMap)
            .map(([method, amount]) => `
                <div class="summary-item">
                    <span>${method} (Ingreso)</span>
                    <strong style="color: var(--success);">${formatCurrency(amount)}</strong>
                </div>
            `).join('');

        summaryHtml += `
            <div class="summary-item" style="border-color: var(--danger);">
                <span>Total Gastos</span>
                <strong style="color: var(--danger);">-${formatCurrency(totalExpense)}</strong>
            </div>
            <div class="summary-item" style="background: var(--primary-light);">
                <span>Neto</span>
                <strong style="color: var(--primary);">${formatCurrency(totalIncome - totalExpense)}</strong>
            </div>
        `;

        closeSummaryGrid.innerHTML = summaryHtml;
        closeTotalDay.textContent = formatCurrency(totalIncome - totalExpense);

        closeRegisterModal.classList.add('active');
    });

    btnConfirmClose.addEventListener('click', () => {
        // Guardar las ventas de "hoy" dentro del historial completo histórico antes de borrarlas
        sales.forEach(s => {
            historyData.push(s);
        });
        localStorage.setItem('allHistoryData', JSON.stringify(historyData));

        // Limpiar "Dashboard Diario"
        sales = [];
        localStorage.setItem('dailySales', JSON.stringify(sales));
        // Reset session timer
        sessionStartTime = Date.now();
        localStorage.setItem('sessionStartTime', sessionStartTime);
        renderSales();
        updateKPIs();
        setupStreakWidget();
        updateTopProduct();
        updatePeakHours();
        closeRegisterModal.classList.remove('active');
        showToast('Cierre de caja completado con éxito!');
    });

    // --- Export CSV ---
    document.getElementById('export-csv').addEventListener('click', () => {
        if (sales.length === 0) {
            showToast('No hay datos para exportar');
            return;
        }

        let csvContent = "Fecha,Hora,Descripción,Tipo,Método,Monto\n";

        sales.forEach(sale => {
            const d = new Date(sale.timestamp);
            const dateStr = d.toLocaleDateString('es-ES');
            const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
            const desc = `"${sale.product.replace(/"/g, '""')}"`;
            const typeText = sale.type === 'expense' ? 'Gasto' : 'Ingreso';
            const amountWithSign = sale.type === 'expense' ? -sale.amount : sale.amount;

            csvContent += `${dateStr},${timeStr},${desc},${typeText},${sale.method},${amountWithSign.toFixed(2)}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `ventas_${new Date().toLocaleDateString('es-ES').replace(/\//g, '-')}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Archivo CSV descargado');
    });

    // --- Autocomplete Logic ---
    const setupAutocomplete = () => {
        let datalist = document.getElementById('products-datalist');
        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'products-datalist';
            document.body.appendChild(datalist);
            // All .item-product-input elements already have list="products-datalist" in their template
        }

        datalist.innerHTML = '';
        recentProducts.forEach(prod => {
            const option = document.createElement('option');
            option.value = prod;
            datalist.appendChild(option);
        });
        // Connect all current item product inputs to datalist
        document.querySelectorAll('.item-product-input').forEach(inp => {
            inp.setAttribute('list', 'products-datalist');
        });
    };

    // --- Import Backup Logic ---
    const setupImportBackup = () => {
        const importInput = document.getElementById('btn-import-data');
        if (!importInput) return;
        importInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                try {
                    const data = JSON.parse(ev.target.result);
                    if (!data || typeof data !== 'object') throw new Error('Formato inválido');

                    const confirmed = confirm(
                        `Se encontraron ${(data.sales || []).length} ventas de hoy y ${(data.historyData || []).length} registros históricos.\n\n` +
                        `¿Deseas FUSIONAR estos datos con los actuales o REEMPLAZAR TODO?\n\n` +
                        `Presiona ACEPTAR para FUSIONAR o CANCELAR para cancelar la importación.`
                    );

                    if (confirmed) {
                        // Merge: combine IDs to avoid duplicates
                        const currentSaleIds = new Set(sales.map(s => s.id));
                        const newSales = (data.sales || []).filter(s => !currentSaleIds.has(s.id));
                        sales = [...sales, ...newSales];

                        const currentHistoryIds = new Set(historyData.map(s => s.id));
                        const newHistory = (data.historyData || []).filter(s => !currentHistoryIds.has(s.id));
                        historyData = [...historyData, ...newHistory];

                        localStorage.setItem('dailySales', JSON.stringify(sales));
                        localStorage.setItem('allHistoryData', JSON.stringify(historyData));

                        if (data.storeName) {
                            storeName = data.storeName;
                            localStorage.setItem('storeName', storeName);
                            document.getElementById('sidebar-brand-name').innerText = storeName;
                        }
                        if (data.dailyGoal) {
                            dailyGoal = data.dailyGoal;
                            localStorage.setItem('dailyGoal', dailyGoal);
                        }
                        if (data.recentProducts) {
                            recentProducts = data.recentProducts;
                            localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
                            setupAutocomplete();
                        }

                        renderSales();
                        updateKPIs();
                        setupStreakWidget();
                        showToast(`✅ Importación exitosa: +${newSales.length} ventas, +${newHistory.length} históricos.`);
                    }
                } catch (err) {
                    alert('Error al leer el archivo: ' + err.message);
                }
                importInput.value = ''; // Reset so same file can re-trigger
            };
            reader.readAsText(file);
        });
    };

    // --- Big Sale Alert ---
    const showBigSaleAlert = (amount, product) => {
        fireConfetti();
        // Show a special styled toast
        const toast = document.getElementById('toast');
        if (!toast) return;
        const icon = toast.querySelector('.toast-icon');
        const title = toast.querySelector('.toast-title');
        const msg = toast.querySelector('.toast-message');
        if (icon) { icon.innerHTML = '🚀'; icon.style.fontSize = '1.8rem'; }
        if (title) title.textContent = '¡Venta Grande! 💰';
        if (msg) msg.textContent = `${product}: ${formatCurrency(amount)} — ¡Excelente!`;
        toast.style.borderLeftColor = 'var(--warning)';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.style.borderLeftColor = 'var(--success)';
            if (icon) { icon.innerHTML = '<i class="fa-solid fa-check"></i>'; icon.style.fontSize = ''; }
        }, 4000);
    };

    // Run app
    init();
});
