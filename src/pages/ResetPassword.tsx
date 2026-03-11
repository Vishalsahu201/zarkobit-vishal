import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) setValid(true);
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Password updated! 🎉" });
      navigate("/");
    }
    setLoading(false);
  };

  if (!valid) return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <p className="text-muted-foreground">Invalid or expired reset link.</p>
    </div>
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <form onSubmit={handleReset} className="w-full max-w-sm space-y-4 rounded-2xl bg-card p-6 gold-border">
        <h1 className="font-display text-xl font-bold text-foreground text-center">Set New Password</h1>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="password" placeholder="New Password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50">
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
