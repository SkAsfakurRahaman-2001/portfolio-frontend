"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { api } from "@/lib/api";

interface Blog {
  id: string;
  title: string;
  category: string;
  slug: string;
  content: string;
  blogImage: string;
  createdAt: string;
}

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await api.get("/api/blogs");

      const foundBlog = res.data.data.find(
        (item: Blog) => item.slug === slug
      );

      setBlog(foundBlog || null);
    } catch (error) {
      console.error("Failed to fetch blog:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-xl text-white">
        Loading...
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">
          Blog Not Found
        </h1>
      </main>
    );
  }

  const imageUrl = blog.blogImage || "/images/no-image.png";

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black py-4 text-white sm:py-6">
      <section className="mx-auto max-w-2xl px-3 sm:px-4">

        {/* Image */}
        <img
          src={imageUrl}
          alt={blog.title}
          className="h-[140px] w-full rounded-xl object-cover shadow-xl sm:h-[220px]"
        />

        {/* Category */}
        <div className="mt-3">
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-semibold text-cyan-300">
            {blog.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-2 text-lg font-bold leading-tight sm:text-2xl">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="mt-1.5 text-xs text-gray-400">
          Published on{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Content */}
        <div className="mt-3 whitespace-pre-wrap break-words rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-6 text-gray-300 sm:p-4">
          {blog.content}
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/blog")}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/40"
        >
          <FiArrowLeft size={18} />
          Back to Blogs
        </button>

      </section>
    </main>
  );
}