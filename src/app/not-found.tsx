import Link from "next/link";
import { FaSearchMinus } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full  rounded-2xl shadow-xl p-8 text-center space-y-6 animate-fade-in">
        <div className=" animate-float">
          <FaSearchMinus size={80} className="mx-auto" />
        </div>

        <h2 className="text-5xl font-bold ">404</h2>
        <h3 className="text-2xl font-semibold ">Page Not Found</h3>

        <p>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block text-white bg-indigo-600 hover:bg-indigo-700 font-medium px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
