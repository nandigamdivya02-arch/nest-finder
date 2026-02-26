import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HostelCard from "@/components/HostelCard";
import { hostels } from "@/data/hostels";

const Wishlist = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const update = () => setSavedIds(JSON.parse(localStorage.getItem("wishlist") || "[]"));
    update();
    window.addEventListener("storage", update);
    return () => window.removeEventListener("storage", update);
  }, []);

  const saved = hostels.filter((h) => savedIds.includes(h.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 lg:pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">{saved.length} saved {saved.length === 1 ? "property" : "properties"}</p>
          </motion.div>

          {saved.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {saved.map((h, i) => (
                <HostelCard key={h.id} hostel={h} index={i} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h2 className="text-xl font-display font-bold mb-2">No saved properties yet</h2>
              <p className="text-muted-foreground mb-6">Tap the heart icon on any property to save it here.</p>
              <Link to="/listings" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                Browse Properties
              </Link>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Wishlist;
