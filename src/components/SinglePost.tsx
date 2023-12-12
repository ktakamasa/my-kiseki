"use client";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";

interface PostData {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  userId: string;
}

interface User {
  id: string;
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

  const handleDelete = async (data: PostData) => {
    try {
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

      await response.json();
      router.refresh();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-md max-w-[900px] mx-auto flex">
      <div className="w-1/3 mr-4">
        <Image
          src={data.imageSrc}
          width={400}
          height={300}
          objectFit="cover"
          alt="Miracle post image"
          className="rounded-md"
        />
      </div>
      <div className="w-2/3">
        <h1 className="text-xl font-bold mb-2">{data.title}</h1>
        <p>{data.description}</p>
      </div>

      {data.userId === currentUser?.id && (
        <div>
          <MdEdit
            onClick={() => router.push(`/posts/${data.id}`)}
            className="cursor-pointer text-[1.5rem]"
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
