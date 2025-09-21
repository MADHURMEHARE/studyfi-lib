import { ArrowRight } from 'lucide-react';

export default function BlogSection() {
  const blogPosts = [
    {
      date: "25 Sept 2025",
      title: "Reserve Your Library Seat in Seconds",
      content: "Finding a quiet study spot is now easy with STUDFI LIBRARY. No more waiting in line or searching for free seats! Our app shows real-time seat availability. Simply log in, pick your preferred spot, and reserve it in seconds. You'll get instant confirmation, and reminders ensure you never miss your booking. Save time and focus on your studies. Reserve your seat today with STUDFI LIBRARY!",
      statusColor: "bg-blue-400"
    },
    {
      date: "23 Sept 2025",
      title: "Stay on Top of Your Library Fees",
      content: "Late fees can be frustrating. With STUDFI LIBRARY, keeping track of your library dues is simple. The app sends automatic reminders for upcoming payments. You can view fee history, pay online, and avoid any penalties—all from your phone. Manage your fees effortlessly and enjoy stress-free library access. Try STUDFI LIBRARY now!",
      statusColor: "bg-green-400"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            📝 Library
            <span className="block text-orange-100">Blog</span>
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto font-medium leading-relaxed">
            Welcome to the StudyFi Library blog! Stay updated with the latest arrivals, tips for competitive exams, seat reservation updates, and essential announcements for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="bg-white/15 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-orange-100 text-lg font-semibold">{post.date}</span>
                <div className={`w-5 h-5 ${post.statusColor} rounded-full shadow-lg animate-pulse`}></div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h3>
              <p className="text-orange-100 leading-relaxed text-lg mb-8">
                {post.content}
              </p>
              <button className="flex items-center space-x-3 text-white hover:text-orange-200 transition-all duration-300 font-bold text-lg group">
                <span>Read More</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-5 rounded-2xl hover:bg-white/30 transition-all duration-300 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 flex items-center space-x-3 mx-auto">
            <span>View All Posts</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}