document.addEventListener('DOMContentLoaded', () => {
    const productDetailContainer = document.getElementById('productDetailContainer');

    // Get product ID from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showError('No se especifico ningun producto.');
        return;
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        showError('Producto no encontrado.');
        return;
    }

    document.title = `${product.name} | Zabala Repuestos`;
    renderProductDetail(product, productDetailContainer);
});

const STOP_WORDS = new Set([
    'para', 'con', 'sin', 'del', 'las', 'los', 'una', 'uno', 'por', 'tipo',
    'jgo', 'juego', 'repuesto', 'repuestos', 'motor', 'marca', 'varios',
    'usos', 'completo', 'completa', 'nuevo', 'nueva', 'viejo', 'vieja',
    'derecho', 'derecha', 'izquierdo', 'izquierda'
]);

const SERIES_PATTERNS = [
    ['SCANIA 111', /\bscania\s*111\b|\bscania111\b|scania 111/i],
    ['STRALIS', /\bstralis\b/i],
    ['OM457', /\bom\s*457\b|\bom457\b/i],
    ['OM904', /\bom\s*904\b|\bom904\b/i],
    ['OM906', /\bom\s*906\b|\bom906\b/i],
    ['OM926', /\bom\s*926\b|\bom926\b/i],
    ['OM924', /\bom\s*924\b|\bom924\b/i],
    ['OM447', /\bom\s*447\b|\bom447\b/i],
    ['OM366', /\bom\s*366\b|\bom366\b/i],
    ['OM352', /\bom\s*352\b|\bom352\b/i],
    ['OM611', /\bom\s*611\b|\bom611\b/i],
    ['OM651', /\bom\s*651\b|\bom651\b/i],
    ['O500', /\bo\s*500\b|\bo500\b/i],
    ['ISC', /\bisc\b|\bcummins\s*isc\b/i],
    ['ISB', /\bisb\b|\bcummins\s*isb\b/i],
    ['6C', /\b6c\b|\bcummins\s*6c\b/i],
    ['6B', /\b6b\b|\bcummins\s*6b\b/i]
];

