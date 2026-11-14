const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const products = {
  'o-ring.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </radialGradient>
    <radialGradient id="rubberRing" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="40%" stop-color="#1e293b"/>
      <stop offset="85%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="highlight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#334155" stop-opacity="0"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  
  <!-- Outer secondary o-ring -->
  <g filter="url(#shadow)" opacity="0.85" transform="translate(60, 40) rotate(-15 150 150)">
    <circle cx="150" cy="150" r="110" fill="none" stroke="url(#rubberRing)" stroke-width="26"/>
    <circle cx="150" cy="150" r="110" fill="none" stroke="url(#highlight)" stroke-width="4"/>
  </g>

  <!-- Main primary o-ring -->
  <g filter="url(#shadow)">
    <circle cx="200" cy="200" r="100" fill="none" stroke="url(#rubberRing)" stroke-width="32"/>
    <circle cx="200" cy="200" r="100" fill="none" stroke="url(#highlight)" stroke-width="6"/>
  </g>

  <!-- Third small o-ring -->
  <g filter="url(#shadow)" transform="translate(50, 70) scale(0.65)">
    <circle cx="200" cy="200" r="80" fill="none" stroke="url(#rubberRing)" stroke-width="28"/>
    <circle cx="200" cy="200" r="80" fill="none" stroke="url(#highlight)" stroke-width="4"/>
  </g>

  <!-- Spec Label Pill -->
  <rect x="90" y="335" width="220" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="0.5">ASHIRVAD EPDM O-RINGS</text>
</svg>
`,

  'teflon-tape.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="tapeCasing" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="60%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
    <filter id="tapeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#1e3a8a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Unrolled white PTFE tape strip -->
  <path d="M 120 280 C 140 310, 200 325, 290 320 L 290 295 C 210 300, 150 285, 135 260 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" filter="url(#tapeShadow)"/>

  <!-- Main Casing -->
  <g filter="url(#tapeShadow)">
    <circle cx="200" cy="180" r="105" fill="url(#tapeCasing)"/>
    <circle cx="200" cy="180" r="105" fill="none" stroke="#60a5fa" stroke-width="3"/>
    
    <!-- White Inner Core (PTFE Tape roll) -->
    <circle cx="200" cy="180" r="70" fill="#f8fafc" stroke="#e2e8f0" stroke-width="6"/>
    
    <!-- Center Spool Hole -->
    <circle cx="200" cy="180" r="38" fill="#1e293b"/>
    <circle cx="200" cy="180" r="38" fill="none" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Authentic Supreme PTFE Tape text -->
    <text x="200" y="140" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">SUPREME</text>
    <text x="200" y="228" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">PTFE THREAD SEAL</text>
  </g>

  <!-- Dimension Badge -->
  <rect x="110" y="340" width="180" height="30" rx="15" fill="#ff6b00"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">12mm x 10m • 100% PURE</text>
</svg>
`,

  'cpvc-elbow.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="cpvcBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3"/>
      <stop offset="40%" stop-color="#fef08a"/>
      <stop offset="80%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="elbowShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="6" dy="16" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- CPVC 90 Degree Pipe Fitting -->
  <g filter="url(#elbowShadow)" transform="translate(45, 30)">
    <!-- Main Bent Pipe Body -->
    <path d="M 80 80 L 170 80 C 230 80, 260 110, 260 170 L 260 260 L 195 260 L 195 180 C 195 150, 180 145, 150 145 L 80 145 Z" fill="#fef3c7" stroke="#d97706" stroke-width="3"/>
    
    <!-- Top Pipe Socket Lip -->
    <ellipse cx="80" cy="112.5" rx="14" ry="32.5" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
    <ellipse cx="80" cy="112.5" rx="8" ry="24" fill="#78350f" opacity="0.6"/>

    <!-- Bottom Pipe Socket Lip -->
    <ellipse cx="227.5" cy="260" rx="32.5" ry="14" fill="#fde68a" stroke="#d97706" stroke-width="3"/>
    <ellipse cx="227.5" cy="260" rx="24" ry="8" fill="#78350f" opacity="0.6"/>

    <!-- Reinforcement Collar Rib -->
    <path d="M 175 80 C 220 95, 245 120, 260 165" fill="none" stroke="#f59e0b" stroke-width="8"/>
    <path d="M 175 80 C 220 95, 245 120, 260 165" fill="none" stroke="#ffffff" stroke-width="2"/>
    
    <!-- Brand Emboss -->
    <text x="175" y="125" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="900" fill="#92400e" transform="rotate(45 175 125)">ASHIRVAD 1"</text>
  </g>

  <!-- Spec Pill -->
  <rect x="100" y="340" width="200" height="30" rx="15" fill="#0b1d3a"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">FLOWGUARD CPVC 90° ELBOW</text>
</svg>
`,

  'pidiproof-lw.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="jarYellow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="canShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#854d0e" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Canister Body -->
  <g filter="url(#canShadow)" transform="translate(60, 20)">
    <!-- Cap & Neck -->
    <rect x="110" y="45" width="60" height="25" rx="5" fill="#1e3a8a" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="120" y="35" width="40" height="12" rx="4" fill="#2563eb"/>
    <path d="M 105 70 L 175 70 L 195 95 L 85 95 Z" fill="#eab308"/>

    <!-- Handle -->
    <path d="M 60 110 C 35 110, 35 180, 60 180" fill="none" stroke="#ca8a04" stroke-width="16" stroke-linecap="round"/>

    <!-- Main Canister -->
    <rect x="65" y="90" width="150" height="230" rx="20" fill="url(#jarYellow)" stroke="#ca8a04" stroke-width="3"/>
    
    <!-- Navy Brand Label -->
    <rect x="75" y="125" width="130" height="145" rx="10" fill="#0b1d3a"/>
    <rect x="75" y="125" width="130" height="30" rx="8" fill="#1e40af"/>
    
    <text x="140" y="145" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">Dr. Fixit</text>
    <text x="140" y="180" font-family="Inter, system-ui, sans-serif" font-size="24" font-weight="900" fill="#facc15" text-anchor="middle">101</text>
    <text x="140" y="202" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">PIDIPROOF LW+</text>
    <text x="140" y="222" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="700" fill="#60a5fa" text-anchor="middle">WATERPROOFING LIQUID</text>

    <!-- Volume badge -->
    <rect x="110" y="240" width="60" height="18" rx="9" fill="#ff6b00"/>
    <text x="140" y="253" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">1 LITRE</text>
  </g>

  <!-- Authentic Footer -->
  <rect x="90" y="350" width="220" height="28" rx="14" fill="#0b1d3a"/>
  <text x="200" y="368" font-family="Inter, system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">PIDILITE GENUINE CHEMICAL</text>
</svg>
`,

  'crack-x.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="tubBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <filter id="tubShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <g filter="url(#tubShadow)" transform="translate(65, 60)">
    <!-- Lid -->
    <ellipse cx="135" cy="55" rx="125" ry="30" fill="#ff6b00" stroke="#c2410c" stroke-width="3"/>
    <ellipse cx="135" cy="50" rx="120" ry="26" fill="#ea580c"/>
    
    <!-- Tub Body -->
    <path d="M 20 65 L 45 220 C 50 240, 220 240, 225 220 L 250 65 Z" fill="url(#tubBody)" stroke="#94a3b8" stroke-width="2"/>
    
    <!-- Front Label -->
    <rect x="55" y="95" width="160" height="105" rx="8" fill="#0b1d3a"/>
    <text x="135" y="125" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">Dr. Fixit</text>
    <text x="135" y="155" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="900" fill="#ff6b00" text-anchor="middle">CRACK-X</text>
    <text x="135" y="175" font-family="Inter, system-ui, sans-serif" font-size="9.5" font-weight="700" fill="#93c5fd" text-anchor="middle">WATERPROOF CRACK FILLER</text>
    <text x="135" y="190" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="800" fill="#fbbf24" text-anchor="middle">500g PASTE</text>
  </g>

  <rect x="100" y="340" width="200" height="30" rx="15" fill="#ff6b00"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">WALL CRACK SEALANT</text>
</svg>
`,

  'fevicol-sh.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="bucketShine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <filter id="bucketShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#1e3a8a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <g filter="url(#bucketShadow)" transform="translate(70, 45)">
    <!-- Wire Handle -->
    <path d="M 20 120 C 20 20, 240 20, 240 120" fill="none" stroke="#94a3b8" stroke-width="4"/>

    <!-- Lid Rim -->
    <rect x="25" y="50" width="210" height="24" rx="10" fill="#1d4ed8" stroke="#1e40af" stroke-width="2"/>
    <rect x="35" y="42" width="190" height="12" rx="6" fill="#2563eb"/>

    <!-- Bucket Body -->
    <path d="M 35 70 L 50 250 C 55 270, 205 270, 210 250 L 225 70 Z" fill="url(#bucketShine)" stroke="#cbd5e1" stroke-width="2"/>

    <!-- Iconic Fevicol Blue Curved Wave -->
    <path d="M 40 120 Q 130 150, 220 120 L 215 200 Q 130 230, 45 200 Z" fill="#1e40af"/>

    <!-- Two Iconic Elephants Silhouette Symbol -->
    <circle cx="110" cy="150" r="14" fill="#fbbf24"/>
    <circle cx="150" cy="150" r="14" fill="#fbbf24"/>
    <rect x="110" y="146" width="40" height="8" rx="3" fill="#fbbf24"/>

    <!-- Fevicol Text -->
    <text x="130" y="185" font-family="Inter, system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">FEVICOL</text>
    <text x="130" y="218" font-family="Inter, system-ui, sans-serif" font-size="26" font-weight="900" fill="#eab308" text-anchor="middle">SH</text>
    <text x="130" y="238" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="800" fill="#1e293b" text-anchor="middle">SYNTHETIC RESIN ADHESIVE</text>
  </g>

  <rect x="100" y="340" width="200" height="30" rx="15" fill="#0b1d3a"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">1 KG TRADE BUCKET</text>
</svg>
`,

  'm-seal.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="packGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <filter id="packShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#7f1d1d" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- M-Seal Pack Shape -->
  <g filter="url(#packShadow)" transform="translate(60, 70) rotate(-6 140 110)">
    <rect x="20" y="20" width="240" height="180" rx="14" fill="url(#packGrad)" stroke="#7f1d1d" stroke-width="2"/>
    
    <!-- White Angular Cut -->
    <path d="M 20 20 L 260 20 L 260 90 L 20 140 Z" fill="#ffffff"/>

    <!-- Brand Typography -->
    <text x="140" y="75" font-family="Inter, system-ui, sans-serif" font-size="34" font-weight="900" fill="#dc2626" text-anchor="middle" font-style="italic">M-SEAL</text>
    <text x="140" y="105" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#0b1d3a" text-anchor="middle">REGULAR EPOXY PUTTY</text>

    <!-- Two Sticks Visuals -->
    <rect x="45" y="145" width="85" height="28" rx="6" fill="#1e293b" stroke="#334155" stroke-width="2"/>
    <text x="87" y="163" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">RESIN</text>

    <rect x="145" y="145" width="85" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
    <text x="187" y="163" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="800" fill="#0f172a" text-anchor="middle">HARDENER</text>

    <!-- Weight Badge -->
    <circle cx="230" cy="50" r="18" fill="#fbbf24"/>
    <text x="230" y="54" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="900" fill="#0b1d3a" text-anchor="middle">90g</text>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#dc2626"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">SEALS LEAKS IN 90 MINS</text>
</svg>
`,

  'solvent-cement.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="metalCan" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#cbd5e1"/>
      <stop offset="35%" stop-color="#f8fafc"/>
      <stop offset="70%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>
    <filter id="canSh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <g filter="url(#canSh)" transform="translate(100, 35)">
    <!-- Metal Screw Cap with Dauber -->
    <rect x="70" y="30" width="60" height="35" rx="6" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
    <line x1="75" y1="42" x2="125" y2="42" stroke="#475569" stroke-width="2"/>
    <line x1="75" y1="52" x2="125" y2="52" stroke="#475569" stroke-width="2"/>

    <!-- Can Cone Neck -->
    <path d="M 60 75 L 140 75 L 175 105 L 25 105 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>

    <!-- Cylindrical Can Body -->
    <rect x="25" y="105" width="150" height="195" rx="8" fill="url(#metalCan)" stroke="#475569" stroke-width="2"/>

    <!-- Orange Label Body -->
    <rect x="25" y="125" width="150" height="140" fill="#ea580c"/>
    
    <text x="100" y="152" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">ASTRAL</text>
    <text x="100" y="175" font-family="Inter, system-ui, sans-serif" font-size="18" font-weight="900" fill="#fde047" text-anchor="middle">WELD-ON</text>
    <text x="100" y="196" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="900" fill="#ffffff" text-anchor="middle">714 HEAVY</text>
    <text x="100" y="215" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">CPVC SOLVENT CEMENT</text>
    <text x="100" y="245" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">250 ml</text>
  </g>

  <rect x="90" y="345" width="220" height="28" rx="14" fill="#ea580c"/>
  <text x="200" y="363" font-family="Inter, system-ui, sans-serif" font-size="10.5" font-weight="800" fill="#ffffff" text-anchor="middle">FAST SETTING HIGH PRESSURE</text>
</svg>
`,

  'cutting-wheel.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <radialGradient id="steelBlade" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#94a3b8"/>
      <stop offset="45%" stop-color="#475569"/>
      <stop offset="70%" stop-color="#334155"/>
      <stop offset="90%" stop-color="#ca8a04"/>
      <stop offset="100%" stop-color="#eab308"/>
    </radialGradient>
    <filter id="bladeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Rotating Diamond Blade -->
  <g filter="url(#bladeShadow)">
    <circle cx="200" cy="180" r="115" fill="url(#steelBlade)" stroke="#0f172a" stroke-width="2"/>
    
    <!-- Segmented Diamond Teeth Notches -->
    <circle cx="200" cy="180" r="115" fill="none" stroke="#fef08a" stroke-width="12" stroke-dasharray="16, 6"/>

    <!-- Inner Steel Flange -->
    <circle cx="200" cy="180" r="75" fill="#1e293b" stroke="#64748b" stroke-width="3"/>
    <circle cx="200" cy="180" r="30" fill="#f8fafc" stroke="#475569" stroke-width="4"/>
    <circle cx="200" cy="180" r="16" fill="#020617"/>

    <!-- Bosch Typography -->
    <text x="200" y="145" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="900" fill="#dc2626" text-anchor="middle" letter-spacing="1">BOSCH</text>
    <text x="200" y="162" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">PROFESSIONAL</text>
    <text x="200" y="215" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="800" fill="#fbbf24" text-anchor="middle">STANDARD FOR MARBLE</text>
    <text x="200" y="230" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="700" fill="#94a3b8" text-anchor="middle">105 x 20 / 16 mm</text>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#0b1d3a"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">4" DIAMOND CUTTING DISC</text>
</svg>
`,

  'pipe-wrench.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="ironRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="40%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <linearGradient id="steelJaw" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="50%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <filter id="wrenchSh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="6" dy="14" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Pipe Wrench Diagonal -->
  <g filter="url(#wrenchSh)" transform="translate(60, 40) rotate(-35 150 150)">
    <!-- Handle -->
    <path d="M 60 140 L 60 300 C 60 315, 85 315, 85 300 L 85 140 Z" fill="url(#ironRed)" stroke="#7f1d1d" stroke-width="2"/>
    <ellipse cx="72.5" cy="285" rx="5" ry="10" fill="#ffffff" opacity="0.4"/>

    <!-- Wrench Head Body -->
    <path d="M 45 90 L 100 90 L 95 145 L 50 145 Z" fill="url(#ironRed)" stroke="#7f1d1d" stroke-width="2"/>

    <!-- Knurled Adjusting Nut -->
    <rect x="52" y="80" width="40" height="16" rx="3" fill="#ca8a04" stroke="#a16207" stroke-width="1.5"/>

    <!-- Fixed Jaw with Serrated Teeth -->
    <path d="M 45 55 L 75 55 L 75 80 L 45 80 Z" fill="url(#steelJaw)" stroke="#334155" stroke-width="1.5"/>
    <line x1="75" y1="58" x2="68" y2="58" stroke="#0f172a" stroke-width="2"/>
    <line x1="75" y1="65" x2="68" y2="65" stroke="#0f172a" stroke-width="2"/>
    <line x1="75" y1="72" x2="68" y2="72" stroke="#0f172a" stroke-width="2"/>

    <!-- Moveable Hook Jaw -->
    <path d="M 70 20 L 120 20 L 120 70 L 100 70 L 100 35 L 70 35 Z" fill="url(#steelJaw)" stroke="#334155" stroke-width="2"/>
    <line x1="100" y1="42" x2="108" y2="42" stroke="#0f172a" stroke-width="2"/>
    <line x1="100" y1="50" x2="108" y2="50" stroke="#0f172a" stroke-width="2"/>
    <line x1="100" y1="58" x2="108" y2="58" stroke="#0f172a" stroke-width="2"/>

    <!-- Brand Stamp -->
    <text x="73" y="210" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle" transform="rotate(-90 73 210)">TAPARIA 10"</text>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#dc2626"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">DROP FORGED CARBON STEEL</text>
</svg>
`,

  'copper-wire.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="wireRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="50%" stop-color="#dc2626"/>
      <stop offset="100%" stop-color="#991b1b"/>
    </linearGradient>
    <filter id="coilSh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#991b1b" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Wire Coil Torus Loops -->
  <g filter="url(#coilSh)" transform="translate(40, 30)">
    <circle cx="160" cy="150" r="105" fill="none" stroke="url(#wireRed)" stroke-width="48"/>
    <circle cx="160" cy="150" r="105" fill="none" stroke="#ef4444" stroke-width="42"/>
    <circle cx="160" cy="150" r="105" fill="none" stroke="#b91c1c" stroke-width="32"/>

    <!-- Coil Bind Tape Straps -->
    <rect x="145" y="25" width="30" height="52" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    <rect x="145" y="223" width="30" height="52" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    <rect x="35" y="135" width="52" height="30" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
    <rect x="233" y="135" width="52" height="30" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>

    <!-- Exposed Bright Copper Wire Core End -->
    <path d="M 230 65 Q 260 50, 275 80" fill="none" stroke="#dc2626" stroke-width="8" stroke-linecap="round"/>
    <line x1="275" y1="80" x2="295" y2="70" stroke="#f97316" stroke-width="4" stroke-linecap="round"/>
    <line x1="275" y1="80" x2="292" y2="85" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>

    <!-- Center Label Disc -->
    <circle cx="160" cy="150" r="60" fill="#0b1d3a" stroke="#ffffff" stroke-width="3"/>
    <text x="160" y="140" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">FINOLEX</text>
    <text x="160" y="158" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="900" fill="#facc15" text-anchor="middle">1.5 SQ MM</text>
    <text x="160" y="174" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="800" fill="#38bdf8" text-anchor="middle">FR 90m COIL</text>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#0b1d3a"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">100% PURE ELECTROLYTIC COPPER</text>
</svg>
`,

  'asian-paints.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="apexBucket" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <filter id="paintSh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="14" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <g filter="url(#paintSh)" transform="translate(70, 45)">
    <!-- Wire Handle -->
    <path d="M 25 120 C 25 25, 235 25, 235 120" fill="none" stroke="#94a3b8" stroke-width="4"/>

    <!-- Lid -->
    <rect x="25" y="55" width="210" height="20" rx="10" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>

    <!-- Bucket Body -->
    <path d="M 35 75 L 50 250 C 55 270, 205 270, 210 250 L 225 75 Z" fill="url(#apexBucket)" stroke="#cbd5e1" stroke-width="2"/>

    <!-- Green & Gold Apex Band -->
    <rect x="42" y="115" width="176" height="95" fill="#15803d"/>
    <rect x="42" y="115" width="176" height="8" fill="#ca8a04"/>

    <text x="130" y="145" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">asianpaints</text>
    <text x="130" y="178" font-family="Inter, system-ui, sans-serif" font-size="28" font-weight="900" fill="#facc15" text-anchor="middle">APEX</text>
    <text x="130" y="196" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff" text-anchor="middle">WEATHERPROOF EXTERIOR EMULSION</text>

    <!-- 4 Litre Badge -->
    <circle cx="130" cy="235" r="16" fill="#0b1d3a"/>
    <text x="130" y="240" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">4 L</text>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#15803d"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">5-YEAR ANTI-ALGAL WARRANTY</text>
</svg>
`,

  'drywall-screws.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="screwMetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="screwSh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Main Screw 1 (Diagonal Center) -->
  <g filter="url(#screwSh)" transform="translate(80, 50) rotate(35 120 120)">
    <!-- Bugle Head -->
    <path d="M 90 40 C 90 55, 110 65, 115 75 L 125 75 C 130 65, 150 55, 150 40 Z" fill="url(#screwMetal)" stroke="#0f172a" stroke-width="2"/>
    <ellipse cx="120" cy="40" rx="30" ry="10" fill="#334155" stroke="#0f172a" stroke-width="2"/>
    <!-- Phillips Cross -->
    <line x1="120" y1="34" x2="120" y2="46" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="110" y1="40" x2="130" y2="40" stroke="#cbd5e1" stroke-width="3"/>

    <!-- Threaded Shaft -->
    <path d="M 115 75 L 115 220 L 120 240 L 125 220 L 125 75 Z" fill="url(#screwMetal)"/>
    <!-- Serrated Spiral Threads -->
    <path d="M 110 95 L 130 85 M 110 115 L 130 105 M 110 135 L 130 125 M 110 155 L 130 145 M 110 175 L 130 165 M 110 195 L 130 185 M 112 215 L 128 205" stroke="#94a3b8" stroke-width="3"/>
  </g>

  <!-- Secondary Screw 2 (Angled Behind) -->
  <g filter="url(#screwSh)" transform="translate(140, 90) rotate(-40 100 100)">
    <path d="M 90 40 C 90 55, 110 65, 115 75 L 125 75 C 130 65, 150 55, 150 40 Z" fill="url(#screwMetal)"/>
    <ellipse cx="120" cy="40" rx="26" ry="8" fill="#334155"/>
    <path d="M 115 75 L 115 200 L 120 220 L 125 200 L 125 75 Z" fill="url(#screwMetal)"/>
    <path d="M 110 95 L 130 85 M 110 120 L 130 110 M 110 145 L 130 135 M 110 170 L 130 160" stroke="#94a3b8" stroke-width="3"/>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#0b1d3a"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">GYPROC PROX • BOX OF 100</text>
</svg>
`,

  'tata-tmt.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f8fafc"/>
    </radialGradient>
    <linearGradient id="rebarSteel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#64748b"/>
      <stop offset="30%" stop-color="#cbd5e1"/>
      <stop offset="65%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="rebarSh" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="8" dy="16" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>

  <!-- Three Grouped Ribbed Rebars -->
  <g filter="url(#rebarSh)" transform="translate(60, 40) rotate(-25 140 140)">
    <!-- Rod 1 -->
    <rect x="50" y="20" width="34" height="300" rx="6" fill="url(#rebarSteel)" stroke="#1e293b" stroke-width="2"/>
    <g stroke="#94a3b8" stroke-width="3">
      <line x1="50" y1="50" x2="84" y2="40"/>
      <line x1="50" y1="80" x2="84" y2="70"/>
      <line x1="50" y1="110" x2="84" y2="100"/>
      <line x1="50" y1="140" x2="84" y2="130"/>
      <line x1="50" y1="170" x2="84" y2="160"/>
      <line x1="50" y1="200" x2="84" y2="190"/>
      <line x1="50" y1="230" x2="84" y2="220"/>
      <line x1="50" y1="260" x2="84" y2="250"/>
      <line x1="50" y1="290" x2="84" y2="280"/>
    </g>

    <!-- Rod 2 (Center Primary) -->
    <rect x="100" y="10" width="38" height="320" rx="6" fill="url(#rebarSteel)" stroke="#0f172a" stroke-width="2.5"/>
    <g stroke="#ffffff" stroke-width="3.5">
      <line x1="100" y1="40" x2="138" y2="30"/>
      <line x1="100" y1="70" x2="138" y2="60"/>
      <line x1="100" y1="100" x2="138" y2="90"/>
      <line x1="100" y1="130" x2="138" y2="120"/>
      <line x1="100" y1="160" x2="138" y2="150"/>
      <line x1="100" y1="190" x2="138" y2="180"/>
      <line x1="100" y1="220" x2="138" y2="210"/>
      <line x1="100" y1="250" x2="138" y2="240"/>
      <line x1="100" y1="280" x2="138" y2="270"/>
      <line x1="100" y1="310" x2="138" y2="300"/>
    </g>

    <!-- Rod 3 -->
    <rect x="155" y="30" width="34" height="290" rx="6" fill="url(#rebarSteel)" stroke="#1e293b" stroke-width="2"/>
    <g stroke="#94a3b8" stroke-width="3">
      <line x1="155" y1="60" x2="189" y2="50"/>
      <line x1="155" y1="90" x2="189" y2="80"/>
      <line x1="155" y1="120" x2="189" y2="110"/>
      <line x1="155" y1="150" x2="189" y2="140"/>
      <line x1="155" y1="180" x2="189" y2="170"/>
      <line x1="155" y1="210" x2="189" y2="200"/>
      <line x1="155" y1="240" x2="189" y2="230"/>
      <line x1="155" y1="270" x2="189" y2="260"/>
    </g>

    <!-- Brand Tag Flag -->
    <rect x="90" y="160" width="100" height="26" rx="4" fill="#0b1d3a" stroke="#ffffff" stroke-width="1.5"/>
    <text x="140" y="177" font-family="Inter, system-ui, sans-serif" font-size="10" font-weight="900" fill="#facc15" text-anchor="middle">TATA TISCON 12mm</text>
  </g>

  <rect x="90" y="340" width="220" height="30" rx="15" fill="#0b1d3a"/>
  <text x="200" y="360" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="800" fill="#ffffff" text-anchor="middle">FE-550D SUPER DUCTILE REBAR</text>
</svg>
`
};

for (const [filename, content] of Object.entries(products)) {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  console.log('Generated:', filename);
}
console.log('All 14 product images generated successfully!');
