"use client";
import Script from "next/script";
import Image from "next/image";
import { blogPosts } from "../../../utils/constent";

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
    <>
      {/* Structured Data for SEO */}
      <Script
        id={`structured-data-${blog.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.description || blog.content.slice(0, 150) + "...",
            image: blog.imageSrc,
            author: {
              "@type": "Person",
              name: blog.author || "StudyFi Student",
            },
            publisher: {
              "@type": "Organization",
              name: "StudyFi Library",
              logo: {
                "@type": "ImageObject",
                url: "https://studyfi-lib.vercel.app/study-fi-logo.svg",
              },
            },
            datePublished: blog.date || "2025-10-22",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://studyfi-lib.vercel.app/blog/${blog.slug}`,
            },
          },
          null,
          2
        )}
      </Script>

      {/* Blog Content */}
      <div className="flex justify-center mt-20 px-4">
        <article className="max-w-xl w-full p-6 bg-white shadow-lg rounded-xl">
          <Image
            src={blog.imageSrc}
            alt={blog.imageAlt}
            width={500}
            height={500}
            className="rounded-lg mx-auto mb-6"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {blog.title}
          </h1>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {blog.content}
          </p>
        </article>
      </div>
    </>
  );
}
