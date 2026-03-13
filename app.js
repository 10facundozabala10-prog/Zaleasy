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
    const btnShareSummary = document.getElementById('btn-share-summary');
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
    const editCashBaseBtn = document.getElementById('edit-cash-base');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-close');
    const saveGoalBtn = document.getElementById('save-goal');
    const newGoalInput = document.getElementById('new-goal');
    const chartCanvas = document.getElementById('methodsChart');

    // Receipt Modal Elements
    const receiptModal = document.getElementById('receipt-modal');
    const receiptBody = document.getElementById('receipt-body');
    const btnPrintReceipt = document.getElementById('btn-print-receipt');
    const btnWhatsappReceipt = document.getElementById('btn-whatsapp-receipt');

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
    let cashBase = parseFloat(localStorage.getItem('cashBase')) || 0;

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
    navConfig.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-config', 'Configuraci\u00f3n de Empresa'); });

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
            const cat = s.category || 'Sin categor\u00eda';
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

    const editSidebarBrandBtn = document.getElementById('edit-sidebar-brand');
    if (editSidebarBrandBtn) {
        editSidebarBrandBtn.addEventListener('click', () => {
            const newName = prompt('Ingresa el nuevo nombre de tu negocio/proyecto:', storeName);
            if (newName !== null && newName.trim() !== '') {
                storeName = newName.trim();
                localStorage.setItem('storeName', storeName);
                document.getElementById('sidebar-brand-name').innerText = storeName;
                configStoreNameInput.value = storeName;
                showToast('Nombre del negocio actualizado');
            }
        });
    }

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
        if (confirm('\u00bfEST\u00c1S COMPLETAMENTE SEGURO? Esto borrar\u00e1 tu cuenta, tu historial, tus configuraciones y todos tus datos registrados. La aplicaci\u00f3n volver\u00e1 a quedar como reci\u00e9n instalada.')) {
            if (confirm('\u00daLTIMA ADVERTENCIA: Esta acci\u00f3n es final e irreversible. \u00bfEjecutar borrado y reiniciar sistema?')) {
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
        setupWeeklySummary();
        setupQuickProducts();
        updateMonthlyProjection();
        updateSecondaryMetrics();
        updateActivityFeed();
    };

    // --- Date & Greeting ---
    const setupDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('es-ES', options);

        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            greetingEl.innerHTML = '\u00a1Buenos d\u00edas! ☀️';
        } else if (currentHour < 19) {
            greetingEl.innerHTML = '\u00a1Buenas tardes! 🌤️';
        } else {
            greetingEl.innerHTML = '\u00a1Buenas noches! 🌙';
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
            nameEl.textContent = 'Sin ventas a\u00fan';
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
            subtitle.textContent = 'Registra ventas para ver tu hora m\u00e1s activa.';
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
                `\n_Generado con ${storeName}_`;

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
                <button type="button" class="item-remove-btn" title="Eliminar \u00edtem" ${isFirst ? 'style="visibility:hidden;"' : ''}>
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
        const emailAuthForm = document.getElementById('email-auth-form');
        const authEmailInput = document.getElementById('auth-email');
        const authPasswordInput = document.getElementById('auth-password');
        const btnEmailRegister = document.getElementById('btn-email-register');

        // Fallback for visual testing if Firebase script is commented out or missing
        if (!window.firebaseAuth) {
            console.log("Firebase no configurado a\u00fan. Mostrando UI Demo.");

            btnGoogleLogin.addEventListener('click', () => {
                // Simulate login
                authScreen.style.display = 'none';
                mainApp.style.display = 'flex';
                showToast('Modo de Prueba (Sin Nube)');
            });

            if (emailAuthForm) {
                emailAuthForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    authScreen.style.display = 'none';
                    mainApp.style.display = 'flex';
                    showToast('Modo de Prueba (Email) (Sin Nube)');
                });
            }
            if (btnEmailRegister) {
                btnEmailRegister.addEventListener('click', (e) => {
                    e.preventDefault();
                    authScreen.style.display = 'none';
                    mainApp.style.display = 'flex';
                    showToast('Modo de Prueba (Registro) (Sin Nube)');
                });
            }

            userProfileBtn.addEventListener('click', () => {
                if (confirm('\u00bfCerrar sesi\u00f3n de prueba?')) {
                    mainApp.style.display = 'none';
                    authScreen.style.display = 'flex';
                }
            });
            return;
        }

        // Real Firebase Auth Flow — FREE ACCESS (monetized via Google Ads)
        window.firebaseOnAuth(window.firebaseAuth, (user) => {
            if (user) {
                // Logged in — direct access, no paywall
                authScreen.style.display = 'none';
                if (trialScreen) trialScreen.style.display = 'none';
                mainApp.style.display = 'flex';
                userAvatar.src = user.photoURL || "https://ui-avatars.com/api/?name=" + (user.displayName || "User") + "&background=6c5ce7&color=fff";
                showToast(`\u00a1Bienvenid@, ${user.displayName ? user.displayName.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'Usuario')}! 🚀`);
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

                    let errorMsg = "Error en el inicio de sesi\u00f3n.\n\n";
                    if (window.location.protocol === 'file:') {
                        errorMsg += "⚠️ IMPORTANTE: Est\u00e1s abriendo el archivo localmente (file:///). Firebase requiere que uses un servidor local o que la p\u00e1gina est\u00e9 subida a internet para que el login de Google funcione.\n\n";
                    } else {
                        errorMsg += "Aseg\u00farate de haber 'Habilitado' Google en la pesta\u00f1a Authentication de tu consola de Firebase.\n\n";
                    }
                    errorMsg += "Detalle t\u00e9cnico: " + error.message;

                    alert(errorMsg);
                    btnGoogleLogin.innerHTML = '<i class="fa-brands fa-google" style="color: #4285F4;"></i> Continuar con Google';
                });
        });

        if (emailAuthForm) {
            emailAuthForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = authEmailInput.value;
                const password = authPasswordInput.value;
                const btnOriginalText = document.getElementById('btn-email-login').innerHTML;
                document.getElementById('btn-email-login').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Iniciando...';

                window.firebaseSignInWithEmail(window.firebaseAuth, email, password)
                    .catch((error) => {
                        console.error("Error en login por email:", error);
                        alert("Error al iniciar sesi\u00f3n: " + error.message);
                        document.getElementById('btn-email-login').innerHTML = btnOriginalText;
                    });
            });
        }

        if (btnEmailRegister) {
            btnEmailRegister.addEventListener('click', (e) => {
                e.preventDefault();
                if (!emailAuthForm.checkValidity()) {
                    emailAuthForm.reportValidity();
                    return;
                }
                const email = authEmailInput.value;
                const password = authPasswordInput.value;
                const btnOriginalText = btnEmailRegister.innerHTML;
                btnEmailRegister.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Registrando...';

                window.firebaseCreateUserWithEmail(window.firebaseAuth, email, password)
                    .catch((error) => {
                        console.error("Error en registro por email:", error);
                        alert("Error al registrar: " + error.message);
                        btnEmailRegister.innerHTML = btnOriginalText;
                    });
            });
        }

        userProfileBtn.addEventListener('click', () => {
            if (confirm('\u00bfEst\u00e1s seguro de que deseas cerrar sesi\u00f3n?')) {
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
            streakSubtitle.textContent = '\u00a1Registra una venta hoy para comenzar!';
            streakBadge.textContent = '💤';
        } else if (streak < 3) {
            streakSubtitle.textContent = '\u00a1Buen comienzo! Sigue as\u00ed.';
            streakBadge.textContent = '🔥';
        } else if (streak < 7) {
            streakSubtitle.textContent = `\u00a1${streak} d\u00edas seguidos! Imparable.`;
            streakBadge.textContent = '🔥🔥';
        } else {
            streakSubtitle.textContent = `\u00a1Racha legen-daria de ${streak} d\u00edas!`;
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
                showToast('🎉 \u00a1Meta del d\u00eda alcanzada! Excelente trabajo.');
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
        updateSecondaryMetrics();
        updateActivityFeed();

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
                        <button class="btn-icon btn-delete-sale" data-id="${sale.id}" title="Eliminar Transacci\u00f3n" style="color: var(--danger); opacity: 0.7;">
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
                    if (confirm('\u00bfEst\u00e1s seguro de que deseas eliminar este movimiento individual?')) {
                        sales = sales.filter(s => s.id !== idToRemove);
                        localStorage.setItem('dailySales', JSON.stringify(sales));
                        renderSales();
                        updateKPIs();
                        showToast('Transacci\u00f3n eliminada correctamente.');
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
                    if (confirm('\u00bfEst\u00e1s SEGURO de eliminar este registro del historial general?')) {
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
        if (confirm('ALERTA: Vas a limpiar absolutamente TODO EL HISTORIAL MUNDIAL. Esta acci\u00f3n no se puede recuperar nunca. \u00bfContinuar?')) {
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

        let csvContent = "Fecha,Hora,Descripci\u00f3n,Tipo,M\u00e9todo,Monto\n";
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
        showToast('Exportaci\u00f3n Global Descargada');
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
            showToast('\u26a0\ufe0f Revis\u00e1 los \u00edtems: descripci\u00f3n y monto son obligatorios.');
            return;
        }

        let totalAdded = 0;
        const groupId = baseTimestamp; // shared group ID for all items in this submit
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
                customerName,
                groupId
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
        setupWeeklySummary();
        setupQuickProducts();
        updateMonthlyProjection();

        const label = itemsToAdd.length > 1
            ? `\u2705 ${itemsToAdd.length} \u00edtems registrados por ${formatCurrency(totalAdded)}`
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
        if (confirm('\u00bfEst\u00e1s seguro de que deseas limpiar todo el historial de ventas del d\u00eda? Esta acci\u00f3n no se puede deshacer.')) {
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

    if (editCashBaseBtn) {
        editCashBaseBtn.addEventListener('click', () => {
            const currentStr = cashBase.toFixed(2);
            const newBaseStr = prompt('Ingresa el monto inicial (base) en caja hoy:', currentStr);
            if (newBaseStr !== null) {
                const parsed = parseFloat(newBaseStr.replace(',', '.').replace(/[^0-9.-]/g, ''));
                if (!isNaN(parsed) && parsed >= 0) {
                    cashBase = parsed;
                    localStorage.setItem('cashBase', cashBase);
                    updateSecondaryMetrics();
                    showToast('Base de caja actualizada');
                } else {
                    alert('Por favor, ingresa un monto num\u00e9rico v\u00e1lido.');
                }
            }
        });
    }

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
                alert('Por favor, ingresa datos v\u00e1lidos.');
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
            showToast('✅ Transacci\u00f3n actualizada correctamente.');
        });
    };

    // Also close receipt modal with close-modal-close buttons inside it
    document.querySelectorAll('#receipt-modal .close-modal-close').forEach(btn => {
        btn.addEventListener('click', () => receiptModal.classList.remove('active'));
    });

    // --- Receipt Modal Logic ---
    let currentReceiptSale = null; // Store for printing
    let currentReceiptGroup = []; // All items in the same group

    const openReceiptModal = (sale) => {
        currentReceiptSale = sale;

        // Find all items belonging to the same group (same groupId, or just this sale)
        const allData = [...sales, ...historyData];
        const groupItems = sale.groupId
            ? allData.filter(s => s.groupId === sale.groupId)
            : [sale];
        // Sort by id ascending
        groupItems.sort((a, b) => a.id - b.id);
        currentReceiptGroup = groupItems;

        const repr = groupItems[0]; // use first item for date/method reference
        const d = new Date(repr.timestamp);
        const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const isExpense = repr.type === 'expense';
        const amountColor = isExpense ? '#d63031' : '#00b894';
        const typeLabel = isExpense ? 'Gasto' : 'Ingreso / Venta';
        const totalAmount = groupItems.reduce((sum, s) => sum + s.amount, 0);
        const sign = isExpense ? '-' : '+';
        const isMulti = groupItems.length > 1;

        // Build items rows
        const itemsHtml = isMulti ? `
            <div style="margin-bottom:.5rem;">
                <span style="color:var(--text-muted); font-size:.85rem;">\u00cdtems</span>
            </div>
            <div style="background:var(--bg-hover); border-radius:8px; padding:.6rem .8rem; margin-bottom:.5rem;">
                ${groupItems.map(it => `
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:.35rem 0; border-bottom:1px solid var(--border-color);">
                        <span style="font-size:.88rem;">• ${it.product}</span>
                        <strong style="color:${amountColor}; font-size:.88rem;">${sign}${formatCurrency(it.amount)}</strong>
                    </div>
                `).join('')}
            </div>
        ` : `
            <div style="display:flex; justify-content:space-between;">
                <span style="color:var(--text-muted);">Descripci\u00f3n</span>
                <strong>${repr.product}</strong>
            </div>
        `;

        receiptBody.innerHTML = `
            <div style="text-align:center; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:2px dashed var(--border-color);">
                <p style="font-size:1.5rem; margin-bottom:.3rem;">${isExpense ? '💸' : '💰'}</p>
                <h3 style="font-size:1.5rem; color:${amountColor};">${sign}${formatCurrency(totalAmount)}</h3>
                <p style="color:var(--text-muted); font-size:.9rem; margin-top:.3rem;">${typeLabel}${isMulti ? ` · ${groupItems.length} \u00edtems` : ''}</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:.8rem;">
                ${itemsHtml}
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">M\u00e9todo de Pago</span>
                    <span style="background:rgba(108,92,231,0.15);color:#6c5ce7;padding:.2rem .6rem;border-radius:20px;font-size:.75rem;font-weight:600;">${repr.method}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Fecha</span>
                    <span>${dateStr}</span>
                </div>
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Hora</span>
                    <span>${timeStr}</span>
                </div>
                ${repr.customerName ? `<div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Cliente</span>
                    <strong>${repr.customerName}</strong>
                </div>` : ''}
                ${repr.notes ? `<div style="display:flex; justify-content:space-between; gap:1rem;">
                    <span style="color:var(--text-muted);">Notas</span>
                    <span style="text-align:right;">${repr.notes}</span>
                </div>` : ''}
                <div style="display:flex; justify-content:space-between;">
                    <span style="color:var(--text-muted);">Negocio</span>
                    <strong>${storeName}</strong>
                </div>
            </div>
            <div style="text-align:center; margin-top:1.5rem; padding-top:1rem; border-top:2px dashed var(--border-color); color:var(--text-muted); font-size:.8rem;">
                Generado por ${storeName} • Comprobante #${repr.id.toString().slice(-6)}
            </div>
        `;
        receiptModal.classList.add('active');
    };

    // --- Print Receipt via dedicated popup window ---
    const printReceipt = () => {
        if (!currentReceiptSale) return;
        const groupItems = currentReceiptGroup.length > 0 ? currentReceiptGroup : [currentReceiptSale];
        const repr = groupItems[0];
        const d = new Date(repr.timestamp);
        const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const isExpense = repr.type === 'expense';
        const sign = isExpense ? '-' : '+';
        const amountColor = isExpense ? '#d63031' : '#00b894';
        const typeLabel = isExpense ? 'Gasto' : 'Ingreso / Venta';
        const totalAmount = groupItems.reduce((sum, s) => sum + s.amount, 0);
        const amountFormatted = formatCurrency(totalAmount);
        const isMulti = groupItems.length > 1;
        const notesRow = repr.notes
            ? `<tr><td style="color:#636e72;padding:.6rem 0;">Notas</td><td style="text-align:right;padding:.6rem 0;">${repr.notes}</td></tr>`
            : '';
        const customerRow = repr.customerName
            ? `<tr><td style="color:#636e72;padding:.6rem 0;">Cliente</td><td style="text-align:right;padding:.6rem 0;font-weight:600;">${repr.customerName}</td></tr>`
            : '';
        // Build items section for print
        const itemsSection = isMulti ? `
            <tr><td colspan="2" style="padding:.8rem 0 .3rem;"><strong style="font-size:.85rem;color:#636e72;text-transform:uppercase;letter-spacing:.05em;">Detalle de \u00edtems</strong></td></tr>
            ${groupItems.map(it => `
                <tr>
                    <td style="padding:.45rem 0; font-size:.9rem;">• ${it.product}</td>
                    <td style="text-align:right;padding:.45rem 0;font-weight:600;font-size:.9rem;color:${amountColor};">${sign}${formatCurrency(it.amount)}</td>
                </tr>
            `).join('')}
            <tr><td colspan="2"><hr style="border:none;border-top:1px dashed #dfe6e9;margin:.2rem 0;"></td></tr>
        ` : `
            <tr><td style="color:#636e72;padding:.6rem 0;">Descripci\u00f3n</td><td style="text-align:right;padding:.6rem 0;">${repr.product}</td></tr>
        `;

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
            padding: .55rem 0;
            font-size: .9rem;
            border-bottom: 1px solid #f0f0f0;
            vertical-align: top;
        }
        .receipt-body td:first-child {
            color: #636e72;
            width: 45%;
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
        .total-row td {
            font-size: 1rem;
            font-weight: 700;
            color: ${amountColor};
            border-top: 2px solid #dfe6e9;
            border-bottom: none;
            padding-top: .8rem;
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
            <div class="receipt-type">Comprobante de Transacci\u00f3n${isMulti ? ` · ${groupItems.length} \u00edtems` : ''}</div>
        </div>
        <div class="receipt-amount">
            <div class="emoji">${isExpense ? '💸' : '💰'}</div>
            <div class="amount">${sign}${amountFormatted}</div>
            <div class="type-label">${typeLabel}</div>
        </div>
        <div class="receipt-body">
            <table>
                ${itemsSection}
                ${isMulti ? `<tr class="total-row"><td>Total</td><td>${sign}${amountFormatted}</td></tr>` : ''}
                <tr>
                    <td>M\u00e9todo</td>
                    <td><span class="badge">${repr.method}</span></td>
                </tr>
                <tr>
                    <td>Fecha</td>
                    <td>${dateStr}</td>
                </tr>
                <tr>
                    <td>Hora</td>
                    <td>${timeStr}</td>
                </tr>
                ${customerRow}
                ${notesRow}
            </table>
        </div>
        <div class="receipt-footer">
            Generado por ${storeName} &bull; Comprobante #${repr.id.toString().slice(-6)}
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
            alert('El navegador bloque\u00f3 la ventana emergente. Por favor, permite las ventanas emergentes para esta p\u00e1gina e intenta de nuevo.');
        }
    };

    // --- WhatsApp Receipt ---
    const sendWhatsAppReceipt = () => {
        if (!currentReceiptSale) return;
        const groupItems = currentReceiptGroup.length > 0 ? currentReceiptGroup : [currentReceiptSale];
        const repr = groupItems[0];
        const d = new Date(repr.timestamp);
        const dateStr = d.toLocaleDateString('es-ES');
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const totalAmount = groupItems.reduce((sum, s) => sum + s.amount, 0);
        const amountFormatted = formatCurrency(totalAmount);

        let text = `🧾 *Recibo de ${storeName}*\n`;
        text += `Fecha: ${dateStr} ${timeStr}\n\n`;

        if (groupItems.length > 1) {
            text += `*Detalle de compra:*\n`;
            groupItems.forEach(it => {
                text += `• ${it.product}: ${formatCurrency(it.amount)}\n`;
            });
            text += `\n*TOTAL: ${amountFormatted}*\n`;
        } else {
            text += `*Descripci\u00f3n:* ${repr.product}\n`;
            text += `*Monto:* ${amountFormatted}\n`;
        }

        text += `\nM\u00e9todo de Pago: ${repr.method}\n`;
        if (repr.customerName) text += `Cliente: ${repr.customerName}\n`;
        if (repr.notes) text += `Notas: ${repr.notes}\n`;

        text += `\n\u00a1Gracias por elegirnos!`;

        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    if (btnPrintReceipt) {
        btnPrintReceipt.addEventListener('click', printReceipt);
    }

    if (btnWhatsappReceipt) {
        btnWhatsappReceipt.addEventListener('click', sendWhatsAppReceipt);
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
            alert('Ingresa una meta v\u00e1lida');
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

    // --- Share Daily Summary Logic ---
    if (btnShareSummary) {
        btnShareSummary.addEventListener('click', () => {
            if (sales.length === 0) {
                alert('No hay movimientos registrados hoy para compartir. A\u00f1ade alguna venta primero.');
                return;
            }

            const income = sales.filter(s => s.type !== 'expense').reduce((sum, s) => sum + s.amount, 0);
            const expense = sales.filter(s => s.type === 'expense').reduce((sum, s) => sum + s.amount, 0);
            const count = sales.filter(s => s.type !== 'expense').length;
            const net = income - expense;
            const cashExpenses = sales.filter(s => s.type === 'expense' && s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
            const cashIncome = sales.filter(s => s.type !== 'expense' && s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
            const cashFinal = cashBase + cashIncome - cashExpenses;

            const d = new Date();
            const dateStr = d.toLocaleDateString('es-ES');

            let text = `📊 *Resumen Diario - ${storeName}*\n`;
            text += `📅 Fecha: ${dateStr}\n\n`;
            text += `💰 *Ingresos de Ventas:* ${formatCurrency(income)}\n`;
            text += `💸 *Gastos del D\u00eda:* ${formatCurrency(expense)}\n`;
            text += `📈 *Balance Neto:* ${formatCurrency(net)}\n`;
            text += `💵 *Efectivo Final en Caja:* ${formatCurrency(cashFinal)}\n\n`;
            text += `🛍️ *Ventas Totales:* ${count}\n\n`;
            text += `🚀 Control Diario Zaleasy`;

            if (navigator.share) {
                navigator.share({
                    title: `Resumen de Ventas - ${dateStr}`,
                    text: text
                }).catch(err => {
                    console.warn('Share error:', err);
                    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                    window.open(url, '_blank');
                });
            } else {
                const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank');
            }
        });
    }

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

        // Calculate total cash expenses to show final cash
        const cashExpenses = sales.filter(s => s.type === 'expense' && s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
        const cashFinal = cashBase + incomeMap['Efectivo'] - cashExpenses;

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
                <span>Neto de Hoy</span>
                <strong style="color: var(--primary);">${formatCurrency(totalIncome - totalExpense)}</strong>
            </div>
            <div class="summary-item" style="background: var(--bg-hover); margin-top: 1rem;">
                <span>Efectivo Final en Caja (Inc. Base)</span>
                <strong style="color: var(--text-main);">${formatCurrency(cashFinal)}</strong>
            </div>
        `;

        closeSummaryGrid.innerHTML = summaryHtml;
        closeTotalDay.textContent = formatCurrency(totalIncome - totalExpense);

        closeRegisterModal.classList.add('active');
    });

    btnConfirmClose.addEventListener('click', () => {
        // Guardar las ventas de "hoy" dentro del historial completo hist\u00f3rico antes de borrarlas
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
        showToast('Cierre de caja completado con \u00e9xito!');
    });

    // --- Export CSV ---
    document.getElementById('export-csv').addEventListener('click', () => {
        if (sales.length === 0) {
            showToast('No hay datos para exportar');
            return;
        }

        let csvContent = "Fecha,Hora,Descripci\u00f3n,Tipo,M\u00e9todo,Monto\n";

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
                    if (!data || typeof data !== 'object') throw new Error('Formato inv\u00e1lido');

                    const confirmed = confirm(
                        `Se encontraron ${(data.sales || []).length} ventas de hoy y ${(data.historyData || []).length} registros hist\u00f3ricos.\n\n` +
                        `\u00bfDeseas FUSIONAR estos datos con los actuales o REEMPLAZAR TODO?\n\n` +
                        `Presiona ACEPTAR para FUSIONAR o CANCELAR para cancelar la importaci\u00f3n.`
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
                        showToast(`✅ Importaci\u00f3n exitosa: +${newSales.length} ventas, +${newHistory.length} hist\u00f3ricos.`);
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
        if (title) title.textContent = '\u00a1Venta Grande! 💰';
        if (msg) msg.textContent = `${product}: ${formatCurrency(amount)} — \u00a1Excelente!`;
        toast.style.borderLeftColor = 'var(--warning)';
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            toast.style.borderLeftColor = 'var(--success)';
            if (icon) { icon.innerHTML = '<i class="fa-solid fa-check"></i>'; icon.style.fontSize = ''; }
        }, 4000);
    };

    // =============================================
    // --- Weekly Summary Widget ---
    // =============================================
    const setupWeeklySummary = () => {
        const container = document.getElementById('weekly-bars-container');
        const bestBadge = document.getElementById('weekly-best-day-badge');
        if (!container) return;

        // Build a map of last 7 days (from oldest to today)
        const days = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            days.push({
                date: d,
                key: d.toISOString().split('T')[0],
                label: d.toLocaleDateString('es-ES', { weekday: 'short' }),
                income: 0,
                expense: 0
            });
        }

        const allData = [...historyData, ...sales];
        allData.forEach(s => {
            const d = new Date(s.timestamp);
            const key = d.toISOString().split('T')[0];
            const entry = days.find(day => day.key === key);
            if (!entry) return;
            if (s.type === 'expense') {
                entry.expense += s.amount;
            } else {
                entry.income += s.amount;
            }
        });

        // Find max income for scaling
        const maxIncome = Math.max(...days.map(d => d.income), 1);
        const maxExpense = Math.max(...days.map(d => d.expense), 1);
        const maxVal = Math.max(maxIncome, maxExpense, 1);

        // Find best income day
        const bestDay = days.reduce((best, d) => d.income > best.income ? d : best, days[0]);
        const todayKey = today.toISOString().split('T')[0];

        container.innerHTML = '';
        days.forEach(day => {
            const col = document.createElement('div');
            const isToday = day.key === todayKey;
            const isBest = day.key === bestDay.key && bestDay.income > 0;
            col.className = `weekly-day-col${isToday ? ' today' : ''}${isBest ? ' best-day' : ''}`;

            const incomeH = Math.max(Math.round((day.income / maxVal) * 80), day.income > 0 ? 4 : 3);
            const expenseH = Math.max(Math.round((day.expense / maxVal) * 80), day.expense > 0 ? 4 : 3);

            col.innerHTML = `
                <div class="weekly-bars-group">
                    <div class="weekly-bar income-bar"
                         style="height:${incomeH}px;"
                         data-tooltip="Ing: ${formatCurrency(day.income)}"
                         title="${day.label}: Ingresos ${formatCurrency(day.income)}"></div>
                    <div class="weekly-bar expense-bar"
                         style="height:${expenseH}px;"
                         data-tooltip="Gst: ${formatCurrency(day.expense)}"
                         title="${day.label}: Gastos ${formatCurrency(day.expense)}"></div>
                </div>
                <span class="weekly-day-label">${day.label.replace('.', '')}</span>
            `;
            container.appendChild(col);
        });

        // Best day badge
        if (bestBadge) {
            if (bestDay.income > 0) {
                const bestLabel = bestDay.date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
                bestBadge.textContent = `🏆 ${bestLabel} · ${formatCurrency(bestDay.income)}`;
            } else {
                bestBadge.textContent = '—';
            }
        }
    };

    // =============================================
    // --- Quick Products Widget ---
    // =============================================
    const setupQuickProducts = () => {
        const chipsContainer = document.getElementById('quick-products-chips');
        const emptyEl = document.getElementById('quick-products-empty');
        if (!chipsContainer) return;

        // Build frequency map from all sales + history
        const allData = [...historyData, ...sales].filter(s => s.type !== 'expense');
        const freq = {};
        const lastPrice = {};
        allData.forEach(s => {
            const name = s.product.trim();
            if (!name) return;
            freq[name] = (freq[name] || 0) + 1;
            lastPrice[name] = s.amount; // track last used price
        });

        // Also include recentProducts even if no history (but without price)
        recentProducts.forEach(p => {
            if (!freq[p]) freq[p] = 0;
        });

        const sorted = Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        chipsContainer.innerHTML = '';

        if (sorted.length === 0) {
            chipsContainer.style.display = 'none';
            if (emptyEl) emptyEl.style.display = 'flex';
            return;
        }

        chipsContainer.style.display = 'flex';
        if (emptyEl) emptyEl.style.display = 'none';

        sorted.forEach(([name, count]) => {
            const price = lastPrice[name];
            const chip = document.createElement('button');
            chip.className = 'quick-product-chip';
            chip.type = 'button';
            chip.title = `${count} venta${count !== 1 ? 's' : ''} registrada${count !== 1 ? 's' : ''}`;
            chip.innerHTML = `${name}${price ? `<span class="chip-price">${formatCurrency(price)}</span>` : ''}`;

            chip.addEventListener('click', () => {
                // Find the first empty product input in the multi-item form
                const inputs = document.querySelectorAll('.item-product-input');
                let targetInput = null;
                inputs.forEach(inp => {
                    if (!targetInput && inp.value.trim() === '') targetInput = inp;
                });
                if (!targetInput) targetInput = inputs[inputs.length - 1];
                if (!targetInput) return;

                targetInput.value = name;
                targetInput.dispatchEvent(new Event('input', { bubbles: true }));

                // Also fill price if available
                if (price) {
                    const row = targetInput.closest('.item-row');
                    if (row) {
                        const amtInput = row.querySelector('.item-amount-input');
                        if (amtInput && !amtInput.value) {
                            amtInput.value = price.toFixed(2);
                            amtInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                }

                // Visual feedback
                chip.style.background = 'var(--primary-light)';
                chip.style.borderColor = 'var(--primary)';
                chip.style.color = 'var(--primary)';
                setTimeout(() => {
                    chip.style.background = '';
                    chip.style.borderColor = '';
                    chip.style.color = '';
                }, 600);

                // Focus the input for UX
                targetInput.focus();
                showToast(`"${name}" agregado al formulario`);
            });

            chipsContainer.appendChild(chip);
        });
    };

    // =============================================
    // --- Monthly Projection ---
    // =============================================
    const updateMonthlyProjection = () => {
        const projEl = document.getElementById('monthly-projection');
        const projText = document.getElementById('monthly-projection-text');
        if (!projEl || !projText) return;

        // Collect all income across history (to compute daily average)
        const allData = [...historyData, ...sales].filter(s => s.type !== 'expense');
        if (allData.length === 0) {
            projEl.style.display = 'none';
            return;
        }

        // Group by date
        const byDate = {};
        allData.forEach(s => {
            const key = new Date(s.timestamp).toISOString().split('T')[0];
            byDate[key] = (byDate[key] || 0) + s.amount;
        });

        const days = Object.values(byDate);
        if (days.length === 0) {
            projEl.style.display = 'none';
            return;
        }

        const avgPerDay = days.reduce((a, b) => a + b, 0) / days.length;
        const now = new Date();
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const projected = avgPerDay * daysInMonth;
        const monthName = now.toLocaleDateString('es-ES', { month: 'long' });

        projEl.style.display = 'flex';
        projText.textContent = `Proyecci\u00f3n de ${monthName}: ${formatCurrency(projected)} · Promedio ${formatCurrency(avgPerDay)}/d\u00eda`;
    };

    // --- Secondary Metrics ---
    const updateSecondaryMetrics = () => {
        const incomes = sales.filter(s => s.type !== 'expense');
        const expenses = sales.filter(s => s.type === 'expense');

        // Ticket Promedio
        const totalRevenue = incomes.reduce((sum, s) => sum + s.amount, 0);
        const uniqueGroups = new Set(incomes.map(s => s.groupId || s.timestamp));
        const ticketAvg = uniqueGroups.size > 0 ? totalRevenue / uniqueGroups.size : 0;

        // Clientes \u00fanicos
        const clientSet = new Set();
        incomes.forEach(s => {
            const clientKey = (s.customerName && s.customerName.trim().toLowerCase()) || s.groupId || s.timestamp;
            clientSet.add(clientKey);
        });
        const uniqueClients = clientSet.size;

        // Margen Neto %
        const totalExpenses = expenses.reduce((sum, s) => sum + s.amount, 0);
        const margin = totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0;

        // Efectivo en Caja
        const cashIn = incomes.filter(s => s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
        const cashOut = expenses.filter(s => s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
        const cashOnHand = cashBase + cashIn - cashOut;

        const elTicket = document.getElementById('val-ticket-avg');
        const elClients = document.getElementById('val-clients');
        const elMargin = document.getElementById('val-margin');
        const elCash = document.getElementById('val-cash');

        if (elTicket) elTicket.textContent = formatCurrency(ticketAvg);
        if (elClients) elClients.textContent = uniqueClients;
        if (elMargin) elMargin.textContent = margin.toFixed(1) + '%';
        if (elCash) elCash.textContent = formatCurrency(cashOnHand);
    };

    // --- Live Activity Feed ---
    const updateActivityFeed = () => {
        const feedList = document.getElementById('activity-feed-list');
        const feedEmpty = document.getElementById('activity-feed-empty');
        if (!feedList || !feedEmpty) return;

        if (sales.length === 0) {
            feedList.innerHTML = '';
            feedEmpty.style.display = 'flex';
            document.getElementById('activity-feed-count').textContent = '0 hoy';
            return;
        }

        feedEmpty.style.display = 'none';
        feedList.innerHTML = '';

        // Take the last 6 transactions (most recent first)
        const recentSales = [...sales].sort((a, b) => b.timestamp - a.timestamp).slice(0, 6);
        document.getElementById('activity-feed-count').textContent = `${sales.length} hoy`;

        recentSales.forEach(s => {
            const isIncome = s.type !== 'expense';
            const d = new Date(s.timestamp);
            const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

            const item = document.createElement('div');
            item.className = 'activity-item';

            let NameText = s.product;
            // If there's a customer, append it
            if (s.customerName) {
                NameText += ` <span style="font-weight:400; color:var(--text-muted); font-size:0.75rem;">(${s.customerName})</span>`;
            }

            item.innerHTML = `
                <div class="activity-dot ${isIncome ? 'income' : 'expense'}"></div>
                <div class="activity-info">
                    <div class="activity-name" title="${s.product}">${NameText}</div>
                    <div class="activity-time">${timeStr} • ${s.method}</div>
                </div>
                <div class="activity-amount ${isIncome ? 'income' : 'expense'}">
                    ${isIncome ? '+' : '-'}${formatCurrency(s.amount)}
                </div>
            `;
            feedList.appendChild(item);
        });
    };

    // Run app
    init();
});
