import { Provider } from "@/components/ProviderCard";

/* ---------------- SERVICE CATEGORIES ---------------- */

export const serviceCategories = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "AC Repair",
  "Pest Control",
  "Appliance Repair",
  "Cleaning",
];

/* ---------------- PROVIDERS ---------------- */

export const mockProviders: Provider[] = [
  {
    _id: "1",
    name: "Rajesh Kumar",
    service: "Plumber",
    location: "Koramangala, Bangalore",
    phone: "+91 98765 43210",
    description:
      "15 years of experience in residential plumbing. Specializes in leak detection, pipe fitting, and bathroom renovations.",
    ratings: { five: 31, four: 12, three: 4, two: 1, one: 0 },
    verified: true,
  },

  {
    _id: "2",
    name: "Amit Sharma",
    service: "Electrician",
    location: "Indiranagar, Bangalore",
    phone: "+91 98765 43211",
    description:
      "Licensed electrician handling wiring, switchboard installation, and electrical safety inspections.",
    ratings: { five: 22, four: 8, three: 3, two: 2, one: 1 },
    verified: true,
  },

  {
    _id: "3",
    name: "Priya Constructions",
    service: "Painter",
    location: "HSR Layout, Bangalore",
    phone: "+91 98765 43212",
    description:
      "Interior and exterior painting services using premium paints with clean finishing.",
    ratings: { five: 18, four: 6, three: 2, two: 0, one: 1 },
    verified: false,
  },

  {
    _id: "4",
    name: "CoolTech Services",
    service: "AC Repair",
    location: "Whitefield, Bangalore",
    phone: "+91 98765 43213",
    description:
      "AC installation, repair and maintenance for all major brands with same-day service.",
    ratings: { five: 45, four: 15, three: 5, two: 3, one: 2 },
    verified: true,
  },

  {
    _id: "5",
    name: "WoodCraft Studio",
    service: "Carpenter",
    location: "Jayanagar, Bangalore",
    phone: "+91 98765 43214",
    description:
      "Custom furniture, modular kitchen installation, and wood repair work.",
    ratings: { five: 28, four: 10, three: 3, two: 1, one: 0 },
    verified: true,
  },

  {
    _id: "6",
    name: "CleanHome Services",
    service: "Cleaning",
    location: "BTM Layout, Bangalore",
    phone: "+91 98765 43215",
    description:
      "Deep cleaning, bathroom cleaning, and home maintenance services.",
    ratings: { five: 15, four: 9, three: 5, two: 2, one: 1 },
    verified: false,
  },

  {
    _id: "7",
    name: "BugFree Pest Control",
    service: "Pest Control",
    location: "Marathahalli, Bangalore",
    phone: "+91 98765 43216",
    description:
      "Safe pest removal services for homes and offices using eco-friendly solutions.",
    ratings: { five: 20, four: 7, three: 2, two: 0, one: 0 },
    verified: true,
  },

  {
    _id: "8",
    name: "ApplianceFix Experts",
    service: "Appliance Repair",
    location: "Electronic City, Bangalore",
    phone: "+91 98765 43217",
    description:
      "Repair services for washing machines, refrigerators, microwaves and other appliances.",
    ratings: { five: 17, four: 6, three: 2, two: 1, one: 0 },
    verified: true,
  },

  {
    _id: "9",
    name: "Spark Electricals",
    service: "Electrician",
    location: "Malleshwaram, Bangalore",
    phone: "+91 98765 43218",
    description:
      "Electrical troubleshooting, wiring installation and lighting setup.",
    ratings: { five: 25, four: 9, three: 2, two: 1, one: 0 },
    verified: true,
  },

  {
    _id: "10",
    name: "PipeFix Plumbing",
    service: "Plumber",
    location: "Yelahanka, Bangalore",
    phone: "+91 98765 43219",
    description:
      "Emergency plumbing services including pipe leaks, tank installation and drain cleaning.",
    ratings: { five: 19, four: 8, three: 3, two: 1, one: 0 },
    verified: true,
  },
];