import { Link, useLocation } from "react-router-dom";
import { Search, LayoutDashboard, LogIn, Menu, X, Layers, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Find Services", icon: Search },
    { path: "/services", label: "All Services", icon: Layers },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-headline text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          ServiceHub
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button variant={isActive(link.path) ? "secondary" : "ghost"} size="sm" className="font-headline gap-1.5">
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/register" className="hidden sm:block">
            <Button variant="outline" size="sm" className="font-headline gap-1.5">
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="default" size="sm" className="font-headline gap-1.5 shadow-glow">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="container py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}>
                  <Button variant={isActive(link.path) ? "secondary" : "ghost"} className="w-full justify-start font-headline gap-2">
                    <link.icon className="h-4 w-4" /> {link.label}
                  </Button>
                </Link>
              ))}
              <Link to="/register" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" className="w-full justify-start font-headline gap-2">
                  <UserPlus className="h-4 w-4" /> Register
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
