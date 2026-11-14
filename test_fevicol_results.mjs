import fs from 'fs';

// Let's test the search logic directly with products
const productsFile = fs.readFileSync('./src/data/products.ts', 'utf8');
const synonymsData = JSON.parse(fs.readFileSync('./src/data/synonyms_trade.json', 'utf8'));

// Parse products
// Let's create an extraction for all products
const idMatches = [...productsFile.matchAll(/id:\s*["'](SKU_[A-Z0-9_]+)["']/g)].map(m => m[1]);
console.log(`Found ${idMatches.length} products in products.ts`);

function matchesToken(haystack, token) {
  if (!haystack || !token) return false;
  const h = haystack.toLowerCase();
  const t = token.toLowerCase();

  if (t.length <= 2) {
    const words = h.split(/[^a-z0-9]+/);
    return words.includes(t);
  }

  const words = h.split(/[^a-z0-9]+/);
  return words.some(w => w === t || (w.length >= t.length && w.startsWith(t)) || (t.length >= 5 && w.includes(t)));
}

// Let's extract product objects with their fields
const products = [];
for (const id of idMatches) {
  const startIdx = productsFile.indexOf(`id: "${id}"`);
  if (startIdx === -1) continue;
  const chunk = productsFile.slice(startIdx, startIdx + 1200);

  const nameMatch = chunk.match(/name:\s*["']([^"']+)["']/);
  const brandMatch = chunk.match(/brand:\s*["']([^"']+)["']/);
  const tagsMatch = chunk.match(/tags:\s*(\[[^\]]+\])/);

  if (nameMatch && brandMatch && tagsMatch) {
    try {
      products.push({
        id,
        name: nameMatch[1],
        brand: brandMatch[1],
        tags: JSON.parse(tagsMatch[1].replace(/'/g, '"'))
      });
    } catch {
      // ignore
    }
  }
}

console.log(`Parsed ${products.length} products for search test.`);

function search(query) {
  const cleanQuery = query.toLowerCase().trim();
  let resolvedQuery = cleanQuery;

  for (const map of synonymsData.mappings) {
    const matchesSlang = cleanQuery === map.slang_or_misspelling.toLowerCase();
    const matchesAlias = map.aliases?.some(alias => cleanQuery.includes(alias.toLowerCase()));
    const containsSlang = cleanQuery.includes(map.slang_or_misspelling.toLowerCase());

    if (matchesSlang || matchesAlias || containsSlang) {
      resolvedQuery = map.canonical_query;
      break;
    }
  }

  const searchTokens = resolvedQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1);

  const scored = products.map(product => {
    let score = 0;
    const prodName = product.name.toLowerCase();
    const prodBrand = product.brand.toLowerCase();
    const prodTags = product.tags.map(t => t.toLowerCase()).join(' ');

    for (const token of searchTokens) {
      if (matchesToken(prodName, token)) score += 20;
      if (matchesToken(prodTags, token)) score += 16;
      if (matchesToken(prodBrand, token)) score += 5;
    }

    const origTokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);
    for (const ot of origTokens) {
      if (matchesToken(prodName, ot) || matchesToken(prodTags, ot)) score += 8;
    }

    return { product, score };
  });

  return scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.product);
}

// 1. Test search for "fevicol"
console.log('\n--- Testing Search for "fevicol" ---');
const fevicolResults = search('fevicol');
console.log(`Results count: ${fevicolResults.length}`);
fevicolResults.forEach((p, idx) => {
  console.log(`  ${idx + 1}. [${p.brand}] ${p.name}`);
});

const elbowInFevicol = fevicolResults.some(p => p.id === 'SKU_CPVC_ELBOW_ASHIRVAD' || p.name.includes('Elbow'));
const brushInFevicol = fevicolResults.some(p => p.id === 'SKU_GLUE_BRUSH_25IN' || p.name.includes('Brush'));
const marineInFevicol = fevicolResults.some(p => p.id === 'SKU_FEVICOL_MARINE_1KG');

if (elbowInFevicol) {
  console.error('❌ FAIL: Elbow is still present in Fevicol search!');
  process.exit(1);
} else {
  console.log('✅ PASS: Elbow is NOT in Fevicol search!');
}

if (!brushInFevicol) {
  console.error('❌ FAIL: Application brush is missing from Fevicol search!');
  process.exit(1);
} else {
  console.log('✅ PASS: Application brush IS in Fevicol search!');
}

if (!marineInFevicol) {
  console.error('❌ FAIL: Fevicol Marine is missing from Fevicol search!');
  process.exit(1);
} else {
  console.log('✅ PASS: Fevicol Marine IS in Fevicol search!');
}

// 2. Test search for "brush"
console.log('\n--- Testing Search for "brush" ---');
const brushResults = search('brush');
console.log(`Results count: ${brushResults.length}`);
brushResults.forEach((p, idx) => {
  console.log(`  ${idx + 1}. [${p.brand}] ${p.name}`);
});

if (brushResults.length > 0 && brushResults[0].id === 'SKU_GLUE_BRUSH_25IN') {
  console.log('✅ PASS: Brush search returns TruCare Brush as #1!');
} else {
  console.error('❌ FAIL: Brush search failed to return TruCare Brush');
  process.exit(1);
}

console.log('\nAll Fevicol and Brush search tests passed 100%!');
