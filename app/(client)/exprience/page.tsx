"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  technology: string;
  isActive: boolean;
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await api.get("/api/experience");

      const activeExperiences = res.data.data.filter(
        (item: Experience) => item.isActive
      );

      setExperiences(activeExperiences);
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Heading */}

        <div className="text-center">

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            A summary of my professional journey and the roles I've worked in.
          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-6">

          <div className="absolute bottom-2 left-[9px] top-2 w-px bg-gradient-to-b from-cyan-400 via-slate-700 to-transparent sm:left-[11px]" />

          <div className="space-y-5">

            {experiences.length > 0 ? (

              experiences.map((exp) => (

                <div
                  key={exp.id}
                  className="relative pl-8 sm:pl-10"
                >

                  {/* Dot */}

                  <span
                    className={`absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-slate-950 sm:h-6 sm:w-6 ${
                      exp.isCurrent
                        ? "animate-pulse border-cyan-400"
                        : "border-slate-600"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        exp.isCurrent
                          ? "bg-cyan-400"
                          : "bg-slate-600"
                      }`}
                    />
                  </span>

                  {/* Card */}

                  <div className="rounded-xl border border-slate-700/80 bg-slate-900/60 p-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)]">

                    <div className="flex flex-wrap items-start justify-between gap-2">

                      <div>

                        <h2 className="text-base font-bold text-white">
                          {exp.position}
                        </h2>

                        <p className="text-sm font-medium text-cyan-400">
                          {exp.company}
                        </p>

                        <p className="text-xs text-gray-500">
                          {exp.location}
                        </p>

                      </div>

                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                          exp.isCurrent
                            ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                            : "border-white/10 bg-white/5 text-gray-300"
                        }`}
                      >
                        {formatDate(exp.startDate)} —{" "}
                        {exp.isCurrent
                          ? "Present"
                          : exp.endDate
                          ? formatDate(exp.endDate)
                          : "Present"}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                      {exp.description}
                    </p>

                    {exp.technology && (

                      <div className="mt-3 flex flex-wrap gap-2">

                        {exp.technology
                          .split(",")
                          .map((tech) => (

                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300"
                            >
                              {tech.trim()}
                            </span>

                          ))}

                      </div>

                    )}

                  </div>

                </div>

              ))

            ) : (

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center text-gray-400">
                No experience found.
              </div>

            )}

          </div>

        </div>

      </section>
    </main>
  );
}