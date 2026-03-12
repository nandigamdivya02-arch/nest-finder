import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock, IndianRupee, Zap } from "lucide-react";
import type { Playground } from "@/hooks/use-playgrounds";

const sportColors: Record<string, string> = {
  Cricket: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Football: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Badminton: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Tennis: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Basketball: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

export default function PlaygroundCard({ playground, index }: { playground: Playground; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
    >
      <Link to={`/playgrounds/${playground.id}`} className="group block">
        <div className="rounded-2xl border border-border bg-card overflow-hidden hover-lift glass">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={playground.images[0] || "/placeholder.svg"}
              alt={playground.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {playground.is_featured && (
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                <Zap className="w-3 h-3" /> Featured
              </div>
            )}
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full glass text-xs font-bold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              {Number(playground.rating).toFixed(1)}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {playground.sport_types.map((sport) => (
                <span key={sport} className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${sportColors[sport] || "bg-muted text-muted-foreground"}`}>
                  {sport}
                </span>
              ))}
            </div>

            <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {playground.name}
            </h3>

            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{playground.address}, {playground.city}</span>
            </div>

            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{playground.opening_time.slice(0, 5)} – {playground.closing_time.slice(0, 5)}</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center text-primary font-bold text-lg">
                <IndianRupee className="w-4 h-4" />
                {playground.price_per_hour.toLocaleString()}
                <span className="text-xs text-muted-foreground font-normal ml-1">/hr</span>
              </div>
              <span className="text-xs text-muted-foreground">{playground.review_count} reviews</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
