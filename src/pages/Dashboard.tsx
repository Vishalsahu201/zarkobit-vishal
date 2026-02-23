import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User, CalendarCheck, Star, Heart, IndianRupee, Crown, Clock,
  Scissors, TrendingUp, ArrowRight, MapPin, Shield, CreditCard,
  BarChart3, Gift, Bell
} from "lucide-react";

interface Booking {
  id: number;
  service: string;
  salon: string;
  date: string;
  time: string;
  price: string;
  status: string;
  stylist: string;
  bookedAt: string;
}

const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("zarkobit_bookings") || "[]");
    setBookings(stored);
  }, []);

  const totalBookings = bookings.length + 3; // + default ones
  const totalSpent = "₹4,997";
  const memberSince = "Jan 2025";

  return (
    <div className="px-6 py-6">
      {/* Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-surface-elevated to-primary/10 p-6 gold-border">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary gold-glow">
              <User className="h-10 w-10 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              <Crown className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="font-display text-2xl font-bold text-foreground">Priya Sharma</h1>
            <p className="text-sm text-muted-foreground">priya.sharma@email.com</p>
            <p className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground sm:justify-start">
              <MapPin className="h-3 w-3" /> Mumbai, Maharashtra
            </p>
            <div className="mt-2 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
              <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">✨ Premium Member</span>
              <span className="rounded-full bg-chip px-3 py-1 text-xs text-chip-foreground">Since {memberSince}</span>
            </div>
          </div>
          <Link to="/profile" className="rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary">
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: CalendarCheck, label: "Total Bookings", value: totalBookings.toString(), color: "text-primary" },
          { icon: IndianRupee, label: "Total Spent", value: totalSpent, color: "text-green-500" },
          { icon: Star, label: "Reviews Given", value: "12", color: "text-yellow-500" },
          { icon: Heart, label: "Saved Salons", value: "8", color: "text-red-500" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl bg-card p-4 gold-border card-shine">
            <Icon className={`h-5 w-5 ${color} mb-2`} />
            <p className="text-xl font-bold font-display text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-foreground">Recent Bookings</h2>
          <Link to="/bookings" className="flex items-center gap-1 text-xs text-primary hover:underline">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        {bookings.length === 0 ? (
          <div className="rounded-xl bg-card p-6 text-center">
            <CalendarCheck className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No bookings yet</p>
            <Link to="/services" className="mt-3 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
              Book Your First Service
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {bookings.slice(-3).reverse().map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-xl bg-card p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Scissors className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{b.service.split(" - ")[0]}</p>
                  <p className="text-xs text-muted-foreground">{b.date} • {b.time}</p>
                </div>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium text-primary capitalize">{b.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment & Wallet */}
      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">Payments & Wallet</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-card p-5 gold-border">
            <CreditCard className="h-6 w-6 text-primary mb-3" />
            <p className="text-xs text-muted-foreground">Total Spent</p>
            <p className="font-display text-2xl font-bold gold-gradient-text">{totalSpent}</p>
            <p className="mt-1 text-xs text-muted-foreground">Across {totalBookings} bookings</p>
          </div>
          <div className="rounded-xl bg-card p-5 border border-border">
            <Shield className="h-6 w-6 text-primary mb-3" />
            <p className="text-xs text-muted-foreground">Subscription</p>
            <p className="text-lg font-bold text-foreground">Premium ✨</p>
            <p className="mt-1 text-xs text-muted-foreground">₹99/month • No service fees</p>
            <Link to="/pricing" className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline">
              Manage Plan <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: Scissors, label: "Book Service", path: "/services", color: "bg-primary/10 text-primary" },
            { icon: TrendingUp, label: "Trending", path: "/trending", color: "bg-orange-500/10 text-orange-500" },
            { icon: Gift, label: "Offers", path: "/pricing", color: "bg-green-500/10 text-green-500" },
            { icon: BarChart3, label: "AI Face Scan", path: "/face-scan", color: "bg-blue-500/10 text-blue-500" },
          ].map(({ icon: Icon, label, path, color }) => (
            <Link key={label} to={path} className="flex flex-col items-center gap-2 rounded-xl bg-card p-4 hover:bg-secondary transition-colors">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium text-foreground">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">Notifications</h2>
        <div className="space-y-2">
          {[
            { title: "Booking Reminder", desc: "Your Hair Coloring appointment is tomorrow at 10 AM", time: "2h ago", icon: Bell },
            { title: "New Offer!", desc: "Get 30% off on all Bridal packages this month", time: "1d ago", icon: Gift },
            { title: "Review Request", desc: "How was your Spa session at Elegance Salon?", time: "3d ago", icon: Star },
          ].map((n) => (
            <div key={n.title} className="flex items-start gap-3 rounded-xl bg-card p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <n.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground flex-shrink-0">{n.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
