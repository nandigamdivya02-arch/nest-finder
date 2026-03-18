import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Home as HomeIcon, Building2, Castle, TreePine, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const buildingTypes = [
  { Icon: HomeIcon, x: "8%", y: "18%", size: 44, delay: 0, dur: 8 },
  { Icon: Building2, x: "78%", y: "12%", size: 52, delay: 1.2, dur: 10 },
  { Icon: Castle, x: "88%", y: "50%", size: 38, delay: 2.5, dur: 7 },
  { Icon: HomeIcon, x: "62%", y: "68%", size: 48, delay: 0.8, dur: 9 },
  { Icon: TreePine, x: "22%", y: "62%", size: 32, delay: 3.2, dur: 6.5 },
  { Icon: Building2, x: "42%", y: "8%", size: 40, delay: 1.8, dur: 8.5 },
  { Icon: Castle, x: "5%", y: "45%", size: 36, delay: 4, dur: 7.5 },
  { Icon: HomeIcon, x: "50%", y: "40%", size: 42, delay: 2, dur: 11 },
  { Icon: Building2, x: "70%", y: "35%", size: 34, delay: 3.5, dur: 9.5 },
];

const HeroSection = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/listings?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.15)] via-background to-[hsl(var(--accent)/0.1)]" />
      
      {/* Animated mesh blobs */}
      <motion.div
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(var(--primary)/0.12)] blur-[100px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[hsl(var(--accent)/0.1)] blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, -80, 0], scale: [1.1, 0.9, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-[hsl(var(--ring)/0.08)] blur-[80px]"
        animate={{ x: [-50, 50, -50], y: [-30, 30, -30], scale: [0.8, 1.15, 0.8] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`vline-${i}`}
            className="absolute top-0 bottom-0 w-px bg-border/30"
            style={{ left: `${15 + i * 15}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeOut" }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`hline-${i}`}
            className="absolute left-0 right-0 h-px bg-border/30"
            style={{ top: `${20 + i * 20}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.2, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Floating buildings/homes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {buildingTypes.map((b, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: b.x, top: b.y }}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{
              opacity: [0, 0.25, 0.25, 0],
              scale: [0.4, 1, 1, 0.4],
              y: [-15, 15, -15],
              rotate: [0, 8, -8, 0],
            }}
            transition={{ duration: b.dur, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
          >
            <div
              className="rounded-2xl bg-muted/60 backdrop-blur-md border border-border flex items-center justify-center shadow-md"
              style={{ width: b.size, height: b.size }}
            >
              <b.Icon
                className="text-muted-foreground/50"
                style={{ width: b.size * 0.5, height: b.size * 0.5 }}
              />
            </div>
          </motion.div>
        ))}

        {/* Particle dots */}
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/30"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 30), 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-foreground text-sm font-medium backdrop-blur-sm mb-6 border border-border">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <MapPin className="w-4 h-4 text-primary" />
              </motion.span>
              Hyderabad & Surrounding Areas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, type: "spring", stiffness: 80 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight mb-6"
          >
            Find Your
            <br />
            <motion.span
              className="text-accent inline-block"
              animate={{
                textShadow: [
                  "0 0 20px hsl(var(--accent) / 0.3)",
                  "0 0 40px hsl(var(--accent) / 0.5)",
                  "0 0 20px hsl(var(--accent) / 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Perfect Stay
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg"
          >
            Discover houses, hostels, playgrounds, and PG accommodations across Hyderabad.
            Affordable, safe, and comfortable living for students & professionals.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 80 }}
            className="flex items-center gap-2 w-full max-w-lg bg-card/80 backdrop-blur-md border border-border rounded-2xl px-4 py-3 shadow-lg focus-within:ring-2 focus-within:ring-primary/30 transition-shadow"
          >
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search hostels, PGs, playgrounds..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </motion.form>

          {/* CTA Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex gap-3 mt-4"
          >
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-90 transition-opacity border border-border"
            >
              <HomeIcon className="w-4 h-4" /> Properties
            </Link>
            <Link
              to="/playgrounds"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-90 transition-opacity border border-border"
            >
              <TreePine className="w-4 h-4" /> Playgrounds
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex gap-8 mt-10"
          >
            {[
              { value: "50+", label: "Properties" },
              { value: "1000+", label: "Happy Residents" },
              { value: "4.5", label: "Avg Rating" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.15, type: "spring" }}
                whileHover={{ scale: 1.1 }}
              >
                <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
