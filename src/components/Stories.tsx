import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Heart, Send, Play, Pause } from "lucide-react";
import { stylists } from "@/data/mockData";

interface Story {
  id: string;
  type: "image" | "video";
  url: string;
  caption: string;
  duration: number;
}

interface StoryGroup {
  id: string;
  name: string;
  avatar: string;
  stories: Story[];
  seen: boolean;
}

const storyGroups: StoryGroup[] = stylists.map((s, i) => ({
  id: s.id,
  name: s.name.split(" ")[0],
  avatar: s.avatar,
  seen: i > 2,
  stories: [
    {
      id: `${s.id}-1`,
      type: "image",
      url: `https://images.unsplash.com/photo-${
        ["1560066984-138dadb4c035", "1522337360788-8b13dee7a37e", "1487412947147-5cebf100ffc2", "1519699047748-de8e457a634e", "1562322140-8baeececf3df"][i % 5]
      }?w=720&h=1280&fit=crop`,
      caption: ["New hair transformation! ✨", "Before & After 🔥", "Client makeover 💄", "Fresh fade cut 💈", "Bridal look ready 👰"][i % 5],
      duration: 5000,
    },
    {
      id: `${s.id}-2`,
      type: "image",
      url: `https://images.unsplash.com/photo-${
        ["1605497788044-5a32c7078486", "1516975080664-ed2fc6a32937", "1492106087820-71f1a00d2b11", "1596178060671-7a80dc8059ea", "1470259078422-826894b933aa"][i % 5]
      }?w=720&h=1280&fit=crop`,
      caption: ["Salon vibes today ✨", "New products alert! 🧴", "Happy client 😊", "Style check 💇", "Weekend special 🎉"][i % 5],
      duration: 5000,
    },
  ],
}));

const Stories = () => {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const currentGroup = activeGroup !== null ? storyGroups[activeGroup] : null;
  const currentStory = currentGroup?.stories[activeStory];

  useEffect(() => {
    if (activeGroup === null || paused) return;

    const duration = currentStory?.duration || 5000;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeGroup, activeStory, paused]);

  const handleNext = () => {
    if (!currentGroup) return;
    if (activeStory < currentGroup.stories.length - 1) {
      setActiveStory((p) => p + 1);
      setProgress(0);
    } else if (activeGroup !== null && activeGroup < storyGroups.length - 1) {
      setActiveGroup((p) => (p !== null ? p + 1 : null));
      setActiveStory(0);
      setProgress(0);
    } else {
      setActiveGroup(null);
      setActiveStory(0);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (activeStory > 0) {
      setActiveStory((p) => p - 1);
      setProgress(0);
    } else if (activeGroup !== null && activeGroup > 0) {
      setActiveGroup((p) => (p !== null ? p - 1 : null));
      setActiveStory(0);
      setProgress(0);
    }
  };

  const openStory = (index: number) => {
    setActiveGroup(index);
    setActiveStory(0);
    setProgress(0);
    setPaused(false);
  };

  const closeStory = () => {
    setActiveGroup(null);
    setActiveStory(0);
    setProgress(0);
  };

  return (
    <>
      {/* Story circles */}
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-3">
        {storyGroups.map((group, i) => (
          <button
            key={group.id}
            onClick={() => openStory(i)}
            className="flex flex-shrink-0 flex-col items-center gap-1.5"
          >
            <div
              className={`rounded-full p-[2.5px] ${
                group.seen
                  ? "bg-muted"
                  : "bg-gradient-to-tr from-primary via-yellow-400 to-primary"
              }`}
            >
              <img
                src={group.avatar}
                alt={group.name}
                className="h-16 w-16 rounded-full border-2 border-background object-cover"
              />
            </div>
            <span className="text-[11px] text-foreground line-clamp-1 w-16 text-center">
              {group.name}
            </span>
          </button>
        ))}
      </div>

      {/* Fullscreen Story Viewer */}
      {activeGroup !== null && currentGroup && currentStory && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          {/* Progress bars */}
          <div className="absolute top-3 left-3 right-3 z-50 flex gap-1">
            {currentGroup.stories.map((_, i) => (
              <div key={i} className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-none"
                  style={{
                    width:
                      i < activeStory
                        ? "100%"
                        : i === activeStory
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-8 left-3 right-3 z-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentGroup.avatar}
                alt={currentGroup.name}
                className="h-9 w-9 rounded-full object-cover border border-white/30"
              />
              <div>
                <p className="text-sm font-semibold text-white">{currentGroup.name}</p>
                <p className="text-[10px] text-white/50">
                  {activeStory + 1}/{currentGroup.stories.length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setPaused(!paused)} className="text-white/80">
                {paused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </button>
              <button onClick={closeStory} className="text-white/80">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Story content */}
          <img
            src={currentStory.url}
            alt={currentStory.caption}
            className="h-full w-full object-cover"
          />

          {/* Tap zones */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-20 bottom-24 w-1/3 z-40"
          />
          <button
            onClick={handleNext}
            className="absolute right-0 top-20 bottom-24 w-1/3 z-40"
          />

          {/* Long press to pause */}
          <button
            onMouseDown={() => setPaused(true)}
            onMouseUp={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
            className="absolute left-1/3 right-1/3 top-20 bottom-24 z-40"
          />

          {/* Caption */}
          <div className="absolute bottom-16 left-4 right-4 z-50">
            <p className="text-sm text-white font-medium drop-shadow-lg">
              {currentStory.caption}
            </p>
          </div>

          {/* Bottom actions */}
          <div className="absolute bottom-4 left-4 right-4 z-50 flex items-center gap-3">
            <input
              type="text"
              placeholder="Reply to story..."
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 backdrop-blur-sm outline-none"
            />
            <button className="text-white/80 hover:text-red-400 transition-colors">
              <Heart className="h-6 w-6" />
            </button>
            <button className="text-white/80 hover:text-primary transition-colors">
              <Send className="h-6 w-6" />
            </button>
          </div>

          {/* Nav arrows for desktop */}
          {activeGroup > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {activeGroup < storyGroups.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-50 hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Stories;
