import getCurrentUser from "@/app/utils/getCurrentUser";
import getPostById from "@/app/utils/getPostById";
import PostById from "@/components/PostById";

export default async function page({ params }: { params: { postId: string } }) {
  try {
    if (!params || !params.postId) {
      throw new Error("Post ID is missing");
    }

    const post = await getPostById({ params });
    const currentUser = await getCurrentUser();

    return (
      <div>
        <div>
          <PostById
            title={post?.title}
            description={post?.description}
            imageSrc={post?.imageSrc}
            postId={post?.id}
          />
        </div>
      </div>
    );
  } catch (error: any) {
    return;
  }
}
