import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <section className="py-20 lg:py-28 gradient-warm-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-light text-primary text-sm font-semibold mb-4">
            Location
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Explore <span className="gradient-text">Gandimaisamma</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            All our hostels are located in and around Gandimaisamma, Hyderabad — well-connected to IT hubs, colleges, and transport.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-3d border border-border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15220.123456789!2d78.44!3d17.505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91f9a080eab1%3A0x1234567890abcdef!2sGandimaisamma%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Gandimaisamma Hostels Map"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
