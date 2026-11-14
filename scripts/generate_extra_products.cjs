const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const svgs = {
  'brass-tap.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/><stop offset="30%" stop-color="#94a3b8"/><stop offset="50%" stop-color="#e2e8f0"/><stop offset="70%" stop-color="#64748b"/><stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)">
    <path d="M110 200 L180 200 L180 240 L160 270 L130 270 L140 240 L110 240 Z" fill="url(#chrome)" stroke="#475569" stroke-width="2"/>
    <rect x="80" y="190" width="35" height="30" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="2"/>
    <path d="M170 140 L190 140 L190 200 L170 200 Z" fill="url(#chrome)"/>
    <ellipse cx="180" cy="135" rx="35" ry="12" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
    <rect x="165" y="115" width="30" height="20" rx="5" fill="#2563eb"/>
  </g>
  <rect x="90" y="335" width="220" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">CERA BRASS BIB TAP</text>
</svg>`,

  'cpvc-brass-fta.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <linearGradient id="brass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/><stop offset="50%" stop-color="#ca8a04"/><stop offset="100%" stop-color="#854d0e"/>
    </linearGradient>
    <linearGradient id="cpvc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fef9c3"/><stop offset="50%" stop-color="#fde68a"/><stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)">
    <rect x="130" y="160" width="140" height="110" rx="12" fill="url(#cpvc)" stroke="#d97706" stroke-width="2"/>
    <rect x="150" y="100" width="100" height="65" rx="6" fill="url(#brass)" stroke="#a16207" stroke-width="2"/>
    <line x1="150" y1="115" x2="250" y2="115" stroke="#713f12" stroke-width="2"/>
    <line x1="150" y1="130" x2="250" y2="130" stroke="#713f12" stroke-width="2"/>
    <line x1="150" y1="145" x2="250" y2="145" stroke="#713f12" stroke-width="2"/>
    <circle cx="200" cy="215" r="28" fill="#d97706" opacity="0.2"/>
  </g>
  <rect x="90" y="335" width="220" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">ASHIRVAD BRASS FTA</text>
</svg>`,

  'modular-switch.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)">
    <rect x="110" y="90" width="180" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
    <rect x="145" y="135" width="110" height="130" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <line x1="145" y1="200" x2="255" y2="200" stroke="#cbd5e1" stroke-width="2"/>
    <circle cx="200" cy="165" r="5" fill="#ef4444"/>
    <rect x="190" y="225" width="20" height="4" rx="2" fill="#64748b"/>
  </g>
  <rect x="90" y="335" width="220" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">ANCHOR ROMA 6A SWITCH</text>
</svg>`,

  'havells-mcb.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#f1f5f9"/></radialGradient>
    <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <g filter="url(#shadow)">
    <rect x="135" y="80" width="130" height="240" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    <rect x="155" y="145" width="90" height="75" rx="6" fill="#1e293b"/>
    <rect x="170" y="155" width="60" height="30" rx="4" fill="#ff6b00"/>
    <rect x="150" y="255" width="100" height="40" rx="4" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
    <text x="200" y="278" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="900" fill="#0b1d3a" text-anchor="middle">C16</text>
  </g>
  <rect x="90" y="335" width="220" height="34" rx="17" fill="#0b1d3a" opacity="0.95"/>
  <text x="200" y="357" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">HAVELLS 16A MCB</text>
</svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(dir, name), content.trim());
  console.log('Saved', name);
}
