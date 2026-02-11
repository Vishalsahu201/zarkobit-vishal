import { Link } from "react-router-dom";
import { MoreVertical, CheckCircle2 } from "lucide-react";
import type { Video } from "@/data/mockData";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className="group cursor-pointer">
      <Link to={`/watch/${video.id}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 rounded bg-background/90 px-1.5 py-0.5 text-xs font-medium text-foreground">
            {video.duration}
          </span>
        </div>
      </Link>
      <div className="mt-3 flex gap-3">
        <Link to={`/channel/${video.channel}`} className="flex-shrink-0">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="h-9 w-9 rounded-full object-cover"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/watch/${video.id}`}>
            <h3 className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
              {video.title}
            </h3>
          </Link>
          <Link
            to={`/channel/${video.channel}`}
            className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <span>{video.channel}</span>
            {video.verified && <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />}
          </Link>
          <p className="text-xs text-muted-foreground">
            {video.views} · {video.timestamp}
          </p>
        </div>
        <button className="h-6 flex-shrink-0 opacity-0 group-hover:opacity-100">
          <MoreVertical className="h-5 w-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
