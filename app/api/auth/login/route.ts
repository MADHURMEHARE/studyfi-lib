import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === "admin@studyfi.com" && password === "123456") {
    return NextResponse.json({
      success: true,
      token: "dummy-token-123",
      user: { email },
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
