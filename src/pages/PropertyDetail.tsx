import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, ArrowLeft, Users, Zap, Check, IndianRupee } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HostelCard from "@/components/HostelCard";
import { hostels, amenityIcons } from "@/data/hostels";

const PropertyDetail = () => {
  const { id } = useParams();
  const hostel = hostels.find((h) => h.id === id);

  if (!hostel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-2">Property not found</h1>
          <Link to="/listings" className="text-primary hover:underline">Back to listings</Link>
        </div>
      </div>
    );
  }

  const related = hostels.filter((h) => h.id !== hostel.id && h.type === hostel.type).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 lg:pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Back */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to listings
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl overflow-hidden border border-border shadow-3d"
              >
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl gradient-hero-bg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground font-medium">{hostel.name}</p>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">{hostel.name}</h1>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{hostel.address}, {hostel.city} - {hostel.pincode}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gold-light px-3 py-1.5 rounded-lg">
                      <Star className="w-5 h-5 fill-gold text-gold" />
                      <span className="font-display font-bold">{hostel.rating}</span>
                      <span className="text-sm text-muted-foreground">({hostel.reviews})</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
                </div>
              </motion.div>

              {/* Amenities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border"
              >
                <h2 className="text-xl font-display font-bold mb-5">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hostel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Check;
                    return (
                      <div key={amenity} className="flex items-center gap-3 p-3 rounded-xl bg-secondary">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Room Types */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border"
              >
                <h2 className="text-xl font-display font-bold mb-5">Available Room Types</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hostel.roomTypes.map((room) => (
                    <div key={room} className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary transition-colors">
                      <Check className="w-5 h-5 text-primary" />
                      <span className="font-medium text-sm">{room}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl overflow-hidden border border-border"
              >
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${hostel.lng}!3d${hostel.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMwJzE4LjAiTiA3OMKwMjYnMzYuMCJF!5e0!3m2!1sen!2sin`}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`${hostel.name} location`}
                />
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-28 space-y-6"
              >
                <div className="bg-card rounded-2xl p-6 border border-border shadow-3d">
                  <div className="mb-5">
                    <p className="text-sm text-muted-foreground">Starting from</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-display font-bold text-primary">₹{hostel.priceMin.toLocaleString()}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Type</span>
                      <span className="font-medium capitalize">{hostel.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Furnished</span>
                      <span className="font-medium capitalize">{hostel.furnished}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">AC</span>
                      <span className="font-medium">{hostel.ac ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Food</span>
                      <span className="font-medium">{hostel.foodIncluded ? "Included" : "Not included"}</span>
                    </div>
                  </div>

                  <button className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow mb-3">
                    Book Now
                  </button>
                  <button className="w-full py-3.5 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors">
                    Schedule Visit
                  </button>
                </div>

                {/* Owner Card */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h3 className="font-display font-bold mb-3">Owner Details</h3>
                  <p className="text-sm font-medium mb-1">{hostel.ownerName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    {hostel.ownerPhone}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((h, i) => (
                  <HostelCard key={h.id} hostel={h} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <div className="h-16 md:hidden" />
    </div>
  );
};

export default PropertyDetail;
