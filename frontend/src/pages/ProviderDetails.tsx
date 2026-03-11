import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Star, ShieldCheck, Clock, Calendar, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { mockProviders } from "@/data/providers";

interface RatingDistribution {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

const totalRatings = (r: RatingDistribution) => r.five + r.four + r.three + r.two + r.one;
const avgRating = (r: RatingDistribution) => {
  const total = totalRatings(r);
  if (total === 0) return 0;
  return (r.five * 5 + r.four * 4 + r.three * 3 + r.two * 2 + r.one * 1) / total;
};

const mockReviews = [
  { id: "r1", user: "Anita M.", rating: 5, comment: "Excellent work! Very professional and on time. Would definitely recommend.", date: "2026-03-01" },
  { id: "r2", user: "Suresh K.", rating: 4, comment: "Good service overall. Pricing was fair and transparent.", date: "2026-02-20" },
  { id: "r3", user: "Priya S.", rating: 5, comment: "Very skilled and courteous. Fixed the issue quickly.", date: "2026-02-15" },
];

const ProviderDetails = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const provider = mockProviders.find((p) => p.id === providerId);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-muted-foreground" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-foreground">Provider not found</h1>
          <Button variant="outline" onClick={() => navigate(-1)} className="font-headline gap-2">
            <ArrowLeft className="h-4 w-4" /> Go Back
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
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="ghost" onClick={() => navigate(-1)} className="font-headline gap-2 -ml-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </motion.div>

        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-card space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="font-headline text-xl font-bold text-primary">
                    {provider.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-headline text-2xl font-bold text-foreground">{provider.name}</h1>
                    {provider.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-headline font-semibold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-headline font-medium text-primary">{provider.service}</p>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <div className="font-headline text-4xl font-bold text-foreground tabular-nums">{avg.toFixed(1)}</div>
              <div className="flex items-center gap-0.5 sm:justify-end">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-4 w-4 ${s <= Math.round(avg) ? "text-primary fill-primary" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">{total} reviews</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">{provider.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              {provider.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-primary" />
              {provider.phone}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              Mon–Sat, 9 AM – 6 PM
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button className="font-headline shadow-glow gap-2" onClick={() => navigate(`/booking/${provider.id}`)}>
              <Calendar className="h-4 w-4" /> Book Service
            </Button>
            <Button variant="outline" className="font-headline gap-2">
              <Phone className="h-4 w-4" /> Call Now
            </Button>
          </div>
        </motion.div>

        {/* Rating breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4"
        >
          <h2 className="font-headline text-lg font-semibold text-foreground">Rating Breakdown</h2>
          <div className="space-y-2">
            {[
              { stars: 5, count: provider.ratings.five },
              { stars: 4, count: provider.ratings.four },
              { stars: 3, count: provider.ratings.three },
              { stars: 2, count: provider.ratings.two },
              { stars: 1, count: provider.ratings.one },
            ].map((r) => (
              <div key={r.stars} className="flex items-center gap-3 text-sm">
                <span className="w-4 font-headline text-muted-foreground">{r.stars}</span>
                <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${total > 0 ? (r.count / total) * 100 : 0}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <span className="w-8 text-muted-foreground text-right tabular-nums">{r.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          <h2 className="font-headline text-lg font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Customer Reviews
          </h2>
          <div className="space-y-3">
            {mockReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-card border border-border rounded-xl p-5 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-headline text-sm font-bold text-primary">{review.user.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-headline font-semibold text-sm text-foreground">{review.user}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? "text-primary fill-primary" : "text-muted"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProviderDetails;