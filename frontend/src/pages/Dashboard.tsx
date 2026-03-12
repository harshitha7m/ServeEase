import { Navbar } from "@/components/Navbar";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

/* ---------------- BOOKINGS TYPE ---------------- */

type BookingStatus = "upcoming" | "completed" | "cancelled";

interface Booking {
  id: string;
  provider: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
}

/* ---------------- SAMPLE DATA ---------------- */

const bookings: Booking[] = [
  {
    id: "1",
    provider: "Rajesh Kumar",
    service: "Plumber",
    date: "2026-03-15",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "2",
    provider: "CoolTech Services",
    service: "AC Repair",
    date: "2026-03-10",
    time: "2:00 PM",
    status: "completed",
  },
  {
    id: "3",
    provider: "WoodCraft Studio",
    service: "Carpenter",
    date: "2026-03-05",
    time: "11:00 AM",
    status: "cancelled",
  },
];

/* ---------------- STATUS CONFIG ---------------- */

const statusConfig = {
  upcoming: {
    label: "Upcoming",
    icon: Clock,
    className: "text-primary bg-primary/10 border-primary/20",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "text-destructive bg-destructive/10 border-destructive/20",
  },
};

/* ---------------- ANIMATIONS ---------------- */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

/* ---------------- COMPONENT ---------------- */

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-12 space-y-10">

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="font-body text-muted-foreground text-lg">
            Manage your bookings and account.
          </p>
        </motion.div>

        {/* STATS */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Total Bookings",
              value: "12",
              icon: Calendar,
              trend: "+3 this month",
            },
            {
              label: "Completed",
              value: "9",
              icon: CheckCircle2,
              trend: "75% completion",
            },
            {
              label: "Avg Rating Given",
              value: "4.6",
              icon: Star,
              trend: "Above average",
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 flex items-start gap-4 shadow-card hover:shadow-card-hover transition"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>

              <div className="space-y-1">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>

                <p className="text-xs text-primary flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.trend}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* BOOKINGS */}

        <div className="space-y-5">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {bookings.map((booking) => {
              const config = statusConfig[booking.status];
              const StatusIcon = config.icon;

              return (
                <motion.div
                  key={booking.id}
                  variants={itemVariants}
                  className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-card hover:shadow-card-hover transition"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-base">{booking.provider}</h3>

                    <p className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">
                        {booking.service}
                      </span>{" "}
                      • {booking.date} at {booking.time}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-lg border ${config.className}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>

                    {booking.status === "upcoming" && (
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
                    )}

                    {booking.status === "completed" && (
                      <Button variant="outline" size="sm">
                        Rate
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;