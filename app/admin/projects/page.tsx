"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  technology: string;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/projects`
      );

      setProjects(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );

      toast.success("Project deleted successfully.");

      setProjects((prev) =>
        prev.filter((project) => project.id !== id)
      );
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete project."
      );
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
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4 text-black">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-3 sm:p-5 shadow">

        <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-lg sm:text-xl font-bold">
            Projects
          </h1>

          <Link
            href="/admin/projects/add"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            + Add Project
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="py-2.5 px-3 text-left">Project</th>
                <th className="py-2.5 px-3 text-left">Description</th>
                <th className="py-2.5 px-3 text-left">Technology</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-2.5 px-3">
                      {project.title}
                    </td>

                    <td className="py-2.5 px-3">
                      {project.description}
                    </td>

                    <td className="py-2.5 px-3">
                      {project.technology}
                    </td>

                    <td className="py-2.5 px-3 space-x-2 text-center whitespace-nowrap">
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className="rounded bg-yellow-500 px-3 py-1.5 text-xs sm:text-sm text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteProject(project.id)
                        }
                        className="rounded bg-red-600 px-3 py-1.5 text-xs sm:text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-8 text-center text-gray-500"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}