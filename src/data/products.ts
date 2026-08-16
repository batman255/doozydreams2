import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'dd-001',
    sku: 'DD-GL-8901',
    title: 'The Aurelia Liquid Gold Draped Gown',
    subtitle: 'Hand-pleated metallic lamé with cascading cape silhouette',
    price: 1850,
    originalPrice: 2200,
    discountPercentage: 16,
    category: 'Gowns & Dresses',
    collection: 'The Nocturne Gala',
    occasion: ['Black Tie & Gala', 'Cocktail & Soirée'],
    description: 'Sculpted from luminous Italian liquid metallic lamé, the Aurelia Gown effortlessly captures the light with every step. Featuring an asymmetrical cowl neckline, delicate waist-cinching draping, and a dramatic detachable shoulder trail that commands the red carpet.',
    editorialQuote: '"An architectural triumph in liquid gold draping, embodying the pinnacle of modern soirée glamour." — Doozy Atelier Paris',
    fabric: '100% Italian Metallic Lamé with Mulberry Silk Charmeuse interior lining',
    care: ['Specialist dry clean only', 'Do not steam directly on metallic weave', 'Store in protective breathable garment bag'],
    modelSpecs: {
      height: "5'10\" (178cm)",
      wearingSize: 'S',
      bust: '33" (84cm)',
      waist: '24" (61cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 3 },
      { size: 'S', inStock: true, stockCount: 5 },
      { size: 'M', inStock: true, stockCount: 4 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: false, stockCount: 0 }
    ],
    colors: [
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Obsidian Noir', hex: '#111111' },
      { name: 'Crimson Rose', hex: '#800020' }
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Runway Exclusive', 'Gala', 'Liquid Gold', 'Bestseller'],
    isFeatured: true,
    isNewArrival: true,
    isPartyNight: true,
    isBestSeller: true,
    stockTotal: 14,
    rating: 4.95,
    reviewCount: 28,
    reviews: [
      {
        id: 'rev-1',
        author: 'Lady Victoria S.',
        rating: 5,
        date: '2026-06-12',
        title: 'Breathtaking Gala Centerpiece',
        comment: 'Wore this to the Opera Ball in Vienna. The way the fabric drapes and shifts in candlelight is extraordinary. Flawless craftsmanship.',
        verified: true,
        fitFeedback: 'True to Size'
      },
      {
        id: 'rev-2',
        author: 'Elena R.',
        rating: 5,
        date: '2026-07-04',
        title: 'Worth Every Penny',
        comment: 'The interior silk lining feels like a dream against the skin. Received compliments throughout the night.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ],
    stylingTips: [
      'Pair with minimal champagne diamond drop earrings to honor the neckline.',
      'Sleek swept-back chignon hairstyle and a warm bronze luminous makeup palette.',
      'Metallic strappy sandals in 100mm heel height.'
    ],
    completeTheLookProductIds: ['dd-007', 'dd-010', 'dd-012'],
    published: true
  },
  {
    id: 'dd-002',
    sku: 'DD-FS-4412',
    title: 'The Zari Embroidered Velvet Festive Ensemble',
    subtitle: 'Deep emerald French velvet with artisan gold bullion handwork',
    price: 1650,
    originalPrice: 1950,
    discountPercentage: 15,
    category: 'Festive Stories',
    collection: 'Festive Stories',
    occasion: ['Festive & Celebration', 'Bridal & Reception'],
    description: 'An ode to regal heritage re-imagined for the contemporary connoisseur. Handcrafted from plush deep emerald French velvet, adorned with fine geometric and floral bullion zardozi hand embroidery along the hemlines and bell cuffs. Comes with a pure organza tissue dupatta bordered in scalloped gold gota.',
    editorialQuote: '"Rich textural depth meets royal opulence in our signature festive velvet story."',
    fabric: 'Plush Micro-Velvet with pure Silk Organza dupatta and heavy satin skirt lining',
    care: ['Professional velvet dry clean only', 'Store hung on padded hanger', 'Avoid pressure folds'],
    modelSpecs: {
      height: "5'9\" (175cm)",
      wearingSize: 'S',
      bust: '34" (86cm)',
      waist: '25" (64cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 2 },
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 5 },
      { size: 'L', inStock: true, stockCount: 3 },
      { size: 'XL', inStock: true, stockCount: 1 }
    ],
    colors: [
      { name: 'Royal Emerald', hex: '#043927' },
      { name: 'Ruby Vermillion', hex: '#6b021a' },
      { name: 'Deep Midnight Navy', hex: '#0B132B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Festive', 'Hand Embroidered', 'French Velvet', 'Royalty'],
    isFeatured: true,
    isFestive: true,
    isBestSeller: true,
    stockTotal: 17,
    rating: 4.98,
    reviewCount: 34,
    reviews: [
      {
        id: 'rev-3',
        author: 'Ananya M.',
        rating: 5,
        date: '2026-05-18',
        title: 'Pure Regal Elegance',
        comment: 'The bullion hand embroidery is magnificent. Wore this to a Diwali gala in London and everyone was mesmerized.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ],
    stylingTips: [
      'Style with antique polki or kundan choker necklace and statement ear cuffs.',
      'Pair with jewel-embellished velvet mules or pointed satin pumps.',
      'Classic red lip and soft gold winged liner.'
    ],
    completeTheLookProductIds: ['dd-008', 'dd-011'],
    published: true
  },
  {
    id: 'dd-003',
    sku: 'DD-PN-7721',
    title: 'The Stardust Micro-Sequin Corset Mini Dress',
    subtitle: 'Structured boned bodice with thousands of hand-stitched ombre crystals',
    price: 1250,
    originalPrice: 1450,
    discountPercentage: 14,
    category: 'Party Nights',
    collection: 'Party Nights',
    occasion: ['Party & Soirée', 'Cocktail & Soirée'],
    description: 'Designed for unforgettable nocturnal celebrations. Built over a couture internal corset that sculpts the waist, covered with micro-sequins graded from midnight anthracite to platinum shimmer. Features an architectural curved neckline and sleek side ruching.',
    editorialQuote: '"Ignite the evening with unapologetic high-octane luxury." — DOOZY STUDIO',
    fabric: 'High-density micro-sequin mesh over silk stretch lining with steel boning',
    care: ['Gentle dry clean inside protective mesh', 'Do not iron directly'],
    modelSpecs: {
      height: "5'11\" (180cm)",
      wearingSize: 'S',
      bust: '32" (81cm)',
      waist: '24" (61cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 4 },
      { size: 'S', inStock: true, stockCount: 6 },
      { size: 'M', inStock: true, stockCount: 3 },
      { size: 'L', inStock: false, stockCount: 0 },
      { size: 'XL', inStock: false, stockCount: 0 }
    ],
    colors: [
      { name: 'Platinum Noir', hex: '#2A2A2A' },
      { name: 'Champagne Sparkle', hex: '#F0E68C' },
      { name: 'Electric Violet', hex: '#4B0082' }
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Party Nights', 'Corset', 'Sequin', 'Mini'],
    isFeatured: true,
    isPartyNight: true,
    isNewArrival: true,
    stockTotal: 13,
    rating: 4.88,
    reviewCount: 19,
    reviews: [
      {
        id: 'rev-4',
        author: 'Chloe D.',
        rating: 5,
        date: '2026-07-22',
        title: 'The ultimate party showstopper',
        comment: 'The corsetry holds you in like a glove, and the sparkle under club/restaurant lighting is unbelievable.',
        verified: true,
        fitFeedback: 'Runs Small'
      }
    ],
    stylingTips: [
      'Accent with a box crystal clutch and patent leather high stilettos.',
      'Slick high ponytail and smoked cat eye.'
    ],
    completeTheLookProductIds: ['dd-007', 'dd-010'],
    published: true
  },
  {
    id: 'dd-004',
    sku: 'DD-CO-3309',
    title: 'The Celeste Bias-Cut Silk Crepe Co-ord Set',
    subtitle: 'Two-piece matching cowl halter top and floor-sweeping trumpet skirt',
    price: 1420,
    category: 'Co-ord Sets',
    collection: 'Atelier Minimalist',
    occasion: ['Cocktail & Soirée', 'Resort & Vacation'],
    description: 'Understated elegance at its most potent. Spun from heavy 30mm Mulberry silk crepe, this ensemble combines a low-back draped cowl halter with a bias-cut skirt that skims the curves with seamless grace. Wear together as a full look or style separately for versatile high-fashion styling.',
    editorialQuote: '"Effortless sensual tailoring in fluid ivory silk that moves like water."',
    fabric: '100% Pure Heavy Mulberry Silk Crepe de Chine',
    care: ['Dry clean only', 'Cool iron on reverse with pressing cloth'],
    modelSpecs: {
      height: "5'10\" (178cm)",
      wearingSize: 'S',
      bust: '33" (84cm)',
      waist: '24.5" (62cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 3 },
      { size: 'S', inStock: true, stockCount: 5 },
      { size: 'M', inStock: true, stockCount: 4 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: true, stockCount: 1 }
    ],
    colors: [
      { name: 'Oyster Ivory', hex: '#FDFBF7' },
      { name: 'Terracotta Rust', hex: '#B7410E' },
      { name: 'Sage Celadon', hex: '#9CAF88' }
    ],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Co-ord Set', 'Silk', 'Bias Cut', 'Minimalist'],
    isFeatured: true,
    isNewArrival: true,
    stockTotal: 15,
    rating: 4.92,
    reviewCount: 16,
    reviews: [
      {
        id: 'rev-5',
        author: 'Sienna W.',
        rating: 5,
        date: '2026-06-29',
        title: 'Perfection in fabric form',
        comment: 'The weight of this silk is unmatched. It does not wrinkle easily and feels unbelievable to wear.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ],
    stylingTips: [
      'Sculptural gold cuff bracelet and delicate gold hoop earrings.',
      'Strappy leather mule sandals and woven raffia or leather mini pouch.'
    ],
    completeTheLookProductIds: ['dd-008', 'dd-012'],
    published: true
  },
  {
    id: 'dd-005',
    sku: 'DD-SV-1190',
    title: 'The Seraphina Velvet Cape Evening Gown',
    subtitle: 'Sculptural column gown with built-in cascading velvet mantle',
    price: 2100,
    originalPrice: 2450,
    discountPercentage: 14,
    category: 'Silk & Velvet',
    collection: 'Festive Stories',
    occasion: ['Black Tie & Gala', 'Festive & Celebration'],
    description: 'An iconic silhouette inspired by European royal portraiture. Cut from double-faced silk velvet in a deep Bordeaux hue, with an integrated draped mantle that billows behind the wearer. Finished with hand-wrapped velvet buttons along the spine.',
    editorialQuote: '"A masterclass in dramatic presence, commanding the room with quiet majesty."',
    fabric: 'Silk-blend Deep Velvet with Duchess Satin facing',
    care: ['Specialist dry clean only', 'Keep hung on custom wide-shoulder velvet hanger'],
    modelSpecs: {
      height: "5'10.5\" (179cm)",
      wearingSize: 'S',
      bust: '34" (86cm)',
      waist: '24" (61cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 1 },
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 3 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: false, stockCount: 0 }
    ],
    colors: [
      { name: 'Bordeaux Wine', hex: '#4A0E17' },
      { name: 'Midnight Onyx', hex: '#0B0B0B' },
      { name: 'Forest Jade', hex: '#1B4D3E' }
    ],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Silk & Velvet', 'Cape Gown', 'Festive Stories', 'Couture'],
    isFeatured: true,
    isFestive: true,
    isPartyNight: true,
    stockTotal: 10,
    rating: 5.0,
    reviewCount: 21,
    reviews: [
      {
        id: 'rev-6',
        author: 'Isabella Von K.',
        rating: 5,
        date: '2026-08-01',
        title: 'Royalty Personified',
        comment: 'The cape creates the most theatrical entrance. Hand stitching along the back buttons is immaculate.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ],
    stylingTips: [
      'Vintage diamond chandelier earrings and high-gloss oxblood lip.',
      'Satin opera gloves and stiletto court shoes.'
    ],
    completeTheLookProductIds: ['dd-008', 'dd-010'],
    published: true
  },
  {
    id: 'dd-006',
    sku: 'DD-GL-5520',
    title: 'The Vivienne Sculpted Silk Taffeta Ballgown',
    subtitle: 'Architectural off-shoulder neckline with voluminous pleated skirt & pockets',
    price: 2400,
    category: 'Gowns & Dresses',
    collection: 'The Nocturne Gala',
    occasion: ['Black Tie & Gala', 'Bridal & Reception'],
    description: 'An architectural tour de force. Crisp Italian silk taffeta is folded and pleated by hand to create a breathtaking portrait collar that frames the collarbones. Hidden side seam pockets and a horsehair-braided hem maintain the gown’s magnificent sculptural bell volume.',
    editorialQuote: '"Modern drama engineered with classical couture precision."',
    fabric: '100% Pure Italian Silk Taffeta with structured crinoline support',
    care: ['Dry clean by luxury specialist only'],
    modelSpecs: {
      height: "5'9.5\" (177cm)",
      wearingSize: 'S',
      bust: '33" (84cm)',
      waist: '25" (63cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 2 },
      { size: 'S', inStock: true, stockCount: 3 },
      { size: 'M', inStock: true, stockCount: 3 },
      { size: 'L', inStock: true, stockCount: 1 },
      { size: 'XL', inStock: true, stockCount: 1 }
    ],
    colors: [
      { name: 'Noir Classic', hex: '#111111' },
      { name: 'Pearly Alabaster', hex: '#F4F1EA' },
      { name: 'Scarlet Royal', hex: '#900C3F' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Ballgown', 'Taffeta', 'Architectural', 'Runway'],
    isFeatured: true,
    isBestSeller: true,
    stockTotal: 10,
    rating: 4.96,
    reviewCount: 15,
    reviews: [
      {
        id: 'rev-7',
        author: 'Madeline C.',
        rating: 5,
        date: '2026-05-30',
        title: 'A True Dream Dress',
        comment: 'Having pockets in a couture gown this dramatic is pure genius. The taffeta rustles delightfully with every step.',
        verified: true,
        fitFeedback: 'True to Size'
      }
    ],
    stylingTips: [
      'Pair with an art-deco diamond tennis necklace.',
      'Sleek ballet bun with diamond hairpin accents.'
    ],
    completeTheLookProductIds: ['dd-007', 'dd-011'],
    published: true
  },
  {
    id: 'dd-007',
    sku: 'DD-AC-9901',
    title: 'The Palais Crystal-Embellished Minaudière Clutch',
    subtitle: 'Hand-set pavé crystals on architectural 24k gold-plated brass frame',
    price: 680,
    category: 'Accessories & Jewelry',
    collection: 'Atelier Accessories',
    occasion: ['Black Tie & Gala', 'Cocktail & Soirée', 'Party & Soirée'],
    description: 'A miniature jewel box for the evening. Featuring over 1,200 precision-cut crystals hand-set in pavé lattice over a sculpted geometric chassis. Includes a detachable 24k gold-plated herringbone snake chain to convert seamlessly from hand clutch to shoulder bag.',
    editorialQuote: '"The crowning accessory for any evening look."',
    fabric: '24k Gold-Plated Brass Chassis with Austrian crystal pavé and silk faille interior',
    care: ['Store in provided felt pouch', 'Wipe with soft microfiber jewelry cloth'],
    modelSpecs: {
      height: '-',
      wearingSize: 'One Size',
      bust: '-',
      waist: '-'
    },
    sizes: [{ size: 'Custom Fit', inStock: true, stockCount: 12 }],
    colors: [
      { name: 'Crystal Gold', hex: '#D4AF37' },
      { name: 'Silver Starlight', hex: '#E0E0E0' },
      { name: 'Jet Hematite', hex: '#2B2B2B' }
    ],
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Clutch', 'Crystal', '24k Gold', 'Evening Essential'],
    isFeatured: false,
    isPartyNight: true,
    stockTotal: 12,
    rating: 4.92,
    reviewCount: 31,
    reviews: [],
    stylingTips: [
      'Ideal complement to both metallic gowns and tailored tuxedo suits.'
    ],
    published: true
  },
  {
    id: 'dd-008',
    sku: 'DD-AC-9902',
    title: 'The Solstice Hand-Carved Pearl & Emerald Drop Earrings',
    subtitle: 'Baroque South Sea pearls with Zambian emerald baguettes in 18k solid gold',
    price: 890,
    category: 'Accessories & Jewelry',
    collection: 'Atelier Accessories',
    occasion: ['Black Tie & Gala', 'Festive & Celebration'],
    description: 'Each pair features unique hand-selected luminous baroque South Sea pearls paired with vibrant baguette-cut natural emeralds, set in 18k recycled gold bezels that flutter delicately with motion.',
    editorialQuote: '"Luminous organic pearls harmonized with sharp royal emerald baguettes."',
    fabric: '18k Solid Gold with natural Baroque South Sea pearls and Zambian Emeralds',
    care: ['Avoid contact with perfumes, hairsprays, and moisture', 'Clean gently with pearl cloth'],
    modelSpecs: {
      height: '-',
      wearingSize: 'One Size',
      bust: '-',
      waist: '-'
    },
    sizes: [{ size: 'Custom Fit', inStock: true, stockCount: 8 }],
    colors: [
      { name: 'Emerald & Gold', hex: '#C5A059' }
    ],
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Earrings', 'Pearls', 'Emerald', '18k Gold'],
    isFeatured: false,
    isFestive: true,
    stockTotal: 8,
    rating: 5.0,
    reviewCount: 14,
    reviews: [],
    stylingTips: [
      'Pair with open necklines, halter styles, or strapless gowns.'
    ],
    published: true
  },
  {
    id: 'dd-009',
    sku: 'DD-OT-8822',
    title: 'The Dynasty Tailored Silk Organza Trench Coat',
    subtitle: 'Sheer double-layer silk organza with exaggerated storm flap and horn buckles',
    price: 1350,
    category: 'Outerwear',
    collection: 'Atelier Minimalist',
    occasion: ['Cocktail & Soirée', 'Modern Power & Evening'],
    description: 'An ethereal take on the classic military trench. Crafted from crisp sheer pure silk organza in a luminous smoked taupe hue. Designed to be worn over evening dresses or fine tailoring for an unexpected layer of sheer luxury.',
    editorialQuote: '"A whisper of sheer volume transforming the classic trench into evening poetry."',
    fabric: '100% Crisp Mulberry Silk Organza with real horn buttons and leather-wrapped buckles',
    care: ['Specialist dry clean only'],
    modelSpecs: {
      height: "5'11\" (180cm)",
      wearingSize: 'S',
      bust: '33" (84cm)',
      waist: '24" (61cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 2 },
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 3 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: false, stockCount: 0 }
    ],
    colors: [
      { name: 'Smoked Quartz', hex: '#635D55' },
      { name: 'Translucent Noir', hex: '#1C1C1C' },
      { name: 'Glass Champagne', hex: '#EAE4D9' }
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Outerwear', 'Trench', 'Silk Organza', 'Editorial'],
    isFeatured: false,
    isNewArrival: true,
    stockTotal: 11,
    rating: 4.89,
    reviewCount: 9,
    reviews: [],
    stylingTips: [
      'Layer over a slip dress or high-waisted silk trousers with pointed pumps.'
    ],
    published: true
  },
  {
    id: 'dd-010',
    sku: 'DD-PN-6611',
    title: 'The Lumina Mirrored Crystal Slip Gown',
    subtitle: 'Fluid backless bias slip embroidered with thousands of micro-mirrors',
    price: 1580,
    originalPrice: 1800,
    discountPercentage: 12,
    category: 'Party Nights',
    collection: 'Party Nights',
    occasion: ['Party & Soirée', 'Cocktail & Soirée'],
    description: 'Fluid, decadent, and radiant. Hand-stitched with miniature mirrored paillettes on a lightweight silk tulle base that glides with fluid luminescence. Features delicate cross-back spaghetti straps and a dramatic low back cut.',
    editorialQuote: '"Channeling 1970s Studio 54 glamour with modern precision tailoring."',
    fabric: 'Silk Tulle with mirrored metallic discs and stretch georgette lining',
    care: ['Gentle dry clean only in garment mesh'],
    modelSpecs: {
      height: "5'10\" (178cm)",
      wearingSize: 'S',
      bust: '32" (81cm)',
      waist: '23.5" (60cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 3 },
      { size: 'S', inStock: true, stockCount: 5 },
      { size: 'M', inStock: true, stockCount: 4 },
      { size: 'L', inStock: true, stockCount: 1 },
      { size: 'XL', inStock: false, stockCount: 0 }
    ],
    colors: [
      { name: 'Silver Foil', hex: '#DCDCDC' },
      { name: 'Rose Gold Shimmer', hex: '#B76E79' }
    ],
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Party Nights', 'Mirrored Slip', 'Studio 54', 'Backless'],
    isFeatured: true,
    isPartyNight: true,
    stockTotal: 13,
    rating: 4.93,
    reviewCount: 22,
    reviews: [],
    stylingTips: [
      'Pair with metallic barely-there ankle strap heels and bold ear cuffs.'
    ],
    published: true
  },
  {
    id: 'dd-011',
    sku: 'DD-FS-2290',
    title: 'The Maharani Brocade Royal Peplum Kurta Set',
    subtitle: 'Vintage Banarasi gold zari brocade with flared silk palazzo trousers',
    price: 1780,
    category: 'Festive Stories',
    collection: 'Festive Stories',
    occasion: ['Festive & Celebration', 'Bridal & Reception'],
    description: 'Woven on heritage wooden handlooms with pure gold and silver dipped threads. The structured peplum kurta features scalloped raw silk borders and jewel buttons, paired with flared silk brocade trousers.',
    editorialQuote: '"Generations of royal handloom artistry preserved in a sharp modern silhouette."',
    fabric: 'Authentic Pure Silk Banarasi Brocade with 24k gold zari dipping',
    care: ['Specialist handloom dry clean only'],
    modelSpecs: {
      height: "5'9\" (175cm)",
      wearingSize: 'S',
      bust: '34" (86cm)',
      waist: '25" (64cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 2 },
      { size: 'S', inStock: true, stockCount: 4 },
      { size: 'M', inStock: true, stockCount: 3 },
      { size: 'L', inStock: true, stockCount: 2 },
      { size: 'XL', inStock: true, stockCount: 1 }
    ],
    colors: [
      { name: 'Royal Crimson Gold', hex: '#8B0000' },
      { name: 'Imperial Peacock Blue', hex: '#004953' }
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Festive Stories', 'Banarasi Brocade', 'Handloom', 'Peplum'],
    isFeatured: true,
    isFestive: true,
    stockTotal: 12,
    rating: 4.97,
    reviewCount: 18,
    reviews: [],
    stylingTips: [
      'Pair with antique gold jhumkas and embellished juttis or metallic pumps.'
    ],
    published: true
  },
  {
    id: 'dd-012',
    sku: 'DD-TP-4011',
    title: 'The Solene Draped Asymmetrical Silk Blouse',
    subtitle: 'High cowl collar with cascading fluid draped back and mother-of-pearl buttons',
    price: 620,
    category: 'Tops & Blouses',
    collection: 'Atelier Minimalist',
    occasion: ['Cocktail & Soirée', 'Modern Power & Evening'],
    description: 'Cut on the bias to drape seamlessly over the torso. Features an elevated mock-neck cowl, structured cap sleeves, and a deep cascading drape across the shoulder blades.',
    editorialQuote: '"The quintessential evening staple for the modern wardrobe."',
    fabric: '100% Heavy Mulberry Silk Satin (28mm weight)',
    care: ['Hand wash cold with silk detergent or dry clean'],
    modelSpecs: {
      height: "5'10\" (178cm)",
      wearingSize: 'S',
      bust: '33" (84cm)',
      waist: '24" (61cm)'
    },
    sizes: [
      { size: 'XS', inStock: true, stockCount: 5 },
      { size: 'S', inStock: true, stockCount: 8 },
      { size: 'M', inStock: true, stockCount: 6 },
      { size: 'L', inStock: true, stockCount: 4 },
      { size: 'XL', inStock: true, stockCount: 2 }
    ],
    colors: [
      { name: 'Ivory Lustre', hex: '#FAF9F6' },
      { name: 'Midnight Eclipse', hex: '#121212' },
      { name: 'Rich Caramel', hex: '#A16239' }
    ],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85'
    ],
    tags: ['Silk Blouse', 'Draped', 'Minimalist', 'Atelier'],
    isFeatured: false,
    isNewArrival: true,
    stockTotal: 25,
    rating: 4.87,
    reviewCount: 20,
    reviews: [],
    stylingTips: [
      'Tuck into high-waisted wide leg velvet trousers or style with bias silk skirts.'
    ],
    published: true
  }
];
