export interface ProductOption {
  id: string;
  label: string;
  price: number;
  mrp: number;
  discount_percent: number;
  spec: string;
}

export type TradeRole =
  | 'All'
  | 'Electrician'
  | 'Plumber'
  | 'Painter'
  | 'Carpenter'
  | 'Civil & General Contractor';

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  categoryId: string;
  delivery_time_mins: number;
  image: string;
  spec: string;
  unit: string;
  price: number;
  mrp: number;
  discount_percent: number;
  rating: number;
  reviews_count: number;
  in_stock: boolean;
  tags: string[];
  tradeRoles?: TradeRole[];
  has_options?: boolean;
  options?: ProductOption[];
  badge?: string;
  description?: string;
}

export interface SolutionBundleItem {
  id: string;
  name: string;
  spec: string;
  price: number;
  mrp: number;
  image: string;
  brand: string;
}

export interface SolutionBundle {
  id: string;
  problem_query: string;
  title: string;
  subtitle: string;
  items: SolutionBundleItem[];
  bundle_price: number;
  bundle_mrp: number;
  bundle_discount_percent: number;
  delivery_time_mins: number;
  badge: string;
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  // --- GASKETS & PLUMBING ACCESSORIES ---
  {
    id: "SKU_GASKET_RUBBER_1IN",
    name: "Heavy Duty Rubber Gasket O-Ring (Pack of 10)",
    brand: "ASHIRVAD",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 28,
    image: "/products/o-ring.svg",
    spec: "Size: 1\" (Pack of 10)",
    unit: "Pack of 10 pcs",
    price: 36,
    mrp: 100,
    discount_percent: 64,
    rating: 4.8,
    reviews_count: 1420,
    in_stock: true,
    tags: ["pipe ka ring", "rubber gasket", "o-ring", "nal ring", "pipe washer", "plumbing gasket", "ashirvad", "washer"],
    has_options: true,
    options: [
      { id: "opt_12", label: "1/2 Inch", price: 24, mrp: 70, discount_percent: 65, spec: "Size: 1/2\" (Pack of 10)" },
      { id: "opt_34", label: "3/4 Inch", price: 30, mrp: 85, discount_percent: 64, spec: "Size: 3/4\" (Pack of 10)" },
      { id: "opt_1in", label: "1 Inch", price: 36, mrp: 100, discount_percent: 64, spec: "Size: 1\" (Pack of 10)" },
      { id: "opt_15", label: "1.5 Inch", price: 54, mrp: 140, discount_percent: 61, spec: "Size: 1.5\" (Pack of 10)" }
    ],
    description: "High elasticity EPDM synthetic rubber O-rings designed for leak-free CPVC and PVC pipe joints under high pressure."
  },
  {
    id: "SKU_TEFLON_TAPE_SUPREME",
    name: "Supreme PTFE Teflon Thread Seal Plumbing Tape (12mm x 10m)",
    brand: "SUPREME",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 25,
    image: "/products/teflon-tape.svg",
    spec: "12mm x 10m • Grade A",
    unit: "1 Roll",
    price: 18,
    mrp: 35,
    discount_percent: 48,
    rating: 4.9,
    reviews_count: 3200,
    in_stock: true,
    tags: ["teflon", "dhaga tape", "thread tape", "plumber tape", "ptfe", "supreme", "pipe leak tape"],
    has_options: true,
    options: [
      { id: "opt_roll1", label: "1 Roll", price: 18, mrp: 35, discount_percent: 48, spec: "12mm x 10m (1 Roll)" },
      { id: "opt_pack5", label: "Pack of 5", price: 75, mrp: 175, discount_percent: 57, spec: "5 Rolls (Contractor Box)" },
      { id: "opt_pack10", label: "Pack of 10", price: 135, mrp: 350, discount_percent: 61, spec: "10 Rolls (Jumbo Bulk)" }
    ],
    description: "Density grade pure virgin PTFE film ensures 100% watertight seal across brass, iron, and CPVC threads."
  },
  {
    id: "SKU_CPVC_ELBOW_ASHIRVAD",
    name: "Ashirvad FlowGuard CPVC 90 Degree Elbow 1\"",
    brand: "ASHIRVAD",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 28,
    image: "/products/cpvc-elbow.svg",
    spec: "Size: 1\" (SDR 11)",
    unit: "Piece",
    price: 48,
    mrp: 80,
    discount_percent: 40,
    rating: 4.7,
    reviews_count: 890,
    in_stock: true,
    tags: ["elbow", "elbow 1 inch", "cpvc elbow", "pipe bend", "ashirvad", "flowguard", "bend 90"],
    has_options: true,
    options: [
      { id: "opt_e_12", label: "1/2 Inch", price: 22, mrp: 40, discount_percent: 45, spec: "1/2\" CPVC Elbow" },
      { id: "opt_e_34", label: "3/4 Inch", price: 32, mrp: 55, discount_percent: 41, spec: "3/4\" CPVC Elbow" },
      { id: "opt_e_1", label: "1 Inch", price: 48, mrp: 80, discount_percent: 40, spec: "1\" CPVC Elbow" }
    ],
    description: "NSF-certified chlorinating polyvinyl chloride fitting tested for high temperature and pressure water supply."
  },

