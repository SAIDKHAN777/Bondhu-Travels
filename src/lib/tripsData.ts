export interface TripSlide {
  day: string;
  title: string;
  desc: string;
  image: string;
  video?: string;
  stay?: string;
  dining?: string;
}

export interface TripStop {
  id: string;
  name: string;
  daysTag: string;
  description: string;
  slides: TripSlide[];
}

export interface TripDetail {
  slug: string;
  country: string;
  title: string;
  tagline: string;
  heroImage: string;
  heroVideo?: string;
  when: string;
  whenSub?: string;
  price: string;
  priceSharing?: string;
  howLong: string;
  howLongSub?: string;
  overviewLead: string;
  overviewStory: string;
  stops: TripStop[];
}

export const tripsDatabase: Record<string, TripDetail> = {
  // 1. BRAZIL — The Rhythm of water (100% Exact to live Black Tomato page)
  'the-rhythm-of-water': {
    slug: 'the-rhythm-of-water',
    country: 'Brazil',
    title: 'The Rhythm of water',
    tagline: 'Searching for slowness in the Amazon',
    heroImage: '/2026/02/Lady-in-Forest-1-1.jpg',
    heroVideo: '/ocean-waves.webm',
    when: 'Mar - Nov',
    price: 'From £12,800pp excl. flights (৳ ১৬,৫০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '8 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'When you study a map of the Amazon, it looks like the roots of an ancient, sprawling tree. But maps are just that: abstractions. To really understand the Amazon, you have to spend time in the Amazon.',
    overviewStory: 'This trip – which can’t be booked anywhere else – offers you all the time your family will need. Following from the streets of Rio, its “heart” is a private river journey that will carry you up the Rio Negro and into stretches of the rainforest that travellers rarely reach. Travelling on a vessel that is yours and yours alone, you’ll discover that slowing down isn’t just a nice idea: it’s the best way to open your ears to nature.',
    stops: [
      {
        id: 'rio-de-janeiro',
        name: 'Rio de Janeiro',
        daysTag: 'Days 1-2',
        description: 'You can’t jump straight into the Amazon. First comes Rio: a city – dating to 1565 – overlooked by Corcovado and Sugarloaf Mountains, wearing its UNESCO World Heritage status with pride, bristling with its own urban rainforest. For two days, we’ll help you find your bearings and drink up a little of that electrically Brazilian way of life.',
        slides: [
          {
            day: 'Day 1',
            title: 'Swings so cool and sways so gently',
            desc: 'For the next two nights, you’ll be posting up at Fasano Rio de Janeiro – enjoying an oceanfront room whose balcony overlooks the blissful boho beach of Ipanema. Just like the song. This area has a glamorous and easy-going reputation totally unbothered by the city’s more touristy hubs. Today is about being here. No rush, no hurry.',
            image: '/2026/01/Couple-sitting-by-coast.jpg',
            stay: 'Fasano Rio de Janeiro — Oceanfront Balcony Suite on Ipanema Beach',
            dining: 'Beachfront artisanal dining & fresh caipirinha welcoming'
          },
          {
            day: 'Day 2',
            title: 'Real to reel: Corcovado & Christ the Redeemer',
            desc: 'Today you’ll be heading up into the Tijuca National Park – the world’s largest urban forest – up to Corcovado Mountain to visit the Christ the Redeemer statue. We arrange this first thing in the morning before crowds arrive. Afterwards, drift through the cobblestone streets of bohemian Santa Teresa with our private local curator.',
            image: '/2026/02/Lady-in-Forest-1-1.jpg',
            video: '/ocean-waves.webm',
            stay: 'Fasano Rio de Janeiro',
            dining: 'Private lunch at Santa Teresa bohemian artist garden terrace'
          }
        ]
      },
      {
        id: 'the-amazon-basin',
        name: 'The Amazon Basin',
        daysTag: 'Days 3-8',
        description: 'For nature writer Robert MacFarlane, “our fate flows with that of rivers – and always has”. The Amazon is faceted. It has sediments and layers and endless living things. And we want to take you into reaches of its basin that are all but untrodden by travellers. This is the rarest of opportunities to gain an intimate connection with the river.',
        slides: [
          {
            day: 'Day 3',
            title: 'Manaus – The gateway to the Amazon',
            desc: 'Fly north to Manaus, where the ink-black Rio Negro meets the sandy Amazon in the legendary "Meeting of the Waters". Here, board your private expedition river boat, chartered exclusively for your party, staffed with private naturalist guides, skippers, and private gourmet chef.',
            image: '/2026/01/Group-canoeing-1.jpg',
            stay: 'Private Expedition River Cruiser — Exclusive Charter',
            dining: 'Welcome regional tasting prepared by onboard private chef'
          },
          {
            day: 'Day 4',
            title: 'The sound and the silence',
            desc: 'Awake to the hypnotic sounds of howler monkeys and toucans. Cruise silently into the flooded igapó forests in motorized wooden canoes. Glide among underwater tree canopies and watch for rare pink river dolphins surfacing in the dark, reflective waters.',
            image: '/2022/08/Text-Centered-Home.jpg',
            video: '/ocean-waves.webm',
            stay: 'Private River Vessel on Rio Negro',
            dining: 'Fresh Amazonian river fish with organic manioc & tropical fruits'
          },
          {
            day: 'Days 5-8',
            title: 'Climb above the canopy & Meet the River People',
            desc: 'Ascend observation towers high above the rainforest canopy for a 360-degree green ocean vista. Visit local ribeirinho communities living in harmony with the seasonal floodwaters. Nights are spent stargazing from the boat deck under unpolluted southern skies.',
            image: '/2020/05/WEB-Heli-Hiking.jpg',
            stay: 'Anavilhanas Jungle Lodge / Private Vessel',
            dining: 'Celebration farewell dinner under starlit Amazon skies'
          }
        ]
      }
    ]
  },

  // 2. FRANCE — The Lost Generation
  'the-lost-generation': {
    slug: 'the-lost-generation',
    country: 'France',
    title: 'The Lost Generation',
    tagline: 'In the literary footsteps of Hemingway & Fitzgerald',
    heroImage: '/2026/04/Lost-Generation-header-mob.jpg',
    heroVideo: '/ocean-waves.webm',
    when: 'May - Oct',
    price: 'From £7,500pp excl. flights (৳ ৯,৫০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '12 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Secret bistros, sun-drenched vineyards and coastal cliffs. The streets of Paris and the French Riviera held an intoxicating magic for Hemingway, Fitzgerald, and Gertrude Stein.',
    overviewStory: 'This bespoke twelve-night holiday traces the creative odyssey of the 1920s Lost Generation writers. From private after-hours viewings in Paris to vineyard cellars in Champagne and private yacht excursions along the Côte d’Azur, you will experience France through the lens of timeless romance and literary elegance.',
    stops: [
      {
        id: 'paris-champagne',
        name: 'Paris & Champagne',
        daysTag: 'Days 1-5',
        description: 'Begin where the artistic revolution flourished: the Left Bank of Paris. Stroll the historic Latin Quarter, sip coffee at iconic literary cafes, and venture northeast into the chalk hills of Champagne.',
        slides: [
          {
            day: 'Days 1-2',
            title: 'The Left Bank and Private Louvre Salon',
            desc: 'Check into the historic Hôtel de Crillon on Place de la Concorde. Spend your mornings exploring hidden bookshops, private art galleries, and enjoy after-hours VIP access to the Louvre without crowds.',
            image: '/2026/04/Lost-Generation-header-mob.jpg',
            stay: 'Hôtel de Crillon, Rosewood Hotel — Deluxe Suite',
            dining: 'Michelin-starred tasting dinner overlooking the Eiffel Tower'
          },
          {
            day: 'Days 3-5',
            title: 'Reims Cathedrals & Grand Cru Champagne Cellars',
            desc: 'Journey to Reims to discover centuries-old chalk cellars where vintage champagne matures. Enjoy exclusive tastings led by master cellar masters and relax at a luxury vineyard château.',
            image: '/2026/01/Girl-running-in-farm-1.jpg',
            stay: 'Château de Sacy — Vineyard Panorama Suite',
            dining: 'Private cellar dinner paired with rare Grand Cru vintages'
          }
        ]
      },
      {
        id: 'provence-cote-dazur',
        name: 'Provence & Côte d’Azur',
        daysTag: 'Days 6-12',
        description: 'Travel south to the sun-baked landscapes of Provence and the sparkling azure Mediterranean. Where Fitzgerald wrote The Great Gatsby and artists fell in love with Mediterranean light.',
        slides: [
          {
            day: 'Days 6-8',
            title: 'Lavender Terraces & Truffle Hunting in Provence',
            desc: 'Wander medieval hilltop villages such as Gordes and Roussillon. Join local truffle hunters and their dogs through oak forests before savouring an open-air truffle feast.',
            image: '/2026/01/Lady-on-a-horse-1.jpg',
            stay: 'Villa La Coste — Luxury Organic Vineyard Retreat',
            dining: 'Artisanal Provençal lunch under shaded olive pergolas'
          },
          {
            day: 'Days 9-12',
            title: 'Antibes, Saint-Tropez & The Mediterranean Blue',
            desc: 'Arrive at the legendary Hotel du Cap-Eden-Roc. Board your private chartered catamaran to cruise hidden coves, diving into turquoise waters before an intimate beach farewell celebration.',
            image: '/2026/01/Couple-Italy-couple-swimming.jpg',
            stay: 'Hotel du Cap-Eden-Roc — Sea-View Suite',
            dining: 'Fresh Mediterranean seafood dinner on private seaside rocks'
          }
        ]
      }
    ]
  },

  // 3. ITALY — Highlights of Italy
  'highlights-of-italy': {
    slug: 'highlights-of-italy',
    country: 'Italy',
    title: 'Highlights of Italy',
    tagline: 'A luxury holiday in Rome, Florence & Venice',
    heroImage: '/2022/09/Highlights-of-Italy-scaled.jpg',
    heroVideo: '/luxury-resort-demo.mp4',
    when: 'Apr - Nov',
    price: 'From £8,000pp excl. flights (৳ ১০,২০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '9 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Terracotta rooftops, secret canal passageways and rolling cypress hills. Rome, Florence, and Venice represent the quintessential triad of Italian wonder.',
    overviewStory: 'This nine-night luxury trip brings you into intimate contact with Italy’s greatest artistic treasures, culinary masterclasses, and private palazzo suites. Private transfers by high-speed executive trains and antique wooden water limousines ensure every transition is pure delight.',
    stops: [
      {
        id: 'rome-vatican',
        name: 'Rome & The Vatican',
        daysTag: 'Days 1-3',
        description: 'Immerse yourself in 2,800 years of living history. From the Roman Forum and Colosseum undergrounds to after-hours stillness within the Sistine Chapel.',
        slides: [
          {
            day: 'Days 1-3',
            title: 'Private Sistine Chapel & Colosseum Floor',
            desc: 'Stay at Hotel de Russie beside Piazza del Popolo. Explore the Vatican Museums after public closing hours alongside a doctorate-level art historian.',
            image: '/2022/08/florence-italy-1-scaled.jpg',
            stay: 'Hotel de Russie, Rocco Forte — Secret Garden Suite',
            dining: 'Authentic Roman pasta tasting with master sommelier'
          }
        ]
      },
      {
        id: 'florence-tuscany',
        name: 'Florence & Tuscany',
        daysTag: 'Days 4-6',
        description: 'Traverse the cradle of the Renaissance. Private viewings of Michelangelo’s David and scenic vintage convertible drives through Chianti vineyards.',
        slides: [
          {
            day: 'Days 4-6',
            title: 'Renaissance Masters & Vintage Alfa Romeo Drives',
            desc: 'Relax at Four Seasons Hotel Firenze inside a 15th-century convent. Drive vintage sports cars through olive groves and join a private pasta workshop in a Tuscan farmhouse.',
            image: '/2022/09/Highlights-of-Italy-scaled.jpg',
            stay: 'Four Seasons Hotel Firenze — Historic Park View',
            dining: 'Farm-to-table Tuscan steak & Chianti Classico tasting'
          }
        ]
      },
      {
        id: 'venice-canals',
        name: 'Venice & The Grand Canal',
        daysTag: 'Days 7-9',
        description: 'Gliding along shimmering canals in private wooden water limousines to reach your Grand Canal palace.',
        slides: [
          {
            day: 'Days 7-9',
            title: 'Private Water Limousines & Murano Glass Studio',
            desc: 'Check into The Gritti Palace. Experience sunset gondola serenades, private visits to Murano master glass-blowers, and dining on candlelit canal-side terraces.',
            image: '/2026/01/Couple-Italy-couple-swimming.jpg',
            stay: 'The Gritti Palace, A Luxury Collection Hotel',
            dining: 'Venetian seafood tasting with fresh Bellini pairings'
          }
        ]
      }
    ]
  },

  // 4. GREECE — Family Discovery
  'family-discovery': {
    slug: 'family-discovery',
    country: 'Greece',
    title: 'Athens, Mykonos and Crete',
    tagline: 'A luxury family discovery in the Aegean',
    heroImage: '/2023/01/Family-island-hopping-scaled.jpg',
    heroVideo: '/ocean-waves.webm',
    when: 'May - Oct',
    price: 'From £9,800pp excl. flights (৳ ১২,৫০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '11 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Ancient ruins, whitewashed coastal alleys and crystal-clear turquoise waters. The Greek islands provide the ultimate backdrop for multi-generational adventure.',
    overviewStory: 'From interactive mythology trails at the Parthenon in Athens to private catamaran yacht charters in Mykonos and peaceful secluded beach villas in Crete, this itinerary combines culture, water sports, and effortless Mediterranean relaxation.',
    stops: [
      {
        id: 'athens',
        name: 'Athens',
        daysTag: 'Days 1-3',
        description: 'Explore the foundations of Western civilisation with dedicated family archaeologist guides.',
        slides: [
          {
            day: 'Days 1-3',
            title: 'Acropolis Mythology Quest & Rooftop Views',
            desc: 'Stay at Hotel Grande Bretagne with direct views of the Acropolis illuminated against the evening sky. Interactive treasure hunts for children through ancient ruins.',
            image: '/2023/01/Family-island-hopping-scaled.jpg',
            stay: 'Hotel Grande Bretagne, Luxury Collection',
            dining: 'Rooftop Mediterranean dinner facing the Parthenon'
          }
        ]
      },
      {
        id: 'mykonos-crete',
        name: 'Mykonos & Crete',
        daysTag: 'Days 4-11',
        description: 'Island hopping between the glamour of Mykonos and the pink sand beaches of Crete.',
        slides: [
          {
            day: 'Days 4-7',
            title: 'Mykonos Private Catamaran & Secluded Coves',
            desc: 'Cruise to uninhabited Rhenia island on a private catamaran for snorkeling in turquoise bays and private beach barbecue.',
            image: '/2026/01/Couple-sitting-by-coast.jpg',
            stay: 'Santa Marina, Luxury Resort — Private Beach Villa',
            dining: 'Fresh Aegean lobster & seafood barbecue on private sands'
          },
          {
            day: 'Days 8-11',
            title: 'Crete Elafonisi Pink Beach & Minoan Palaces',
            desc: 'Explore the pink sands of Elafonisi, tour ancient Knossos palace, and discover traditional olive oil pressing in Crete.',
            image: '/2022/08/cuba-caribbean.jpg',
            stay: 'Blue Palace Elounda — Private Plunge Pool Bungalow',
            dining: 'Traditional Cretan farm feast with organic honey & cheeses'
          }
        ]
      }
    ]
  },

  // 5. ICELAND — Northern Lights
  'iceland': {
    slug: 'iceland',
    country: 'Iceland',
    title: 'Iceland: Northern Lights Odyssey',
    tagline: 'Chasing auroras across glaciers & thermal lagoons',
    heroImage: '/2022/09/Northern-Lights-Iceland-scaled.jpg',
    heroVideo: '/luxury-travel-demo.mp4',
    when: 'Sep - Apr',
    price: 'From £5,400pp excl. flights (৳ ৬,৯০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '5 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Ethereal blue ice caves, steaming geothermal waters and celestial green ribbons dancing across the subarctic night.',
    overviewStory: 'Traverse Iceland in monster-wheeled superjeeps with expert glaciologists. Soak in the mineral-rich waters of The Retreat at Blue Lagoon and hunt auroras in remote dark-sky observatories.',
    stops: [
      {
        id: 'blue-lagoon-glaciers',
        name: 'Blue Lagoon & Glaciers',
        daysTag: 'Days 1-5',
        description: 'A sensory journey from steaming volcanic hot springs to ancient blue ice caves beneath Vatnajökull.',
        slides: [
          {
            day: 'Days 1-2',
            title: 'The Retreat at Blue Lagoon & Lava Thermal Suite',
            desc: 'Direct private water access to the geothermal lagoon from your suite. Floating massages and bespoke mineral therapies.',
            image: '/2022/09/Northern-Lights-Iceland-scaled.jpg',
            stay: 'The Retreat at Blue Lagoon Iceland — Lagoon Suite',
            dining: 'Nordic Michelin Guide tasting at Moss Restaurant'
          },
          {
            day: 'Days 3-5',
            title: 'Superjeep Glacier Expeditions & Aurora Hunting',
            desc: 'Explore glowing sapphire ice caves, ride snowmobiles on icecaps, and view the Aurora Borealis with personal astronomer guides.',
            image: '/luxury-travel-demo.mp4',
            stay: 'Hotel Rangá — Stargazing Suite with Outdoor Hot Tubs',
            dining: 'Fresh Icelandic arctic char & hot chocolate beside open fires'
          }
        ]
      }
    ]
  },

  // 6. JAPAN — Tokyo & Kyoto
  'japan': {
    slug: 'japan',
    country: 'Japan',
    title: 'Tokyo & Kyoto: A Family Holiday',
    tagline: 'From neon skylines to timeless bamboo groves',
    heroImage: '/2019/09/Ninja-martial-arts-in-Tokyo.jpg',
    heroVideo: '/ocean-waves.webm',
    when: 'Mar - May / Oct - Dec',
    price: 'From £8,900pp excl. flights (৳ ১১,৩০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '10 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Hyper-futuristic neon metropolis meets thousand-year-old zen temples, tea ceremonies, and bamboo forests.',
    overviewStory: 'Ride the Gran Class Shinkansen bullet train from Tokyo’s cutting-edge digital museums to Kyoto’s tranquil wooden ryokans. Meet master swordsmiths, experience private tea ceremonies, and relax in natural onsen hot springs.',
    stops: [
      {
        id: 'tokyo-hakone',
        name: 'Tokyo & Mt Fuji',
        daysTag: 'Days 1-5',
        description: 'Explore the modern pulse of Ginza and Shibuya followed by hot spring relaxation beneath Mount Fuji.',
        slides: [
          {
            day: 'Days 1-3',
            title: 'Digital Art, Sumo Stables & Samurai Lessons',
            desc: 'Stay at Aman Tokyo overlooking the Imperial Palace. Private workshops with samurai masters and VIP interactive visits at teamLab Borderless.',
            image: '/2019/09/Ninja-martial-arts-in-Tokyo.jpg',
            stay: 'Aman Tokyo — Panoramic City Suite',
            dining: 'Certified A5 Kobe & Wagyu teppanyaki master feast'
          },
          {
            day: 'Days 4-5',
            title: 'Hakone Onsen Ryokan & Lake Ashi Cruising',
            desc: 'Travel to Hakone to stay in an authentic historic ryokan with private cedar-wood onsen baths and views of Mount Fuji.',
            image: '/2026/02/A-LIST-Black2026.png',
            stay: 'Gora Kadan — Private Onsen Ryokan Villa',
            dining: 'Elaborate multi-course traditional Kaiseki dinner'
          }
        ]
      },
      {
        id: 'kyoto',
        name: 'Kyoto',
        daysTag: 'Days 6-10',
        description: 'The ancient imperial capital of zen gardens, golden pavilions, and Geisha districts.',
        slides: [
          {
            day: 'Days 6-10',
            title: 'Arashiyama Bamboo Grove & Golden Pavilion',
            desc: 'Early morning private access to Arashiyama before public opening. Private tea ceremonies with tea masters and guided walks through Gion.',
            image: '/2026/04/Footsteps-Navigation.jpg',
            stay: 'The Ritz-Carlton, Kyoto — Kamogawa River View',
            dining: 'Artisanal Kyoto matcha sweets & authentic seasonal dining'
          }
        ]
      }
    ]
  },

  // 7. ECUADOR — Nature & Galápagos
  'ecuador': {
    slug: 'ecuador',
    country: 'Ecuador',
    title: 'Ecuador & Galápagos: A Journey into Nature',
    tagline: 'Untouched islands, cloud forests & Darwinian wonders',
    heroImage: '/2022/09/Ultimate-Ecuador-scaled.jpg',
    heroVideo: '/ocean-waves.webm',
    when: 'All Year Round',
    price: 'From £11,200pp excl. flights (৳ ১৪,২০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '13 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Pristine volcanic shorelines, turquoise bays, and close encounters with creatures that know no fear of humans.',
    overviewStory: 'Explore the UNESCO colonial capital of Quito, glide through the canopy of the Chocó Cloud Forest in glass gondolas, and charter an ultra-luxury mega-catamaran across the enchanted Galápagos Islands.',
    stops: [
      {
        id: 'quito-mashpi',
        name: 'Quito & Mashpi Cloud Forest',
        daysTag: 'Days 1-5',
        description: 'From historic neoclassical plazas to National Geographic’s renowned glass-walled lodge high in the rainforest.',
        slides: [
          {
            day: 'Days 1-5',
            title: 'Historic Quito & Dragonfly Cloud Canopy',
            desc: 'Discover Casa Gangotena on San Francisco Plaza, then ride the 2km Dragonfly open-air cable car above the biodiverse cloud forest.',
            image: '/2022/09/Ultimate-Ecuador-scaled.jpg',
            stay: 'Mashpi Lodge — Cloud Forest Panorama Room',
            dining: 'Amazonian cocoa tasting & Andean gourmet dining'
          }
        ]
      },
      {
        id: 'galapagos-islands',
        name: 'Galápagos Islands Cruise',
        daysTag: 'Days 6-13',
        description: 'Chartered expedition yacht cruising between volcanic islands, swimming with sea lions and marine iguanas.',
        slides: [
          {
            day: 'Days 6-13',
            title: 'Catamaran Cruising & Marine Sanctuary Snorkeling',
            desc: 'Snorkel among green sea turtles, walk beside giant tortoises, and learn from dedicated naturalist biologists aboard your luxury yacht.',
            image: '/2026/01/jeremy-langmead.jpg',
            stay: 'Galapagos Elite Luxury Catamaran — Ocean Balcony Suite',
            dining: 'Fresh oceanic ceviche and open-air deck sunset dining'
          }
        ]
      }
    ]
  },

  // 8. MOROCCO — Journey into Morocco
  'morocco': {
    slug: 'morocco',
    country: 'Morocco',
    title: 'A Journey into Morocco',
    tagline: 'From Marrakech souks to Saharan starlit camps',
    heroImage: '/2024/02/Atlas-mountains-morocco-landscape.jpg',
    heroVideo: '/luxury-travel-demo.mp4',
    when: 'Oct - May',
    price: 'From £4,500pp excl. flights (৳ ৫,৭০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '7 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Terracotta ramparts, fragrant spice alleys, and starlit luxury tent camps among the desert dunes.',
    overviewStory: 'Experience the magic of Marrakech’s private riads, escape into the snowy High Atlas peaks at Richard Branson’s Kasbah Tamadot, and sleep under millions of stars in the Agafay Desert.',
    stops: [
      {
        id: 'marrakech-atlas',
        name: 'Marrakech & High Atlas Mountains',
        daysTag: 'Days 1-5',
        description: 'Private historic riads, Majorelle Gardens, and alpine mountain retreats.',
        slides: [
          {
            day: 'Days 1-3',
            title: 'Secret Riads & Yves Saint Laurent Gardens',
            desc: 'Stay at The Royal Mansour, designed by Morocco’s king with private multi-story riads. Private priority entry to the vibrant Majorelle Garden.',
            image: '/2024/02/Atlas-mountains-morocco-landscape.jpg',
            stay: 'The Royal Mansour Marrakech — Private 3-Story Riad',
            dining: 'Slow-cooked saffron lamb tagine with artisanal couscous'
          },
          {
            day: 'Days 4-5',
            title: 'Kasbah Tamadot & Berber Mountain Trails',
            desc: 'Retreat to Sir Richard Branson’s fairy-tale mountain castle in the High Atlas. Walk traditional Berber trails and sip mint tea beside roaring fireplaces.',
            image: '/2026/01/Lady-on-a-horse-1.jpg',
            stay: 'Kasbah Tamadot, Virgin Limited Edition',
            dining: 'Mountain terrace dining overlooking snow-capped peaks'
          }
        ]
      },
      {
        id: 'agafay-desert',
        name: 'Agafay Desert',
        daysTag: 'Days 6-7',
        description: 'Golden rocky dunes, private camel caravans, and nomadic glamping.',
        slides: [
          {
            day: 'Days 6-7',
            title: 'Luxury Desert Tents & Andalusian Music under Stars',
            desc: 'Private sunset camel rides across glowing desert ridges followed by live acoustic music, candlelit nomadic feasts, and luxury heated tent suites.',
            image: '/2022/08/zebra-chobe-national-park-botswana-1.jpg',
            stay: 'Inara Camp Agafay — Luxury Desert Tent Suite',
            dining: 'Campfire roasted Berber barbecue under starry skies'
          }
        ]
      }
    ]
  },

  // 9. KENYA — Ultimate Family Safari
  'kenya': {
    slug: 'kenya',
    country: 'Kenya',
    title: 'Kenya: The Ultimate Family Safari',
    tagline: 'Breakfast with giraffes & hot air balloons over Maasai Mara',
    heroImage: '/2024/01/navigation-kenya.jpg',
    heroVideo: '/ocean-waves.webm',
    when: 'Jul - Oct / Jan - Mar',
    price: 'From £9,500pp excl. flights (৳ ১২,১০,০০০)',
    priceSharing: '(based on 2 ppl sharing)',
    howLong: '8 nights',
    howLongSub: 'Ideal length',
    overviewLead: 'Endless golden savannah horizons, Big Five game drives, and breakfast tables shared with gentle Rothschild giraffes.',
    overviewStory: 'From feeding giraffes from your bedroom window at the iconic Giraffe Manor to chartered flights over the Great Rift Valley and dawn hot air balloon flights over the Maasai Mara migration herds.',
    stops: [
      {
        id: 'nairobi-samburu',
        name: 'Nairobi & Samburu',
        daysTag: 'Days 1-4',
        description: 'Historic manor encounters and the rugged red terrain of northern Kenya.',
        slides: [
          {
            day: 'Days 1-2',
            title: 'Breakfast at Giraffe Manor & Daphne Sheldrick Sanctuary',
            desc: 'Stay at the legendary Giraffe Manor where friendly giraffes poke their heads through breakfast windows. Visit orphaned baby elephants.',
            image: '/2024/01/navigation-kenya.jpg',
            stay: 'Giraffe Manor, The Safari Collection — Historic Suite',
            dining: 'Afternoon English high tea shared with Rothschild giraffes'
          },
          {
            day: 'Days 3-4',
            title: 'Samburu Special Five & Granite Rock Villas',
            desc: 'Charter a private plane to northern Samburu to track reticulated giraffes, Grevy’s zebras, and leopards with Samburu warriors.',
            image: '/2022/08/zebra-chobe-national-park-botswana-1.jpg',
            stay: 'Saruni Samburu — Open-Air Granite Clifftop Villa',
            dining: 'Bush dinner under ancient acacia trees'
          }
        ]
      },
      {
        id: 'maasai-mara',
        name: 'Maasai Mara',
        daysTag: 'Days 5-8',
        description: 'The world’s most celebrated wildlife amphitheater.',
        slides: [
          {
            day: 'Days 5-8',
            title: 'Dawn Hot Air Balloon & Big Five Game Tracking',
            desc: 'Float above the Mara plains at sunrise as thousands of wildebeest traverse the savannah below. Land for a champagne bush breakfast, followed by thrilling predator tracking.',
            image: '/2020/05/WEB-Heli-Hiking.jpg',
            stay: 'Angama Mara — 1,000ft Clifftop Tented Suite',
            dining: 'Champagne bush breakfast & sundowner cocktails on the escarpment'
          }
        ]
      }
    ]
  }
};

export function findTripBySlugOrTitle(identifier: string): TripDetail | null {
  if (!identifier) return null;
  const clean = identifier.toLowerCase().trim().replace(/^\/|\/$/g, '');
  
  // 1. Direct slug match
  if (tripsDatabase[clean]) {
    return tripsDatabase[clean];
  }

  // 2. Extract last path segment if full URL passed (e.g., destinations/brazil/the-rhythm-of-water)
  const segments = clean.split('/');
  const lastSeg = segments[segments.length - 1];
  if (tripsDatabase[lastSeg]) {
    return tripsDatabase[lastSeg];
  }

  // 3. Search by partial slug or country or title
  for (const key of Object.keys(tripsDatabase)) {
    const trip = tripsDatabase[key];
    if (clean.includes(key) || key.includes(clean)) {
      return trip;
    }
    if (trip.country.toLowerCase() === clean || clean.includes(trip.country.toLowerCase())) {
      return trip;
    }
    const cleanTitle = trip.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    if (cleanTitle.includes(clean) || clean.includes(cleanTitle)) {
      return trip;
    }
  }

  return null;
}
