import { Navbar } from "@/components/Navbar";
import { mockProviders, serviceCategories } from "@/data/providers";
import { Zap, Droplets, Hammer, BookOpen, Paintbrush, Sparkles, Wind, Bug, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02]" />
        <div className="absolute top-10 right-20 h-48 w-48 rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="container relative py-16 md:py-24 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-sm font-medium mb-4">
              <Users className="h-3.5 w-3.5" />
              {serviceCategories.length} Categories
            </div>
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.1]">
              All <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground font-body mt-3 max-w-lg">
              Browse all available service categories and find the right professional for your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="container py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {serviceCategories.map((cat) => {
            const Icon = serviceIcons[cat] || Zap;
            const providerCount = mockProviders.filter((p) => p.service === cat).length;
            return (
              <motion.button
                key={cat}
                variants={itemVariants}
                onClick={() => navigate(`/providers/${encodeURIComponent(cat)}`)}
                className="group bg-card border border-border rounded-xl p-6 flex items-start gap-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1 text-left"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <h3 className="font-headline text-lg font-semibold text-foreground">{cat}</h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {providerCount} provider{providerCount !== 1 ? "s" : ""} available
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-headline font-medium group-hover:gap-2 transition-all">
                    Browse providers <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
};

export default Services;