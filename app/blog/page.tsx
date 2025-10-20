// import BlogCard from '../comman/components/BlogsCard';
import BlogCard from '../../components/common/BlogsCard';
import {blogPosts} from '../../utils/blogdata';

export default function BlogPage() {
  return (
    <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <BlogCard
          key={post.id}
          imageSrc={post.imageSrc}
          imageAlt={post.imageAlt}
          title={post.title}
        //  linkHref={`/blog/${post.slug}`}
          description={post.description}
          slug={post.slug}   // 👈 pass slug here
          size="main"
        />
      ))}
    </div>
  );
}
