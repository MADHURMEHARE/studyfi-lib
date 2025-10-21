// /app/api/features/route.ts
import { NextResponse } from 'next/server';
import { features } from '@/utils/DATA';
export async function GET() {
  
  return NextResponse.json(features);
}
