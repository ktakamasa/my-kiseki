"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import FormInput from "./FormInput";

interface UploadImageProps {
  onChange: (imageSrc: string) => void;
}

export default function UploadImage({ onChange }: UploadImageProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      setImage(file);
      onChange && onChange(dataUrl);
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="mt-4">
      <FormInput
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required={false}
      />
      {image && (
        <Image
          src={URL.createObjectURL(image)}
          alt="Uploaded Image"
          className="mt-2 max-w-full h-auto"
          width={400}
          height={400}
        />
      )}
    </div>
  );
}
