import prisma from "../lib/prismadb";

export default async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const mapPosts = posts.map((post) => ({
      ...post,
    }));
    return mapPosts;
  } catch (err: any) {
    throw new Error(err);
  }
}
