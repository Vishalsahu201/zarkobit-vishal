import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScanFace, Upload, Sparkles, ArrowRight, Star, AlertTriangle, IndianRupee, Crown, Lock } from "lucide-react";
import { faceScanResults } from "@/data/mockData";

const skinProblems = [
  { issue: "Dark Circles", severity: "Moderate", tip: "Use vitamin C serum and get proper sleep. Our facial treatment can help reduce dark circles." },
  { issue: "Uneven Skin Tone", severity: "Mild", tip: "Regular exfoliation and sunscreen use recommended. Try our Skin Whitening Facial." },
  { issue: "Dry Patches", severity: "Mild", tip: "Hydrating facial treatments and moisturizer recommended. Book our Deep Facial Treatment." },
  { issue: "Open Pores", severity: "Moderate", tip: "Use a pore-minimizing toner. Our specialized facial can reduce pore visibility." },
];

const extendedResults = [
  ...faceScanResults,
  { style: "Long Layers", image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop", match: 76 },
  { style: "Side Parting", image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop", match: 73 },
  { style: "Beach Waves", image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=400&h=400&fit=crop", match: 70 },
  { style: "French Bob", image: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=400&h=400&fit=crop", match: 68 },
];

const FaceScan = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showPaymentPrompt, setShowPaymentPrompt] = useState(false);

  const handleScan = () => {
    if (!isPaid) {
      setShowPaymentPrompt(true);
      return;
    }
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 3000);
  };

  const handlePayForScan = () => {
    navigate("/payment?plan=facescan&return=/face-scan");
  };

  const handleUsePremium = () => {
    setIsPaid(true);
    setShowPaymentPrompt(false);
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 gold-glow">
          <ScanFace className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold gold-gradient-text">AI Face Scanner</h1>
          <p className="text-xs text-muted-foreground">Get personalized hairstyle & skin analysis</p>
        </div>
      </div>

      {/* Payment prompt modal */}
      {showPaymentPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 gold-border">
            <div className="text-center mb-4">
              <Lock className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground">AI Face Scan</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Pay ₹2 to unlock your personalized face scan with 5-10 style recommendations and skin analysis
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={handlePayForScan}
                className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow"
              >
                <IndianRupee className="inline h-4 w-4 mr-1" />
                Pay ₹2 for Face Scan
              </button>
              <button
                onClick={handleUsePremium}
                className="w-full rounded-full border border-primary/30 py-3 text-sm font-medium text-foreground hover:bg-secondary"
              >
                <Crown className="inline h-4 w-4 mr-1 text-primary" />
                I have Premium (Free Scan)
              </button>
              <button
                onClick={() => setShowPaymentPrompt(false)}
                className="w-full text-xs text-muted-foreground hover:text-foreground py-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!showResults ? (
        <div className="mx-auto max-w-2xl">
          {/* Price info */}
          <div className="mb-6 rounded-xl bg-card p-4 gold-border">
            <div className="flex items-center gap-3">
              <IndianRupee className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">₹2 per Face Scan</p>
                <p className="text-xs text-muted-foreground">
                  Get 5-10 personalized style images + skin problem analysis • Premium users: Free unlimited scans
                </p>
              </div>
            </div>
          </div>

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
                  <p className="mt-1 text-sm text-muted-foreground">AI is scanning face shape, skin tone & features</p>
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
                  <Sparkles className="h-4 w-4" /> Start AI Scan (₹2)
                </button>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { title: "Face Shape Analysis", desc: "Detects your face shape for perfect style matching" },
              { title: "Skin Problem Detection", desc: "Identifies dark circles, uneven tone, pores & more" },
              { title: "5-10 Style Images", desc: "Multiple hairstyle & makeup recommendations with AI" },
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
          {/* Analysis Summary */}
          <div className="mb-6 rounded-xl bg-card p-4 gold-border">
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">AI Analysis Complete!</span>
              <span className="text-muted-foreground">Face Shape: Oval · Skin Tone: Warm · Score: 92/100</span>
            </div>
          </div>

          {/* Skin Problems */}
          <div className="mb-8">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Skin Analysis Report
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {skinProblems.map((problem) => (
                <div key={problem.issue} className="rounded-xl bg-card p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-foreground">{problem.issue}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      problem.severity === "Moderate"
                        ? "bg-yellow-500/15 text-yellow-500"
                        : "bg-green-500/15 text-green-500"
                    }`}>
                      {problem.severity}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{problem.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Style Recommendations - 8-10 images */}
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Recommended Styles for You ({extendedResults.length} results)
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {extendedResults.map((result) => (
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
            onClick={() => { setShowResults(false); setIsPaid(false); }}
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
