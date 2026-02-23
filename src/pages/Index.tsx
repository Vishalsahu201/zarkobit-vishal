import { useMemo } from "react";
import { Sparkles, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceCard from "@/components/ServiceCard";
import CategoryChips from "@/components/CategoryChips";
import { generateServices, generateReels, stylists } from "@/data/mockData";

const Index = () => {
  const services = useMemo(() => generateServices(12), []);
  const reels = useMemo(() => generateReels(6), []);

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="relative mx-4 mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-surface-elevated to-primary/10 p-8 gold-border">
        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold gold-gradient-text sm:text-4xl">
            Your Perfect Look Awaits
          </h1>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            Discover premium salon services, trending styles, and AI-powered recommendations personalized for you.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/services"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 gold-glow"
            >
              Explore Services
            </Link>
            <Link
              to="/face-scan"
              className="flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-secondary"
            >
              <Sparkles className="h-4 w-4 text-primary" /> AI Face Scan
            </Link>
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20">
          <div className="h-full w-full bg-gradient-to-l from-primary/30 to-transparent" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4">
        <CategoryChips />
      </div>

      {/* Top Stylists */}
      <div className="px-4 mt-2 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-foreground">Top Stylists</h2>
          <button className="flex items-center gap-1 text-xs text-primary hover:underline">
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {stylists.map((stylist) => (
            <div key={stylist.id} className="flex flex-shrink-0 flex-col items-center gap-2 w-20">
              <div className="relative">
                <img
                  src={stylist.avatar}
                  alt={stylist.name}
                  className="h-16 w-16 rounded-full object-cover gold-border p-0.5"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                  <Star className="h-2.5 w-2.5 fill-current" /> {stylist.rating}
                </div>
              </div>
              <span className="text-[11px] text-center text-foreground line-clamp-1">{stylist.name}</span>
              <span className="text-[10px] text-center text-muted-foreground line-clamp-1">{stylist.specialty.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reels Section */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-foreground">🔥 Trending Reels</h2>
          <Link to="/reels" className="flex items-center gap-1 text-xs text-primary hover:underline">
            See all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {reels.map((reel) => (
            <Link
              key={reel.id}
              to="/reels"
              className="group relative flex-shrink-0 w-36 overflow-hidden rounded-xl"
            >
              <div className="aspect-[9/16] w-full">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs font-medium text-foreground line-clamp-2">{reel.title}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{reel.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pricing CTA */}
      <div className="px-4 mb-8">
        <div className="rounded-2xl bg-gradient-to-r from-primary/15 via-card to-primary/10 p-6 gold-border text-center">
          <h2 className="font-display text-xl font-bold gold-gradient-text">Go Premium ✨</h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Get unlimited AI Face Scans, 20% off services, priority booking & more from just ₹99/month
          </p>
          <Link
            to="/pricing"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90"
          >
            View Plans <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-4">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Popular Services</h2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
