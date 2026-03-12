import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, IndianRupee, XCircle, ArrowLeft, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUserBookings } from "@/hooks/use-playgrounds";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function MyPlaygroundBookings() {
  const { data: bookings = [], isLoading } = useUserBookings();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  const today = format(new Date(), "yyyy-MM-dd");

  const filtered = bookings.filter((b) => {
    if (tab === "upcoming") return b.booking_date >= today && b.status === "confirmed";
    if (tab === "past") return b.booking_date < today || b.status === "completed";
    return b.status === "cancelled";
  });

  const handleCancel = async (bookingId: string) => {
    const { error } = await supabase
      .from("playground_bookings")
      .update({ status: "cancelled" } as any)
      .eq("id", bookingId);
    if (error) {
      toast({ title: "Failed to cancel", variant: "destructive" });
    } else {
      toast({ title: "Booking cancelled" });
      queryClient.invalidateQueries({ queryKey: ["user-bookings"] });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 container mx-auto px-4 text-center">
          <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold mb-2">Login Required</h1>
          <p className="text-muted-foreground mb-4">Please log in to view your bookings</p>
          <Link to="/login" className="inline-block px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 lg:pt-28 pb-20 container mx-auto px-4">
        <Link to="/playgrounds" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to playgrounds
        </Link>

        <h1 className="text-2xl lg:text-3xl font-display font-bold mb-6">My Bookings</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["upcoming", "past", "cancelled"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg mb-1">No {tab} bookings</h3>
            <p className="text-sm text-muted-foreground">
              {tab === "upcoming" ? "Book a playground to get started!" : "Nothing here yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl border border-border p-5"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {booking.playground && (
                    <Link to={`/playgrounds/${booking.playground.id}`}>
                      <img
                        src={booking.playground.images?.[0] || "/placeholder.svg"}
                        alt={booking.playground.name}
                        className="w-full sm:w-28 h-20 rounded-xl object-cover"
                      />
                    </Link>
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1">
                      {booking.playground?.name || "Playground"}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(booking.booking_date), "dd MMM yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {booking.start_time.slice(0, 5)} – {booking.end_time.slice(0, 5)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {booking.playground?.address}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold flex items-center">
                        <IndianRupee className="w-3.5 h-3.5" />
                        {booking.total_price.toLocaleString()}
                      </span>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                        booking.status === "confirmed" ? "bg-emerald-500/10 text-emerald-600" :
                        booking.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  {tab === "upcoming" && booking.status === "confirmed" && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="self-start flex items-center gap-1 text-xs text-destructive hover:text-destructive/80 font-medium"
                    >
                      <XCircle className="w-4 h-4" /> Cancel
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
