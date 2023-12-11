import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return null;
  }

  const body = await req.json();
  const { title, description, imageSrc } = body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        imageSrc,
        userId: currentUser.id,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return;
  }
}
