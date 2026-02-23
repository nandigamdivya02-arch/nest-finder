import { motion } from "framer-motion";
import { Shield, Wallet, MapPin, Clock, Headphones, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Properties",
    description: "Every hostel is personally verified for safety, hygiene, and quality standards.",
  },
  {
    icon: Wallet,
    title: "Best Prices",
    description: "Transparent pricing with no hidden charges. Starting from just ₹3,500/month.",
  },
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Properties near IT hubs, colleges, and public transport in Gandimaisamma.",
  },
  {
    icon: Clock,
    title: "Instant Booking",
    description: "Book your room in minutes with instant confirmation and digital receipts.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support for any queries or issues.",
  },
  {
    icon: Star,
    title: "Genuine Reviews",
    description: "Real reviews from actual residents to help you make the right choice.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 lg:py-28 gradient-warm-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral-light text-accent text-sm font-semibold mb-4">
            Why HomeHunt
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Why Choose <span className="gradient-text">Us?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We make finding and booking your ideal accommodation simple, safe, and stress-free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-3d"
            >
              <div className="card-3d-inner bg-card rounded-2xl p-7 border border-border hover-lift">
                <div className="w-14 h-14 rounded-2xl gradient-hero-bg flex items-center justify-center mb-5">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
