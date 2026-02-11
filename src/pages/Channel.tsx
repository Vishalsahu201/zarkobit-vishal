import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Bell } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import { generateVideos, subscriptions } from "@/data/mockData";

const tabs = ["Videos", "Shorts", "Live", "Playlists", "Community", "About"];

const Channel = () => {
  const { id } = useParams();
  const channel = subscriptions.find((c) => c.id === id) || subscriptions[0];
  const videos = useMemo(() => generateVideos(8), []);
  const [activeTab, setActiveTab] = useState("Videos");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      {/* Banner */}
      <div className="h-32 w-full bg-gradient-to-r from-primary/30 via-surface-elevated to-primary/10 sm:h-48" />

      {/* Channel info */}
      <div className="flex flex-wrap items-start gap-5 px-6 py-4">
        <img
          src={channel.avatar}
          alt={channel.name}
          className="h-20 w-20 rounded-full border-2 border-background object-cover sm:h-28 sm:w-28"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">{channel.name}</h1>
            {channel.verified && <CheckCircle2 className="h-5 w-5 text-muted-foreground" />}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            @{channel.name.toLowerCase().replace(/\s/g, "")} · {channel.subscribers} · 245 videos
          </p>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            Welcome to {channel.name}! We create amazing content about tech and programming.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => setSubscribed(!subscribed)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
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
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 pt-2 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Videos grid */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-6 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Channel;
