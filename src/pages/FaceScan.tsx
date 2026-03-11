import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScanFace, Upload, Sparkles, ArrowRight, Star, AlertTriangle,
  IndianRupee, Crown, Lock, Droplets, Wind, Scissors, TrendingUp,
  ShieldCheck, Eye, Layers, Ruler, CircleDot, Camera, X, RotateCcw
} from "lucide-react";
import { faceScanResults } from "@/data/mockData";

const skinProblems = [
  { issue: "Dark Circles", severity: "Moderate", tip: "Use vitamin C serum and get proper sleep. Our facial treatment can help reduce dark circles.", icon: Eye },
  { issue: "Uneven Skin Tone", severity: "Mild", tip: "Regular exfoliation and sunscreen use recommended. Try our Skin Whitening Facial.", icon: Layers },
  { issue: "Dry Patches", severity: "Mild", tip: "Hydrating facial treatments and moisturizer recommended. Book our Deep Facial Treatment.", icon: Droplets },
  { issue: "Open Pores", severity: "Moderate", tip: "Use a pore-minimizing toner. Our specialized facial can reduce pore visibility.", icon: CircleDot },
  { issue: "Dandruff Detected", severity: "High", tip: "Anti-dandruff treatment recommended. Use zinc pyrithione shampoo. Book our Scalp Treatment.", icon: Wind },
  { issue: "Oily Scalp", severity: "Moderate", tip: "Oil control scalp therapy suggested. Wash hair with sulfate-free shampoo every other day.", icon: Droplets },
];

const faceMetrics = {
  faceShape: "Oval",
  jawline: { score: 8.5, type: "Defined", angle: "122°" },
  cheekbones: { score: 7.8, prominence: "High", width: "14.2cm" },
  foreheadRatio: { percentage: "33.2%", type: "Proportional", height: "6.1cm" },
  symmetry: "94.2%",
  goldenRatio: "91.7%",
  skinTone: "Warm Medium",
  hairDensity: { level: "Medium-High", count: "~110 strands/cm²", health: "Good" },
  hairGrowthSpeed: "1.2cm/month (Above Average)",
  scalpType: "Slightly Oily",
};

const precisionCuts = [
  { cut: "Textured Fade", fadeLevel: "2.3mm", confidence: 96, reason: "Suits defined jawline with high cheekbones" },
  { cut: "Taper Fade", fadeLevel: "3.0mm", confidence: 92, reason: "Balances forehead ratio with face length" },
  { cut: "Skin Fade", fadeLevel: "0.5mm", confidence: 88, reason: "Sharp contrast for oval face shape" },
  { cut: "Mid Fade", fadeLevel: "6.0mm", confidence: 85, reason: "Versatile for medium-high hair density" },
];

