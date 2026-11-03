export interface ScheduledTourItem {
  id: string;
  title: string;
  destination: string;
  time?: string;
  duration?: string;
  seats?: string;
  status: 'available' | 'filling' | 'soldout';
  price?: string;
  img: string;
  desc?: string;
}

export type ScheduledToursMap = Record<string, ScheduledTourItem[]>;

export const DEFAULT_SCHEDULED_TOURS: ScheduledToursMap = {
  // NOVEMBER 2026
  "2026-11-14": [
    {
      id: "sajek-2611a",
      title: "SAJEK VALLEY LUXURY CLOUD RESORT & HELIPAD SUNSET",
      destination: "SAJEK VALLEY",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "4 SEATS LEFT",
      status: "available",
      price: "৳ 18,500",
      img: "/uploads/images/obintehasan_pindown_io_1793483591-mvwxtycm.jpg",
      desc: "Private 4x4 Chander Gari, balcony cloud view resort, Konglak peak sunset and indigenous Lusai village."
    },
    {
      id: "bandarban-2611a",
      title: "BANDARBAN NILGIRI PEAK & GOLDEN TEMPLE EXPEDITION",
      destination: "BANDARBAN",
      time: "5:30 AM",
      duration: "4 NIGHTS",
      seats: "2 SEATS LEFT",
      status: "filling",
      price: "৳ 22,000",
      img: "/uploads/images/From_Klickpin_com-_Copy_this_guide_to_elegant_herb-mvwx285b.jpg",
      desc: "Over-the-clouds stay at Nilgiri Resort, Shoilo Propat waterfall, and Marma indigenous tribal cultural tour."
    }
  ],
  "2026-11-21": [
    {
      id: "sylhet-2611b",
      title: "SREEMANGAL TEA RETREAT & RATARGUL SWAMP FOREST",
      destination: "SYLHET & SREEMANGAL",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "6 SEATS LEFT",
      status: "available",
      price: "৳ 17,500",
      img: "/uploads/images/From_Klickpin_com-_Tailor-made_daily_stitch_inspir-mvwk2bs4.jpg",
      desc: "Lush green tea gardens, Lawachara rainforest trail, and wooden canoe cruise through Ratargul swamp forest."
    },
    {
      id: "coxsbazar-2611b",
      title: "COX'S BAZAR 5-STAR BEACH RESORT & PRIVATE YACHT",
      destination: "COX'S BAZAR",
      time: "7:00 AM",
      duration: "4 NIGHTS",
      seats: "5 SEATS LEFT",
      status: "available",
      price: "৳ 26,000",
      img: "/uploads/images/From_Klickpin_com-_1010776710108124418-pin-id-1010-mvwjuz21.jpg",
      desc: "Inani Beach 5-star oceanfront suite, scenic Marine Drive, and sunset yacht cruise on the Bay of Bengal."
    }
  ],
  "2026-11-28": [
    {
      id: "tanguar-2611c",
      title: "TANGUAR HAOR LUXURY HOUSEBOAT & NILADRI LAKE",
      destination: "TANGUAR HAOR",
      time: "6:30 AM",
      duration: "3 NIGHTS",
      seats: "4 SEATS LEFT",
      status: "available",
      price: "৳ 20,500",
      img: "/uploads/1745423877995-boat-hero-cover.jpg",
      desc: "Premium wooden houseboat with private chef on pristine waters, watchtower cruise, and Niladri lake."
    },
    {
      id: "sajek-2611c",
      title: "SAJEK VALLEY WINTER SPECIAL CLOUD EXPEDITION",
      destination: "SAJEK VALLEY",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "3 SEATS LEFT",
      status: "filling",
      price: "৳ 19,000",
      img: "/2024/05/Tom-Marchant-Values-Film-scaled-1.jpg",
      desc: "Winter clouds over valleys, private barbecue evening, and panoramic vistas from Konglak hill."
    }
  ],

  // DECEMBER 2026
  "2026-12-05": [
    {
      id: "bandarban-2612a",
      title: "BANDARBAN KEOKRADONG PEAK HIKING EXPEDITION",
      destination: "BANDARBAN",
      time: "5:00 AM",
      duration: "4 NIGHTS",
      seats: "8 SEATS LEFT",
      status: "available",
      price: "৳ 21,500",
      img: "/uploads/images/From_Klickpin_com-_Copy_this_guide_to_elegant_herb-mvwx285b.jpg",
      desc: "Adventure climb to Keokradong peak, Boga Lake indigenous settlement, and highland cloud forest."
    }
  ],
  "2026-12-12": [
    {
      id: "sajek-2612b",
      title: "SAJEK VALLEY PREMIUM WEEKEND RETREAT #12",
      destination: "SAJEK VALLEY",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "4 SEATS LEFT",
      status: "available",
      price: "৳ 18,500",
      img: "/uploads/images/obintehasan_pindown_io_1793483591-mvwxtycm.jpg",
      desc: "Curated weekend cloud sanctuary with private 4x4 Chander Gari and hilltop dining."
    }
  ],
  "2026-12-19": [
    {
      id: "kuakata-2612c",
      title: "KUAKATA BEACH SUNRISE & SUNSET LUXURY ESCAPE",
      destination: "KUAKATA",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "6 SEATS LEFT",
      status: "available",
      price: "৳ 16,500",
      img: "/2026/01/Couple-sitting-by-coast.jpg",
      desc: "Rare panoramic sunrise and sunset from the same beach, Rakhine indigenous community, and island boat safari."
    },
    {
      id: "sreemangal-2612c",
      title: "SREEMANGAL TEA RESORT & MADHABPUR LAKE",
      destination: "SREEMANGAL",
      time: "6:30 AM",
      duration: "3 NIGHTS",
      seats: "3 SEATS LEFT",
      status: "filling",
      price: "৳ 17,000",
      img: "/uploads/images/From_Klickpin_com-_Tailor-made_daily_stitch_inspir-mvwk2bs4.jpg",
      desc: "Tea estate luxury stay, blue water lilies of Madhabpur lake, and organic tea tasting."
    }
  ],
  "2026-12-26": [
    {
      id: "year-end-2612d",
      title: "YEAR-END GRAND BANDARBAN HIGHLAND GALA",
      destination: "BANDARBAN",
      time: "5:30 AM",
      duration: "4 NIGHTS",
      seats: "SOLD OUT",
      status: "soldout",
      price: "৳ 25,000",
      img: "/uploads/images/From_Klickpin_com-_Copy_this_guide_to_elegant_herb-mvwx285b.jpg",
      desc: "Special New Year Eve celebration on mountain peaks with private gala dinner and cultural performance."
    }
  ],

  // JANUARY 2027
  "2027-01-08": [
    {
      id: "sajek-2701a",
      title: "NEW YEAR SAJEK VALLEY WINTER FEST 2027",
      destination: "SAJEK VALLEY",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "8 SEATS LEFT",
      status: "available",
      price: "৳ 18,500",
      img: "/uploads/images/obintehasan_pindown_io_1793483591-mvwxtycm.jpg",
      desc: "Welcome the new year high above the clouds in cozy wooden cottages."
    }
  ],
  "2027-01-15": [
    {
      id: "tanguar-2701b",
      title: "TANGUAR HAOR MIGRATORY BIRDS & LUXURY HOUSEBOAT",
      destination: "TANGUAR HAOR",
      time: "6:00 AM",
      duration: "3 NIGHTS",
      seats: "5 SEATS LEFT",
      status: "available",
      price: "৳ 21,000",
      img: "/uploads/1745423877995-boat-hero-cover.jpg",
      desc: "Thousands of winter migratory birds, crystal clear waters, and 5-star private houseboat stay."
    }
  ]
};
