"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface Blog {
  id: string;
  title: string;
  category: string;
  slug: string;
  status: "Published" | "Draft";
}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");

      setBlogs(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs.");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Blog deleted successfully.");

      setBlogs((prev) =>
        prev.filter((blog) => blog.id !== id)
      );
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete blog."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-base sm:text-xl">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-3 shadow sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-black sm:mb-6">
          <h1 className="text-lg font-bold sm:text-xl">
            Blogs
          </h1>

          <Link
            href="/admin/blog/add"
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            + Add Blog
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300">
          <table className="w-full min-w-[600px] border-collapse text-sm text-black">
            <thead>
              <tr className="border-b bg-slate-50">
                <th className="px-3 py-2.5 text-left">
                  Title
                </th>

                <th className="px-3 text-left">
                  Category
                </th>

                <th className="px-3 text-left">
                  Slug
                </th>

                <th className="px-3 text-center">
                  Status
                </th>

                <th className="px-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr
                    key={blog.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-3 py-2.5 font-medium">
                      {blog.title}
                    </td>

                    <td className="px-3">
                      {blog.category}
                    </td>

                    <td className="px-3 text-gray-600">
                      {blog.slug}
                    </td>

                    <td className="px-3 text-center">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          blog.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    <td className="space-x-2 whitespace-nowrap px-3 text-center">
                      <Link
                        href={`/admin/blog/edit/${blog.id}`}
                        className="rounded bg-yellow-500 px-3 py-1.5 text-xs text-white hover:bg-yellow-600 sm:text-sm"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deleteBlog(blog.id)
                        }
                        className="rounded bg-red-600 px-3 py-1.5 text-xs text-white hover:bg-red-700 sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-gray-500"
                  >
                    No blogs found.
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