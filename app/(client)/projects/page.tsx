"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
  githubUrl: string;
  liveUrl: string;
  projectImage: string;
  isActive: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/api/projects");

      const activeProjects = res.data.data.filter(
        (project: Project) => project.isActive
      );

      setProjects(activeProjects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* Heading */}

        <div className="text-center">

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-3xl text-base leading-6 text-gray-400 sm:text-lg">
            Here are some of the projects I've built using modern web technologies.
          </p>

        </div>

        {/* Project Grid */}

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">

          {projects.length > 0 ? (

            projects.map((project) => {

              const imageUrl =
                project.projectImage || "/images/project-placeholder.png";

              return (

                <div
                  key={project.id}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
                >

                  {/* Image */}

                  <div className="overflow-hidden">

                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="h-32 w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                  </div>

                  {/* Content */}

                  <div className="p-3.5">

                    <h2 className="line-clamp-1 text-base font-bold text-white">
                      {project.title}
                    </h2>

                    <p className="mt-1.5 line-clamp-2 text-sm text-gray-400">
                      {project.description}
                    </p>

                    {/* Technology */}

                    <div className="mt-2.5 flex flex-wrap gap-1.5">

                      {project.technology.split(",").map((tech) => (

                        <span
                          key={tech}
                          className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-medium text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
                        >
                          {tech.trim()}
                        </span>

                      ))}

                    </div>

                    {/* Buttons */}

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">

                      {project.githubUrl && (

                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          className="flex-1 rounded-lg border border-gray-600 px-3 py-1.5 text-center text-sm font-semibold text-gray-300 transition hover:border-white hover:bg-white hover:text-black"
                        >
                          GitHub
                        </Link>

                      )}

                      {project.liveUrl && (

                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="flex-1 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-center text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-cyan-500/40"
                        >
                          Live Demo
                        </Link>

                      )}

                    </div>

                  </div>

                </div>

              );

            })

          ) : (

            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 py-10 text-center text-xl text-gray-400">
              No projects found.
            </div>

          )}

        </div>

      </section>
    </main>
  );
}