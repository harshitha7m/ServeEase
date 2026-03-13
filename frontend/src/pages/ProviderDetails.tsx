import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Star,
  ShieldCheck,
  Clock,
  Calendar,
  MessageSquare,
  PenSquare
} from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { mockProviders } from "@/data/providers";
import api from "../api/axios";
import { toast } from "sonner";

/* ---------------- TYPES ---------------- */

interface RatingDistribution {
  five?: number;
  four?: number;
  three?: number;
  two?: number;
  one?: number;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

/* ---------------- UTILITY FUNCTIONS ---------------- */

// Calculates rating distribution purely from fetched reviews
const calculateRatingDistribution = (reviews: Review[]): RatingDistribution => {
  const dist = { five: 0, four: 0, three: 0, two: 0, one: 0 };
  reviews.forEach((r) => {
    if (r.rating === 5) dist.five++;
    else if (r.rating === 4) dist.four++;
    else if (r.rating === 3) dist.three++;
    else if (r.rating === 2) dist.two++;
    else if (r.rating === 1) dist.one++;
  });
  return dist;
};

const totalRatings = (r: RatingDistribution) =>
  (r?.five || 0) + (r?.four || 0) + (r?.three || 0) + (r?.two || 0) + (r?.one || 0);

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

/* ---------------- COMPONENT ---------------- */

const ProviderDetails = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // We still fetch the provider details from the mock locally if it's there
  const [provider, setProvider] = useState<any>(mockProviders.find((p) => p._id === String(providerId)));

  useEffect(() => {
    // Fetch provider from backend just in case it's a real DB provider instead of a mock
    if (!provider) {
        api.get(`/api/providers/${providerId}`)
        .then(res => setProvider(res.data))
        .catch(err => console.log("Failed to fetch provider details from DB", err));
    }

    // Fetch reviews
    fetchReviews();
  }, [providerId]);

  const fetchReviews = async () => {
    try {
      const res = await api.get(`/api/reviews/provider/${providerId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleReviewSubmit = async () => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("name") || "Anonymous User";

    if (!userId) {
      toast.error("Please login to write a review");
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/api/reviews", {
        providerId,
        userName,
        rating: newRating,
        comment: newComment
      });
      
      toast.success("Review submitted successfully!");
      setNewComment("");
      setNewRating(5);
      setShowReviewForm(false);
      fetchReviews(); // Refresh the list
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  /* ----------- PROVIDER NOT FOUND ----------- */

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container py-20 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center">
            <ShieldCheck className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-bold">
            Provider not found
          </h1>

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

  // If there are real reviews in the DB, use those. Otherwise fallback to the mock ratings for display purposes.
  const activeRatings = reviews.length > 0 ? calculateRatingDistribution(reviews) : (provider.ratings || { five: 0, four: 0, three: 0, two: 0, one: 0 });
  const total = totalRatings(activeRatings);
  const avg = avgRating(activeRatings);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-10 max-w-3xl space-y-8">

        {/* BACK BUTTON */}

        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </motion.div>

        {/* PROVIDER HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-4">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">
                  {provider.name.charAt(0)}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">
                    {provider.name}
                  </h1>

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
              <div className="text-4xl font-bold">
                {avg.toFixed(1)}
              </div>

              <div className="flex justify-end">
                {[1, 2, 3, 4, 5].map((s) => (
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

          <p className="text-muted-foreground">
            {provider.description}
          </p>

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

          {/* ACTION BUTTONS */}

          <div className="flex gap-3 pt-2">
            <Button
              onClick={() =>
                navigate(`/booking/${provider._id}`)
              }
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

        {/* RATING BREAKDOWN */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4"
        >
          <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Rating Breakdown
              </h2>
              <Button onClick={() => setShowReviewForm(!showReviewForm)} variant="outline" size="sm" className="gap-2">
                  <PenSquare className="h-4 w-4"/>
                  Write a Review
              </Button>
          </div>

          {[5, 4, 3, 2, 1].map((stars) => {
            const count =
              stars === 5
                ? activeRatings.five
                : stars === 4
                ? activeRatings.four
                : stars === 3
                ? activeRatings.three
                : stars === 2
                ? activeRatings.two
                : activeRatings.one;

            return (
              <div
                key={stars}
                className="flex items-center gap-3 text-sm"
              >
                <span className="w-4">{stars}</span>

                <Star className="h-3 w-3 text-primary fill-primary" />

                <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${
                        total > 0
                          ? ((count || 0) / total) * 100
                          : 0
                      }%`,
                    }}
                    className="bg-primary h-full"
                  />
                </div>

                <span className="w-8 text-right">
                  {count || 0}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* REVIEW FORM */}
        {showReviewForm && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-card border border-border rounded-xl p-6 shadow-card space-y-4"
            >
                <h3 className="font-semibold text-lg">Leave your review</h3>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Rating</Label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    onClick={() => setNewRating(s)}
                                    className="p-1 hover:bg-muted rounded-full transition-colors"
                                >
                                    <Star className={`h-6 w-6 ${s <= newRating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Comment</Label>
                        <Textarea 
                            placeholder="Share your experience with this provider..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="ghost" onClick={() => setShowReviewForm(false)}>Cancel</Button>
                        <Button onClick={handleReviewSubmit} disabled={submitting}>
                            {submitting ? "Submitting..." : "Submit Review"}
                        </Button>
                    </div>
                </div>
            </motion.div>
        )}

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
            
          {loadingReviews ? (
              <p className="text-muted-foreground">Loading reviews...</p>
          ) : reviews.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center shadow-card">
                  <p className="text-muted-foreground">No reviews yet. Be the first to review this provider!</p>
              </div>
          ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-card border border-border rounded-xl p-5 shadow-card space-y-2"
                >
                  <div className="flex justify-between items-center">

                    <div>
                      <p className="font-semibold">
                        {review.userName}
                      </p>
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

                  <p className="text-sm text-foreground mt-2">
                    {review.comment}
                  </p>
                </div>
              ))
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default ProviderDetails;