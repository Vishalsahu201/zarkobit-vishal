import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, Star, Phone } from "lucide-react";

const GOOGLE_MAPS_API_KEY = ""; // User needs to add their key

const salonMarkers = [
  { id: 1, name: "Luxe Hair Studio", lat: 19.1196, lng: 72.8477, rating: 4.8, phone: "+91 98765 43210" },
  { id: 2, name: "Glow Beauty Lounge", lat: 19.0544, lng: 72.8406, rating: 4.6, phone: "+91 98765 43211" },
  { id: 3, name: "Urban Cuts", lat: 19.1075, lng: 72.8263, rating: 4.9, phone: "+91 98765 43212" },
  { id: 4, name: "Style Zone", lat: 19.0760, lng: 72.8777, rating: 4.5, phone: "+91 98765 43213" },
];

const NearbyMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedSalon, setSelectedSalon] = useState<typeof salonMarkers[0] | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setUserLocation({ lat: 19.076, lng: 72.8777 }) // Default Mumbai
    );
  }, []);

  useEffect(() => {
    if (!userLocation || !mapRef.current) return;
    if (!GOOGLE_MAPS_API_KEY) return;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;

    (window as any).initMap = () => {
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: userLocation,
        zoom: 13,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#d4a853" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1a1a1a" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a2a" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0d1117" }] },
        ],
      });

      // User marker
      new (window as any).google.maps.Marker({
        position: userLocation,
        map,
        icon: { path: (window as any).google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: "#4285F4", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 2 },
        title: "You",
      });

      // Salon markers
      salonMarkers.forEach((salon) => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: salon.lat, lng: salon.lng },
          map,
          icon: { path: (window as any).google.maps.SymbolPath.CIRCLE, scale: 10, fillColor: "#d4a853", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 2 },
          title: salon.name,
        });
        marker.addListener("click", () => setSelectedSalon(salon));
      });

      setMapLoaded(true);
    };

    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [userLocation]);

  return (
    <div className="px-4 py-6 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-foreground mb-4">Nearby Salons</h1>

      {!GOOGLE_MAPS_API_KEY ? (
        <div className="rounded-2xl bg-card p-6 gold-border text-center">
          <MapPin className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="font-display text-lg font-bold text-foreground mb-2">Google Maps API Key Required</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Aapka Google Maps API key chahiye. Apna key <code className="text-primary">src/pages/NearbyMap.tsx</code> mein add karo.
          </p>

          {/* Show salons as list fallback */}
          <div className="mt-6 space-y-3 text-left">
            {salonMarkers.map((s) => (
              <div key={s.id} className="flex items-center gap-4 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 text-primary fill-primary" /> {s.rating}
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{s.phone}</span>
                  </div>
                </div>
                <a href={`https://maps.google.com/?q=${s.lat},${s.lng}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div ref={mapRef} className="h-[50vh] w-full rounded-2xl overflow-hidden gold-border" />

          {selectedSalon && (
            <div className="mt-4 rounded-xl bg-card p-4 gold-border animate-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">{selectedSalon.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Star className="h-3 w-3 text-primary fill-primary" /> {selectedSalon.rating}
                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{selectedSalon.phone}</span>
                  </div>
                </div>
                <a
                  href={`https://maps.google.com/maps/dir/?api=1&destination=${selectedSalon.lat},${selectedSalon.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground"
                >
                  <Navigation className="h-3 w-3" /> Directions
                </a>
              </div>
            </div>
          )}

          {/* Salon list */}
          <div className="mt-4 space-y-3">
            {salonMarkers.map((s) => (
              <button key={s.id} onClick={() => setSelectedSalon(s)} className={`flex w-full items-center gap-4 rounded-xl p-4 text-left transition-colors ${selectedSalon?.id === s.id ? "bg-primary/10 gold-border" : "bg-card hover:bg-secondary"}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 text-primary fill-primary" /> {s.rating}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NearbyMap;
