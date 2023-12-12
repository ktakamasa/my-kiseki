import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white p-4 text-center flex-shrink-0">
      <div className="mt-auto">
        <p>&copy;{currentYear} My-Kiseki </p>
      </div>
    </footer>
  );
}
