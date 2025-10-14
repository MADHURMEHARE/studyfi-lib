'use client';

import React from 'react';
// import Table from "@/components/timing/Table"
// import BlogsCard from './components/BlogsCard';
// NEW (Corrected path)
import BlogsCard from './components/BlogsCard';
import { blogPosts } from './utils/constent';

export default function Blogpage() {

return(
   
    <> 
     <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {blogPosts.map((post) => (
    <BlogsCard
      key={post.id}
      imageSrc={post.imageSrc ?? ''}
      imageAlt={post.imageAlt ?? ''}
      title={post.title ?? ''}
      description={post.description ?? ''}
      linkHref={post.linkHref ?? '#'}
      linkText={post.linkText}
      size={(post as any).size ?? 'side'}
    />
  ))}
</div>



    </>
    
)
}
