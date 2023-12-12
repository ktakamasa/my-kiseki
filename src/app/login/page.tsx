"use client";
import FormInput from "@/components/FormInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, ChangeEvent } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Add state for error

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [e.target.name]: e.target.value });
    setError(null);
  }

  // Handle login
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const callback = await signIn("credentials", {
        ...state,
        redirect: false,
      });

      if (callback?.ok) {
        router.push("/");
      } else {
        setError("Invalid email or password"); // Set error message on failed login
        setState({ ...state, password: "" }); // Clear password field
      }

      router.refresh();
    } catch (error: any) {
      console.error("Sign-in failed:", error.message);
    }
  };

  return (
    <form
      className="text-center max-w-md mx-auto mt-8 px-4"
      onSubmit={handleSubmit}
    >
      {/* Display error message */}
      {error && <div className="text-red-500">{error}</div>}{" "}
      <div className="space-y-4">
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
      </div>
      <div className="my-4 space-y-4">
        <div>
          <button
            type="submit"
            className="bg-tertiary text-black px-4 py-2 rounded hover:bg-accent transition duration-300 w-full"
          >
            Sign in
          </button>
        </div>

        <div className="text-sm text-center">
          Not registered yet?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-500 transition duration-200"
          >
            Register here!
          </Link>
        </div>
      </div>
    </form>
  );
}
