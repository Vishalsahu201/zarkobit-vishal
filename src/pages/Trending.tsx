import { useMemo } from "react";
import { Flame, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { generateVideos } from "@/data/mockData";

const Trending = () => {
  const videos = useMemo(() => generateVideos(12), []);

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <Flame className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Trending</h1>
      </div>
      <div className="flex flex-col gap-4">
        {videos.map((video, i) => (
          <Link
            key={video.id}
            to={`/watch/${video.id}`}
            className="group flex gap-4 rounded-xl p-2 hover:bg-secondary"
          >
            <div className="relative aspect-video w-64 flex-shrink-0 overflow-hidden rounded-xl">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 text-xs font-medium text-foreground">
                {video.duration}
              </span>
            </div>
            <div className="flex-1 py-1">
              <h3 className="line-clamp-2 text-lg font-medium text-foreground">
                {video.title}
              </h3>
              <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                <span>{video.channel}</span>
                {video.verified && <CheckCircle2 className="h-3.5 w-3.5" />}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {video.views} · {video.timestamp}
              </p>
              <span className="mt-2 inline-block rounded bg-chip px-2 py-0.5 text-xs text-chip-foreground">
                #{i + 1} on Trending
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
