import { CalendarCheck, Clock, MapPin, ChevronRight } from "lucide-react";

const upcomingBookings = [
  { id: 1, salon: "Luxe Hair Studio", service: "Premium Haircut", date: "15 Mar 2026", time: "2:30 PM", stylist: "Rahul K.", status: "confirmed" },
  { id: 2, salon: "Glow Beauty Lounge", service: "Facial + Cleanup", date: "18 Mar 2026", time: "11:00 AM", stylist: "Priya S.", status: "pending" },
];

const pastBookings = [
  { id: 3, salon: "Urban Cuts", service: "Beard Trim", date: "5 Mar 2026", time: "4:00 PM", stylist: "Amit D.", status: "completed" },
  { id: 4, salon: "Luxe Hair Studio", service: "Hair Color", date: "20 Feb 2026", time: "1:00 PM", stylist: "Rahul K.", status: "completed" },
];

const statusColors: Record<string, string> = {
  confirmed: "bg-green-500/20 text-green-400",
  pending: "bg-yellow-500/20 text-yellow-400",
  completed: "bg-primary/20 text-primary",
};

const MyBookings = () => (
  <div className="px-4 py-6 sm:px-6">
    <h1 className="font-display text-2xl font-bold text-foreground mb-6">My Bookings</h1>

    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Upcoming</h2>
    <div className="space-y-3 mb-8">
      {upcomingBookings.map((b) => (
        <div key={b.id} className="rounded-xl bg-card p-4 gold-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">{b.salon}</p>
              <p className="text-sm text-primary">{b.service}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusColors[b.status]}`}>{b.status}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarCheck className="h-3 w-3" />{b.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.time}</span>
            <span>Stylist: {b.stylist}</span>
          </div>
        </div>
      ))}
    </div>

    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Past Bookings</h2>
    <div className="space-y-3">
      {pastBookings.map((b) => (
        <div key={b.id} className="rounded-xl bg-card p-4 opacity-75">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">{b.salon}</p>
              <p className="text-sm text-muted-foreground">{b.service}</p>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${statusColors[b.status]}`}>{b.status}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarCheck className="h-3 w-3" />{b.date}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{b.time}</span>
            <span>Stylist: {b.stylist}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyBookings;
