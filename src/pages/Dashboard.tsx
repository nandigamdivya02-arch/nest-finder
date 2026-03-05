import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LogOut, User, Building2, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Home className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-xl font-display font-bold text-foreground">HomeHunt</span>
        </Link>
        <Link to="/login">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <LogOut className="w-4 h-4" /> Log Out
          </Button>
        </Link>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back 👋
          </h1>
          <p className="mt-1 text-muted-foreground">Here's an overview of your activity.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Building2, label: "Saved Properties", value: "12", color: "text-primary" },
            { icon: Heart, label: "Wishlist Items", value: "5", color: "text-accent" },
            { icon: User, label: "Profile Views", value: "34", color: "text-primary" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link to="/listings"><Button variant="outline" className="gap-2"><Building2 className="w-4 h-4" /> Browse Listings</Button></Link>
            <Link to="/wishlist"><Button variant="outline" className="gap-2"><Heart className="w-4 h-4" /> My Wishlist</Button></Link>
            <Button variant="outline" className="gap-2"><Settings className="w-4 h-4" /> Settings</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
