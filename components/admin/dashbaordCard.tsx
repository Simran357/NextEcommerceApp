"use client";

import type { AdminDashboardProps } from "@/interfaces/user";

export default function DashboardCard({
  title,
  value,
  icon,
}: AdminDashboardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">

      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 opacity-60 blur-2xl transition-all duration-500 group-hover:scale-125" />

      <div className="relative flex items-start justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
            {value}
          </h2>

        

        </div>

        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-600 text-4xl text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110">

          {icon}

        </div>

      </div>

      <div className="relative mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

        <span className="text-sm text-slate-500">
          Updated just now
        </span>

        

      </div>

    </div>
  );
}