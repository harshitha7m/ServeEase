import { Navbar } from "@/components/Navbar";
import {
  Zap,
  Droplets,
  Hammer,
  BookOpen,
  Paintbrush,
  Sparkles,
  Wind,
  Bug,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

/* ---------------- TYPES ---------------- */

interface Service {
  _id: string;
  name: string;
  description: string;
}

/* ---------------- ICON MAPPING ---------------- */

const serviceIcons: Record<string, React.ElementType> = {
  Electrician: Zap,
  Plumber: Droplets,
  Carpenter: Hammer,
  Tutor: BookOpen,
  Painter: Paintbrush,
  Cleaning: Sparkles,
  "AC Repair": Wind,
  "Pest Control": Bug,
  "Appliance Repair": Zap,
};

/* ---------------- ANIMATIONS ---------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/* ---------------- COMPONENT ---------------- */

const Services = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="container py-12 space-y-8">

        {/* PAGE TITLE */}

        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-headline">
            Browse Services
          </h1>

          <p className="text-muted-foreground">
            Choose a service and find trusted professionals near you.
          </p>
        </div>

        {/* LOADING */}

        {loading ? (
          <p className="text-muted-foreground">Loading services...</p>
        ) : (

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {services.map((cat) => {

              const Icon = serviceIcons[cat.name] || Zap;

              return (
                <motion.button
                  key={cat._id}
                  variants={itemVariants}
                  onClick={() =>
                    navigate(
                      `/providers/${encodeURIComponent(cat.name)}`
                    )
                  }
                  className="group bg-card border border-border rounded-xl p-6 flex items-start gap-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1 text-left"
                >
                  {/* ICON */}

                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  {/* CONTENT */}

                  <div className="flex-1 space-y-1.5">

                    <h3 className="font-headline text-lg font-semibold text-foreground">
                      {cat.name}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {cat.description}
                    </p>

                    <span className="inline-flex items-center gap-1 text-xs text-primary font-headline font-medium">
                      Browse providers
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>

                  </div>
                </motion.button>
              );
            })}
          </motion.div>

        )}
      </section>
    </div>
  );
};

export default Services;