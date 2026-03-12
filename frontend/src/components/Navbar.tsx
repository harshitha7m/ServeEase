import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  LayoutDashboard,
  LogIn,
  Menu,
  X,
  Layers,
  UserPlus,
  LogOut
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {

  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    navigate("/login");

    window.location.reload();
  };

  const navLinks = [
    { path: "/", label: "Find Services", icon: Search },
    { path: "/services", label: "All Services", icon: Layers },
  ];

  return (
    <header className="sticky top-0 z-50 glass-card">

      <div className="container flex items-center justify-between h-16">

        {/* LOGO */}

        <Link
          to="/"
          className="font-headline text-xl font-bold text-foreground tracking-tight flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          ServeEase
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden md:flex items-center gap-1">

          {navLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive(link.path) ? "secondary" : "ghost"}
                size="sm"
                className="font-headline gap-1.5"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}

          {userId && (
            <Link to="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                size="sm"
                className="font-headline gap-1.5"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
          )}

        </nav>

        {/* AUTH BUTTONS */}

        <div className="flex items-center gap-2">

          {!userId ? (
            <>
              <Link to="/register" className="hidden sm:block">
                <Button variant="outline" size="sm" className="font-headline gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="default"
                  size="sm"
                  className="font-headline gap-1.5 shadow-glow"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              </Link>
            </>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              className="font-headline gap-1.5"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}

          {/* MOBILE MENU BUTTON */}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>

        </div>

      </div>

      {/* MOBILE MENU */}

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
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant={isActive(link.path) ? "secondary" : "ghost"}
                    className="w-full justify-start font-headline gap-2"
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}

              {userId && (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-headline gap-2"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              )}

              {!userId ? (
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start font-headline gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  className="w-full justify-start font-headline gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              )}

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}