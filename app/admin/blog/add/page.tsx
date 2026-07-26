"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AddBlogPage() {
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    slug: "",
    content: "",
    status: "Published",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("slug", formData.slug);
      data.append("content", formData.content);
      data.append("status", formData.status);

      if (image) {
        data.append("blogImage", image);
      }

      await api.post("/api/blogs", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog created successfully.");

      setFormData({
        title: "",
        category: "",
        slug: "",
        content: "",
        status: "Published",
      });

      setImage(null);
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 text-black sm:p-4">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-3 shadow sm:p-5">
        <h1 className="mb-3 text-lg font-bold sm:mb-5 sm:text-xl">
          Add Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-1"
        >
          <div>
            <label className="mb-1 block text-xs font-semibold sm:text-sm">
              Blog Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Blog Title"
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold sm:text-sm">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Next.js"
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold sm:text-sm">
              Slug
            </label>

            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="getting-started-with-nextjs"
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold sm:text-sm">
              Content
            </label>

            <textarea
              rows={6}
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog..."
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold sm:text-sm">
              Blog Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full rounded-lg border p-2 text-xs sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold sm:text-sm">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border p-2 text-sm"
            >
              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 sm:w-auto sm:px-6"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}