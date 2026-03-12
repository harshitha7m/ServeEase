import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { ProviderCard } from "@/components/ProviderCard";
import { mockProviders } from "@/data/providers";
import { motion } from "framer-motion";

const ProvidersList = () => {

  const { serviceName } = useParams();

  const providers = mockProviders.filter(
    (provider) => provider.service === serviceName
  );

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

        {providers.length === 0 ? (
          <p className="text-muted-foreground">
            No providers available for this service.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {providers.map((provider, index) => (
  <ProviderCard
    key={provider.id}
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