  // --- WATERPROOFING & CHEMICALS ---
  {
    id: "SKU_PIDIPROOF_LW_1L",
    name: "Dr. Fixit 101 Pidiproof LW+ Integral Waterproofing Liquid",
    brand: "PIDILITE",
    category: "Waterproofing & Chemicals",
    categoryId: "waterproofing-chemicals",
    tradeRoles: ["Civil & General Contractor", "Painter"],
    delivery_time_mins: 26,
    image: "/products/pidiproof-lw.svg",
    spec: "1L Jar",
    unit: "1 Litre",
    price: 185,
    mrp: 260,
    discount_percent: 29,
    rating: 4.9,
    reviews_count: 4100,
    in_stock: true,
    tags: ["pidipruf", "pidiproof", "dr fixit", "waterproofing", "cement liquid", "dampness", "pidilite", "pideeproof"],
    has_options: true,
    options: [
      { id: "opt_p_1l", label: "1 Litre", price: 185, mrp: 260, discount_percent: 29, spec: "1L Jar" },
      { id: "opt_p_5l", label: "5 Litre", price: 820, mrp: 1200, discount_percent: 32, spec: "5L Can" },
      { id: "opt_p_20l", label: "20 Litre Drum", price: 2950, mrp: 4600, discount_percent: 36, spec: "20L Drum" }
    ],
    description: "Specially formulated integral liquid waterproofing compound composed of surface active plasticising agents and polymers."
  },
  {
    id: "SKU_DR_FIXIT_CRACK_SEAL",
    name: "Dr. Fixit Crack-X Paste Waterproof Crack Filler (500g)",
    brand: "PIDILITE",
    category: "Waterproofing & Chemicals",
    categoryId: "waterproofing-chemicals",
    tradeRoles: ["Painter", "Civil & General Contractor"],
    delivery_time_mins: 28,
    image: "/products/crack-x.svg",
    spec: "500g Tub",
    unit: "500 g",
    price: 120,
    mrp: 175,
    discount_percent: 31,
    rating: 4.6,
    reviews_count: 730,
    in_stock: true,
    tags: ["crack seal", "deewar darar", "crack filler", "wall crack", "waterproofing", "pidilite", "crackx"],
    description: "Single component acrylic emulsion based crack filler for internal and external plaster cracks up to 5mm."
  },

