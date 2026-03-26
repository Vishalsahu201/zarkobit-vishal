import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ShieldCheck, Crown, Star, Zap, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Blue Tick",
    icon: CheckCircle,
    iconColor: "text-blue-500",
    price: "₹299",
    period: "/month",
    features: ["Verified badge on profile", "Priority in search results", "Enhanced profile visibility", "Trust indicator for customers"],
    popular: true,
    gradient: "from-blue-500/20 to-blue-600/10",
  },
  {
    name: "Black Tick",
    icon: ShieldCheck,
    iconColor: "text-foreground",
    price: "₹599",
    period: "/month",
    features: ["Premium black badge", "Top search placement", "Featured in trending", "Priority customer support", "Analytics dashboard", "Exclusive promotions"],
    popular: false,
    gradient: "from-foreground/10 to-muted/20",
  },
];

const VerificationStore = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 gold-glow">
          <Crown className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold gold-gradient-text">Get Verified</h1>
        <p className="mt-2 text-sm text-muted-foreground">Stand out with a verification badge</p>
      </div>

      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`relative rounded-2xl bg-gradient-to-br ${plan.gradient} p-6 gold-border`}>
            {plan.popular && (
              <span className="absolute -top-2 right-4 rounded-full bg-primary px-3 py-0.5 text-[10px] font-bold text-primary-foreground">
                POPULAR
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <plan.icon className={`h-8 w-8 ${plan.iconColor}`} />
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">{plan.name}</h2>
                <p className="text-xl font-bold text-primary">{plan.price}<span className="text-xs text-muted-foreground">{plan.period}</span></p>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Zap className="h-3.5 w-3.5 text-primary flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(`/payment?plan=verification&type=${plan.name}&amount=${plan.price.replace("₹", "")}`)}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90"
            >
              Get {plan.name} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationStore;
