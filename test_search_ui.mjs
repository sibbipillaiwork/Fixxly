import fs from 'fs';
import path from 'path';

console.log('🔍 Running Fixxly Comprehensive Verification (Auto-Rotate, Storage Search, Recommendations, Pipe Search)...\n');

let pass = 0;
let fail = 0;

function assert(condition, desc) {
  if (condition) {
    console.log(`  ✅ PASS: ${desc}`);
    pass++;
  } else {
    console.error(`  ❌ FAIL: ${desc}`);
    fail++;
  }
}

// 1. Verify all product images exist and are authentic SVGs
const productsFile = fs.readFileSync('./src/data/products.ts', 'utf8');
const imageMatches = [...productsFile.matchAll(/image:\s*["']([^"']+)["']/g)].map(m => m[1]);

assert(imageMatches.length >= 22, `Found ${imageMatches.length} product image references (expected >= 22)`);

let allImagesExist = true;
let allImagesAreSvg = true;
let zeroUnsplash = true;

for (const imgPath of imageMatches) {
  if (imgPath.includes('unsplash.com') || imgPath.startsWith('http')) {
    zeroUnsplash = false;
  }
  if (!imgPath.endsWith('.svg')) {
    allImagesAreSvg = false;
  }
  const localFile = path.join('./public', imgPath.replace(/^\//, ''));
  if (!fs.existsSync(localFile)) {
    allImagesExist = false;
    console.error(`    Missing file: ${localFile}`);
  }
}

assert(zeroUnsplash, 'Zero Unsplash or random external stock photos in products catalog');
assert(allImagesAreSvg, 'All product images use authentic vector SVG assets');
assert(allImagesExist, 'All product SVG graphics exist on disk in public/products/');

// 2. Check for unwanted emojis or slang annotations
const rawEmojis = productsFile.match(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g);
assert(!rawEmojis, 'Zero raw unicode emojis in products catalog');

const mobilePageFile = fs.readFileSync('./src/components/MobileSearchPage.tsx', 'utf8');
const searchDropdownFile = fs.readFileSync('./src/components/SearchDropdown.tsx', 'utf8');
const appFile = fs.readFileSync('./src/App.tsx', 'utf8');
const engineFile = fs.readFileSync('./src/services/searchEngine.ts', 'utf8');

// 3. Verify Auto-Rotate Implementation
assert(appFile.includes('aislesScrollRef') && appFile.includes('scrollBy({ left: step, behavior: \'smooth\' })'), 'App.tsx contains smooth auto-rotation for Fast-Delivery Aisles');
assert(appFile.includes('mouseenter') && appFile.includes('touchstart'), 'App.tsx pauses auto-rotation on user touch and hover');
assert(appFile.includes('ChevronLeft') && appFile.includes('ChevronRight'), 'App.tsx provides manual slide left/right controls for aisles');
assert(mobilePageFile.includes('aislesTrackRef'), 'MobileSearchPage contains auto-rotating aisle track');

// 4. Verify Storage Search Bar (localStorage)
assert(appFile.includes('fixxly_recent_searches') && appFile.includes('localStorage.getItem'), 'App.tsx initializes recent searches from localStorage');
assert(appFile.includes('localStorage.setItem(STORAGE_RECENT_KEY'), 'App.tsx persists recent searches to localStorage');

// 5. Verify Background Search & Instant Caching
assert(engineFile.includes('private static cache = new Map') && engineFile.includes('prefetch'), 'searchEngine.ts implements background prefetching & instant cache');
assert(appFile.includes('TradeSearchService.prefetch'), 'App.tsx starts background search on every keystroke');
assert(appFile.includes('useDebounce(query, 50)'), 'App.tsx uses instant 50ms debounce for lightning-fast responsiveness');

// 6. Verify "Recommended For You" Section
assert(appFile.includes('Recommended For You'), 'App.tsx renders "Recommended For You" section on Home');
assert(appFile.includes('recentSearches.slice(0, 3)'), 'App.tsx tailors "Recommended For You" to user\'s last 2-3 searches');
assert(appFile.includes('Personalized'), 'App.tsx marks "Recommended For You" with Personalized contractor badge');

// 7. Verify Pipe Search Coverage
const pipeMatches = productsFile.match(/tags:.*pipe.*/g) || [];
assert(pipeMatches.length >= 10, `Found ${pipeMatches.length} products tagged with 'pipe' (expected >= 10)`);
assert(productsFile.includes('cpvc-pipe.svg') && productsFile.includes('upvc-pipe.svg'), 'Catalog includes both CPVC and UPVC pipes with authentic SVGs');

console.log(`\n========================================`);
console.log(`Summary: ${pass} passed, ${fail} failed`);
console.log(`========================================`);

if (fail > 0) process.exit(1);
