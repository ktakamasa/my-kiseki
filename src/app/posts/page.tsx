import React from "react";
import getCurrentUser from "../utils/getCurrentUser";
import getPosts from "../utils/getPosts";
import SinglePost from "@/components/SinglePost";
import Link from "next/link";

export default async function Posts() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();

  return (
    <div>
      <div className="m-4">
        <Link
          href={`${currentUser ? "/create" : "/login"}`}
          className="bg-tertiary text-black px-4 py-2 rounded hover:bg-accent transition duration-300"
        >
          Share a Miracle
        </Link>
      </div>

      {posts.map((post) => (
        <SinglePost data={post} key={post.id} currentUser={currentUser} />
      ))}
    </div>
  );
}
