import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star, Clock, Share2, Heart, CheckCircle2, MapPin,
  Calendar, ChevronRight, ThumbsUp
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { generateServices, stylists } from "@/data/mockData";

const ServiceDetail = () => {
  const { id } = useParams();
  const services = useMemo(() => generateServices(16), []);
  const current = services.find((s) => s.id === id) || services[0];
  const related = services.filter((s) => s.id !== current.id).slice(0, 4);
  const [liked, setLiked] = useState(false);
  const selectedStylist = stylists[0];

  return (
    <div className="flex flex-col gap-6 px-6 py-4 lg:flex-row">
      <div className="flex-1">
        {/* Image */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl">
          <img src={current.image} alt={current.title} className="h-full w-full object-cover" />
        </div>

        {/* Title & Price */}
        <div className="mt-4 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold text-foreground">{current.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5"><Star className="h-4 w-4 fill-primary text-primary" /> {current.rating.toFixed(1)}</span>
              <span>{current.reviews}</span>
              <span className="flex items-center gap-0.5"><Clock className="h-4 w-4" /> {current.duration}</span>
              <span className="rounded-full bg-chip px-2 py-0.5 text-xs">{current.category}</span>
            </div>
          </div>
          <span className="text-2xl font-display font-bold gold-gradient-text">{current.price}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90">
            <Calendar className="inline h-4 w-4 mr-1" /> Book Now
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all ${
              liked ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} /> Save
          </button>
          <button className="rounded-full border border-border p-3 text-foreground hover:bg-secondary">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Salon Info */}
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-card p-4 gold-border">
          <img src={current.salonAvatar} alt={current.salon} className="h-12 w-12 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">{current.salon}</span>
              {current.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Bandra West, Mumbai
            </p>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            Visit <ChevronRight className="inline h-3 w-3" />
          </button>
        </div>

        {/* Stylist */}
        <div className="mt-4 rounded-xl bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Recommended Stylist</h3>
          <div className="flex items-center gap-3">
            <img src={selectedStylist.avatar} alt={selectedStylist.name} className="h-12 w-12 rounded-full object-cover gold-border" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{selectedStylist.name}</p>
              <p className="text-xs text-muted-foreground">{selectedStylist.specialty}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs text-foreground">{selectedStylist.rating}</span>
                <span className="text-xs text-muted-foreground">({selectedStylist.reviews} reviews)</span>
              </div>
            </div>
            <button className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-surface-hover">
              Select
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 rounded-xl bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">About This Service</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Experience a premium salon service with our expert stylists. This service includes a consultation, 
            the treatment itself, and aftercare advice. We use only the highest quality products from leading 
            international brands to ensure the best results for your hair and skin.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Customer Reviews</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 rounded-xl bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {["AS", "RK", "NM"][i - 1]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{["Aarti S.", "Raj K.", "Nisha M."][i - 1]}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < 5 - (i > 2 ? 1 : 0) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">{i} week ago</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {["Amazing experience! The stylist was very professional and the results exceeded my expectations. Highly recommend!",
                  "Great service, clean salon, and friendly staff. Will definitely come back for more treatments.",
                  "Loved the results! The attention to detail was impressive. A bit pricey but worth every penny."][i - 1]}
              </p>
              <button className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({[12, 8, 5][i - 1]})
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      <div className="w-full lg:w-80">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Similar Services</h3>
        <div className="flex flex-col gap-6">
          {related.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
