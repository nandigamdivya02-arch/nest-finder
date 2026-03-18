import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Mic, MicOff } from "lucide-react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import Navbar from "@/components/Navbar";
import HostelCard from "@/components/HostelCard";
import Footer from "@/components/Footer";
import { hostels } from "@/data/hostels";

const Listings = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [acFilter, setAcFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [showFilters, setShowFilters] = useState(false);
  const { isListening, isSupported, toggle } = useSpeechRecognition({
    onResult: (transcript) => setSearch(transcript),
  });

  const filtered = useMemo(() => {
    let result = [...hostels];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(q) ||
          h.area.toLowerCase().includes(q) ||
          h.address.toLowerCase().includes(q) ||
          h.city.toLowerCase().includes(q) ||
          h.pincode.includes(q) ||
          h.description.toLowerCase().includes(q) ||
          h.type.toLowerCase().includes(q)
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((h) => h.type === typeFilter);
    }

    if (acFilter === "ac") result = result.filter((h) => h.ac);
    if (acFilter === "non-ac") result = result.filter((h) => !h.ac);

    if (sortBy === "price-low") result.sort((a, b) => a.priceMin - b.priceMin);
    if (sortBy === "price-high") result.sort((a, b) => b.priceMin - a.priceMin);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, typeFilter, acFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 lg:pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Properties in <span className="gradient-text">Hyderabad</span>
            </h1>
            <p className="text-muted-foreground">{filtered.length} properties found</p>
          </motion.div>

          {/* Search & Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search hostels..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
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

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-sm font-medium hover:bg-secondary transition-colors sm:w-auto"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </motion.div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-3 mb-8 p-5 bg-card rounded-xl border border-border"
            >
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                >
                  <option value="all">All</option>
                  <option value="boys">Boys</option>
                  <option value="girls">Girls</option>
                  <option value="co-ed">Co-ed</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="playground">Playground</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">AC</label>
                <select
                  value={acFilter}
                  onChange={(e) => setAcFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                >
                  <option value="all">All</option>
                  <option value="ac">AC</option>
                  <option value="non-ac">Non-AC</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-sm"
                >
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </motion.div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((hostel, i) => (
              <HostelCard key={hostel.id} hostel={hostel} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl font-display font-bold mb-2">No properties found</p>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default Listings;
