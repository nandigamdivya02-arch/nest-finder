import { motion } from "framer-motion";
import { format } from "date-fns";
import { IndianRupee, Calendar, Clock, CreditCard, Smartphone, Wallet } from "lucide-react";
import type { Playground } from "@/hooks/use-playgrounds";

interface BookingSummaryProps {
  playground: Playground;
  date: Date;
  slots: string[];
  paymentMethod: string;
  onPaymentMethodChange: (m: string) => void;
  onConfirm: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const paymentMethods = [
  { key: "upi", label: "UPI", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
  { key: "card", label: "Card", icon: CreditCard, desc: "Debit / Credit Card" },
  { key: "wallet", label: "Wallet", icon: Wallet, desc: "Amazon Pay, Mobikwik" },
];

export default function BookingSummary({
  playground,
  date,
  slots,
  paymentMethod,
  onPaymentMethodChange,
  onConfirm,
  onBack,
  isLoading,
}: BookingSummaryProps) {
  const totalHours = slots.length;
  const totalPrice = totalHours * playground.price_per_hour;
  const gst = Math.round(totalPrice * 0.18);
  const grandTotal = totalPrice + gst;

  const sortedSlots = [...slots].sort();
  const startTime = sortedSlots[0];
  const endHour = parseInt(sortedSlots[sortedSlots.length - 1]) + 1;
  const endTime = `${endHour.toString().padStart(2, "0")}:00`;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
      <h3 className="font-display font-bold text-lg">Booking Summary</h3>

      <div className="glass rounded-xl p-4 space-y-3">
        <div className="flex items-start gap-3">
          <img
            src={playground.images[0] || "/placeholder.svg"}
            alt={playground.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <p className="font-bold text-sm">{playground.name}</p>
            <p className="text-xs text-muted-foreground">{playground.address}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(date, "dd MMM yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{startTime} – {endTime}</span>
          </div>
        </div>

        <div className="border-t border-border pt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              ₹{playground.price_per_hour} × {totalHours} hr{totalHours > 1 ? "s" : ""}
            </span>
            <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium">₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
            <span>Total</span>
            <span className="text-primary flex items-center">
              <IndianRupee className="w-4 h-4" />
              {grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground mb-2 block">Payment Method</label>
        <div className="grid grid-cols-3 gap-2">
          {paymentMethods.map((m) => (
            <button
              key={m.key}
              onClick={() => onPaymentMethodChange(m.key)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all text-xs ${
                paymentMethod === m.key
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <m.icon className="w-5 h-5" />
              <span className="font-semibold">{m.label}</span>
              <span className="text-[10px] text-muted-foreground">{m.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl border-2 border-border font-semibold text-sm hover:bg-secondary transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow disabled:opacity-50"
        >
          {isLoading ? "Booking..." : "Confirm & Pay"}
        </button>
      </div>
    </motion.div>
  );
}
