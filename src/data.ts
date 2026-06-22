import { ProjectId, CuratedProduct, ServiceStep } from './types';

// Luxury Interior Projects
export const PROJECTS: ProjectId[] = [
  {
    id: 'pac-heights',
    title: 'Pacific Heights Estate',
    category: 'residential',
    description: 'A striking blend of high-contrast modernism and curated organic textures overlooking the Golden Gate.',
    longDescription: 'Perched high in San Francisco\'s most historical enclave, the Pacific Heights Estate was reimagined to celebrate theatrical high-ceiling scale while remaining deeply intimate. Standard gypsum board was replaced with rich plaster wall finishes and wire-brushed oak panels. The spatial layout was altered to direct sightlines towards panoramic ocean views. Bespoke, built-in structural casework is finished in deep gold-burnished pigments, reflecting the bay\'s natural light shifts throughout the day.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'San Francisco, CA',
    year: '2025',
    size: '6,200 sq.ft.'
  },
  {
    id: 'noe-valley',
    title: 'Noe Valley Residence',
    category: 'residential',
    description: 'A cozy sanctuary with handcrafted architectural wood structures, custom textile pairings, and light-wells.',
    longDescription: 'This double-wide Victorian lot required a total seismic retrofit and spatial restructure. Our layout focuses on a centralized open atrium that guides dynamic natural light through three vertical tiers. We introduced tactile textures—milled travertine hearths, brushed brass hand-wrapped cabinet hardware, and Belgian linen drapes—accentuating a soothing, dark-amber editorial atmosphere designed for conversational slow living.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Noe Valley, SF',
    year: '2024',
    size: '3,800 sq.ft.'
  },
  {
    id: 'sausalito-glass',
    title: 'Sausalito Glass House',
    category: 'residential',
    description: 'A multi-tier hillside residence with floor-to-ceiling glass, floating concrete structures, and custom amber accents.',
    longDescription: 'Reaching out over the steep tree canopy of Sausalito, this glass and metal structure was designed to disappear into the marine landscape. We curated a minimalist interior aesthetic centering a brutalist board-formed concrete chimney core and contrasting hand-dyed silk wallcoverings in warm copper-gold tones. Furniture choices emphasize low-slung, sculptural luxury profiles that maintain uninterrupted horizons.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Sausalito, CA',
    year: '2025',
    size: '4,500 sq.ft.'
  },
  {
    id: 'john-creek',
    title: 'John Creek Veterinary Clinic',
    category: 'commercial',
    description: 'A pioneering, hyper-luxury clinical space proving medical environments can be masterpieces of healing and design.',
    longDescription: 'Commissioned to revolutionize the standard institutional hospital experience, John Creek Veterinary Clinic was crafted as a calming, state-of-the-art animal retreat. Inspired by wellness sanctuaries, we utilized light-toned acoustics, curved architectural wood portals, soft glowing amber highlights, and anti-glare medical surfaces. Soundproofing layers decouple exam rooms to neutralize anxiety, and strategic pet-height windows let patient friends feel grounded during consultation.',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'St. Johns County, FL',
    year: '2026',
    size: '8,400 sq.ft.'
  },
  {
    id: 'hayes-lounge',
    title: 'Hayes Valley Lounge',
    category: 'commercial',
    description: 'A seductive dark-hospitality lounge featuring hand-woven wall tapestries, glowing amber light sculptures, and velvet alcoves.',
    longDescription: 'Hayes Valley Lounge is an exercise in sensory indulgence. To counteract city noise, acoustic velvet drapery borders the intimate lounge pockets. Hand-blown custom pendant fixtures emit custom soft amber washes, casting subtle rhythmic patterns on the stained plaster wall finishes. Bespoke marble service bars incorporate continuous back-lit glass block details that act as anchoring lanterns inside the dim interior space.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'San Francisco, CA',
    year: '2024',
    size: '3,100 sq.ft.'
  }
];

