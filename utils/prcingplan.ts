// Example of what your 'plans' array (if used) might look like:
import { CheckCircle, Briefcase, Zap } from 'lucide-react';
export const plan = [
  {
    name: "Day Pass",
    price: "$20",
    interval: "/day",
    features: [
      "8 hours usage of our coworking space",
      "Access to All our rooms",
      "High-speed Wi-Fi and power outlets",
          ],
    icon: Briefcase,
    isFeatured: true, // Mark the one for the initial slot
    buttonColor: "bg-green-700 hover:bg-green-800",
  },
  {
    name: "Monthly",
    price: "700",
    interval: "/month",
    features: [
      "24/7 Unlimited Access",
      "Dedicated Desk",
      "10 hours Meeting Room Credit",
      "Secure Locker Storage",
    ],
    icon: Briefcase,
    isPopular: true, // Mark the popular one, if any
    buttonColor: "bg-green-700 hover:bg-green-800",
  },
  {
    name: "Annual",
    price: "$1999",
    interval: "/year",
    features: [
      "All Monthly Plan features",
      "15 hours Meeting Room Credit",
      "Priority Support",
      "Mail Handling Service",
    ],
    icon: Zap,
    buttonColor: "bg-gray-700 hover:bg-gray-800 text-white",
  },
];