import { Crown } from "lucide-react";
import { useEffect, useState } from "react";

const ZarkobitLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        return p + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <div className="relative mb-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/20 gold-glow animate-pulse">
          <Crown className="h-14 w-14 text-primary" />
        </div>
        <div className="absolute -inset-4 rounded-[2rem] border border-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
      </div>
      <h1 className="font-display text-4xl font-bold gold-gradient-text mb-2">Zarkobit</h1>
      <p className="text-sm text-muted-foreground mb-8">Premium Salon Experience</p>
      <div className="w-48 h-1 rounded-full bg-secondary overflow-hidden">
        <div className="h-full rounded-full bg-primary transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{progress}%</p>
    </div>
  );
};

export default ZarkobitLoader;
