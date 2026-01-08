import Image from "next/image";

export default function Home() {
  return (
    <div className="grid sm:grid-cols-[auto_1fr] min-h-screen max-w-7xl mx-auto">
      <div className="hidden sm:flex flex-col items-center border-r border-gray-200 px-4 py-6 gap-8">Navbar</div>
      
      <div className="flex flex-col gap-20 px-8 py-6 sm:py-10">
        <div>Content</div>
      </div>
    </div>
  );
}
