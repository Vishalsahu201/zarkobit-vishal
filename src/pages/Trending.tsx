import { useMemo } from "react";
import { Flame, Star, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { generateServices } from "@/data/mockData";

const Trending = () => {
  const services = useMemo(() => generateServices(12), []);

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <Flame className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Trending Now</h1>
          <p className="text-xs text-muted-foreground">Most popular salon services this week</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {services.map((service, i) => (
          <Link
            key={service.id}
            to={`/service/${service.id}`}
            className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-secondary card-shine"
          >
            <div className="relative aspect-video w-56 flex-shrink-0 overflow-hidden rounded-xl">
              <img src={service.image} alt={service.title} className="h-full w-full object-cover" loading="lazy" />
              <span className="absolute bottom-2 right-2 rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                {service.price}
              </span>
            </div>
            <div className="flex-1 py-1">
              <h3 className="line-clamp-2 text-base font-medium text-foreground">{service.title}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <span>{service.salon}</span>
                {service.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
              </div>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-0.5">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" /> {service.rating.toFixed(1)}
                </span>
                <span>{service.reviews}</span>
                <span className="flex items-center gap-0.5">
                  <Clock className="h-3.5 w-3.5" /> {service.duration}
                </span>
              </div>
              <span className="mt-2 inline-block rounded-full bg-primary/15 px-3 py-0.5 text-xs font-medium text-primary">
                #{i + 1} Trending
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Trending;
