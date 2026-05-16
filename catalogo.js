document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.getElementById('catalogGrid');
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    const productsData = typeof products !== 'undefined' ? products : [];
    const SEARCH_DEBOUNCE_MS = 80;
    let searchTimer = null;

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
            codeCompact: codeText.replace(/\s+/g, '')
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

    // Render products function
    function renderProducts(productsToRender) {
        catalogGrid.innerHTML = '';

        if (productsToRender.length === 0) {
            noResults.style.display = 'block';
            return;
        } else {
            noResults.style.display = 'none';
        }

        // Keep the initial catalog light, but show every match when the user searches.
        const shouldLimitInitialView = !searchInput || !searchInput.value.trim();
        const limitedProducts = shouldLimitInitialView ? productsToRender.slice(0, 100) : productsToRender;

        const fragment = document.createDocumentFragment();

        limitedProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card catalog-card'; // Reusing product-card but adding catalog-card for specific tweaks
            card.title = product.name;

            // On click, go to detail page
            card.onclick = () => {
                window.location.href = `producto.html?id=${product.id}`;
            };

            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-info-hover">
                   <span>Ver detalles</span>
                </div>
            `;

            fragment.appendChild(card);
        });

        catalogGrid.appendChild(fragment);
    }

    // search filter
    function filterProducts(query) {
        const queryIndex = createQueryIndex(query);
        const filtered = indexedProducts
            .filter(product => matchesSearchQuery(product, queryIndex))
            .map(product => ({
                product: product.product,
                score: searchScore(product, queryIndex)
            }))
            .sort((a, b) => a.score - b.score)
            .map(item => item.product);

        renderProducts(filtered);
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            window.clearTimeout(searchTimer);
            searchTimer = window.setTimeout(() => filterProducts(e.target.value), SEARCH_DEBOUNCE_MS);
        });
    }

    // Initial render
    renderProducts(productsData);
});
