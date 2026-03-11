import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const thandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground" />
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        
        <div className="relative flex items-center justify-center p-16 w-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md space-y-8"
          >
            <Link to="/" className="font-headline text-3xl font-bold text-background flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              ServiceHub
            </Link>
            <h2 className="font-headline text-4xl font-bold text-background leading-tight">
              Find trusted local professionals,{" "}
              <span className="text-primary">fast.</span>
            </h2>
            <p className="font-body text-background/50 text-lg leading-relaxed">
              Join thousands of homeowners who rely on ServiceHub to connect with verified service providers in their area.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: "2,500+", label: "Providers" },
                { value: "10K+", label: "Customers" },
                { value: "4.7★", label: "Avg Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-headline text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-background/40 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-sm space-y-8"
        >
          <div className="space-y-2">
            <Link to="/" className="font-headline text-xl font-bold text-foreground lg:hidden flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">S</span>
              </div>
              ServiceHub
            </Link>
            <h1 className="font-headline text-2xl font-bold text-foreground">
              {isSignup ? "Create your account" : "Welcome back"}
            </h1>
            <p className="font-body text-muted-foreground">
              {isSignup
                ? "Sign up to book services and manage your home."
                : "Sign in to access your dashboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {isSignup && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <Label htmlFor="name" className="font-headline text-sm">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 bg-card shadow-card"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-headline text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-card shadow-card"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-headline text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-card shadow-card"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 font-headline gap-2 shadow-glow text-base">
              {isSignup ? "Create Account" : "Sign In"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-3 text-muted-foreground font-body">or</span>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="font-body text-sm text-primary hover:text-primary/80 transition-colors"
            >
              {isSignup
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;