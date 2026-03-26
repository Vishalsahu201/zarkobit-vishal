import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Store, Plus, IndianRupee, Users, Calendar, Star, TrendingUp, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SalonDashboard = () => {
  const [salon, setSalon] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", price: 50, duration_minutes: 30, category: "Haircut" });
  const { toast } = useToast();

  useEffect(() => {
    loadSalonData();
  }, []);

  const loadSalonData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: salonData } = await supabase.from("salons").select("*").eq("owner_id", user.id).maybeSingle();
    if (salonData) {
      setSalon(salonData);
      const { data: svcData } = await supabase.from("salon_services").select("*").eq("salon_id", salonData.id);
      setServices(svcData || []);
      const { data: bookingData } = await supabase.from("bookings").select("*").eq("salon_id", salonData.id).order("created_at", { ascending: false });
      setBookings(bookingData || []);
    }
  };

  const createSalon = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("salons").insert({
      owner_id: user.id,
      name: "My Salon",
      address: "Kanpur, UP",
      city: "Kanpur",
    });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salon Created! 🎉" });
    loadSalonData();
  };

  const addService = async () => {
    if (!salon || !newService.name) return;
    const { error } = await supabase.from("salon_services").insert({ ...newService, salon_id: salon.id });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Service Added! ✂️" });
    setShowAddService(false);
    setNewService({ name: "", price: 50, duration_minutes: 30, category: "Haircut" });
    loadSalonData();
  };

  const stats = [
    { icon: IndianRupee, label: "Revenue", value: `₹${bookings.reduce((s, b) => s + (b.total_amount || 0), 0)}` },
    { icon: Calendar, label: "Bookings", value: bookings.length.toString() },
    { icon: Users, label: "Customers", value: new Set(bookings.map(b => b.user_id)).size.toString() },
    { icon: Star, label: "Rating", value: salon?.rating?.toString() || "4.5" },
  ];

  if (!salon) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <Store className="h-16 w-16 text-primary mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Create Your Salon</h1>
        <p className="text-sm text-muted-foreground mb-6">Set up your salon profile and start receiving bookings</p>
        <button onClick={createSalon} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground gold-glow">
          <Plus className="h-4 w-4" /> Create Salon
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-bold gold-gradient-text mb-6">Salon Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-card p-4 gold-border text-center">
            <Icon className="mx-auto h-5 w-5 text-primary mb-1" />
            <p className="text-lg font-bold font-display text-foreground">{value}</p>
            <p className="text-[10px] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold text-foreground">Services</h2>
          <button onClick={() => setShowAddService(!showAddService)} className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            <Plus className="inline h-3 w-3 mr-1" /> Add
          </button>
        </div>

        {showAddService && (
          <div className="mb-4 rounded-xl bg-card p-4 gold-border space-y-3">
            <input value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} placeholder="Service Name"
              className="w-full rounded-lg bg-secondary p-2.5 text-sm text-foreground outline-none" />
            <div className="flex gap-3">
              <input type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })} placeholder="Price (₹50-200)"
                min={50} max={200} className="flex-1 rounded-lg bg-secondary p-2.5 text-sm text-foreground outline-none" />
              <input type="number" value={newService.duration_minutes} onChange={(e) => setNewService({ ...newService, duration_minutes: Number(e.target.value) })} placeholder="Duration"
                className="flex-1 rounded-lg bg-secondary p-2.5 text-sm text-foreground outline-none" />
            </div>
            <select value={newService.category} onChange={(e) => setNewService({ ...newService, category: e.target.value })}
              className="w-full rounded-lg bg-secondary p-2.5 text-sm text-foreground outline-none">
              {["Haircut", "Facial", "Spa", "Makeup", "Nails", "Hair Color", "Beard", "Massage"].map(c => <option key={c}>{c}</option>)}
            </select>
            <button onClick={addService} className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground">Add Service</button>
          </div>
        )}

        <div className="space-y-2">
          {services.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No services yet. Add your first service!</p>
          ) : services.map((svc) => (
            <div key={svc.id} className="flex items-center justify-between rounded-xl bg-card p-3 gold-border">
              <div>
                <p className="text-sm font-medium text-foreground">{svc.name}</p>
                <p className="text-xs text-muted-foreground">{svc.category} • {svc.duration_minutes} min</p>
              </div>
              <p className="text-sm font-bold text-primary">₹{svc.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Bookings */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-3">Recent Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No bookings yet</p>
        ) : bookings.slice(0, 10).map((b) => (
          <div key={b.id} className="flex items-center justify-between rounded-xl bg-card p-3 mb-2">
            <div>
              <p className="text-sm font-medium text-foreground">{b.booking_date} at {b.booking_time}</p>
              <p className="text-xs text-muted-foreground">Status: {b.status}</p>
            </div>
            <p className="text-sm font-bold text-primary">₹{b.total_amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonDashboard;
