import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 98765 43210",
    sub: "Mon-Sat, 9AM-8PM",
    action: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@homehunt.in",
    sub: "We reply within 24 hours",
    action: "mailto:hello@homehunt.in",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "+91 98765 43210",
    sub: "Instant replies",
    action: "https://wa.me/919876543210",
  },
  {
    icon: Clock,
    title: "Working Hours",
    detail: "Mon - Sat",
    sub: "9:00 AM - 8:00 PM",
    action: null,
  },
];

const HelpContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="py-20 lg:py-28 gradient-warm-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-light text-primary text-sm font-semibold mb-4">
            <MessageCircle className="w-3.5 h-3.5 inline mr-1" />
            Help & Contact
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Need <span className="gradient-text">Help?</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Reach out to our team for any queries about properties, bookings, or anything else.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
              >
                {method.action ? (
                  <a
                    href={method.action}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow group"
                  >
                    <div className="w-12 h-12 rounded-xl gradient-hero-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <method.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-bold mb-1">{method.title}</h3>
                    <p className="text-sm text-foreground font-medium">{method.detail}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.sub}</p>
                  </a>
                ) : (
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl gradient-accent-bg flex items-center justify-center mb-4">
                      <method.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-display font-bold mb-1">{method.title}</h3>
                    <p className="text-sm text-foreground font-medium">{method.detail}</p>
                    <p className="text-xs text-muted-foreground mt-1">{method.sub}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 border border-border shadow-md space-y-5"
            >
              <h3 className="text-xl font-display font-bold mb-2">Send a Message</h3>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm outline-none focus:ring-2 focus:ring-primary transition-all resize-none placeholder:text-muted-foreground"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-glow"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HelpContact;
