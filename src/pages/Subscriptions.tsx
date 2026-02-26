import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scissors, Building2, GraduationCap, Award, ShieldCheck, Users,
  ArrowRight, Check, Star, Crown, Clock, Repeat, BadgeCheck, Link2
} from "lucide-react";

const subscriptionPlans = [
  {
    id: "unlimited-trims",
    icon: Repeat,
    title: "Unlimited Trims",
    price: "₹299",
    period: "/month",
    desc: "Get unlimited haircuts & trims at partner salons",
    features: [
      "Unlimited haircuts & beard trims",
      "Valid at all partner salons",
      "No booking fees",
      "Priority appointments",
      "Free hair wash with every visit",
    ],
    color: "from-primary/20 to-card",
    popular: true,
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Corporate Grooming",
    price: "₹199",
    period: "/employee/mo",
    desc: "Professional grooming packages for your team",
    features: [
      "Monthly grooming allowance per employee",
      "On-site salon days (quarterly)",
      "Corporate dashboard & analytics",
      "Bulk booking management",
      "Dedicated account manager",
      "Invoice & GST billing",
    ],
    color: "from-blue-500/10 to-card",
    popular: false,
  },
  {
    id: "campus",
    icon: GraduationCap,
    title: "Campus Grooming Pass",
    price: "₹149",
    period: "/semester",
    desc: "Exclusive grooming pass for college students",
    features: [
      "Valid student ID required",
      "3 haircuts per semester",
      "50% off all other services",
      "Campus salon partner network",
      "Free styling consultation",
      "Student community events",
    ],
    color: "from-green-500/10 to-card",
    popular: false,
  },
];

const certifications = [
  {
    name: "Master Stylist",
    level: "Platinum",
    icon: Award,
    requirements: "500+ verified cuts, 4.8+ avg rating, 2+ years",
    benefits: "Featured listing, 2x visibility, premium badge",
    holders: 12,
  },
  {
    name: "Color Expert",
    level: "Gold",
    icon: Star,
    requirements: "200+ color services, specialized training",
    benefits: "Color specialist tag, priority in color searches",
    holders: 34,
  },
  {
    name: "Bridal Specialist",
    level: "Diamond",
    icon: Crown,
    requirements: "100+ bridal projects, portfolio review",
    benefits: "Bridal category top placement, premium rates",
    holders: 8,
  },
  {
    name: "Grooming Pro",
    level: "Silver",
    icon: Scissors,
    requirements: "300+ men's grooming, beard specialty",
    benefits: "Men's grooming specialist badge",
    holders: 45,
  },
];

const Subscriptions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"subscriptions" | "certifications" | "reviews">("subscriptions");

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold gold-gradient-text">Programs & Certifications</h1>
        <p className="text-xs text-muted-foreground mt-1">Subscriptions, corporate plans, certifications & more</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {[
          { id: "subscriptions" as const, label: "Subscriptions", icon: Repeat },
          { id: "certifications" as const, label: "Barber Certifications", icon: Award },
          { id: "reviews" as const, label: "Verified Reviews", icon: ShieldCheck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border hover:bg-secondary"
            }`}
          >
            <tab.icon className="h-4 w-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className={`relative rounded-2xl bg-gradient-to-b ${plan.color} p-6 gold-border overflow-hidden`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground">POPULAR</div>
                )}
                <plan.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display text-lg font-bold text-foreground">{plan.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                <div className="mt-4 mb-4">
                  <span className="font-display text-3xl font-bold gold-gradient-text">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.period}</span>
                </div>
                <button
                  onClick={() => navigate(`/payment?plan=${plan.id}`)}
                  className="w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90 mb-4"
                >
                  Subscribe <ArrowRight className="inline h-4 w-4 ml-1" />
                </button>
                <div className="space-y-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Contact */}
          <div className="rounded-2xl bg-card p-6 gold-border text-center">
            <Building2 className="h-10 w-10 text-primary mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold text-foreground">Need a Custom Corporate Plan?</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
              For teams of 50+ employees, we offer customized grooming contracts with on-site services, dedicated managers, and special rates.
            </p>
            <button className="mt-4 rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
              Contact Sales <ArrowRight className="inline h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* Certifications Tab */}
      {activeTab === "certifications" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-card p-4 gold-border mb-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <p className="text-sm text-foreground"><strong className="text-primary">Barber Skill Certification</strong> — Verified badges for top barbers based on performance, ratings & experience</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="rounded-2xl bg-card p-6 gold-border card-shine">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15">
                      <cert.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{cert.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        cert.level === "Platinum" ? "bg-purple-500/15 text-purple-400" :
                        cert.level === "Diamond" ? "bg-blue-400/15 text-blue-400" :
                        cert.level === "Gold" ? "bg-primary/15 text-primary" :
                        "bg-gray-400/15 text-gray-400"
                      }`}>{cert.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3 w-3" /> {cert.holders}
                  </div>
                </div>
                <div className="space-y-2 text-xs">
                  <p className="text-muted-foreground"><strong className="text-foreground">Requirements:</strong> {cert.requirements}</p>
                  <p className="text-muted-foreground"><strong className="text-foreground">Benefits:</strong> {cert.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blockchain Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-card p-4 gold-border mb-6">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-primary" />
              <p className="text-sm text-foreground"><strong className="text-primary">Blockchain Verified Reviews</strong> — Every review is hashed & verified for authenticity</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { user: "Rahul M.", salon: "Glamour Studio", rating: 5, review: "Best fade I've ever got! The precision cut at 2.3mm was perfect.", hash: "0x7f3a...b2c1", verified: true, date: "2 hours ago" },
              { user: "Priya K.", salon: "Royal Cuts", rating: 5, review: "Amazing bridal makeup! The team was so professional.", hash: "0x4d2e...a8f3", verified: true, date: "5 hours ago" },
              { user: "Amit S.", salon: "Luxe Beauty Bar", rating: 4, review: "Great keratin treatment. Hair feels super smooth now.", hash: "0x9c1b...d4e7", verified: true, date: "1 day ago" },
              { user: "Neha G.", salon: "The Style Lounge", rating: 5, review: "AI Face Scan was spot on! Got the exact haircut recommended.", hash: "0x2a8f...c5d9", verified: true, date: "2 days ago" },
              { user: "Vikram P.", salon: "Shine & Glow", rating: 4, review: "Corporate grooming day was well organized. Team loved it.", hash: "0x6e3d...f1a2", verified: true, date: "3 days ago" },
            ].map((r, i) => (
              <div key={i} className="rounded-xl bg-card p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                      {r.user[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{r.user}</p>
                      <p className="text-[10px] text-muted-foreground">{r.salon} • {r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                    {r.verified && (
                      <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] text-green-400">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-foreground mb-2">{r.review}</p>
                <p className="text-[10px] font-mono text-muted-foreground">
                  TX Hash: {r.hash} • On-chain ✓
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
