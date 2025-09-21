import { Snowflake, Users, Droplets, MessageSquare, Wifi, Car } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
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

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-32 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-500"></div>
        <div className="absolute bottom-32 right-32 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">What We</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Everything you need for successful exam preparation and study management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-orange-200 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <Icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}