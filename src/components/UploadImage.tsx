"use client";
import { useState, ChangeEvent, lazy, Suspense } from "react";
import FormInput from "./FormInput";

// Lazy load the Image component
const Image = lazy(() => import("next/image"));

interface UploadImageProps {
  value?: any;
  onChange: (imageSrc: string) => void;
}

export default function UploadImage({ value, onChange }: UploadImageProps) {
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        setImage(file);
        onChange && onChange(dataUrl);
      } catch (error: any) {
        console.error("Error reading file as data URL:", error.message);
      }
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
    <div>
      <FormInput
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        required={false}
      />
      {value && image && (
        // Wrap the lazy-loaded Image in a Suspense component
        <Suspense fallback={<div>Loading...</div>}>
          <LazyImage src={URL.createObjectURL(image)} />
        </Suspense>
      )}
    </div>
  );
}

// Create a separate LazyImage component
const LazyImage = ({ src }: { src: string }) => (
  <Image
    src={src}
    alt="Uploaded Image"
    className="mt-2 max-w-full h-auto"
    width={500}
    height={500}
    loading="lazy"
  />
);
