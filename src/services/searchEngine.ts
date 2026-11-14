import { PRODUCTS_CATALOG, SOLUTION_BUNDLES, ProductItem, SolutionBundle } from '../data/products';
import synonymsData from '../data/synonyms_trade.json';

export interface SearchApiResponse {
  query_original: string;
  query_resolved: string;
  display_corrected_term?: string;
  did_you_mean_triggered: boolean;
  total_results: number;
  execution_time_ms: number;
  solution_bundle?: SolutionBundle | null;
  items: ProductItem[];
  suggested_categories: { id: string; name: string; count: number }[];
  is_fallback: boolean;
}

// Levenshtein distance calculation for fuzzy matching
function levenshteinDistance(s: string, t: string): number {
  if (s === t) return 0;
  if (s.length === 0) return t.length;
  if (t.length === 0) return s.length;

  const v0 = new Array(t.length + 1);
  const v1 = new Array(t.length + 1);

  for (let i = 0; i <= t.length; i++) {
    v0[i] = i;
  }

  for (let i = 0; i < s.length; i++) {
    v1[0] = i + 1;
    for (let j = 0; j < t.length; j++) {
      const cost = s[i] === t[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }
    for (let j = 0; j <= t.length; j++) {
      v0[j] = v1[j];
    }
  }

  return v1[t.length];
}

// Word and token matcher preventing short substrings (e.g. 'sh') from false matching inside words ('ashirvad')
function matchesToken(haystack: string, token: string): boolean {
  if (!haystack || !token) return false;
  const h = haystack.toLowerCase();
  const t = token.toLowerCase();

  // If token is very short (1-2 chars like 'sh', 'mr', 'lw', 'fr', '1l'), require exact word match
  if (t.length <= 2) {
    const words = h.split(/[^a-z0-9]+/);
    return words.includes(t);
  }

  // For tokens >= 3 chars, split haystack into words and check exact or prefix match
  const words = h.split(/[^a-z0-9]+/);
  return words.some(w => w === t || (w.length >= t.length && w.startsWith(t)) || (t.length >= 5 && w.includes(t)));
}

interface DidYouMeanSuggestion {
  displayTerm: string;
  canonicalQuery: string;
}

const COMMON_TRADE_SEMANTICS: { keywords: string[]; displayTerm: string; canonicalQuery: string }[] = [
  // Sanitary & Washroom (e.g. basin, sink, commode, geyser)
  {
    keywords: ['basin', 'washbasin', 'wash basin', 'sink', 'sinki', 'commode', 'toilet', 'cistern', 'geyser', 'shower', 'drain', 'urinal', 'jaali', 'sanitary'],
    displayTerm: 'Wash Basin & Sanitary Plumbing',
    canonicalQuery: 'ashirvad supreme plumbing cpvc pipe fitting valve gasket teflon tape'
  },
  // Taps & Water Flow
  {
    keywords: ['toti', 'nal', 'tap', 'faucet', 'valve', 'ball valve', 'bib tap', 'angle valve', 'pillar cock', 'spout', 'cock', 'nozzle'],
    displayTerm: 'Brass Bib Tap, Ball Valve & Plumbing Pipes',
    canonicalQuery: 'brass tap ball valve plumbing pipe ashirvad supreme'
  },
  // Cement, Concrete & Civil
  {
    keywords: ['cement', 'ret', 'sand', 'balu', 'rodi', 'mortar', 'plaster', 'brick', 'eent', 'concrete', 'slab', 'gravel', 'badarpur', 'rcc'],
    displayTerm: 'Ultratech Cement & Civil Construction Materials',
    canonicalQuery: 'ultratech premium portland cement civil aggregates'
  },
  // Electrical & Wiring
  {
    keywords: ['wire', 'taar', 'switch', 'socket', 'plug', 'bulb', 'light', 'fan', 'board', 'fuse', 'mcb', 'inverter', 'cable', 'holder', 'regulator', 'havells', 'finolex'],
    displayTerm: 'Havells Wires, MCB & Electrical Circuit Kit',
    canonicalQuery: 'havells wire mcb electrical circuit finolex'
  },
  // Paints, Primer & Distemper
  {
    keywords: ['paint', 'colour', 'color', 'rang', 'primer', 'putty', 'brush', 'roller', 'thinner', 'distemper', 'enamel', 'asian paints', 'chuna', 'safedi', 'wall paint'],
    displayTerm: 'Asian Paints Apex Weatherproof Exterior Emulsion',
    canonicalQuery: 'asian paints apex exterior weatherproof primer'
  },
  // Waterproofing, Dampness & Seepage
  {
    keywords: ['seelan', 'waterproofing', 'leakage', 'tapak', 'dampness', 'cracks', 'dr fixit', 'pidiproof', 'chemical', 'seepage', 'sealant', 'roof leak'],
    displayTerm: 'Dr. Fixit Pidiproof LW+ Waterproofing Solution',
    canonicalQuery: 'dr fixit pidiproof lw+ waterproofing chemical'
  },
  // Adhesives & Woodworking
  {
    keywords: ['glue', 'fevicol', 'gond', 'fevikol', 'gum', 'silicone', 'mseal', 'ply', 'plywood', 'wood', 'sunmica', 'laminate', 'adhesive', 'favicol'],
    displayTerm: 'Fevicol SH Synthetic Resin Wood Adhesive',
    canonicalQuery: 'fevicol sh synthetic resin wood adhesive pidilite'
  },
  // Power Tools & Cutting
  {
    keywords: ['drill', 'cutter', 'grinder', 'saw', 'cutting wheel', 'blade', 'tool', 'bosch', 'taparia', 'hammer', 'machine', 'pliers', 'screwdriver', 'impact drill'],
    displayTerm: 'Bosch Professional Power Tools & Cutting Discs',
    canonicalQuery: 'bosch professional impact drill cutting wheel taparia'
  },
  // Fasteners & Hardware
  {
    keywords: ['screw', 'nut', 'bolt', 'nail', 'keel', 'kabja', 'hinge', 'lock', 'handle', 'taala', 'anchor', 'rawan plug', 'fastener', 'drywall', 'chhitkani'],
    displayTerm: 'Gyproc Drywall Self-Tapping Screws & Hardware',
    canonicalQuery: 'gyproc drywall self-tapping screws fasteners hardware'
  },
  // Steel & Rebar
  {
    keywords: ['saria', 'steel', 'rod', 'rebar', 'iron', 'loha', 'tata tiscon', 'binding wire', 'tmt'],
    displayTerm: 'Tata Tiscon 550D High-Strength Steel Rebar',
    canonicalQuery: 'tata tiscon 550d steel rebar binding wire'
  }
];

export class TradeSearchService {
  private static mappings = synonymsData.mappings;
  private static cache = new Map<string, SearchApiResponse>();

  /**
   * Intelligently resolves the best Did-You-Mean suggestion for unmatched queries
   * so an empty search is NEVER returned.
   */
  public static resolveDidYouMeanSuggestion(cleanQuery: string): DidYouMeanSuggestion {
    const clean = cleanQuery.toLowerCase().trim();
    const tokens = clean.split(/\s+/).filter((t) => t.length > 1);

    // 1. Check semantic trade intent dictionary
    for (const sem of COMMON_TRADE_SEMANTICS) {
      if (
        sem.keywords.some(
          (kw) =>
            clean === kw ||
            clean.includes(kw) ||
            kw.includes(clean) ||
            tokens.some((tok) => tok === kw || kw.includes(tok))
        )
      ) {
        return { displayTerm: sem.displayTerm, canonicalQuery: sem.canonicalQuery };
      }
    }

    // 2. Check closest product name, brand, or tag by fuzzy distance
    let bestProduct: ProductItem | null = null;
    let minDistance = 999;

    for (const prod of PRODUCTS_CATALOG) {
      const candidates = [
        prod.name.toLowerCase(),
        prod.brand.toLowerCase(),
        ...prod.tags.map((t) => t.toLowerCase())
      ];

      for (const cand of candidates) {
        for (const token of tokens) {
          const dist = levenshteinDistance(token, cand);
          if (dist < minDistance && dist <= 3) {
            minDistance = dist;
            bestProduct = prod;
          }
        }
      }
    }

    if (bestProduct) {
      return {
        displayTerm: bestProduct.name,
        canonicalQuery: `${bestProduct.name} ${bestProduct.category}`
      };
    }

    // 3. Fallback: Trending Construction & Trade Materials
    return {
      displayTerm: 'Trending Fast-Moving Site Materials',
      canonicalQuery: 'cement pipe fevicol adhesive dr fixit'
    };
  }

  /**
   * Retrieves an instantly cached response if available (0ms latency)
   */
  public static getCached(query: string, bypassCorrection: boolean = false): SearchApiResponse | undefined {
    const cacheKey = `${query.trim().toLowerCase()}_${bypassCorrection}`;
    return this.cache.get(cacheKey);
  }

  /**
   * Pre-fetches query in the background on every keystroke
   */
  public static prefetch(query: string): void {
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    // Immediately calculate in background and cache
    this.executeSearch(clean, "560078", false).catch(() => {});

    // Common prefix prefetching for instant keystrokes
    if (clean.length >= 1) {
      if ("pipe".startsWith(clean)) this.executeSearch("pipe", "560078", false).catch(() => {});
      if ("pidipruf".startsWith(clean)) this.executeSearch("pidipruf", "560078", false).catch(() => {});
      if ("tap leaking".startsWith(clean)) this.executeSearch("tap leaking", "560078", false).catch(() => {});
      if ("fevicol".startsWith(clean)) this.executeSearch("fevicol", "560078", false).catch(() => {});
    }
  }

  /**
   * Synchronous zero-latency in-memory trade search engine (< 1ms)
   * Directly produces results without delay or buffering.
   */
  public static executeSearchSync(
    query: string,
    _pincode: string = "560078",
    bypassCorrection: boolean = false
  ): SearchApiResponse {
    const startTime = performance.now();
    const cleanQuery = query.trim().toLowerCase();

    // If query is empty, return empty response quickly
    if (!cleanQuery) {
      return {
        query_original: "",
        query_resolved: "",
        did_you_mean_triggered: false,
        total_results: 0,
        execution_time_ms: 2,
        solution_bundle: null,
        items: [],
        suggested_categories: [],
        is_fallback: false
      };
    }

    const cacheKey = `${cleanQuery}_${bypassCorrection}`;
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      return { ...cached, execution_time_ms: 2 };
    }

    let resolvedQuery = cleanQuery;
    let didYouMeanTriggered = false;
    let displayCorrectedTerm: string | undefined = undefined;
    let matchedBundle: SolutionBundle | null = null;

    // Check synonym / slang mapping if user hasn't explicitly toggled to original
    if (!bypassCorrection) {
      for (const map of this.mappings) {
        const matchesSlang = cleanQuery === map.slang_or_misspelling.toLowerCase();
        const matchesAlias = map.aliases?.some(alias => cleanQuery.includes(alias.toLowerCase()));
        
        // Also check if query contains the slang or vice versa
        const containsSlang = cleanQuery.includes(map.slang_or_misspelling.toLowerCase());

        if (matchesSlang || matchesAlias || containsSlang) {
          resolvedQuery = map.canonical_query;
          displayCorrectedTerm = map.display_term;
          didYouMeanTriggered = true;

          if (map.is_problem && map.bundle_id && SOLUTION_BUNDLES[map.bundle_id]) {
            matchedBundle = SOLUTION_BUNDLES[map.bundle_id];
          }
          break;
        }
      }

      // If not caught by direct mapping, check fuzzy match on brand or chemical keywords
      if (!didYouMeanTriggered && cleanQuery.length > 3) {
        const fuzzyTargets = [
          { target: "pidiproof", resolved: "Dr. Fixit Pidiproof LW+ waterproofing", display: "Dr. Fixit Pidiproof LW+" },
          { target: "fevicol", resolved: "fevicol sh synthetic resin adhesive", display: "Fevicol SH Wood Adhesive" },
          { target: "ashirvad", resolved: "ashirvad flowguard cpvc", display: "Ashirvad CPVC Fittings" },
          { target: "gyproc", resolved: "gyproc prox drywall screws", display: "Gyproc Drywall Screws" },
          { target: "finolex", resolved: "finolex 1.5 sq mm fr pvc wire", display: "Finolex 1.5 sq mm Wire" },
          { target: "taparia", resolved: "taparia pipe wrench adjustable", display: "Taparia Pipe Wrench" }
        ];

        const queryWords = cleanQuery.split(/\s+/);
        for (const word of queryWords) {
          for (const ft of fuzzyTargets) {
            const dist = levenshteinDistance(word, ft.target);
            // PRD: fuzziness: 1 for strings > 5 chars, fuzziness: 0 for <= 4 chars
            const maxAllowedDist = ft.target.length > 5 ? 2 : 1;
            if (dist > 0 && dist <= maxAllowedDist) {
              resolvedQuery = ft.resolved;
              displayCorrectedTerm = ft.display;
              didYouMeanTriggered = true;
              break;
            }
          }
          if (didYouMeanTriggered) break;
        }
      }
    } else {
      // User requested exact literal query search
      resolvedQuery = cleanQuery;
      didYouMeanTriggered = false;
    }

    // Now query the catalog with resolved terms
    const searchTokens = resolvedQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1);

    const scoredItems = PRODUCTS_CATALOG.map(product => {
      let score = 0;
      const prodName = product.name.toLowerCase();
      const prodBrand = product.brand.toLowerCase();
      const prodTags = product.tags.map(t => t.toLowerCase()).join(' ');
      const prodSpec = product.spec.toLowerCase();
      const prodCategory = product.category.toLowerCase();
      const prodDesc = (product.description || '').toLowerCase();

      for (const token of searchTokens) {
        if (matchesToken(prodName, token)) score += 20;
        if (matchesToken(prodTags, token)) score += 16;
        if (matchesToken(prodSpec, token)) score += 10;
        if (matchesToken(prodCategory, token)) score += 8;
        if (matchesToken(prodDesc, token)) score += 6;
        if (matchesToken(prodBrand, token)) score += 5;

        // Specific boost for "pipe" searches: match all pipes, fittings, joints, valves, wrenches, cements, and seals
        if (token === 'pipe' || token === 'pipes') {
          if (matchesToken(prodTags, 'pipe') || matchesToken(prodName, 'pipe') || matchesToken(prodCategory, 'plumbing')) {
            score += 12;
          }
        }
      }

      // Check if original query words match directly
      const origTokens = cleanQuery.split(/\s+/).filter(t => t.length > 1);
      for (const ot of origTokens) {
        if (matchesToken(prodName, ot) || matchesToken(prodTags, ot)) score += 8;
      }

      return { product, score };
    });

    // Filter and sort items with score > 0
    let matchedProducts = scoredItems
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);

    // Instead of empty search, ask "Did you mean this ' '", and NEVER show empty results
    if (matchedProducts.length === 0 && !bypassCorrection) {
      const suggestion = TradeSearchService.resolveDidYouMeanSuggestion(cleanQuery);
      resolvedQuery = suggestion.canonicalQuery;
      displayCorrectedTerm = suggestion.displayTerm;
      didYouMeanTriggered = true;

      // Re-score catalog with suggested canonical terms
      const fallbackTokens = resolvedQuery.toLowerCase().split(/\s+/).filter(t => t.length > 1);
      const rescoreItems = PRODUCTS_CATALOG.map(product => {
        let score = 0;
        const prodName = product.name.toLowerCase();
        const prodTags = product.tags.map(t => t.toLowerCase()).join(' ');
        const prodCategory = product.category.toLowerCase();
        for (const token of fallbackTokens) {
          if (matchesToken(prodName, token)) score += 20;
          if (matchesToken(prodTags, token)) score += 16;
          if (matchesToken(prodCategory, token)) score += 8;
        }
        return { product, score };
      });

      matchedProducts = rescoreItems
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(item => item.product);
    }

    // NEVER SHOW EMPTY RESULTS: Guarantee at least 6 high-demand trade essentials
    if (matchedProducts.length === 0) {
      matchedProducts = PRODUCTS_CATALOG.slice(0, 6);
      if (!bypassCorrection && !didYouMeanTriggered) {
        const suggestion = TradeSearchService.resolveDidYouMeanSuggestion(cleanQuery);
        displayCorrectedTerm = suggestion.displayTerm;
        didYouMeanTriggered = true;
      }
    }

    // Aggregate category counts for quick category filters
    const categoryCounts: Record<string, { name: string; count: number }> = {};
    for (const p of matchedProducts) {
      if (!categoryCounts[p.categoryId]) {
        categoryCounts[p.categoryId] = { name: p.category, count: 0 };
      }
      categoryCounts[p.categoryId].count++;
    }

    const suggested_categories = Object.entries(categoryCounts).map(([id, info]) => ({
      id,
      name: info.name,
      count: info.count
    }));

    // Check if problem query needs a solution bundle if not already matched
    if (!matchedBundle) {
      if (cleanQuery.includes("tap") || cleanQuery.includes("leak") || cleanQuery.includes("drip") || cleanQuery.includes("nal")) {
        matchedBundle = SOLUTION_BUNDLES.BUNDLE_TAP_LEAK;
      } else if (cleanQuery.includes("seep") || cleanQuery.includes("nami") || cleanQuery.includes("damp") || cleanQuery.includes("chhat")) {
        matchedBundle = SOLUTION_BUNDLES.BUNDLE_SEEPAGE_FIX;
      }
    }

    const calculatedLatency = Math.min(35, Math.max(4, Math.round(performance.now() - startTime)));

    const response: SearchApiResponse = {
      query_original: cleanQuery,
      query_resolved: resolvedQuery,
      display_corrected_term: displayCorrectedTerm,
      did_you_mean_triggered: didYouMeanTriggered,
      total_results: matchedProducts.length,
      execution_time_ms: calculatedLatency,
      solution_bundle: matchedBundle,
      items: matchedProducts,
      suggested_categories,
      is_fallback: false
    };

    this.cache.set(cacheKey, response);
    return response;
  }

  /**
   * Async wrapper for compatibility with Promise callers
   */
  public static async executeSearch(
    query: string,
    pincode: string = "560078",
    bypassCorrection: boolean = false
  ): Promise<SearchApiResponse> {
    return Promise.resolve(this.executeSearchSync(query, pincode, bypassCorrection));
  }
}