  // --- ADHESIVES & SEALANTS ---
  {
    id: "SKU_FEVICOL_SH_1KG",
    name: "Fevicol SH Ultimate Synthetic Resin Wood Adhesive (1 kg)",
    brand: "PIDILITE",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Carpenter"],
    delivery_time_mins: 25,
    image: "/products/fevicol-sh.svg",
    spec: "1 kg Tub",
    unit: "1 kg",
    price: 245,
    mrp: 320,
    discount_percent: 23,
    rating: 4.9,
    reviews_count: 5600,
    in_stock: true,
    tags: ["fevicol", "fevikol", "wood glue", "lakdi glue", "synthetic resin", "pidilite", "sh adhesive", "carpentry glue", "sunmica adhesive"],
    has_options: true,
    options: [
      { id: "opt_f_500", label: "500g", price: 135, mrp: 175, discount_percent: 23, spec: "500 Grams" },
      { id: "opt_f_1kg", label: "1kg", price: 245, mrp: 320, discount_percent: 23, spec: "1 Kilogram" },
      { id: "opt_f_5kg", label: "5kg Bucket", price: 1090, mrp: 1480, discount_percent: 26, spec: "5 Kilograms" }
    ],
    description: "India's #1 wood adhesive with superior 48-hour bonding strength for ply, laminate, MDF, and particle boards."
  },
  {
    id: "SKU_FEVICOL_MARINE_1KG",
    name: "Fevicol Marine Waterproof Wood Adhesive (1 kg)",
    brand: "PIDILITE",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Carpenter"],
    delivery_time_mins: 25,
    image: "/products/fevicol-marine.svg",
    spec: "1 kg Waterproof Bucket",
    unit: "1 kg",
    price: 295,
    mrp: 380,
    discount_percent: 22,
    rating: 4.9,
    reviews_count: 3840,
    in_stock: true,
    tags: ["fevicol", "fevicol marine", "marine glue", "waterproof wood glue", "pidilite", "adhesive", "wood adhesive", "fevikol", "waterproof adhesive"],
    has_options: true,
    options: [
      { id: "opt_fm_1kg", label: "1kg Bucket", price: 295, mrp: 380, discount_percent: 22, spec: "1 Kilogram" },
      { id: "opt_fm_5kg", label: "5kg Bucket", price: 1350, mrp: 1780, discount_percent: 24, spec: "5 Kilograms" }
    ],
    description: "Specialized waterproof adhesive designed for kitchens, bathrooms, and exterior furniture with 48-hr boiling water resistance."
  },
  {
    id: "SKU_GLUE_BRUSH_25IN",
    name: "Asian Paints TruCare 2.5\" Synthetic Bristle Glue & Paint Brush",
    brand: "ASIAN PAINTS",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Carpenter", "Painter"],
    delivery_time_mins: 20,
    image: "/products/glue-brush.svg",
    spec: "2.5\" Width • Stainless Ferrule",
    unit: "1 Brush",
    price: 45,
    mrp: 75,
    discount_percent: 40,
    rating: 4.8,
    reviews_count: 1490,
    in_stock: true,
    tags: ["brush", "glue brush", "paint brush", "adhesive brush", "fevicol brush", "fevicol", "trucare", "application brush", "carpenter brush"],
    has_options: true,
    options: [
      { id: "opt_b_2in", label: "2 Inch", price: 38, mrp: 65, discount_percent: 41, spec: "2\" Width" },
      { id: "opt_b_25in", label: "2.5 Inch", price: 45, mrp: 75, discount_percent: 40, spec: "2.5\" Width" },
      { id: "opt_b_3in", label: "3 Inch", price: 58, mrp: 95, discount_percent: 39, spec: "3\" Width" }
    ],
    description: "Dense 100% synthetic bristles engineered for streak-free application of Fevicol wood adhesive, primers, and enamel paints."
  },
  {
    id: "SKU_FEVIKWIK_4PACK",
    name: "Fevikwik Instant Heavy-Duty Super Glue (Pack of 4)",
    brand: "PIDILITE",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Carpenter"],
    delivery_time_mins: 18,
    image: "/products/fevikwik.svg",
    spec: "3g x 4 Tubes (12g Total)",
    unit: "Pack of 4",
    price: 36,
    mrp: 40,
    discount_percent: 10,
    rating: 4.8,
    reviews_count: 6720,
    in_stock: true,
    tags: ["fevikwik", "feviquick", "fevicol", "instant glue", "super glue", "quick glue", "pidilite", "adhesive"],
    description: "One-drop instant bonding cyanoacrylate adhesive for instant site repairs of wood, plastics, rubber, and metal."
  },
  {
    id: "SKU_FEVICOL_MR_100G",
    name: "Fevicol MR General Purpose Wood & Craft Squeezy Adhesive (100g)",
    brand: "PIDILITE",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Carpenter"],
    delivery_time_mins: 20,
    image: "/products/fevicol-mr.svg",
    spec: "100g Squeeze Bottle with Nozzle",
    unit: "1 Bottle",
    price: 35,
    mrp: 45,
    discount_percent: 22,
    rating: 4.7,
    reviews_count: 2190,
    in_stock: true,
    tags: ["fevicol", "fevicol mr", "wood glue", "craft glue", "pidilite", "adhesive", "glue bottle"],
    description: "Precision nozzle squeeze bottle for clean wood edge-banding, craft bonding, and quick surface adhesion."
  },
  {
    id: "SKU_MASKING_TAPE_PIDILITE",
    name: "Pidilite 1\" Woodworking Masking Tape (24mm x 25m)",
    brand: "PIDILITE",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Carpenter", "Painter"],
    delivery_time_mins: 22,
    image: "/products/masking-tape.svg",
    spec: "24mm x 25m • Residue-Free",
    unit: "1 Roll",
    price: 42,
    mrp: 65,
    discount_percent: 35,
    rating: 4.8,
    reviews_count: 1870,
    in_stock: true,
    tags: ["masking tape", "tape", "wood tape", "laminate tape", "fevicol tape", "adhesive tape", "fevicol"],
    description: "High-tack crepe paper tape designed for holding glued laminate sheets in place without leaving adhesive residue."
  },
  {
    id: "SKU_MSEAL_EPOXY_90G",
    name: "Pidilite M-Seal Regular Epoxy Sealant Putty Compound (90g)",
    brand: "PIDILITE",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Plumber", "Civil & General Contractor"],
    delivery_time_mins: 20,
    image: "/products/m-seal.svg",
    spec: "90g (Resin + Hardener)",
    unit: "1 Pack",
    price: 35,
    mrp: 50,
    discount_percent: 30,
    rating: 4.8,
    reviews_count: 2900,
    in_stock: true,
    tags: ["m-seal", "mseal", "emseal", "epoxy putty", "pidilite", "pipe leak", "joint seal"],
    has_options: true,
    options: [
      { id: "opt_ms_90", label: "90g", price: 35, mrp: 50, discount_percent: 30, spec: "90g Pack" },
      { id: "opt_ms_contractor", label: "Pack of 6", price: 190, mrp: 300, discount_percent: 37, spec: "Pack of 6 (90g each)" }
    ],
    description: "Versatile 2-part epoxy compound that cures rock-hard within 90 minutes. Seals leaks in metal, plastic, and concrete."
  },
  {
    id: "SKU_ASTRAL_WELDON_SOLVENT",
    name: "Astral Weld-On 714 Heavy Duty CPVC Solvent Cement (250ml)",
    brand: "ASTRAL",
    category: "Adhesives & Sealants",
    categoryId: "adhesives-sealants",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 28,
    image: "/products/solvent-cement.svg",
    spec: "250ml Metal Can with Dauber",
    unit: "250 ml",
    price: 195,
    mrp: 275,
    discount_percent: 29,
    rating: 4.7,
    reviews_count: 940,
    in_stock: true,
    tags: ["pipe glue", "pvc solvent", "cpvc solution", "astral", "weldon", "solvent cement", "pipe chipkana"],
    description: "Low VOC medium-bodied orange CPVC cement designed for high-stress hot and cold plumbing installations."
  },

  // --- POWER TOOLS & HARDWARE ---
  {
    id: "SKU_BOSCH_CUTTING_WHEEL_4IN",
    name: "Bosch 4\" Standard Diamond Cutting Wheel Disc for Marble/Tiles",
    brand: "BOSCH",
    category: "Power Tools",
    categoryId: "power-tools",
    tradeRoles: ["Civil & General Contractor", "Carpenter"],
    delivery_time_mins: 24,
    image: "/products/cutting-wheel.svg",
    spec: "Diameter: 105mm (4\") • 20mm Bore",
    unit: "1 Blade",
    price: 145,
    mrp: 299,
    discount_percent: 51,
    rating: 4.8,
    reviews_count: 1820,
    in_stock: true,
    tags: ["cutting wheel", "grinder blade", "bosch", "patthar blade", "marble cutting", "tile blade", "diamond blade"],
    has_options: true,
    options: [
      { id: "opt_b1", label: "Single Disc", price: 145, mrp: 299, discount_percent: 51, spec: "1 Blade" },
      { id: "opt_b5", label: "Pack of 5 Discs", price: 620, mrp: 1495, discount_percent: 59, spec: "5 Blades (Trade Box)" }
    ],
    description: "Laser-welded diamond cutting segments engineered for clean, splinter-free cuts in ceramic tiles, granite, and masonry."
  },
  {
    id: "SKU_TAPARIA_PIPE_WRENCH",
    name: "Taparia 10-Inch Heavy Duty Cast Iron Adjustable Pipe Wrench",
    brand: "TAPARIA",
    category: "Power Tools",
    categoryId: "power-tools",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 27,
    image: "/products/pipe-wrench.svg",
    spec: "Length: 250mm (10\") • Max Jaw: 48mm",
    unit: "Piece",
    price: 345,
    mrp: 495,
    discount_percent: 30,
    rating: 4.8,
    reviews_count: 1100,
    in_stock: true,
    tags: ["pipe wrench", "panha", "taparia", "wrench", "pipe kholne wala", "adjustable wrench", "plumbing tools"],
    description: "Drop-forged hardened carbon steel teeth ensure slip-free non-marring grip on threaded plumbing tubes."
  },

