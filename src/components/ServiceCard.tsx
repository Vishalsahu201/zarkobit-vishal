import { Link } from "react-router-dom";
import { Star, Clock, CheckCircle2 } from "lucide-react";
import type { SalonService } from "@/data/mockData";

interface ServiceCardProps {
  service: SalonService;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group cursor-pointer card-shine rounded-xl overflow-hidden">
      <Link to={`/service/${service.id}`}>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              {service.price}
            </span>
            <span className="rounded-md bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {service.duration}
            </span>
          </div>
          <div className="absolute top-2 left-2">
            <span className="rounded-md bg-background/80 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-foreground">
              {service.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-3 flex gap-3">
        <Link to={`/salon/${service.salon}`} className="flex-shrink-0">
          <img
            src={service.salonAvatar}
            alt={service.salon}
            className="h-9 w-9 rounded-full object-cover gold-border"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/service/${service.id}`}>
            <h3 className="line-clamp-2 text-sm font-medium leading-5 text-foreground">
              {service.title}
            </h3>
          </Link>
          <Link
            to={`/salon/${service.salon}`}
            className="mt-1 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <span>{service.salon}</span>
            {service.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
          </Link>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3 fill-primary text-primary" />
              {service.rating.toFixed(1)}
            </span>
            <span>·</span>
            <span>{service.reviews}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
