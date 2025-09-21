import PlanCard from './PlanCard';

interface PlanSelectionProps {
  onPlanSelect: () => void;
}

export default function PlanSelection({ onPlanSelect }: PlanSelectionProps) {
  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: 400,
      duration: '1 Month',
      description: 'Perfect for short-term preparation and trial',
      features: [
        '1 Month Access',
        'All Amenities',
        'Flexible Timing',
        'Study Materials'
      ]
    },
    {
      id: 'quarterly',
      name: 'Quarterly Plan',
      price: 1000,
      duration: '3 Months',
      description: 'Best value for serious exam preparation',
      features: [
        '3 Months Access',
        'All Amenities',
        'Priority Support',
        'Bonus Study Materials'
      ],
      isPopular: true
    },
    {
      id: 'yearly',
      name: 'Yearly Plan',
      price: 3500,
      duration: '12 Months',
      description: 'Ultimate package for long-term success',
      features: [
        '12 Months Access',
        'All Amenities',
        'Premium Support',
        'Exclusive Materials'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Study Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Select the perfect plan for your competitive exam preparation at STUDFI LIBRARY.
        </p>
      </div>

      {/* Plan Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={onPlanSelect}
          />
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center">
        <p className="text-gray-600">
          All plans include access to our professional study environment with AC, comfortable seating, WiFi, and parking.
        </p>
      </div>
    </div>
  );
}
