import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto bg-primary text-white p-4 text-center">
      <p>&copy;{currentYear} My-Kiseki </p>
    </footer>
  );
}
