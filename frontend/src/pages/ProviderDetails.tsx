import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  MessageSquare,
} from "lucide-react";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

/* ---------------- TYPES ---------------- */

interface RatingDistribution {
  five?: number;
  four?: number;
  three?: number;
  two?: number;
  one?: number;
}

interface Provider {
  _id: string;
  name: string;
  service: string;
  location: string;
  phone: string;
  description: string;
  verified: boolean;
  ratings?: RatingDistribution;
}

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

/* ---------------- UTIL FUNCTIONS ---------------- */

const totalRatings = (r?: RatingDistribution) =>
  (r?.five || 0) +
  (r?.four || 0) +
  (r?.three || 0) +
  (r?.two || 0) +
  (r?.one || 0);

const avgRating = (r?: RatingDistribution) => {
  const total = totalRatings(r);
  if (total === 0) return 0;

  return (
    ((r?.five || 0) * 5 +
      (r?.four || 0) * 4 +
      (r?.three || 0) * 3 +
      (r?.two || 0) * 2 +
      (r?.one || 0)) / total
  );
};

/* ---------------- MOCK REVIEWS ---------------- */

const mockReviews: Review[] = [
  {
    id: "1",
    user: "Anita M",
    rating: 5,
    comment: "Excellent service! Very professional.",
    date: "2026-03-01",
  },
  {
    id: "2",
    user: "Suresh K",
    rating: 4,
    comment: "Good service and reasonable price.",
    date: "2026-02-20",
  },
  {
    id: "3",
    user: "Priya S",
    rating: 5,
    comment: "Very skilled and friendly.",
    date: "2026-02-15",
  },
];

/* ---------------- COMPONENT ---------------- */

const ProviderDetails = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState<Provider | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/providers/${providerId}`)
      .then((res) => {
        setProvider(res.data);
      })
      .catch((err) => console.log(err));
  }, [providerId]);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container py-20 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-bold">Provider not found</h1>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const total = totalRatings(provider.ratings);
  const avg = avgRating(provider.ratings);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-10 max-w-3xl space-y-8">

        {/* BACK BUTTON */}

        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </motion.div>

        {/* PROVIDER HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-xl p-6 shadow-card space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">

            {/* LEFT SIDE */}

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {provider.name.charAt(0)}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{provider.name}</h1>

                  {provider.verified && (
                    <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                      <ShieldCheck className="h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-sm text-primary font-medium">
                  {provider.service}
                </p>
              </div>
            </div>

            {/* RATING */}

            <div className="text-right">
              <div className="text-4xl font-bold">{avg.toFixed(1)}</div>

              <div className="flex justify-end">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s <= Math.round(avg)
                        ? "text-primary fill-primary"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                {total} reviews
              </p>
            </div>

          </div>

          <p className="text-muted-foreground">{provider.description}</p>

          {/* INFO */}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">

            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              {provider.location}
            </div>

            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-primary" />
              {provider.phone}
            </div>

            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              Mon–Sat, 9 AM – 6 PM
            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-3 pt-2">

            <Button
              onClick={() => navigate(`/booking/${provider._id}`)}
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book Service
            </Button>

            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              Call Now
            </Button>

          </div>
        </motion.div>

        {/* REVIEWS */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare className="h-5 w-5 text-primary" />
            Customer Reviews
          </h2>

          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="bg-card border rounded-xl p-5 shadow-card space-y-2"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="font-semibold">{review.user}</p>
                  <p className="text-xs text-muted-foreground">
                    {review.date}
                  </p>
                </div>

                <div className="flex">
                  {[1,2,3,4,5].map((s)=>(
                    <Star
                      key={s}
                      className={`h-3 w-3 ${
                        s <= review.rating
                          ? "text-primary fill-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>

              </div>

              <p className="text-sm text-muted-foreground">
                {review.comment}
              </p>

            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default ProviderDetails;