  // --- ELECTRICALS & WIRING ---
  {
    id: "SKU_FINOLEX_WIRE_15",
    name: "Finolex 1.5 sq mm FR Flame Retardant PVC Insulated Copper Wire (90m)",
    brand: "FINOLEX",
    category: "Electricals & Wiring",
    categoryId: "electricals-wiring",
    tradeRoles: ["Electrician"],
    delivery_time_mins: 30,
    image: "/products/copper-wire.svg",
    spec: "1.5 sq mm • 90m Coil (Red)",
    unit: "90m Coil",
    price: 1890,
    mrp: 2650,
    discount_percent: 28,
    rating: 4.9,
    reviews_count: 2450,
    in_stock: true,
    tags: ["wire 1.5", "finolex", "taar 1.5", "bijli wire", "copper wire", "1.5 wire", "electrical cable"],
    has_options: true,
    options: [
      { id: "opt_w_red", label: "Red (Phase)", price: 1890, mrp: 2650, discount_percent: 28, spec: "1.5 sq mm Red 90m" },
      { id: "opt_w_blk", label: "Black (Neutral)", price: 1890, mrp: 2650, discount_percent: 28, spec: "1.5 sq mm Black 90m" },
      { id: "opt_w_grn", label: "Green (Earth)", price: 1890, mrp: 2650, discount_percent: 28, spec: "1.5 sq mm Green 90m" }
    ],
    description: "100% electrolytic grade multi-strand copper conductors with self-extinguishing flame retardant insulation."
  },

  // --- PAINTS & FINISHES ---
  {
    id: "SKU_ASIAN_APEX_DISTEMPER",
    name: "Asian Paints Apex Weatherproof Exterior Acrylic Emulsion (4 Litres)",
    brand: "ASIAN PAINTS",
    category: "Paints & Finishes",
    categoryId: "paints-finishes",
    tradeRoles: ["Painter"],
    delivery_time_mins: 29,
    image: "/products/asian-paints.svg",
    spec: "4 Litre Bucket • Brilliant White",
    unit: "4 Litres",
    price: 1140,
    mrp: 1480,
    discount_percent: 23,
    rating: 4.7,
    reviews_count: 1650,
    in_stock: true,
    tags: ["cement paint", "safedi paint", "asian paints", "apex", "distemper", "exterior paint", "white paint"],
    description: "Modified acrylic emulsion with silicon additives providing 5-year anti-algal and weather protection."
  },

  // --- FASTENERS & DRYWALL ---
  {
    id: "SKU_GYPROC_DRYWALL_SCREWS",
    name: "Gyproc ProX Hardened Steel Drywall Self-Tapping Screws (Box of 100)",
    brand: "GYPROC",
    category: "Fasteners & Hardware",
    categoryId: "fasteners-hardware",
    tradeRoles: ["Carpenter", "Civil & General Contractor"],
    delivery_time_mins: 25,
    image: "/products/drywall-screws.svg",
    spec: "Size: 3.5 x 25mm (100 Pcs)",
    unit: "Box of 100",
    price: 85,
    mrp: 160,
    discount_percent: 47,
    rating: 4.8,
    reviews_count: 670,
    in_stock: true,
    tags: ["screw", "star screw", "gyproc screw", "drywall screw", "black screw", "gyproc", "hardware screw"],
    has_options: true,
    options: [
      { id: "opt_sc_25", label: "25mm (1\")", price: 85, mrp: 160, discount_percent: 47, spec: "Box of 100 (25mm)" },
      { id: "opt_sc_38", label: "38mm (1.5\")", price: 115, mrp: 210, discount_percent: 45, spec: "Box of 100 (38mm)" },
      { id: "opt_sc_50", label: "50mm (2\")", price: 145, mrp: 260, discount_percent: 44, spec: "Box of 100 (50mm)" }
    ],
    description: "Phosphated anti-corrosion bugle head screws with sharp piercing points for false ceiling framing."
  },

  // --- CEMENT & STRUCTURAL STEEL ---
  {
    id: "SKU_TATA_TMT_12MM",
    name: "Tata Tiscon 550D High Ductility Fe-550 TMT Rebar (12mm)",
    brand: "TATA TMT",
    category: "Steel & Aggregates",
    categoryId: "steel-aggregates",
    tradeRoles: ["Civil & General Contractor"],
    delivery_time_mins: 30,
    image: "/products/tata-tmt.svg",
    spec: "12mm Diameter • 12m Standard Length",
    unit: "1 Rod (10.6 kg)",
    price: 760,
    mrp: 950,
    discount_percent: 20,
    rating: 4.9,
    reviews_count: 2100,
    in_stock: true,
    tags: ["sariya", "tmt sariya", "tata tiscon", "lohe ka rod", "tmt rebar", "12mm rod", "steel bar"],
    description: "Super-ductile ribbed rebar engineered for superior earthquake resistance and green building standards."
  },

