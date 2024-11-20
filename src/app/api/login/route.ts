import { db } from "@/@core/db";
import { comparePasswords, signToken } from "@/@core/lib/auth";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValidPassword = await comparePasswords(password, user.password);

  if (!isValidPassword) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json(
    {
      success: true,
      data: { userId: user.id, email: user.email, role: user.role },
    },
    { status: 200 }
  );

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400, // 1 day
  });

  return response;
}
