import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal,
  CheckCircle2, Bell
} from "lucide-react";
import VideoCard from "@/components/VideoCard";
import { generateVideos } from "@/data/mockData";

const Watch = () => {
  const { id } = useParams();
  const videos = useMemo(() => generateVideos(16), []);
  const current = videos.find((v) => v.id === id) || videos[0];
  const related = videos.filter((v) => v.id !== current.id).slice(0, 8);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div className="flex flex-col gap-6 px-6 py-4 lg:flex-row">
      {/* Main content */}
      <div className="flex-1">
        {/* Video player area */}
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-card">
          <img
            src={current.thumbnail}
            alt={current.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="mt-3 text-xl font-semibold text-foreground">{current.title}</h1>

        {/* Channel info + actions */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={current.channelAvatar}
              alt={current.channel}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-foreground">{current.channel}</span>
                {current.verified && <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />}
              </div>
              <span className="text-xs text-muted-foreground">1.2M subscribers</span>
            </div>
            <button
              onClick={() => setSubscribed(!subscribed)}
              className={`ml-4 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                subscribed
                  ? "bg-secondary text-foreground"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </button>
            {subscribed && (
              <button className="rounded-full p-2 hover:bg-secondary">
                <Bell className="h-5 w-5 text-foreground" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-full bg-secondary">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-2 border-r border-border px-4 py-2 text-sm hover:bg-surface-hover ${
                  liked ? "text-primary" : "text-foreground"
                }`}
              >
                <ThumbsUp className="h-5 w-5" />
                <span>24K</span>
              </button>
              <button className="px-4 py-2 hover:bg-surface-hover">
                <ThumbsDown className="h-5 w-5 text-foreground" />
              </button>
            </div>
            <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground hover:bg-surface-hover">
              <Share2 className="h-5 w-5" /> Share
            </button>
            <button className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-foreground hover:bg-surface-hover">
              <Download className="h-5 w-5" /> Download
            </button>
            <button className="rounded-full bg-secondary p-2 hover:bg-surface-hover">
              <MoreHorizontal className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 rounded-xl bg-card p-3">
          <p className="text-sm font-medium text-foreground">
            {current.views} · {current.timestamp}
          </p>
          <p className="mt-2 text-sm text-foreground/80">
            In this video, we dive deep into modern web development techniques. Learn how to build
            beautiful, responsive applications using the latest frameworks and tools. Don't forget
            to like and subscribe for more content!
          </p>
        </div>

        {/* Comments section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-foreground">128 Comments</h3>
          <div className="mt-4 flex gap-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary" />
            <input
              placeholder="Add a comment..."
              className="w-full border-b border-border bg-transparent pb-1 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
            />
          </div>
          {/* Sample comments */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="mt-4 flex gap-3">
              <img
                src={`https://images.unsplash.com/photo-${1500000000000 + i * 48382}?w=40&h=40&fit=crop`}
                alt="commenter"
                className="h-10 w-10 flex-shrink-0 rounded-full bg-secondary object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">@user{i}dev</span>
                  <span className="text-xs text-muted-foreground">{i} day{i > 1 ? "s" : ""} ago</span>
                </div>
                <p className="mt-1 text-sm text-foreground/80">
                  Great tutorial! Really helped me understand the concepts. Keep up the amazing work! 🔥
                </p>
                <div className="mt-2 flex items-center gap-4">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4" /> {12 * i}
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related videos */}
      <div className="w-full lg:w-96">
        <h3 className="mb-3 text-sm font-medium text-foreground">Related Videos</h3>
        <div className="flex flex-col gap-3">
          {related.map((video) => (
            <Link
              key={video.id}
              to={`/watch/${video.id}`}
              className="group flex gap-2 rounded-lg p-1 hover:bg-secondary"
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
              <div className="min-w-0 flex-1">
                <h4 className="line-clamp-2 text-sm font-medium text-foreground">
                  {video.title}
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">{video.channel}</p>
                <p className="text-xs text-muted-foreground">
                  {video.views} · {video.timestamp}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watch;
