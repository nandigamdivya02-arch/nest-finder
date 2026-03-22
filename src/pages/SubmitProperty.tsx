import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSubmitProperty } from "@/hooks/use-properties";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const propertyTypes = ["boys", "girls", "co-ed", "house", "apartment", "playground"];
const furnishedOptions = ["furnished", "semi-furnished", "unfurnished"];
const availabilityOptions = ["available", "limited", "full"];

const SubmitProperty = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const submitProperty = useSubmitProperty();

  const [form, setForm] = useState({
    name: "", type: "boys", address: "", area: "", city: "Hyderabad",
    pincode: "", price_min: 0, price_max: 0, description: "",
    owner_name: "", owner_phone: "", furnished: "furnished",
    ac: false, food_included: false, availability: "available",
    room_types: "" as string, amenities: "" as string,
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { navigate("/login"); return; }
      setUserId(user.id);
    });
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (!form.name || !form.address || !form.area) {
      toast.error("Please fill in all required fields");
      return;
    }

    submitProperty.mutate({
      ...form,
      room_types: form.room_types.split(",").map(s => s.trim()).filter(Boolean),
      amenities: form.amenities.split(",").map(s => s.trim()).filter(Boolean),
      images: [],
      lat: 17.385,
      lng: 78.4867,
      submitted_by: userId,
    }, {
      onSuccess: () => {
        toast.success("Property submitted for review! An admin will approve it shortly.");
        navigate("/dashboard");
      },
      onError: () => toast.error("Failed to submit. Please try again."),
    });
  };

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 lg:pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-3xl font-display font-bold mb-2">
              List Your <span className="gradient-text">Property</span>
            </h1>
            <p className="text-muted-foreground mb-8">Submit your property for admin review. It will go live once approved.</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-card p-6 rounded-2xl border border-border"
          >
            {/* Name */}
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Property Name *</label>
              <input value={form.name} onChange={e => update("name", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
                placeholder="e.g. Sri Sai Luxury Mens Hostel" required />
            </div>

            {/* Type & Furnished */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Type *</label>
                <select value={form.type} onChange={e => update("type", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm">
                  {propertyTypes.map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Furnished</label>
                <select value={form.furnished} onChange={e => update("furnished", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm">
                  {furnishedOptions.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            {/* Address & Area */}
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Address *</label>
              <input value={form.address} onChange={e => update("address", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
                placeholder="Full address" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Area *</label>
                <input value={form.area} onChange={e => update("area", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Kukatpally" required />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Pincode</label>
                <input value={form.pincode} onChange={e => update("pincode", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
                  placeholder="500072" />
              </div>
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Min Price (₹/mo)</label>
                <input type="number" value={form.price_min} onChange={e => update("price_min", +e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Max Price (₹/mo)</label>
                <input type="number" value={form.price_max} onChange={e => update("price_max", +e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Description</label>
              <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors resize-none"
                placeholder="Describe your property..." />
            </div>

            {/* Room Types & Amenities */}
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Room Types (comma-separated)</label>
              <input value={form.room_types} onChange={e => update("room_types", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
                placeholder="Single, Double, Triple" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1.5 block">Amenities (comma-separated)</label>
              <input value={form.amenities} onChange={e => update("amenities", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors"
                placeholder="WiFi, Parking, Laundry, Food" />
            </div>

            {/* Owner Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Owner Name</label>
                <input value={form.owner_name} onChange={e => update("owner_name", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-1.5 block">Owner Phone</label>
                <input value={form.owner_phone} onChange={e => update("owner_phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            {/* Toggles */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.ac} onChange={e => update("ac", e.target.checked)}
                  className="rounded border-border" /> AC Available
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.food_included} onChange={e => update("food_included", e.target.checked)}
                  className="rounded border-border" /> Food Included
              </label>
            </div>

            <button type="submit" disabled={submitProperty.isPending}
              className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              {submitProperty.isPending ? "Submitting..." : "Submit for Review"}
            </button>
          </motion.form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitProperty;
