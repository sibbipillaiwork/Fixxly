import fs from 'fs';

const synonymsData = JSON.parse(fs.readFileSync('./src/data/synonyms_trade.json', 'utf8'));

// Levenshtein distance
function levenshteinDistance(s, t) {
  if (s === t) return 0;
  if (s.length === 0) return t.length;
  if (t.length === 0) return s.length;

  const v0 = new Array(t.length + 1);
  const v1 = new Array(t.length + 1);

  for (let i = 0; i <= t.length; i++) v0[i] = i;

  for (let i = 0; i < s.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < t.length; j++) {
      const cost = s[i] === t[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= t.length; j++) v0[j] = v1[j];
  }
  return v1[t.length];
}

async function testEngine() {
  console.log('🧪 Testing Fixxly Trade Search & Synonym Logic...\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
      failed++;
    }
  }

  // 1. Synonym dictionary test
  const pipeKaRing = synonymsData.mappings.find(m => m.slang_or_misspelling === 'pipe ka ring');
  assert(pipeKaRing !== undefined, 'Found "pipe ka ring" in synonyms_trade.json');
  assert(pipeKaRing.display_term === 'Rubber Gasket O-Ring', 'Maps "pipe ka ring" to "Rubber Gasket O-Ring"');
  assert(pipeKaRing.aliases.includes('pipe washer'), 'Includes alias "pipe washer"');

  const pidipruf = synonymsData.mappings.find(m => m.slang_or_misspelling === 'pidipruf');
  assert(pidipruf !== undefined, 'Found "pidipruf" in synonyms_trade.json');
  assert(pidipruf.display_term === 'Dr. Fixit Pidiproof LW+', 'Maps "pidipruf" to "Dr. Fixit Pidiproof LW+"');

  const tapLeaking = synonymsData.mappings.find(m => m.slang_or_misspelling === 'tap leaking');
  assert(tapLeaking !== undefined && tapLeaking.is_problem === true, 'Problem query "tap leaking" identified as problem');
  assert(tapLeaking.bundle_id === 'BUNDLE_TAP_LEAK', 'Maps to BUNDLE_TAP_LEAK');

  // 2. Levenshtein test for phonetic typos
  const distPidi = levenshteinDistance('pidipruf', 'pidiproof');
  assert(distPidi <= 2, 'Levenshtein distance between pidipruf and pidiproof is <= 2');

  const distFevi = levenshteinDistance('fevikol', 'fevicol');
  assert(distFevi === 1, 'Levenshtein distance between fevikol and fevicol is 1');

  // 3. Build bundle verification
  const distHtml = fs.readFileSync('./dist/index.html', 'utf8');
  assert(distHtml.includes('Fixxly'), 'Production build dist/index.html includes Fixxly');

  console.log(`\n========================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

testEngine().catch(e => {
  console.error(e);
  process.exit(1);
});
