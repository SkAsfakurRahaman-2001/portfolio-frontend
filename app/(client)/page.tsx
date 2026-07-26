"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface HomeData {
  greeting: string;
  name: string;
  designation: string;
  description: string;
  profileImage: string;
}

export default function HomePage() {
  const [home, setHome] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const res = await api.get("/api/home");
      setHome(res.data.data);
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium text-gray-400">
        Loading...
      </div>
    );
  }

  if (!home) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-medium text-red-500">
        Home data not found.
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto flex min-h-[88vh] max-w-7xl flex-col-reverse items-center justify-center gap-8 px-5 py-6 sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:py-8">

        {/* Left */}
        <div className="max-w-xl text-center lg:text-left">

          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {home.name}
          </h1>

          <h2 className="mt-2 bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
            {home.designation}
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            {home.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">

            <Link
              href="/projects"
              className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-cyan-500 px-6 py-2.5 text-sm font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-500 hover:text-white"
            >
              Contact Me
            </Link>

          </div>

        </div>

        {/* Right */}
        <div className="relative flex justify-center">

          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 opacity-30 blur-3xl"></div>

          <img
            src={home.profileImage || "/images/profile.jpg"}
            alt={home.name}
            className="
              relative
              h-[240px]
              w-[240px]
              rounded-full
              border-[5px]
              border-cyan-400/30
              object-cover
              ring-4
              ring-cyan-500/10
              shadow-[0_20px_60px_rgba(6,182,212,0.30)]
              transition-all
              duration-500
              hover:scale-105
              hover:ring-cyan-500/30

              sm:h-[300px]
              sm:w-[300px]

              md:h-[340px]
              md:w-[340px]

              lg:h-[390px]
              lg:w-[390px]
            "
          />

          <div className="absolute right-5 top-10 h-4 w-4 animate-pulse rounded-full bg-cyan-400"></div>

          <div className="absolute left-5 top-24 h-3 w-3 animate-pulse rounded-full bg-violet-500"></div>

          <div className="absolute bottom-8 right-10 h-5 w-5 animate-pulse rounded-full bg-blue-500"></div>

        </div>

      </section>
    </main>
  );
}