"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FiFolder,
  FiFileText,
} from "react-icons/fi";

interface Project {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
}

interface Blog {
  id: number;
  title: string;
  status: "Published" | "Draft";
  createdAt: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [projectRes, blogRes] = await Promise.all([
        axios.get(`${API_URL}/api/projects`),
        axios.get(`${API_URL}/api/blogs`),
      ]);

      setProjects(projectRes.data.data || []);
      setBlogs(blogRes.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-lg sm:text-xl font-semibold text-slate-700">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 px-3 sm:px-0">

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-500">
          Manage your portfolio from your admin dashboard.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-2">

        <div className="rounded-xl bg-white p-5 sm:p-6 shadow border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-900/5 flex items-center justify-center">
              <FiFolder
                size={24}
                className="text-slate-900"
              />
            </div>
          </div>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl font-bold text-black">
            {projects.length}
          </h2>

          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-500">
            Total Projects
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 sm:p-6 shadow border border-slate-100">
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-slate-900/5 flex items-center justify-center">
              <FiFileText
                size={24}
                className="text-slate-900"
              />
            </div>
          </div>

          <h2 className="mt-4 sm:mt-5 text-3xl sm:text-4xl font-bold text-black">
            {blogs.length}
          </h2>

          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-gray-500">
            Total Blogs
          </p>
        </div>

      </div>

      {/* Tables */}

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">

        {/* Recent Projects */}

        <div className="overflow-hidden rounded-xl bg-white shadow border border-slate-100">

          <div className="border-b p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Recent Projects
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full text-black text-sm sm:text-base">

              <thead>

                <tr className="bg-slate-50">

                  <th className="px-4 sm:px-5 py-2.5 sm:py-3 text-left whitespace-nowrap">
                    Project
                  </th>

                  <th className="px-4 sm:px-5 py-2.5 sm:py-3 text-left whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-4 sm:px-5 py-2.5 sm:py-3 text-left whitespace-nowrap">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {projects.length > 0 ? (

                  [...projects]
                    .reverse()
                    .slice(0, 5)
                    .map((project) => (

                      <tr
                        key={project.id}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="px-4 sm:px-5 py-3 sm:py-4">
                          {project.title}
                        </td>

                        <td className="px-4 sm:px-5 py-3 sm:py-4 whitespace-nowrap">

                          {project.isActive ? (

                            <span className="rounded-full bg-green-100 px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-green-700">
                              Active
                            </span>

                          ) : (

                            <span className="rounded-full bg-red-100 px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-red-700">
                              Inactive
                            </span>

                          )}

                        </td>

                        <td className="px-4 sm:px-5 py-3 sm:py-4 whitespace-nowrap">
                          {new Date(
                            project.createdAt
                          ).toLocaleDateString()}
                        </td>

                      </tr>

                    ))

                ) : (

                  <tr>

                    <td
                      colSpan={3}
                      className="p-6 sm:p-8 text-center text-gray-500"
                    >
                      No Projects Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Recent Blogs */}

        <div className="overflow-hidden rounded-xl bg-white shadow border border-slate-100">

          <div className="border-b p-4 sm:p-5">
            <h2 className="text-lg sm:text-xl font-semibold text-black">
              Recent Blogs
            </h2>
          </div>

          <div className="overflow-x-auto">

            <table className="min-w-full text-black text-sm sm:text-base">

              <thead>

                <tr className="bg-slate-50">

                  <th className="px-4 sm:px-5 py-2.5 sm:py-3 text-left whitespace-nowrap">
                    Blog
                  </th>

                  <th className="px-4 sm:px-5 py-2.5 sm:py-3 text-left whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-4 sm:px-5 py-2.5 sm:py-3 text-left whitespace-nowrap">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {blogs.length > 0 ? (

                  [...blogs]
                    .reverse()
                    .slice(0, 5)
                    .map((blog) => (

                      <tr
                        key={blog.id}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="px-4 sm:px-5 py-3 sm:py-4">
                          {blog.title}
                        </td>

                        <td className="px-4 sm:px-5 py-3 sm:py-4 whitespace-nowrap">

                          {blog.status === "Published" ? (

                            <span className="rounded-full bg-green-100 px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-green-700">
                              Published
                            </span>

                          ) : (

                            <span className="rounded-full bg-yellow-100 px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-yellow-700">
                              Draft
                            </span>

                          )}

                        </td>

                        <td className="px-4 sm:px-5 py-3 sm:py-4 whitespace-nowrap">
                          {new Date(
                            blog.createdAt
                          ).toLocaleDateString()}
                        </td>

                      </tr>

                    ))

                ) : (

                  <tr>

                    <td
                      colSpan={3}
                      className="p-6 sm:p-8 text-center text-gray-500"
                    >
                      No Blogs Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}