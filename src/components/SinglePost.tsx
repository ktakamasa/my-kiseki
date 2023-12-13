"use client";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

interface PostData {
  id: string | null;
  title: string | null;
  description: string | null;
  imageSrc: string;
  createdAt: Date;
  userId: string | null;
}

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  hashedPassword: string | null;
  createdAt: Date | string;
}

interface PostProps {
  key: string;
  data: PostData;
  currentUser?: User | null;
}

export default function SinglePost({ key, data, currentUser }: PostProps) {
  const router = useRouter();

  const handleDelete = async function () {
    try {
      // console.log("Deleting post:", data.id);
      const response = await fetch(`/api/posts/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error deleting blog. Status: ${response.status}, ${response.statusText}`
        );
      }
      // console.log("Post deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-md mx-auto flex flex-col md:flex-row">
      <div className="md:w-1/3 md:mr-4 mb-4 md:mb-0 flex items-center justify-center">
        <Image
          src={data.imageSrc}
          width={400}
          height={300}
          alt="Miracle post image"
          className="rounded-md"
        />
      </div>
      <div className="md:w-2/3">
        <h1 className="text-xl font-bold mb-2">{data.title}</h1>
        <p>{data.description}</p>
      </div>

      {data.userId === currentUser?.id && (
        <div className="flex justify-end mt-2 md:mt-0">
          <MdEdit
            onClick={() => router.push(`/posts/${data.id}`)}
            className="cursor-pointer text-[1.5rem] mr-2"
          />
          <MdDelete
            onClick={handleDelete}
            className="cursor-pointer text-[1.5rem]"
          />
        </div>
      )}
    </div>
  );
}