  // --- COMPREHENSIVE PIPE & PLUMBING ESSENTIALS ---
  {
    id: "SKU_ASHIRVAD_CPVC_PIPE_1IN",
    name: "Ashirvad FlowGuard Plus CPVC Plumbing Pipe 1\" (3m)",
    brand: "ASHIRVAD",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 28,
    image: "/products/cpvc-pipe.svg",
    spec: "1\" (25mm) • SDR 11 Class 1 • 3m Length",
    unit: "1 Pipe (3m)",
    price: 385,
    mrp: 520,
    discount_percent: 26,
    rating: 4.9,
    reviews_count: 3120,
    in_stock: true,
    tags: ["pipe", "cpvc pipe", "plumbing pipe", "ashirvad pipe", "water pipe", "1 inch pipe", "hot cold water pipe", "nal pipe", "pvc pipe"],
    description: "FlowGuard Plus chlorinated polyvinyl chloride pipe certified for high-temperature and high-pressure potable water systems."
  },
  {
    id: "SKU_SUPREME_UPVC_PIPE_1IN",
    name: "Supreme AquaGold UPVC High Pressure Pipe 1\" (3m)",
    brand: "SUPREME",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 25,
    image: "/products/upvc-pipe.svg",
    spec: "1\" (25mm) • Schedule 40 • 3m Length",
    unit: "1 Pipe (3m)",
    price: 290,
    mrp: 410,
    discount_percent: 29,
    rating: 4.8,
    reviews_count: 2450,
    in_stock: true,
    tags: ["pipe", "upvc pipe", "pvc pipe", "plumbing pipe", "supreme pipe", "water pipe", "cold water pipe", "drainage pipe"],
    description: "Lead-free unplasticized PVC pressure pipe engineered for commercial and residential cold water distribution lines."
  },
  {
    id: "SKU_ASHIRVAD_CPVC_TEE_1IN",
    name: "Ashirvad FlowGuard CPVC Equal Tee Fitting 1\"",
    brand: "ASHIRVAD",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 28,
    image: "/products/cpvc-tee.svg",
    spec: "Size: 1\" (25mm) Equal Tee • SDR 11",
    unit: "1 Piece",
    price: 62,
    mrp: 95,
    discount_percent: 35,
    rating: 4.8,
    reviews_count: 1820,
    in_stock: true,
    tags: ["pipe", "tee", "cpvc tee", "pipe tee", "pipe joint", "ashirvad", "pipe fitting", "t joint", "plumbing tee"],
    description: "Molded CPVC equal 3-way tee fitting for branching pressurized water distribution pipelines."
  },
  {
    id: "SKU_SUPREME_BALL_VALVE_1IN",
    name: "Supreme PVC Heavy-Duty Compact Ball Valve 1\"",
    brand: "SUPREME",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 25,
    image: "/products/ball-valve.svg",
    spec: "1\" (25mm) Socket • Quarter Turn",
    unit: "1 Piece",
    price: 145,
    mrp: 210,
    discount_percent: 31,
    rating: 4.9,
    reviews_count: 1980,
    in_stock: true,
    tags: ["pipe", "ball valve", "valve", "stop cock", "pipe valve", "water valve", "pvc valve", "supreme valve", "pipe stopper", "nal valve"],
    description: "High chemical resistance PVC compact ball valve with smooth quarter-turn handle for reliable water flow shutoff."
  },
  {
    id: "SKU_CERA_BRASS_TAP",
    name: "Cera Brass Bib Cock Water Tap (Chrome Plated)",
    brand: "CERA",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 25,
    image: "/products/brass-tap.svg",
    spec: "1/2\" BSP Thread • Brass Core",
    unit: "1 Unit",
    price: 299,
    mrp: 450,
    discount_percent: 34,
    rating: 4.8,
    reviews_count: 890,
    in_stock: true,
    tags: ["pipe", "nal", "tap", "brass tap", "water tap", "bib cock", "cera", "pipe tap", "leaking tap", "tap leak", "faucet", "water faucet"],
    description: "Solid forged brass bib tap with mirror chrome plating and quarter-turn ceramic disc cartridge."
  },
  {
    id: "SKU_ASHIRVAD_BRASS_FTA",
    name: "Ashirvad CPVC Brass FTA Male Thread Adapter 1/2\"",
    brand: "ASHIRVAD",
    category: "Plumbing Pipes & Fittings",
    categoryId: "plumbing-fittings",
    tradeRoles: ["Plumber"],
    delivery_time_mins: 28,
    image: "/products/cpvc-brass-fta.svg",
    spec: "Size: 1/2\" (15mm) • SDR 11",
    unit: "1 Piece",
    price: 78,
    mrp: 120,
    discount_percent: 35,
    rating: 4.9,
    reviews_count: 1540,
    in_stock: true,
    tags: ["pipe", "fta", "brass fta", "male adapter", "cpvc brass", "ashirvad", "pipe joint", "threaded adapter", "pipe fitting"],
    description: "Heavy lead-free brass insert molded into FlowGuard CPVC fitting for leak-proof transition from metal to plastic."
  },
  {
    id: "SKU_ANCHOR_ROMA_SWITCH",
    name: "Anchor Roma 6A 1-Way Modular Switch (Arctic White)",
    brand: "ANCHOR",
    category: "Electricals & Wiring",
    categoryId: "electricals-wiring",
    tradeRoles: ["Electrician"],
    delivery_time_mins: 22,
    image: "/products/modular-switch.svg",
    spec: "6 Amp • 240V AC • 1 Module",
    unit: "1 Unit",
    price: 32,
    mrp: 55,
    discount_percent: 42,
    rating: 4.8,
    reviews_count: 3890,
    in_stock: true,
    tags: ["switch", "modular switch", "anchor switch", "roma", "electrical switch", "button", "light switch", "board switch"],
    description: "Flame-retardant polycarbonate modular rocker switch with silver cadmium oxide contacts."
  },
  {
    id: "SKU_HAVELLS_MCB_16A",
    name: "Havells 16A Single Pole C-Curve MCB Circuit Breaker",
    brand: "HAVELLS",
    category: "Electricals & Wiring",
    categoryId: "electricals-wiring",
    tradeRoles: ["Electrician"],
    delivery_time_mins: 25,
    image: "/products/havells-mcb.svg",
    spec: "16A • Single Pole • 10kA",
    unit: "1 Unit",
    price: 165,
    mrp: 240,
    discount_percent: 31,
    rating: 4.9,
    reviews_count: 2450,
    in_stock: true,
    tags: ["mcb", "circuit breaker", "havells mcb", "fuse", "electrical", "c16", "single pole", "breaker"],
    description: "High breaking capacity miniature circuit breaker engineered for protection against short circuits and overloads."
  },

