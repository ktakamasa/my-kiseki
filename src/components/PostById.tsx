"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import UploadImage from "./UploadImage";
import FormInput from "./FormInput";

interface PostProps {
  title?: string;
  description?: string;
  imageSrc?: any;
  postId?: string;
}

export default function PostById({
  title,
  description,
  imageSrc,
  postId,
}: PostProps) {
  const router = useRouter();

  const [state, setState] = useState({
    title: "",
    description: "",
    imageSrc: "",
  });
  const [isActive, setIsActive] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/posts${postId}, state`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to post: ${response.status} ${response.statusText}`
        );
      }

      router.refresh();

      router.push("/posts");
    } catch (error: any) {
      console.error("Post edit failed:", error.message);
    }
  };

  const handleDelete = async (event: FormEvent) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
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
    } finally {
      router.push("/posts");
    }
  };

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <div>
      <div>
        <span>{title}</span>
      </div>
      <div>
        <Image src={imageSrc} width={400} height={300} alt="Uploaded Image" />
      </div>
      <div>
        <button onClick={() => setIsActive(!isActive)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      {isActive && (
        <form onSubmit={handleSubmit}>
          <div>
            <UploadImage
              value={state.imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>

          <div className="space-y-4">
            <FormInput
              id="title"
              name="title"
              type="text"
              value={state.title}
              onChange={handleChange}
              placeholder="Miracle title"
              required={true}
            />
            <FormInput
              id="description"
              name="description"
              type="text"
              value={state.description}
              onChange={handleChange}
              placeholder="Description of miracle"
              required={true}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}
