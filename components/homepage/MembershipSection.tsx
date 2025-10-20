"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Briefcase, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Placeholder Data Structure (Simulating data) ---
const allPlans = [
    {
        name: "Half Day ",
        price: "400 Rs",
        interval: "/month",
        features: [
            "5 hours usage of our coworking space",
            "Access to common areas",
            "High-speed Wi-Fi",
        ],
        icon: Briefcase,
        isPopular: false,
        buttonColor: "bg-green-700 text-white hover:bg-green-800",
    },
    {
        name: "full time",
        price: "700",
        interval: "/month",
        features: [
            "Unlimited Access",
            "Dedicated Desk",
            "wifi acesss",
            "parking",
            "seat reservation"
        ],
        icon: Zap,
        isPopular: true,
        buttonColor: "bg-green-700 text-white hover:bg-green-800",
    },
    {
        name: "3 month",
        price: "1800",
        interval: "/3month",
        features: [
           "Unlimited Access",
            "Dedicated Desk",
            "wifi acesss",
            "parking",
            "seat reservation",
        ],
        icon: Briefcase,
        isPopular: false,
        buttonColor: "bg-gray-700 text-white hover:bg-gray-800",
    },
];

// ----------------------------------------------------------------------
// --- Sub-Component for Reusable Pricing Card ---
// ----------------------------------------------------------------------
const PricingCard = ({ plan }:any) => {
    const Icon = plan.icon || Briefcase; 
    
    // Conditionally render the popular badge
    const popularBadge = plan.isPopular ? (
        <div className="absolute top-0 right-0 bg--700 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
            POPULAR
        </div>
    ) : null;

    return (
        // Added fade-in animation class (requires CSS keyframes defined globally)
        <div 
            key={plan.name}
            className="bg-white rounded-3xl p-8 shadow-xl flex flex-col transition-all duration-500 ease-in-out transform relative animate-card-fade-in opacity-100" 
        >
            {popularBadge}

            <div className="flex items-center mb-6">
                <Icon className="w-6 h-6 text-gray-700 mr-2" />
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            </div>

            <p className="text-sm font-semibold text-gray-500 uppercase mb-4 tracking-wider">
                What You'll Get
            </p>

            <ul className="space-y-3 mb-8 flex-grow">
                {Array.isArray(plan.features) && plan.features.map((feature:string, i:number) => (
                    <li key={i} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className="mb-8 mt-auto">
                <span className="text-5xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-lg font-medium text-gray-500 ml-1">{plan.interval}</span>
            </div>

            <button
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md transform hover:scale-[1.01] active:scale-95 ${plan.buttonColor}`}
            >
                Choose Plan
            </button>
        </div>
    );
};

// ----------------------------------------------------------------------
// --- Main Section Component ---
// ----------------------------------------------------------------------
export default function SplitPricingSection() {
    // 💡 CARD LIMIT: Set the maximum number of plans to display in the carousel
    const MAX_PLANS_TO_SHOW = 3; 
    const carouselPlans = allPlans.slice(0, MAX_PLANS_TO_SHOW); 

    // STATE: Tracks the currently visible plan index and hover state
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    const promoImagePath = './uploads/pricing.png'; // Using the uploaded image reference
    const totalPlans = carouselPlans.length; 
    const intervalDuration = 4000; // 4 seconds per slide

    // FUNCTION: Logic to advance the slide
    const nextSlide = useCallback(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % totalPlans);
    }, [totalPlans]);

    // useEffect: Handles the automatic sliding and hover-to-pause
    useEffect(() => {
        // Stop the timer if there's only one plan or if the user is hovering
        if (totalPlans <= 1 || isHovered) return;

        const timer = setInterval(nextSlide, intervalDuration);

        // Cleanup: Clear the interval when the component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [nextSlide, isHovered, totalPlans]);

    const handlePrev = () => {
        setActiveIndex(prevIndex => (prevIndex - 1 + totalPlans) % totalPlans);
    };

    const handleNext = () => {
        nextSlide();
    };

    // Get the current plan to display
    const currentPlan = carouselPlans[activeIndex];

    return (
        <section id="split-pricing" className="min-h-[90vh] py-20 bg-gray-100 flex items-center justify-center">
            
            <div className="max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* === LEFT SECTION: Title & Description === */}
                <div className="lg:col-span-1 pt-10 px-4 md:px-0">
                    <h1 className="text-7xl font-extrabold text-gray-900 leading-none mb-4">
                        Pricing
                        <span className="block">Table</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-sm mb-6">
                         Choose your plan.
                    </p>
                    <p className="text-md text-gray-500 mt-8">
                        <span className="font-mono">studyfi-Center</span>
                    </p>
                </div>

                {/* === MIDDLE SECTION: Promotional Card with Image (Static/Featured) === */}
                <div className="lg:col-span-1 min-h-[500px] relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:shadow-3xl">
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={promoImagePath} 
                            alt="Professional woman in a co-working space" 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                    
                    <div className="relative z-10 p-8 pt-12 bg--700/90 h-full flex flex-col justify-start">
                        <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
                            Save More
                            <span className="block text-green-200">With Goodplans.</span>
                        </h2>
                        <p className="text-lg text-white/90 max-w-xs mb-8">
                            Choose a plan and get onboard in minutes.
                        </p>
                        <div className="mt-auto">
                            <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/40 transition duration-300">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* === RIGHT SECTION: Dynamic Pricing CAROUSEL === */}
                <div 
                    className="lg:col-span-1 relative min-h-[500px]"
                    // 🚀 HOVER PAUSE: Pause sliding on mouse enter, resume on mouse leave
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* 1. Current Pricing Card */}
                    {currentPlan && (
                        <div className="absolute inset-0 transition-opacity duration-500">
                            <PricingCard plan={currentPlan} />
                        </div>
                    )}

                    {/* 2. Pagination Controls (Arrows) */}
                    <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between px-2 z-30 pointer-events-none">
                        <button 
                            onClick={handlePrev}
                            className="p-2 bg-gray-900/40 text-white rounded-full hover:bg-gray-900/80 transition duration-200 pointer-events-auto"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button 
                            onClick={handleNext}
                            className="p-2 bg-gray-900/40 text-white rounded-full hover:bg-gray-900/80 transition duration-200 pointer-events-auto"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* 3. Dot Indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-30">
                        {carouselPlans.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === activeIndex ? 'bg-white-700 w-6' : 'bg-gray-400'
                                } pointer-events-auto`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}