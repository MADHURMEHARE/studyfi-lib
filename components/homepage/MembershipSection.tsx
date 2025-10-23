"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import { plans } from "@/utils/pricingplans";
import Link from "next/link";

export default function MembershipSection() {
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { offsetTop, offsetHeight } = sectionRef.current;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY;

      const start = offsetTop - viewportHeight * 0.8;
      const end = offsetTop + offsetHeight - viewportHeight * 0.2;

      let progress = 0;
      if (scrollY > start && scrollY < end) {
        progress = (scrollY - start) / (end - start);
      } else if (scrollY >= end) {
        progress = 1;
      }

      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate cards based on index and scroll
  const getCardStyles = (index: number): CSSProperties => {
    const delay = index * 0.15;
    const animationStart = 0.1;
    const animationEnd = 0.8;

    const cardProgress = Math.min(
      1,
      Math.max(0, (scrollProgress - delay) / (animationEnd - animationStart))
    );

    return {
      opacity: cardProgress,
      transform: `translateY(${50 * (1 - cardProgress)}px) translateZ(0)`,
      transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
      willChange: "opacity, transform",
    };
  };

  // Parallax text effect
  const textParallax = scrollProgress * -15;

  return (
    <section
      id="membership"
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-white via-orange-50 to-orange-100 relative overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Text Section */}
          <div
            className="lg:w-1/3 text-center lg:text-left transition-transform duration-500 ease-out"
            style={{
              transform: `translateY(${textParallax}px) translateZ(0)`,
              opacity: Math.min(1, scrollProgress * 1.5),
              willChange: "transform, opacity",
            }}
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Pick a plan that's{" "}
              <span className="relative inline-block">
                right for you
                <span className="absolute left-0 right-0 bottom-0 h-2 bg-orange-400 opacity-70"></span>
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-md lg:mx-0 mx-auto">
              Flexible study plans for every learner. Choose the one that fits your routine and start today.
            </p>
            <div className="mt-12 lg:max-w-sm lg:mx-0 mx-auto">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Methods</h4>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {/* Payment icons can go here */}
              </div>
            </div>
          </div>

          {/* Right Pricing Cards */}
          <div className="lg:w-2/3">
            {/* Toggle Monthly/Yearly */}
            <div className="flex justify-center mb-10">
              <div className="relative p-1 bg-gray-800 rounded-full flex shadow-lg">
                {["Monthly", "Yearly"].map((type, idx) => (
                  <button
                    key={type}
                    onClick={() => setIsYearly(idx === 1)}
                    className={`px-8 py-3 rounded-full text-lg font-semibold transition duration-300 ${
                      (idx === 1 ? isYearly : !isYearly)
                        ? "bg-orange-600 text-white"
                        : "text-gray-300 hover:text-white"
                    } relative`}
                  >
                    {type}
                    {type === "Yearly" && (
                      <span className="absolute -top-3 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                        Save 20%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, idx) => (
                <div
                  key={plan.name}
                  style={getCardStyles(idx)}
                  className={`rounded-3xl p-8 shadow-2xl transition-all duration-300 transform ${
                    plan.isPopular
                      ? "bg-gradient-to-br from-indigo-800 to-purple-900 text-white scale-105 shadow-purple-500/30"
                      : "bg-white text-gray-800 border border-gray-200 hover:-translate-y-2"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full inline-block mb-4">
                      Popular
                    </div>
                  )}

                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className={`${plan.isPopular ? "text-indigo-200" : "text-gray-500"} text-sm mb-6`}>
                    {plan.description}
                  </p>

                  <div className="text-5xl font-bold mb-2">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </div>
                  <p className={`${plan.isPopular ? "text-indigo-200" : "text-gray-600"} text-sm mb-8`}>
                    Per member, per month
                  </p>

                  <ul className="space-y-3 mb-10">
                    {plan.features.map((feature, i) => {
                      const isComing = feature.includes("Coming soon");
                      return (
                        <li key={i} className="flex items-center text-sm">
                          <svg
                            className={`w-4 h-4 mr-2 ${
                              plan.isPopular ? (isComing ? "text-indigo-400" : "text-green-400") : isComing ? "text-gray-400" : "text-orange-500"
                            }`}
                            fill={isComing ? "none" : "currentColor"}
                            stroke={isComing ? "currentColor" : "none"}
                            viewBox="0 0 24 24"
                          >
                            {isComing ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            ) : (
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            )}
                          </svg>
                          {isComing ? (
                            <span className={`${plan.isPopular ? "text-indigo-300" : "text-gray-500"} line-through`}>
                              {feature.replace(" Coming soon", "")}
                            </span>
                          ) : (
                            feature
                          )}
                          {isComing && <span className="ml-1 text-xs text-orange-400">Coming soon</span>}
                        </li>
                      );
                    })}
                  </ul>

                  <Link href={`/register?plan=${plan.name}`}>
                    <button
                      onClick={() => console.log(`Choosing ${plan.name} plan`)}
                      className={`w-full py-3 rounded-xl font-semibold text-base transition duration-300 ${
                        plan.isPopular
                          ? "bg-orange-500 hover:bg-orange-600 text-white"
                          : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {plan.buttonText}
                    </button>
                  </Link>
                  <p className={`${plan.isPopular ? "text-indigo-200" : "text-gray-500"} text-xs mt-3 text-center`}>
                    No credit card required
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