  // --- NEW TRADE ESSENTIALS ---
  {
    id: "SKU_STEEL_GRIP_TAPE",
    name: "Steelgrip FR Heavy-Duty PVC Electrical Insulation Tape (Pack of 5)",
    brand: "STEELGRIP",
    category: "Electricals & Wiring",
    categoryId: "electricals-wiring",
    tradeRoles: ["Electrician"],
    delivery_time_mins: 18,
    image: "/products/insulation-tape.svg",
    spec: "Pack of 5 Rolls (Assorted Colors)",
    unit: "Pack of 5",
    price: 65,
    mrp: 100,
    discount_percent: 35,
    rating: 4.8,
    reviews_count: 1980,
    in_stock: true,
    tags: ["insulation tape", "black tape", "bijli tape", "steelgrip", "electrical tape", "wire tape", "insulation"],
    description: "Flame retardant electrical grade tape with high dielectric strength for professional wire joints."
  },
  {
    id: "SKU_ANCHOR_ROMA_SOCKET",
    name: "Anchor Roma 16A 3-Pin Heavy-Duty Modular Power Socket",
    brand: "ANCHOR",
    category: "Electricals & Wiring",
    categoryId: "electricals-wiring",
    tradeRoles: ["Electrician"],
    delivery_time_mins: 22,
    image: "/products/power-socket.svg",
    spec: "16A • 240V AC • Child Shutter",
    unit: "1 Unit",
    price: 88,
    mrp: 135,
    discount_percent: 35,
    rating: 4.9,
    reviews_count: 2150,
    in_stock: true,
    tags: ["socket", "16a socket", "power socket", "anchor roma", "modular socket", "plug point", "ac socket"],
    description: "Heavy-duty brass terminal power socket with child safety shutter for geysers, ACs, and kitchen appliances."
  },
  {
    id: "SKU_TAPARIA_TESTER",
    name: "Taparia Line Voltage Tester with Neon Indicator (814)",
    brand: "TAPARIA",
    category: "Power Tools",
    categoryId: "power-tools",
    tradeRoles: ["Electrician"],
    delivery_time_mins: 20,
    image: "/products/line-tester.svg",
    spec: "100V - 500V AC • Pocket Clip",
    unit: "1 Piece",
    price: 55,
    mrp: 85,
    discount_percent: 35,
    rating: 4.9,
    reviews_count: 3400,
    in_stock: true,
    tags: ["tester", "line tester", "taparia tester", "bijli tester", "voltage tester", "screw driver tester"],
    description: "Hardened cellulose acetate handle with high luminosity neon lamp for instant live line phase detection."
  },
  {
    id: "SKU_BIRLA_WALL_PUTTY",
    name: "Birla White WallCare Polymer Based Waterproof Wall Putty (5 kg)",
    brand: "BIRLA WHITE",
    category: "Paints & Finishes",
    categoryId: "paints-finishes",
    tradeRoles: ["Painter", "Civil & General Contractor"],
    delivery_time_mins: 28,
    image: "/products/wall-putty.svg",
    spec: "5 kg Bag • Extra White Finish",
    unit: "5 kg Bag",
    price: 165,
    mrp: 220,
    discount_percent: 25,
    rating: 4.8,
    reviews_count: 1420,
    in_stock: true,
    tags: ["putty", "wall putty", "birla white", "birla putty", "safedi", "wall care", "plaster finish"],
    description: "White cement based polymer putty providing a silky smooth, highly water-resistant base for all paints."
  },
  {
    id: "SKU_TRUCARE_ROLLER_9IN",
    name: "Asian Paints TruCare 9-Inch High Coverage Paint Roller with Tray",
    brand: "ASIAN PAINTS",
    category: "Paints & Finishes",
    categoryId: "paints-finishes",
    tradeRoles: ["Painter"],
    delivery_time_mins: 25,
    image: "/products/paint-roller.svg",
    spec: "9\" Roller + Plastic Sturdy Tray",
    unit: "1 Set",
    price: 195,
    mrp: 299,
    discount_percent: 35,
    rating: 4.7,
    reviews_count: 890,
    in_stock: true,
    tags: ["roller", "paint roller", "asian paints roller", "trucare roller", "wall roller"],
    description: "High-density woven fabric sleeve for fast, even paint application on large interior and exterior walls."
  },
  {
    id: "SKU_ULTRATECH_CEMENT_50KG",
    name: "UltraTech Super OPC 53 Grade High Strength Cement (50kg)",
    brand: "ULTRATECH",
    category: "Steel & Aggregates",
    categoryId: "steel-aggregates",
    tradeRoles: ["Civil & General Contractor"],
    delivery_time_mins: 30,
    image: "/products/cement-bag.svg",
    spec: "50 kg Heavy Moisture-Proof Bag",
    unit: "50 kg Bag",
    price: 385,
    mrp: 440,
    discount_percent: 12,
    rating: 4.9,
    reviews_count: 4800,
    in_stock: true,
    tags: ["cement", "ultratech", "53 grade cement", "opc cement", "cement bag", "site cement", "concrete"],
    description: "High-grade Ordinary Portland Cement engineered for robust foundation casting, RCC slabs, and columns."
  }
];

