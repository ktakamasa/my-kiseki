// create page

"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import UploadImage from "@/components/UploadImage";

export default function CreatePost() {
  const router = useRouter();
  const [state, setState] = useState({
    title: "",
    description: "",
    imageSrc: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when input changes
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, description: e.target.value });
    setErrors({ ...errors, description: "" }); // Clear error when input changes
  };

  const handleFileChange = (imageSrc: string) => {
    setState({ ...state, imageSrc });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Validate mandatory fields
    if (!state.title.trim()) {
      setErrors({ ...errors, title: "Title is required" });
      return;
    }

    if (!state.description.trim()) {
      setErrors({ ...errors, description: "Description is required" });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/posts", {
        method: "POST",
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
      console.error("Post upload failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="text-center max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      {errors.title && <p className="text-red-500">{errors.title}</p>}
      {errors.description && (
        <p className="text-red-500">{errors.description}</p>
      )}
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

      <UploadImage onChange={handleFileChange} />

      <div className="my-4">
        <button
          type="submit"
          className="bg-tertiary text-black px-4 py-2 rounded hover:bg-accent transition duration-300"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
