import { useParams } from "@remix-run/react";

export default function Title() {
  const { title } = useParams();

  return (
    <div className="text-white text-4xl w-full h-screen bg-[#C7C6C6]">
      <h1 className="text-[#05032B] text-center p-3 font-bold text-4xl">
        {title}
      </h1>
    </div>
  );
}
