import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, IndianRupee, Home as HomeIcon, Building2, Castle, TreePine, Mic, MicOff } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-hostel.jpg";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { isListening, isSupported, toggle } = useSpeechRecognition({
    onResult: (transcript) => setSearchQuery(transcript),
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImage}
          alt="Modern hostel in Gandimaisamma, Hyderabad"
          className="w-full h-full object-cover"
          loading="eager"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/85 via-foreground/60 to-primary/20" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`vline-${i}`}
            className="absolute top-0 bottom-0 w-px bg-primary-foreground/5"
            style={{ left: `${15 + i * 15}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: "easeOut" }}
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`hline-${i}`}
            className="absolute left-0 right-0 h-px bg-primary-foreground/5"
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
              opacity: [0, 0.2, 0.2, 0],
              scale: [0.4, 1, 1, 0.4],
              y: [-15, 15, -15],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          >
            <div
              className="rounded-2xl bg-primary-foreground/8 backdrop-blur-md border border-primary-foreground/10 flex items-center justify-center shadow-lg"
              style={{ width: b.size, height: b.size }}
            >
              <b.Icon
                className="text-primary-foreground/30"
                style={{ width: b.size * 0.5, height: b.size * 0.5 }}
              />
            </div>
          </motion.div>
        ))}

        {/* Glowing orbs */}
        <motion.div
          animate={{ y: [-30, 30, -30], x: [-10, 10, -10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 right-16 w-80 h-80 rounded-full bg-primary/15 blur-3xl"
        />
        <motion.div
          animate={{ y: [25, -25, 25], x: [10, -10, 10] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 left-8 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/8 blur-3xl"
        />

        {/* Particle dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary-foreground/25"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -(20 + Math.random() * 30), 0],
              x: [0, (Math.random() - 0.5) * 20, 0],
              opacity: [0, 0.7, 0],
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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm mb-6 border border-primary-foreground/10">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <MapPin className="w-4 h-4" />
              </motion.span>
              Hyderabad & Surrounding Areas
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, type: "spring", stiffness: 80 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6"
          >
            Find Your
            <br />
            <motion.span
              className="text-accent inline-block"
              animate={{
                textShadow: [
                  "0 0 20px hsl(24 85% 58% / 0.3)",
                  "0 0 40px hsl(24 85% 58% / 0.5)",
                  "0 0 20px hsl(24 85% 58% / 0.3)",
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
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg"
          >
            Discover houses, hostels, and PG accommodations across Hyderabad.
            Affordable, safe, and comfortable living for students & professionals.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, type: "spring", stiffness: 80 }}
            className="glass rounded-2xl p-2 shadow-3d max-w-xl border border-primary-foreground/10"
          >
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-background/50">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Search in Hyderabad..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                />
                {isSupported && (
                  <button onClick={toggle} className="shrink-0" aria-label="Voice search">
                    {isListening ? (
                      <Mic className="w-4 h-4 text-destructive animate-pulse" />
                    ) : (
                      <Mic className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                    )}
                  </button>
                )}
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
                <p className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-sm text-primary-foreground/60">{stat.label}</p>
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
