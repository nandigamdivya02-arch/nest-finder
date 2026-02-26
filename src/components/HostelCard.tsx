import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Users, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import type { Hostel } from "@/data/hostels";

interface HostelCardProps {
  hostel: Hostel;
  index: number;
}

const HostelCard = ({ hostel, index }: HostelCardProps) => {
  const { toast } = useToast();
  const [wishlisted, setWishlisted] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    return saved.includes(hostel.id);
  });

  const toggleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved: string[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updated: string[];
    if (wishlisted) {
      updated = saved.filter((id) => id !== hostel.id);
      toast({ title: "Removed from wishlist" });
    } else {
      updated = [...saved, hostel.id];
      toast({ title: "Added to wishlist ❤️" });
    }
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlisted(!wishlisted);
  }, [wishlisted, hostel.id, toast]);

  const typeColors = {
    boys: "bg-blue-100 text-blue-700",
    girls: "bg-pink-100 text-pink-700",
    "co-ed": "bg-purple-100 text-purple-700",
  };

  const availabilityColors = {
    available: "bg-green-100 text-green-700",
    limited: "bg-amber-100 text-amber-700",
    full: "bg-red-100 text-red-700",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="card-3d group"
    >
      <Link to={`/property/${hostel.id}`}>
        <div className="card-3d-inner bg-card rounded-2xl overflow-hidden border border-border hover-lift">
          {/* Image */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
            {hostel.images.length > 0 ? (
              <img
                src={hostel.images[0]}
                alt={hostel.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-hero-bg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{hostel.roomTypes.length} room types</p>
                </div>
              </div>
            )}
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${typeColors[hostel.type]}`}>
                {hostel.type === "boys" ? "Boys" : hostel.type === "girls" ? "Girls" : "Co-ed"}
              </span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${availabilityColors[hostel.availability]}`}>
                {hostel.availability}
              </span>
            </div>

            <button
              onClick={toggleWishlist}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center transition-colors ${
                wishlisted ? "bg-red-500/20" : "hover:bg-destructive/10"
              }`}
            >
              <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
            </button>

            {hostel.featured && (
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold gradient-accent-bg text-accent-foreground">
                  ⭐ Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                {hostel.name}
              </h3>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <span className="text-sm font-semibold">{hostel.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="text-sm line-clamp-1">{hostel.area}, {hostel.city}</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{hostel.description}</p>

            {/* Amenities preview */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {hostel.amenities.slice(0, 4).map((amenity) => (
                <span key={amenity} className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground text-xs">
                  {amenity}
                </span>
              ))}
              {hostel.amenities.length > 4 && (
                <span className="px-2 py-0.5 rounded-md bg-secondary text-muted-foreground text-xs">
                  +{hostel.amenities.length - 4}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div>
                <span className="text-lg font-display font-bold text-primary">₹{hostel.priceMin.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground"> - ₹{hostel.priceMax.toLocaleString()}/mo</span>
              </div>
              {hostel.ac && (
                <span className="flex items-center gap-1 text-xs text-primary font-medium">
                  <Zap className="w-3.5 h-3.5" /> AC
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HostelCard;
