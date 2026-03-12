import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {

  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try{

      if(isSignup){

        await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password
          }
        )

        toast.success("Account created successfully")
        setIsSignup(false)

      }else{

        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password
          }
        )

        localStorage.setItem("userId",res.data.userId)
        localStorage.setItem("name",res.data.name)

        toast.success("Login successful")

        navigate("/")
      }

    }catch(err:any){

      toast.error(err.response?.data?.message || "Something went wrong")

    }

  };

  return (
    <div className="min-h-screen bg-background flex">

      {/* Left panel */}
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
              Join thousands of homeowners who rely on ServeEase to connect with verified service providers in their area.
            </p>

          </motion.div>

        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm space-y-8"
        >

          <div className="space-y-2">

            <Link to="/" className="font-headline text-xl font-bold text-foreground lg:hidden flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">S</span>
              </div>
              ServeEase
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

                  <Label htmlFor="name">Full Name</Label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">

              <Label>Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

            </div>

            <div className="space-y-2">

              <Label>Password</Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                <Input
                  type="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>

            </div>

            <Button type="submit" className="w-full h-12 gap-2">

              {isSignup ? "Create Account" : "Sign In"}

              <ArrowRight className="h-4 w-4"/>

            </Button>

          </form>

          <div className="text-center">

            <button
              onClick={()=>setIsSignup(!isSignup)}
              className="text-primary text-sm"
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