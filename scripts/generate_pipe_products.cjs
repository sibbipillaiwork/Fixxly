const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'cpvc-pipe.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <linearGradient id="pipeBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="30%" stop-color="#fde68a"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)" transform="rotate(-30 200 200)">
    <!-- Main 1" CPVC Pipe Tube -->
    <rect x="50" y="165" width="300" height="70" rx="10" fill="url(#pipeBody)" stroke="#d97706" stroke-width="2"/>
    <!-- Red Characteristic CPVC Line -->
    <rect x="50" y="195" width="300" height="10" fill="#dc2626"/>
    <!-- End collar -->
    <rect x="40" y="158" width="25" height="84" rx="6" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
    <ellipse cx="40" cy="200" rx="10" ry="42" fill="#78350f"/>
    <!-- Brand text along pipe -->
    <text x="210" y="185" font-family="Inter, sans-serif" font-size="11" font-weight="900" fill="#78350f" letter-spacing="1">ASHIRVAD FLOWGUARD PLUS CPVC 1" SDR 11</text>
  </g>
  <rect x="80" y="335" width="240" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">ASHIRVAD CPVC PIPE 1"</text>
</svg>`,

  'upvc-pipe.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <linearGradient id="upvcBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="40%" stop-color="#f1f5f9"/>
      <stop offset="80%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)" transform="rotate(-30 200 200)">
    <!-- Main 1" UPVC Pipe Tube -->
    <rect x="50" y="165" width="300" height="70" rx="10" fill="url(#upvcBody)" stroke="#94a3b8" stroke-width="2"/>
    <!-- Blue Characteristic UPVC Line -->
    <rect x="50" y="195" width="300" height="10" fill="#2563eb"/>
    <!-- End collar -->
    <rect x="40" y="158" width="25" height="84" rx="6" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
    <ellipse cx="40" cy="200" rx="10" ry="42" fill="#334155"/>
    <text x="210" y="185" font-family="Inter, sans-serif" font-size="11" font-weight="900" fill="#1e293b" letter-spacing="1">SUPREME AQUAGOLD UPVC 1" SCH 40</text>
  </g>
  <rect x="80" y="335" width="240" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">SUPREME UPVC PIPE 1"</text>
</svg>`,

  'cpvc-tee.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <linearGradient id="cpvcTee" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef3c7"/>
      <stop offset="50%" stop-color="#fde68a"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)">
    <!-- Horizontal Branch -->
    <rect x="90" y="170" width="220" height="60" rx="8" fill="url(#cpvcTee)" stroke="#d97706" stroke-width="2"/>
    <!-- Vertical Branch -->
    <rect x="170" y="110" width="60" height="120" rx="8" fill="url(#cpvcTee)" stroke="#d97706" stroke-width="2"/>
    <!-- Socket Collars -->
    <rect x="80" y="165" width="20" height="70" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
    <rect x="300" y="165" width="20" height="70" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
    <rect x="165" y="100" width="70" height="20" rx="4" fill="#fde68a" stroke="#d97706" stroke-width="2"/>
  </g>
  <rect x="80" y="335" width="240" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">ASHIRVAD CPVC TEE 1"</text>
</svg>`,

  'ball-valve.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <linearGradient id="valveBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#e2e8f0"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)">
    <!-- Valve Body Pipe Connection -->
    <rect x="100" y="180" width="200" height="50" rx="8" fill="url(#valveBody)" stroke="#64748b" stroke-width="2"/>
    <rect x="85" y="175" width="25" height="60" rx="4" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
    <rect x="290" y="175" width="25" height="60" rx="4" fill="#cbd5e1" stroke="#64748b" stroke-width="2"/>
    <!-- Center Ball Chamber -->
    <circle cx="200" cy="205" r="42" fill="url(#valveBody)" stroke="#475569" stroke-width="2"/>
    <!-- Orange Quarter-Turn Lever Handle -->
    <rect x="185" y="140" width="30" height="30" rx="4" fill="#334155"/>
    <rect x="180" y="115" width="120" height="26" rx="13" fill="#ff6b00" stroke="#c2410c" stroke-width="2"/>
    <circle cx="195" cy="128" r="7" fill="#ffffff"/>
  </g>
  <rect x="80" y="335" width="240" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">PVC BALL VALVE 1"</text>
</svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, name), content.trim());
  console.log('Saved', name);
}
