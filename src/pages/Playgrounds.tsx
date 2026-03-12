import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Trophy, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlaygroundCard from "@/components/playground/PlaygroundCard";
import { usePlaygrounds } from "@/hooks/use-playgrounds";

const SPORT_TYPES = ["Cricket", "Football", "Badminton", "Tennis", "Basketball"];

export default function Playgrounds() {
  const { data: playgrounds = [], isLoading } = usePlaygrounds();
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"rating" | "price_low" | "price_high">("rating");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...playgrounds];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)
      );
    }
    if (sportFilter) list = list.filter((p) => p.sport_types.includes(sportFilter));
    if (maxPrice) list = list.filter((p) => p.price_per_hour <= maxPrice);
    if (sortBy === "price_low") list.sort((a, b) => a.price_per_hour - b.price_per_hour);
    else if (sortBy === "price_high") list.sort((a, b) => b.price_per_hour - a.price_per_hour);
    else list.sort((a, b) => Number(b.rating) - Number(a.rating));
    return list;
  }, [playgrounds, search, sportFilter, maxPrice, sortBy]);

  const clearFilters = () => {
    setSportFilter(null);
    setMaxPrice(null);
    setSortBy("rating");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-teal-dark/90" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-primary-foreground/30 animate-pulse" />
          <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full border-2 border-primary-foreground/20 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-8 h-8 text-gold" />
              <h1 className="text-3xl lg:text-5xl font-display font-bold text-primary-foreground">
                Book Playgrounds
              </h1>
            </div>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
              Find and book nearby sports grounds for cricket, football, badminton & more
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <div className="glass rounded-2xl p-4 shadow-lg flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-input bg-background hover:bg-secondary text-sm font-medium transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {(sportFilter || maxPrice) && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="glass rounded-2xl p-5 mt-3 shadow-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Filters</h3>
              <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1">
                <X className="w-3 h-3" /> Clear all
              </button>
            </div>

            {/* Sport Type */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Sport Type</label>
              <div className="flex flex-wrap gap-2">
                {SPORT_TYPES.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSportFilter(sportFilter === sport ? null : sport)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      sportFilter === sport
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Max Price / hr</label>
              <div className="flex gap-2">
                {[500, 1000, 1500, 2000].map((price) => (
                  <button
                    key={price}
                    onClick={() => setMaxPrice(maxPrice === price ? null : price)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      maxPrice === price
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    ≤ ₹{price}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Sort By</label>
              <div className="flex gap-2">
                {[
                  { key: "rating", label: "Top Rated" },
                  { key: "price_low", label: "Price: Low" },
                  { key: "price_high", label: "Price: High" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                      sortBy === s.key
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <p className="text-sm text-muted-foreground mb-6">
          {filtered.length} playground{filtered.length !== 1 ? "s" : ""} found
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pg, i) => (
              <PlaygroundCard key={pg.id} playground={pg} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-display font-bold text-lg mb-1">No playgrounds found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
