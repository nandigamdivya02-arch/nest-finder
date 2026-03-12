import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  MapPin, Star, Clock, IndianRupee, ArrowLeft, Zap, CheckCircle,
  Car, Droplets, Lightbulb, Armchair, Heart, ShieldCheck, Utensils, GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSlotPicker from "@/components/playground/BookingSlotPicker";
import BookingSummary from "@/components/playground/BookingSummary";
import { usePlayground, usePlaygroundReviews } from "@/hooks/use-playgrounds";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const facilityIcons: Record<string, any> = {
  Parking: Car,
  Washroom: Droplets,
  Floodlights: Lightbulb,
  Lighting: Lightbulb,
  "Seating Area": Armchair,
  Water: Droplets,
  "First Aid": Heart,
  "Changing Rooms": ShieldCheck,
  Cafeteria: Utensils,
  Coaching: GraduationCap,
};

export default function PlaygroundDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: playground, isLoading } = usePlayground(id || "");
  const { data: reviews = [] } = usePlaygroundReviews(id || "");
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [step, setStep] = useState<"select" | "summary" | "done">("select");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 container mx-auto px-4">
          <div className="h-96 rounded-2xl bg-muted animate-pulse" />
        </div>
      </div>
    );
  }

  if (!playground) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-display font-bold mb-2">Playground not found</h1>
          <Link to="/playgrounds" className="text-primary hover:underline">← Back to playgrounds</Link>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Please log in to book", variant: "destructive" });
      return;
    }
    if (!selectedDate || selectedSlots.length === 0) return;

    setBookingLoading(true);
    const sortedSlots = [...selectedSlots].sort();
    const startTime = sortedSlots[0] + ":00";
    const endHour = parseInt(sortedSlots[sortedSlots.length - 1]) + 1;
    const endTime = `${endHour.toString().padStart(2, "0")}:00:00`;
    const totalPrice = selectedSlots.length * playground.price_per_hour;

    const { error } = await supabase.from("playground_bookings").insert({
      playground_id: playground.id,
      user_id: user.id,
      booking_date: format(selectedDate, "yyyy-MM-dd"),
      start_time: startTime,
      end_time: endTime,
      total_hours: selectedSlots.length,
      total_price: totalPrice,
      payment_method: paymentMethod,
    } as any);

    setBookingLoading(false);

    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
    } else {
      setStep("done");
      toast({ title: "Booking Confirmed! 🎉", description: "Check your dashboard for details." });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 lg:pt-28 pb-20 container mx-auto px-4">
        <Link to="/playgrounds" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to playgrounds
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="rounded-2xl overflow-hidden h-72 lg:h-96">
                <img
                  src={playground.images[activeImage] || "/placeholder.svg"}
                  alt={playground.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {playground.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {playground.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex flex-wrap gap-2 mb-3">
                {playground.sport_types.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{s}</span>
                ))}
                {playground.is_featured && (
                  <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold mb-2">{playground.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{playground.address}, {playground.city}</span>
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-gold fill-gold" />{Number(playground.rating).toFixed(1)} ({playground.review_count} reviews)</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{playground.opening_time.slice(0, 5)} – {playground.closing_time.slice(0, 5)}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{playground.description}</p>
            </motion.div>

            {/* Facilities */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-lg font-display font-bold mb-3">Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {playground.facilities.map((f) => {
                  const Icon = facilityIcons[f] || CheckCircle;
                  return (
                    <div key={f} className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card">
                      <Icon className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm font-medium">{f}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-lg font-display font-bold mb-3">Reviews</h2>
              {reviews.length > 0 ? (
                <div className="space-y-3">
                  {reviews.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl border border-border bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "text-gold fill-gold" : "text-muted"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{format(new Date(r.created_at), "dd MMM yyyy")}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review after booking!</p>
              )}
            </motion.div>
          </div>

          {/* Right: Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 glass rounded-2xl p-5 border border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-2xl font-bold text-primary">
                  <IndianRupee className="w-5 h-5" />
                  {playground.price_per_hour.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground ml-1">/hr</span>
                </div>
              </div>

              {step === "select" && (
                <>
                  <BookingSlotPicker
                    playground={playground}
                    selectedDate={selectedDate}
                    onDateChange={(d) => { setSelectedDate(d); setSelectedSlots([]); }}
                    selectedSlots={selectedSlots}
                    onSlotsChange={setSelectedSlots}
                  />
                  {selectedSlots.length > 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{selectedSlots.length} hr × ₹{playground.price_per_hour}</span>
                        <span className="font-bold text-primary">₹{(selectedSlots.length * playground.price_per_hour).toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => setStep("summary")}
                        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow"
                      >
                        Book Now →
                      </button>
                    </motion.div>
                  )}
                </>
              )}

              {step === "summary" && selectedDate && (
                <BookingSummary
                  playground={playground}
                  date={selectedDate}
                  slots={selectedSlots}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  onConfirm={handleConfirmBooking}
                  onBack={() => setStep("select")}
                  isLoading={bookingLoading}
                />
              )}

              {step === "done" && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-display font-bold mb-2">Booking Confirmed!</h3>
                  <p className="text-sm text-muted-foreground mb-4">Your slot has been reserved. Check your dashboard for details.</p>
                  <Link
                    to="/playgrounds/my-bookings"
                    className="inline-block px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
                  >
                    View My Bookings
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
