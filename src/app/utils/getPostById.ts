import prisma from "@/app/lib/prismadb";

export default async function getPostById({
  params,
}: {
  params: { postId: string };
}) {
  try {
    const { postId } = params;

    if (!postId) {
      throw new Error("postId is undefined");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      throw new Error(`No post found with postId: ${postId}`);
    }

    return {
      ...post,
      user: {
        ...post.user,
      },
    };
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while fetching the post"
    );
  }
}