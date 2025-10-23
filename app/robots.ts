// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',                // homepage
          '/blog',            // blog listing
          '/blog/*',          // individual blog posts
          '/register', // registration pag
           '/timing',       // timing page
        ],
        disallow: [
          '/dashboard',       // admin/dashboard pages
          '/setup',           // setup or config pages
          '/api',             // API routes
        ],
      },
    ],
    sitemap: 'https://studyfi-lib.vercel.app/sitemap.xml',
  };
}
