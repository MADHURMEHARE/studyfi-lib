import { Snowflake, Users, Droplets, MessageSquare, Wifi, Car } from 'lucide-react';
export const features = [
    {
      icon: Snowflake,
      title: "❄️ Air Conditioning",
      description: "Fully air-conditioned environment for comfortable studying in any weather.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Users,
      title: "🪑 Comfortable Seats",
      description: "Ergonomic and comfortable seating for long study sessions.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: Droplets,
      title: "💧 Water Cooler",
      description: "Clean drinking water available 24/7 for all students.",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600"
    },
    {
      icon: MessageSquare,
      title: "🗣️ Discussion Floor",
      description: "Dedicated space for group discussions and collaborative learning.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Wifi,
      title: "📶 WiFi Internet",
      description: "High-speed WiFi connectivity for online research and study materials.",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      icon: Car,
      title: "🚗 Parking Facility",
      description: "Convenient parking space available for students.",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600"
    }
  ];
export const heroFeatures = [
    {
      icon: '📚',
      title: '80 Study Seats',
      description: 'Professional study environment with comfortable seating',
    },
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Reserve your seat in seconds with real-time availability',
    },
    {
      icon: '🎯',
      title: 'Exam Focused',
      description: 'Specialized for MPSC, CA, NEET, JEE & All competitive exams',
    },
  ]; 
  
  export const plans = [
    {
      name: "Half-time Registration",
      price: "₹400",
      description: "Perfect for students who study part-time",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200 hover:border-orange-300",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
      icon: "⏰"
    },
    {
      name: "Full Registration",
      price: "₹700",
      description: "Complete access to all facilities",
      bgColor: "from-orange-100 to-orange-200",
      borderColor: "border-orange-300 hover:border-orange-400",
      buttonColor: "bg-orange-600 hover:bg-orange-700",
      isPopular: true,
      icon: "⭐"
    },
    {
      name: "Non-Reservation Access",
      price: "₹600",
      description: "Flexible access without seat reservation",
      bgColor: "from-orange-50 to-white",
      borderColor: "border-orange-200 hover:border-orange-300",
      buttonColor: "bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50",
      icon: "🔄"
    }
  ];