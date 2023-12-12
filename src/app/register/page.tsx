"use client";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, ChangeEvent } from "react";

export default function Registration() {
  const router = useRouter();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null); // Add state for error

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
    setError(null);
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.error) {
          setError(data.error); // Set error message if provided by the API
        } else {
          throw new Error(
            `Failed to register: ${response.status} ${response.statusText}`
          );
        }
      } else {
        router.refresh();

        router.push("/login");
      }
    } catch (error: any) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <form className="text-center max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      {/* Display error message */}
      {error && <div className="text-red-500">{error}</div>}{" "}
      <div className="space-y-4">
        <FormInput
          id="name"
          name="name"
          type="text"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="name"
          required={true}
        />
        <FormInput
          id="email"
          name="email"
          type="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          autoComplete="email"
          required={true}
        />
        <FormInput
          id="password"
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="new-password"
          required={true}
        />
        <button
          type="submit"
          className="bg-tertiary text-black px-4 py-2 rounded hover:bg-accent transition duration-300"
        >
          Register
        </button>
      </div>
      <div className="my-4">
        <div className="text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 hover:text-blue-500 transition duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </form>
  );
}
