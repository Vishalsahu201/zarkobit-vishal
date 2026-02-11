import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, MapPin, Star, Phone, Globe } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { generateServices, salonList } from "@/data/mockData";

const tabs = ["Services", "Reels", "Reviews", "Photos", "About"];

const SalonPage = () => {
  const { id } = useParams();
  const salon = salonList.find((s) => s.id === id) || salonList[0];
  const services = useMemo(() => generateServices(8), []);
  const [activeTab, setActiveTab] = useState("Services");
  const [following, setFollowing] = useState(false);

  return (
    <div>
      {/* Banner */}
      <div className="h-40 w-full bg-gradient-to-r from-primary/30 via-surface-elevated to-primary/10 sm:h-52" />

      {/* Salon Info */}
      <div className="flex flex-wrap items-start gap-5 px-6 py-4">
        <img
          src={salon.avatar}
          alt={salon.name}
          className="h-24 w-24 rounded-2xl border-2 border-background object-cover gold-border sm:h-28 sm:w-28"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold text-foreground">{salon.name}</h1>
            {salon.verified && <CheckCircle2 className="h-5 w-5 text-primary" />}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{salon.subscribers}</p>
          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Mumbai, MH</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" /> 4.8 (2.3K reviews)</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +91 98765 43210</span>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setFollowing(!following)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                following ? "bg-secondary text-foreground" : "bg-primary text-primary-foreground gold-glow"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
            <button className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground hover:bg-secondary">
              <Globe className="inline h-4 w-4 mr-1" /> Website
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap border-b-2 pb-3 pt-2 text-sm font-medium ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-6 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default SalonPage;
