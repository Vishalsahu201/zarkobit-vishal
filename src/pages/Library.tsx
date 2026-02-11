import { useMemo } from "react";
import { Clock, ThumbsUp, PlaySquare, ListVideo } from "lucide-react";
import { Link } from "react-router-dom";
import { generateVideos } from "@/data/mockData";

const sections = [
  { icon: Clock, label: "History", count: 142 },
  { icon: PlaySquare, label: "Your videos", count: 24 },
  { icon: ThumbsUp, label: "Liked videos", count: 87 },
  { icon: ListVideo, label: "Watch later", count: 31 },
];

const Library = () => {
  const recentVideos = useMemo(() => generateVideos(8), []);

  return (
    <div className="px-6 py-6">
      {/* Quick access cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sections.map(({ icon: Icon, label, count }) => (
          <div
            key={label}
            className="flex cursor-pointer items-center gap-4 rounded-xl bg-card p-4 transition-colors hover:bg-surface-hover"
          >
            <Icon className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{count} videos</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent history */}
      <h2 className="mb-4 text-xl font-bold text-foreground">Recently Watched</h2>
      <div className="flex flex-col gap-3">
        {recentVideos.map((video) => (
          <Link
            key={video.id}
            to={`/watch/${video.id}`}
            className="group flex gap-4 rounded-xl p-2 hover:bg-secondary"
          >
            <div className="relative aspect-video w-40 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-1 right-1 rounded bg-background/90 px-1 py-0.5 text-[10px] font-medium text-foreground">
                {video.duration}
              </span>
            </div>
            <div className="min-w-0 flex-1 py-0.5">
              <h3 className="line-clamp-2 text-sm font-medium text-foreground">
                {video.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {video.channel} · {video.views}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Library;
