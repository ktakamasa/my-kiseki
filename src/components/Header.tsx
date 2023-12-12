"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  hashedPassword: string | null;
  createdAt: Date | string;
}

interface HeaderProps {
  currentUser: User | null;
}

export default function Header({ currentUser }: HeaderProps) {
  const handleSignOut = async (e: any) => {
    e.preventDefault();
    if (signOut) {
      await signOut();
    }
  };

  return (
    <header>
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center">
          <Link href="/">
            <h1 className="text-white text-xl font-semibold cursor-pointer mb-4 lg:mb-0">
              ✨キセキ✨
            </h1>
          </Link>
          {currentUser ? (
            <div className="text-white font-semibold mb-4 lg:mb-0">
              Hi {currentUser.name ?? "User"}!
            </div>
          ) : (
            <div className="text-white font-semibold"></div>
          )}

          <div className="flex flex-col lg:flex-row lg:justify-center lg:space-x-8">
            {/* Home Link */}
            <div className="mb-4 lg:mb-0">
              <Link href="/">
                <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                  Home
                </div>
              </Link>
            </div>

            {/* Post Link */}
            <div className="mb-4 lg:mb-0">
              <Link href="/posts">
                <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                  Posts
                </div>
              </Link>
            </div>

            {/* Login/Sign Out Link */}
            <div className="mb-4 lg:mb-0">
              {currentUser ? (
                <div onClick={handleSignOut}>
                  <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                    Sign Out
                  </div>
                </div>
              ) : (
                <Link href="/login">
                  <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                    Login
                  </div>
                </Link>
              )}
            </div>

            {/* Register Link (conditionally rendered) */}
            {!currentUser && (
              <div>
                <Link href="/register">
                  <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                    Register
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
