# Fixxly Search & Discovery Component

Elite, trade-optimized Search & Discovery engine and dropdown interface for **Fixxly** (`fixxly.in`), built according to the **MVP Search Synonym & Slang Layer PRD** (Day 50 Operational Baseline).

---

## 🏗️ Brand Identity & Design System
- **Primary Navy:** `#0b1d3a` (Headers, containers, SRP footer CTA, primary badges)
- **Construction Orange:** `#ff6b00` (Primary CTA buttons, active state toggles, quick-commerce accents)
- **Cards & Background:** `#f8f9fa` off-white canvas, `#ffffff` card surface, 1px `#e5e7eb` borders, soft `shadow-md` elevation
- **Typography:** High-contrast `Inter` & System UI stack (`#111827` text, `#6b7280` secondary metadata, `#16a34a` bold trade pricing)

---

## ⚡ Key Functional Features

### 1. Interactive Search Bar with 300ms Debouncing
- `useDebounce(query, 300)` optimizes API submission frequency.
- Instant clear (`X`) button, keyboard accessibility (`Enter` for SRP, `Esc` to dismiss).
- Voice Search modal simulation (trained on Hindi, Kannada & English trade vernacular).
- Camera / Trade Lens Scanner modal simulation (instant hardware part recognition).

### 2. Trade Slang & Regional Synonym Resolution Layer
- Integrated `src/data/synonyms_trade.json` dictionary mapping regional contractor terms:
  - `"pipe ka ring"` → `"rubber gasket o-ring plumbing"` (`Rubber Gasket O-Ring`)
  - `"pidipruf"` → `"Dr. Fixit Pidiproof LW+"` (Levenshtein distance $\le 2$ typo tolerance)
  - `"cement paint"` → `"Asian Paints Apex Distemper / Primer"`
  - `"teflon"` / `"dhaga tape"` → `"Supreme PTFE Thread Seal Tape"`
  - `"m-seal"` → `"Pidilite M-Seal Epoxy Compound"`
- Non-intrusive **Auto-Correction Banner**:
  `⚡ Showing results for "Rubber Gasket O-Ring" (searched for "pipe ka ring")` with an **instant 1-tap toggle back** to search literally.

### 3. Problem Intent Detection & Pinned Solution Bundles
- Problem queries like `"tap leaking"` surface the **Tap Leakage Complete Repair Kit**:
  - Teflon Tape + Rubber Gaskets (10 Pcs) + Taparia 10-Inch Pipe Wrench.
  - Bundled savings (43% OFF) with a single-click **`[ + Add All ]`** button.
- Queries like `"water leakage"` surface the **Damp & Seepage Defense Kit**.

### 4. 2-Column Product Results Grid
- Product thumbnail with `⚡ 30 MINS` local dark store dispatch badge.
- Small bold uppercase brand tags (`ASHIRVAD`, `PIDILITE`, `GYPROC`, `BOSCH`, `FINOLEX`, `TATA TMT`).
- Clean 2-line title clamping with zero layout shift during API loading via animated skeleton loaders.
- **Prominent Specification & Price Pill**: Highlights trade specs (`Size: 1"`, `50 kg`, `Pack of 10`) alongside strike-through MRP, bold green discounted price (`#16a34a`), and percentage discount badge (`64% OFF`).
- Interactive Fixxly Orange `[ + ADD ]` CTA that transitions into a stepper `[ - qty + ]` or opens variant selectors for `[ SELECT OPTIONS ]`.

### 5. Category Quick Filters & Persistent Footer CTA
- Horizontal category filter chips for pivoting queries (`Plumbing Pipes & Fittings`, `Waterproofing`, etc.).
- Fixed bottom footer button: `View All Results for "[Query]" (14 items)` in deep navy (`#0b1d3a`).

### 6. Desktop Web & Mobile Web (mWeb Drawer)
- Responsive layout featuring both Desktop dropdown and full-bleed **Mobile Search Drawer**.
- Instant 1-tap preview switcher in the header to evaluate mobile contractor experience.

---

## 🚀 Running the Project

### Development Server:
```bash
npm run dev
```

### Production Build & Preview:
```bash
npm run build
npm run preview
```

### Automated Engine Tests:
```bash
node test_search_engine.mjs
```
