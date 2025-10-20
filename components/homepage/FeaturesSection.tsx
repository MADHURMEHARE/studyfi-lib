import { Snowflake, Users, Droplets, MessageSquare, Wifi, Car } from 'lucide-react';
import { features} from '@/utils/DATA';

// NOTE: For the *best* animations (like scroll-triggered fade-ins), you would typically use a library like 'framer-motion' (e.g., import { motion } from 'framer-motion';) and wrap the feature cards in <motion.div> elements. 
// The below code enhances the design and uses powerful CSS hover effects.

export default function FeaturesSection() {
  // Map of string icon names to Lucide-React components
  // Assuming the `features` data uses string names for icons (e.g., 'Snowflake', 'Users')
  const iconMap = {
    Snowflake: Snowflake,
    Users: Users,
    Droplets: Droplets,
    MessageSquare: MessageSquare,
    Wifi: Wifi,
    Car: Car,
    // Add all other icons used in your 'features' data here
  };
  
  // A helper function to get the Icon component
  // const getIconComponent = (iconName) => {
  //   // If feature.icon is already a component (as in your original code), this check is not needed.
  //   // If it's a string name, use the map:
  //   // return iconMap[iconName] || MessageSquare; // Default icon
    
  //   // Sticking to your original code structure where `feature.icon` is the component itself:
  //   return iconName;
  // }

  return (
    <section id="features" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Dynamic Background Elements: Softer, larger, and slightly more complex gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Soft, large orb 1 - Top Left */}
        <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-wiggle-slow"></div>
        {/* Soft, large orb 2 - Bottom Right */}
        <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-wiggle-slow delay-1000"></div>
        
        {/* New Utility Class (must be defined in your global CSS or Tailwind config): */}
        {/* @keyframes wiggle-slow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, 30px); } } */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-widest mb-2">
            Core Features
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            <span className="text-gray-900">Elevate Your</span>
            <span className="block bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent transform hover:scale-[1.02] transition duration-500 ease-out">
              Study Game 🚀
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-normal">
            We blend cutting-edge technology with proven study methods to ensure your path to success is seamless, organized, and effective.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Using the component directly as per the original code:
            const Icon = feature.icon; 
            
            return (
              // Enhanced Card Design: Smoother, more pronounced shadow and a border-gradient effect on hover/focus.
              // Note: border-gradient effect requires an extra container or a custom utility.
              // Here, we'll use a strong shadow and a dynamic background color change on hover.
              <div 
                key={index} 
                className="group relative bg-white rounded-xl p-6 md:p-8 shadow-xl transition-all duration-500 ease-in-out border border-gray-200 
                           transform hover:-translate-y-2 hover:shadow-2xl hover:ring-4 hover:ring-orange-200"
              >
                {/* Optional: Add a subtle animated orange 'glow' on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-6 shadow-lg 
                                  transform group-hover:rotate-[15deg] transition-transform duration-500 ease-in-out`}>
                    <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </p>
                  
                  {/* Call-to-action Link on the card */}
                  <div className="mt-4">
                    <a href="#" className="inline-flex items-center text-orange-600 font-semibold text-sm group-hover:text-orange-800 transition duration-300">
                        Learn More 
                        <svg className="ml-1 w-4 h-4 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}