import { useMemo } from "react";
import VideoCard from "@/components/VideoCard";
import CategoryChips from "@/components/CategoryChips";
import { generateVideos } from "@/data/mockData";

const Index = () => {
  const videos = useMemo(() => generateVideos(16), []);

  return (
    <div className="px-4 pb-8">
      <CategoryChips />
      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Index;
