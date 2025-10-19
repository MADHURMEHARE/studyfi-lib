// src/components/BlogCard.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link';

type CardSize = 'main' | 'side';

interface BlogCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  // linkHref is optional; if not provided we build href from slug
  linkHref?: string;
  linkText?: string;
  size?: 'main' | 'side';
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
  // --- Grid Layouts ---
  const containerClasses =
    size === 'main'
      ? 'grid md:grid-cols-[2fr_3fr] rounded-xl overflow-hidden shadow-lg bg-white max-w-6xl mx-auto my-20'
      : 'grid grid-cols-[auto_1fr] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg w-full max-w-md mx-auto my-3';

  // Image wrapper
  const imageWrapperClasses =
    size === 'main'
      ? 'relative w-full aspect-[16/9] md:aspect-auto md:h-full'
      : 'relative w-28 h-28';

  const imageSizes =
    size === 'main'
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw'
      : '112px';

  // Typography
  const titleClasses =
    size === 'main'
      ? 'text-2xl md:text-3xl font-semibold text-gray-900 mb-3'
      : 'text-base font-bold text-gray-800 mb-1 leading-tight';

  const descClasses =
    size === 'main'
      ? 'text-gray-600 text-base leading-relaxed mb-6'
      : 'text-gray-600 text-sm leading-snug mb-2 line-clamp-2';

  const contentPadding = size === 'main' ? 'p-6 md:p-8' : 'p-3';
  const linkClasses =
    size === 'main'
      ? 'text-purple-700 font-semibold hover:text-purple-900'
      : 'text-purple-700 hover:text-purple-900 text-sm font-semibold';

  return (
    <div className={containerClasses}>
      {/* --- Left: Image --- */}
      <div className={imageWrapperClasses}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes={imageSizes}
        />
      </div>

      {/* --- Right: Content --- */}
      <div className={`${contentPadding} flex flex-col justify-between`}>
        <div>
          <h3 className={titleClasses}>{title}</h3>
          <p className={descClasses}>{description}</p>
        </div>

        <Link
          href={linkHref ?? `/blog/${slug}`}
          className={`${linkClasses} flex items-center group transition-colors`}
        >
          {linkText}
          <span className="ml-1 transition-transform group-hover:translate-x-1">
            &gt;
          </span>
        </Link>

      </div>
    </div>
  );
}
