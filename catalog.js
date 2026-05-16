document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('productGrid');
    const searchInput = document.getElementById('searchInput');
    const filterEngine = document.getElementById('filterEngine');
    const filterCategory = document.getElementById('filterCategory');
    const filterBrand = document.getElementById('filterBrand');
    const clearFiltersBtn = document.getElementById('clearFiltersBtn');
    const voiceSearchBtn = document.getElementById('voiceSearchBtn'); // Ensure this is selected if used
    const productsData = typeof products !== 'undefined' && Array.isArray(products) ? products : [];
    const INITIAL_RENDER_LIMIT = 96;
    const RESULT_RENDER_LIMIT = 240;
    const SEARCH_DEBOUNCE_MS = 140;
    let searchTimer = null;
    let productsStatus = document.getElementById('productsStatus');

    if (!productsStatus && productGrid) {
        productsStatus = document.createElement('p');
        productsStatus.id = 'productsStatus';
        productsStatus.className = 'products-status';
        productGrid.parentNode.insertBefore(productsStatus, productGrid);
    }

    // Defined lists for filters
    const engines = [
        "OM352", "OM366", "OM904", "OM906", "OM924", "OM926",
        "OM355", "OM447", "OM457", "OM611", "OM651",
        "ISB", "ISF", "6B", "6C", "O500", "SPRINTER", "IVECO", "SCANIA"
    ].sort();

    // Simplified Consolidate Categories Mapping
    const categoryMapping = {
        "MOTOR": ["MOTOR", "BLOCK", "CIGUEÑAL", "DISTRIBUCION", "JUNTAS", "RETENES", "TAPA CILINDRO", "VALVULA", "SOPORTE", "CORREAS", "PIEZAS MOTRICES", "MOTRICES", "ESCAPE", "MULTIPLE"],
        "INYECCIÓN Y TURBO": ["INYECCION", "TURBO", "TOBERA", "BOMBA INYECTORA", "COMBUSTIBLE", "ACELERACION"],
        "REFRIGERACIÓN": ["REFRIGERACION", "RADIADOR", "BOMBA AGUA", "CALEFACCION", "VENTILADOR", "AGUA"],
        "TRANSMISIÓN Y EMBRAGUE": ["EMBRAGUE", "CAJA", "VELOCIDAD", "EJE", "CARDAN", "DIFERENCIAL", "TRANSMISION", "RUEDA"],
        "FRENOS Y AIRE": ["FRENO", "COMPRESOR", "VALVULA", "CAMARA", "AIRE"],
        "SUSPENSIÓN Y DIRECCIÓN": ["DIRECCION", "SUSPENSION", "ELASTICO", "AMORTIGUADOR", "TREN DELANTERO"],
        "ELECTRICIDAD": ["ELECTRICIDAD", "ALTERNADOR", "ARRANQUE", "INSTRUMENTAL", "FAROS", "LUCES", "BATERIA", "INSTALACION", "ELECTRICA"],
        "FILTROS Y LUBRICACIÓN": ["FILTRO", "LUBRICACION", "ACEITE", "GRASA"],
        "CARROCERÍA Y OTROS": ["CABINA", "PUERTA", "VIDRIO", "ESPEJO", "PARAGOLPE", "HERRAMIENTAS", "REVESTIMIENTOS", "PEDALERA", "BEPO", "DESPIECE"]
    };

    const engineAliasGroups = [
        ["OM352", "OM 352", "OM-352", "OM352A", "OM 352A", "1114", "1517", "1518", "1314", "1317", "1215", "1620", "L1114", "L1517", "L1518", "OH1314"],
        ["OM366", "OM 366", "OM-366", "OM366A", "OM366LA", "1215", "1418", "1420", "1517", "1620", "OHL1420", "OHL1620"],
        ["OM904", "OM 904", "OM-904", "OM906", "OM 906", "OM-906", "O500", "OH1618", "OHL1618", "ATEGO", "1725", "2423"],
        ["OM924", "OM 924", "OM-924", "OM926", "OM 926", "OM-926", "O500", "O500U", "OHL1621", "1721"],
        ["OM611", "OM 611", "OM-611", "OM651", "OM 651", "OM-651", "SPRINTER", "CDI", "313", "413"],
        ["ISB", "ISBE", "ISF", "6B", "6C", "CUMMINS", "FORD CARGO", "VW", "VOLKSWAGEN"],
        ["IVECO", "DAILY", "TECTOR", "EUROCARGO"],
        ["SCANIA", "113", "114", "124", "P94", "PGR"]
    ];

    function normalizeText(value) {
        return String(value || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');
    }

    const normalizedAliasGroups = engineAliasGroups.map(group => group.map(normalizeText));
    const normalizedAliasCompactGroups = normalizedAliasGroups.map(group => group.map(alias => alias.replace(/\s+/g, '')));

    function includesTerm(text, compact, term, compactTerm) {
        if (!term) return true;
        return text.includes(term) || compact.includes(compactTerm);
    }

    function productBaseText(product) {
        return normalizeText([
            product.id,
            product.name,
            product.code,
            product.originalCode,
            product.brand,
            product.rubro,
            product.description,
            product.image
        ].join(' '));
    }

    function createProductIndex(product) {
        const baseText = productBaseText(product);
        const compactBase = baseText.replace(/\s+/g, '');
        const aliasesToAdd = [];

        normalizedAliasGroups.forEach((group, groupIndex) => {
            const compactGroup = normalizedAliasCompactGroups[groupIndex];
            const belongsToGroup = group.some((alias, aliasIndex) =>
                baseText.includes(alias) || compactBase.includes(compactGroup[aliasIndex])
            );

            if (belongsToGroup) {
                aliasesToAdd.push(...group);
            }
        });

        const searchText = `${baseText} ${aliasesToAdd.join(' ')}`.trim();
        const nameText = normalizeText(product.name);
        const codeText = normalizeText(`${product.code || ''} ${product.originalCode || ''}`);

        return {
            product,
            baseText,
            baseCompact: compactBase,
            searchText,
            searchCompact: searchText.replace(/\s+/g, ''),
            nameText,
            nameCompact: nameText.replace(/\s+/g, ''),
            codeText,
            codeCompact: codeText.replace(/\s+/g, ''),
            brandLower: String(product.brand || '').toLowerCase(),
            rubroUpper: String(product.rubro || '').toUpperCase()
        };
    }

    function createQueryIndex(query) {
        const text = normalizeText(query);
        const compact = text.replace(/\s+/g, '');
        return {
            text,
            compact,
            terms: text ? text.split(' ').map(term => ({
                text: term,
                compact: term.replace(/\s+/g, '')
            })) : []
        };
    }

    const indexedProducts = productsData.map(createProductIndex);

    function matchesSearchQuery(indexedProduct, queryIndex) {
        if (!queryIndex.text) return true;

        return queryIndex.terms.every(term =>
            includesTerm(indexedProduct.searchText, indexedProduct.searchCompact, term.text, term.compact)
        );
    }

    function searchScore(indexedProduct, queryIndex) {
        if (!queryIndex.text) return 0;

        if (includesTerm(indexedProduct.codeText, indexedProduct.codeCompact, queryIndex.text, queryIndex.compact)) return 0;
        if (includesTerm(indexedProduct.nameText, indexedProduct.nameCompact, queryIndex.text, queryIndex.compact)) return 1;
        if (includesTerm(indexedProduct.baseText, indexedProduct.baseCompact, queryIndex.text, queryIndex.compact)) return 2;
        if (matchesSearchQuery(indexedProduct, queryIndex)) return 3;
        if (includesTerm(indexedProduct.searchText, indexedProduct.searchCompact, queryIndex.text, queryIndex.compact)) return 4;
        return 5;
    }

    // Function to populate filters
    function populateFilters() {
        // Populate Engines
        engines.forEach(engine => {
            const option = document.createElement('option');
            option.value = engine;
            option.textContent = engine;
            filterEngine.appendChild(option);
        });

        // Populate Categories (Simplified List)
        Object.keys(categoryMapping).forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            filterCategory.appendChild(option);
        });

        // Populate Brands (Fixed List)
        const brands = ["Mercedes Benz", "Cummins", "Iveco", "Scania"];
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand; // The value will be used for filtering logic
            option.textContent = brand;
            filterBrand.appendChild(option);
        });
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function updateProductsStatus(visibleCount, totalCount, isLimited) {
        if (!productsStatus) return;

        if (totalCount === 0) {
            productsStatus.textContent = '';
            return;
        }

        productsStatus.textContent = isLimited
            ? `Mostrando ${visibleCount} de ${totalCount} productos. Refina la busqueda para ver resultados mas precisos.`
            : `Mostrando ${visibleCount} productos.`;
    }

    // Function to render products
    function renderProducts(filteredProducts, renderLimit = RESULT_RENDER_LIMIT) {
        productGrid.textContent = '';

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<div class="no-results"><h3>No se encontraron productos</h3><p>Intenta con otros terminos de busqueda o filtros.</p></div>';
            updateProductsStatus(0, 0, false);
            return;
        }

        const productsToRender = filteredProducts.slice(0, renderLimit);
        const isLimited = filteredProducts.length > productsToRender.length;
        updateProductsStatus(productsToRender.length, filteredProducts.length, isLimited);

        const fragment = document.createDocumentFragment();

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-item';
            productCard.title = product.name;
            productCard.dataset.productId = product.id;

            // Handle missing image
            const imgPath = product.image || 'img/no-image.jpg';
            const safeName = escapeHtml(product.name);
            const safeBrand = escapeHtml(product.brand || '');
            const safeCode = escapeHtml(product.code || '');
            const safeRubro = escapeHtml(product.rubro || '');

            productCard.innerHTML = `
                <img src="${escapeHtml(imgPath)}" alt="${safeName}" class="product-item-img" loading="lazy" decoding="async" onerror="this.src='img/no-image.jpg'"> <!-- Fallback for broken image -->
                <div class="product-item-info">
                    <span class="product-item-brand">${safeBrand}</span>
                    <h3 class="product-item-name">${safeName}</h3>
                    <p class="product-item-code">Codigo: ${safeCode}</p>
                    ${product.rubro ? `<p class="product-item-category" style="font-size: 0.8rem; color: #94a3b8; margin-top: auto; margin-bottom: 10px;">${safeRubro}</p>` : ''}
                    <div class="btn-detail">Ver detalles</div>
                </div>
            `;
            fragment.appendChild(productCard);
        });

        productGrid.appendChild(fragment);
    }

    productGrid.addEventListener('click', (event) => {
        const productCard = event.target.closest('.product-item');
        if (!productCard || !productCard.dataset.productId) return;

        window.location.href = `producto.html?id=${productCard.dataset.productId}`;
    });

    // Main Filter Function
    function applyFilters() {
        const searchTerm = searchInput.value;
        const selectedEngine = filterEngine.value;
        const selectedCategory = filterCategory.value; // Simplified Category Key
        const selectedBrand = filterBrand.value;
        const searchIndex = createQueryIndex(searchTerm);
        const engineIndex = createQueryIndex(selectedEngine);
        const scoreIndex = searchIndex.text ? searchIndex : engineIndex;
        const shouldLimitInitialView = !searchIndex.text && !engineIndex.text && !selectedCategory && !selectedBrand;

        const filteredProducts = indexedProducts.filter(indexedProduct => {
            const product = indexedProduct.product;
            // Search Text Filter
            const matchesSearch = matchesSearchQuery(indexedProduct, searchIndex);

            // Engine Filter with aliases, e.g. OM352 also finds 1114/1517/1518 parts.
            const matchesEngine = matchesSearchQuery(indexedProduct, engineIndex);

            // Category Filter (Mapped Logic)
            let matchesCategory = true;
            if (selectedCategory) {
                // Get keywords for the selected category
                const keywords = categoryMapping[selectedCategory];
                const productRubro = indexedProduct.rubroUpper; // Current product rubro

                // Check if the product's rubro contains ANY of the keywords
                // Also assign "Uncategorized" items to Motor if mostly empty? No, strict matching first.
                if (!productRubro) {
                    matchesCategory = false; // No rubro, doesn't match a specific category filter
                } else {
                    matchesCategory = keywords.some(keyword => productRubro.includes(keyword));
                }
            }

            // Brand Filter (Custom Logic)
            let matchesBrand = !selectedBrand;
            if (selectedBrand) {
                const productBrand = indexedProduct.brandLower;
                const filterBrandLower = selectedBrand.toLowerCase();

                if (filterBrandLower === "cummins") {
                    // Special case for Cummins (includes Ford/VW)
                    matchesBrand = productBrand.includes("cummins") ||
                        productBrand.includes("ford") ||
                        productBrand.includes("vw") ||
                        productBrand.includes("volkswagen");
                } else {
                    matchesBrand = productBrand.includes(filterBrandLower);
                }
            }

            return matchesSearch && matchesEngine && matchesCategory && matchesBrand;
        });

        const shouldSort = Boolean(searchIndex.text || engineIndex.text);
        const rankedProducts = shouldSort
            ? filteredProducts
                .map(indexedProduct => ({
                    product: indexedProduct.product,
                    score: searchScore(indexedProduct, scoreIndex)
                }))
                .sort((a, b) => a.score - b.score)
                .map(item => item.product)
            : filteredProducts.map(indexedProduct => indexedProduct.product);

        const renderLimit = shouldLimitInitialView ? INITIAL_RENDER_LIMIT : RESULT_RENDER_LIMIT;

        renderProducts(rankedProducts, renderLimit);
    }

    function scheduleFilters() {
        window.clearTimeout(searchTimer);
        searchTimer = window.setTimeout(applyFilters, SEARCH_DEBOUNCE_MS);
    }

    // Event Listeners
    searchInput.addEventListener('input', scheduleFilters);
    filterEngine.addEventListener('change', applyFilters);
    filterCategory.addEventListener('change', applyFilters);
    filterBrand.addEventListener('change', applyFilters);

    clearFiltersBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterEngine.value = '';
        filterCategory.value = '';
        filterBrand.value = '';
        applyFilters();
    });

    // Voice Search Functionality
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'es-ES';
        recognition.interimResults = false;

        if (voiceSearchBtn) {
            voiceSearchBtn.addEventListener('click', () => {
                if (voiceSearchBtn.classList.contains('listening')) {
                    recognition.stop();
                } else {
                    recognition.start();
                }
            });

            recognition.onstart = () => {
                voiceSearchBtn.classList.add('listening');
                searchInput.placeholder = "Escuchando...";
            };

            recognition.onend = () => {
                voiceSearchBtn.classList.remove('listening');
                searchInput.placeholder = "Buscar por nombre o código...";
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                applyFilters(); // Trigger filter directly
                searchInput.focus();
            };

            recognition.onerror = (event) => {
                console.error('Error de reconocimiento de voz:', event.error);
                voiceSearchBtn.classList.remove('listening');
                searchInput.placeholder = "Error. Intenta de nuevo.";
            };
        }
    } else {
        if (voiceSearchBtn) {
            voiceSearchBtn.style.display = 'none';
        }
    }

    // Initial Setup
    populateFilters();
    applyFilters(); // Initial render
});
