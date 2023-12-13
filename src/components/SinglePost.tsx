"use client";
import Image from "next/image";
import { MdDelete, MdEdit } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcLike } from "react-icons/fc";

interface PostData {
  id: string | null;
  title: string | null;
  description: string | null;
  imageSrc: string;
  createdAt: Date;
  userId: string | null;
  likedIds: string[]; // Array of user IDs who liked the post
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

export default function SinglePost({ data, currentUser }: PostProps) {
  const router = useRouter();

  // Initialize states
  const [isLiked, setIsLiked] = useState(
    currentUser && currentUser.id && data.likedIds.includes(currentUser.id)
  );
  const [likedCount, setLikedCount] = useState(data.likedIds.length);

  const handleLike = async () => {
    if (!currentUser) {
      return;
    }

    try {
      const updatedLikedIds = isLiked
        ? data.likedIds.filter((id) => id !== currentUser.id)
        : [...data.likedIds, currentUser.id];

      const response = await fetch(`/api/posts/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          likedIds: updatedLikedIds,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Error updating likedIds. Status: ${response.status}, ${response.statusText}`
        );
      }

      // Update local state using the callback form of setState
      setLikedCount((prevLikedCount) =>
        isLiked ? prevLikedCount - 1 : prevLikedCount + 1
      );
      setIsLiked((prevIsLiked) => !prevIsLiked);
    } catch (error) {
      console.error("Error updating likedIds:", error);
    }
  };

  const handleDelete = async function () {
    try {
      const response = await fetch(`/api/posts/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Error deleting post. Status: ${response.status}, ${response.statusText}`
        );
      }

      // Refresh the page after successful deletion
      router.refresh();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 rounded-md mx-auto md:mx-8 relative flex flex-col md:flex-row">
      <div className="md:w-1/2 md:mr-4 mb-4 md:mb-0 flex items-center justify-center">
        <Image
          src={data.imageSrc}
          width={400}
          height={300}
          alt="Miracle post image"
          className="rounded-md max-w-full object-cover"
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-2">{data.title}</h1>
          <p className="text-left">{data.description}</p>
        </div>

        <div className="flex justify-between flex-row mt-2">
          {currentUser && (
            <button
              onClick={handleLike}
              className="flex items-center space-x-1 cursor-pointer bg-transparent hover:bg-gray-200 transition"
            >
              <FcLike size="1.5rem" color={isLiked ? "#ed64a6" : "gray"} />
              <span>{likedCount} Likes</span>
            </button>
          )}

          {data.userId === currentUser?.id && (
            <div className="flex justify-end mt-2 md:mt-0 md:ml-auto">
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
      </div>
    </div>
  );
}
