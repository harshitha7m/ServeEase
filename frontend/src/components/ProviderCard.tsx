import { motion } from "framer-motion";
import { Phone, MapPin, Star, ShieldCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RatingDistribution {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
}

export interface Provider {
  id: string;
  name: string;
  service: string;
  location: string;
  phone: string;
  description: string;
  ratings: RatingDistribution;
  verified: boolean;
}

interface ProviderCardProps {
  provider: Provider;
  index: number;
}

const totalRatings = (r: RatingDistribution) =>
  r.five + r.four + r.three + r.two + r.one;

const avgRating = (r: RatingDistribution) => {
  const total = totalRatings(r);
  if (total === 0) return 0;
  return (r.five * 5 + r.four * 4 + r.three * 3 + r.two * 2 + r.one * 1) / total;
};

const RatingBar = ({ count, total, stars }: { count: number; total: number; stars: number }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-3 font-headline text-muted-foreground">{stars}</span>
    <Star className="h-3 w-3 text-primary fill-primary" />
    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="h-full rounded-full bg-primary"
      />
    </div>
    <span className="w-5 text-muted-foreground text-right tabular-nums">{count}</span>
  </div>
);

export function ProviderCard({ provider, index }: ProviderCardProps) {
  const total = totalRatings(provider.ratings);
  const avg = avgRating(provider.ratings);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h3 className="font-headline text-lg font-bold text-card-foreground">
              {provider.name}
            </h3>
            {provider.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-headline font-semibold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                <ShieldCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>
          <p className="text-sm font-headline font-medium text-primary">
            {provider.service}
          </p>
        </div>
        <div className="text-right shrink-0 space-y-0.5">
          <div className="font-headline text-3xl font-bold text-card-foreground tabular-nums">
            {avg.toFixed(1)}
          </div>
          <div className="flex items-center gap-0.5 justify-end">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-3 w-3 ${s <= Math.round(avg) ? "text-primary fill-primary" : "text-muted"}`} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{total} reviews</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {provider.description}
      </p>

      <div className="space-y-1.5">
        {[
          { stars: 5, count: provider.ratings.five },
          { stars: 4, count: provider.ratings.four },
          { stars: 3, count: provider.ratings.three },
          { stars: 2, count: provider.ratings.two },
          { stars: 1, count: provider.ratings.one },
        ].map((r) => (
          <RatingBar key={r.stars} stars={r.stars} count={r.count} total={total} />
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{provider.location}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" className="font-headline gap-1.5" onClick={() => navigate(`/provider/${provider.id}`)}>
            <Eye className="h-3.5 w-3.5" />
            Details
          </Button>
          <Button variant="outline" size="sm" className="font-headline gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            Call
          </Button>
          <Button size="sm" className="font-headline shadow-glow" onClick={() => navigate(`/booking/${provider.id}`)}>
            Book
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
