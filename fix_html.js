const fs = require('fs');
const file = 'd:\\Google antigravity\\GestiondeventasdiariasSAAS\\app.js';
let content = fs.readFileSync(file, 'utf8');
const norm = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Fix 1: Remove productInput.setAttribute in setupAutocomplete
const old1 = `        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'products-datalist';
            document.body.appendChild(datalist);
            productInput.setAttribute('list', 'products-datalist');
        }`;

const rep1 = `        if (!datalist) {
            datalist = document.createElement('datalist');
            datalist.id = 'products-datalist';
            document.body.appendChild(datalist);
            // All .item-product-input elements already have list="products-datalist" in their template
        }`;

let result = norm;
if (norm.includes(old1)) {
    result = result.replace(old1, rep1);
    console.log('Fixed: productInput.setAttribute removed from autocomplete');
} else {
    console.log('WARN: productInput.setAttribute not found in autocomplete');
}

// Fix 2: In the autocomplete, after datalist is rebuilt, also set list attr on all current item product inputs
const old2 = `        datalist.innerHTML = '';
        recentProducts.forEach(prod => {
            const option = document.createElement('option');
            option.value = prod;
            datalist.appendChild(option);
        });
    };`;

const rep2 = `        datalist.innerHTML = '';
        recentProducts.forEach(prod => {
            const option = document.createElement('option');
            option.value = prod;
            datalist.appendChild(option);
        });
        // Connect all current item product inputs to datalist
        document.querySelectorAll('.item-product-input').forEach(inp => {
            inp.setAttribute('list', 'products-datalist');
        });
    };`;

if (result.includes(old2)) {
    result = result.replace(old2, rep2);
    console.log('Fixed: datalist connected to all item inputs');
} else {
    console.log('WARN: datalist block not found');
}

const final = result.replace(/\n/g, '\r\n');
fs.writeFileSync(file, final, 'utf8');
console.log('SUCCESS');
