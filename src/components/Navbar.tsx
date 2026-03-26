import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Home, Search, User, Heart, Trophy, ClipboardList, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("profiles").select("full_name, email").eq("id", session.user.id).single()
          .then(({ data }) => setProfile(data));
      } else {
        setProfile(null);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("profiles").select("full_name, email").eq("id", session.user.id).single()
          .then(({ data }) => setProfile(data));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const links = [
    { to: "/", label: "Home", icon: Home },
    { to: "/listings", label: "Properties", icon: Search },
    { to: "/playgrounds", label: "Playgrounds", icon: Trophy },
    { to: "/playgrounds/my-bookings", label: "My Bookings", icon: ClipboardList },
    { to: "/wishlist", label: "Wishlist", icon: Heart },
  ];

  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() ?? "U";
  };

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
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-input bg-background hover:bg-accent transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                        {getInitials()}
                      </div>
                      <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                        {profile?.full_name || user.email?.split("@")[0]}
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-foreground">{profile?.full_name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/playgrounds/my-bookings")} className="cursor-pointer">
                      <ClipboardList className="w-4 h-4 mr-2" />
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/wishlist")} className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium rounded-xl border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
                  >
                    Sign Up
                  </Link>
                </>
              )}
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
                {user && (
                  <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-secondary/50">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      {getInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{profile?.full_name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                )}
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
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors"
                    >
                      <LayoutDashboard className="w-5 h-5 text-primary" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    <button
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary transition-colors w-full text-destructive"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Log Out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 pt-2">
                    <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-medium rounded-xl border border-input bg-background">Log In</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="flex-1 text-center px-4 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground">Sign Up</Link>
                  </div>
                )}
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
            { to: "/playgrounds", label: "Play", icon: Trophy },
            { to: "/playgrounds/my-bookings", label: "Bookings", icon: ClipboardList },
            { to: user ? "/dashboard" : "/login", label: user ? "Profile" : "Login", icon: User },
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
