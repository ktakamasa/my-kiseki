import React from "react";
import Link from "next/link";

export default function Header() {
  const navLinks = [
    { route: "/", label: "Home" },
    { route: "/posts", label: "Posts" },
    { route: "/about", label: "About" },
    { route: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-white text-xl font-semibold cursor-pointer">
            ✨キセキ✨
          </div>
        </Link>

        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <Link key={link.route} href={link.route}>
              <div className="text-white hover:text-tertiary transition duration-300 cursor-pointer">
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
