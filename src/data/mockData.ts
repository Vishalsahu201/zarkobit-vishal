export interface SalonService {
  id: string;
  title: string;
  image: string;
  category: string;
  price: string;
  duration: string;
  rating: number;
  salon: string;
  salonAvatar: string;
  reviews: string;
  verified?: boolean;
}

export interface Reel {
  id: string;
  thumbnail: string;
  title: string;
  salon: string;
  likes: string;
  views: string;
  category: string;
}

export interface Stylist {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  reviews: number;
}

const serviceImages = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=640&h=360&fit=crop",
];

const reelImages = [
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=360&h=640&fit=crop",
  "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=360&h=640&fit=crop",
];

const salonAvatars = [
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=80&h=80&fit=crop",
];

const stylistAvatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
];

const salonNames = [
  "Glamour Studio", "Royal Cuts", "Elegance Salon", "Luxe Beauty Bar",
  "The Style Lounge", "Shine & Glow", "Prestige Hair", "Crown Beauty"
];

const serviceTitles = [
  "Premium Hair Coloring & Highlights - Complete Transformation",
  "Luxury Bridal Makeup Package - HD Airbrush Finish",
  "Keratin Hair Treatment - Smooth & Silky Results",
  "Men's Fade Haircut - Modern Trending Styles",
  "Full Body Spa Package - Relaxation & Rejuvenation",
  "Nail Art & Gel Manicure - Creative Designs",
  "Deep Facial Treatment - Anti-Aging & Glow",
  "Hair Extensions - Natural Seamless Look",
  "Eyebrow Threading & Shaping - Perfect Arch",
  "Balayage Hair Color - Sun-Kissed Look",
  "Head Massage & Oil Treatment - Stress Relief",
  "Beard Grooming & Styling - Sharp Clean Look",
  "Skin Whitening Facial - Brightening Formula",
  "Party Makeup - Glamorous Evening Look",
  "Hair Straightening - Permanent Smooth Finish",
  "Mehndi Design - Traditional & Modern Art",
];

const reelTitles = [
  "Amazing hair transformation! ✨",
  "Bridal look tutorial 💄",
  "Quick fade haircut 🔥",
  "Nail art timelapse 💅",
  "Before & After coloring 🎨",
  "Skincare routine secrets 🧖",
  "Men's grooming tips 💈",
  "Wedding hairstyle ideas 👰",
  "Makeup hacks you need! 💋",
  "Salon tour - luxury vibes ✨",
];

const prices = ["₹499", "₹999", "₹1,499", "₹2,999", "₹799", "₹599", "₹1,999", "₹3,499", "₹299", "₹1,299"];
const durations = ["30 min", "45 min", "1 hr", "1.5 hr", "2 hr", "20 min", "1 hr", "2.5 hr"];
const reviews = ["1.2K reviews", "850 reviews", "2.3K reviews", "456 reviews", "3.1K reviews", "120 reviews", "780 reviews", "1.5K reviews"];

export const categories = [
  "All", "Haircut", "Makeup", "Facial", "Spa", "Nails", "Bridal", "Men's Grooming",
  "Hair Color", "Skincare", "Massage", "Beard", "Extensions", "Mehndi"
];

export const generateServices = (count: number = 16): SalonService[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `service-${i + 1}`,
    title: serviceTitles[i % serviceTitles.length],
    image: serviceImages[i % serviceImages.length],
    category: categories[(i % (categories.length - 1)) + 1],
    price: prices[i % prices.length],
    duration: durations[i % durations.length],
    rating: 4 + Math.random() * 0.9,
    salon: salonNames[i % salonNames.length],
    salonAvatar: salonAvatars[i % salonAvatars.length],
    reviews: reviews[i % reviews.length],
    verified: i % 3 === 0,
  }));
};

export const generateReels = (count: number = 10): Reel[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `reel-${i + 1}`,
    thumbnail: reelImages[i % reelImages.length],
    title: reelTitles[i % reelTitles.length],
    salon: salonNames[i % salonNames.length],
    likes: `${(Math.random() * 50 + 1).toFixed(1)}K`,
    views: `${(Math.random() * 200 + 10).toFixed(0)}K`,
    category: categories[(i % (categories.length - 1)) + 1],
  }));
};

export const stylists: Stylist[] = [
  { id: "s1", name: "Priya Sharma", avatar: stylistAvatars[1], specialty: "Hair Coloring Expert", rating: 4.9, reviews: 342 },
  { id: "s2", name: "Rahul Verma", avatar: stylistAvatars[0], specialty: "Men's Grooming Specialist", rating: 4.8, reviews: 218 },
  { id: "s3", name: "Anita Desai", avatar: stylistAvatars[3], specialty: "Bridal Makeup Artist", rating: 5.0, reviews: 567 },
  { id: "s4", name: "Vikram Singh", avatar: stylistAvatars[2], specialty: "Hair Styling Pro", rating: 4.7, reviews: 189 },
  { id: "s5", name: "Neha Gupta", avatar: stylistAvatars[4], specialty: "Skincare Specialist", rating: 4.9, reviews: 423 },
];

export const salonList = salonNames.map((name, i) => ({
  id: `salon-${i}`,
  name,
  avatar: salonAvatars[i % salonAvatars.length],
  subscribers: `${(Math.random() * 50 + 5).toFixed(1)}K followers`,
  verified: i % 2 === 0,
}));

export const faceScanResults = [
  { style: "Layered Bob Cut", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop", match: 95 },
  { style: "Soft Waves", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop", match: 91 },
  { style: "Pixie Cut", image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop", match: 87 },
  { style: "Straight & Sleek", image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=400&fit=crop", match: 84 },
  { style: "Messy Bun", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=400&h=400&fit=crop", match: 80 },
  { style: "Curtain Bangs", image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&h=400&fit=crop", match: 78 },
];
