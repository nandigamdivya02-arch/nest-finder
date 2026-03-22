import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, CheckCircle, XCircle, Clock, Eye, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAllProperties, useUpdatePropertyStatus } from "@/hooks/use-properties";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { data: properties, isLoading } = useAllProperties();
  const updateStatus = useUpdatePropertyStatus();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/login"); return; }

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!data) {
        toast.error("Access denied. Admin only.");
        navigate("/");
        return;
      }
      setIsAdmin(true);
      setLoading(false);
    };
    checkAdmin();
  }, [navigate]);

  const handleStatusChange = (id: string, status: "pending" | "approved" | "rejected") => {
    updateStatus.mutate({ id, status }, {
      onSuccess: () => toast.success(`Property ${status}`),
      onError: () => toast.error("Failed to update status"),
    });
  };

  const filtered = properties?.filter(p => filter === "all" || p.status === filter) || [];

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const counts = {
    all: properties?.length || 0,
    pending: properties?.filter(p => p.status === "pending").length || 0,
    approved: properties?.filter(p => p.status === "approved").length || 0,
    rejected: properties?.filter(p => p.status === "rejected").length || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 lg:pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-display font-bold">Admin Panel</h1>
            </div>
            <p className="text-muted-foreground">Review and manage property submissions</p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["all", "pending", "approved", "rejected"] as const).map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors capitalize ${
                  filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
                }`}
              >
                {s} ({counts[s]})
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 rounded-2xl bg-card animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-bold mb-2">No properties found</p>
              <p className="text-muted-foreground">No {filter !== "all" ? filter : ""} submissions yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, i) => {
                const StatusIcon = statusIcons[property.status] || Clock;
                return (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden"
                  >
                    <div className="h-40 bg-secondary relative">
                      {property.images?.[0] ? (
                        <img src={property.images[0]} alt={property.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                      )}
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${statusColors[property.status]}`}>
                        <StatusIcon className="w-3 h-3" />
                        {property.status}
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="font-display font-bold text-lg mb-1 truncate">{property.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">{property.area}, {property.city}</p>
                      <p className="text-sm text-muted-foreground mb-3">₹{property.price_min} - ₹{property.price_max}/mo · {property.type}</p>

                      <div className="flex gap-2">
                        {property.status !== "approved" && (
                          <button
                            onClick={() => handleStatusChange(property.id, "approved")}
                            disabled={updateStatus.isPending}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" /> Approve
                          </button>
                        )}
                        {property.status !== "rejected" && (
                          <button
                            onClick={() => handleStatusChange(property.id, "rejected")}
                            disabled={updateStatus.isPending}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                          >
                            <XCircle className="w-4 h-4" /> Reject
                          </button>
                        )}
                        {property.status === "approved" && (
                          <button
                            onClick={() => handleStatusChange(property.id, "pending")}
                            disabled={updateStatus.isPending}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-700 transition-colors"
                          >
                            <Clock className="w-4 h-4" /> Unpublish
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;
