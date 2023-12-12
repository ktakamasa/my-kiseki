import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json();

  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists." },
        { status: 409 }
      );
    }
  } catch (err) {
    console.error("Error checking email:", err);
    return NextResponse.error();
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.error();
  }
}