const COMPATIBILITY_RULES = [
    {
        key: 'OM352',
        patterns: [/\bom ?352\b/, /\b1114\b/, /\b1517\b/, /\b1518\b/, /\b1314\b/, /\b1317\b/, /\boh ?1314\b/],
        defaultModels: ['Mercedes-Benz L 1114', 'Mercedes-Benz L 1517', 'Mercedes-Benz L 1518', 'Mercedes-Benz 1314', 'Mercedes-Benz 1317', 'Mercedes-Benz OH 1314'],
        modelPatterns: [
            ['Mercedes-Benz L 1114', [/\b1114\b/, /\bl ?1114\b/]],
            ['Mercedes-Benz L 1517', [/\b1517\b/, /\bl ?1517\b/]],
            ['Mercedes-Benz L 1518', [/\b1518\b/, /\bl ?1518\b/]],
            ['Mercedes-Benz 1314', [/\b1314\b/]],
            ['Mercedes-Benz 1317', [/\b1317\b/]],
            ['Mercedes-Benz 1215', [/\b1215\b/]],
            ['Mercedes-Benz 1620', [/\b1620\b/]],
            ['Mercedes-Benz OH 1314', [/\boh ?1314\b/]],
            ['Mercedes-Benz 710', [/\b710\b/]]
        ]
    },
    {
        key: 'OM366',
        patterns: [/\bom ?366\b/, /\bom366a\b/, /\bom366la\b/, /\b1215\b/, /\b1418\b/, /\b1420\b/, /\b1620\b/],
        defaultModels: ['Mercedes-Benz L 1215', 'Mercedes-Benz L 1418', 'Mercedes-Benz L 1420', 'Mercedes-Benz L 1517', 'Mercedes-Benz L 1620', 'Mercedes-Benz OHL 1420', 'Mercedes-Benz OHL 1620'],
        modelPatterns: [
            ['Mercedes-Benz L 1215', [/\b1215\b/]],
            ['Mercedes-Benz L 1418', [/\b1418\b/]],
            ['Mercedes-Benz L 1420', [/\b1420\b/]],
            ['Mercedes-Benz L 1517', [/\b1517\b/]],
            ['Mercedes-Benz L 1620', [/\b1620\b/]],
            ['Mercedes-Benz OHL 1420', [/\bohl ?1420\b/]],
            ['Mercedes-Benz OHL 1620', [/\bohl ?1620\b/]]
        ]
    },
    {
        key: 'OM904',
        patterns: [/\bom ?904\b/, /\b712c\b/, /\b914c\b/, /\b1215c\b/, /\bof ?1417\b/, /\bof ?1418\b/, /\baccelo\b/],
        defaultModels: ['Mercedes-Benz 712C', 'Mercedes-Benz 914C', 'Mercedes-Benz 1215C', 'Mercedes-Benz OF 1417', 'Mercedes-Benz OF 1418', 'Mercedes-Benz Accelo'],
        modelPatterns: [
            ['Mercedes-Benz 712C', [/\b712c\b/]],
            ['Mercedes-Benz 914C', [/\b914c\b/]],
            ['Mercedes-Benz 1215C', [/\b1215c\b/]],
            ['Mercedes-Benz OF 1417', [/\bof ?1417\b/]],
            ['Mercedes-Benz OF 1418', [/\bof ?1418\b/]],
            ['Mercedes-Benz Accelo', [/\baccelo\b/, /\baccello\b/]]
        ]
    },
    {
        key: 'OM906',
        patterns: [/\bom ?906\b/, /\batego\b/, /\b1725\b/, /\b2423\b/, /\bo ?500\b/, /\boh ?1618\b/],
        defaultModels: ['Mercedes-Benz Atego 1725', 'Mercedes-Benz Atego 2423', 'Mercedes-Benz O 500', 'Mercedes-Benz OH 1618', 'Mercedes-Benz OHL 1618'],
        modelPatterns: [
            ['Mercedes-Benz Atego 1725', [/\b1725\b/]],
            ['Mercedes-Benz Atego 2423', [/\b2423\b/]],
            ['Mercedes-Benz O 500', [/\bo ?500\b/]],
            ['Mercedes-Benz OH 1618', [/\boh ?1618\b/]],
            ['Mercedes-Benz OHL 1618', [/\bohl ?1618\b/]]
        ]
    },
    {
        key: 'OM924',
        patterns: [/\bom ?924\b/, /\b1721\b/, /\bo ?500u\b/, /\bohl ?1621\b/],
        defaultModels: ['Mercedes-Benz Atego 1721', 'Mercedes-Benz O 500U', 'Mercedes-Benz OHL 1621'],
        modelPatterns: [
            ['Mercedes-Benz Atego 1721', [/\b1721\b/]],
            ['Mercedes-Benz O 500U', [/\bo ?500u\b/]],
            ['Mercedes-Benz OHL 1621', [/\bohl ?1621\b/]]
        ]
    },
    {
        key: 'OM926',
        patterns: [/\bom ?926\b/, /\baxor\b/, /\b1933\b/, /\b1726\b/, /\bo ?500\b/],
        defaultModels: ['Mercedes-Benz Axor 1933', 'Mercedes-Benz Atego 1726', 'Mercedes-Benz O 500', 'Mercedes-Benz O 500U'],
        modelPatterns: [
            ['Mercedes-Benz Axor 1933', [/\b1933\b/]],
            ['Mercedes-Benz Atego 1726', [/\b1726\b/]],
            ['Mercedes-Benz O 500', [/\bo ?500\b/]],
            ['Mercedes-Benz O 500U', [/\bo ?500u\b/]]
        ]
    },
    {
        key: 'OM457',
        patterns: [/\bom ?457\b/, /\b1634\b/, /\b1938\b/, /\bo ?400\b/, /\bo ?500\b/, /\baxor\b/, /\bactros\b/],
        defaultModels: ['Mercedes-Benz L 1634', 'Mercedes-Benz LS 1938', 'Mercedes-Benz O 400', 'Mercedes-Benz O 500', 'Mercedes-Benz Axor 2035', 'Mercedes-Benz Axor 2040', 'Mercedes-Benz Axor 2045', 'Mercedes-Benz Actros'],
        modelPatterns: [
            ['Mercedes-Benz L 1634', [/\b1634\b/]],
            ['Mercedes-Benz LS 1938', [/\b1938\b/]],
            ['Mercedes-Benz O 400', [/\bo ?400\b/]],
            ['Mercedes-Benz O 500', [/\bo ?500\b/]],
            ['Mercedes-Benz Axor 2035', [/\b2035\b/]],
            ['Mercedes-Benz Axor 2040', [/\b2040\b/]],
            ['Mercedes-Benz Axor 2045', [/\b2045\b/]],
            ['Mercedes-Benz Actros', [/\bactros\b/]]
        ]
    },
    {
        key: 'OM447/OM449',
        patterns: [/\bom ?447\b/, /\bom ?449\b/, /\b1633\b/, /\b1634\b/, /\b1938\b/],
        defaultModels: ['Mercedes-Benz L 1633', 'Mercedes-Benz L 1634', 'Mercedes-Benz LS 1938', 'Mercedes-Benz O 400'],
        modelPatterns: [
            ['Mercedes-Benz L 1633', [/\b1633\b/]],
            ['Mercedes-Benz L 1634', [/\b1634\b/]],
            ['Mercedes-Benz LS 1938', [/\b1938\b/]],
            ['Mercedes-Benz O 400', [/\bo ?400\b/]]
        ]
    },
    {
        key: 'Sprinter',
        patterns: [/\bsprinter\b/, /\bom ?611\b/, /\bom ?651\b/, /\bcdi\b/, /\b313\b/, /\b413\b/],
        defaultModels: ['Mercedes-Benz Sprinter 313 CDI', 'Mercedes-Benz Sprinter 413 CDI'],
        modelPatterns: [
            ['Mercedes-Benz Sprinter 313 CDI', [/\b313\b/]],
            ['Mercedes-Benz Sprinter 413 CDI', [/\b413\b/]],
            ['Mercedes-Benz Sprinter CDI', [/\bsprinter\b/, /\bcdi\b/]]
        ]
    },
    {
        key: 'Iveco Stralis',
        patterns: [/\bstralis\b/],
        defaultModels: ['Iveco Stralis', 'Iveco Trakker'],
        modelPatterns: [
            ['Iveco Stralis', [/\bstralis\b/]],
            ['Iveco Trakker', [/\btrakker\b/]]
        ]
    },
    {
        key: 'Iveco',
        patterns: [/\bdaily\b/, /\btector\b/, /\beurocargo\b/],
        defaultModels: ['Iveco Daily', 'Iveco Tector', 'Iveco Eurocargo'],
        modelPatterns: [
            ['Iveco Daily', [/\bdaily\b/]],
            ['Iveco Tector', [/\btector\b/]],
            ['Iveco Eurocargo', [/\beurocargo\b/]]
        ]
    },
    {
        key: 'Cummins',
        patterns: [/\bcummins\b/, /\bisc\b/, /\bisb\b/, /\bisbe\b/, /\bisf\b/, /\b6c\b/, /\b6b\b/, /\bford cargo\b/, /\bconstellation\b/],
        defaultModels: ['Ford Cargo', 'Volkswagen Constellation'],
        modelPatterns: [
            ['Ford Cargo', [/\bford\b/, /\bcargo\b/]],
            ['Volkswagen Constellation', [/\bvolkswagen\b/, /\bvw\b/, /\bconstellation\b/]],
            ['Cummins ISC', [/\bisc\b/]],
            ['Cummins ISB', [/\bisb\b/, /\bisbe\b/]],
            ['Cummins ISF', [/\bisf\b/]],
            ['Cummins 6C', [/\b6c\b/]],
            ['Cummins 6B', [/\b6b\b/]]
        ]
    },
    {
        key: 'Scania 111',
        patterns: [/\bscania ?111\b/, /\bscania111\b/, /img products scania 111/],
        defaultModels: ['Scania 111'],
        modelPatterns: [
            ['Scania 111', [/\b111\b/, /\bscania ?111\b/, /img products scania 111/]]
        ]
    },
    {
        key: 'Scania',
        patterns: [/\b113\b/, /\b114\b/, /\b124\b/, /\bp94\b/, /\bpgr\b/],
        defaultModels: ['Scania 113', 'Scania 114', 'Scania 124', 'Scania P94', 'Scania PGR'],
        modelPatterns: [
            ['Scania 113', [/\b113\b/]],
            ['Scania 114', [/\b114\b/]],
            ['Scania 124', [/\b124\b/]],
            ['Scania P94', [/\bp94\b/]],
            ['Scania PGR', [/\bpgr\b/]]
        ]
    }
];

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function normalizeText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim()
        .replace(/\s+/g, ' ');
}

