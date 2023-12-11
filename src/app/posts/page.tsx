import React from "react";
import getCurrentUser from "../utils/getCurrentUser";
import getPosts from "../utils/getPosts";
import SinglePost from "@/components/SinglePost";

export default async function Posts() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();

  return posts.map((item) => (
    <SinglePost data={item} key={item.id} currentUser={currentUser} />
  ));
}
