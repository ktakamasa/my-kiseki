"use client";

interface FormInputProps {
  id: string;
  name: string;
  type: any;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  //   big?: boolean,
}

export default function FormInput({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
}: FormInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
    />
  );
}