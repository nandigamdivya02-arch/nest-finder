import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold">StayNest</span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Your trusted platform for finding the perfect hostel and PG accommodation in Gandimaisamma, Hyderabad.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Properties", "About Us", "Contact"].map((link) => (
                <Link key={link} to="/" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Policies</h4>
            <div className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Refund Policy", "Cancellation Policy"].map((link) => (
                <Link key={link} to="/" className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin className="w-4 h-4 shrink-0" />
                Gandimaisamma, Hyderabad - 500043
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone className="w-4 h-4 shrink-0" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail className="w-4 h-4 shrink-0" />
                hello@staynest.in
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm text-primary-foreground/40">
            © 2026 StayNest. All rights reserved. Made with ❤️ in Hyderabad.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
