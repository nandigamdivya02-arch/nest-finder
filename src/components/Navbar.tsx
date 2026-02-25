import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Search, CalendarDays, User, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/listings", label: "Properties", icon: Search },
    { to: "/listings", label: "Bookings", icon: CalendarDays },
    { to: "/#help-contact", label: "Help & Contact", icon: MessageCircle },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero-bg flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-display font-bold gradient-text">HomeHunt</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => {
                const isHash = link.to.startsWith("/#");
                const handleClick = (e: React.MouseEvent) => {
                  if (isHash) {
                    e.preventDefault();
                    const id = link.to.replace("/#", "");
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }
                };
                return (
                  <Link
                    key={link.label}
                    to={isHash ? "/" : link.to}
                    onClick={handleClick}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Link
                to="/listings"
                className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
              >
                Find Your Room
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border"
            >
              <div className="px-4 py-4 space-y-2">
                {links.map((link) => {
                  const isHash = link.to.startsWith("/#");
                  const handleClick = (e: React.MouseEvent) => {
                    setIsOpen(false);
                    if (isHash) {
                      e.preventDefault();
                      const id = link.to.replace("/#", "");
                      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
                    }
                  };
                  return (
                    <Link
                      key={link.label}
                      to={isHash ? "/" : link.to}
                      onClick={handleClick}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <link.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
        <div className="flex items-center justify-around py-2">
          {[
            { to: "/", label: "Home", icon: Home },
            { to: "/listings", label: "Search", icon: Search },
            { to: "/listings", label: "Bookings", icon: CalendarDays },
            { to: "/", label: "Profile", icon: User },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                location.pathname === item.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
