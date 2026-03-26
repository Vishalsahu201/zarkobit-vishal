import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Settings, Heart, Clock, Star, CalendarCheck, MapPin, ChevronRight, LogOut, Crown, CheckCircle, ShieldCheck, Store, Image } from "lucide-react";

const menuItems = [
  { icon: CalendarCheck, label: "My Bookings", desc: "View upcoming & past appointments", path: "/my-bookings" },
  { icon: Heart, label: "Favorite Salons", desc: "Saved salons & services", path: "/favorite-salons" },
  { icon: Clock, label: "Booking History", desc: "See all your past visits", path: "/booking-history" },
  { icon: Star, label: "My Reviews", desc: "Reviews you've written", path: "/my-reviews" },
  { icon: Image, label: "My Posts", desc: "Your photos & videos", path: "/feed" },
  { icon: MapPin, label: "Saved Addresses", desc: "Manage your locations", path: "/saved-addresses" },
  { icon: CheckCircle, label: "Get Verified", desc: "Blue tick & Black tick", path: "/verification" },
  { icon: Settings, label: "Account Settings", desc: "Edit profile, password & more", path: "/account-settings" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { user: u } } = await supabase.auth.getUser();
      setUser(u);
      if (u) {
        const { data } = await supabase.from("profiles").select("*").eq("user_id", u.id).maybeSingle();
        setProfile(data);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Guest User";
  const email = user?.email || "Not signed in";
  const isSalonOwner = profile?.role === "salon_owner";
  const verification = profile?.verification || "none";

  const VerificationBadge = () => {
    if (verification === "blue") return <CheckCircle className="h-5 w-5 text-blue-500 fill-blue-500" />;
    if (verification === "black") return <ShieldCheck className="h-5 w-5 text-foreground fill-foreground" />;
    return null;
  };

  const items = isSalonOwner
    ? [{ icon: Store, label: "Salon Dashboard", desc: "Manage your salon", path: "/salon-dashboard" }, ...menuItems]
    : menuItems;

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="rounded-2xl bg-gradient-to-r from-primary/20 via-surface-elevated to-primary/10 p-6 gold-border">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="relative">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="" className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover gold-border p-0.5" />
            ) : (
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-primary gold-glow">
                <User className="h-10 w-10 sm:h-12 sm:w-12 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground">{displayName}</h1>
              <VerificationBadge />
            </div>
            <p className="text-sm text-muted-foreground">{email}</p>
            {!user && (
              <button onClick={() => navigate("/auth")} className="mt-2 rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground">
                Sign In / Sign Up
              </button>
            )}
            {user && (
              <div className="mt-2 flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary flex items-center gap-1">
                  {isSalonOwner ? <><Store className="h-3 w-3" /> Salon Owner</> : <><Crown className="h-3 w-3" /> Customer</>}
                </span>
                <span className="text-xs text-muted-foreground">{profile?.city || "Kanpur"}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Bookings", value: "24", icon: CalendarCheck },
            { label: "Reviews", value: "12", icon: Star },
            { label: "Posts", value: "8", icon: Image },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl bg-card/50 p-3 text-center backdrop-blur-sm">
              <Icon className="mx-auto h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1" />
              <p className="text-lg sm:text-xl font-bold font-display text-foreground">{value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {items.map(({ icon: Icon, label, desc, path }) => (
          <button key={label} onClick={() => navigate(path)}
            className="flex w-full items-center gap-3 sm:gap-4 rounded-xl bg-card p-3 sm:p-4 text-left transition-colors hover:bg-surface-hover">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-muted-foreground" />
          </button>
        ))}
      </div>

      {user && (
        <button onClick={handleLogout} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 p-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      )}
    </div>
  );
};

export default Profile;
