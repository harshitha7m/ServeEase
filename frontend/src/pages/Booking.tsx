import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Clock, ArrowLeft, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { mockProviders } from "@/data/providers";
import { toast } from "sonner";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const Booking = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const provider = mockProviders.find((p) => p.id === providerId);

  const handleConfirm = () => {
    if (!date || !timeSlot) {
      toast.error("Please select both a date and time slot.");
      return;
    }
    setConfirmed(true);
    toast.success("Booking confirmed!");
  };

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <CalendarIcon className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-foreground">Provider not found</h1>
          <Button variant="outline" onClick={() => navigate(-1)} className="font-headline gap-2">
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-xl p-10 max-w-md w-full text-center space-y-6 shadow-card"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="h-20 w-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center"
            >
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </motion.div>
            <h2 className="font-headline text-2xl font-bold text-foreground">Booking Confirmed!</h2>
            <div className="space-y-3 text-sm text-muted-foreground font-body bg-muted/50 rounded-lg p-4">
              <p className="font-medium text-foreground text-base">{provider.name}</p>
              <div className="flex items-center justify-center gap-2">
                <CalendarIcon className="h-4 w-4 text-primary" />
                {format(date!, "PPP")} at {timeSlot}
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {provider.location}
              </div>
            </div>
            <div className="flex gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => navigate("/dashboard")} className="font-headline">
                View Dashboard
              </Button>
              <Button onClick={() => navigate("/")} className="font-headline shadow-glow">
                Book Another
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10 max-w-2xl space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="font-headline gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </motion.div>

        {/* Provider Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card border border-border rounded-xl p-6 shadow-card space-y-2"
        >
          <div className="flex items-center gap-2.5">
            <h2 className="font-headline text-xl font-bold text-foreground">{provider.name}</h2>
            {provider.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-headline font-semibold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
          <p className="text-sm font-headline font-medium text-primary">{provider.service}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {provider.location}
          </p>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h3 className="font-headline text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarIcon className="h-4 w-4 text-primary" />
            </div>
            Select Date
          </h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-body h-12 shadow-card",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date()}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </motion.div>

        {/* Time Slot Selection */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 className="font-headline text-lg font-semibold text-foreground flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            Select Time Slot
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {timeSlots.map((slot) => (
              <motion.button
                key={slot}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTimeSlot(slot)}
                className={cn(
                  "font-headline text-sm py-3.5 rounded-lg border transition-all duration-200",
                  timeSlot === slot
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-card text-foreground border-border shadow-card hover:border-primary/50 hover:text-primary"
                )}
              >
                {slot}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Confirm */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="pt-2"
        >
          <Button
            onClick={handleConfirm}
            size="lg"
            className="w-full font-headline h-13 text-base shadow-glow"
            disabled={!date || !timeSlot}
          >
            Confirm Booking
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-3 font-body">
            You can cancel anytime from your dashboard
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Booking;
