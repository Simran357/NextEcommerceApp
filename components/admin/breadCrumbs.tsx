"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaHome } from "react-icons/fa";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const paths = pathname
    .split("/")
    .filter(Boolean);

  return (
    <div className="mb-8 flex items-center gap-2 text-sm text-gray-500">
      <Link
        href="/admin/dashboard"
        className="flex items-center gap-2 hover:text-indigo-600"
      >
        <FaHome />
        Dashboard
      </Link>

      {paths.slice(1).map((segment, index) => {
        const href =
          "/" +
          paths
            .slice(0, index + 2)
            .join("/");

        return (
          <div
            key={href}
            className="flex items-center gap-2"
          >
            <FaChevronRight className="text-xs" />

            <Link
              href={href}
              className="capitalize hover:text-indigo-600"
            >
              {segment.replace("-", " ")}
            </Link>
          </div>
        );
      })}
    </div>
  );
}