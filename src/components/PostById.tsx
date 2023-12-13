"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, description: e.target.value });
  };

  const handleSubmit = async function (event: FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        // Use template literals here
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
      setTimeout(() => {
        router.push("/posts");
      }, 1500);
    } catch (error: any) {
      console.error("Post edit failed:", error.message);
    }
  };

  const handleDelete = async (event: FormEvent) => {
    event.preventDefault();
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
      setTimeout(() => {
        router.push("/posts");
      }, 1500);
    }
  };

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-lg rounded-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Title:</h2>
        <p>{title}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Description:</h2>
        <p>{description}</p>
      </div>

      <div className="flex justify-center mb-4 ">
        <Image src={imageSrc} width={400} height={300} alt="Uploaded Image" />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => setIsActive(!isActive)}
        >
          Edit
        </button>

        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {isActive && (
        <form className="mt-4" onSubmit={handleSubmit}>
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

            <textarea
              id="description"
              name="description"
              value={state.description}
              onChange={handleDescriptionChange}
              className="w-full h-40 p-2 border border-gray-300 rounded resize-none"
              placeholder="Description of miracle"
            />
          </div>

          <div className="mt-4">
            <UploadImage
              value={state.imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-tertiary text-black px-4 py-2 rounded hover:bg-accent transition duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
