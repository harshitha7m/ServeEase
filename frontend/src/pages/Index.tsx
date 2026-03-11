import { useState, useMemo } from "react";
import { Search, MapPin, Zap, Droplets, Hammer, BookOpen, Paintbrush, Sparkles, Wind, Bug, ArrowRight, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ProviderCard } from "@/components/ProviderCard";
import { mockProviders, serviceCategories } from "@/data/providers";
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
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const Index = () => {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredProviders = useMemo(() => {
    return mockProviders.filter((p) => {
      const matchService =
        !service && !activeCategory
          ? true
          : p.service.toLowerCase().includes(service.toLowerCase()) ||
            p.name.toLowerCase().includes(service.toLowerCase()) ||
            (activeCategory && p.service === activeCategory);
      const matchLocation = !location
        ? true
        : p.location.toLowerCase().includes(location.toLowerCase());
      return matchService && matchLocation;
    });
  }, [service, location, activeCategory]);

  const handleSearch = () => {
    setSearched(true);
    setActiveCategory(null);
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setService("");
    setSearched(true);
  };

  const handleServiceCardClick = (serviceName: string) => {
    navigate(`/providers/${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02]" />
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-0 left-10 h-48 w-48 rounded-full bg-primary/[0.05] blur-3xl" />

        <div className="container relative py-20 md:py-32 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-headline text-sm font-medium">
              <TrendingUp className="h-3.5 w-3.5" />
              Trusted by 10,000+ homeowners
            </div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
              Find Trusted
              <br />
              <span className="text-primary">Local Services</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-body max-w-lg leading-relaxed">
              Search electricians, plumbers, tutors and more — all verified and reviewed by your neighbours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 max-w-2xl"
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Service... (e.g. Plumber, Electrician)"
                value={service}
                onChange={(e) => setService(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-11 font-body h-13 bg-card shadow-card text-base"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-11 font-body h-13 bg-card shadow-card text-base"
              />
            </div>
            <Button
              onClick={handleSearch}
              size="lg"
              className="font-headline h-13 px-10 shadow-glow text-base gap-2"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <div className="border-b border-border" />
      </section>

      {/* Popular Services Grid */}
      {!searched && (
        <section className="container py-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-2 mb-8"
          >
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">
              Popular Services
            </h2>
            <p className="text-muted-foreground font-body">
              Browse our most requested service categories
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          >
            {serviceCategories.map((cat) => {
              const Icon = serviceIcons[cat] || Zap;
              return (
                <motion.button
                  key={cat}
                  variants={itemVariants}
                  onClick={() => handleServiceCardClick(cat)}
                  className="group bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-4 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <span className="font-headline text-sm font-semibold text-foreground">
                    {cat}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-card border border-border rounded-xl p-8 shadow-card"
          >
            {[
              { label: "Service Providers", value: "2,500+" },
              { label: "Happy Customers", value: "10,000+" },
              { label: "Cities Covered", value: "25+" },
              { label: "Avg. Rating", value: "4.7 ★" },
            ].map((stat) => (
              <div key={stat.label} className="text-center space-y-1">
                <div className="font-headline text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* Category Chips + Results */}
      {searched && (
        <section className="container py-10 space-y-6">
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`font-headline text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-glow"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:text-primary shadow-card"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="font-headline text-xl font-semibold text-foreground">
              {filteredProviders.length} provider{filteredProviders.length !== 1 ? "s" : ""} found
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="font-headline"
              onClick={() => {
                setSearched(false);
                setService("");
                setLocation("");
                setActiveCategory(null);
              }}
            >
              Clear Search
            </Button>
          </div>

          {filteredProviders.length > 0 ? (
            <div className="grid gap-4 max-w-3xl">
              {filteredProviders.map((provider, i) => (
                <ProviderCard key={provider.id} provider={provider} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 space-y-3"
            >
              <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-body text-lg">
                No providers found. Try a different search term or location.
              </p>
            </motion.div>
          )}
        </section>
      )}
    </div>
  );
};

export default Index;