function productText(product) {
    return [
        product.name,
        product.code,
        product.originalCode,
        product.brand,
        product.rubro,
        product.description,
        product.image
    ].join(' ');
}

function compatibleTrucks(product) {
    const normalized = normalizeText(productText(product));
    const trucks = [];

    COMPATIBILITY_RULES.forEach(rule => {
        const ruleMatches = rule.patterns.some(pattern => pattern.test(normalized));
        if (!ruleMatches) return;

        const specificTrucks = rule.modelPatterns
            .filter(([, patterns]) => patterns.some(pattern => pattern.test(normalized)))
            .map(([model]) => model);

        trucks.push(...(specificTrucks.length > 0 ? specificTrucks : rule.defaultModels));
    });

    return [...new Set(trucks)].slice(0, 12);
}

function renderTruckCompatibility(product) {
    const trucks = compatibleTrucks(product);

    if (trucks.length === 0) {
        return '';
    }

    return `
        <div class="product-compatible-trucks">
            <h2>Camiones</h2>
            <ul>
                ${trucks.map(truck => `<li>${escapeHtml(truck)}</li>`).join('')}
            </ul>
        </div>
    `;
}

function productSeries(product) {
    const text = productText(product);
    return SERIES_PATTERNS
        .filter(([, pattern]) => pattern.test(text))
        .map(([series]) => series);
}

