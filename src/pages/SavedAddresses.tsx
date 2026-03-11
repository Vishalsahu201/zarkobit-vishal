import { MapPin, Home, Briefcase, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const initialAddresses = [
  { id: 1, type: "home", label: "Home", address: "402, Sunshine Apartments, Andheri West, Mumbai 400053" },
  { id: 2, type: "work", label: "Office", address: "5th Floor, Tech Park, BKC, Mumbai 400051" },
];

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showAdd, setShowAdd] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "", address: "" });

  const handleAdd = () => {
    if (!newAddr.label || !newAddr.address) return;
    setAddresses([...addresses, { id: Date.now(), type: "other", ...newAddr }]);
    setNewAddr({ label: "", address: "" });
    setShowAdd(false);
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Saved Addresses</h1>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>

      {showAdd && (
        <div className="mb-6 rounded-xl bg-card p-4 gold-border space-y-3">
          <input
            placeholder="Label (e.g. Gym)"
            value={newAddr.label}
            onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
            className="w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <input
            placeholder="Full Address"
            value={newAddr.address}
            onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
            className="w-full rounded-lg bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button onClick={handleAdd} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Save Address</button>
        </div>
      )}

      <div className="space-y-3">
        {addresses.map((a) => (
          <div key={a.id} className="flex items-start gap-4 rounded-xl bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              {a.type === "home" ? <Home className="h-5 w-5 text-primary" /> : a.type === "work" ? <Briefcase className="h-5 w-5 text-primary" /> : <MapPin className="h-5 w-5 text-primary" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{a.address}</p>
            </div>
            <button onClick={() => setAddresses(addresses.filter((x) => x.id !== a.id))} className="text-muted-foreground hover:text-destructive flex-shrink-0">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedAddresses;
