import { useState, useRef, useEffect, useMemo } from "react";
import { Heart, MessageCircle, Share2, Music, Play, Pause, ThumbsUp, Bookmark } from "lucide-react";
import { generateReels } from "@/data/mockData";

const Reels = () => {
  const reels = useMemo(() => generateReels(15), []);
  const [currentReel, setCurrentReel] = useState(0);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleLike = (index: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const toggleSave = (index: number) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const height = container.clientHeight;
      const index = Math.round(scrollTop / height);
      setCurrentReel(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-56px)] overflow-y-auto snap-y snap-mandatory scrollbar-hide"
    >
      {reels.map((reel, index) => (
        <div
          key={reel.id}
          className="relative h-[calc(100vh-56px)] w-full snap-start snap-always flex items-center justify-center bg-black"
        >
          {/* Background image */}
          <img
            src={reel.thumbnail}
            alt={reel.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading={index < 3 ? "eager" : "lazy"}
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* Play/Pause toggle */}
          <button
            onClick={() => setPlaying(!playing)}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            {!playing && currentReel === index && (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <Play className="h-10 w-10 text-white ml-1" fill="white" />
              </div>
            )}
          </button>

          {/* Right side actions */}
          <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6">
            {/* Like */}
            <button onClick={() => toggleLike(index)} className="flex flex-col items-center gap-1">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${liked.has(index) ? 'bg-red-500/20' : 'bg-white/10'} backdrop-blur-sm`}>
                <Heart className={`h-6 w-6 ${liked.has(index) ? "fill-red-500 text-red-500" : "text-white"}`} />
              </div>
              <span className="text-xs text-white font-medium">{reel.likes}</span>
            </button>

            {/* Comment */}
            <button className="flex flex-col items-center gap-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-white font-medium">Comment</span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center gap-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-white font-medium">Share</span>
            </button>

            {/* Save */}
            <button onClick={() => toggleSave(index)} className="flex flex-col items-center gap-1">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${saved.has(index) ? 'bg-primary/20' : 'bg-white/10'} backdrop-blur-sm`}>
                <Bookmark className={`h-6 w-6 ${saved.has(index) ? "fill-primary text-primary" : "text-white"}`} />
              </div>
              <span className="text-xs text-white font-medium">Save</span>
            </button>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-6 left-4 right-20 z-20">
            {/* Salon info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-primary/30 border-2 border-primary overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=80&h=80&fit=crop`}
                  alt={reel.salon}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{reel.salon}</p>
                <p className="text-xs text-white/60">Verified Salon ✓</p>
              </div>
              <button className="ml-2 rounded-full border border-white/30 px-4 py-1 text-xs font-medium text-white hover:bg-white/10">
                Follow
              </button>
            </div>

            {/* Title */}
            <p className="text-sm text-white mb-2 line-clamp-2">{reel.title}</p>

            {/* Category badge */}
            <span className="inline-block rounded-full bg-primary/20 backdrop-blur-sm px-3 py-1 text-xs text-primary font-medium">
              {reel.category}
            </span>

            {/* Music bar */}
            <div className="mt-3 flex items-center gap-2">
              <Music className="h-3.5 w-3.5 text-white/70" />
              <div className="overflow-hidden">
                <p className="text-xs text-white/70 animate-marquee whitespace-nowrap">
                  🎵 Trending Salon Music • Beauty Vibes • {reel.salon}
                </p>
              </div>
            </div>

            {/* Views */}
            <p className="mt-2 text-xs text-white/50">{reel.views} views</p>
          </div>

          {/* Progress indicator */}
          {currentReel === index && (
            <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
              {reels.slice(0, 5).map((_, i) => (
                <div key={i} className="h-0.5 flex-1 rounded-full bg-white/20 overflow-hidden">
                  {i <= currentReel % 5 && (
                    <div className="h-full bg-primary rounded-full" style={{ width: i === currentReel % 5 ? '60%' : '100%' }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reels;