export const SOLUTION_BUNDLES: Record<string, SolutionBundle> = {
  BUNDLE_TAP_LEAK: {
    id: "BUNDLE_TAP_LEAK",
    problem_query: "tap leaking",
    title: "Tap Leakage Complete Repair Kit",
    subtitle: "Everything a plumber needs to diagnose & stop bathroom/kitchen tap leaks in 30 mins",
    items: [
      {
        id: "SKU_GASKET_RUBBER_1IN",
        name: "Ashirvad Heavy Rubber Gaskets (10 Pcs)",
        spec: "Assorted O-Rings",
        price: 36,
        mrp: 100,
        image: "/products/o-ring.svg",
        brand: "ASHIRVAD"
      },
      {
        id: "SKU_TEFLON_TAPE_SUPREME",
        name: "Supreme PTFE Thread Seal Tape (2 Rolls)",
        spec: "12mm x 10m",
        price: 32,
        mrp: 70,
        image: "/products/teflon-tape.svg",
        brand: "SUPREME"
      },
      {
        id: "SKU_TAPARIA_PIPE_WRENCH",
        name: "Taparia 10-Inch Adjustable Pipe Wrench",
        spec: "Drop Forged Steel",
        price: 345,
        mrp: 495,
        image: "/products/pipe-wrench.svg",
        brand: "TAPARIA"
      }
    ],
    bundle_price: 379,
    bundle_mrp: 665,
    bundle_discount_percent: 43,
    delivery_time_mins: 28,
    badge: "Solution Kit • 43% OFF"
  },
  BUNDLE_SEEPAGE_FIX: {
    id: "BUNDLE_SEEPAGE_FIX",
    problem_query: "water leakage",
    title: "Instant Seepage & Dampness Defense Kit",
    subtitle: "Stop moisture penetration, ceiling dripping, and hairline wall plaster cracks",
    items: [
      {
        id: "SKU_PIDIPROOF_LW_1L",
        name: "Dr. Fixit 101 Pidiproof LW+ (1 Litre)",
        spec: "1 Litre Liquid",
        price: 185,
        mrp: 260,
        image: "/products/pidiproof-lw.svg",
        brand: "PIDILITE"
      },
      {
        id: "SKU_DR_FIXIT_CRACK_SEAL",
        name: "Dr. Fixit Crack-X Acrylic Paste (500g)",
        spec: "500g Tub",
        price: 120,
        mrp: 175,
        image: "/products/crack-x.svg",
        brand: "PIDILITE"
      },
      {
        id: "SKU_MSEAL_EPOXY_90G",
        name: "Pidilite M-Seal Regular Sealant (Pack of 2)",
        spec: "180g Total",
        price: 65,
        mrp: 100,
        image: "/products/m-seal.svg",
        brand: "PIDILITE"
      }
    ],
    bundle_price: 335,
    bundle_mrp: 535,
    bundle_discount_percent: 37,
    delivery_time_mins: 26,
    badge: "Contractor Approved"
  },
  BUNDLE_NO_WATER: {
    id: "BUNDLE_NO_WATER",
    problem_query: "paani nahi aa raha",
    title: "Tap & Water Flow Restoration Kit",
    subtitle: "Replace jammed bib taps, stuck control valves, and restore full water pressure in 30 mins",
    items: [
      {
        id: "SKU_CERA_BRASS_TAP",
        name: "Cera Brass Bib Cock Water Tap",
        spec: "1/2\" BSP Thread",
        price: 299,
        mrp: 450,
        image: "/products/brass-tap.svg",
        brand: "CERA"
      },
      {
        id: "SKU_SUPREME_BALL_VALVE_1IN",
        name: "Supreme PVC Compact Ball Valve 1\"",
        spec: "1\" Quarter Turn",
        price: 145,
        mrp: 210,
        image: "/products/ball-valve.svg",
        brand: "SUPREME"
      },
      {
        id: "SKU_TEFLON_TAPE_SUPREME",
        name: "Supreme PTFE Teflon Thread Tape",
        spec: "12mm x 10m",
        price: 18,
        mrp: 35,
        image: "/products/teflon-tape.svg",
        brand: "SUPREME"
      }
    ],
    bundle_price: 410,
    bundle_mrp: 695,
    bundle_discount_percent: 41,
    delivery_time_mins: 25,
    badge: "Water Flow Kit • 41% OFF"
  },
  BUNDLE_MCB_TRIP: {
    id: "BUNDLE_MCB_TRIP",
    problem_query: "mcb trip",
    title: "Heavy Duty Electrical Circuit Fix Kit",
    subtitle: "Protect against sudden trips, short circuits, and burned modular rocker switches",
    items: [
      {
        id: "SKU_HAVELLS_MCB_16A",
        name: "Havells 16A Single Pole MCB Breaker",
        spec: "16A • C-Curve 10kA",
        price: 165,
        mrp: 240,
        image: "/products/havells-mcb.svg",
        brand: "HAVELLS"
      },
      {
        id: "SKU_ANCHOR_ROMA_SWITCH",
        name: "Anchor Roma 6A 1-Way Modular Switch",
        spec: "6 Amp • 240V AC",
        price: 32,
        mrp: 55,
        image: "/products/modular-switch.svg",
        brand: "ANCHOR"
      },
      {
        id: "SKU_FINOLEX_WIRE_15",
        name: "Finolex 1.5 sq mm FR Insulated Wire (90m)",
        spec: "1.5 sq mm • 90m Coil",
        price: 840,
        mrp: 1150,
        image: "/products/copper-wire.svg",
        brand: "FINOLEX"
      }
    ],
    bundle_price: 990,
    bundle_mrp: 1445,
    bundle_discount_percent: 31,
    delivery_time_mins: 22,
    badge: "Circuit Kit • 31% OFF"
  }
};

