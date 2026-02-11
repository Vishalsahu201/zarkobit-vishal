import { useMemo } from "react";
import VideoCard from "@/components/VideoCard";
import { generateVideos, subscriptions } from "@/data/mockData";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Subscriptions = () => {
  const videos = useMemo(() => generateVideos(12), []);

  return (
    <div className="px-6 py-6">
      {/* Channel list */}
      <div className="mb-6 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {subscriptions.map((ch) => (
          <Link
            key={ch.id}
            to={`/channel/${ch.id}`}
            className="flex flex-shrink-0 flex-col items-center gap-1"
          >
            <img
              src={ch.avatar}
              alt={ch.name}
              className="h-16 w-16 rounded-full border-2 border-primary object-cover"
            />
            <span className="flex items-center gap-0.5 text-xs text-foreground">
              {ch.name}
              {ch.verified && <CheckCircle2 className="h-3 w-3 text-muted-foreground" />}
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-bold text-foreground">Latest Videos</h2>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
