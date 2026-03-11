import { Heart, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const favorites = [
  { id: "salon-1", name: "Luxe Hair Studio", rating: 4.8, reviews: 320, location: "Andheri West, Mumbai", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop" },
  { id: "salon-2", name: "Glow Beauty Lounge", rating: 4.6, reviews: 185, location: "Bandra, Mumbai", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&h=200&fit=crop" },
  { id: "salon-3", name: "Urban Cuts", rating: 4.9, reviews: 410, location: "Juhu, Mumbai", image: "https://images.unsplash.com/photo-1585747860019-8e79b1cb5d63?w=300&h=200&fit=crop" },
];

const FavoriteSalons = () => (
  <div className="px-4 py-6 sm:px-6">
    <h1 className="font-display text-2xl font-bold text-foreground mb-6">Favorite Salons</h1>
    <div className="grid gap-4 sm:grid-cols-2">
      {favorites.map((s) => (
        <Link key={s.id} to={`/salon/${s.id}`} className="group overflow-hidden rounded-2xl bg-card gold-border">
          <div className="relative h-36 overflow-hidden">
            <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
            <button className="absolute top-2 right-2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-foreground">{s.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3 w-3 text-primary fill-primary" />
              <span>{s.rating} ({s.reviews} reviews)</span>
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />{s.location}
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default FavoriteSalons;
