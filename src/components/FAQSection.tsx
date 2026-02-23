import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What documents are needed for hostel booking?",
    a: "You'll need a valid government ID (Aadhar Card/PAN Card), a passport-size photo, and your college/office ID. For students, a college admission letter may also be required.",
  },
  {
    q: "Is food included in the rent?",
    a: "Most hostels in our listings include meals (breakfast, lunch, and dinner) in the rent. Check individual property details for specifics. Some offer add-on meal plans.",
  },
  {
    q: "What is the minimum stay duration?",
    a: "Most hostels require a minimum stay of 1 month. Longer commitments (3, 6, or 12 months) often come with discounted rates. Check each property for details.",
  },
  {
    q: "Can I visit the hostel before booking?",
    a: "Absolutely! We encourage visits before booking. Contact us or the property owner directly to schedule a visit at your convenience.",
  },
  {
    q: "What is the cancellation and refund policy?",
    a: "Cancellation policies vary by property. Generally, cancellations made 7+ days before move-in get a full refund. Security deposits are refundable upon checkout after inspection.",
  },
  {
    q: "Are hostels safe for girls/women?",
    a: "Safety is our top priority. Women's hostels feature CCTV surveillance, biometric entry, female wardens, and restricted visiting hours. All properties are verified for safety standards.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral-light text-accent text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Common <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-sm hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
