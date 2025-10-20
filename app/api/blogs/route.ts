// app/api/blogs/route.ts
import { NextResponse } from "next/server";




const blogPosts = [
  {
    id: 1,
    slug: "khushali",
    imageSrc: "/uploads/khushali.png",
    imageAlt: "Khushali",
    title: "Khushali K (Success Story)",
    description:
      "Read how Khushali conquered all major banking exams with consistency and focus.",
    content: `...content here...`,
  },
  {
    id: 2,
    slug: "gaurav",
    imageSrc: "/uploads/Gaurav.png",
    imageAlt: "Gaurav",
    title: "Gaurav Narnaware — The Journey of Dedication Over Talent",
    description:
      "Gaurav cracked multiple MBA and Banking exams while managing personal challenges.",
    content: `...content here...`,
  },
];

export async function GET(request: Request): Promise<Response> {
  // You can inspect the request if needed (query params, headers)
  // const url = new URL(request.url);
  return NextResponse.json(blogPosts);
}