// Curated Lighting Products Collection
export const PRODUCTS: CuratedProduct[] = [
  {
    id: 'aura-pendant',
    name: 'Aura Halo Pendant',
    category: 'Pendants',
    designer: 'Noz Nozawa Collaboration',
    price: '$3,850',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    story: 'Meticulously forged from raw unlacquered brass, the Aura Halo floats like a celestial body. A continuous interior trench holds soft glowing high-index LEDs, diffusion filtered through hand-chipped solid quartz crystals to project a soft, warm amber ripple effect.',
    specs: [
      'Standard Dimensions: 32" Diameter x 2.5" Height',
      'Solid Forged Unlacquered Brass',
      'LED Warm Light Profile: 2200K - 2700K Dim-to-Warm',
      'Dual Cable suspension drops adjustable to 12ft'
    ]
  },
  {
    id: 'eclipse-sconce',
    name: 'Eclipse Amber Alabaster Sconce',
    category: 'Sconces',
    designer: 'Bespoke Studio Series',
    price: '$1,920',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    story: 'Utilizing rare Spanish golden-amber alabaster blocks, each sconce dial is hand-turned by local craftsmen. The backplate incorporates architectural deep coal steel. When illuminated, the organic mineral veins appear as dramatic, fiery visual rivers.',
    specs: [
      'Individual Plate Scale: 12" W x 14" H x 3.5" Depth',
      'Natural Spanish Alabaster Disk (stria and pattern varies)',
      'Coal-toned Oxidized Steel backplate mounts standard single j-box'
    ]
  },
  {
    id: 'obsidian-chandelier',
    name: 'Obsidian Cascade Chandelier',
    category: 'Chandeliers',
    designer: 'Editorial Limited Run',
    price: '$8,400',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=800&q=80',
    story: 'Inspired by tectonic cracks, twenty-four individual blackened volcanic glass icicles wrap surrounding internal glowing cores. Each glass element is individually flame-sculpted in Oakland studios, providing a distinctive structural weight and premium shadows.',
    specs: [
      'Total Dimensions: 42" Drop Diameter x 50" Maximum Body Height',
      'Smoked Black Volcanic Glass and Hand-polished Dark Amber Alloy',
      'Weight capacity: 85 lbs. Requires heavy-duty ceiling brace framework'
    ]
  },
  {
    id: 'brass-monolith',
    name: 'Monolith Table Beacon',
    category: 'Table Lamps',
    designer: 'Studio Core Collection',
    price: '$1,450',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    story: 'Representing brutalist sculptural towers, the Monolith is machined from single slabs of solid golden-brushed architectural brass. An integrated touch dimming band wrapping around the core offers effortless ambient regulation.',
    specs: [
      'Scale: 6" Square Base x 18" Spine Height',
      'Weight: 14.5 lbs. Solid Machined Brass Core',
      'USB-C Rechargeable Battery + Continuous Wall plug compatibility'
    ]
  }
];

// Interior Design Services steps
export const SERVICES_WORKFLOW: ServiceStep[] = [
  {
    phase: 'Phase I',
    title: 'Spatial Discovery & Concept',
    description: 'We host interactive design sessions, mapping spatial flow, architectural constraints, and material aspirations. This phase establishes the core story, visual moodboards, and space orientation models.',
    duration: '3 - 4 weeks',
    deliverables: ['Spatial Layout schematics', 'Interactive Moodboard palettes', 'Mood & Lighting models']
  },
  {
    phase: 'Phase II',
    title: 'Aesthetic Mapping & Sourcing',
    description: 'Our team draws exact custom structural details and selects actual timbers, stones, fabrics, custom furniture pieces, and bespoke functional lighting fittings from worldwide ateliers.',
    duration: '4 - 6 weeks',
    deliverables: ['Component detail drafting', 'Material swatch pairings', 'Comprehensive cost budget catalogs']
  },
  {
    phase: 'Phase III',
    title: 'Procurement & Artisan Framing',
    description: 'We orchestrate direct partnerships with specialist craftsmen, glass-blowers, carpenters, and light engineering squads to realize original custom furniture and installations.',
    duration: 'Varies with scope',
    deliverables: ['Custom manufacturing logs', 'Shipped material storage inspection', 'Site progress management reports']
  },
  {
    phase: 'Phase IV',
    title: 'Immersive Installation & Reveal',
    description: 'Our team directs the final staging: hand-hanging art, placing custom sculptural fixtures, and directing lighting orientations. We hand over a polished masterpiece primed for living.',
    duration: '1 - 2 weeks active site staging',
    deliverables: ['Perfect spatial reveal', 'Artisanal care & maintenance specifications', 'Direct spatial handover certification']
  }
];

// Press clippings
export const PRESS_ITEMS = [
  {
    publication: 'Architectural Digest',
    title: 'A California Compound Grounded in Seductive Light and Shadow',
    date: 'April 2025',
    link: 'https://nozdesign.com/'
  },
  {
    publication: 'Elle Decor',
    title: 'Noz Nozawa on Curating Warm Amber Palettes for Contemporary Escapes',
    date: 'September 2024',
    link: 'https://nozdesign.com/'
  },
  {
    publication: 'Luxe Magazine',
    title: 'Commercial Design Pioneers: Merging High Clinical Function with Sanctuary Wellness',
    date: 'February 2026',
    link: 'https://nozdesign.com/'
  }
];

// Team bios
export const TEAM_MEMBERS = [
  {
    name: 'Noz Nozawa',
    role: 'Founder & Principal Designer',
    bio: 'Noz believes space should tell an unforgettable, visceral story. Her style uses dark moody backdrops punctuated by hand-crafted fixtures and glowing highlights.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Julian Carter',
    role: 'Lead Architect & Fabrication Director',
    bio: 'Julian orchestrates complex spatial retrofits and custom steel/wood integrations, ensuring structural brilliance meets bespoke visual precision.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  }
];
