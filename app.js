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
    const dailyPulseCard = document.getElementById('daily-pulse-card');
    const dailyPulseIcon = document.getElementById('daily-pulse-icon');
    const dailyPulseBadge = document.getElementById('daily-pulse-badge');
    const dailyPulseText = document.getElementById('daily-pulse-text');
    const pulseActionPrimary = document.getElementById('pulse-action-primary');
    const pulseActionSecondary = document.getElementById('pulse-action-secondary');
    const receivablesCard = document.getElementById('receivables-card');
    const receivablesCount = document.getElementById('receivables-count');
    const receivablesTotal = document.getElementById('receivables-total');
    const receivablesDetail = document.getElementById('receivables-detail');
    const receivablesOpenClients = document.getElementById('receivables-open-clients');
    const receivablesRegisterPayment = document.getElementById('receivables-register-payment');
    const setupChecklistCard = document.getElementById('setup-checklist-card');
    const setupChecklistBadge = document.getElementById('setup-checklist-badge');
    const setupChecklistSubtitle = document.getElementById('setup-checklist-subtitle');
    const setupProgressFill = document.getElementById('setup-progress-fill');
    const setupChecklistToggle = document.getElementById('setup-checklist-toggle');
    const setupChecklistGrid = document.getElementById('setup-checklist-grid');
    const smartShortcutsCard = document.getElementById('smart-shortcuts-card');
    const smartShortcutsGrid = document.getElementById('smart-shortcuts-grid');
    const smartShortcutsSummary = document.getElementById('smart-shortcuts-summary');
    const smartShortcutsBadge = document.getElementById('smart-shortcuts-badge');
    const dashboardViewControls = document.getElementById('dashboard-view-controls');
    const dashboardViewDescription = document.getElementById('dashboard-view-description');
    const dashboardViewCount = document.getElementById('dashboard-view-count');
    const stockAlertCard = document.getElementById('stock-alert-card');
    const stockAlertBadge = document.getElementById('stock-alert-badge');
    const stockAlertText = document.getElementById('stock-alert-text');
    const stockAlertList = document.getElementById('stock-alert-list');
    const stockAlertOpenInventory = document.getElementById('stock-alert-open-inventory');
    const stockAlertAddProduct = document.getElementById('stock-alert-add-product');
    const actionCenterCard = document.getElementById('action-center-card');
    const actionCenterList = document.getElementById('action-center-list');
    const actionCenterBadge = document.getElementById('action-center-badge');
    const actionCenterSubtitle = document.getElementById('action-center-subtitle');
    const dailyPlanCard = document.getElementById('daily-plan-card');
    const dailyPlanList = document.getElementById('daily-plan-list');
    const dailyPlanBadge = document.getElementById('daily-plan-badge');
    const dailyPlanSubtitle = document.getElementById('daily-plan-subtitle');
    const dailyPlanProgressFill = document.getElementById('daily-plan-progress-fill');
    const dueRadarCard = document.getElementById('due-radar-card');
    const dueRadarSummary = document.getElementById('due-radar-summary');
    const dueRadarBadge = document.getElementById('due-radar-badge');
    const dueRadarTimeline = document.getElementById('due-radar-timeline');
    const dueRadarEmpty = document.getElementById('due-radar-empty');
    const dueRadarAddFollowup = document.getElementById('due-radar-add-followup');
    const dueRadarAddRecurring = document.getElementById('due-radar-add-recurring');
    const operationalHealthCard = document.getElementById('operational-health-card');
    const healthScoreRing = document.getElementById('health-score-ring');
    const healthScoreValue = document.getElementById('health-score-value');
    const healthStatusBadge = document.getElementById('health-status-badge');
    const healthSummaryText = document.getElementById('health-summary-text');
    const healthMetricsGrid = document.getElementById('health-metrics-grid');
    const dataQualityCard = document.getElementById('data-quality-card');
    const dataQualityBadge = document.getElementById('data-quality-badge');
    const dataQualitySummary = document.getElementById('data-quality-summary');
    const dataQualityGrid = document.getElementById('data-quality-grid');
    const closingForecastCard = document.getElementById('closing-forecast-card');
    const closingForecastMain = document.getElementById('closing-forecast-main');
    const closingForecastSubtitle = document.getElementById('closing-forecast-subtitle');
    const closingForecastLabel = document.getElementById('closing-forecast-label');
    const closingForecastProjected = document.getElementById('closing-forecast-projected');
    const closingForecastStatus = document.getElementById('closing-forecast-status');
    const closingForecastGap = document.getElementById('closing-forecast-gap');
    const closingForecastPace = document.getElementById('closing-forecast-pace');
    const closingForecastBalance = document.getElementById('closing-forecast-balance');
    const closingForecastAdvice = document.getElementById('closing-forecast-advice');
    const closingHourSelect = document.getElementById('closing-hour-select');
    const closingForecastSale = document.getElementById('closing-forecast-sale');
    const closingForecastExpense = document.getElementById('closing-forecast-expense');
    const closingForecastClose = document.getElementById('closing-forecast-close');
    const globalSearch = document.getElementById('global-search');
    const globalSearchInput = document.getElementById('global-search-input');
    const globalSearchClear = document.getElementById('global-search-clear');
    const globalSearchPanel = document.getElementById('global-search-panel');
    const globalSearchResults = document.getElementById('global-search-results');
    const globalSearchStatus = document.getElementById('global-search-status');
    const globalSearchCount = document.getElementById('global-search-count');
    const notificationCenter = document.getElementById('notification-center');
    const notificationTrigger = document.getElementById('notification-trigger');
    const notificationPanel = document.getElementById('notification-panel');
    const notificationCount = document.getElementById('notification-count');
    const notificationStatus = document.getElementById('notification-status');
    const notificationSummary = document.getElementById('notification-summary');
    const notificationList = document.getElementById('notification-list');
    const notificationReview = document.getElementById('notification-review');

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
    const closeReadinessPanel = document.getElementById('close-readiness-panel');
    const cashExpectedDisplay = document.getElementById('cash-expected-display');
    const cashCountedInput = document.getElementById('cash-counted-input');
    const cashDifferenceDisplay = document.getElementById('cash-difference-display');
    const cashReconciliationStatus = document.getElementById('cash-reconciliation-status');
    const cashReconciliationNote = document.getElementById('cash-reconciliation-note');
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
    const viewClientes = document.getElementById('view-clientes');
    const viewInventario = document.getElementById('view-inventario');
    const viewComingSoon = document.getElementById('view-coming-soon');
    const comingSoonTitle = document.getElementById('coming-soon-title');

    // History Elements
    const historyBody = document.getElementById('history-body');
    const historySearch = document.getElementById('history-search');
    const historyDateFilter = document.getElementById('history-date-filter');
    const historyTypeFilter = document.getElementById('history-type-filter');
    const historyQuickFilters = document.getElementById('history-quick-filters');
    const historyEmptyState = document.getElementById('history-empty-state');
    const historyExportCsv = document.getElementById('history-export-csv');
    const historyClearAll = document.getElementById('history-clear-all');
    const copyExecutiveSummaryBtn = document.getElementById('copy-executive-summary');
    const exportInventarioCsvBtn = document.getElementById('export-inventario-csv');
    const followupForm = document.getElementById('followup-form');
    const followupTitleInput = document.getElementById('followup-title');
    const followupTypeSelect = document.getElementById('followup-type');
    const followupDateInput = document.getElementById('followup-date');
    const followupList = document.getElementById('followup-list');
    const followupEmpty = document.getElementById('followup-empty');
    const followupsBadge = document.getElementById('followups-badge');
    const followupsSummary = document.getElementById('followups-summary');
    const recurringForm = document.getElementById('recurring-form');
    const recurringNameInput = document.getElementById('recurring-name');
    const recurringAmountInput = document.getElementById('recurring-amount');
    const recurringFrequencySelect = document.getElementById('recurring-frequency');
    const recurringNextDateInput = document.getElementById('recurring-next-date');
    const recurringList = document.getElementById('recurring-list');
    const recurringEmpty = document.getElementById('recurring-empty');
    const recurringBadge = document.getElementById('recurring-badge');
    const recurringSummary = document.getElementById('recurring-summary');
    const marginProductName = document.getElementById('margin-product-name');
    const marginCostInput = document.getElementById('margin-cost');
    const marginTargetInput = document.getElementById('margin-target');
    const marginPriceInput = document.getElementById('margin-price');
    const marginProfit = document.getElementById('margin-profit');
    const marginReal = document.getElementById('margin-real');
    const marginMarkup = document.getElementById('margin-markup');
    const marginAdvice = document.getElementById('margin-simulator-advice');
    const marginSummary = document.getElementById('margin-simulator-summary');
    const marginBadge = document.getElementById('margin-simulator-badge');
    const marginApplySale = document.getElementById('margin-apply-sale');
    const marginSaveProduct = document.getElementById('margin-save-product');

    // Navigation Links
    const navDashboard = document.getElementById('nav-dashboard');
    const navHistorial = document.getElementById('nav-historial');
    const navReportes = document.getElementById('nav-reportes');
    const navClientes = document.getElementById('nav-clientes');
    const navInventario = document.getElementById('nav-inventario');
    const navConfig = document.getElementById('nav-config');
    const allNavItems = document.querySelectorAll('.nav-item');

    // --- State ---
    let sales = JSON.parse(localStorage.getItem('dailySales')) || [];
    let historyData = JSON.parse(localStorage.getItem('allHistoryData')) || []; // Full history
    let isDarkMode = localStorage.getItem('theme') !== 'light';
    let dailyGoal = parseFloat(localStorage.getItem('dailyGoal')) || 100.00;
    let storeName = localStorage.getItem('storeName') || 'Zaleasy';
    let brandColor = localStorage.getItem('brandColor') || '#6c5ce7';
    let recentProducts = JSON.parse(localStorage.getItem('recentProducts')) || [];
    let productCatalog = JSON.parse(localStorage.getItem('productCatalog')) || [];
    let methodsChartInstance = null;
    let currentTransactionType = 'income';
    let goalReachedNotified = false;
    let activeCategoryFilter = ''; // for sales table category pill filter
    let alertThreshold = parseFloat(localStorage.getItem('alertThreshold')) || 0;
    let sessionStartTime = localStorage.getItem('sessionStartTime') || Date.now();
    let cashBase = parseFloat(localStorage.getItem('cashBase')) || 0;
    let followUps = JSON.parse(localStorage.getItem('followUps')) || [];
    let recurringExpenses = JSON.parse(localStorage.getItem('recurringExpenses')) || [];
    let dailyPlanDone = JSON.parse(localStorage.getItem(`dailyPlanDone_${new Date().toISOString().split('T')[0]}`) || '{}');
    let closingHour = parseInt(localStorage.getItem('closingHour') || '21', 10);
    let marginSimulator = JSON.parse(localStorage.getItem('marginSimulator') || '{"target":35}');
    let dashboardViewMode = localStorage.getItem('dashboardViewMode') || 'summary';

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
    let switchView = (targetId, title) => {
        // Update active class on nav
        allNavItems.forEach(item => item.classList.remove('active'));
        const navEl = document.getElementById(targetId);
        if (navEl) navEl.classList.add('active');

        [viewDashboard, viewHistorial, viewReportes, viewConfig, viewClientes, viewInventario, viewComingSoon].forEach(v => {
            if (v) v.style.display = 'none';
        });

        if (targetId === 'nav-dashboard') {
            viewDashboard.style.display = 'block';
        } else if (targetId === 'nav-historial') {
            viewHistorial.style.display = 'block';
            renderHistory();
        } else if (targetId === 'nav-reportes') {
            viewReportes.style.display = 'block';
            renderReports();
        } else if (targetId === 'nav-clientes') {
            viewClientes.style.display = 'block';
            renderClientes();
        } else if (targetId === 'nav-inventario') {
            viewInventario.style.display = 'block';
            renderInventario();
        } else if (targetId === 'nav-config') {
            viewConfig.style.display = 'block';
            loadConfigData();
        } else {
            viewComingSoon.style.display = 'block';
            comingSoonTitle.innerText = title;
        }
    };

    navDashboard.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-dashboard'); });
    navHistorial.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-historial'); });
    navReportes.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-reportes'); });
    if(navClientes) navClientes.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-clientes'); });
    if(navInventario) navInventario.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-inventario'); });
    navConfig.addEventListener('click', (e) => { e.preventDefault(); switchView('nav-config', 'Configuraci\u00f3n de Empresa'); });

    // --- Clientes CRM ---
    const buildClientSummary = () => {
        const allTx = [...historyData, ...sales];
        const clientMap = {};

        allTx.forEach(tx => {
            if (!tx.customerName || tx.customerName.trim() === '') return;

            const name = tx.customerName.trim();
            if (!clientMap[name]) {
                clientMap[name] = { totalCompras: 0, totalGastado: 0, totalDeuda: 0, ultimaCompra: 0 };
            }

            clientMap[name].totalCompras++;
            if (tx.type !== 'expense') {
                if (tx.method === 'A Cobrar') {
                    clientMap[name].totalDeuda += tx.amount;
                } else if (tx.method === 'Pago de Deuda') {
                    clientMap[name].totalDeuda -= tx.amount;
                    clientMap[name].totalGastado += tx.amount;
                } else {
                    clientMap[name].totalGastado += tx.amount;
                }
            }

            if (tx.timestamp > clientMap[name].ultimaCompra) {
                clientMap[name].ultimaCompra = tx.timestamp;
            }
        });

        Object.keys(clientMap).forEach(name => {
            clientMap[name].totalDeuda = Math.max(clientMap[name].totalDeuda, 0);
        });

        const clients = Object.keys(clientMap);
        const debtClients = clients.filter(name => clientMap[name].totalDeuda > 0);
        const totalDebt = debtClients.reduce((sum, name) => sum + clientMap[name].totalDeuda, 0);
        const topDebtor = debtClients.sort((a, b) => clientMap[b].totalDeuda - clientMap[a].totalDeuda)[0] || null;

        return { clientMap, clients, debtClients, totalDebt, topDebtor };
    };

    const renderClientes = () => {
        const clientesBody = document.getElementById('clientes-body');
        const emptyState = document.getElementById('clientes-empty-state');
        const tableContainer = document.getElementById('clientes-table-container');
        if(!clientesBody) return;
        clientesBody.innerHTML = '';
        const { clientMap } = buildClientSummary();

        const sortedClients = Object.keys(clientMap).sort((a,b) => clientMap[b].totalGastado - clientMap[a].totalGastado);

        if (sortedClients.length === 0) {
            emptyState.classList.add('active');
            tableContainer.style.display = 'none';
        } else {
            emptyState.classList.remove('active');
            tableContainer.style.display = 'block';

            const searchQuery = (document.getElementById('search-clientes')?.value || '').toLowerCase().trim();

            sortedClients.forEach(clientName => {
                if (searchQuery && !clientName.toLowerCase().includes(searchQuery)) return;

                const c = clientMap[clientName];
                const tr = document.createElement('tr');
                const lastDate = new Date(c.ultimaCompra).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
                const segment = getClientSegment(c);
                
                const debtHtml = c.totalDeuda > 0 
                    ? `<span style="color:var(--danger); font-weight:bold;">${formatCurrency(c.totalDeuda)}</span>` 
                    : `<span style="color:var(--text-muted);">Sin deuda</span>`;
                    
                const actionHtml = c.totalDeuda > 0
                    ? `<button class="btn btn-outline btn-sm btn-register-debt" data-client="${clientName}" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" title="Registrar cobro"><i class="fa-solid fa-circle-dollar-to-slot"></i> Cobrar</button>`
                    : `<span style="color:var(--text-muted); font-size: 0.8rem;">—</span>`;

                tr.innerHTML = `
                    <td><i class="fa-solid fa-user-circle" style="color:var(--text-muted); margin-right:6px;"></i><strong>${clientName}</strong><br><span class="client-segment-badge" data-tone="${segment.tone}">${segment.label}</span></td>
                    <td><span class="badge">${c.totalCompras} transacciones</span></td>
                    <td style="color:var(--success); font-weight:bold;">${formatCurrency(c.totalGastado)}</td>
                    <td>${debtHtml}</td>
                    <td style="color:var(--text-muted); font-size: 0.9em;">${lastDate}</td>
                    <td style="text-align: right;">${actionHtml}</td>
                `;
                clientesBody.appendChild(tr);
            });
        }
    };

    const getClientSegment = (client) => {
        const daysSinceLast = client.ultimaCompra
            ? Math.floor((Date.now() - Number(client.ultimaCompra)) / 86400000)
            : Infinity;
        if (client.totalDeuda > 0) return { label: 'Con saldo pendiente', tone: 'danger' };
        if (client.totalGastado >= dailyGoal * 3 || client.totalCompras >= 5) return { label: 'Cliente clave', tone: 'success' };
        if (daysSinceLast > 45) return { label: 'Reactivar', tone: 'warning' };
        return { label: 'Activo', tone: 'neutral' };
    };
    
    const searchClientesInput = document.getElementById('search-clientes');
    if (searchClientesInput) {
        searchClientesInput.addEventListener('input', renderClientes);
    }

    if (receivablesOpenClients) {
        receivablesOpenClients.addEventListener('click', () => switchView('nav-clientes'));
    }

    if (receivablesRegisterPayment) {
        receivablesRegisterPayment.addEventListener('click', () => {
            switchView('nav-dashboard');
            btnTypeIncome.click();
            if (methodSelect) methodSelect.value = 'Pago de Deuda';
            if (customerNameInput) {
                customerNameInput.focus();
                customerNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            showToast('Selecciona el cliente y registra el cobro de deuda.');
        });
    }

    if (setupChecklistToggle && setupChecklistCard) {
        setupChecklistToggle.addEventListener('click', () => {
            const collapsed = setupChecklistCard.classList.toggle('collapsed');
            localStorage.setItem('setupChecklistCollapsed', collapsed ? '1' : '0');
            setupChecklistToggle.innerHTML = `<i class="fa-solid ${collapsed ? 'fa-chevron-down' : 'fa-chevron-up'}"></i>`;
        });
    }

    if (setupChecklistGrid) {
        setupChecklistGrid.addEventListener('click', (e) => {
            const step = e.target.closest('.setup-step');
            if (!step) return;
            const stepName = step.dataset.step;
            if (stepName === 'store' || stepName === 'goal') {
                switchView('nav-config', 'Configuraci\u00f3n de Empresa');
                const target = stepName === 'store' ? document.getElementById('config-store-name') : document.getElementById('config-daily-goal');
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            } else if (stepName === 'catalog') {
                switchView('nav-inventario');
                const newProductBtn = document.getElementById('btn-new-product');
                if (newProductBtn) newProductBtn.click();
            } else if (stepName === 'cash') {
                if (editCashBaseBtn) editCashBaseBtn.click();
            } else if (stepName === 'sale') {
                focusTransactionForm('income');
            }
        });
    }

    if (smartShortcutsGrid) {
        smartShortcutsGrid.addEventListener('click', (e) => {
            const shortcut = e.target.closest('.smart-shortcut[data-action]');
            if (!shortcut) return;
            const action = shortcut.dataset.action;

            if (action === 'sale') focusTransactionForm('income');
            if (action === 'expense') focusTransactionForm('expense');
            if (action === 'clients') switchView('nav-clientes');
            if (action === 'inventory') switchView('nav-inventario');
            if (action === 'close' && btnCloseRegister) btnCloseRegister.click();

            if (action === 'followups') {
                switchView('nav-dashboard');
                const followupsCard = document.getElementById('followups-card');
                if (followupsCard) followupsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => followupTitleInput?.focus(), 250);
            }
        });
    }

    const openInventoryForm = () => {
        switchView('nav-inventario');
        const newProductBtn = document.getElementById('btn-new-product');
        const nameInput = document.getElementById('inv-name');
        if (newProductBtn) newProductBtn.click();
        if (nameInput) {
            nameInput.focus();
            nameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (stockAlertOpenInventory) {
        stockAlertOpenInventory.addEventListener('click', () => switchView('nav-inventario'));
    }

    if (stockAlertAddProduct) {
        stockAlertAddProduct.addEventListener('click', openInventoryForm);
    }
    
    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-register-debt')) {
            const btn = e.target.closest('.btn-register-debt');
            const client = btn.getAttribute('data-client');
            switchView('nav-dashboard');
            btnTypeIncome.click();
            if (methodSelect) methodSelect.value = 'Pago de Deuda';
            if (customerNameInput) {
                customerNameInput.value = client;
                customerNameInput.focus();
                customerNameInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            showToast(`Registra el cobro pendiente de ${client}.`);
        }

        if (e.target.closest('#export-clientes-csv')) {
            const { clientMap } = buildClientSummary();
            let csvContent = "data:text/csv;charset=utf-8,Cliente,Total de Transacciones,Total Invertido,Deuda Pendiente,Ultima Compra\n";
            Object.keys(clientMap).sort((a,b) => clientMap[b].totalGastado - clientMap[a].totalGastado).forEach(name => {
                const c = clientMap[name];
                const dateStr = new Date(c.ultimaCompra).toLocaleDateString('es-ES');
                csvContent += `"${name}",${c.totalCompras},${c.totalGastado},${c.totalDeuda},"${dateStr}"\n`;
            });
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', `clientes_zaleasy_${new Date().toISOString().split('T')[0]}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('Directorio de Clientes exportado a CSV');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    };

    const closeSidebar = () => {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    // Patch switchView to also close sidebar on mobile
    const originalSwitchView = switchView;
    switchView = (targetId, title) => {
        originalSwitchView(targetId, title);
        closeSidebar();
    };

    // --- Reports Chart Instances ---
    let repWeeklyChartInstance = null;
    let repMethodsChartInstance = null;

    const updateExecutiveSummary = ({ allData, incomes, expenses, totalRevenue, totalExpenses, methodMap }) => {
        const net = totalRevenue - totalExpenses;
        const productMap = {};
        incomes.forEach(s => {
            if (!productMap[s.product]) productMap[s.product] = { count: 0, total: 0 };
            productMap[s.product].count++;
            productMap[s.product].total += s.amount;
        });

        const topProduct = Object.entries(productMap).sort((a, b) => b[1].total - a[1].total)[0];
        const topMethod = Object.entries(methodMap).sort((a, b) => b[1] - a[1])[0];
        const { clientMap, clients, totalDebt } = buildClientSummary();
        const topClient = clients
            .sort((a, b) => clientMap[b].totalGastado - clientMap[a].totalGastado)[0];
        const lowStock = productCatalog.filter(p => p.stock !== undefined && p.stock !== null && Number(p.stock) <= 5);
        const expenseRatio = totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0;
        const risks = [
            net < 0,
            totalDebt > 0,
            lowStock.length > 0,
            expenseRatio >= 45
        ].filter(Boolean).length;
        const riskLabel = risks >= 3 ? 'Alto' : risks >= 1 ? 'Medio' : 'Bajo';

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        setText('exec-net-balance', formatCurrency(net));
        setText('exec-top-method', topMethod ? `${topMethod[0]} (${formatCurrency(topMethod[1])})` : 'Sin datos');
        setText('exec-top-client', topClient ? `${topClient} (${formatCurrency(clientMap[topClient].totalGastado)})` : 'Sin datos');
        setText('exec-risk-level', riskLabel);

        const period = document.getElementById('executive-summary-period');
        if (period) period.textContent = `${allData.length} movimientos analizados entre ventas de hoy e historial.`;

        const insights = [];
        if (topProduct) insights.push(`Producto fuerte: ${topProduct[0]} genero ${formatCurrency(topProduct[1].total)}.`);
        if (expenseRatio >= 45) insights.push(`Los gastos representan el ${expenseRatio.toFixed(0)}% de los ingresos; conviene revisar compras y precios.`);
        if (totalDebt > 0) insights.push(`Hay ${formatCurrency(totalDebt)} pendiente de cobro en clientes.`);
        if (lowStock.length > 0) insights.push(`${lowStock.length} producto${lowStock.length === 1 ? '' : 's'} requieren reposicion o revision de stock.`);
        if (insights.length === 0) insights.push('El negocio no muestra alertas criticas con los datos actuales.');

        const text = document.getElementById('executive-summary-text');
        if (text) text.textContent = insights.join(' ');
    };

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
                    backgroundColor: brandColor,
                    borderColor: brandColor,
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
        updateExecutiveSummary({ allData, incomes, expenses, totalRevenue, totalExpenses, methodMap });

        if (repMethodsChartInstance) repMethodsChartInstance.destroy();
        const ctxMethods = document.getElementById('rep-methods-chart').getContext('2d');
        repMethodsChartInstance = new Chart(ctxMethods, {
            type: 'doughnut',
            data: {
                labels: methodLabels.length ? methodLabels : ['Sin datos'],
                datasets: [{
                    data: methodValues.length ? methodValues : [1],
                    backgroundColor: [brandColor, 'rgba(46,213,115,0.8)', 'rgba(0,158,227,0.8)', 'rgba(255,165,2,0.8)'],
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
            brandColor, 'rgba(0,184,148,0.85)', 'rgba(253,203,110,0.85)',
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
        const brandInput = document.getElementById('config-brand-color');
        if (brandInput) brandInput.value = brandColor;
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
            updateSetupChecklist();
            showToast('Nombre del negocio actualizado');
        }
    });

    const btnSaveBrandColor = document.getElementById('btn-save-brand-color');
    if (btnSaveBrandColor) {
        btnSaveBrandColor.addEventListener('click', () => {
            const val = document.getElementById('config-brand-color').value;
            if (val) {
                brandColor = val;
                localStorage.setItem('brandColor', brandColor);
                applyBrandColor(brandColor);
                showToast('Color de marca aplicado exitosamente');
            }
        });
    }

    const editSidebarBrandBtn = document.getElementById('edit-sidebar-brand');
    if (editSidebarBrandBtn) {
        editSidebarBrandBtn.addEventListener('click', () => {
            const newName = prompt('Ingresa el nuevo nombre de tu negocio/proyecto:', storeName);
            if (newName !== null && newName.trim() !== '') {
                storeName = newName.trim();
                localStorage.setItem('storeName', storeName);
                document.getElementById('sidebar-brand-name').innerText = storeName;
                configStoreNameInput.value = storeName;
                updateSetupChecklist();
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
            updateSetupChecklist();
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
            version: 2,
            sales,
            historyData,
            productCatalog,
            storeName,
            brandColor,
            dailyGoal,
            alertThreshold,
            cashBase,
            recentProducts,
            followUps,
            recurringExpenses,
            dailyPlanDone,
            closingHour,
            marginSimulator,
            exportDate: new Date().toISOString()
        };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `zaleasy_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        localStorage.setItem('lastBackupDate', backupData.exportDate);
        updateDataHealthPanel();
        showToast('Copia de seguridad descargada (JSON)');
    });

    const updateDataHealthPanel = () => {
        const statusEl = document.getElementById('data-health-status');
        if (!statusEl) return;

        const setText = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value;
        };

        const { clients } = buildClientSummary();
        let storageBytes = 0;
        Object.keys(localStorage).forEach(key => {
            storageBytes += key.length + (localStorage.getItem(key) || '').length;
        });

        const lastBackupDate = localStorage.getItem('lastBackupDate');
        const lastBackupText = lastBackupDate
            ? `Ultima copia: ${new Date(lastBackupDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}`
            : 'Sin copias registradas';

        setText('data-health-sales', sales.length);
        setText('data-health-history', historyData.length);
        setText('data-health-clients', clients.length);
        setText('data-health-products', productCatalog.length);
        setText('data-health-storage', `Uso local: ${(storageBytes / 1024).toFixed(1)} KB`);
        setText('data-health-backup', lastBackupText);

        statusEl.textContent = lastBackupDate ? 'Respaldado' : 'Backup recomendado';
        statusEl.style.background = lastBackupDate ? 'var(--success-light)' : 'var(--warning-light)';
        statusEl.style.color = lastBackupDate ? 'var(--success)' : 'var(--warning)';
    };

    const dashboardViewConfig = {
        summary: {
            description: 'Lo esencial para registrar movimientos y decidir qu\u00e9 atender hoy.',
            selectors: [
                '.kpi-cards', '.smart-shortcuts-card', '.daily-pulse-card',
                '.form-section', '.list-section', '.secondary-metrics-strip',
                '.setup-checklist-card', '.action-center-card'
            ]
        },
        operation: {
            description: 'Caja, clientes, stock y pendientes reunidos para trabajar sin distracciones.',
            selectors: [
                '.kpi-cards', '.smart-shortcuts-card', '.form-section', '.list-section',
                '.receivables-card', '.stock-alert-card', '.action-center-card',
                '.daily-plan-card', '.due-radar-card', '.notepad-card',
                '.followups-card', '.recurring-card'
            ]
        },
        analysis: {
            description: 'Indicadores, tendencias y diagn\u00f3sticos para revisar el rendimiento del negocio.',
            selectors: [
                '.kpi-cards', '.secondary-metrics-strip', '.operational-health-card',
                '.data-quality-card', '.closing-forecast-card', '.charts-row',
                '#week-vs-lastweek-card', '.margin-simulator-card'
            ]
        },
        all: {
            description: 'Todas las herramientas del tablero en una sola vista.',
            selectors: ['*']
        }
    };

    const applyDashboardView = (mode, persist = true) => {
        if (!viewDashboard || !dashboardViewControls) return;

        const normalizedMode = dashboardViewConfig[mode] ? mode : 'summary';
        const dashboardGrid = viewDashboard.querySelector('.dashboard-grid');
        if (!dashboardGrid) return;

        const children = Array.from(dashboardGrid.children);
        const config = dashboardViewConfig[normalizedMode];
        const visibleItems = normalizedMode === 'all'
            ? new Set(children)
            : new Set(config.selectors.flatMap(selector => Array.from(dashboardGrid.querySelectorAll(`:scope > ${selector}`))));

        children.forEach(item => {
            const isVisible = visibleItems.has(item);
            item.classList.toggle('dashboard-item-hidden', !isVisible);
            item.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        });

        dashboardViewControls.querySelectorAll('[data-dashboard-view]').forEach(button => {
            const active = button.dataset.dashboardView === normalizedMode;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        dashboardViewMode = normalizedMode;
        dashboardViewDescription.textContent = config.description;
        const visibleCount = children.filter(item => !item.classList.contains('dashboard-item-hidden')).length;
        dashboardViewCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'secci\u00f3n' : 'secciones'}`;
        if (persist) localStorage.setItem('dashboardViewMode', normalizedMode);

        window.requestAnimationFrame(() => {
            if (methodsChartInstance && normalizedMode !== 'operation') methodsChartInstance.resize();
        });
    };

    const setupDashboardViews = () => {
        if (!dashboardViewControls) return;

        dashboardViewControls.addEventListener('click', (event) => {
            const button = event.target.closest('[data-dashboard-view]');
            if (!button) return;
            applyDashboardView(button.dataset.dashboardView);
        });

        applyDashboardView(dashboardViewMode, false);
    };

    // --- Application Initialization ---
    const init = () => {
        document.getElementById('sidebar-brand-name').innerText = storeName;
        if (setupChecklistCard && localStorage.getItem('setupChecklistCollapsed') === '1') {
            setupChecklistCard.classList.add('collapsed');
            if (setupChecklistToggle) setupChecklistToggle.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';
        }
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
        setupFollowUps();
        setupRecurringExpenses();
        setupMarginSimulator();
        updateMonthlyProjection();
        updateSecondaryMetrics();
        updateActivityFeed();
        updateWeekVsLastWeek();
        updateDataHealthPanel();
        updateSetupChecklist();
        updateStockAlertSnapshot();
        setupDashboardViews();
        setupGlobalSearch();
        initMilestoneCelebrations();
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
                updateSetupChecklist();
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

    // --- Follow-up Agenda ---
    const saveFollowUps = () => {
        localStorage.setItem('followUps', JSON.stringify(followUps));
    };

    const normalizeDateKey = (value) => value || new Date().toISOString().split('T')[0];

    const getFollowUpStats = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const active = followUps.filter(item => !item.done);
        const overdue = active.filter(item => {
            if (!item.dueDate) return false;
            const due = new Date(item.dueDate + 'T00:00:00');
            return due < today;
        });
        const dueToday = active.filter(item => item.dueDate === today.toISOString().split('T')[0]);
        return { active, overdue, dueToday };
    };

    const followUpTypeLabel = (type) => ({
        cobro: 'Cobro',
        stock: 'Stock',
        cliente: 'Cliente',
        caja: 'Caja',
        general: 'General'
    }[type] || 'General');

    const followUpTypeIcon = (type) => ({
        cobro: 'fa-hand-holding-dollar',
        stock: 'fa-box-open',
        cliente: 'fa-user',
        caja: 'fa-cash-register',
        general: 'fa-list-check'
    }[type] || 'fa-list-check');

    const renderFollowUps = () => {
        if (!followupList || !followupEmpty || !followupsBadge || !followupsSummary) return;

        const { active, overdue, dueToday } = getFollowUpStats();
        followupsBadge.textContent = `${active.length} ${active.length === 1 ? 'pendiente' : 'pendientes'}`;
        followupsSummary.textContent = overdue.length > 0
            ? `${overdue.length} seguimiento${overdue.length === 1 ? '' : 's'} vencido${overdue.length === 1 ? '' : 's'} requieren atencion.`
            : dueToday.length > 0
                ? `${dueToday.length} seguimiento${dueToday.length === 1 ? '' : 's'} para hoy.`
                : 'Organiza cobros, reposiciones, llamadas y tareas del negocio.';

        followupList.innerHTML = '';
        if (active.length === 0) {
            followupEmpty.style.display = 'flex';
            followupList.style.display = 'none';
            return;
        }

        followupEmpty.style.display = 'none';
        followupList.style.display = 'grid';
        active
            .slice()
            .sort((a, b) => (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31'))
            .forEach(item => {
                const dueDate = item.dueDate ? new Date(item.dueDate + 'T00:00:00') : null;
                const todayKey = new Date().toISOString().split('T')[0];
                const tone = item.dueDate && item.dueDate < todayKey ? 'danger' : item.dueDate === todayKey ? 'warning' : 'neutral';
                const dueLabel = dueDate
                    ? dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
                    : 'Sin fecha';
                const row = document.createElement('div');
                row.className = 'followup-item';
                row.dataset.tone = tone;
                row.innerHTML = `
                    <span class="followup-icon"><i class="fa-solid ${followUpTypeIcon(item.type)}"></i></span>
                    <span class="followup-copy">
                        <strong>${item.title}</strong>
                        <small>${followUpTypeLabel(item.type)} · ${dueLabel}</small>
                    </span>
                    <span class="followup-actions">
                        <button type="button" class="btn-icon btn-followup-done" data-id="${item.id}" title="Marcar listo"><i class="fa-solid fa-check"></i></button>
                        <button type="button" class="btn-icon btn-followup-delete" data-id="${item.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                    </span>
                `;
                followupList.appendChild(row);
            });
    };

    const setupFollowUps = () => {
        if (!followupForm) return;
        renderFollowUps();

        followupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = (followupTitleInput?.value || '').trim();
            if (!title) return;
            followUps.push({
                id: Date.now(),
                title,
                type: followupTypeSelect?.value || 'general',
                dueDate: normalizeDateKey(followupDateInput?.value || ''),
                done: false,
                createdAt: Date.now()
            });
            saveFollowUps();
            followupForm.reset();
            renderFollowUps();
            updateDueRadar();
            updateKPIs();
            updateDataHealthPanel();
            showToast('Seguimiento agregado');
        });

        followupList?.addEventListener('click', (e) => {
            const doneBtn = e.target.closest('.btn-followup-done');
            const deleteBtn = e.target.closest('.btn-followup-delete');
            const id = parseInt((doneBtn || deleteBtn)?.getAttribute('data-id') || '0');
            if (!id) return;

            if (doneBtn) {
                followUps = followUps.map(item => item.id === id ? { ...item, done: true, completedAt: Date.now() } : item);
                showToast('Seguimiento completado');
            }
            if (deleteBtn) {
                followUps = followUps.filter(item => item.id !== id);
                showToast('Seguimiento eliminado');
            }
            saveFollowUps();
            renderFollowUps();
            updateDueRadar();
            updateKPIs();
            updateDataHealthPanel();
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
                        <input type="number" class="item-amount-input" step="0.01" min="0" placeholder="0.00" value="" required>
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

    // --- Recurring Expenses ---
    const saveRecurringExpenses = () => {
        localStorage.setItem('recurringExpenses', JSON.stringify(recurringExpenses));
    };

    const addDays = (date, days) => {
        const next = new Date(date);
        next.setDate(next.getDate() + days);
        return next.toISOString().split('T')[0];
    };

    const addMonths = (date, months) => {
        const next = new Date(date);
        next.setMonth(next.getMonth() + months);
        return next.toISOString().split('T')[0];
    };

    const nextRecurringDate = (dateKey, frequency) => {
        const base = new Date((dateKey || new Date().toISOString().split('T')[0]) + 'T00:00:00');
        if (frequency === 'daily') return addDays(base, 1);
        if (frequency === 'weekly') return addDays(base, 7);
        return addMonths(base, 1);
    };

    const getRecurringDueStats = () => {
        const todayKey = new Date().toISOString().split('T')[0];
        const active = recurringExpenses.filter(item => !item.archived);
        const due = active.filter(item => (item.nextDate || todayKey) <= todayKey);
        const upcoming = active.filter(item => {
            if (!item.nextDate || item.nextDate <= todayKey) return false;
            const days = Math.ceil((new Date(item.nextDate + 'T00:00:00') - new Date(todayKey + 'T00:00:00')) / 86400000);
            return days <= 7;
        });
        return { active, due, upcoming };
    };

    const recurringFrequencyLabel = (frequency) => ({
        daily: 'Diario',
        weekly: 'Semanal',
        monthly: 'Mensual'
    }[frequency] || 'Mensual');

    const renderRecurringExpenses = () => {
        if (!recurringList || !recurringEmpty || !recurringBadge || !recurringSummary) return;

        const { active, due, upcoming } = getRecurringDueStats();
        recurringBadge.textContent = `${active.length} ${active.length === 1 ? 'activo' : 'activos'}`;
        recurringSummary.textContent = due.length > 0
            ? `${due.length} gasto${due.length === 1 ? '' : 's'} recurrente${due.length === 1 ? '' : 's'} para registrar.`
            : upcoming.length > 0
                ? `${upcoming.length} vencimiento${upcoming.length === 1 ? '' : 's'} en los proximos 7 dias.`
                : 'Controla alquiler, servicios, sueldos, suscripciones o proveedores fijos.';

        recurringList.innerHTML = '';
        if (active.length === 0) {
            recurringEmpty.style.display = 'flex';
            recurringList.style.display = 'none';
            return;
        }

        recurringEmpty.style.display = 'none';
        recurringList.style.display = 'grid';
        active
            .slice()
            .sort((a, b) => (a.nextDate || '9999-12-31').localeCompare(b.nextDate || '9999-12-31'))
            .forEach(item => {
                const todayKey = new Date().toISOString().split('T')[0];
                const tone = (item.nextDate || todayKey) <= todayKey ? 'warning' : 'neutral';
                const dueDate = item.nextDate ? new Date(item.nextDate + 'T00:00:00') : null;
                const dueLabel = dueDate
                    ? dueDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
                    : 'Sin fecha';
                const row = document.createElement('div');
                row.className = 'recurring-item';
                row.dataset.tone = tone;
                row.innerHTML = `
                    <span class="recurring-icon"><i class="fa-solid fa-repeat"></i></span>
                    <span class="recurring-copy">
                        <strong>${item.name}</strong>
                        <small>${formatCurrency(item.amount)} · ${recurringFrequencyLabel(item.frequency)} · vence ${dueLabel}</small>
                    </span>
                    <span class="recurring-actions">
                        <button type="button" class="btn-icon btn-recurring-pay" data-id="${item.id}" title="Cargar gasto"><i class="fa-solid fa-cash-register"></i></button>
                        <button type="button" class="btn-icon btn-recurring-delete" data-id="${item.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                    </span>
                `;
                recurringList.appendChild(row);
            });
    };

    const registerRecurringExpense = (item) => {
        if (!confirm(`Registrar gasto recurrente "${item.name}" por ${formatCurrency(item.amount)}?`)) return false;
        const timestamp = Date.now();
        sales.push({
            id: timestamp,
            timestamp,
            product: item.name,
            amount: Number(item.amount || 0),
            method: 'Efectivo',
            type: 'expense',
            notes: `Gasto recurrente ${recurringFrequencyLabel(item.frequency).toLowerCase()}`,
            category: 'Otros',
            customerName: '',
            groupId: timestamp
        });
        localStorage.setItem('dailySales', JSON.stringify(sales));
        renderSales();
        updateKPIs();
        updateActivityFeed();
        showToast(`Gasto recurrente registrado: ${formatCurrency(item.amount)}`);
        return true;
    };

    const setupRecurringExpenses = () => {
        if (!recurringForm) return;
        renderRecurringExpenses();

        recurringForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (recurringNameInput?.value || '').trim();
            const amount = parseFloat(recurringAmountInput?.value || '0');
            if (!name || !amount || amount <= 0) {
                showToast('Completa nombre y monto del gasto recurrente.');
                return;
            }
            recurringExpenses.push({
                id: Date.now(),
                name,
                amount,
                frequency: recurringFrequencySelect?.value || 'monthly',
                nextDate: recurringNextDateInput?.value || new Date().toISOString().split('T')[0],
                createdAt: Date.now()
            });
            saveRecurringExpenses();
            recurringForm.reset();
            renderRecurringExpenses();
            updateDueRadar();
            updateKPIs();
            showToast('Gasto recurrente agregado');
        });

        recurringList?.addEventListener('click', (e) => {
            const payBtn = e.target.closest('.btn-recurring-pay');
            const deleteBtn = e.target.closest('.btn-recurring-delete');
            const id = parseInt((payBtn || deleteBtn)?.getAttribute('data-id') || '0');
            if (!id) return;
            const item = recurringExpenses.find(expense => expense.id === id);
            if (!item) return;

            if (payBtn) {
                const registered = registerRecurringExpense(item);
                if (!registered) return;
                recurringExpenses = recurringExpenses.map(expense => expense.id === id
                    ? { ...expense, nextDate: nextRecurringDate(expense.nextDate, expense.frequency), lastPreparedAt: Date.now() }
                    : expense
                );
            }
            if (deleteBtn) {
                recurringExpenses = recurringExpenses.filter(expense => expense.id !== id);
                showToast('Gasto recurrente eliminado');
            }
            saveRecurringExpenses();
            renderRecurringExpenses();
            updateDueRadar();
            updateKPIs();
        });
    };

    const calculateMarginFromInputs = (source = 'target') => {
        if (!marginCostInput || !marginTargetInput || !marginPriceInput || !marginProfit || !marginReal || !marginMarkup || !marginAdvice || !marginBadge || !marginSummary) return;

        const cost = parseFloat(marginCostInput.value || '0') || 0;
        const target = parseFloat(marginTargetInput.value || '0') || 0;
        let price = parseFloat(marginPriceInput.value || '0') || 0;

        if (source === 'target' && cost > 0 && target > 0 && target < 95) {
            price = cost / (1 - (target / 100));
            marginPriceInput.value = price.toFixed(2);
        }

        const profit = Math.max(price - cost, 0);
        const realMargin = price > 0 ? (profit / price) * 100 : 0;
        const markup = cost > 0 ? (profit / cost) * 100 : 0;

        marginProfit.textContent = formatCurrency(profit);
        marginReal.textContent = `${realMargin.toFixed(1)}%`;
        marginMarkup.textContent = `${markup.toFixed(1)}%`;
        marginBadge.textContent = price > 0 ? `${realMargin.toFixed(0)}% margen` : 'Simulador';

        if (cost <= 0) {
            marginAdvice.textContent = 'Ingresa el costo para calcular un precio rentable.';
        } else if (price <= cost) {
            marginAdvice.textContent = 'El precio no cubre el costo. Revisa margen o precio final antes de vender.';
        } else if (realMargin < 20) {
            marginAdvice.textContent = 'Margen ajustado. Sirve para ofertas, pero conviene revisar gastos y comisiones.';
        } else if (realMargin >= 45) {
            marginAdvice.textContent = 'Margen alto. Asegurate de que el precio siga siendo competitivo para el cliente.';
        } else {
            marginAdvice.textContent = 'Precio equilibrado para vender con ganancia controlada.';
        }

        marginSummary.textContent = marginProductName?.value
            ? `Simulando ${marginProductName.value.trim()} con costo ${formatCurrency(cost)}.`
            : 'Calcula precio sugerido, ganancia y margen antes de vender.';

        marginSimulator = {
            product: marginProductName?.value || '',
            cost,
            target,
            price
        };
        localStorage.setItem('marginSimulator', JSON.stringify(marginSimulator));
    };

    const fillMarginFromProduct = () => {
        if (!marginProductName || !marginPriceInput) return;
        const name = (marginProductName.value || '').trim().toLowerCase();
        const product = productCatalog.find(p => (p.name || '').toLowerCase() === name);
        if (product && Number(product.price || 0) > 0 && !marginPriceInput.value) {
            marginPriceInput.value = Number(product.price || 0).toFixed(2);
            calculateMarginFromInputs('price');
        }
    };

    const getTargetItemRow = () => {
        const focused = document.querySelector('.item-product-input:focus, .item-amount-input:focus');
        if (focused) return focused.closest('.item-row');
        const rows = [...document.querySelectorAll('.item-row')];
        return rows.find(row => !(row.querySelector('.item-product-input')?.value || '').trim()) || rows[0] || null;
    };

    const setupMarginSimulator = () => {
        if (!marginCostInput || !marginTargetInput || !marginPriceInput) return;

        if (marginSimulator.product && marginProductName) marginProductName.value = marginSimulator.product;
        if (marginSimulator.cost) marginCostInput.value = Number(marginSimulator.cost).toFixed(2);
        marginTargetInput.value = Number(marginSimulator.target || 35).toString();
        if (marginSimulator.price) marginPriceInput.value = Number(marginSimulator.price).toFixed(2);
        calculateMarginFromInputs('price');

        marginProductName?.addEventListener('change', () => {
            fillMarginFromProduct();
            calculateMarginFromInputs('price');
        });
        marginProductName?.addEventListener('input', () => calculateMarginFromInputs('price'));
        marginCostInput.addEventListener('input', () => calculateMarginFromInputs('target'));
        marginTargetInput.addEventListener('input', () => calculateMarginFromInputs('target'));
        marginPriceInput.addEventListener('input', () => calculateMarginFromInputs('price'));

        marginApplySale?.addEventListener('click', () => {
            const price = parseFloat(marginPriceInput.value || '0') || 0;
            if (price <= 0) {
                showToast('Calcula un precio antes de usarlo en la venta.');
                return;
            }
            focusTransactionForm('income');
            const row = getTargetItemRow();
            if (!row) return;
            const productInputEl = row.querySelector('.item-product-input');
            const amountInputEl = row.querySelector('.item-amount-input');
            const categorySelect = row.querySelector('.item-category-select');
            if (productInputEl && marginProductName?.value) productInputEl.value = marginProductName.value.trim();
            if (amountInputEl) {
                amountInputEl.value = price.toFixed(2);
                amountInputEl.dispatchEvent(new Event('input', { bubbles: true }));
            }
            if (categorySelect && !categorySelect.value) categorySelect.value = 'Producto';
            showToast('Precio aplicado a la venta');
        });

        marginSaveProduct?.addEventListener('click', () => {
            const name = (marginProductName?.value || '').trim();
            const price = parseFloat(marginPriceInput.value || '0') || 0;
            if (!name || price <= 0) {
                showToast('Completa producto y precio para guardarlo.');
                return;
            }
            const existingIndex = productCatalog.findIndex(p => (p.name || '').toLowerCase() === name.toLowerCase());
            if (existingIndex >= 0) {
                productCatalog[existingIndex] = { ...productCatalog[existingIndex], price };
            } else {
                productCatalog.push({ id: Date.now(), name, price, stock: null });
            }
            localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
            renderInventario();
            setupAutocomplete();
            updateKPIs();
            showToast(existingIndex >= 0 ? 'Precio actualizado en inventario' : 'Producto guardado en inventario');
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
        const quickCreate = document.getElementById('quick-create');
        const quickCreateMenu = document.getElementById('quick-create-menu');
        const fabQuickAdd = document.getElementById('fab-quick-add');

        if (!quickCreate || !quickCreateMenu || !fabQuickAdd) return;

        const closeQuickCreate = () => {
            quickCreateMenu.hidden = true;
            quickCreate.classList.remove('open');
            fabQuickAdd.setAttribute('aria-expanded', 'false');
            fabQuickAdd.setAttribute('aria-label', 'Abrir menu de creacion rapida');
        };

        const openQuickCreate = () => {
            quickCreateMenu.hidden = false;
            quickCreate.classList.add('open');
            fabQuickAdd.setAttribute('aria-expanded', 'true');
            fabQuickAdd.setAttribute('aria-label', 'Cerrar menu de creacion rapida');
            quickCreateMenu.querySelector('.quick-create-action')?.focus();
        };

        fabQuickAdd.addEventListener('click', () => {
            if (quickCreateMenu.hidden) openQuickCreate();
            else closeQuickCreate();
        });

        quickCreateMenu.addEventListener('click', (event) => {
            const actionButton = event.target.closest('.quick-create-action[data-quick-action]');
            if (!actionButton) return;
            const action = actionButton.dataset.quickAction;
            closeQuickCreate();

            if (action === 'sale') focusTransactionForm('income');
            if (action === 'expense') focusTransactionForm('expense');
            if (action === 'product') openInventoryForm();
            if (action === 'followup') {
                switchView('nav-dashboard');
                setTimeout(() => {
                    document.getElementById('followups-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    followupTitleInput?.focus();
                }, 150);
            }
        });

        document.addEventListener('click', (event) => {
            if (!quickCreate.contains(event.target)) closeQuickCreate();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape' || quickCreateMenu.hidden) return;
            closeQuickCreate();
            fabQuickAdd.focus();
        });
    };

    // --- Theme & Branding ---
    const applyBrandColor = (color) => {
        document.documentElement.style.setProperty('--primary', color);
        // Calculate a light version (approx 15% opacity) for badges and outlines
        let r=108, g=92, b=231;
        if(color.length === 7) {
            r = parseInt(color.slice(1,3), 16);
            g = parseInt(color.slice(3,5), 16);
            b = parseInt(color.slice(5,7), 16);
        }
        document.documentElement.style.setProperty('--primary-light', `rgba(${r}, ${g}, ${b}, 0.15)`);
        
        // Update Chart primary color if exists
        if (methodsChartInstance && methodsChartInstance.data.datasets[0].backgroundColor) {
            methodsChartInstance.data.datasets[0].backgroundColor[1] = color;
            methodsChartInstance.update();
        }
    };

    const setupTheme = () => {
        applyBrandColor(brandColor);

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

    const escapeSearchHtml = (value = '') => String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    const normalizeGlobalSearch = (value = '') => String(value)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();

    const globalSearchDestinations = [
        { type: 'view', target: 'nav-dashboard', title: 'Dashboard', meta: 'Resumen y operacion del dia', icon: 'fa-house', keywords: 'inicio tablero ventas caja' },
        { type: 'view', target: 'nav-historial', title: 'Historial', meta: 'Todos los movimientos registrados', icon: 'fa-clock-rotate-left', keywords: 'ventas gastos movimientos transacciones' },
        { type: 'view', target: 'nav-reportes', title: 'Reportes', meta: 'Indicadores y comparaciones', icon: 'fa-chart-pie', keywords: 'analisis metricas estadisticas' },
        { type: 'view', target: 'nav-clientes', title: 'Clientes', meta: 'Compras, saldos y seguimiento', icon: 'fa-address-book', keywords: 'crm deuda cobrar contactos' },
        { type: 'view', target: 'nav-inventario', title: 'Inventario', meta: 'Productos, precios y stock', icon: 'fa-boxes-stacked', keywords: 'catalogo mercaderia existencias' },
        { type: 'view', target: 'nav-config', title: 'Configuracion', meta: 'Negocio, meta y respaldo', icon: 'fa-gear', keywords: 'ajustes backup datos tienda' }
    ];

    let globalSearchItems = [];
    let globalSearchActiveIndex = -1;

    const buildGlobalSearchItems = (query) => {
        const normalized = normalizeGlobalSearch(query);
        const destinations = globalSearchDestinations
            .filter(item => !normalized || normalizeGlobalSearch(`${item.title} ${item.meta} ${item.keywords}`).includes(normalized))
            .slice(0, normalized ? 3 : 6);

        if (!normalized) return destinations;

        const products = productCatalog
            .filter(product => normalizeGlobalSearch(`${product.name || ''} ${product.category || ''}`).includes(normalized))
            .slice(0, 3)
            .map(product => ({
                type: 'product', target: product.name || '',
                title: product.name || 'Producto sin nombre',
                meta: `${formatCurrency(Number(product.price || 0))} · ${product.stock === undefined || product.stock === null ? 'Stock sin cargar' : `${Number(product.stock)} unidades`}`,
                icon: 'fa-box'
            }));

        const { clientMap } = buildClientSummary();
        const clients = Object.entries(clientMap)
            .filter(([name]) => normalizeGlobalSearch(name).includes(normalized))
            .sort(([, a], [, b]) => b.totalGastado - a.totalGastado)
            .slice(0, 3)
            .map(([name, client]) => ({
                type: 'client', target: name, title: name,
                meta: client.totalDeuda > 0 ? `${formatCurrency(client.totalDeuda)} pendiente` : `${client.totalCompras} movimientos · sin deuda`,
                icon: 'fa-user'
            }));

        const transactions = [...sales, ...historyData]
            .filter(transaction => normalizeGlobalSearch(`${transaction.product || ''} ${transaction.customerName || ''} ${transaction.category || ''} ${transaction.method || ''}`).includes(normalized))
            .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
            .slice(0, 4)
            .map(transaction => ({
                type: 'transaction', target: transaction.product || transaction.customerName || '',
                title: transaction.product || transaction.customerName || 'Movimiento',
                meta: `${transaction.type === 'expense' ? 'Gasto' : 'Venta'} · ${formatCurrency(Number(transaction.amount || 0))}${transaction.customerName ? ` · ${transaction.customerName}` : ''}`,
                icon: transaction.type === 'expense' ? 'fa-arrow-trend-down' : 'fa-receipt'
            }));

        return [...destinations, ...products, ...clients, ...transactions].slice(0, 10);
    };

    const searchTypeLabel = (type) => ({
        view: 'Seccion', product: 'Producto', client: 'Cliente', transaction: 'Movimiento'
    }[type] || 'Resultado');

    const setGlobalSearchOpen = (open) => {
        if (!globalSearchPanel || !globalSearchInput || !globalSearch) return;
        globalSearchPanel.hidden = !open;
        globalSearch.classList.toggle('open', open);
        globalSearchInput.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (!open) globalSearchActiveIndex = -1;
    };

    const updateGlobalSearchSelection = () => {
        const options = globalSearchResults?.querySelectorAll('.global-search-result') || [];
        options.forEach((option, index) => {
            const active = index === globalSearchActiveIndex;
            option.classList.toggle('active', active);
            option.setAttribute('aria-selected', active ? 'true' : 'false');
            if (active) option.scrollIntoView({ block: 'nearest' });
        });
    };

    const renderGlobalSearch = () => {
        if (!globalSearchInput || !globalSearchResults || !globalSearchStatus || !globalSearchCount || !globalSearchClear) return;
        const query = globalSearchInput.value;
        globalSearchItems = buildGlobalSearchItems(query);
        globalSearchActiveIndex = -1;
        globalSearchClear.hidden = !query;
        globalSearchStatus.textContent = query ? 'Resultados encontrados' : 'Accesos rapidos';
        globalSearchCount.textContent = query ? `${globalSearchItems.length} resultado${globalSearchItems.length === 1 ? '' : 's'}` : '';

        if (!globalSearchItems.length) {
            globalSearchResults.innerHTML = `<div class="global-search-empty"><i class="fa-solid fa-magnifying-glass"></i><strong>Sin coincidencias</strong><span>Prueba con otro cliente, producto o seccion.</span></div>`;
            return;
        }

        globalSearchResults.innerHTML = globalSearchItems.map((item, index) => `
            <button type="button" class="global-search-result" data-search-index="${index}" role="option" aria-selected="false">
                <span class="global-search-result-icon" data-type="${item.type}"><i class="fa-solid ${item.icon}"></i></span>
                <span class="global-search-result-copy"><strong>${escapeSearchHtml(item.title)}</strong><small>${escapeSearchHtml(item.meta)}</small></span>
                <span class="global-search-result-type">${searchTypeLabel(item.type)}</span>
                <i class="fa-solid fa-arrow-right global-search-result-arrow"></i>
            </button>`).join('');
    };

    const activateGlobalSearchItem = (item) => {
        if (!item) return;
        if (item.type === 'view') {
            switchView(item.target);
        } else if (item.type === 'product') {
            switchView('nav-inventario');
            if (searchInventario) searchInventario.value = item.target;
            renderInventario();
        } else if (item.type === 'client') {
            switchView('nav-clientes');
            if (searchClientesInput) searchClientesInput.value = item.target;
            renderClientes();
        } else if (item.type === 'transaction') {
            switchView('nav-historial');
            if (historySearch) historySearch.value = item.target;
            renderHistory();
        }
        setGlobalSearchOpen(false);
        globalSearchInput.value = '';
        if (globalSearchClear) globalSearchClear.hidden = true;
    };

    const setupGlobalSearch = () => {
        if (!globalSearch || !globalSearchInput || !globalSearchResults) return;
        globalSearchInput.addEventListener('focus', () => {
            renderGlobalSearch();
            setGlobalSearchOpen(true);
        });
        globalSearchInput.addEventListener('input', () => {
            renderGlobalSearch();
            setGlobalSearchOpen(true);
        });
        globalSearchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setGlobalSearchOpen(false);
                globalSearchInput.blur();
                return;
            }
            if (!globalSearchItems.length || !['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) return;
            event.preventDefault();
            if (event.key === 'ArrowDown') globalSearchActiveIndex = (globalSearchActiveIndex + 1) % globalSearchItems.length;
            if (event.key === 'ArrowUp') globalSearchActiveIndex = (globalSearchActiveIndex - 1 + globalSearchItems.length) % globalSearchItems.length;
            if (event.key === 'Enter') {
                activateGlobalSearchItem(globalSearchItems[globalSearchActiveIndex >= 0 ? globalSearchActiveIndex : 0]);
                return;
            }
            updateGlobalSearchSelection();
        });
        globalSearchResults.addEventListener('click', (event) => {
            const result = event.target.closest('[data-search-index]');
            if (result) activateGlobalSearchItem(globalSearchItems[Number(result.dataset.searchIndex)]);
        });
        globalSearchClear?.addEventListener('click', () => {
            globalSearchInput.value = '';
            renderGlobalSearch();
            globalSearchInput.focus();
        });
        document.addEventListener('click', (event) => {
            if (!globalSearch.contains(event.target)) setGlobalSearchOpen(false);
        });
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
                        brandColor, // Primary (Card)
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

    const updateSmartShortcuts = (totalRevenue = 0, totalExpenses = 0, totalSalesCount = 0, netBalance = 0) => {
        if (!smartShortcutsCard || !smartShortcutsGrid || !smartShortcutsSummary || !smartShortcutsBadge) return;

        const { debtClients, totalDebt } = buildClientSummary();
        const trackedStock = productCatalog.filter(p => p.stock !== undefined && p.stock !== null && p.stock !== '');
        const lowStock = trackedStock.filter(p => Number(p.stock) <= 5);
        const followStats = typeof getFollowUpStats === 'function'
            ? getFollowUpStats()
            : { overdue: [], dueToday: [] };
        const recurringStats = typeof getRecurringDueStats === 'function'
            ? getRecurringDueStats()
            : { due: [] };
        const dueTodayTotal = (followStats.dueToday?.length || 0) + (recurringStats.due?.length || 0);
        const focusCount = [
            netBalance < 0,
            totalDebt > 0,
            lowStock.length > 0,
            (followStats.overdue?.length || 0) > 0,
            dueTodayTotal > 0
        ].filter(Boolean).length;

        smartShortcutsCard.dataset.state = focusCount > 0 ? 'attention' : totalSalesCount > 0 ? 'active' : 'empty';
        smartShortcutsBadge.textContent = focusCount > 0
            ? `${focusCount} foco${focusCount === 1 ? '' : 's'}`
            : totalSalesCount > 0
                ? 'En marcha'
                : 'Para empezar';
        smartShortcutsSummary.textContent = focusCount > 0
            ? `Hay ${focusCount} punto${focusCount === 1 ? '' : 's'} para atender entre caja, cobros, stock y agenda.`
            : totalSalesCount > 0
                ? `${totalSalesCount} venta${totalSalesCount === 1 ? '' : 's'} registrada${totalSalesCount === 1 ? '' : 's'} hoy. Continua cargando movimientos y revisa el cierre.`
                : 'Empieza registrando una venta, gasto o pendiente para que el tablero priorice acciones.';

        const shortcutModels = {
            sale: {
                tone: totalSalesCount > 0 ? 'success' : 'neutral',
                detail: totalSalesCount > 0 ? `${totalSalesCount} hoy` : 'Registrar ingreso'
            },
            expense: {
                tone: totalExpenses > 0 ? 'warning' : 'neutral',
                detail: totalExpenses > 0 ? formatCurrency(totalExpenses) : 'Registrar salida'
            },
            clients: {
                tone: totalDebt > 0 ? (debtClients.length >= 4 ? 'danger' : 'warning') : 'success',
                detail: totalDebt > 0 ? formatCurrency(totalDebt) : 'Sin saldos'
            },
            inventory: {
                tone: lowStock.length > 0 ? (lowStock.length >= 4 ? 'danger' : 'warning') : trackedStock.length > 0 ? 'success' : 'neutral',
                detail: lowStock.length > 0 ? `${lowStock.length} alerta${lowStock.length === 1 ? '' : 's'}` : trackedStock.length > 0 ? 'Saludable' : 'Cargar stock'
            },
            followups: {
                tone: (followStats.overdue?.length || 0) > 0 ? 'danger' : dueTodayTotal > 0 ? 'warning' : 'success',
                detail: (followStats.overdue?.length || 0) > 0
                    ? `${followStats.overdue.length} vencido${followStats.overdue.length === 1 ? '' : 's'}`
                    : dueTodayTotal > 0
                        ? `${dueTodayTotal} hoy`
                        : 'Al dia'
            },
            close: {
                tone: netBalance < 0 ? 'danger' : (totalSalesCount > 0 || totalExpenses > 0) ? 'success' : 'neutral',
                detail: netBalance < 0 ? 'Revisar' : (totalSalesCount > 0 || totalExpenses > 0) ? formatCurrency(netBalance) : 'Controlar caja'
            }
        };

        smartShortcutsGrid.querySelectorAll('.smart-shortcut[data-action]').forEach(shortcut => {
            const model = shortcutModels[shortcut.dataset.action];
            if (!model) return;
            shortcut.dataset.tone = model.tone;
            const detail = shortcut.querySelector('small');
            if (detail) detail.textContent = model.detail;
        });
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
        updateDailyPulse(totalRevenue, totalExpenses, totalSalesCount, netBalance);
        updateSmartShortcuts(totalRevenue, totalExpenses, totalSalesCount, netBalance);
        updateReceivablesSnapshot();
        updateDataHealthPanel();
        updateSetupChecklist();
        updateStockAlertSnapshot();
        updateActionCenter(totalRevenue, totalExpenses, totalSalesCount, netBalance);
        updateDailyPlan(totalRevenue, totalExpenses, totalSalesCount, netBalance);
        updateDueRadar();
        updateNotificationCenter();
        updateOperationalHealth(totalRevenue, totalExpenses, totalSalesCount, netBalance);
        updateDataQualityAuditor();
        updateClosingForecast(totalRevenue, totalExpenses, totalSalesCount, netBalance);

        // Animated counter for KPI numbers
        animateKPICounter(kpiRevenue, totalRevenue, true);
        animateKPICounter(kpiSalesCount, totalSalesCount, false);
        animateKPICounter(kpiExpenses, totalExpenses, true);
        animateKPICounter(kpiBalance, netBalance, true);
    };

    const createHealthMetric = ({ tone, icon, label, value, detail, action }) => `
        <button type="button" class="health-metric" data-tone="${tone}" data-action="${action}">
            <span class="health-metric-icon"><i class="fa-solid ${icon}"></i></span>
            <span>
                <strong>${label}</strong>
                <em>${value}</em>
                <small>${detail}</small>
            </span>
        </button>
    `;

    const updateOperationalHealth = (totalRevenue = 0, totalExpenses = 0, totalSalesCount = 0, netBalance = 0) => {
        if (!operationalHealthCard || !healthScoreRing || !healthScoreValue || !healthStatusBadge || !healthSummaryText || !healthMetricsGrid) return;

        const { debtClients, totalDebt } = buildClientSummary();
        const trackedStock = productCatalog.filter(p => p.stock !== undefined && p.stock !== null);
        const stockIssues = trackedStock.filter(p => Number(p.stock) <= 5);
        const progress = dailyGoal > 0 ? (totalRevenue / dailyGoal) * 100 : 0;
        const expenseRatio = totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : (totalExpenses > 0 ? 100 : 0);
        const lastBackupDate = localStorage.getItem('lastBackupDate');
        const daysSinceBackup = lastBackupDate
            ? Math.floor((Date.now() - new Date(lastBackupDate).getTime()) / 86400000)
            : Infinity;

        const metrics = [
            {
                key: 'sales',
                label: 'Ventas',
                action: 'sale',
                icon: 'fa-bullseye',
                score: totalSalesCount === 0 ? 25 : progress >= 100 ? 100 : progress >= 70 ? 78 : 52,
                value: totalSalesCount === 0 ? 'Sin ventas' : `${Math.min(progress, 100).toFixed(0)}% meta`,
                detail: totalSalesCount === 0 ? 'Carga la primera venta para activar el tablero.' : `Ingresos de hoy: ${formatCurrency(totalRevenue)}.`,
                tone: totalSalesCount === 0 ? 'warning' : progress >= 100 ? 'success' : progress >= 70 ? 'neutral' : 'warning'
            },
            {
                key: 'cash',
                label: 'Caja',
                action: 'close',
                icon: 'fa-cash-register',
                score: netBalance < 0 ? 20 : expenseRatio >= 55 ? 48 : expenseRatio >= 35 ? 72 : 95,
                value: formatCurrency(netBalance),
                detail: netBalance < 0 ? 'Balance negativo: revisa gastos o base de caja.' : `Gastos: ${expenseRatio.toFixed(0)}% de ingresos.`,
                tone: netBalance < 0 ? 'danger' : expenseRatio >= 55 ? 'warning' : 'success'
            },
            {
                key: 'clients',
                label: 'Cobros',
                action: 'clients',
                icon: 'fa-hand-holding-dollar',
                score: totalDebt <= 0 ? 100 : debtClients.length >= 4 ? 45 : 68,
                value: totalDebt <= 0 ? 'Al dia' : formatCurrency(totalDebt),
                detail: totalDebt <= 0 ? 'No hay saldos pendientes registrados.' : `${debtClients.length} cliente${debtClients.length === 1 ? '' : 's'} con deuda.`,
                tone: totalDebt <= 0 ? 'success' : debtClients.length >= 4 ? 'danger' : 'warning'
            },
            {
                key: 'stock',
                label: 'Stock',
                action: 'inventory',
                icon: 'fa-boxes-stacked',
                score: trackedStock.length === 0 ? 55 : stockIssues.length === 0 ? 100 : stockIssues.length >= 4 ? 42 : 70,
                value: trackedStock.length === 0 ? 'Sin control' : stockIssues.length === 0 ? 'Saludable' : `${stockIssues.length} alerta${stockIssues.length === 1 ? '' : 's'}`,
                detail: trackedStock.length === 0 ? 'Carga stock para evitar quiebres.' : `${trackedStock.length} producto${trackedStock.length === 1 ? '' : 's'} monitoreado${trackedStock.length === 1 ? '' : 's'}.`,
                tone: trackedStock.length === 0 ? 'warning' : stockIssues.length === 0 ? 'success' : stockIssues.length >= 4 ? 'danger' : 'warning'
            },
            {
                key: 'backup',
                label: 'Respaldo',
                action: 'config',
                icon: 'fa-cloud-arrow-down',
                score: daysSinceBackup <= 7 ? 100 : daysSinceBackup <= 14 ? 68 : 35,
                value: daysSinceBackup === Infinity ? 'Sin copia' : daysSinceBackup <= 0 ? 'Hoy' : `${daysSinceBackup} d`,
                detail: daysSinceBackup <= 7 ? 'Copia reciente registrada.' : 'Descarga una copia de seguridad.',
                tone: daysSinceBackup <= 7 ? 'success' : daysSinceBackup <= 14 ? 'warning' : 'danger'
            }
        ];

        const score = Math.max(0, Math.min(100, Math.round(metrics.reduce((sum, item) => sum + item.score, 0) / metrics.length)));
        const urgent = metrics.filter(item => item.tone === 'danger');
        const warning = metrics.filter(item => item.tone === 'warning');
        const priority = urgent[0] || warning[0] || metrics.find(item => item.key === 'sales');
        const tone = score >= 82 ? 'success' : score >= 58 ? 'warning' : 'danger';

        operationalHealthCard.dataset.tone = tone;
        healthScoreRing.style.setProperty('--score', score);
        healthScoreValue.textContent = score;
        healthStatusBadge.textContent = tone === 'success' ? 'Estable' : tone === 'warning' ? 'Atencion' : 'Critico';
        healthSummaryText.textContent = urgent.length
            ? `Prioridad: ${priority.label}. ${priority.detail}`
            : warning.length
                ? `Hay ${warning.length} punto${warning.length === 1 ? '' : 's'} para revisar antes del cierre.`
                : 'Operacion saludable: ventas, caja, cobros, stock y respaldo estan bajo control.';
        healthMetricsGrid.innerHTML = metrics.map(createHealthMetric).join('');
    };

    if (healthMetricsGrid) {
        healthMetricsGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.health-metric');
            if (!item) return;
            const action = item.dataset.action;
            if (action === 'sale') focusTransactionForm('income');
            if (action === 'close' && btnCloseRegister) btnCloseRegister.click();
            if (action === 'clients') switchView('nav-clientes');
            if (action === 'inventory') switchView('nav-inventario');
            if (action === 'config') switchView('nav-config', 'Configuracion de Empresa');
        });
    }

    const createDataQualityItem = ({ tone, icon, label, value, detail, action }) => `
        <button type="button" class="data-quality-item" data-tone="${tone}" data-action="${action}">
            <span class="data-quality-icon"><i class="fa-solid ${icon}"></i></span>
            <span class="data-quality-copy">
                <strong>${label}</strong>
                <em>${value}</em>
                <small>${detail}</small>
            </span>
        </button>
    `;

    const getQualityTone = (count, mediumAt = 1, dangerAt = 4) => {
        if (count >= dangerAt) return 'danger';
        if (count >= mediumAt) return 'warning';
        return 'success';
    };

    const updateDataQualityAuditor = () => {
        if (!dataQualityCard || !dataQualityBadge || !dataQualitySummary || !dataQualityGrid) return;

        const allData = [...historyData, ...sales];
        const incomes = allData.filter(s => s.type !== 'expense');
        const todayExpenses = sales.filter(s => s.type === 'expense');
        const salesWithoutClient = sales.filter(s => s.type !== 'expense' && (!s.customerName || !s.customerName.trim()));
        const uncategorized = allData.filter(s => !s.category || s.category === 'Sin categoria' || s.category === 'Sin categoría');
        const expensesWithoutNotes = todayExpenses.filter(s => !s.notes || !s.notes.trim());
        const productsWithoutStock = productCatalog.filter(p => p.stock === undefined || p.stock === null || p.stock === '');

        const totalChecks = Math.max(incomes.length + allData.length + todayExpenses.length + productCatalog.length, 1);
        const issues = salesWithoutClient.length + uncategorized.length + expensesWithoutNotes.length + productsWithoutStock.length;
        const score = Math.max(0, Math.round(100 - ((issues / totalChecks) * 100)));
        const tone = score >= 88 ? 'success' : score >= 68 ? 'warning' : 'danger';

        const items = [
            {
                tone: getQualityTone(salesWithoutClient.length, 1, 5),
                icon: 'fa-user-tag',
                label: 'Clientes',
                value: salesWithoutClient.length ? `${salesWithoutClient.length} sin nombre` : 'Completos',
                detail: salesWithoutClient.length ? 'Agrega cliente para mejorar seguimiento y ranking.' : 'Las ventas de hoy tienen cliente asociado.',
                action: 'history'
            },
            {
                tone: getQualityTone(uncategorized.length, 1, 8),
                icon: 'fa-tags',
                label: 'Categorias',
                value: uncategorized.length ? `${uncategorized.length} pendiente${uncategorized.length === 1 ? '' : 's'}` : 'Ordenadas',
                detail: uncategorized.length ? 'Clasifica movimientos para reportes mas claros.' : 'Los movimientos tienen categoria util.',
                action: 'history'
            },
            {
                tone: getQualityTone(expensesWithoutNotes.length, 1, 4),
                icon: 'fa-note-sticky',
                label: 'Gastos',
                value: expensesWithoutNotes.length ? `${expensesWithoutNotes.length} sin nota` : 'Explicados',
                detail: expensesWithoutNotes.length ? 'Anota motivo para entender cada salida.' : 'Los gastos de hoy tienen contexto.',
                action: 'expense'
            },
            {
                tone: getQualityTone(productsWithoutStock.length, 1, 6),
                icon: 'fa-box-open',
                label: 'Inventario',
                value: productsWithoutStock.length ? `${productsWithoutStock.length} sin stock` : 'Controlado',
                detail: productsWithoutStock.length ? 'Completa stock para activar alertas confiables.' : 'El catalogo tiene stock cargado.',
                action: 'inventory'
            }
        ];

        dataQualityCard.dataset.tone = tone;
        dataQualityBadge.textContent = `${score}% confiable`;
        dataQualitySummary.textContent = issues
            ? `${issues} dato${issues === 1 ? '' : 's'} incompleto${issues === 1 ? '' : 's'} pueden ensuciar reportes, cobros o stock.`
            : 'Los datos clave estan completos para tomar decisiones y cerrar el dia con confianza.';
        dataQualityGrid.innerHTML = items.map(createDataQualityItem).join('');
    };

    if (dataQualityGrid) {
        dataQualityGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.data-quality-item');
            if (!item) return;
            const action = item.dataset.action;
            if (action === 'history') switchView('nav-historial');
            if (action === 'inventory') switchView('nav-inventario');
            if (action === 'expense') focusTransactionForm('expense');
        });
    }

    const createActionItem = ({ tone = 'neutral', icon = 'fa-circle-info', title, detail, label, action }) => `
        <button type="button" class="action-center-item" data-action="${action}" data-tone="${tone}">
            <span class="action-center-icon"><i class="fa-solid ${icon}"></i></span>
            <span class="action-center-copy">
                <strong>${title}</strong>
                <small>${detail}</small>
            </span>
            <span class="action-center-cta">${label}<i class="fa-solid fa-arrow-right"></i></span>
        </button>
    `;

    const updateActionCenter = (totalRevenue = 0, totalExpenses = 0, totalSalesCount = 0, netBalance = 0) => {
        if (!actionCenterCard || !actionCenterList || !actionCenterBadge || !actionCenterSubtitle) return;

        const actions = [];
        const { debtClients, totalDebt, topDebtor } = buildClientSummary();
        const trackedStock = productCatalog.filter(p => p.stock !== undefined && p.stock !== null);
        const stockIssues = trackedStock.filter(p => Number(p.stock) <= 5);
        const lastBackupDate = localStorage.getItem('lastBackupDate');
        const daysSinceBackup = lastBackupDate
            ? Math.floor((Date.now() - new Date(lastBackupDate).getTime()) / 86400000)
            : Infinity;
        const progress = dailyGoal > 0 ? (totalRevenue / dailyGoal) * 100 : 0;
        const { overdue, dueToday } = getFollowUpStats();
        const recurringStats = getRecurringDueStats();

        if (netBalance < 0) {
            actions.push({
                tone: 'danger',
                icon: 'fa-triangle-exclamation',
                title: 'Caja en negativo',
                detail: `El balance va en ${formatCurrency(netBalance)}. Revisa gastos o base de caja antes del cierre.`,
                label: 'Revisar caja',
                action: 'close'
            });
        }

        if (overdue.length > 0) {
            actions.push({
                tone: 'danger',
                icon: 'fa-calendar-xmark',
                title: 'Seguimientos vencidos',
                detail: `${overdue.length} pendiente${overdue.length === 1 ? '' : 's'} ya pasaron la fecha limite.`,
                label: 'Ver agenda',
                action: 'followups'
            });
        } else if (dueToday.length > 0) {
            actions.push({
                tone: 'warning',
                icon: 'fa-calendar-day',
                title: 'Pendientes para hoy',
                detail: `${dueToday.length} seguimiento${dueToday.length === 1 ? '' : 's'} programado${dueToday.length === 1 ? '' : 's'} para hoy.`,
                label: 'Ver agenda',
                action: 'followups'
            });
        }

        if (recurringStats.due.length > 0) {
            actions.push({
                tone: 'warning',
                icon: 'fa-repeat',
                title: 'Gastos recurrentes vencidos',
                detail: `${recurringStats.due.length} gasto${recurringStats.due.length === 1 ? '' : 's'} fijo${recurringStats.due.length === 1 ? '' : 's'} listo${recurringStats.due.length === 1 ? '' : 's'} para registrar.`,
                label: 'Ver gastos',
                action: 'recurring'
            });
        }

        if (totalDebt > 0) {
            actions.push({
                tone: 'warning',
                icon: 'fa-hand-holding-dollar',
                title: 'Cobros pendientes',
                detail: `${debtClients.length} cliente${debtClients.length === 1 ? '' : 's'} deben ${formatCurrency(totalDebt)}${topDebtor ? `; prioridad: ${topDebtor}` : ''}.`,
                label: 'Ver clientes',
                action: 'clients'
            });
        }

        if (stockIssues.length > 0) {
            actions.push({
                tone: 'warning',
                icon: 'fa-box-open',
                title: 'Stock para revisar',
                detail: `${stockIssues.length} producto${stockIssues.length === 1 ? '' : 's'} con 5 unidades o menos.`,
                label: 'Ver stock',
                action: 'inventory'
            });
        }

        if (daysSinceBackup >= 7) {
            actions.push({
                tone: 'neutral',
                icon: 'fa-cloud-arrow-down',
                title: 'Backup recomendado',
                detail: lastBackupDate ? `Ultima copia hace ${daysSinceBackup} dias.` : 'Todavia no hay una copia de seguridad registrada.',
                label: 'Ir a backup',
                action: 'config'
            });
        }

        if (totalSalesCount === 0) {
            actions.push({
                tone: 'neutral',
                icon: 'fa-receipt',
                title: 'Primera venta pendiente',
                detail: 'Registra la primera venta para activar metricas, hora pico y productos rapidos.',
                label: 'Cargar venta',
                action: 'sale'
            });
        } else if (progress < 70) {
            actions.push({
                tone: 'neutral',
                icon: 'fa-bullseye',
                title: 'Meta aun lejos',
                detail: `Faltan ${formatCurrency(Math.max(dailyGoal - totalRevenue, 0))} para llegar a la meta diaria.`,
                label: 'Impulsar ventas',
                action: 'sale'
            });
        }

        if (actions.length === 0) {
            actionCenterCard.dataset.state = 'ok';
            actionCenterBadge.textContent = 'Todo al dia';
            actionCenterSubtitle.textContent = 'No hay alertas criticas. Mantente registrando operaciones para cerrar con datos claros.';
            actionCenterList.innerHTML = createActionItem({
                tone: 'success',
                icon: 'fa-circle-check',
                title: 'Operacion bajo control',
                detail: 'Caja, cobros, stock y respaldo no muestran urgencias en este momento.',
                label: 'Ver reportes',
                action: 'reports'
            });
            return;
        }

        actionCenterCard.dataset.state = actions.some(a => a.tone === 'danger') ? 'danger' : 'active';
        actionCenterBadge.textContent = `${actions.length} ${actions.length === 1 ? 'accion' : 'acciones'}`;
        actionCenterSubtitle.textContent = 'Prioriza lo que puede afectar caja, ventas o atencion antes del cierre.';
        actionCenterList.innerHTML = actions.slice(0, 5).map(createActionItem).join('');
    };

    if (actionCenterList) {
        actionCenterList.addEventListener('click', (e) => {
            const item = e.target.closest('.action-center-item');
            if (!item) return;
            const action = item.dataset.action;
            if (action === 'clients') switchView('nav-clientes');
            if (action === 'inventory') switchView('nav-inventario');
            if (action === 'reports') switchView('nav-reportes');
            if (action === 'config') switchView('nav-config', 'Configuracion de Empresa');
            if (action === 'close' && btnCloseRegister) btnCloseRegister.click();
            if (action === 'sale') focusTransactionForm('income');
            if (action === 'followups') {
                switchView('nav-dashboard');
                document.getElementById('followups-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            if (action === 'recurring') {
                switchView('nav-dashboard');
                document.getElementById('recurring-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    const saveDailyPlanDone = () => {
        localStorage.setItem(`dailyPlanDone_${new Date().toISOString().split('T')[0]}`, JSON.stringify(dailyPlanDone));
    };

    const runDailyPlanAction = (action) => {
        if (action === 'clients') switchView('nav-clientes');
        if (action === 'inventory') switchView('nav-inventario');
        if (action === 'reports') switchView('nav-reportes');
        if (action === 'config') switchView('nav-config', 'Configuracion de Empresa');
        if (action === 'close' && btnCloseRegister) btnCloseRegister.click();
        if (action === 'sale') focusTransactionForm('income');
        if (action === 'expense') focusTransactionForm('expense');
        if (action === 'notes') {
            switchView('nav-dashboard');
            const notepad = document.getElementById('day-notepad');
            if (notepad) {
                notepad.focus();
                notepad.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        if (action === 'followups') {
            switchView('nav-dashboard');
            document.getElementById('followups-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (action === 'recurring') {
            switchView('nav-dashboard');
            document.getElementById('recurring-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const createDailyPlanItem = ({ id, done, tone = 'neutral', icon, title, detail, action, label }) => {
        const isDone = done || Boolean(dailyPlanDone[id]);
        return `
            <div class="daily-plan-item" data-id="${id}" data-tone="${isDone ? 'success' : tone}" data-done="${isDone ? 'true' : 'false'}">
                <span class="daily-plan-icon"><i class="fa-solid ${isDone ? 'fa-circle-check' : icon}"></i></span>
                <span class="daily-plan-copy">
                    <strong>${title}</strong>
                    <small>${detail}</small>
                </span>
                <span class="daily-plan-actions">
                    ${action ? `<button type="button" class="btn-icon btn-daily-plan-action" data-action="${action}" title="${label}"><i class="fa-solid fa-arrow-right"></i></button>` : ''}
                    <button type="button" class="btn-icon btn-daily-plan-done" data-id="${id}" title="Marcar listo"><i class="fa-solid fa-check"></i></button>
                </span>
            </div>
        `;
    };

    const updateDailyPlan = (totalRevenue = 0, totalExpenses = 0, totalSalesCount = 0, netBalance = 0) => {
        if (!dailyPlanCard || !dailyPlanList || !dailyPlanBadge || !dailyPlanSubtitle || !dailyPlanProgressFill) return;

        const todayKey = new Date().toISOString().split('T')[0];
        const dayNotes = (localStorage.getItem(`notepad_${todayKey}`) || '').trim();
        const progress = dailyGoal > 0 ? (totalRevenue / dailyGoal) * 100 : 0;
        const cashSales = sales.filter(s => s.type !== 'expense' && s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
        const cashExpenses = sales.filter(s => s.type === 'expense' && s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
        const cashInRegister = cashBase + cashSales - cashExpenses;
        const { overdue, dueToday } = getFollowUpStats();
        const recurringStats = getRecurringDueStats();
        const trackedStock = productCatalog.filter(p => p.stock !== undefined && p.stock !== null);
        const stockIssues = trackedStock.filter(p => Number(p.stock) <= 5);
        const lastBackupDate = localStorage.getItem('lastBackupDate');
        const daysSinceBackup = lastBackupDate
            ? Math.floor((Date.now() - new Date(lastBackupDate).getTime()) / 86400000)
            : Infinity;

        const items = [
            {
                id: 'first-sale',
                done: totalSalesCount > 0,
                tone: 'neutral',
                icon: 'fa-receipt',
                title: totalSalesCount > 0 ? 'Ventas registradas' : 'Registrar primera venta',
                detail: totalSalesCount > 0 ? `${totalSalesCount} venta${totalSalesCount === 1 ? '' : 's'} cargada${totalSalesCount === 1 ? '' : 's'} hoy.` : 'Carga la primera operacion para activar metricas y reportes.',
                action: 'sale',
                label: 'Cargar venta'
            },
            {
                id: 'daily-goal',
                done: progress >= 100,
                tone: progress >= 70 ? 'warning' : 'neutral',
                icon: 'fa-bullseye',
                title: progress >= 100 ? 'Meta diaria alcanzada' : 'Impulsar meta diaria',
                detail: progress >= 100 ? `Superaste la meta de ${formatCurrency(dailyGoal)}.` : `Faltan ${formatCurrency(Math.max(dailyGoal - totalRevenue, 0))} para la meta.`,
                action: 'sale',
                label: 'Vender mas'
            },
            {
                id: 'cash-check',
                done: cashInRegister >= 0 && (cashBase > 0 || totalSalesCount > 0 || totalExpenses > 0),
                tone: cashInRegister < 0 ? 'danger' : 'neutral',
                icon: 'fa-cash-register',
                title: cashInRegister < 0 ? 'Revisar efectivo' : 'Caja bajo control',
                detail: `Efectivo estimado: ${formatCurrency(cashInRegister)}.`,
                action: 'close',
                label: 'Ver caja'
            },
            {
                id: 'followups',
                done: overdue.length === 0 && dueToday.length === 0,
                tone: overdue.length > 0 ? 'danger' : dueToday.length > 0 ? 'warning' : 'neutral',
                icon: 'fa-calendar-check',
                title: overdue.length > 0 ? 'Seguimientos vencidos' : dueToday.length > 0 ? 'Seguimientos de hoy' : 'Seguimientos al dia',
                detail: overdue.length > 0 ? `${overdue.length} vencido${overdue.length === 1 ? '' : 's'} para resolver.` : dueToday.length > 0 ? `${dueToday.length} pendiente${dueToday.length === 1 ? '' : 's'} para hoy.` : 'No hay seguimientos urgentes.',
                action: 'followups',
                label: 'Ver agenda'
            },
            {
                id: 'recurring',
                done: recurringStats.due.length === 0,
                tone: recurringStats.due.length > 0 ? 'warning' : 'neutral',
                icon: 'fa-repeat',
                title: recurringStats.due.length > 0 ? 'Registrar gastos fijos' : 'Gastos fijos al dia',
                detail: recurringStats.due.length > 0 ? `${recurringStats.due.length} gasto${recurringStats.due.length === 1 ? '' : 's'} recurrente${recurringStats.due.length === 1 ? '' : 's'} vencido${recurringStats.due.length === 1 ? '' : 's'}.` : 'No hay vencimientos recurrentes urgentes.',
                action: 'recurring',
                label: 'Ver gastos'
            },
            {
                id: 'stock',
                done: trackedStock.length > 0 && stockIssues.length === 0,
                tone: stockIssues.length > 0 ? 'warning' : 'neutral',
                icon: 'fa-boxes-stacked',
                title: stockIssues.length > 0 ? 'Revisar stock critico' : trackedStock.length > 0 ? 'Stock saludable' : 'Cargar stock clave',
                detail: stockIssues.length > 0 ? `${stockIssues.length} producto${stockIssues.length === 1 ? '' : 's'} con 5 unidades o menos.` : trackedStock.length > 0 ? `${trackedStock.length} producto${trackedStock.length === 1 ? '' : 's'} monitoreado${trackedStock.length === 1 ? '' : 's'}.` : 'Carga productos con stock para prevenir quiebres.',
                action: 'inventory',
                label: 'Ver inventario'
            },
            {
                id: 'notes',
                done: dayNotes.length > 0,
                tone: 'neutral',
                icon: 'fa-pen-clip',
                title: dayNotes.length > 0 ? 'Notas del dia guardadas' : 'Dejar nota de cierre',
                detail: dayNotes.length > 0 ? 'Hay contexto escrito para recordar decisiones del dia.' : 'Anota pendientes, incidencias o acuerdos antes de cerrar.',
                action: 'notes',
                label: 'Anotar'
            },
            {
                id: 'backup',
                done: daysSinceBackup <= 7,
                tone: daysSinceBackup === Infinity ? 'warning' : daysSinceBackup > 7 ? 'warning' : 'neutral',
                icon: 'fa-cloud-arrow-down',
                title: daysSinceBackup <= 7 ? 'Backup reciente' : 'Hacer backup',
                detail: daysSinceBackup === Infinity ? 'Todavia no hay copia de seguridad registrada.' : daysSinceBackup <= 7 ? `Ultima copia hace ${daysSinceBackup} dia${daysSinceBackup === 1 ? '' : 's'}.` : `Ultima copia hace ${daysSinceBackup} dias.`,
                action: 'config',
                label: 'Respaldar'
            }
        ];

        const completed = items.filter(item => item.done || dailyPlanDone[item.id]).length;
        dailyPlanBadge.textContent = `${completed}/${items.length} listo`;
        dailyPlanProgressFill.style.width = `${(completed / items.length) * 100}%`;
        dailyPlanCard.dataset.state = completed === items.length ? 'complete' : items.some(item => !item.done && item.tone === 'danger') ? 'danger' : 'active';
        dailyPlanSubtitle.textContent = completed === items.length
            ? 'Todo lo importante del dia esta cubierto.'
            : `${items.length - completed} punto${items.length - completed === 1 ? '' : 's'} pendiente${items.length - completed === 1 ? '' : 's'} para cerrar mejor.`;
        dailyPlanList.innerHTML = items.map(createDailyPlanItem).join('');
    };

    if (dailyPlanList) {
        dailyPlanList.addEventListener('click', (e) => {
            const doneBtn = e.target.closest('.btn-daily-plan-done');
            const actionBtn = e.target.closest('.btn-daily-plan-action');
            if (doneBtn) {
                const id = doneBtn.getAttribute('data-id');
                if (!id) return;
                dailyPlanDone[id] = true;
                saveDailyPlanDone();
                updateKPIs();
                showToast('Punto del plan marcado como listo');
                return;
            }
            if (actionBtn) {
                runDailyPlanAction(actionBtn.getAttribute('data-action'));
            }
        });
    }

    const formatDueRadarDate = (dateKey) => {
        if (!dateKey) return 'Sin fecha';
        const todayKey = new Date().toISOString().split('T')[0];
        if (dateKey < todayKey) return 'Vencido';
        if (dateKey === todayKey) return 'Hoy';
        const date = new Date(dateKey + 'T00:00:00');
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    };

    const buildDueRadarItems = () => {
        const todayKey = new Date().toISOString().split('T')[0];
        const maxDate = addDays(new Date(todayKey + 'T00:00:00'), 7);
        const followupItems = followUps
            .filter(item => !item.done)
            .filter(item => !item.dueDate || item.dueDate <= maxDate)
            .map(item => ({
                id: item.id,
                kind: 'followup',
                date: item.dueDate || todayKey,
                tone: item.dueDate && item.dueDate < todayKey ? 'danger' : item.dueDate === todayKey ? 'warning' : 'neutral',
                icon: followUpTypeIcon(item.type),
                title: item.title,
                meta: `${followUpTypeLabel(item.type)} · ${formatDueRadarDate(item.dueDate)}`,
                actionLabel: 'Listo'
            }));

        const recurringItems = recurringExpenses
            .filter(item => !item.archived)
            .filter(item => !item.nextDate || item.nextDate <= maxDate)
            .map(item => ({
                id: item.id,
                kind: 'recurring',
                date: item.nextDate || todayKey,
                tone: !item.nextDate || item.nextDate <= todayKey ? 'warning' : 'neutral',
                icon: 'fa-repeat',
                title: item.name,
                meta: `${formatCurrency(item.amount)} · ${recurringFrequencyLabel(item.frequency)} · ${formatDueRadarDate(item.nextDate)}`,
                actionLabel: 'Registrar'
            }));

        return [...followupItems, ...recurringItems]
            .sort((a, b) => {
                const toneWeight = { danger: 0, warning: 1, neutral: 2 };
                return (toneWeight[a.tone] - toneWeight[b.tone]) || String(a.date).localeCompare(String(b.date));
            });
    };

    const buildNotificationItems = () => {
        const items = [];
        const { debtClients, totalDebt } = buildClientSummary();
        const trackedStock = productCatalog.filter(product => product.stock !== undefined && product.stock !== null && product.stock !== '');
        const outOfStock = trackedStock.filter(product => Number(product.stock) <= 0);
        const lowStock = trackedStock.filter(product => Number(product.stock) > 0 && Number(product.stock) <= 5);
        const radarItems = buildDueRadarItems();
        const overdue = radarItems.filter(item => item.tone === 'danger');
        const dueNow = radarItems.filter(item => item.tone === 'warning');
        const lastBackupDate = localStorage.getItem('lastBackupDate');
        const daysSinceBackup = lastBackupDate
            ? Math.floor((Date.now() - new Date(lastBackupDate).getTime()) / 86400000)
            : Infinity;

        if (overdue.length) items.push({
            tone: 'danger', icon: 'fa-clock-rotate-left', action: 'agenda',
            title: `${overdue.length} pendiente${overdue.length === 1 ? '' : 's'} vencido${overdue.length === 1 ? '' : 's'}`,
            detail: 'Revisa seguimientos y gastos que ya pasaron su fecha.'
        });
        if (outOfStock.length) items.push({
            tone: 'danger', icon: 'fa-box-open', action: 'inventory',
            title: `${outOfStock.length} producto${outOfStock.length === 1 ? '' : 's'} sin stock`,
            detail: outOfStock.slice(0, 2).map(product => product.name).join(' - ')
        });
        if (debtClients.length) items.push({
            tone: debtClients.length >= 4 ? 'danger' : 'warning', icon: 'fa-hand-holding-dollar', action: 'clients',
            title: `${debtClients.length} cobro${debtClients.length === 1 ? '' : 's'} pendiente${debtClients.length === 1 ? '' : 's'}`,
            detail: `Saldo total por cobrar: ${formatCurrency(totalDebt)}.`
        });
        if (dueNow.length) items.push({
            tone: 'warning', icon: 'fa-calendar-day', action: 'agenda',
            title: `${dueNow.length} accion${dueNow.length === 1 ? '' : 'es'} para hoy`,
            detail: 'Completa la agenda antes del cierre de caja.'
        });
        if (lowStock.length) items.push({
            tone: 'warning', icon: 'fa-boxes-stacked', action: 'inventory',
            title: `${lowStock.length} producto${lowStock.length === 1 ? '' : 's'} con stock bajo`,
            detail: 'Quedan 5 unidades o menos; conviene planificar reposicion.'
        });
        if (daysSinceBackup >= 7) items.push({
            tone: 'warning', icon: 'fa-cloud-arrow-down', action: 'config',
            title: lastBackupDate ? 'Respaldo desactualizado' : 'Todavia no hay respaldo',
            detail: lastBackupDate ? `La ultima copia fue hace ${daysSinceBackup} dias.` : 'Guarda una copia para proteger la informacion del negocio.'
        });

        return items.slice(0, 6);
    };

    const closeNotificationCenter = () => {
        if (!notificationPanel || !notificationTrigger || !notificationCenter) return;
        notificationPanel.hidden = true;
        notificationTrigger.setAttribute('aria-expanded', 'false');
        notificationCenter.classList.remove('open');
    };

    const runNotificationAction = (action) => {
        closeNotificationCenter();
        if (action === 'clients') switchView('nav-clientes');
        if (action === 'inventory') switchView('nav-inventario');
        if (action === 'config') switchView('nav-config', 'Configuracion de Empresa');
        if (action === 'agenda') {
            switchView('nav-dashboard');
            document.getElementById('due-radar-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (action === 'plan') {
            switchView('nav-dashboard');
            document.getElementById('daily-plan-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const updateNotificationCenter = () => {
        if (!notificationList || !notificationCount || !notificationStatus || !notificationSummary) return;
        const items = buildNotificationItems();
        const urgentCount = items.filter(item => item.tone === 'danger').length;
        notificationCount.hidden = items.length === 0;
        notificationCount.textContent = items.length > 9 ? '9+' : String(items.length);
        notificationStatus.textContent = urgentCount
            ? `${urgentCount} urgente${urgentCount === 1 ? '' : 's'}`
            : items.length ? `${items.length} por revisar` : 'Todo al dia';
        notificationSummary.textContent = urgentCount
            ? 'Hay asuntos que conviene resolver antes de continuar con la operacion.'
            : items.length
                ? 'Estas son las proximas acciones recomendadas para mantener el negocio ordenado.'
                : 'Caja, cobros, stock, agenda y respaldo no muestran alertas.';
        notificationList.innerHTML = items.length
            ? items.map(item => `
                <button type="button" class="notification-item" data-tone="${item.tone}" data-action="${item.action}">
                    <span class="notification-item-icon"><i class="fa-solid ${item.icon}"></i></span>
                    <span class="notification-item-copy"><strong>${escapeSearchHtml(item.title)}</strong><small>${escapeSearchHtml(item.detail)}</small></span>
                    <i class="fa-solid fa-chevron-right"></i>
                </button>`).join('')
            : '<div class="notification-empty"><i class="fa-regular fa-circle-check"></i><strong>Operacion bajo control</strong><span>No hay prioridades urgentes ahora.</span></div>';
    };

    notificationTrigger?.addEventListener('click', () => {
        if (notificationPanel.hidden) {
            updateNotificationCenter();
            notificationPanel.hidden = false;
            notificationTrigger.setAttribute('aria-expanded', 'true');
            notificationCenter.classList.add('open');
        } else {
            closeNotificationCenter();
        }
    });

    notificationList?.addEventListener('click', event => {
        const item = event.target.closest('.notification-item[data-action]');
        if (item) runNotificationAction(item.dataset.action);
    });

    notificationReview?.addEventListener('click', () => runNotificationAction('plan'));

    document.addEventListener('click', event => {
        if (notificationCenter && !notificationCenter.contains(event.target)) closeNotificationCenter();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeNotificationCenter();
    });

    const createDueRadarItem = (item) => `
        <div class="due-radar-item" data-tone="${item.tone}" data-kind="${item.kind}" data-id="${item.id}">
            <span class="due-radar-icon"><i class="fa-solid ${item.icon}"></i></span>
            <span class="due-radar-copy">
                <strong>${item.title}</strong>
                <small>${item.meta}</small>
            </span>
            <button type="button" class="btn-icon due-radar-action" title="${item.actionLabel}">
                <i class="fa-solid ${item.kind === 'recurring' ? 'fa-cash-register' : 'fa-check'}"></i>
            </button>
        </div>
    `;

    const updateDueRadar = () => {
        if (!dueRadarCard || !dueRadarTimeline || !dueRadarEmpty || !dueRadarBadge || !dueRadarSummary) return;

        const items = buildDueRadarItems();
        const urgentCount = items.filter(item => item.tone === 'danger' || item.tone === 'warning').length;
        const dueTodayCount = items.filter(item => item.date === new Date().toISOString().split('T')[0]).length;
        dueRadarBadge.textContent = `${urgentCount} ${urgentCount === 1 ? 'urgente' : 'urgentes'}`;

        if (items.length === 0) {
            dueRadarCard.dataset.state = 'clear';
            dueRadarSummary.textContent = 'No hay vencimientos cercanos en los proximos 7 dias.';
            dueRadarTimeline.style.display = 'none';
            dueRadarEmpty.style.display = 'flex';
            return;
        }

        dueRadarCard.dataset.state = items.some(item => item.tone === 'danger') ? 'danger' : urgentCount > 0 ? 'warning' : 'active';
        dueRadarSummary.textContent = urgentCount > 0
            ? `${urgentCount} vencimiento${urgentCount === 1 ? '' : 's'} requiere${urgentCount === 1 ? '' : 'n'} accion.`
            : `${items.length} pendiente${items.length === 1 ? '' : 's'} proximo${items.length === 1 ? '' : 's'} bajo control.`;
        if (dueTodayCount > 0 && urgentCount > 0) {
            dueRadarSummary.textContent += ` ${dueTodayCount} para hoy.`;
        }

        dueRadarEmpty.style.display = 'none';
        dueRadarTimeline.style.display = 'grid';
        dueRadarTimeline.innerHTML = items.slice(0, 6).map(createDueRadarItem).join('');
    };

    dueRadarTimeline?.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.due-radar-action');
        const itemEl = e.target.closest('.due-radar-item');
        if (!itemEl) return;

        const kind = itemEl.dataset.kind;
        const id = parseInt(itemEl.dataset.id || '0');
        if (!id) return;

        if (!actionBtn) {
            switchView('nav-dashboard');
            document.getElementById(kind === 'recurring' ? 'recurring-card' : 'followups-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (kind === 'followup') {
            followUps = followUps.map(item => item.id === id ? { ...item, done: true, completedAt: Date.now() } : item);
            saveFollowUps();
            renderFollowUps();
            showToast('Seguimiento completado');
        }

        if (kind === 'recurring') {
            const item = recurringExpenses.find(expense => expense.id === id);
            if (item && registerRecurringExpense(item)) {
                recurringExpenses = recurringExpenses.map(expense => expense.id === id
                    ? { ...expense, nextDate: nextRecurringDate(expense.nextDate, expense.frequency), lastPreparedAt: Date.now() }
                    : expense
                );
                saveRecurringExpenses();
                renderRecurringExpenses();
            }
        }

        updateDueRadar();
        updateKPIs();
    });

    dueRadarAddFollowup?.addEventListener('click', () => {
        switchView('nav-dashboard');
        document.getElementById('followups-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => followupTitleInput?.focus(), 250);
    });

    dueRadarAddRecurring?.addEventListener('click', () => {
        switchView('nav-dashboard');
        document.getElementById('recurring-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => recurringNameInput?.focus(), 250);
    });

    const updateClosingForecast = (totalRevenue = 0, totalExpenses = 0, totalSalesCount = 0, netBalance = 0) => {
        if (!closingForecastCard || !closingForecastMain || !closingForecastProjected || !closingForecastGap || !closingForecastPace || !closingForecastBalance || !closingForecastAdvice || !closingForecastStatus || !closingForecastSubtitle) return;

        const now = new Date();
        const openingHour = 8;
        const currentHourValue = now.getHours() + (now.getMinutes() / 60);
        const selectedCloseHour = Number(closingHour) || 21;
        const elapsedHours = Math.max(currentHourValue - openingHour, 0.25);
        const remainingHours = Math.max(selectedCloseHour - currentHourValue, 0);
        const revenuePace = totalRevenue / elapsedHours;
        const projectedRevenue = remainingHours > 0
            ? totalRevenue + (revenuePace * remainingHours)
            : totalRevenue;
        const projectedExpenses = remainingHours > 0 && totalRevenue > 0
            ? totalExpenses + ((totalExpenses / elapsedHours) * remainingHours)
            : totalExpenses;
        const projectedBalance = projectedRevenue - projectedExpenses;
        const gap = Math.max(dailyGoal - totalRevenue, 0);
        const requiredPace = remainingHours > 0 ? gap / remainingHours : gap;
        const progress = dailyGoal > 0 ? (totalRevenue / dailyGoal) * 100 : 0;
        const projectedProgress = dailyGoal > 0 ? (projectedRevenue / dailyGoal) * 100 : 0;

        let tone = 'neutral';
        let label = 'Proyectado';
        let status = 'Carga movimientos para calcular el cierre.';
        let advice = 'Cuando registres ventas, Zaleasy estimara si llegas a la meta antes del cierre.';

        if (totalSalesCount === 0 && totalExpenses === 0) {
            tone = 'neutral';
            label = 'Sin ritmo todavia';
            status = 'Registra la primera venta o gasto para activar la proyeccion.';
            advice = 'Empieza con la primera operacion del dia; desde ahi el pronostico se ajusta solo.';
        } else if (progress >= 100) {
            tone = 'success';
            label = 'Meta lograda';
            status = `Ya alcanzaste el ${progress.toFixed(0)}% de la meta diaria.`;
            advice = 'Buen momento para cuidar margen, registrar notas y preparar un cierre ordenado.';
        } else if (remainingHours <= 0) {
            tone = gap > 0 ? 'danger' : 'success';
            label = 'Hora de cierre';
            status = gap > 0 ? `Faltaron ${formatCurrency(gap)} para la meta.` : 'Cierre con meta cubierta.';
            advice = gap > 0 ? 'Conviene cerrar caja, revisar pendientes y dejar planificada la recuperacion para manana.' : 'Puedes cerrar caja y guardar el resumen del dia.';
        } else if (projectedProgress >= 100) {
            tone = 'success';
            label = 'Llegas a meta';
            status = `A este ritmo cerrarias en ${projectedProgress.toFixed(0)}% de la meta.`;
            advice = `Manteniendo cerca de ${formatCurrency(revenuePace)}/h llegas antes de las ${selectedCloseHour}:00.`;
        } else if (requiredPace > revenuePace * 1.6 && totalSalesCount > 0) {
            tone = 'danger';
            label = 'Ritmo bajo';
            status = `Necesitas ${formatCurrency(requiredPace)}/h para recuperar la meta.`;
            advice = 'Activa productos rapidos, contacta clientes pendientes o registra una promocion puntual para la ultima franja.';
        } else {
            tone = 'warning';
            label = 'Ajustar ritmo';
            status = `Faltan ${formatCurrency(gap)} y quedan ${remainingHours.toFixed(1)} h.`;
            advice = `Para llegar, apunta a ${formatCurrency(requiredPace)}/h hasta las ${selectedCloseHour}:00.`;
        }

        closingForecastCard.dataset.tone = tone;
        closingForecastMain.dataset.tone = tone;
        closingForecastLabel.textContent = label;
        closingForecastProjected.textContent = formatCurrency(projectedRevenue);
        closingForecastStatus.textContent = status;
        closingForecastGap.textContent = formatCurrency(gap);
        closingForecastPace.textContent = `${formatCurrency(requiredPace)}/h`;
        closingForecastBalance.textContent = formatCurrency(projectedBalance);
        closingForecastBalance.style.color = projectedBalance < 0 ? 'var(--danger)' : '';
        closingForecastAdvice.textContent = advice;
        closingForecastSubtitle.textContent = `Cierre configurado a las ${selectedCloseHour}:00. Proyeccion basada en movimientos de hoy.`;
    };

    if (closingHourSelect) {
        closingHourSelect.value = String(closingHour);
        closingHourSelect.addEventListener('change', () => {
            closingHour = parseInt(closingHourSelect.value, 10) || 21;
            localStorage.setItem('closingHour', closingHour);
            updateKPIs();
            showToast(`Hora de cierre ajustada a las ${closingHour}:00`);
        });
    }

    closingForecastSale?.addEventListener('click', () => focusTransactionForm('income'));
    closingForecastExpense?.addEventListener('click', () => focusTransactionForm('expense'));
    closingForecastClose?.addEventListener('click', () => btnCloseRegister?.click());

    const updateStockAlertSnapshot = () => {
        if (!stockAlertCard || !stockAlertBadge || !stockAlertText || !stockAlertList) return;

        const tracked = productCatalog.filter(p => p.stock !== undefined && p.stock !== null);
        const outOfStock = tracked.filter(p => Number(p.stock) <= 0);
        const lowStock = tracked.filter(p => Number(p.stock) > 0 && Number(p.stock) <= 5);
        const attention = [...outOfStock, ...lowStock].sort((a, b) => Number(a.stock) - Number(b.stock));

        stockAlertList.innerHTML = '';

        if (tracked.length === 0) {
            stockAlertCard.dataset.state = 'empty';
            stockAlertBadge.textContent = 'Sin stock cargado';
            stockAlertText.textContent = 'Carga productos con stock para recibir alertas autom\u00e1ticas cuando vendes.';
            return;
        }

        if (attention.length === 0) {
            stockAlertCard.dataset.state = 'ok';
            stockAlertBadge.textContent = 'Stock saludable';
            stockAlertText.textContent = `${tracked.length} productos con stock monitoreado. No hay urgencias por ahora.`;
            return;
        }

        stockAlertCard.dataset.state = outOfStock.length > 0 ? 'danger' : 'warning';
        stockAlertBadge.textContent = `${attention.length} ${attention.length === 1 ? 'alerta' : 'alertas'}`;
        stockAlertText.textContent = outOfStock.length > 0
            ? `${outOfStock.length} producto${outOfStock.length === 1 ? '' : 's'} sin stock. Revisa antes de seguir vendiendo.`
            : `${lowStock.length} producto${lowStock.length === 1 ? '' : 's'} con 5 unidades o menos.`;

        attention.slice(0, 4).forEach(product => {
            const chip = document.createElement('span');
            chip.className = 'stock-alert-chip';
            chip.innerHTML = `<strong>${product.name}</strong><em>${Number(product.stock)} u.</em>`;
            stockAlertList.appendChild(chip);
        });
    };

    const updateSetupChecklist = () => {
        if (!setupChecklistCard || !setupChecklistBadge || !setupProgressFill || !setupChecklistSubtitle) return;

        const todayNote = localStorage.getItem(`notepad_${new Date().toISOString().split('T')[0]}`) || '';
        const steps = {
            store: storeName && storeName !== 'Zaleasy',
            goal: dailyGoal && dailyGoal !== 100,
            catalog: productCatalog.length > 0,
            cash: cashBase > 0 || todayNote.trim().length > 0,
            sale: sales.length > 0 || historyData.length > 0
        };

        const completed = Object.values(steps).filter(Boolean).length;
        const total = Object.keys(steps).length;
        setupChecklistBadge.textContent = `${completed}/${total} listo`;
        setupProgressFill.style.width = `${(completed / total) * 100}%`;
        setupChecklistCard.dataset.complete = completed === total ? 'true' : 'false';
        setupChecklistSubtitle.textContent = completed === total
            ? 'Configuraci\u00f3n base completa. Ya puedes usar el dashboard como tablero operativo diario.'
            : 'Completa lo esencial para que Zaleasy trabaje mejor con tus datos.';

        Object.entries(steps).forEach(([key, done]) => {
            const el = setupChecklistCard.querySelector(`.setup-step[data-step="${key}"]`);
            if (!el) return;
            el.classList.toggle('done', done);
            const icon = el.querySelector('i');
            if (icon) icon.className = `fa-solid ${done ? 'fa-circle-check' : setupStepIcon(key)}`;
        });
    };

    const setupStepIcon = (key) => ({
        store: 'fa-store',
        goal: 'fa-bullseye',
        catalog: 'fa-boxes-stacked',
        cash: 'fa-cash-register',
        sale: 'fa-receipt'
    }[key] || 'fa-circle');

    const updateReceivablesSnapshot = () => {
        if (!receivablesCard || !receivablesCount || !receivablesTotal || !receivablesDetail) return;

        const { clientMap, debtClients, totalDebt, topDebtor } = buildClientSummary();
        receivablesCard.dataset.state = totalDebt > 0 ? 'pending' : 'clear';
        receivablesTotal.textContent = formatCurrency(totalDebt);
        receivablesCount.textContent = `${debtClients.length} ${debtClients.length === 1 ? 'cliente' : 'clientes'}`;

        if (totalDebt <= 0) {
            receivablesDetail.textContent = 'Sin saldos pendientes registrados. Si vendes fiado, usa el m\u00e9todo "Fiado / Por Cobrar".';
            return;
        }

        const topDebt = clientMap[topDebtor]?.totalDeuda || 0;
        receivablesDetail.innerHTML = `<strong>${topDebtor}</strong> concentra ${formatCurrency(topDebt)} pendientes. Revisa el directorio para registrar el proximo cobro.`;
    };

    const setPulseAction = (button, icon, label, handler) => {
        if (!button) return;
        button.innerHTML = `<i class="fa-solid ${icon}"></i><span>${label}</span>`;
        button.onclick = handler;
    };

    const focusTransactionForm = (type = 'income') => {
        switchView('nav-dashboard');
        if (type === 'expense') {
            btnTypeExpense.click();
        } else {
            btnTypeIncome.click();
        }
        const firstItemInput = document.querySelector('.item-product-input');
        if (firstItemInput) {
            firstItemInput.focus();
            firstItemInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const updateDailyPulse = (totalRevenue, totalExpenses, totalSalesCount, netBalance) => {
        if (!dailyPulseCard || !dailyPulseBadge || !dailyPulseText || !dailyPulseIcon) return;

        const progress = dailyGoal > 0 ? (totalRevenue / dailyGoal) * 100 : 0;
        const expenseRatio = totalRevenue > 0 ? (totalExpenses / totalRevenue) * 100 : 0;
        const hour = new Date().getHours();
        const cashSales = sales
            .filter(s => s.type !== 'expense' && s.method === 'Efectivo')
            .reduce((sum, s) => sum + s.amount, 0);
        const cashExpenses = sales
            .filter(s => s.type === 'expense' && s.method === 'Efectivo')
            .reduce((sum, s) => sum + s.amount, 0);
        const cashInRegister = cashBase + cashSales - cashExpenses;

        let state = {
            tone: 'neutral',
            icon: 'fa-compass',
            badge: 'Listo para empezar',
            text: 'Registra tu primera venta o gasto para recibir una recomendaci&oacute;n concreta.'
        };

        if (totalSalesCount === 0 && totalExpenses === 0) {
            state = {
                tone: 'neutral',
                icon: 'fa-seedling',
                badge: 'D&iacute;a sin movimientos',
                text: 'Empieza registrando la primera operaci&oacute;n. Si ya tuviste gastos de apertura, cargarlos ahora te evita un cierre confuso.'
            };
        } else if (netBalance < 0) {
            state = {
                tone: 'danger',
                icon: 'fa-triangle-exclamation',
                badge: 'Balance negativo',
                text: `Los gastos superan a los ingresos por ${formatCurrency(Math.abs(netBalance))}. Revisa salidas grandes antes de seguir vendiendo sin margen claro.`
            };
        } else if (expenseRatio >= 45) {
            state = {
                tone: 'warning',
                icon: 'fa-scale-balanced',
                badge: 'Gastos altos',
                text: `Tus gastos equivalen al ${expenseRatio.toFixed(0)}% de los ingresos de hoy. Conviene pausar compras no urgentes o revisar precios.`
            };
        } else if (progress >= 100) {
            state = {
                tone: 'success',
                icon: 'fa-trophy',
                badge: 'Meta alcanzada',
                text: `Ya superaste la meta diaria. Buen momento para registrar notas del d&iacute;a y preparar el cierre con caja ordenada.`
            };
        } else if (progress >= 70) {
            state = {
                tone: 'success',
                icon: 'fa-bullseye',
                badge: 'Cerca de la meta',
                text: `Vas por el ${progress.toFixed(0)}% de la meta. Una venta de ${formatCurrency(Math.max(dailyGoal - totalRevenue, 0))} te deja en objetivo.`
            };
        } else if (hour >= 17 && progress < 50 && totalSalesCount > 0) {
            state = {
                tone: 'warning',
                icon: 'fa-clock',
                badge: 'Tarde con margen',
                text: `A esta hora llevas ${progress.toFixed(0)}% de la meta. Prueba contactar clientes pendientes o destacar tu producto m&aacute;s vendido.`
            };
        } else if (cashInRegister < 0) {
            state = {
                tone: 'danger',
                icon: 'fa-money-bill-wave',
                badge: 'Revisar efectivo',
                text: 'El efectivo calculado qued&oacute; por debajo de cero. Revisa base de caja, gastos en efectivo o movimientos cargados por error.'
            };
        } else {
            state = {
                tone: 'neutral',
                icon: 'fa-chart-line',
                badge: 'Ritmo saludable',
                text: `Llevas ${totalSalesCount} ${totalSalesCount === 1 ? 'venta' : 'ventas'} y un balance de ${formatCurrency(netBalance)}. Mant&eacute;n actualizado el registro para cerrar sin sorpresas.`
            };
        }

        dailyPulseCard.dataset.tone = state.tone;
        dailyPulseIcon.innerHTML = `<i class="fa-solid ${state.icon}"></i>`;
        dailyPulseBadge.textContent = state.badge;
        dailyPulseText.innerHTML = state.text;

        setPulseAction(pulseActionPrimary, 'fa-plus', 'Registrar venta', () => focusTransactionForm('income'));
        setPulseAction(pulseActionSecondary, state.tone === 'danger' ? 'fa-arrow-trend-down' : 'fa-pen-clip', state.tone === 'danger' ? 'Cargar gasto' : 'Anotar pendiente', () => {
            if (state.tone === 'danger') {
                focusTransactionForm('expense');
                return;
            }
            const notepad = document.getElementById('day-notepad');
            if (notepad) {
                notepad.focus();
                notepad.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
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

        const rangeFrom = historySearch.dataset.rangeFrom ? parseInt(historySearch.dataset.rangeFrom, 10) : 0;
        if (!dateQuery && rangeFrom) {
            filteredHistory = filteredHistory.filter(s => Number(s.timestamp) >= rangeFrom);
        }

        const typeQuery = historyTypeFilter ? historyTypeFilter.value : '';
        if (typeQuery === 'income') {
            filteredHistory = filteredHistory.filter(s => s.type !== 'expense');
        } else if (typeQuery === 'expense') {
            filteredHistory = filteredHistory.filter(s => s.type === 'expense');
        } else if (typeQuery === 'pending') {
            filteredHistory = filteredHistory.filter(s => s.method === 'A Cobrar');
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
    historyDateFilter.addEventListener('change', () => {
        delete historySearch.dataset.rangeFrom;
        if (historyQuickFilters) historyQuickFilters.querySelectorAll('.history-filter-chip').forEach(chip => chip.classList.remove('active'));
        renderHistory();
    });
    if (historyTypeFilter) historyTypeFilter.addEventListener('change', renderHistory);
    if (historyQuickFilters) {
        historyQuickFilters.addEventListener('click', (e) => {
            const btn = e.target.closest('.history-filter-chip');
            if (!btn) return;
            const range = btn.dataset.range;
            historyQuickFilters.querySelectorAll('.history-filter-chip').forEach(chip => chip.classList.remove('active'));
            btn.classList.add('active');

            if (range === 'clear') {
                historyDateFilter.value = '';
                if (historyTypeFilter) historyTypeFilter.value = '';
                historySearch.value = '';
                delete historySearch.dataset.rangeFrom;
                btn.classList.remove('active');
                renderHistory();
                return;
            }

            const now = new Date();
            const cutoff = new Date(now);
            if (range === 'today') {
                historyDateFilter.value = now.toISOString().split('T')[0];
            } else {
                cutoff.setDate(now.getDate() - (parseInt(range, 10) - 1));
                historyDateFilter.value = '';
                historySearch.dataset.rangeFrom = cutoff.getTime().toString();
            }

            if (range === 'today') {
                delete historySearch.dataset.rangeFrom;
            }
            renderHistory();
        });
    }

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

    if (copyExecutiveSummaryBtn) {
        copyExecutiveSummaryBtn.addEventListener('click', () => {
            const rows = [
                `Resumen ejecutivo de ${storeName || 'Zaleasy'}`,
                `Balance neto: ${document.getElementById('exec-net-balance')?.textContent || '$0.00'}`,
                `Metodo principal: ${document.getElementById('exec-top-method')?.textContent || 'Sin datos'}`,
                `Cliente clave: ${document.getElementById('exec-top-client')?.textContent || 'Sin datos'}`,
                `Riesgo operativo: ${document.getElementById('exec-risk-level')?.textContent || 'Bajo'}`,
                document.getElementById('executive-summary-text')?.textContent || ''
            ];
            const text = rows.filter(Boolean).join('\n');
            navigator.clipboard?.writeText(text)
                .then(() => showToast('Resumen ejecutivo copiado'))
                .catch(() => {
                    const area = document.createElement('textarea');
                    area.value = text;
                    document.body.appendChild(area);
                    area.select();
                    document.execCommand('copy');
                    document.body.removeChild(area);
                    showToast('Resumen ejecutivo copiado');
                });
        });
    }

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

    const btnGenerateQuote = document.getElementById('btn-generate-quote');
    if (btnGenerateQuote) {
        btnGenerateQuote.addEventListener('click', () => {
            const itemRows = document.querySelectorAll('.item-row');
            const method = methodSelect.value;
            const notes = notesInput ? notesInput.value.trim() : '';
            const customerName = customerNameInput ? customerNameInput.value.trim() : '';
            const itemsToAdd = [];
            let hasError = false;

            itemRows.forEach((row) => {
                const prodEl = row.querySelector('.item-product-input');
                const amtEl = row.querySelector('.item-amount-input');
                const product = prodEl ? prodEl.value.trim() : '';
                const amount = amtEl ? parseFloat(amtEl.value) : NaN;

                if (!product || isNaN(amount) || amount <= 0) {
                    prodEl && (prodEl.style.borderColor = 'var(--danger)');
                    amtEl && (amtEl.style.borderColor = 'var(--danger)');
                    hasError = true;
                    return;
                }
                prodEl && (prodEl.style.borderColor = '');
                amtEl && (amtEl.style.borderColor = '');
                itemsToAdd.push({ product, amount });
            });

            if (hasError || itemsToAdd.length === 0) {
                showToast('\u26a0\ufe0f Revis\u00e1 los \u00edtems para generar el presupuesto.');
                return;
            }

            const fakeGroupId = 'QUOTE-' + Date.now();
            const fakeSales = itemsToAdd.map((it, idx) => ({
                id: fakeGroupId + '-' + idx,
                timestamp: Date.now(),
                product: it.product,
                amount: it.amount,
                method: method,
                type: 'income',
                notes: notes,
                customerName: customerName,
                groupId: fakeGroupId,
                isQuote: true
            }));

            openReceiptModal(fakeSales[0], fakeSales);
        });
    }

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

            if (currentTransactionType === 'income') {
                const catalogIdx = productCatalog.findIndex(p => p.name.toLowerCase() === item.product.toLowerCase());
                if (catalogIdx !== -1 && productCatalog[catalogIdx].stock !== undefined && productCatalog[catalogIdx].stock !== null) {
                    productCatalog[catalogIdx].stock = Math.max(0, productCatalog[catalogIdx].stock - 1);
                    localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
                    // Update inventario view in background if active
                    if (document.getElementById('view-inventario').style.display === 'block') {
                        renderInventario();
                    }
                    updateStockAlertSnapshot();
                }
            }

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

        // Refresh activity feed
        updateActivityFeed();

        // Fire milestone & week-comparison check
        document.dispatchEvent(new CustomEvent('zaleasy:sale-registered'));

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
                    updateKPIs();
                    updateSetupChecklist();
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

    const openReceiptModal = (sale, customGroupItems = null) => {
        currentReceiptSale = sale;

        let groupItems = customGroupItems;
        if (!groupItems) {
            const allData = [...sales, ...historyData];
            groupItems = sale.groupId
                ? allData.filter(s => s.groupId === sale.groupId)
                : [sale];
            groupItems.sort((a, b) => a.id - b.id);
        }
        currentReceiptGroup = groupItems;

        const repr = groupItems[0]; // use first item for date/method reference
        const d = new Date(repr.timestamp);
        const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const isExpense = repr.type === 'expense';
        const amountColor = repr.isQuote ? 'var(--primary)' : (isExpense ? '#d63031' : '#00b894');
        const typeLabel = repr.isQuote ? 'Presupuesto' : (isExpense ? 'Gasto' : 'Ingreso / Venta');
        const totalAmount = groupItems.reduce((sum, s) => sum + s.amount, 0);
        const sign = isExpense && !repr.isQuote ? '-' : '+';
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
                Generado por ${storeName} • ${repr.isQuote ? 'Presupuesto V\u00e1lido 15 D\u00edas' : 'Comprobante'} #${repr.id.toString().slice(-6)}
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
    <title>${repr.isQuote ? 'Presupuesto' : 'Recibo'} - ${storeName}</title>
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
            <div class="receipt-type">${repr.isQuote ? 'Presupuesto V\u00e1lido por 15 d\u00edas' : 'Comprobante de Transacci\u00f3n'}${isMulti ? ` · ${groupItems.length} \u00edtems` : ''}</div>
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
            Generado por ${storeName} &bull; ${repr.isQuote ? 'Presupuesto' : 'Comprobante'} #${repr.id.toString().slice(-6)}
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

            const copySummary = () => navigator.clipboard.writeText(text)
                .then(() => showToast('Resumen copiado al portapapeles'))
                .catch(() => showToast('No se pudo compartir el resumen'));

            if (navigator.share) {
                navigator.share({
                    title: `Resumen de Ventas - ${dateStr}`,
                    text: text
                }).catch(err => {
                    console.warn('Share error:', err);
                    copySummary();
                });
            } else {
                copySummary();
            }
        });
    }

    let lastCashExpected = 0;

    const updateCashReconciliation = () => {
        if (!cashExpectedDisplay || !cashCountedInput || !cashDifferenceDisplay || !cashReconciliationStatus || !cashReconciliationNote) return;

        const countedRaw = cashCountedInput.value;
        const hasCounted = countedRaw !== '';
        const counted = parseFloat(countedRaw) || 0;
        const diff = counted - lastCashExpected;

        cashExpectedDisplay.textContent = formatCurrency(lastCashExpected);
        cashDifferenceDisplay.textContent = hasCounted ? formatCurrency(diff) : '$0.00';
        cashDifferenceDisplay.style.color = !hasCounted
            ? 'var(--text-muted)'
            : Math.abs(diff) < 0.01
                ? 'var(--success)'
                : diff > 0
                    ? 'var(--warning)'
                    : 'var(--danger)';

        if (!hasCounted) {
            cashReconciliationStatus.textContent = 'Sin contar';
            cashReconciliationStatus.style.background = 'var(--primary-light)';
            cashReconciliationStatus.style.color = 'var(--primary)';
            cashReconciliationNote.textContent = 'Ingresa el efectivo contado para detectar sobrantes o faltantes.';
            return;
        }

        if (Math.abs(diff) < 0.01) {
            cashReconciliationStatus.textContent = 'Caja correcta';
            cashReconciliationStatus.style.background = 'var(--success-light)';
            cashReconciliationStatus.style.color = 'var(--success)';
            cashReconciliationNote.textContent = 'El efectivo contado coincide con el efectivo esperado.';
        } else if (diff > 0) {
            cashReconciliationStatus.textContent = 'Sobrante';
            cashReconciliationStatus.style.background = 'var(--warning-light)';
            cashReconciliationStatus.style.color = 'var(--warning)';
            cashReconciliationNote.textContent = `Hay un sobrante de ${formatCurrency(diff)}. Revisa ventas no cargadas o base de caja.`;
        } else {
            cashReconciliationStatus.textContent = 'Faltante';
            cashReconciliationStatus.style.background = 'var(--danger-light)';
            cashReconciliationStatus.style.color = 'var(--danger)';
            cashReconciliationNote.textContent = `Falta ${formatCurrency(Math.abs(diff))}. Revisa gastos en efectivo, vuelto o movimientos eliminados.`;
        }
    };

    if (cashCountedInput) {
        cashCountedInput.addEventListener('input', updateCashReconciliation);
    }

    // --- Close Register Logic ---
    btnCloseRegister.addEventListener('click', () => {
        if (sales.length === 0) {
            alert('No hay movimientos registrados para hacer un cierre de caja.');
            return;
        }

        const incomeMap = {};
        let totalIncome = 0;
        let totalExpense = 0;

        sales.forEach(s => {
            if (s.type === 'expense') {
                totalExpense += s.amount;
            } else {
                if (!incomeMap[s.method]) incomeMap[s.method] = 0;
                incomeMap[s.method] += s.amount;
                totalIncome += s.amount;
            }
        });

        // Calculate total cash expenses to show final cash
        const cashExpenses = sales.filter(s => s.type === 'expense' && s.method === 'Efectivo').reduce((sum, s) => sum + s.amount, 0);
        const cashFinal = cashBase + (incomeMap['Efectivo'] || 0) - cashExpenses;
        lastCashExpected = cashFinal;
        if (cashCountedInput) cashCountedInput.value = '';
        updateCashReconciliation();

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
        renderCloseReadiness({ totalIncome, totalExpense, cashFinal });

        closeRegisterModal.classList.add('active');
    });

    const renderCloseReadiness = ({ totalIncome, totalExpense, cashFinal }) => {
        if (!closeReadinessPanel) return;

        const pendingCredit = sales.filter(s => s.type !== 'expense' && s.method === 'A Cobrar');
        const expensesWithoutNotes = sales.filter(s => s.type === 'expense' && (!s.notes || !s.notes.trim()));
        const lowStock = productCatalog.filter(p => p.stock !== undefined && p.stock !== null && Number(p.stock) <= 5);
        const todayNotes = localStorage.getItem(`dayNotes_${new Date().toISOString().split('T')[0]}`) || '';

        const checks = [
            {
                ok: totalIncome > 0,
                label: totalIncome > 0 ? 'Ingresos registrados' : 'Sin ingresos en el cierre',
                detail: totalIncome > 0 ? `${formatCurrency(totalIncome)} en ingresos.` : 'Revisa si corresponde cerrar un dia sin ventas.'
            },
            {
                ok: pendingCredit.length === 0,
                label: pendingCredit.length === 0 ? 'Sin fiados pendientes de hoy' : `${pendingCredit.length} fiado${pendingCredit.length === 1 ? '' : 's'} pendiente${pendingCredit.length === 1 ? '' : 's'}`,
                detail: pendingCredit.length === 0 ? 'No hay ventas marcadas como Por Cobrar.' : 'Conviene revisar clientes antes de archivar el dia.'
            },
            {
                ok: expensesWithoutNotes.length === 0,
                label: expensesWithoutNotes.length === 0 ? 'Gastos documentados' : `${expensesWithoutNotes.length} gasto${expensesWithoutNotes.length === 1 ? '' : 's'} sin nota`,
                detail: expensesWithoutNotes.length === 0 ? 'Los gastos tienen mejor trazabilidad.' : 'Agrega una nota si necesitas recordar el motivo.'
            },
            {
                ok: lowStock.length === 0,
                label: lowStock.length === 0 ? 'Stock sin alertas criticas' : `${lowStock.length} producto${lowStock.length === 1 ? '' : 's'} con stock bajo`,
                detail: lowStock.length === 0 ? 'No hay productos cargados con 5 unidades o menos.' : 'Revisa inventario para evitar ventas sin disponibilidad.'
            },
            {
                ok: todayNotes.trim().length > 0 || totalExpense === 0,
                label: todayNotes.trim().length > 0 ? 'Notas del dia guardadas' : 'Sin notas del dia',
                detail: todayNotes.trim().length > 0 ? 'Hay contexto guardado para revisar manana.' : 'Si hubo incidencias, anotalas antes de cerrar.'
            }
        ];

        const okCount = checks.filter(c => c.ok).length;
        closeReadinessPanel.innerHTML = `
            <div class="close-readiness-head">
                <div>
                    <h3><i class="fa-solid fa-clipboard-check"></i> Revisi&oacute;n antes de cerrar</h3>
                    <p>${okCount}/${checks.length} puntos listos. Efectivo final estimado: <strong>${formatCurrency(cashFinal)}</strong></p>
                </div>
                <span class="badge">${okCount === checks.length ? 'Listo' : 'Revisar'}</span>
            </div>
            <div class="close-readiness-list">
                ${checks.map(check => `
                    <div class="close-readiness-item ${check.ok ? 'ok' : 'warn'}">
                        <i class="fa-solid ${check.ok ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
                        <div>
                            <strong>${check.label}</strong>
                            <span>${check.detail}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    };

    btnConfirmClose.addEventListener('click', () => {
        if (cashCountedInput && cashCountedInput.value !== '') {
            const counted = parseFloat(cashCountedInput.value) || 0;
            const diff = counted - lastCashExpected;
            const todayKey = `dayNotes_${new Date().toISOString().split('T')[0]}`;
            const previousNotes = localStorage.getItem(todayKey) || '';
            const line = `Conciliacion de caja: esperado ${formatCurrency(lastCashExpected)}, contado ${formatCurrency(counted)}, diferencia ${formatCurrency(diff)}.`;
            localStorage.setItem(todayKey, `${previousNotes}${previousNotes ? '\n' : ''}${line}`);
        }

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
        if (cashCountedInput) cashCountedInput.value = '';
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
        }

        datalist.innerHTML = '';
        const validCatalogNames = productCatalog.map(p => p.name).filter(n => n);
        const allNames = new Set([...validCatalogNames, ...recentProducts]);
        
        allNames.forEach(prod => {
            if (prod && String(prod).trim() !== '') {
                const option = document.createElement('option');
                option.value = prod;
                datalist.appendChild(option);
            }
        });

        document.querySelectorAll('.item-product-input').forEach(inp => {
            inp.setAttribute('list', 'products-datalist');
            if (!inp.dataset.autofillHooked) {
                inp.addEventListener('input', (e) => {
                    const matchedProd = productCatalog.find(p => (p.name || '').toLowerCase() === (e.target.value || '').toLowerCase());
                    if (matchedProd && matchedProd.price > 0) {
                        const row = e.target.closest('.item-row');
                        if (row) {
                            const amtInput = row.querySelector('.item-amount-input');
                            if (amtInput && (!amtInput.value || parseFloat(amtInput.value) === 0)) {
                                amtInput.value = matchedProd.price.toFixed(2);
                                amtInput.dispatchEvent(new Event('input', { bubbles: true }));
                                // Small visual pop
                                amtInput.style.backgroundColor = 'var(--primary-light)';
                                setTimeout(() => amtInput.style.backgroundColor = '', 400);
                            }
                        }
                    }
                });
                inp.dataset.autofillHooked = "true";
            }
        });
    };

    // --- Inventario / Catálogo Logic ---
    const renderInventario = () => {
        const tbody = document.getElementById('inventario-body');
        const emptyState = document.getElementById('inventario-empty-state');
        const searchInput = document.getElementById('search-inventario');
        const tableContainer = document.getElementById('inventario-table-container');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (productCatalog.length === 0) {
            emptyState.classList.add('active');
            tableContainer.style.display = 'none';
        } else {
            emptyState.classList.remove('active');
            tableContainer.style.display = 'block';
            
            const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
            const filtered = productCatalog.filter(p => (p.name || '').toLowerCase().includes(query));
            
            // Sort alphabetically by default
            filtered.sort((a,b) => (a.name || '').localeCompare(b.name || '')).forEach(prod => {
                const tr = document.createElement('tr');
                const stockHtml = prod.stock !== undefined && prod.stock !== null 
                    ? `<span class="badge" style="background:${prod.stock > 5 ? 'var(--primary-light)' : 'rgba(232, 67, 147, 0.15)'}; color:${prod.stock > 5 ? 'var(--primary)' : 'var(--danger)'};">${prod.stock} u.</span>` 
                    : `<span style="color:var(--text-muted); font-size:0.85rem;">—</span>`;

                tr.innerHTML = `
                    <td><strong>${prod.name}</strong></td>
                    <td style="color:var(--success); font-weight:bold;">${prod.price > 0 ? formatCurrency(prod.price) : '<span style="color:var(--text-muted); font-size:0.85rem; font-weight:normal;">Sin precio fijo</span>'}</td>
                    <td>${stockHtml}</td>
                    <td style="text-align:right;">
                        <button class="btn-icon btn-edit-inv" data-id="${prod.id}" title="Editar producto" style="color: var(--warning); opacity: 0.9; margin-right:4px;">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="btn-icon btn-delete-inv" data-id="${prod.id}" title="Eliminar del Catálogo" style="color: var(--danger); opacity: 0.8;">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.querySelectorAll('.btn-edit-inv').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idToEdit = parseInt(e.currentTarget.getAttribute('data-id'));
                    const prod = productCatalog.find(p => p.id === idToEdit);
                    if (!prod || !newProductForm) return;
                    editingProductId = idToEdit;
                    newProductForm.style.display = 'block';
                    document.getElementById('inv-name').value = prod.name || '';
                    document.getElementById('inv-price').value = prod.price || '';
                    document.getElementById('inv-stock').value = prod.stock !== undefined && prod.stock !== null ? prod.stock : '';
                    if (btnSaveInvProd) btnSaveInvProd.innerHTML = '<i class="fa-solid fa-check"></i> Guardar Cambios';
                    document.getElementById('inv-name').focus();
                    newProductForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
            });
            
            // Delete bindings
            document.querySelectorAll('.btn-delete-inv').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const idToRemove = parseInt(e.currentTarget.getAttribute('data-id'));
                    if(confirm('¿Eliminar este producto del catálogo?')) {
                        productCatalog = productCatalog.filter(p => p.id !== idToRemove);
                        localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
                        renderInventario();
                        updateStockAlertSnapshot();
                        updateDataHealthPanel();
                        updateSetupChecklist();
                        updateKPIs();
                        setupAutocomplete(); // Update datalist and Autofill potential
                    }
                });
            });
        }
    };

    const btnNewProduct = document.getElementById('btn-new-product');
    const newProductForm = document.getElementById('new-product-form');
    const btnCancelInvProd = document.getElementById('btn-cancel-inv-product');
    const btnSaveInvProd = document.getElementById('btn-save-inv-product');
    const searchInventario = document.getElementById('search-inventario');
    let editingProductId = null;

    if (exportInventarioCsvBtn) {
        exportInventarioCsvBtn.addEventListener('click', () => {
            if (productCatalog.length === 0) {
                showToast('No hay productos para exportar');
                return;
            }
            let csvContent = "Producto,Precio Base,Stock Disponible,Estado\n";
            productCatalog
                .slice()
                .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                .forEach(prod => {
                    const stock = prod.stock !== undefined && prod.stock !== null ? Number(prod.stock) : '';
                    const status = stock === '' ? 'Sin stock cargado' : stock <= 0 ? 'Sin stock' : stock <= 5 ? 'Stock bajo' : 'Stock saludable';
                    const name = `"${String(prod.name || '').replace(/"/g, '""')}"`;
                    csvContent += `${name},${Number(prod.price || 0).toFixed(2)},${stock},${status}\n`;
                });
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `inventario_zaleasy_${new Date().toISOString().split('T')[0]}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            showToast('Inventario exportado a CSV');
        });
    }
    
    if (btnNewProduct && newProductForm) {
        btnNewProduct.addEventListener('click', () => {
            editingProductId = null;
            newProductForm.style.display = 'block';
            document.getElementById('inv-name').value = '';
            document.getElementById('inv-price').value = '';
            document.getElementById('inv-stock').value = '';
            if (btnSaveInvProd) btnSaveInvProd.innerHTML = '<i class="fa-solid fa-check"></i> Guardar Producto';
            document.getElementById('inv-name').focus();
        });
        
        btnCancelInvProd.addEventListener('click', () => {
            editingProductId = null;
            newProductForm.style.display = 'none';
            if (btnSaveInvProd) btnSaveInvProd.innerHTML = '<i class="fa-solid fa-check"></i> Guardar Producto';
        });
        
        btnSaveInvProd.addEventListener('click', () => {
            const nameEl = document.getElementById('inv-name');
            const priceEl = document.getElementById('inv-price');
            const stockEl = document.getElementById('inv-stock');
            const name = nameEl.value.trim();
            const price = parseFloat(priceEl.value) || 0;
            const stockVal = stockEl && stockEl.value.trim() !== '' ? parseInt(stockEl.value) : null;
            
            if (!name) {
                nameEl.style.borderColor = 'var(--danger)';
                return;
            }
            nameEl.style.borderColor = '';

            const duplicate = productCatalog.find(p =>
                p.id !== editingProductId &&
                (p.name || '').toLowerCase() === name.toLowerCase()
            );
            if (duplicate) {
                showToast('Ya existe un producto con ese nombre.');
                return;
            }
            
            const wasEditing = Boolean(editingProductId);
            if (wasEditing) {
                productCatalog = productCatalog.map(p => p.id === editingProductId
                    ? { ...p, name, price, stock: stockVal }
                    : p
                );
            } else {
                productCatalog.push({
                    id: Date.now(),
                    name: name,
                    price: price,
                    stock: stockVal
                });
            }
            localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
            
            nameEl.value = '';
            priceEl.value = '';
            if (stockEl) stockEl.value = '';
            editingProductId = null;
            newProductForm.style.display = 'none';
            if (btnSaveInvProd) btnSaveInvProd.innerHTML = '<i class="fa-solid fa-check"></i> Guardar Producto';
            
            renderInventario();
            updateStockAlertSnapshot();
            updateDataHealthPanel();
            updateSetupChecklist();
            updateKPIs();
            setupAutocomplete(); // refresh autofill globally
            showToast(wasEditing ? 'Producto actualizado.' : 'Producto agregado al catálogo!');
        });
        
        if (searchInventario) {
            searchInventario.addEventListener('input', renderInventario);
        }
    }

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
                        if (data.brandColor) {
                            brandColor = data.brandColor;
                            localStorage.setItem('brandColor', brandColor);
                            applyBrandColor(brandColor);
                        }
                        if (data.alertThreshold !== undefined) {
                            alertThreshold = parseFloat(data.alertThreshold) || 0;
                            localStorage.setItem('alertThreshold', alertThreshold);
                        }
                        if (data.cashBase !== undefined) {
                            cashBase = parseFloat(data.cashBase) || 0;
                            localStorage.setItem('cashBase', cashBase);
                        }
                        if (data.recentProducts) {
                            recentProducts = data.recentProducts;
                            localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
                            setupAutocomplete();
                        }
                        if (data.productCatalog) {
                            const currentProductNames = new Set(productCatalog.map(p => (p.name || '').toLowerCase()));
                            const newProducts = data.productCatalog.filter(p => p && p.name && !currentProductNames.has(p.name.toLowerCase()));
                            productCatalog = [...productCatalog, ...newProducts];
                            localStorage.setItem('productCatalog', JSON.stringify(productCatalog));
                            renderInventario();
                            setupAutocomplete();
                        }
                        if (data.followUps) {
                            const currentFollowUpIds = new Set(followUps.map(item => item.id));
                            const newFollowUps = data.followUps.filter(item => item && item.title && !currentFollowUpIds.has(item.id));
                            followUps = [...followUps, ...newFollowUps];
                            saveFollowUps();
                            renderFollowUps();
                        }
                        if (data.recurringExpenses) {
                            const currentRecurringIds = new Set(recurringExpenses.map(item => item.id));
                            const newRecurring = data.recurringExpenses.filter(item => item && item.name && !currentRecurringIds.has(item.id));
                            recurringExpenses = [...recurringExpenses, ...newRecurring];
                            saveRecurringExpenses();
                            renderRecurringExpenses();
                        }
                        if (data.dailyPlanDone && typeof data.dailyPlanDone === 'object') {
                            dailyPlanDone = { ...dailyPlanDone, ...data.dailyPlanDone };
                            saveDailyPlanDone();
                        }
                        if (data.closingHour !== undefined) {
                            closingHour = parseInt(data.closingHour, 10) || 21;
                            localStorage.setItem('closingHour', closingHour);
                            if (closingHourSelect) closingHourSelect.value = String(closingHour);
                        }
                        if (data.marginSimulator && typeof data.marginSimulator === 'object') {
                            marginSimulator = { ...marginSimulator, ...data.marginSimulator };
                            localStorage.setItem('marginSimulator', JSON.stringify(marginSimulator));
                        }

                        renderSales();
                        updateKPIs();
                        setupStreakWidget();
                        updateDataHealthPanel();
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

    // =====================================================
    // FEATURE 1: Week vs Last Week Comparison Widget
    // =====================================================
    const updateWeekVsLastWeek = () => {
        const allData = [...historyData, ...sales];
        const incomes = allData.filter(s => s.type !== 'expense');

        const now = new Date();
        const today = now.getDay(); // 0=Sun, 1=Mon...
        const startOfThisWeek = new Date(now);
        startOfThisWeek.setDate(now.getDate() - today);
        startOfThisWeek.setHours(0, 0, 0, 0);

        const startOfLastWeek = new Date(startOfThisWeek);
        startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
        const endOfLastWeek = new Date(startOfThisWeek);
        endOfLastWeek.setMilliseconds(-1);

        const thisWeekTotal = incomes
            .filter(s => s.timestamp >= startOfThisWeek.getTime())
            .reduce((sum, s) => sum + s.amount, 0);

        const lastWeekTotal = incomes
            .filter(s => s.timestamp >= startOfLastWeek.getTime() && s.timestamp <= endOfLastWeek.getTime())
            .reduce((sum, s) => sum + s.amount, 0);

        const thisWeekEl = document.getElementById('wvw-this-week');
        const lastWeekEl = document.getElementById('wvw-last-week');
        const trendIcon = document.getElementById('wvw-trend-icon');
        const diffText = document.getElementById('wvw-diff-text');
        const pctLabel = document.getElementById('wvw-pct-label');
        const progressBar = document.getElementById('wvw-progress-bar');
        const statusBadge = document.getElementById('wvw-status-badge');

        if (!thisWeekEl) return;

        thisWeekEl.textContent = formatCurrency(thisWeekTotal);
        lastWeekEl.textContent = formatCurrency(lastWeekTotal);

        const diff = thisWeekTotal - lastWeekTotal;
        const pct = lastWeekTotal > 0 ? Math.abs(diff / lastWeekTotal * 100).toFixed(1) : (thisWeekTotal > 0 ? 100 : 0);

        // Progress bar: how much of last week has been matched
        const barWidth = lastWeekTotal > 0 ? Math.min((thisWeekTotal / lastWeekTotal) * 100, 100) : (thisWeekTotal > 0 ? 100 : 0);

        setTimeout(() => {
            progressBar.style.width = barWidth + '%';
        }, 400);
        pctLabel.textContent = Math.round(barWidth) + '%';

        if (diff > 0) {
            trendIcon.textContent = '📈';
            diffText.textContent = `+${pct}% vs semana pasada`;
            diffText.style.color = 'var(--success)';
            progressBar.style.background = 'var(--success)';
            statusBadge.textContent = '✅ Vas mejor';
            statusBadge.style.background = 'rgba(46,213,115,0.15)';
            statusBadge.style.color = 'var(--success)';
        } else if (diff < 0) {
            trendIcon.textContent = '📉';
            diffText.textContent = `-${pct}% vs semana pasada`;
            diffText.style.color = 'var(--danger)';
            progressBar.style.background = 'var(--danger)';
            statusBadge.textContent = '⚡ Remontá esta semana';
            statusBadge.style.background = 'rgba(232,67,147,0.15)';
            statusBadge.style.color = 'var(--danger)';
        } else {
            trendIcon.textContent = '↔️';
            diffText.textContent = 'Sin cambios';
            diffText.style.color = 'var(--text-muted)';
            statusBadge.textContent = 'Igual que antes';
        }
    };

    // =====================================================
    // FEATURE 2: Milestone Celebration System (Confetti + Toast)
    // =====================================================
    const initMilestoneCelebrations = () => {
        // Inject confetti canvas (hidden by default)
        if (document.getElementById('confetti-canvas')) return;
        const canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;display:none;';
        document.body.appendChild(canvas);
    };

    const launchConfetti = (durationMs = 2800) => {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        canvas.style.display = 'block';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');

        const colors = ['#6c5ce7','#a29bfe','#00d2d3','#2ed573','#ffa502','#ff6b81','#fdcb6e'];
        const pieces = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 4,
            speedY: Math.random() * 3 + 2,
            speedX: (Math.random() - 0.5) * 2,
            opacity: 1
        }));

        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pieces.forEach(p => {
                p.y += p.speedY;
                p.x += p.speedX;
                p.rotation += p.rotSpeed;
                if (elapsed > durationMs - 800) p.opacity = Math.max(0, p.opacity - 0.018);
                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });
            if (elapsed < durationMs) {
                requestAnimationFrame(tick);
            } else {
                canvas.style.display = 'none';
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
        tick();
    };

    const showMilestoneToast = (emoji, title, message) => {
        const existing = document.getElementById('milestone-toast');
        if (existing) existing.remove();

        const el = document.createElement('div');
        el.id = 'milestone-toast';
        el.style.cssText = `
            position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%) translateY(40px);
            background: var(--bg-card); border: 1px solid rgba(108,92,231,0.4);
            border-radius: 20px; padding: 1.2rem 2rem; text-align: center;
            box-shadow: 0 20px 50px rgba(0,0,0,0.4); z-index: 9998;
            font-family: inherit; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s;
            opacity: 0; min-width: 300px;
        `;
        el.innerHTML = `
            <div style="font-size:3rem;margin-bottom:.5rem;">${emoji}</div>
            <div style="font-size:1.1rem;font-weight:800;color:var(--text-main);margin-bottom:.3rem;">${title}</div>
            <div style="font-size:.9rem;color:var(--text-muted);">${message}</div>
        `;
        document.body.appendChild(el);

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateX(-50%) translateY(0)';
        }, 50);

        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => el.remove(), 400);
        }, 4000);
    };

    // Called after every sale is registered — checks milestones
    const checkMilestones = () => {
        const incomes = sales.filter(s => s.type !== 'expense');
        const totalRevenue = incomes.reduce((sum, s) => sum + s.amount, 0);
        const salesCount = incomes.length;
        const goalPct = dailyGoal > 0 ? (totalRevenue / dailyGoal) * 100 : 0;

        const celebratedKey = `celebrated_${new Date().toISOString().split('T')[0]}`;
        const celebrated = JSON.parse(localStorage.getItem(celebratedKey) || '{}');

        // 🎯 Goal reached (100%)
        if (goalPct >= 100 && !celebrated.goal) {
            celebrated.goal = true;
            localStorage.setItem(celebratedKey, JSON.stringify(celebrated));
            launchConfetti(3500);
            showMilestoneToast('🎯', '¡Meta diaria alcanzada!', `Llegaste a ${formatCurrency(dailyGoal)}. ¡Excelente trabajo!`);
            return;
        }
        // 🌟 Halfway to goal (50%)
        if (goalPct >= 50 && !celebrated.halfGoal) {
            celebrated.halfGoal = true;
            localStorage.setItem(celebratedKey, JSON.stringify(celebrated));
            launchConfetti(1800);
            showMilestoneToast('⭐', '¡Mitad del camino!', '¡Ya lograste el 50% de tu meta de hoy!');
            return;
        }
        // 🛒 First sale of the day
        if (salesCount === 1 && !celebrated.firstSale) {
            celebrated.firstSale = true;
            localStorage.setItem(celebratedKey, JSON.stringify(celebrated));
            showMilestoneToast('🚀', '¡Primera venta del día!', '¡Arrancó el motor! Que sigan los ingresos.');
            return;
        }
        // 💰 Milestone sales counts
        const milestones = [5, 10, 20, 50];
        for (const m of milestones) {
            if (salesCount === m && !celebrated[`sales${m}`]) {
                celebrated[`sales${m}`] = true;
                localStorage.setItem(celebratedKey, JSON.stringify(celebrated));
                launchConfetti(2000);
                showMilestoneToast('🏆', `¡${m} ventas hoy!`, 'Un logro increíble. ¡Seguí así!');
                return;
            }
        }
    };

    // Patch sale submission to trigger milestone check
    document.addEventListener('zaleasy:sale-registered', () => {
        checkMilestones();
        updateWeekVsLastWeek();
    });

    // Run app
    init();
});
