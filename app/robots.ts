import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/setup', '/api'],
    },
    sitemap: 'https://student-management.vercel.app/sitemap.xml',
  };
}

