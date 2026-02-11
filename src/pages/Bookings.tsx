import { CalendarCheck, Clock, MapPin, Star, CheckCircle2 } from "lucide-react";

const upcomingBookings = [
  {
    id: 1, service: "Premium Hair Coloring", salon: "Glamour Studio",
    date: "Feb 14, 2026", time: "10:00 AM", price: "₹1,499",
    status: "confirmed", stylist: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=80&h=80&fit=crop",
  },
  {
    id: 2, service: "Deep Facial Treatment", salon: "Luxe Beauty Bar",
    date: "Feb 18, 2026", time: "2:30 PM", price: "₹999",
    status: "confirmed", stylist: "Neha Gupta",
    avatar: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=80&h=80&fit=crop",
  },
];

const pastBookings = [
  {
    id: 3, service: "Men's Fade Haircut", salon: "Royal Cuts",
    date: "Feb 5, 2026", time: "11:00 AM", price: "₹499",
    status: "completed", rating: 5,
    avatar: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=80&h=80&fit=crop",
  },
  {
    id: 4, service: "Full Body Spa", salon: "Elegance Salon",
    date: "Jan 28, 2026", time: "4:00 PM", price: "₹2,999",
    status: "completed", rating: 4,
    avatar: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=80&h=80&fit=crop",
  },
];

const Bookings = () => {
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

      {/* Upcoming */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">Upcoming</h2>
      <div className="space-y-3 mb-8">
        {upcomingBookings.map((booking) => (
          <div key={booking.id} className="flex gap-4 rounded-xl bg-card p-4 gold-border card-shine">
            <img src={booking.avatar} alt={booking.salon} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{booking.service}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    {booking.salon} <CheckCircle2 className="h-3 w-3 text-primary" />
                  </p>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-0.5 text-xs font-medium text-primary capitalize">
                  {booking.status}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><CalendarCheck className="h-3 w-3" /> {booking.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {booking.time}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {booking.stylist}</span>
                <span className="font-semibold text-primary">{booking.price}</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
                  Reschedule
                </button>
                <button className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground hover:bg-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Past */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-3">Past Bookings</h2>
      <div className="space-y-3">
        {pastBookings.map((booking) => (
          <div key={booking.id} className="flex gap-4 rounded-xl bg-card p-4">
            <img src={booking.avatar} alt={booking.salon} className="h-16 w-16 flex-shrink-0 rounded-xl object-cover opacity-75" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-medium text-foreground">{booking.service}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{booking.salon}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-0.5 text-xs text-muted-foreground capitalize">
                  {booking.status}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{booking.date}</span>
                <span>{booking.price}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < (booking.rating || 0) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
