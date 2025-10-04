import { ArrowRight } from "lucide-react";

export default function BlogSection() {
  const blogPosts = [
    {
      date: "—",
      title: "Khushali K – Success Story",
      content: `
        Selection: IBPS Clerk, SBI JA, UBI Officer, UIIC Administrative Officer.
        Study Strategy: I prepared mains first and pre later. That gave me confidence during mains.
        Challenges: Self doubt was my biggest enemy. Writing down my thoughts helped me analyze my fears.
        Tips: If quant is not your forte, familiarize yourself with numbers. Learn multiplication tables beyond 12x10, go till 20x20. It works like magic, especially for speed exams.
        About Library: I tried 3–4 libraries before joining StudyFi. StudyFi has the best environment—serious students kept me motivated. Highly recommend!
      `,
      statusColor: "bg-blue-400",
      image: "/uploads/Khushali.png", // ✅ Add student photo
    },
   
  ];

  return (
    <section
      id="blog"
      className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Students <span className="block text-orange-100">Blog</span>
          </h2>
          <p className="text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto font-medium leading-relaxed">
            Welcome to the StudyFi Library blog! Stay updated with the latest
            arrivals, tips for competitive exams, seat reservation updates, and
            essential announcements for students.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-white/15 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 shadow-2xl hover:shadow-3xl"
            >
              {/* Photo Section */}
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                   className="w-40 h-40 object-cover rounded-full shadow-md border-4 border-white"
                />
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-orange-100 text-lg font-semibold">
                    {post.date}
                  </span>
                  <div
                    className={`w-5 h-5 ${post.statusColor} rounded-full shadow-lg animate-pulse`}
                  ></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h3>
                <p className="text-orange-100 leading-relaxed text-lg whitespace-pre-line mb-8">
                  {post.content}
                </p>
                <button className="flex items-center space-x-3 text-white hover:text-orange-200 transition-all duration-300 font-bold text-lg group">
                  <span>Read More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
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
