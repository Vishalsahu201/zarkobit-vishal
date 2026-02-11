export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar: string;
  views: string;
  timestamp: string;
  duration: string;
  verified?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  verified?: boolean;
}

const thumbnails = [
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=640&h=360&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=640&h=360&fit=crop",
];

const avatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcabd9c?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop",
];

const channelNames = [
  "TechVault", "CodeStream", "DevMasters", "PixelCraft Studio",
  "ByteSize Learning", "The Code Report", "Frontend Wizards", "FullStack Pro"
];

const videoTitles = [
  "Building a YouTube Clone with React & TypeScript - Full Tutorial",
  "10 CSS Tricks You Didn't Know Existed in 2025",
  "Why Every Developer Should Learn System Design",
  "React 19 New Features - Complete Breakdown",
  "The Future of Web Development - AI Tools You Need",
  "Master Tailwind CSS in 20 Minutes - Beginner to Pro",
  "How I Built a SaaS That Makes $10K/Month",
  "JavaScript Interview Questions - Top 50 for 2025",
  "Next.js vs Remix vs Astro - Which Should You Choose?",
  "Building Real-Time Apps with WebSockets",
  "Docker for Beginners - Complete Guide",
  "Why TypeScript is Taking Over the World",
  "Python vs JavaScript - Which is Better in 2025?",
  "GraphQL Complete Tutorial - REST is Dead?",
  "How to Deploy Your App for Free - 5 Best Platforms",
  "Microservices Architecture Explained in 10 Minutes",
];

const durations = [
  "12:34", "8:21", "15:02", "22:47", "6:15", "18:30", "10:05", "45:12",
  "7:33", "31:20", "14:18", "9:45", "20:11", "16:55", "5:42", "28:03"
];

const views = [
  "1.2M views", "850K views", "2.3M views", "456K views", "3.1M views",
  "120K views", "780K views", "1.5M views", "92K views", "2.8M views",
  "340K views", "1.1M views", "67K views", "4.2M views", "210K views", "560K views"
];

const timestamps = [
  "2 hours ago", "1 day ago", "3 days ago", "1 week ago", "2 weeks ago",
  "3 weeks ago", "1 month ago", "2 months ago", "5 hours ago", "12 hours ago",
  "4 days ago", "6 days ago", "8 hours ago", "3 hours ago", "2 days ago", "5 days ago"
];

export const generateVideos = (count: number = 16): Video[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `video-${i + 1}`,
    title: videoTitles[i % videoTitles.length],
    thumbnail: thumbnails[i % thumbnails.length],
    channel: channelNames[i % channelNames.length],
    channelAvatar: avatars[i % avatars.length],
    views: views[i % views.length],
    timestamp: timestamps[i % timestamps.length],
    duration: durations[i % durations.length],
    verified: i % 3 === 0,
  }));
};

export const categories = [
  "All", "Gaming", "Music", "Live", "Programming", "React", "TypeScript",
  "Web Design", "AI", "Podcasts", "News", "Sports", "Comedy", "Movies"
];

export const subscriptions: Channel[] = channelNames.map((name, i) => ({
  id: `channel-${i}`,
  name,
  avatar: avatars[i % avatars.length],
  subscribers: `${(Math.random() * 5 + 0.1).toFixed(1)}M subscribers`,
  verified: i % 2 === 0,
}));
