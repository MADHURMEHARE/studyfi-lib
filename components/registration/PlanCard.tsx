import { Calendar } from 'lucide-react';

interface PlanCardProps {
  plan: {
    // id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    features: string[];
    isPopular?: boolean;
  };
  onSelect: () => void;
}

export default function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 relative ${
      plan.isPopular ? 'border-orange-400' : 'border-orange-200'
    }`}>
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Calendar className="w-10 h-10 text-orange-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="text-4xl font-bold text-orange-600 mb-4">₹{plan.price}</div>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        <ul className="text-left text-gray-600 space-y-2 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
        
        <button
          onClick={onSelect}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold"
        >
          Choose {plan.name}
        </button>
      </div>
    </div>
  );
}
