import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarCheck, Clock, MapPin, Star, CheckCircle2, IndianRupee, AlertCircle, Trash2, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Booking {
  id: number;
  service: string;
  salon: string;
  salonAvatar?: string;
  date: string;
  time: string;
  price: string;
  serviceFee: string;
  status: string;
  stylist: string;
  avatar: string;
  bookedAt: string;
  rating?: number;
}

const defaultUpcoming: Booking[] = [
  {
    id: 1, service: "Premium Hair Coloring", salon: "Glamour Studio",
    date: "Monday, 2 March, 2026", time: "10:00 AM", price: "₹1,499", serviceFee: "₹2",
    status: "confirmed", stylist: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=80&h=80&fit=crop",
    bookedAt: new Date().toISOString(),
  },
];

const defaultPast: Booking[] = [
  {
    id: 100, service: "Men's Fade Haircut", salon: "Royal Cuts",
    date: "Feb 5, 2026", time: "11:00 AM", price: "₹499", serviceFee: "₹2",
    status: "completed", rating: 5, stylist: "Rahul Verma",
    avatar: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=80&h=80&fit=crop",
    bookedAt: "2026-02-05T11:00:00Z",
  },
  {
    id: 101, service: "Full Body Spa", salon: "Elegance Salon",
    date: "Jan 28, 2026", time: "4:00 PM", price: "₹2,999", serviceFee: "₹2",
    status: "completed", rating: 4, stylist: "Neha Gupta",
    avatar: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop",
    bookedAt: "2026-01-28T16:00:00Z",
  },
];

const Bookings = () => {
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("zarkobit_bookings") || "[]");
    setUserBookings(stored);
  }, []);

  const allUpcoming = [...userBookings.filter(b => b.status === "confirmed"), ...defaultUpcoming];
  const allPast = [...userBookings.filter(b => b.status === "completed" || b.status === "cancelled"), ...defaultPast];

  const handleCancel = (id: number) => {
    const updated = userBookings.map(b => b.id === id ? { ...b, status: "cancelled" } : b);
    setUserBookings(updated);
    localStorage.setItem("zarkobit_bookings", JSON.stringify(updated));
    toast({ title: "Booking Cancelled", description: "Your booking has been cancelled." });
  };

  const handlePayServiceFee = () => {
    navigate("/payment?plan=booking&return=/bookings");
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <CalendarCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">My Bookings</h1>
          <p className="text-xs text-muted-foreground">Manage your salon appointments</p>
        </div>
      </div>

      {/* Commission info */}
      <div className="mb-6 rounded-xl bg-card p-4 gold-border">
        <div className="flex items-center gap-3">
          <IndianRupee className="h-5 w-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">₹2 Service Fee per Booking</p>
            <p className="text-xs text-muted-foreground">A small service fee is charged per booking. Premium users are exempt.</p>
          </div>
        </div>
      </div>

      {/* Upcoming */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">Upcoming ({allUpcoming.length})</h2>
      {allUpcoming.length === 0 ? (
        <div className="mb-8 rounded-xl bg-card p-8 text-center">
          <CalendarCheck className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No upcoming bookings</p>
          <button onClick={() => navigate("/services")} className="mt-3 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground">
            Browse Services
          </button>
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {allUpcoming.map((booking) => (
            <div key={booking.id} className="flex gap-4 rounded-xl bg-card p-4 gold-border card-shine">
              <img src={booking.avatar} alt={booking.salon} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{booking.service.split(" - ")[0]}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      {booking.salon} <CheckCircle2 className="h-3 w-3 text-primary" />
                    </p>
                  </div>
                  <span className="rounded-full bg-primary/15 text-primary px-3 py-0.5 text-xs font-medium capitalize">
                    ✅ {booking.status}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarCheck className="h-3 w-3" /> {booking.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.stylist}</span>
                  <span className="font-semibold text-primary">{booking.price}</span>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <IndianRupee className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Service fee: {booking.serviceFee}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => navigate(`/payment?plan=booking&return=/bookings`)} className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
                    Reschedule
                  </button>
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="rounded-full border border-destructive/30 px-4 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 flex items-center gap-1"
                  >
                    <XCircle className="h-3 w-3" /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">Past Bookings ({allPast.length})</h2>
      <div className="space-y-3">
        {allPast.map((booking) => (
          <div key={booking.id} className="flex gap-4 rounded-xl bg-card p-4">
            <img src={booking.avatar} alt={booking.salon} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover opacity-75" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{booking.service.split(" - ")[0]}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{booking.salon}</p>
                </div>
                <span className={`rounded-full px-3 py-0.5 text-xs capitalize ${
                  booking.status === "cancelled" ? "bg-destructive/15 text-destructive" : "bg-secondary text-muted-foreground"
                }`}>
                  {booking.status}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{booking.date}</span>
                <span>{booking.time}</span>
                <span>{booking.price} + {booking.serviceFee} fee</span>
                {booking.rating && (
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < (booking.rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
