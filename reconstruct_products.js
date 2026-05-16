const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const files = [
    'raw_part1.txt', 'raw_part2.txt', 'raw_part3.txt',
    'raw_part4.txt', 'raw_part5.txt', 'raw_part6.txt',
    'raw_part8.txt', 'raw_part9.txt', 'raw_part10.txt',
    'raw_part7_new_om906.txt'
];

function fixEncoding(str) {
    // 1. Pre-fix specific characters that fail the binary downgrade because they mapped to Unicode chars > 255
    // Ã‘ case: Ã (C3) + ‘ (2018). The byte 0x91 in CP1252 maps to 0x2018.
    // Original byte for Ñ is C3 91.
    // So we want to convert "Ã‘" (C3, 2018) back to "Ñ".
    str = str.replace(/\u00c3\u2018/g, 'Ñ');

    // other possibilities:
    // Ã“ -> Ó (C3 93). 0x93 is “ (201C).
    str = str.replace(/\u00c3\u201C/g, 'Ó');

    try {
        // 2. Generic Mojibake fix for Latin-1 range
        return Buffer.from(str, 'binary').toString('utf-8');
    } catch (e) {
        console.error("Encoding fix error:", e);
        return str;
    }
}

function reconstruct() {
    let allContent = "";

    console.log("Reading files...");
    files.forEach(file => {
        const filePath = path.join(baseDir, file);
        if (fs.existsSync(filePath)) {
            allContent += "\n" + fs.readFileSync(filePath, 'utf-8');
        }
    });

    console.log("Extracting products...");
    const productPattern = /\{\s*id:\s*"([^"]+)"[\s\S]*?\}/g;

    const productsMap = new Map();
    let match;

    while ((match = productPattern.exec(allContent)) !== null) {
        const fullMatch = match[0];
        const id = match[1];

        if (id.startsWith("P")) {
            productsMap.set(id, fullMatch);
        }
    }

    console.log(`Found ${productsMap.size} unique products.`);

    const sortedIds = Array.from(productsMap.keys()).sort((a, b) => {
        const numA = parseInt(a.substring(1)) || 999999;
        const numB = parseInt(b.substring(1)) || 999999;
        return numA - numB;
    });

    const finalProducts = sortedIds.map(id => productsMap.get(id));

    const productsJsContent = finalProducts.join(",\n");

    let finalContent = `const products = [
${productsJsContent}
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
`;

    console.log("Fixing encoding...");
    if (finalContent.includes('Ã¡') || finalContent.includes('Ã±') || finalContent.includes('Ã³') || finalContent.includes('\u00c3\u2018')) {
        console.log("Detected mojibake, applying fix...");
        finalContent = fixEncoding(finalContent);
    }

    const outputPath = path.join(baseDir, 'products.js');
    console.log(`Writing to ${outputPath}...`);
    fs.writeFileSync(outputPath, finalContent, 'utf-8');
    console.log("Done.");
}

reconstruct();
