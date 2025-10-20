"use client";
import { blogPosts } from "../../../utils/blogdata";

interface BlogPageProps {
  params: { slug: string };
}

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  const blog = blogPosts.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-20 px-4">
      <article className="max-w-xl w-full p-6 bg-white shadow-lg rounded-xl">
        <img
          src={blog.imageSrc}
          alt={blog.imageAlt}
          className="w-48 h-48 object-cover rounded-lg mx-auto mb-6" // ✅ smaller image & centered
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          {blog.title}
        </h1>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {blog.content}
        </p>
      </article>
    </div>
  );
}
