import { NextResponse } from "next/server";
import prisma from "@/app/lib/prismadb";
import getCurrentUser from "@/app/utils/getCurrentUser";

// for deleting a post
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  // console.log("DELETE request received for post ID:", params.postId);

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
      console.log("Post not found for deletion");
      return NextResponse.error();
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    // console.log("Post deleted successfully");
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

// For handling likes
export async function PUT_Like(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const currentUser = await getCurrentUser();
  const { postId } = params;

  if (!currentUser || !postId || typeof postId !== "string") {
    console.error("Invalid request parameters");
    return NextResponse.error();
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      console.error("Post not found");
      return NextResponse.error();
    }

    // Check if the current user has already liked the post
    const isLiked = post.likedIds.includes(currentUser.id);

    // Toggle liked status based on the current state
    const updatedLikedIds = isLiked
      ? post.likedIds.filter((id) => id !== currentUser.id)
      : [...post.likedIds, currentUser.id];

    // Update likedIds field only
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: updatedLikedIds,
      },
    });

    console.log("LikedIds updated successfully:", updatedPost.likedIds);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating likes:", error);
    return NextResponse.error();
  }
}
