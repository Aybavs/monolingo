"use client";

import type React from "react";
import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="p-8 rounded-lg shadow-2xl max-w-md w-full text-center space-y-6 animate-fadeIn">
        <div className="text-yellow-500 animate-bounce">
          <FaExclamationTriangle size={64} className="mx-auto" />
        </div>

        <h1 className="text-4xl font-bold mb-2">401 - Access Denied</h1>

        <p className=" mb-8">
          Oops! Looks like you don&apos;t have permission to access this page.
          Please make sure you&apos;re logged in with the correct credentials.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 transform hover:scale-105"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
