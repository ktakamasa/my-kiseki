import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";

// for deleting a post
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    console.log(postId);
    return NextResponse.error();
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
        userId: currentUser.id,
      },
    });

    if (!post) {
      return NextResponse.error();
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.error();
  }
}

// For updating post
export async function PUT(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const currentUser = await getCurrentUser();
  const postData = await req.json();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { postId } = params;

  if (!postId || typeof postId !== "string") {
    console.log(postId);
    return NextResponse.error();
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.error();
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: postData,
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.error();
  }
}
