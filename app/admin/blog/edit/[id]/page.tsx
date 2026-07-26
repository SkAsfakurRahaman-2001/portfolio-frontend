"use client";

import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

interface BlogForm {
  title: string;
  category: string;
  slug: string;
  content: string;
  status: "Published" | "Draft";
}

export default function EditBlogPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState<BlogForm>({
    title: "",
    category: "",
    slug: "",
    content: "",
    status: "Published",
  });

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/api/blogs/${id}`);

      const blog = res.data.data;

      setFormData({
        title: blog.title,
        category: blog.category,
        slug: blog.slug,
        content: blog.content,
        status: blog.status,
      });

      if (blog.blogImage) {
        setPreview(blog.blogImage);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load blog.");
    }
  };

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent) => {
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

      await api.put(`/api/blogs/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog updated successfully.");

      router.push("/admin/blog");
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-3 shadow sm:p-5">
        <h1 className="mb-3 text-lg font-bold text-black sm:mb-5 sm:text-xl">
          Edit Blog
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 text-black"
        >
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full rounded-lg border p-2 text-sm"
            required
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full rounded-lg border p-2 text-sm"
            required
          />

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full rounded-lg border p-2 text-sm"
            required
          />

          <textarea
            rows={6}
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Blog Content"
            className="w-full rounded-lg border p-2 text-sm"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full rounded-lg border p-2 text-xs sm:text-sm"
          />

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

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="h-28 rounded-lg border object-cover sm:h-36"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 sm:w-auto sm:px-6"
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}