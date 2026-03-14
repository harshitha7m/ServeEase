import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProviderCard } from "@/components/ProviderCard";
import { mockProviders } from "@/data/providers";
import { motion } from "framer-motion";
import type { Provider } from "@/components/ProviderCard";
import api from "../api/axios";

const ProvidersList = () => {

  const { serviceName } = useParams();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      setIsLoading(true);
      try {
        let dbProviders = [];
        if (serviceName) {
          const res = await api.get(`/api/providers/service/${encodeURIComponent(serviceName)}`);
          dbProviders = res.data;
        }

        const filteredMocks = mockProviders.filter(
          (provider) =>
            provider.service.toLowerCase() === serviceName?.toLowerCase()
        );

        const combined = [...dbProviders];
        const dbIds = new Set(dbProviders.map((p: any) => String(p._id)));

        filteredMocks.forEach(mockP => {
          if (!dbIds.has(String(mockP._id))) {
            combined.push(mockP);
          }
        });

        setProviders(combined);
      } catch (err) {
        console.error("Failed to fetch providers:", err);
        setProviders(
          mockProviders.filter(
            (provider) =>
              provider.service.toLowerCase() === serviceName?.toLowerCase()
          )
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviders();
  }, [serviceName]);

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <div className="container py-10 space-y-8">

        {/* PAGE TITLE */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold font-headline">
            {serviceName} Providers
          </h1>

          <p className="text-muted-foreground">
            Browse verified professionals near you
          </p>
        </motion.div>

        {/* PROVIDERS GRID */}

        {isLoading ? (
          <p className="text-muted-foreground animate-pulse">
            Loading providers...
          </p>
        ) : providers.length === 0 ? (
          <p className="text-muted-foreground">
            No providers available for this service.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {providers.map((provider, index) => (
              <ProviderCard
                key={provider._id}
                provider={provider}
                index={index}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default ProvidersList;