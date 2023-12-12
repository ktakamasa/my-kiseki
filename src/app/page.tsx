/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center mt-2 lg:mt-8 px-4">
      <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-center">
        ✨Welcome to My Kiseki✨
      </h1>
      <p className="text-gray-600 text-center mb-4">
        "Kiseki" (奇跡・キセキ) means "miracles" in Japanese.
      </p>
      <p className="text-center mb-8">
        Share your miracles and special experiences with the world.
      </p>
      <Link
        href="/posts"
        className="bg-tertiary text-black font-bold px-4 py-3 rounded hover:bg-accent transition duration-300"
      >
        Share a Miracle
      </Link>
    </div>
  );
}
