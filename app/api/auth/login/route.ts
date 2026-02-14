import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const ADMIN = {
  email: "admin@studyfi.com",
  password: "admin123"
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email !== ADMIN.email || password !== ADMIN.password) {
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { email, role: "admin" },
    "MY_SECRET_KEY",
    { expiresIn: "1d" }
  );

  return NextResponse.json({
    success: true,
    token
  });
}
