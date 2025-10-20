
 import { plans } from '@/components/homepage/utils/data/DATA';
//  import { Card } from '../common/Card';

export default function MembershipSection() {

  return (
    <section id="membership" className="py-20 bg-gradient-to-br from-white via-orange-50 to-orange-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-40 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-200"></div>
        <div className="absolute bottom-40 right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-800"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">Membership &</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Choose the perfect plan for your study needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 border-2 ${plan.borderColor} transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-3xl ${plan.isPopular ? 'ring-4 ring-orange-300 ring-opacity-50' : ''}`}
            >
              <div className="text-center">
                {plan.isPopular && (
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full text-lg font-bold mb-6 inline-block shadow-lg animate-pulse">
                    ⭐ Most Popular
                  </div>
                )}
                
                <div className="text-6xl mb-4">{plan.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent mb-6">{plan.price}</div>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{plan.description}</p>
                
                <button className={`w-full ${plan.buttonColor} py-4 rounded-2xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1`}>
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}