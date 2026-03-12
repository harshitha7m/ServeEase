import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Clock, ArrowLeft, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM","10:00 AM","11:00 AM","1:00 PM",
  "2:00 PM","3:00 PM","4:00 PM","5:00 PM"
];

const Booking = () => {

  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider,setProvider] = useState<any>(null);
  const [date,setDate] = useState<Date>();
  const [timeSlot,setTimeSlot] = useState("");
  const [confirmed,setConfirmed] = useState(false);

  useEffect(()=>{

    axios.get(`http://localhost:5000/api/provider/${providerId}`)
    .then(res=>{
      setProvider(res.data)
    })

  },[providerId])

  const handleConfirm = async () => {

    if(!date || !timeSlot){
      toast.error("Please select date and time")
      return
    }

    const userId = localStorage.getItem("userId")

    await axios.post("http://localhost:5000/api/bookings",{
      providerId,
      userId,
      date,
      timeSlot
    })

    toast.success("Booking confirmed")
    setConfirmed(true)
  }

  if(!provider) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-10 max-w-2xl space-y-8">

        <Button variant="ghost" onClick={()=>navigate(-1)}>
          <ArrowLeft className="h-4 w-4"/> Back
        </Button>

        <div className="bg-card border rounded-xl p-6 space-y-2">
          <h2 className="text-xl font-bold">{provider.name}</h2>
          <p>{provider.service}</p>
          <p className="flex items-center gap-1">
            <MapPin className="h-4 w-4"/>
            {provider.location}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Select Date</h3>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4"/>
                {date ? format(date,"PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d)=>d < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold">Select Time</h3>

          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((slot)=>(
              <button
                key={slot}
                onClick={()=>setTimeSlot(slot)}
                className={`border rounded-lg py-3 ${
                  timeSlot===slot
                    ? "bg-primary text-white"
                    : "bg-card"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={handleConfirm}
          disabled={!date || !timeSlot}
        >
          Confirm Booking
        </Button>

      </div>
    </div>
  );
};

export default Booking;