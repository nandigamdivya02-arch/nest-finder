import { motion } from "framer-motion";
import { hostels } from "@/data/hostels";
import HostelCard from "./HostelCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedHostels = () => {
  const featured = hostels.filter((h) => h.featured).slice(0, 6);

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-light text-primary text-sm font-semibold mb-4">
            Top Rated
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Properties</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Hand-picked houses, hostels, and PGs across Hyderabad with the best reviews, 
            amenities, and value for money.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((hostel, i) => (
            <HostelCard key={hostel.id} hostel={hostel} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all shadow-glow"
            >
              View All Properties
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedHostels;
