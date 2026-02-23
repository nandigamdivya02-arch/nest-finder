import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Software Engineer",
    text: "Found an amazing PG in Gandimaisamma through StayNest. The room is spacious, food is great, and it's close to my office. Highly recommended!",
    rating: 5,
    hostel: "Sri Sai Ram Luxury PG",
  },
  {
    name: "Priya Sharma",
    role: "Student, JNTU",
    text: "As a girl moving to Hyderabad for studies, safety was my priority. SLS Grand PG has CCTV, biometric entry, and the staff is very caring. Love it!",
    rating: 5,
    hostel: "SLS Grand PG for Women",
  },
  {
    name: "Anil Reddy",
    role: "Working Professional",
    text: "Budget-friendly and clean hostel with WiFi and power backup. The food reminds me of home. Perfect for bachelors new to the city.",
    rating: 4,
    hostel: "Praneetha Mens Hostel",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light text-gold text-sm font-semibold mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            What Our <span className="gradient-text">Residents Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-2xl p-7 border border-border hover-lift relative"
            >
              <Quote className="w-10 h-10 text-primary/10 absolute top-6 right-6" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <p className="font-display font-bold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
                <p className="text-xs text-primary font-medium mt-1">{t.hostel}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
