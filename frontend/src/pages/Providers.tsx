
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProviderCard } from "@/components/ProviderCard";
import { Button } from "@/components/ui/button";
import { mockProviders } from "@/data/providers";
import { motion } from "framer-motion";

const Providers = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(serviceName || "");

  const providers = useMemo(
    () => mockProviders.filter((p) => p.service.toLowerCase() === decoded.toLowerCase()),
    [decoded]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-10 space-y-6 max-w-3xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="font-headline text-2xl font-bold text-foreground">{decoded}</h1>
            <p className="text-sm text-muted-foreground font-body">
              {providers.length} provider{providers.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {providers.length > 0 ? (
          <div className="grid gap-4">
            {providers.map((provider, i) => (
              <ProviderCard key={provider.id} provider={provider} index={i} />
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground font-body text-center py-12"
          >
            No providers found for "{decoded}". Check back soon!
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default Providers;
