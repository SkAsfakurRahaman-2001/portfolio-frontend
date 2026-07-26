"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface AboutData {
  id: number;
  heading: string;
  subHeading: string;
  name: string;
  descriptionOne: string;
  descriptionTwo: string;
  location: string;
  education: string;
  experience: number;
  languages: string;
  skills: string[] | string;
  profileImage: string;
  resume: string;
  isActive: boolean;
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await api.get("/api/about");
      setAbout(res.data.data);
    } catch (error) {
      console.error("Failed to fetch about data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!about) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg">
        About data not found.
      </div>
    );
  }

  const skills =
    typeof about.skills === "string"
      ? JSON.parse(about.skills || "[]")
      : about.skills || [];

  const imageSrc = about.profileImage || "/images/profilee.jpg";
  const resumeSrc = about.resume || "/resume.pdf";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto max-w-7xl px-5 py-6 lg:py-3">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              About
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
            {about.subHeading}
          </p>
        </div>

        {/* Content */}
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-cyan-500 to-violet-600 opacity-40 blur-xl"></div>

              <img
                src={imageSrc}
                alt={about.name}
                className="relative h-[260px] w-[240px] rounded-2xl border border-white/10 object-cover shadow-xl sm:h-[310px] sm:w-[280px] lg:h-[350px] lg:w-[310px]"
              />
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-3xl font-bold lg:text-4xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                {about.name}
              </span>{" "}
              👋
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-400 md:text-base">
              {about.descriptionOne}
            </p>

            <p className="mt-1 text-sm leading-7 text-gray-400 md:text-base">
              {about.descriptionTwo}
            </p>

            {/* Quick Info */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Location
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {about.location}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Education
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {about.education}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Experience
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {about.experience} Years
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-lg">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Languages
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {about.languages}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-3">
              <h3 className="mb-1 text-xl font-bold">
                Skills
              </h3>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume */}
            <div className="mt-6">
              <Link
                href={resumeSrc}
                target="_blank"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
              >
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}