export interface PopularSearchTerm {
  term: string;
  label: string;
  properName: string;
  note: string;
}

export const POPULAR_SEARCH_TERMS: PopularSearchTerm[] = [
  { term: "pipe ka ring", label: "Rubber Gasket O-Rings", properName: "Rubber Gasket O-Rings", note: "Plumbing & Gaskets" },
  { term: "paani nahi aa raha", label: "Tap & Water Flow Kit", properName: "Tap & Water Flow Kit", note: "Water Flow Restoration" },
  { term: "pidipruf", label: "Dr. Fixit Pidiproof LW+", properName: "Dr. Fixit Pidiproof LW+", note: "Waterproofing Chemical" },
  { term: "tap leaking", label: "Brass Tap & Leak Repair Kit", properName: "Brass Tap & Leak Repair Kit", note: "Plumbing Repair Kit" },
  { term: "dhaga tape", label: "PTFE Teflon Thread Tape", properName: "PTFE Teflon Thread Tape", note: "Thread Seal Tape" },
  { term: "mcb trip", label: "Havells Single Pole MCB", properName: "Havells Single Pole MCB", note: "Electrical Circuit Breaker" },
  { term: "pipe", label: "Ashirvad CPVC & UPVC Pipes", properName: "Ashirvad CPVC & UPVC Pipes", note: "CPVC & UPVC Plumbing" },
  { term: "fevicol 1kg", label: "Fevicol SH Wood Adhesive", properName: "Fevicol SH Wood Adhesive", note: "Wood & Carpentry Adhesive" },
  { term: "m-seal", label: "M-Seal Epoxy Putty", properName: "M-Seal Epoxy Putty", note: "Multi-surface Epoxy Putty" },
  { term: "cutting wheel", label: "Metal Cutting Wheel Disc", properName: "Metal Cutting Wheel Disc", note: "Power Tool Cutting Disc" },
  { term: "deewar ki seelan", label: "Dr. Fixit Seepage Defense", properName: "Dr. Fixit Seepage Defense", note: "Wall Damp & Seepage Fix" },
  { term: "toti leakage", label: "Brass Bib Tap & Spindle", properName: "Brass Bib Tap & Spindle", note: "Brass Sanitary Fittings" },
  { term: "taar 1.5mm", label: "Finolex 1.5mm FR Wire", properName: "Finolex 1.5mm FR Wire", note: "Electrical Copper Wiring" },
  { term: "short circuit", label: "Circuit Repair & MCB Kit", properName: "Circuit Repair & MCB Kit", note: "Electrical Safety Kit" },
  { term: "deewar ki darar", label: "Dr. Fixit Crack-X Paste", properName: "Dr. Fixit Crack-X Paste", note: "Wall Crack Waterproof Filler" },
  { term: "basin leak", label: "Wash Basin Sanitary Kit", properName: "Wash Basin Sanitary Kit", note: "Sanitary Coupling & Trap" },
  { term: "skru", label: "Gyproc Drywall Screws", properName: "Gyproc Drywall Screws", note: "Self-Tapping Fasteners" },
  { term: "loha cutting", label: "Bosch Metal Cutting Disc", properName: "Bosch Metal Cutting Disc", note: "4\" Inox Cutting Disc" },
  { term: "saria 12mm", label: "Tata Tiscon 12mm Rebar", properName: "Tata Tiscon 12mm Rebar", note: "550D TMT Construction Steel" },
  { term: "pana / wrench", label: "Taparia Pipe Wrench 10\"", properName: "Taparia Pipe Wrench 10\"", note: "Heavy-Duty Pipe Wrench" }
];

export const QUICK_CATEGORIES = [
  { id: "all", name: "All Results", shortName: "All", icon: "Boxes" },
  { id: "plumbing-fittings", name: "Plumbing Pipes & Fittings", shortName: "Plumbing", icon: "Pipette" },
  { id: "waterproofing-chemicals", name: "Waterproofing & Chemicals", shortName: "Waterproofing", icon: "Droplets" },
  { id: "adhesives-sealants", name: "Adhesives & Sealants", shortName: "Adhesives", icon: "Layers" },
  { id: "power-tools", name: "Power Tools & Discs", shortName: "Power Tools", icon: "Wrench" },
  { id: "electricals-wiring", name: "Electricals & Wiring", shortName: "Electricals", icon: "Zap" },
  { id: "paints-finishes", name: "Paints & Finishes", shortName: "Paints", icon: "Paintbrush" },
  { id: "fasteners-hardware", name: "Fasteners & Screws", shortName: "Fasteners", icon: "Shield" },
  { id: "steel-aggregates", name: "Steel & Aggregates", shortName: "Steel & Rods", icon: "Hammer" }
];
