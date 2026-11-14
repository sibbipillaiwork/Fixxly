import fs from 'fs';

// Let's read searchEngine.ts and see the scoring logic
const engineCode = fs.readFileSync('src/services/searchEngine.ts', 'utf8');
const synonymsData = JSON.parse(fs.readFileSync('src/data/synonyms_trade.json', 'utf8'));

// Let's extract PRODUCTS_CATALOG from products.ts
const productsText = fs.readFileSync('src/data/products.ts', 'utf8');

console.log('Inspecting searchEngine scoring and catalog for fevicol...');
