import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      
      <h1 className="text-8xl font-bold text-red-500">404</h1>
      
      <h2 className="text-3xl font-bold mt-4 text-gray-800">
        Page Not Found
      </h2>

      <p className="text-gray-500 font-semibold mt-2 max-w-md">
        Oops! The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        href="/"
        className="mt-6 bg-[#244D3F] text-white px-5 py-2 rounded-md shadow-md hover:bg-green-800 transition"
      >
        Go Home
      </Link>

    </div>
  );
}