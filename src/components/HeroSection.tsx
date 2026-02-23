import { motion } from "framer-motion";
import { Search, MapPin, IndianRupee, BedDouble } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-hostel.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern hostel in Gandimaisamma, Hyderabad"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm mb-6">
              <MapPin className="w-4 h-4" />
              Hyderabad & Surrounding Areas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            Find Your
            <br />
            <span className="text-accent">Perfect Stay</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg"
          >
            Discover houses, hostels, and PG accommodations across Hyderabad. 
            Affordable, safe, and comfortable living for students & professionals.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass rounded-2xl p-2 shadow-3d max-w-xl"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                 <input
                  type="text"
                  placeholder="Search in Hyderabad..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50 sm:w-36">
                <IndianRupee className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Budget"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                />
              </div>
              <Link
                to="/listings"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow shrink-0"
              >
                <Search className="w-4 h-4" />
                Search
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex gap-8 mt-10"
          >
            {[
              { value: "50+", label: "Properties" },
              { value: "1000+", label: "Happy Residents" },
              { value: "4.5", label: "Avg Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
