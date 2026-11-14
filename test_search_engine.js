import { TradeSearchService } from './src/services/searchEngine';
import { PRODUCTS_CATALOG } from './src/data/products';
async function runTests() {
    console.log('🧪 Starting Fixxly Trade Search & Discovery Engine Test Suite...\n');
    let passed = 0;
    let failed = 0;
    function assert(condition, testName, detail = '') {
        if (condition) {
            console.log(`  ✅ PASS: ${testName}`);
            passed++;
        }
        else {
            console.error(`  ❌ FAIL: ${testName} - ${detail}`);
            failed++;
        }
    }
    // Test 1: Slang Resolution "pipe ka ring"
    const resSlang = await TradeSearchService.executeSearch('pipe ka ring', '560078', false);
    assert(resSlang.did_you_mean_triggered, 'Slang triggers did_you_mean', `got ${resSlang.did_you_mean_triggered}`);
    assert(resSlang.display_corrected_term === 'Rubber Gasket O-Ring', 'Slang display term is Rubber Gasket O-Ring', `got ${resSlang.display_corrected_term}`);
    assert(resSlang.items.length > 0, 'Slang returns matching products', `got ${resSlang.items.length} items`);
    assert(resSlang.items[0].brand === 'ASHIRVAD', 'Top product brand is ASHIRVAD', `got ${resSlang.items[0]?.brand}`);
    // Test 2: Instant 1-tap bypass toggle
    const resBypass = await TradeSearchService.executeSearch('pipe ka ring', '560078', true);
    assert(!resBypass.did_you_mean_triggered, 'Bypass disables did_you_mean', `got ${resBypass.did_you_mean_triggered}`);
    assert(resBypass.query_resolved === 'pipe ka ring', 'Bypass maintains literal query', `got ${resBypass.query_resolved}`);
    // Test 3: Phonetic / Brand Misspelling "pidipruf"
    const resFuzzy = await TradeSearchService.executeSearch('pidipruf', '560078', false);
    assert(resFuzzy.did_you_mean_triggered, 'Fuzzy triggers did_you_mean for pidipruf');
    assert(resFuzzy.display_corrected_term === 'Dr. Fixit Pidiproof LW+', 'Fuzzy resolves to Dr. Fixit Pidiproof LW+');
    assert(resFuzzy.items.some(i => i.id === 'SKU_PIDIPROOF_LW_1L'), 'Product catalog includes Pidiproof LW 1L');
    // Test 4: Problem Query "tap leaking" surfaces Solution Bundle
    const resProblem = await TradeSearchService.executeSearch('tap leaking', '560078', false);
    assert(resProblem.solution_bundle !== null, 'Problem query surfaces solution bundle');
    assert(resProblem.solution_bundle?.id === 'BUNDLE_TAP_LEAK', 'Matched bundle is BUNDLE_TAP_LEAK');
    assert(resProblem.solution_bundle?.items.length === 3, 'Solution bundle has 3 items');
    assert(resProblem.solution_bundle?.bundle_price === 379, 'Bundle price is ₹379');
    // Test 5: Problem Query "water leakage" surfaces Seepage Bundle
    const resSeepage = await TradeSearchService.executeSearch('water leakage', '560078', false);
    assert(resSeepage.solution_bundle?.id === 'BUNDLE_SEEPAGE_FIX', 'Seepage surfaces BUNDLE_SEEPAGE_FIX');
    // Test 6: Zero Result Fallback
    const resUnknown = await TradeSearchService.executeSearch('zzunknownitem9999', '560078', false);
    assert(resUnknown.is_fallback === true, 'Unknown term triggers graceful fallback');
    assert(resUnknown.items.length > 0, 'Fallback returns top trending contractor SKUs');
    // Test 7: Catalog Integrity & Brand Guidelines
    const allHave30Min = PRODUCTS_CATALOG.every(p => p.delivery_time_mins <= 30);
    assert(allHave30Min, 'All SKUs have 30-min delivery promise badge');
    const allHaveSpec = PRODUCTS_CATALOG.every(p => p.spec && p.spec.length > 0);
    assert(allHaveSpec, 'All SKUs have prominent specification pills');
    const allHaveGreenPriceAndMrp = PRODUCTS_CATALOG.every(p => p.price > 0 && p.mrp >= p.price && p.discount_percent > 0);
    assert(allHaveGreenPriceAndMrp, 'All SKUs have valid discounted pricing, MRP, and discount percentage');
    console.log(`\n========================================`);
    console.log(`Test Results: ${passed} passed, ${failed} failed`);
    console.log(`========================================\n`);
    if (failed > 0) {
        process.exit(1);
    }
}
runTests().catch(err => {
    console.error('Fatal error during test run:', err);
    process.exit(1);
});
