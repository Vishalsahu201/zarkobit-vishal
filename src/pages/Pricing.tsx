import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Check, Sparkles, Zap, Shield, Star, ArrowRight, IndianRupee } from "lucide-react";

const plans = [
  {
    id: "free",
    name: "Basic",
    price: "Free",
    period: "",
    description: "Get started with basic salon features",
    features: [
      "Browse all salon services",
      "View salon reels & trending",
      "Book appointments (₹2 service fee per booking)",
      "Basic profile",
      "View salon ratings & reviews",
    ],
    notIncluded: [
      "AI Face Scan",
      "Priority booking",
      "Exclusive discounts",
      "Ad-free experience",
    ],
    cta: "Get Started",
    popular: false,
    icon: Zap,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹99",
    period: "/month",
    description: "Unlock the full Zarkobit experience",
    features: [
      "Everything in Basic",
      "Unlimited AI Face Scan (worth ₹2 each)",
      "Priority booking - skip the queue",
      "20% off on all services",
      "Ad-free experience",
      "Exclusive trending styles first",
      "Personal style consultant",
      "Premium profile badge ✨",
    ],
    notIncluded: [],
    cta: "Go Premium",
    popular: true,
    icon: Crown,
  },
  {
    id: "salon",
    name: "Salon Partner",
    price: "₹499",
    period: "/month",
    description: "For salon owners to grow their business",
    features: [
      "List your salon on Zarkobit",
      "Unlimited service listings",
      "Booking management dashboard",
      "Customer analytics & insights",
      "Featured placement in search",
      "Post unlimited reels",
      "Verified salon badge",
      "Priority customer support",
    ],
    notIncluded: [],
    cta: "Partner With Us",
    popular: false,
    icon: Shield,
  },
];

const Pricing = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    if (planId === "free") return;
    navigate(`/payment?plan=${planId}`);
  };

  return (
    <div className="px-6 py-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 gold-glow">
          <Crown className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold gold-gradient-text">Choose Your Plan</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Unlock premium salon features and get the best beauty experience with Zarkobit
        </p>
      </div>

      {/* Commission Info */}
      <div className="mb-8 mx-auto max-w-2xl rounded-xl bg-card p-4 gold-border">
        <div className="flex items-center gap-3">
          <IndianRupee className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Transparent Pricing</p>
            <p className="text-xs text-muted-foreground">
              Only ₹2 service fee per booking for free users • AI Face Scan at just ₹2 per scan • Premium users get unlimited scans free!
            </p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative overflow-hidden rounded-2xl p-6 transition-all ${
              plan.popular
                ? "bg-gradient-to-b from-primary/10 to-card gold-border scale-105 card-shine"
                : "bg-card border border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 rounded-bl-xl bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                MOST POPULAR
              </div>
            )}

            <plan.icon className={`h-8 w-8 mb-4 ${plan.popular ? "text-primary" : "text-muted-foreground"}`} />

            <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>

            <div className="mt-4 mb-6">
              <span className="font-display text-4xl font-bold gold-gradient-text">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>

            <button
              onClick={() => handleSelectPlan(plan.id)}
              className={`w-full rounded-full py-3 text-sm font-semibold transition-all ${
                plan.popular
                  ? "bg-primary text-primary-foreground gold-glow hover:opacity-90"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              }`}
            >
              {plan.cta} {plan.id !== "free" && <ArrowRight className="inline h-4 w-4 ml-1" />}
            </button>

            <div className="mt-6 space-y-3">
              {plan.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-foreground">{feat}</span>
                </div>
              ))}
              {plan.notIncluded.map((feat) => (
                <div key={feat} className="flex items-start gap-2 opacity-40">
                  <Check className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-xs line-through">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="mt-12 max-w-2xl mx-auto">
        <h2 className="font-display text-xl font-semibold text-foreground text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is the ₹2 service fee?", a: "For free users, a small ₹2 service fee is charged per booking. This helps us maintain the platform. Premium users don't pay any service fees." },
            { q: "How does AI Face Scan work?", a: "Our AI analyzes your face shape, skin tone, and features to recommend 5-10 personalized hairstyles and detect skin concerns. Free users pay ₹2 per scan, Premium users get unlimited scans." },
            { q: "Can I cancel my Premium plan?", a: "Yes! You can cancel anytime. Your Premium benefits will continue until the end of your billing period." },
            { q: "How do salon partners earn?", a: "Salon partners receive bookings through our platform. A small ₹2 commission per booking goes to Zarkobit to maintain the service." },
          ].map((faq) => (
            <div key={faq.q} className="rounded-xl bg-card p-4">
              <h3 className="text-sm font-medium text-foreground">{faq.q}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
