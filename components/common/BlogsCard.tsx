// src/components/BlogCard.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';

type CardSize = 'main' | 'side';

interface BlogCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkHref?: string;
  linkText?: string;
  size?: CardSize;
  slug: string;
}

export default function BlogCard({
  imageSrc,
  imageAlt,
  title,
  description,
  linkHref,
  linkText = 'Read More',
  slug,
  size = 'side',
}: BlogCardProps) {
  // --- Container Styles ---
  const containerClasses =
    size === 'main'
      ? 'grid md:grid-cols-[2fr_3fr] rounded-2xl overflow-hidden shadow-xl bg-white max-w-6xl mx-auto my-12 hover:shadow-2xl transition-shadow duration-300'
      : 'grid grid-cols-[auto_1fr] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white w-full max-w-md mx-auto my-4';

  // --- Image Styles ---
  const imageWrapperClasses =
    size === 'main'
      ? 'relative w-full aspect-video md:aspect-auto md:h-full'
      : 'relative w-28 h-28';

  const imageSizes =
    size === 'main'
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw'
      : '112px';

  // --- Typography ---
  const titleClasses =
    size === 'main'
      ? 'text-2xl md:text-3xl font-bold text-gray-900 mb-3'
      : 'text-lg font-semibold text-gray-800 mb-1 line-clamp-2';

  const descClasses =
    size === 'main'
      ? 'text-gray-700 text-base md:text-lg leading-relaxed mb-6'
      : 'text-gray-600 text-sm leading-snug line-clamp-3';

  // --- Padding & Link ---
  const contentPadding = size === 'main' ? 'p-6 md:p-8' : 'p-3 md:p-4';
  const linkClasses =
    size === 'main'
      ? 'text-purple-600 font-semibold hover:text-purple-900 inline-flex items-center gap-1 transition-all duration-300'
      : 'text-purple-600 hover:text-purple-900 text-sm font-semibold inline-flex items-center gap-1 transition-all duration-300';

  return (
    <div className={containerClasses}>
      {/* Image */}
      <div className={imageWrapperClasses}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes={imageSizes}
          priority={size === 'main'} // Main card loads faster
        />
      </div>

      {/* Content */}
      <div className={`${contentPadding} flex flex-col justify-between`}>
        <div>
          <h3 className={titleClasses}>{title}</h3>
          <p className={descClasses}>{description}</p>
        </div>

        <Link
          href={linkHref ?? `/blog/${slug}`}
          className={linkClasses}
        >
          {linkText} <span className="transition-transform group-hover:translate-x-1">&gt;</span>
        </Link>
      </div>
    </div>
  );
}
