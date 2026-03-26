import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Star, Phone, Clock, IndianRupee } from "lucide-react";
import { Link } from "react-router-dom";

const kanpurSalons = [
  { id: 1, name: "Royal Hair Studio", address: "Mall Road, Kanpur", lat: 26.4499, lng: 80.3319, rating: 4.8, phone: "+91 98765 43210", price: "₹50-₹200", timing: "9:00 AM - 9:00 PM", distance: "0.5 km" },
  { id: 2, name: "Glamour Beauty Lounge", address: "Civil Lines, Kanpur", lat: 26.4625, lng: 80.3502, rating: 4.6, phone: "+91 98765 43211", price: "₹80-₹180", timing: "10:00 AM - 8:00 PM", distance: "1.2 km" },
  { id: 3, name: "Style Zone Unisex Salon", address: "Swaroop Nagar, Kanpur", lat: 26.4478, lng: 80.3389, rating: 4.9, phone: "+91 98765 43212", price: "₹60-₹150", timing: "9:30 AM - 9:30 PM", distance: "0.8 km" },
  { id: 4, name: "Luxe Cuts & Spa", address: "Kakadeo, Kanpur", lat: 26.4380, lng: 80.3180, rating: 4.7, phone: "+91 98765 43213", price: "₹100-₹200", timing: "10:00 AM - 10:00 PM", distance: "2.1 km" },
  { id: 5, name: "Anmol Hair Art", address: "Govind Nagar, Kanpur", lat: 26.4560, lng: 80.3250, rating: 4.5, phone: "+91 98765 43214", price: "₹50-₹120", timing: "8:00 AM - 8:00 PM", distance: "1.5 km" },
  { id: 6, name: "Crown Beauty Parlour", address: "Arya Nagar, Kanpur", lat: 26.4400, lng: 80.3450, rating: 4.8, phone: "+91 98765 43215", price: "₹70-₹190", timing: "9:00 AM - 9:00 PM", distance: "1.8 km" },
  { id: 7, name: "Dashing Look Salon", address: "Kidwai Nagar, Kanpur", lat: 26.4350, lng: 80.3600, rating: 4.4, phone: "+91 98765 43216", price: "₹50-₹100", timing: "9:00 AM - 8:30 PM", distance: "3.0 km" },
  { id: 8, name: "The Barber Shop", address: "Harsh Nagar, Kanpur", lat: 26.4700, lng: 80.3100, rating: 4.9, phone: "+91 98765 43217", price: "₹80-₹200", timing: "10:00 AM - 9:00 PM", distance: "2.5 km" },
];

const NearbyMap = () => {
  const [selectedSalon, setSelectedSalon] = useState<typeof kanpurSalons[0] | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation({ lat: 26.4499, lng: 80.3319 })
    );
  }, []);

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">Nearby Salons</h1>
          <p className="text-xs text-muted-foreground">Kanpur • {kanpurSalons.length} salons found</p>
        </div>
      </div>

      {/* Map embed */}
      <div className="mb-4 rounded-2xl overflow-hidden gold-border h-[40vh]">
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57104.0!2d80.3319!3d26.4499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4770b127c46f%3A0x1778302a9fbe7b41!2sKanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1`}
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" title="Kanpur Map"
        />
      </div>

      {/* Selected salon detail */}
      {selectedSalon && (
        <div className="mb-4 rounded-2xl bg-gradient-to-r from-primary/15 to-card p-4 gold-border animate-in slide-in-from-bottom-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-display font-semibold text-foreground">{selectedSalon.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{selectedSalon.address}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Star className="h-3 w-3 text-primary fill-primary" />{selectedSalon.rating}</span>
                <span className="flex items-center gap-1"><IndianRupee className="h-3 w-3" />{selectedSalon.price}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{selectedSalon.timing}</span>
              </div>
            </div>
            <a href={`https://maps.google.com/maps/dir/?api=1&destination=${selectedSalon.lat},${selectedSalon.lng}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground flex-shrink-0">
              <Navigation className="h-3 w-3" /> Directions
            </a>
          </div>
        </div>
      )}

      {/* Salon list */}
      <div className="space-y-3">
        {kanpurSalons.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedSalon(s)}
            className={`flex w-full items-center gap-3 rounded-xl p-3 sm:p-4 text-left transition-all ${
              selectedSalon?.id === s.id ? "bg-primary/10 gold-border" : "bg-card hover:bg-surface-hover"
            }`}
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.address}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <Star className="h-2.5 w-2.5 text-primary fill-primary" /> {s.rating}
                </span>
                <span className="text-[10px] text-muted-foreground">{s.price}</span>
                <span className="text-[10px] text-primary font-medium">{s.distance}</span>
              </div>
            </div>
            <a href={`tel:${s.phone}`} onClick={(e) => e.stopPropagation()}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-4 w-4 text-primary" />
            </a>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NearbyMap;
