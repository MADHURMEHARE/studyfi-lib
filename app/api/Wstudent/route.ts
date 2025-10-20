
import { NextRequest, NextResponse } from "next/server";
import { student } from "@/utils/Student";



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";

  let filtered = student;

  if (category) {
    filtered = filtered.filter(s => s.category.toLowerCase() === category);
  }

  if (query) {
    filtered = filtered.filter(
      s =>
        s.name.toLowerCase().includes(query) ||
        s.exam.toLowerCase().includes(query) ||
        s.background.toLowerCase().includes(query)
    );
  }

  return NextResponse.json(filtered);
}
