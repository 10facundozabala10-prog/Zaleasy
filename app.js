document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const dateEl = document.getElementById('current-date');
    const greetingEl = document.getElementById('dynamic-greeting');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const saleForm = document.getElementById('sale-form');
    const quickAmountBtns = document.querySelectorAll('.quick-amount');
    const amountInput = document.getElementById('amount');
    const productInput = document.getElementById('product');
    const methodSelect = document.getElementById('method');
    const notesInput = document.getElementById('notes');

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
    let goalReachedNotified = false; // Track if confetti already fired this session

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
        setupTheme();
        initChart();
        renderSales();
        updateKPIs();
        setupAutocomplete();
        setupAuth();
        setupStreakWidget();
        setupImportBackup();
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

        // Animation for numbers
        const elements = [kpiRevenue, kpiSalesCount, kpiExpenses, kpiBalance];
        elements.forEach(el => {
            el.style.transform = 'scale(1.1)';
            setTimeout(() => el.style.transform = 'scale(1)', 300);
        });
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
            const filteredSales = sales.filter(s => s.product.toLowerCase().includes(query));

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

                tr.innerHTML = `
                    <td>${timeStr}</td>
                    <td><strong>${sale.product}</strong>${notesHtml}</td>
                    <td>${typeText}</td>
                    <td><span class="badge" style="background:var(--primary-light); color:var(--primary);">${sale.method}</span></td>
                    <td style="color: ${amountColor}; font-weight: bold;">${sign}${formatCurrency(sale.amount)}</td>
                    <td style="text-align: right;">
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
            const currentVal = parseFloat(amountInput.value) || 0;
            // Depending on logic, this could replace or add. We will replace to make it fast.
            amountInput.value = val.toFixed(2);
            amountInput.parentElement.style.transform = 'scale(1.05)';
            setTimeout(() => amountInput.parentElement.style.transform = 'scale(1)', 200);
        });
    });

    saleForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = productInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const method = methodSelect.value;
        const notes = notesInput ? notesInput.value.trim() : '';

        if (!product || isNaN(amount) || amount <= 0) {
            alert('Por favor, ingresa datos válidos para la venta.');
            return;
        }

        const newSale = {
            id: Date.now(),
            timestamp: Date.now(),
            product,
            amount,
            method,
            type: currentTransactionType,
            notes
        };

        sales.push(newSale);
        localStorage.setItem('dailySales', JSON.stringify(sales));

        // Save for autocomplete
        if (!recentProducts.includes(product)) {
            recentProducts.unshift(product);
            if (recentProducts.length > 20) recentProducts.pop(); // Keep top 20
            localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
            setupAutocomplete();
        }

        // Reset Form
        productInput.value = '';
        amountInput.value = '5.00';
        if (notesInput) notesInput.value = '';
        productInput.focus();

        // Update UI
        renderSales();
        updateKPIs();
        setupStreakWidget();
        showToast('Venta de ' + formatCurrency(amount) + ' registrada!');
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
        });
    });

    // Also close receipt modal with close-modal-close buttons inside it
    document.querySelectorAll('#receipt-modal .close-modal-close').forEach(btn => {
        btn.addEventListener('click', () => receiptModal.classList.remove('active'));
    });

    // --- Receipt Modal Logic ---
    const openReceiptModal = (sale) => {
        const d = new Date(sale.timestamp);
        const dateStr = d.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const timeStr = d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const isExpense = sale.type === 'expense';
        const sign = isExpense ? '-' : '+';
        const amountColor = isExpense ? 'var(--danger)' : 'var(--success)';
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
                    <span class="badge">${sale.method}</span>
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
                    <span style="text-align:right; color:var(--text-main);">${sale.notes}</span>
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

    if (btnPrintReceipt) {
        btnPrintReceipt.addEventListener('click', () => window.print());
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
        const amount = parseFloat(amountInput.value) || 0;
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
        renderSales();
        updateKPIs();
        setupStreakWidget();
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
            productInput.setAttribute('list', 'products-datalist');
        }

        datalist.innerHTML = '';
        recentProducts.forEach(prod => {
            const option = document.createElement('option');
            option.value = prod;
            datalist.appendChild(option);
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

    // Run app
    init();
});
