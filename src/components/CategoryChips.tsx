import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data/mockData";

const CategoryChips = () => {
  const [active, setActive] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 rounded-full bg-background/80 p-1 shadow-md backdrop-blur-sm hover:bg-secondary"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-8 py-3 scrollbar-hide"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`flex-shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              active === cat
                ? "bg-primary text-primary-foreground gold-glow"
                : "bg-chip text-chip-foreground hover:bg-surface-hover"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 rounded-full bg-background/80 p-1 shadow-md backdrop-blur-sm hover:bg-secondary"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
    </div>
  );
};

export default CategoryChips;
