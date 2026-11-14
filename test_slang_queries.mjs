import fs from 'fs';

const synonyms = JSON.parse(fs.readFileSync('src/data/synonyms_trade.json', 'utf8'));

const testCases = [
  { q: 'paani nahib aara ha', expectBundle: 'BUNDLE_NO_WATER' },
  { q: 'paani nahi aaraha', expectBundle: 'BUNDLE_NO_WATER' },
  { q: 'pani nahi aa raha', expectBundle: 'BUNDLE_NO_WATER' },
  { q: 'nal me pani nahi aa raha', expectBundle: 'BUNDLE_NO_WATER' },
  { q: 'pipe phat gaya', expectBundle: 'BUNDLE_TAP_LEAK' },
  { q: 'deewar ki seelan', expectBundle: 'BUNDLE_SEEPAGE_FIX' },
  { q: 'chhat se paani tapak raha', expectBundle: 'BUNDLE_SEEPAGE_FIX' },
  { q: 'mcb trip', expectBundle: 'BUNDLE_MCB_TRIP' },
  { q: 'mcb gir gayi', expectBundle: 'BUNDLE_MCB_TRIP' },
  { q: 'short circuit ho gaya', expectBundle: 'BUNDLE_MCB_TRIP' },
  { q: 'skru', expectTerm: 'Gyproc Drywall Self-Tapping Screws' },
  { q: 'pech', expectTerm: 'Gyproc Drywall Self-Tapping Screws' },
  { q: 'paani band karne wala', expectTerm: 'Supreme PVC Ball Valve 1"' },
  { q: 'pipe ka t', expectTerm: 'Ashirvad CPVC Equal Tee 1"' },
  { q: 'deewar ki darar', expectTerm: 'Dr. Fixit Crack-X Paste' },
  { q: 'fevikol', expectTerm: 'Fevicol Wood Adhesives & Brushes' },
  { q: 'dhaga tape', expectTerm: 'PTFE Teflon Thread Tape' },
  { q: 'toti leakage', expectBundle: 'BUNDLE_TAP_LEAK' },
  { q: 'taar 1.5mm', expectTerm: 'Finolex 1.5 sq mm FR Wire' },
  { q: 'black tape', expectTerm: 'Steelgrip PVC Electrical Insulation Tape' },
  { q: 'loha cutting', expectTerm: 'Bosch 4" Metal & Inox Cutting Wheel Disc' },
  { q: 'saria 12mm', expectTerm: 'Tata Tiscon 550D Steel Rebar (12mm)' },
  { q: 'ret', expectTerm: 'Screened River Sand & Coarse Aggregates' },
  { q: 'safedi', expectTerm: 'Exterior Acrylic Distemper / Primer' },
  { q: 'drill bit', expectTerm: 'Bosch Professional Concrete Masonry Drill Bit Set' },
  { q: 'basin leak', expectBundle: 'BUNDLE_TAP_LEAK' },
  { q: 'pana', expectTerm: 'Taparia Pipe Wrench 10"' }
];

let allPassed = true;
for (const tc of testCases) {
  const clean = tc.q.toLowerCase().trim();
  let matched = null;
  for (const m of synonyms.mappings) {
    const matchesSlang = clean === m.slang_or_misspelling.toLowerCase();
    const matchesAlias = m.aliases && m.aliases.some(a => clean === a.toLowerCase() || clean.includes(a.toLowerCase()));
    const containsSlang = clean.includes(m.slang_or_misspelling.toLowerCase());

    if (matchesSlang || matchesAlias || containsSlang) {
      matched = m;
      break;
    }
  }

  if (!matched) {
    console.error('FAIL: Not matched:', tc.q);
    allPassed = false;
  } else {
    if (tc.expectBundle && matched.bundle_id !== tc.expectBundle) {
      console.error('FAIL: Expected bundle', tc.expectBundle, 'got', matched.bundle_id, 'for', tc.q);
      allPassed = false;
    } else if (tc.expectTerm && matched.display_term !== tc.expectTerm) {
      console.error('FAIL: Expected term', tc.expectTerm, 'got', matched.display_term, 'for', tc.q);
      allPassed = false;
    } else {
      console.log('PASS:', tc.q, '->', matched.display_term, matched.bundle_id ? `(${matched.bundle_id})` : '');
    }
  }
}

if (allPassed) {
  console.log('\nAll 16 colloquial / typo test cases passed flawlessly!');
}
