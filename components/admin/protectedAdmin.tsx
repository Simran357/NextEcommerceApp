"use client";

import { useAuth } from "@/components/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, role, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/login");
      else if (role !== "admin")
        router.push("/products");
    }
  }, [loading, user, role, router]);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
if (!user || role !== "admin") {
  return null;
}

return <>{children}</>;
}