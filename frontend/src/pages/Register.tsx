import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, User, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const handleSubmit = async (e:React.FormEvent) => {

    e.preventDefault();

    if(password !== confirmPassword){
      toast.error("Passwords do not match.");
      return;
    }

    if(password.length < 6){
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try{

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          phone,
          password
        }
      )

      toast.success("Account created successfully!")

      navigate("/login")

    }catch(err:any){

      toast.error(
        err.response?.data?.message || "Registration failed"
      )

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

            <Link
              to="/"
              className="font-headline text-3xl font-bold text-background flex items-center gap-2"
            >
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              ServiceHub
            </Link>

            <h2 className="font-headline text-4xl font-bold text-background leading-tight">
              Join our growing
              <br />
              <span className="text-primary">community.</span>
            </h2>

            <p className="font-body text-background/50 text-lg leading-relaxed">
              Create an account to book services, track your orders, and leave reviews for providers.
            </p>

            <div className="space-y-3 pt-4">
              {[
                "✓ Verified & trusted service providers",
                "✓ Easy booking & scheduling",
                "✓ Track all your service history"
              ].map((item) => (
                <p key={item} className="text-background/60 font-body text-sm">
                  {item}
                </p>
              ))}
            </div>

          </motion.div>

        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm space-y-6"
        >

          <div className="space-y-2">

            <Link
              to="/"
              className="font-headline text-xl font-bold text-foreground lg:hidden flex items-center gap-2"
            >
              <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">S</span>
              </div>
              ServiceHub
            </Link>

            <h1 className="font-headline text-2xl font-bold text-foreground">
              Create your account
            </h1>

            <p className="font-body text-muted-foreground">
              Sign up to book services and manage your home.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  className="pl-10 h-12 bg-card shadow-card"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

                <Input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="pl-10 h-12 bg-card shadow-card"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

                <Input
                  type="tel"
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  className="pl-10 h-12 bg-card shadow-card"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

                  <Input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="pl-10 h-12 bg-card shadow-card"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Confirm</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>

                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    className="pl-10 h-12 bg-card shadow-card"
                    required
                  />
                </div>
              </div>

            </div>

            <Button
              type="submit"
              className="w-full h-12 font-headline gap-2 shadow-glow text-base"
            >
              Create Account
              <ArrowRight className="h-4 w-4"/>
            </Button>

          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="font-body text-sm text-primary hover:text-primary/80"
            >
              Already have an account? Sign in
            </Link>
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Register;