const productSuggestions = [
  { name: "Anti-Dandruff Shampoo", brand: "Head & Shoulders Clinical", price: "₹499", reason: "For detected dandruff" },
  { name: "Oil Control Serum", brand: "The Ordinary Niacinamide", price: "₹650", reason: "For oily scalp balance" },
  { name: "Hair Growth Tonic", brand: "Minoxidil 5%", price: "₹899", reason: "Boost hair density" },
  { name: "Sunscreen SPF 50+", brand: "La Shield", price: "₹399", reason: "For uneven skin tone protection" },
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
  const [scanPhase, setScanPhase] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const phases = ["Mapping face geometry...", "Analyzing jawline & cheekbones...", "Measuring forehead ratio...", "Scanning hair density...", "Detecting scalp condition...", "Generating recommendations..."];

  const startCamera = useCallback(async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch {
      alert("Camera access denied. Please allow camera permission.");
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      if (facingMode === "user") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  }, [facingMode, stopCamera]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === "user" ? "environment" : "user");
  }, []);

  useEffect(() => {
    if (cameraActive) {
      startCamera();
    }
    return () => { stopCamera(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCapturedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!isPaid) {
      setShowPaymentPrompt(true);
      return;
    }
    if (!capturedImage) {
      startCamera();
      return;
    }
    setScanning(true);
    setScanPhase(0);
    const phaseInterval = setInterval(() => {
      setScanPhase((p) => {
        if (p >= phases.length - 1) {
          clearInterval(phaseInterval);
          setTimeout(() => { setScanning(false); setShowResults(true); }, 500);
          return p;
        }
        return p + 1;
      });
    }, 800);
  };

  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 gold-glow">
          <ScanFace className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold gold-gradient-text">3D AI Face Scanner</h1>
          <p className="text-xs text-muted-foreground">Real Camera • Jawline • Cheekbone • Scalp Analysis</p>
        </div>
      </div>

      {/* Payment prompt */}
      {showPaymentPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-card p-6 gold-border">
            <div className="text-center mb-4">
              <Lock className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold text-foreground">3D AI Face Scan</h3>
              <p className="text-xs text-muted-foreground mt-1">Pay ₹2 to unlock full analysis</p>
            </div>
            <div className="space-y-3">
              <button onClick={() => navigate("/payment?plan=facescan&return=/face-scan")} className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow">
                <IndianRupee className="inline h-4 w-4 mr-1" /> Pay ₹2 for 3D Scan
              </button>
              <button onClick={() => { setIsPaid(true); setShowPaymentPrompt(false); }} className="w-full rounded-full border border-primary/30 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                <Crown className="inline h-4 w-4 mr-1 text-primary" /> I have Premium
              </button>
              <button onClick={() => setShowPaymentPrompt(false)} className="w-full text-xs text-muted-foreground hover:text-foreground py-2">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {cameraActive && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="relative w-full h-full max-w-lg">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
            />
            {/* Face guide overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-[50%] border-2 border-primary/60 shadow-[0_0_30px_rgba(212,175,55,0.3)]" />
            </div>
            <p className="absolute top-12 left-0 right-0 text-center text-sm text-white/80">
              Position your face inside the oval
            </p>
            {/* Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6">
              <button onClick={() => { stopCamera(); setCapturedImage(null); }} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <X className="h-6 w-6 text-white" />
              </button>
              <button onClick={capturePhoto} className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-primary gold-glow">
                <Camera className="h-7 w-7 text-primary-foreground" />
              </button>
              <button onClick={switchCamera} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <RotateCcw className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {!showResults ? (
        <div className="mx-auto max-w-2xl">
          <div className="mb-4 rounded-xl bg-card p-3 sm:p-4 gold-border">
            <div className="flex items-center gap-3">
              <IndianRupee className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">₹2 per 3D Face Scan</p>
                <p className="text-xs text-muted-foreground">Real camera scan • Premium: Free unlimited</p>
              </div>
            </div>
          </div>

          {/* Camera / Upload / Captured */}
          <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-surface p-6 sm:p-12 text-center transition-all hover:border-primary/60">
            {scanning ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  {capturedImage && (
                    <img src={capturedImage} alt="Scanning" className="h-32 w-32 rounded-full object-cover border-4 border-primary/30" />
                  )}
                  <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-display font-semibold text-foreground">{phases[scanPhase]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Phase {scanPhase + 1}/{phases.length}</p>
                </div>
                <div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${((scanPhase + 1) / phases.length) * 100}%` }} />
                </div>
              </div>
            ) : capturedImage ? (
              <div className="flex flex-col items-center gap-4">
                <img src={capturedImage} alt="Captured" className="h-40 w-40 sm:h-48 sm:w-48 rounded-full object-cover gold-border p-1" />
                <p className="text-sm font-medium text-foreground">Photo captured! Ready to scan.</p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button onClick={handleScan} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90">
                    <Sparkles className="h-4 w-4" /> Start 3D Scan
                  </button>
                  <button onClick={() => { setCapturedImage(null); startCamera(); }} className="flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                    <RotateCcw className="h-4 w-4" /> Retake
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 gold-border">
                  <Camera className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-display font-semibold text-foreground">Scan Your Face</p>
                  <p className="mt-1 text-sm text-muted-foreground">Use camera or upload a photo</p>
                </div>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button onClick={() => { if (!isPaid) { setShowPaymentPrompt(true); return; } startCamera(); }} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90">
                    <Camera className="h-4 w-4" /> Open Camera
                  </button>
                  <label className="flex items-center gap-2 rounded-full border border-primary/30 px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary cursor-pointer">
                    <Upload className="h-4 w-4" /> Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => { if (!isPaid) { setShowPaymentPrompt(true); return; } handleFileUpload(e); }} />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
            {[
              { icon: Ruler, title: "3D Face Geometry", desc: "Jawline, cheekbone, forehead" },
              { icon: Scissors, title: "Precision Haircut", desc: "Fade 2.3mm level exact" },
              { icon: TrendingUp, title: "Hair Density", desc: "Strands/cm² count" },
              { icon: Wind, title: "Dandruff Detection", desc: "Scalp condition scan" },
              { icon: Droplets, title: "Oil/Dry Analysis", desc: "Scalp type detection" },
              { icon: ShieldCheck, title: "Product Suggestions", desc: "Personalized products" },
            ].map((f) => (
              <div key={f.title} className="rounded-xl bg-card p-3 sm:p-4 gold-border card-shine">
                <f.icon className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-xs font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-[10px] text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {/* Scanned photo */}
          {capturedImage && (
            <div className="flex justify-center">
              <div className="relative">
                <img src={capturedImage} alt="Your scan" className="h-28 w-28 sm:h-36 sm:w-36 rounded-full object-cover gold-border p-1" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Scanned ✓</div>
              </div>
            </div>
          )}

          {/* 3D Face Geometry */}
          <div className="rounded-2xl bg-card p-4 sm:p-6 gold-border">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" /> 3D Face Geometry
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <div className="rounded-xl bg-surface p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-display gold-gradient-text">{faceMetrics.faceShape}</p>
                <p className="text-xs text-muted-foreground">Face Shape</p>
              </div>
              <div className="rounded-xl bg-surface p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-display gold-gradient-text">{faceMetrics.symmetry}</p>
                <p className="text-xs text-muted-foreground">Symmetry</p>
              </div>
              <div className="rounded-xl bg-surface p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-display gold-gradient-text">{faceMetrics.goldenRatio}</p>
                <p className="text-xs text-muted-foreground">Golden Ratio</p>
              </div>
              <div className="rounded-xl bg-surface p-3 text-center">
                <p className="text-xl sm:text-2xl font-bold font-display gold-gradient-text">{faceMetrics.skinTone}</p>
                <p className="text-xs text-muted-foreground">Skin Tone</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-surface p-3 sm:p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Jawline</h3>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Score: <span className="text-primary font-medium">{faceMetrics.jawline.score}/10</span></p>
                  <p>Type: <span className="text-foreground">{faceMetrics.jawline.type}</span></p>
                  <p>Angle: <span className="text-foreground">{faceMetrics.jawline.angle}</span></p>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-3 sm:p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Cheekbones</h3>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Score: <span className="text-primary font-medium">{faceMetrics.cheekbones.score}/10</span></p>
                  <p>Prominence: <span className="text-foreground">{faceMetrics.cheekbones.prominence}</span></p>
                  <p>Width: <span className="text-foreground">{faceMetrics.cheekbones.width}</span></p>
                </div>
              </div>
              <div className="rounded-xl bg-surface p-3 sm:p-4 border border-border">
                <h3 className="text-sm font-semibold text-foreground mb-2">Forehead Ratio</h3>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>Ratio: <span className="text-primary font-medium">{faceMetrics.foreheadRatio.percentage}</span></p>
                  <p>Type: <span className="text-foreground">{faceMetrics.foreheadRatio.type}</span></p>
                  <p>Height: <span className="text-foreground">{faceMetrics.foreheadRatio.height}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Precision Haircut */}
          <div className="rounded-2xl bg-card p-4 sm:p-6 gold-border">
            <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Scissors className="h-5 w-5 text-primary" /> Precision Haircut Geometry
            </h2>
            <div className="space-y-3">
              {precisionCuts.map((cut, i) => (
                <div key={cut.cut} className={`rounded-xl p-3 sm:p-4 border ${i === 0 ? "border-primary/50 bg-primary/5" : "border-border bg-surface"}`}>
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {i === 0 && <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">#1</span>}
                      <h3 className="text-sm font-semibold text-foreground">{cut.cut}</h3>
                    </div>
                    <span className="text-sm font-bold text-primary">{cut.confidence}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{cut.reason}</p>
                  <p className="mt-1 text-xs font-mono text-primary">Fade: {cut.fadeLevel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hair & Scalp + Products */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-card p-4 sm:p-6 gold-border">
              <h2 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Hair Density & Growth
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Density</span><span className="text-foreground font-medium">{faceMetrics.hairDensity.level}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Strands</span><span className="text-foreground font-medium">{faceMetrics.hairDensity.count}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Health</span><span className="text-green-400 font-medium">{faceMetrics.hairDensity.health}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Growth</span><span className="text-foreground font-medium">{faceMetrics.hairGrowthSpeed}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">Scalp</span><span className="text-yellow-400 font-medium">{faceMetrics.scalpType}</span></div>
              </div>
            </div>
            <div className="rounded-2xl bg-card p-4 sm:p-6 gold-border">
              <h2 className="font-display text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Products
              </h2>
              <div className="space-y-3">
                {productSuggestions.map((p) => (
                  <div key={p.name} className="rounded-lg bg-surface p-3 border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-semibold text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.brand}</p>
                      </div>
                      <span className="text-xs font-bold text-primary">{p.price}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1 italic">{p.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skin Problems */}
          <div>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" /> Skin & Scalp Report
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {skinProblems.map((problem) => (
                <div key={problem.issue} className="rounded-xl bg-card p-3 sm:p-4 border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <problem.icon className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-medium text-foreground">{problem.issue}</h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      problem.severity === "High" ? "bg-red-500/15 text-red-400" :
                      problem.severity === "Moderate" ? "bg-yellow-500/15 text-yellow-500" : "bg-green-500/15 text-green-500"
                    }`}>{problem.severity}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{problem.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Style Recommendations */}
          <div>
            <h2 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-4">
              Recommended Styles ({extendedResults.length})
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4">
              {extendedResults.map((result) => (
                <div key={result.style} className="group cursor-pointer overflow-hidden rounded-xl bg-card card-shine gold-border">
                  <div className="aspect-square overflow-hidden">
                    <img src={result.image} alt={result.style} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-2 sm:p-3">
                    <h3 className="text-xs sm:text-sm font-medium text-foreground">{result.style}</h3>
                    <div className="mt-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                        <span className="text-xs font-semibold text-primary">{result.match}%</span>
                      </div>
                      <button className="flex items-center gap-1 rounded-full bg-primary px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-primary-foreground hover:opacity-90">
                        Book <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => { setShowResults(false); setIsPaid(false); setCapturedImage(null); }} className="rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default FaceScan;
