import { motion } from "framer-motion";
import { Phone, MapPin, Star, ShieldCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/* ---------------- TYPES ---------------- */

interface RatingDistribution {
  five?: number;
  four?: number;
  three?: number;
  two?: number;
  one?: number;
}

export interface Provider {
  id: string;
  name: string;
  service: string;
  location: string;
  phone: string;
  description: string;
  ratings?: RatingDistribution;
  verified: boolean;
}

interface ProviderCardProps {
  provider: Provider;
  index: number;
}

/* ---------------- RATING UTILS ---------------- */

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
      (r?.one || 0) * 1) / total
  );
};

/* ---------------- RATING BAR ---------------- */

const RatingBar = ({
  count,
  total,
  stars,
}: {
  count: number;
  total: number;
  stars: number;
}) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-3 font-headline text-muted-foreground">{stars}</span>

    <Star className="h-3 w-3 text-primary fill-primary" />

    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="h-full rounded-full bg-primary"
      />
    </div>

    <span className="w-5 text-muted-foreground text-right tabular-nums">
      {count}
    </span>
  </div>
);

/* ---------------- COMPONENT ---------------- */

export function ProviderCard({ provider, index }: ProviderCardProps) {
  const total = totalRatings(provider.ratings);
  const avg = avgRating(provider.ratings);

  const navigate = useNavigate();

  const ratings = provider.ratings || {
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="bg-card border border-border rounded-xl p-6 space-y-5 shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all"
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h3 className="font-headline text-lg font-bold text-card-foreground">
              {provider.name}
            </h3>

            {provider.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-headline font-semibold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-md">
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
          <div className="font-headline text-3xl font-bold tabular-nums">
            {avg.toFixed(1)}
          </div>

          <div className="flex items-center gap-0.5 justify-end">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`h-3 w-3 ${
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

      {/* DESCRIPTION */}

      <p className="text-sm text-muted-foreground leading-relaxed">
        {provider.description}
      </p>

      {/* RATING BREAKDOWN */}

      <div className="space-y-1.5">
        {[
          { stars: 5, count: ratings.five || 0 },
          { stars: 4, count: ratings.four || 0 },
          { stars: 3, count: ratings.three || 0 },
          { stars: 2, count: ratings.two || 0 },
          { stars: 1, count: ratings.one || 0 },
        ].map((r) => (
          <RatingBar
            key={r.stars}
            stars={r.stars}
            count={r.count}
            total={total}
          />
        ))}
      </div>

      {/* FOOTER */}

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{provider.location}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/provider/${provider.id}`)}
          >
            <Eye className="h-3.5 w-3.5" />
            Details
          </Button>

          <Button variant="outline" size="sm">
            <Phone className="h-3.5 w-3.5" />
            Call
          </Button>

          <Button
            size="sm"
            onClick={() => navigate(`/booking/${provider.id}`)}
          >
            Book
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 