function productTokens(product) {
    const text = normalizeText(productText(product));
    return new Set(text.split(' ').filter(token =>
        token.length >= 3 &&
        !STOP_WORDS.has(token) &&
        !/^\d+$/.test(token)
    ));
}

function imageFolder(product) {
    const image = String(product.image || '').replace(/\\/g, '/');
    const parts = image.split('/');
    return parts.length > 2 ? parts.slice(0, -1).join('/').toLowerCase() : '';
}

function sharedTokenCount(a, b) {
    let count = 0;
    a.forEach(token => {
        if (b.has(token)) count++;
    });
    return count;
}

function getRelatedProducts(product, limit = 8) {
    if (!Array.isArray(products)) return [];

    const currentSeries = productSeries(product);
    const currentTokens = productTokens(product);
    const currentFolder = imageFolder(product);
    const currentBrand = normalizeText(product.brand);
    const currentName = normalizeText(product.name);

    return products
        .filter(candidate => candidate.id !== product.id)
        .map(candidate => {
            const candidateSeries = productSeries(candidate);
            const candidateTokens = productTokens(candidate);
            const sharedSeries = candidateSeries.filter(series => currentSeries.includes(series)).length;
            const sharedTokens = sharedTokenCount(currentTokens, candidateTokens);
            const sameFolder = currentFolder && currentFolder === imageFolder(candidate);
            const sameBrand = currentBrand && currentBrand === normalizeText(candidate.brand);
            const candidateName = normalizeText(candidate.name);

            let score = 0;
            if (sameFolder) score += 90;
            score += sharedSeries * 70;
            if (sameBrand) score += 25;
            score += Math.min(sharedTokens, 8) * 8;
            if (candidateName && currentName && (candidateName.includes(currentName) || currentName.includes(candidateName))) {
                score += 15;
            }

            return { product: candidate, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.product);
}

function renderRelatedProducts(product) {
    const relatedProducts = getRelatedProducts(product);

    if (relatedProducts.length === 0) {
        return '';
    }

    const cards = relatedProducts.map(related => `
        <a class="related-product-card" href="producto.html?id=${escapeHtml(related.id)}" title="${escapeHtml(related.name)}">
            <div class="related-product-image">
                <img src="${escapeHtml(related.image || 'img/no-image.jpg')}" alt="${escapeHtml(related.name)}" loading="lazy" decoding="async" onerror="this.src='img/no-image.jpg'">
            </div>
            <div class="related-product-info">
                <span>${escapeHtml(related.brand || '')}</span>
                <h3>${escapeHtml(related.name)}</h3>
                <p>Codigo: ${escapeHtml(related.code || '')}</p>
            </div>
        </a>
    `).join('');

    return `
        <section class="related-products-section" aria-labelledby="relatedProductsTitle">
            <div class="related-products-header">
                <h2 id="relatedProductsTitle">Productos relacionados</h2>
            </div>
            <div class="related-products-grid">
                ${cards}
            </div>
        </section>
    `;
}

function renderProductDetail(product, container) {
    const whatsappMessage = encodeURIComponent(`Hola Zabala Repuestos! Me gustaria cotizar el siguiente producto: ${product.name} (Codigo: ${product.code})`);
    const whatsappLink = `https://wa.me/5492645859764?text=${whatsappMessage}`;

    const html = `
        <a href="catalogo.html" class="back-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Volver al catalogo
        </a>
        
        <div class="product-detail-container">
            <div class="product-detail-img-container">
                <img src="${escapeHtml(product.image || 'img/no-image.jpg')}" alt="${escapeHtml(product.name)}" class="product-detail-img" onerror="this.src='img/no-image.jpg'">
            </div>
            
            <div class="product-detail-info">
                <span class="product-detail-brand">${escapeHtml(product.brand || '')}</span>
                <h1 class="product-detail-name">${escapeHtml(product.name)}</h1>
                
                <div>
                    <span class="product-detail-code">Codigo: ${escapeHtml(product.code || '')}</span>
                    ${product.originalCode ? `<span class="product-detail-code" style="margin-left: 10px;">Orig: ${escapeHtml(product.originalCode)}</span>` : ''}
                </div>
                
                <p class="product-detail-description">
                    ${escapeHtml(product.description || 'Sin descripcion disponible para este producto.')}
                </p>

                ${renderTruckCompatibility(product)}
                
                <a href="${whatsappLink}" class="btn-whatsapp-large" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="24" height="24" fill="currentColor">
                        <path d="M248 8C111 8 0 119 0 256c0 58.8 22.1 114.5 62.1 158.4L8.7 512.6c-1.3 5.4 2.8 9.6 8.3 8.3l108.8-57.9c43.6 28.1 94.9 43 147.2 43 137 0 248-111 248-248S385 8 248 8zm120.3 365.1c-6.8 19.1-39.7 34.9-54.3 37.1-12.7 1.9-28.5 3.3-80.9-17-48.4-18.7-79.6-66.3-81.8-69.3-2.2-3-19.4-25.8-19.4-49.2 0-23.4 12.1-35 16.4-39.7 3.5-3.8 7.7-4.4 10.3-4.4 2.6 0 5.2 0 7.4.1 2.4.1 5.7.5 8.7 7.7 3.3 7.9 11.2 27.4 12.2 29.4s1.7 4.3.3 6.9-2.2 4-4.4 6.6c-2.4 2.8-5.1 6.3-7.2 8.5-2.6 2.6-5.3 5.5-2.2 10.8 3.1 5.3 13.9 22.8 29.8 37 20.3 18.1 37.4 24.2 42.7 26.9 5.3 2.7 8.5 2.2 11.6-1.4 3.1-3.6 13.5-15.7 17.1-21 3.6-5.3 7.3-4.4 12.3-2.6 5.1 1.8 32.2 15.2 37.7 17.9 5.5 2.7 9.2 4 10.5 6.3 1.3 2.3 1.3 13.2-5.5 32.3z" />
                    </svg>
                    Consultar Precio por WhatsApp
                </a>
            </div>
        </div>

        ${renderRelatedProducts(product)}
    `;

    container.innerHTML = html;
}

function showError(message) {
    document.getElementById('productDetailContainer').innerHTML = `
        <div class="error-message">
            <h2>Ups!</h2>
            <p>${escapeHtml(message)}</p>
            <a href="catalogo.html" class="back-link" style="margin-top: 20px;">
                Volver al catalogo
            </a>
        </div>
    `;
}
