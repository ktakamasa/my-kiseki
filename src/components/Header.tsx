"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: string;
}

export default function Navbar({ currentUser }: { currentUser: User | null }) {
  const router = useRouter();
  const navLinks = [
    { route: "/", label: "Home" },
    { route: "/posts", label: "Posts" },
    {
      route: currentUser ? "/" : "/login",
      label: currentUser ? "Sign Out" : "Login",
      onClick: async () => {
        await signOut();
        router.refresh();
      },
    },
    ...(currentUser ? [] : [{ route: "/register", label: "Register" }]),
  ];

  return (
    <header>
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-white text-xl font-semibold cursor-pointer">
              ✨キセキ✨
            </h1>
          </Link>
          {currentUser ? (
            <div className="text-white font-semibold">
              Hi {currentUser.name}
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.route}
                onClick={link.onClick} // Attach the onClick handler
              >
                <Link href={link.route}>
                  <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                    {link.label}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
