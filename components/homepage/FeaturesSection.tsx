// 'use client';

// import { useEffect, useState } from 'react';
// import * as Icons from 'lucide-react';
// // import { features } from '@/utils/DATA';



// export default function FeaturesSection() {
//   const [features, setFeatures] = useState([]);

//   useEffect(() => {
//     async function loadFeatures() {
//       const res = await fetch('/api/features');
//       const data = await res.json();
//       setFeatures(data);
//     }
//     loadFeatures();
//   }, []);

//   return (
//     <section id="features" className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-5xl font-bold mb-8">What We <span className="text-orange-600">Offer</span></h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => {
//             // const Icon = Icons[feature.icon] || Icons.Sparkles;
//             return (
//               <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:-translate-y-2 hover:scale-105 transition-all">
//                 {/* <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}> */}
//                   {/* <Icon className={`w-10 h-10 ${feature.iconColor}`} /> */}
//                 </div>
//                 <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
//                 <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
