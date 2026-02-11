import { useMemo } from "react";
import { Heart, Play } from "lucide-react";
import { generateReels } from "@/data/mockData";

const Reels = () => {
  const reels = useMemo(() => generateReels(10), []);

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <Play className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Salon Reels</h1>
          <p className="text-xs text-muted-foreground">Watch trending salon transformations</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {reels.map((reel) => (
          <div key={reel.id} className="group relative cursor-pointer overflow-hidden rounded-xl card-shine">
            <div className="aspect-[9/16] w-full">
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 gold-glow">
                <Play className="h-6 w-6 text-primary-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
              <p className="text-sm font-medium text-foreground line-clamp-2">{reel.title}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{reel.salon}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Heart className="h-3 w-3" /> {reel.likes}
                </div>
              </div>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{reel.views} views</span>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">{reel.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
