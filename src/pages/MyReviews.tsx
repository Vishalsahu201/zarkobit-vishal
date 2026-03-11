import { Star } from "lucide-react";

const reviews = [
  { id: 1, salon: "Luxe Hair Studio", service: "Premium Haircut", rating: 5, date: "6 Mar 2026", text: "Amazing haircut! Rahul really understood what I wanted. Best salon in Mumbai." },
  { id: 2, salon: "Glow Beauty Lounge", service: "Facial Treatment", rating: 4, date: "21 Feb 2026", text: "Good facial experience. Skin felt refreshed. Could improve the waiting area." },
  { id: 3, salon: "Urban Cuts", service: "Beard Trim", rating: 5, date: "13 Feb 2026", text: "Perfect beard trim, very precise. Will definitely come back!" },
];

const MyReviews = () => (
  <div className="px-4 py-6 sm:px-6">
    <h1 className="font-display text-2xl font-bold text-foreground mb-6">My Reviews</h1>
    <div className="space-y-4">
      {reviews.map((r) => (
        <div key={r.id} className="rounded-xl bg-card p-4 gold-border">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">{r.salon}</p>
              <p className="text-xs text-primary">{r.service}</p>
            </div>
            <p className="text-[10px] text-muted-foreground">{r.date}</p>
          </div>
          <div className="mt-2 flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
        </div>
      ))}
    </div>
  </div>
);

export default MyReviews;
