import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cities = [
  {
    name: "Gandimaisamma",
    properties: 12,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
  },
  {
    name: "Kukatpally",
    properties: 18,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
  },
  {
    name: "Miyapur",
    properties: 15,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
  },
  {
    name: "Madhapur",
    properties: 22,
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop",
  },
  {
    name: "Gachibowli",
    properties: 20,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
  },
  {
    name: "Kondapur",
    properties: 14,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
  },
];

const PopularCities = () => {
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
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light text-foreground text-sm font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5 inline mr-1" />
            Popular Areas
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Explore <span className="gradient-text">Hyderabad</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Browse properties across the most popular neighborhoods in Hyderabad.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {cities.map((city, i) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                to="/listings"
                className="group relative block rounded-2xl overflow-hidden aspect-[4/3] hover-lift"
              >
                <img
                  src={city.image}
                  alt={`Properties in ${city.name}, Hyderabad`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <h3 className="text-lg lg:text-xl font-display font-bold text-primary-foreground">
                    {city.name}
                  </h3>
                  <p className="text-sm text-primary-foreground/70">
                    {city.properties} properties
                  </p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-4 h-4 text-primary-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
