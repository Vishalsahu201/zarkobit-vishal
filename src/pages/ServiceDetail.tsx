import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star, Clock, Share2, Heart, CheckCircle2, MapPin,
  Calendar, ChevronRight, ThumbsUp, ChevronLeft, ChevronDown
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import { generateServices, stylists } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"
];

const getNext14Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
};

const formatDay = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short" });
const formatDate = (d: Date) => d.getDate().toString();
const formatMonth = (d: Date) => d.toLocaleDateString("en-IN", { month: "short" });
const formatFullDate = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const services = useMemo(() => generateServices(16), []);
  const current = services.find((s) => s.id === id) || services[0];
  const related = services.filter((s) => s.id !== current.id).slice(0, 4);
  const [liked, setLiked] = useState(false);

  // Booking state
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<"select" | "confirm" | "success">("select");

  const days = useMemo(() => getNext14Days(), []);

  const handleBookNow = () => {
    setShowBooking(true);
    setBookingStep("select");
  };

  const handleConfirmBooking = () => {
    setBookingStep("confirm");
  };

  const handleFinalBook = () => {
    setBookingStep("success");
    // Save booking to localStorage for Bookings page
    const bookings = JSON.parse(localStorage.getItem("zarkobit_bookings") || "[]");
    bookings.push({
      id: Date.now(),
      service: current.title,
      salon: current.salon,
      salonAvatar: current.salonAvatar,
      date: selectedDate ? formatFullDate(selectedDate) : "",
      time: selectedTime,
      price: current.price,
      serviceFee: "₹2",
      status: "confirmed",
      stylist: stylists.find(s => s.id === selectedStylist)?.name || "Any Available",
      avatar: current.image,
      bookedAt: new Date().toISOString(),
    });
    localStorage.setItem("zarkobit_bookings", JSON.stringify(bookings));
    toast({ title: "Booking Confirmed! ✅", description: `${current.title} on ${selectedDate ? formatFullDate(selectedDate) : ""} at ${selectedTime}` });
  };

  const canProceed = selectedDate && selectedTime;

  // Booking modal
  if (showBooking) {
    return (
      <div className="px-6 py-6 max-w-2xl mx-auto">
        <button onClick={() => { setShowBooking(false); setBookingStep("select"); }} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" /> Back to Service
        </button>

        {bookingStep === "success" ? (
          <div className="text-center py-16">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 gold-glow">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="mt-3 text-sm text-muted-foreground max-w-sm mx-auto">
              Your appointment has been successfully booked. You'll receive a confirmation shortly.
            </p>
            <div className="mt-6 rounded-2xl bg-card p-6 gold-border text-left max-w-sm mx-auto">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium text-foreground">{current.title.split(" - ")[0]}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Salon</span><span className="font-medium text-foreground">{current.salon}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium text-foreground">{selectedDate ? formatFullDate(selectedDate) : ""}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium text-foreground">{selectedTime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Stylist</span><span className="font-medium text-foreground">{stylists.find(s => s.id === selectedStylist)?.name || "Any Available"}</span></div>
                <div className="border-t border-border pt-3 flex justify-between"><span className="text-muted-foreground">Total</span><span className="font-bold gold-gradient-text text-lg">{current.price} + ₹2 fee</span></div>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-center">
              <button onClick={() => navigate("/bookings")} className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground gold-glow">
                View My Bookings
              </button>
              <button onClick={() => navigate("/")} className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-secondary">
                Go Home
              </button>
            </div>
          </div>
        ) : bookingStep === "confirm" ? (
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">Confirm Your Booking</h1>
            <div className="rounded-2xl bg-card p-6 gold-border">
              <div className="flex gap-4 mb-6">
                <img src={current.image} alt={current.title} className="h-20 w-28 rounded-xl object-cover" />
                <div>
                  <h3 className="font-medium text-foreground">{current.title.split(" - ")[0]}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" />{current.salon}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{current.duration}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm border-t border-border pt-4">
                <div className="flex justify-between"><span className="text-muted-foreground">📅 Date</span><span className="font-medium text-foreground">{selectedDate ? formatFullDate(selectedDate) : ""}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">🕐 Time</span><span className="font-medium text-foreground">{selectedTime}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">💇 Stylist</span><span className="font-medium text-foreground">{stylists.find(s => s.id === selectedStylist)?.name || "Any Available"}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">💰 Service Price</span><span className="font-medium text-foreground">{current.price}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">📋 Platform Fee</span><span className="font-medium text-foreground">₹2</span></div>
                <div className="border-t border-border pt-3 flex justify-between"><span className="font-semibold text-foreground">Total</span><span className="font-bold gold-gradient-text text-lg">{current.price} + ₹2</span></div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={handleFinalBook} className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90">
                ✅ Confirm Booking
              </button>
              <button onClick={() => setBookingStep("select")} className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary">
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">Book Appointment</h1>
            <p className="text-sm text-muted-foreground mb-6">{current.title.split(" - ")[0]} at {current.salon}</p>

            {/* Date Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">📅 Select Date</h3>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {days.map((day) => {
                  const isSelected = selectedDate?.toDateString() === day.toDateString();
                  const isToday = day.toDateString() === new Date().toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`flex flex-shrink-0 flex-col items-center rounded-xl px-4 py-3 transition-all ${
                        isSelected ? "bg-primary text-primary-foreground gold-glow" : "bg-card text-foreground hover:bg-secondary border border-border"
                      }`}
                    >
                      <span className="text-[10px] uppercase">{formatDay(day)}</span>
                      <span className="text-lg font-bold">{formatDate(day)}</span>
                      <span className="text-[10px]">{formatMonth(day)}</span>
                      {isToday && <span className="mt-1 text-[8px] bg-primary/20 rounded-full px-2 py-0.5">Today</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">🕐 Select Time</h3>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  const isUnavailable = Math.random() > 0.8; // simulate some unavailable
                  return (
                    <button
                      key={time}
                      onClick={() => !isUnavailable && setSelectedTime(time)}
                      disabled={isUnavailable}
                      className={`rounded-lg py-2.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground gold-glow"
                          : isUnavailable
                          ? "bg-card/50 text-muted-foreground/40 cursor-not-allowed line-through"
                          : "bg-card text-foreground hover:bg-secondary border border-border"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stylist Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">💇 Choose Stylist (Optional)</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedStylist(null)}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                    selectedStylist === null ? "bg-primary/10 border border-primary gold-border" : "bg-card border border-border hover:bg-secondary"
                  }`}
                >
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">Any</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Any Available Stylist</p>
                    <p className="text-xs text-muted-foreground">We'll assign the best available</p>
                  </div>
                </button>
                {stylists.map((stylist) => (
                  <button
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist.id)}
                    className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
                      selectedStylist === stylist.id ? "bg-primary/10 border border-primary gold-border" : "bg-card border border-border hover:bg-secondary"
                    }`}
                  >
                    <img src={stylist.avatar} alt={stylist.name} className="h-10 w-10 rounded-full object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{stylist.name}</p>
                      <p className="text-xs text-muted-foreground">{stylist.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span className="text-foreground">{stylist.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="rounded-xl bg-card p-4 gold-border mb-6">
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Service</span><span className="text-foreground">{current.price}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Platform Fee</span><span className="text-foreground">₹2</span></div>
              <div className="flex justify-between text-sm border-t border-border pt-2"><span className="font-semibold text-foreground">Total</span><span className="font-bold gold-gradient-text">{current.price} + ₹2</span></div>
            </div>

            <button
              onClick={handleConfirmBooking}
              disabled={!canProceed}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {canProceed ? "Continue to Confirm →" : "Select Date & Time to Continue"}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 px-6 py-4 lg:flex-row">
      <div className="flex-1">
        {/* Image */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl">
          <img src={current.image} alt={current.title} className="h-full w-full object-cover" />
        </div>

        {/* Title & Price */}
        <div className="mt-4 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold text-foreground">{current.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-0.5"><Star className="h-4 w-4 fill-primary text-primary" /> {current.rating.toFixed(1)}</span>
              <span>{current.reviews}</span>
              <span className="flex items-center gap-0.5"><Clock className="h-4 w-4" /> {current.duration}</span>
              <span className="rounded-full bg-chip px-2 py-0.5 text-xs">{current.category}</span>
            </div>
          </div>
          <span className="text-2xl font-display font-bold gold-gradient-text">{current.price}</span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-3">
          <button onClick={handleBookNow} className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground gold-glow hover:opacity-90">
            <Calendar className="inline h-4 w-4 mr-1" /> Book Now
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all ${
              liked ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} /> Save
          </button>
          <button className="rounded-full border border-border p-3 text-foreground hover:bg-secondary">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Salon Info */}
        <div className="mt-6 flex items-center gap-3 rounded-xl bg-card p-4 gold-border">
          <img src={current.salonAvatar} alt={current.salon} className="h-12 w-12 rounded-full object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">{current.salon}</span>
              {current.verified && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
            </div>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> Bandra West, Mumbai
            </p>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
            Visit <ChevronRight className="inline h-3 w-3" />
          </button>
        </div>

        {/* Description */}
        <div className="mt-4 rounded-xl bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">About This Service</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Experience a premium salon service with our expert stylists. This service includes a consultation, 
            the treatment itself, and aftercare advice. We use only the highest quality products from leading 
            international brands to ensure the best results for your hair and skin.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-6">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Customer Reviews</h3>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 rounded-xl bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {["AS", "RK", "NM"][i - 1]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{["Aarti S.", "Raj K.", "Nisha M."][i - 1]}</p>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`h-3 w-3 ${j < 5 - (i > 2 ? 1 : 0) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">{i} week ago</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {["Amazing experience! The stylist was very professional and the results exceeded my expectations.",
                  "Great service, clean salon, and friendly staff. Will definitely come back for more treatments.",
                  "Loved the results! The attention to detail was impressive. Worth every penny."][i - 1]}
              </p>
              <button className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                <ThumbsUp className="h-3.5 w-3.5" /> Helpful ({[12, 8, 5][i - 1]})
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Related */}
      <div className="w-full lg:w-80">
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Similar Services</h3>
        <div className="flex flex-col gap-6">
          {related.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
