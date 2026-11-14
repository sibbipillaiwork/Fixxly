import fs from 'fs';

// Read products.ts
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Let's import products catalog by parsing or regex
const rawItems = content.split('// ---').slice(1);
console.log('Sections:', rawItems.length);

// Let's check token "sh" or "adhesive" or "pipe"!
console.log('Does Ashirvad elbow include "sh"?');
console.log('"ashirvad".includes("sh"):', "ashirvad".includes("sh"));
