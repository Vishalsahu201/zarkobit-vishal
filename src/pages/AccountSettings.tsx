import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, LogOut, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setName(data.user.user_metadata?.full_name || "");
      }
    });
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Profile updated! ✨" });
    setLoading(false);
  };

  const handleResetPassword = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Password reset email sent!", description: "Check your inbox" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="px-4 py-6 sm:px-6 max-w-lg">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Account Settings</h1>

      <div className="space-y-4">
        {/* Name */}
        <div className="rounded-xl bg-card p-4">
          <label className="text-xs text-muted-foreground mb-1 block">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg bg-secondary py-2.5 pl-10 pr-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="rounded-xl bg-card p-4">
          <label className="text-xs text-muted-foreground mb-1 block">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={user?.email || ""}
              readOnly
              className="w-full rounded-lg bg-secondary py-2.5 pl-10 pr-4 text-sm text-muted-foreground outline-none cursor-not-allowed"
            />
          </div>
        </div>

        <button
          onClick={handleUpdateProfile}
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>

        <button
          onClick={handleResetPassword}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
        >
          <Lock className="h-4 w-4" /> Change Password
        </button>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;
