import { Clock, IndianRupee, CalendarCheck } from "lucide-react";

const history = [
  { id: 1, salon: "Luxe Hair Studio", service: "Premium Haircut", date: "5 Mar 2026", amount: 350, stylist: "Rahul K." },
  { id: 2, salon: "Glow Beauty Lounge", service: "Facial Treatment", date: "20 Feb 2026", amount: 800, stylist: "Priya S." },
  { id: 3, salon: "Urban Cuts", service: "Beard Trim + Wash", date: "12 Feb 2026", amount: 250, stylist: "Amit D." },
  { id: 4, salon: "Luxe Hair Studio", service: "Hair Color", date: "1 Feb 2026", amount: 1200, stylist: "Rahul K." },
  { id: 5, salon: "Style Zone", service: "Head Massage", date: "15 Jan 2026", amount: 400, stylist: "Vikram T." },
];

const BookingHistory = () => (
  <div className="px-4 py-6 sm:px-6">
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">Booking History</h1>
    <p className="text-sm text-muted-foreground mb-6">Total spent: ₹{history.reduce((a, b) => a + b.amount, 0).toLocaleString()}</p>
    <div className="space-y-3">
      {history.map((h) => (
        <div key={h.id} className="flex items-center gap-4 rounded-xl bg-card p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
            <CalendarCheck className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{h.service}</p>
            <p className="text-xs text-muted-foreground">{h.salon} • {h.stylist}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-semibold text-primary">₹{h.amount}</p>
            <p className="text-[10px] text-muted-foreground">{h.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default BookingHistory;
