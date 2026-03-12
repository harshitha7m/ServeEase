import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ProviderCard } from "@/components/ProviderCard";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

const Providers = () => {

  const { serviceName } = useParams();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(serviceName || "");

  const [providers,setProviders] = useState([]);

  useEffect(()=>{

    axios.get(`http://localhost:5000/api/providers/${decoded}`)
    .then(res=>{
      setProviders(res.data)
    })

  },[decoded])

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
            <p className="text-sm text-muted-foreground">
              {providers.length} provider{providers.length !== 1 ? "s" : ""} available
            </p>
          </div>
        </div>

        {providers.length > 0 ? (

          <div className="grid gap-4">
            {providers.map((provider:any, i) => (
              <ProviderCard key={provider._id} provider={provider} index={i} />
            ))}
          </div>

        ) : (

          <motion.p className="text-muted-foreground text-center py-12">
            No providers found.
          </motion.p>

        )}
      </div>
    </div>
  );
};

export default Providers;