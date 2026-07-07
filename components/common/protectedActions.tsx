"use client";

import { useAuth } from "../context/authContext";
import { FaLock } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  onLoginRequired: () => void;
}

export default function ProtectedAction({
  children,
  onLoginRequired,
}: Props) {
  const { user } = useAuth();

  if (user) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="pointer-events-none opacity-40 blur-[1px]">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-sm">
        <div className="bg-white shadow-xl rounded-xl p-6 text-center w-72">
          <FaLock
            className="mx-auto text-blue-600 mb-3"
            size={30}
          />
          <h3 className="font-bold text-lg">
            Login Required
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Please login to use filters and search products.
          </p>
          <button
            onClick={onLoginRequired}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}