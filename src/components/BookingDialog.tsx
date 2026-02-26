import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Phone, Mail, CheckCircle, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  hostelName: string;
  priceMin: number;
  mode: "book" | "visit";
}

const durations = [
  { label: "1 Month", months: 1 },
  { label: "3 Months", months: 3 },
  { label: "6 Months", months: 6 },
  { label: "12 Months", months: 12 },
];

const BookingDialog = ({ isOpen, onClose, hostelName, priceMin, mode }: BookingDialogProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    duration: 1,
  });

  const totalRent = priceMin * form.duration;
  const deposit = priceMin;
  const grandTotal = totalRent + deposit;

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.date) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({
      title: mode === "book" ? "Booking Confirmed! 🎉" : "Visit Scheduled! 📅",
      description: `We'll contact you at ${form.phone} to confirm.`,
    });
  };

  const handleClose = () => {
    setStep(1);
    setSubmitted(false);
    setForm({ name: "", phone: "", email: "", date: "", duration: 1 });
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card rounded-2xl w-full max-w-md border border-border shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-primary/5">
              <div>
                <h2 className="text-lg font-display font-bold">
                  {mode === "book" ? "Book Now" : "Schedule Visit"}
                </h2>
                <p className="text-xs text-muted-foreground">{hostelName}</p>
              </div>
              <button onClick={handleClose} className="p-2 rounded-full hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1 }}
                >
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-display font-bold mb-2">
                  {mode === "book" ? "Booking Confirmed!" : "Visit Scheduled!"}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {form.name}, we've received your request.
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  We'll call you at <strong>{form.phone}</strong> shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <div className="p-5 space-y-4">
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="Enter email (optional)"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!form.name || !form.phone) {
                          toast({ title: "Name and phone are required", variant: "destructive" });
                          return;
                        }
                        setStep(2);
                      }}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      Next →
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Date & Duration */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        {mode === "book" ? "Move-in Date *" : "Visit Date *"}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="date"
                          min={today}
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>

                    {mode === "book" && (
                      <>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Duration</label>
                          <div className="grid grid-cols-4 gap-2">
                            {durations.map((d) => (
                              <button
                                key={d.months}
                                onClick={() => setForm({ ...form, duration: d.months })}
                                className={`py-2 rounded-lg text-xs font-medium transition-colors border ${
                                  form.duration === d.months
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                {d.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-secondary rounded-xl p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Rent ({form.duration} mo)</span>
                            <span className="font-medium">₹{totalRent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Security Deposit</span>
                            <span className="font-medium">₹{deposit.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-border pt-2 flex justify-between text-sm font-bold">
                            <span>Total</span>
                            <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 rounded-xl border-2 border-border font-semibold text-sm hover:bg-secondary transition-colors"
                      >
                        ← Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow"
                      >
                        {mode === "book" ? "Confirm Booking" : "Schedule Visit"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingDialog;
