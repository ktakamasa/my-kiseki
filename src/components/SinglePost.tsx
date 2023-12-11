"use client";
import Image from "next/image";
interface PostData {
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  userId: string;
}

interface User {
  id: string;
  name: string | null;
  email: string | null;
  hashedPassword: string | null;
  createdAt: Date | string;
}

interface PostProps {
  key: string;
  data: PostData;
  currentUser?: User | null;
}

export default function SinglePost({ key, data, currentUser }: PostProps) {
  return (
    <div>
      <div>
        <div>
          <Image
            src={data.imageSrc}
            width={400}
            height={300}
            alt="Miracle post image"
          />
          <div>
            <h1>{data.title}</h1>
          </div>
          <div>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
