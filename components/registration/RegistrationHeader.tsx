export default function RegistrationHeader() {
  return (
    <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Join</span>
            <span className="block bg-gradient-to-r from-orange-100 to-white bg-clip-text text-transparent">
              STUDFI LIBRARY
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed font-medium">
            Choose your perfect study plan and start your journey to success with Amravati's best study library.
          </p>
        </div>
      </div>
    </div>
  );
}
