import { useState } from "react";
import { ScanFace, Upload, Sparkles, ArrowRight, Star } from "lucide-react";
import { faceScanResults } from "@/data/mockData";

const FaceScan = () => {
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 3000);
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 gold-glow">
          <ScanFace className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold gold-gradient-text">AI Face Scanner</h1>
          <p className="text-xs text-muted-foreground">Get personalized hairstyle & makeup recommendations</p>
        </div>
      </div>

      {!showResults ? (
        <div className="mx-auto max-w-2xl">
          {/* Upload Area */}
          <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-surface p-12 text-center transition-all hover:border-primary/60 hover:bg-surface-hover">
            {scanning ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="h-32 w-32 rounded-full border-4 border-primary/30 animate-pulse" />
                  <ScanFace className="absolute inset-0 m-auto h-16 w-16 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-lg font-display font-semibold text-foreground">Analyzing your face...</p>
                  <p className="mt-1 text-sm text-muted-foreground">AI is finding your perfect styles</p>
                </div>
                <div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full animate-pulse rounded-full bg-primary" style={{ width: "70%" }} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 gold-border">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-display font-semibold text-foreground">Upload Your Photo</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Take a selfie or upload a clear face photo for best results
                  </p>
                </div>
                <button
                  onClick={handleScan}
                  className="mt-2 flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 gold-glow"
                >
                  <Sparkles className="h-4 w-4" /> Start AI Scan
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: "Face Shape Analysis", desc: "Detects your face shape for perfect style matching" },
              { title: "Skin Tone Match", desc: "Recommends colors that complement your skin" },
              { title: "Style Suggestions", desc: "Multiple hairstyle & makeup recommendations" },
            ].map((feat) => (
              <div key={feat.title} className="rounded-xl bg-card p-4 gold-border card-shine">
                <Sparkles className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold text-foreground">{feat.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Scan Results */}
          <div className="mb-6 rounded-xl bg-card p-4 gold-border">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">AI Analysis Complete!</span>
              <span className="text-muted-foreground">Face Shape: Oval · Skin Tone: Warm</span>
            </div>
          </div>

          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recommended Styles for You</h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {faceScanResults.map((result) => (
              <div key={result.style} className="group cursor-pointer overflow-hidden rounded-xl bg-card card-shine gold-border">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={result.image}
                    alt={result.style}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-foreground">{result.style}</h3>
                  <div className="mt-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      <span className="text-xs font-semibold text-primary">{result.match}% Match</span>
                    </div>
                    <button className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:opacity-90">
                      Book <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResults(false)}
            className="mt-6 rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default FaceScan;
