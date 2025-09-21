export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white via-orange-50 to-orange-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-60 h-60 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-700"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-300"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-gray-800">STUDFI LIBRARY</span>
            <span className="block bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              – Amravati's Best Study Library
            </span>
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-orange-200">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  Welcome to <span className="text-orange-600 font-bold">STUDFI LIBRARY</span>, Amravati's most student-friendly study space. We go beyond just offering seats—we create the perfect environment for learning and growth.
                </p>
                
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  With comfortable seating, air-conditioning, clean drinking water, and secure parking, <span className="text-orange-600 font-bold">STUDFI LIBRARY</span> is designed to give students the peace of mind they need to focus on their goals.
                </p>
                
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                  Whether you're preparing for <span className="text-orange-600 font-bold">MPSC, GATE, UPSC, CA, NEET, JEE</span> or any other competitive exams, college studies, or personal learning, our library provides the best atmosphere to stay productive, disciplined, and motivated.
                </p>
                
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-bold">
                  At <span className="text-orange-600">STUDFI LIBRARY</span>, we're proud to be known as <span className="text-orange-600">Amravati's best library</span> for students who want to succeed.
                </p>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-3 bg-orange-100 px-6 py-4 rounded-xl hover:bg-orange-200 transition-colors">
                  <span className="text-orange-600 text-3xl">🏆</span>
                  <span className="text-orange-700 font-bold text-lg">Best in Amravati</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-orange-100 px-6 py-4 rounded-xl hover:bg-orange-200 transition-colors">
                  <span className="text-orange-600 text-3xl">🎯</span>
                  <span className="text-orange-700 font-bold text-lg">Student-Focused</span>
                </div>
                <div className="flex items-center justify-center space-x-3 bg-orange-100 px-6 py-4 rounded-xl hover:bg-orange-200 transition-colors">
                  <span className="text-orange-600 text-3xl">✨</span>
                  <span className="text-orange-700 font-bold text-lg">Perfect Environment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}