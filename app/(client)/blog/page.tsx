"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface Blog {
  id: string;
  title: string;
  category: string;
  slug: string;
  content: string;
  blogImage: string;
  status: "Published" | "Draft";
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/api/blogs");

      const publishedBlogs = res.data.data.filter(
        (blog: Blog) => blog.status === "Published"
      );

      setBlogs(publishedBlogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        <div className="text-center">
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              My Blogs
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-3xl text-base leading-6 text-gray-400 sm:text-lg">
            Articles, tutorials, and thoughts on web development and technology.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => {
              const imageUrl =
                blog.blogImage || "/images/no-image.png";

              return (
                <article
                  key={blog.id}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_20px_60px_rgba(6,182,212,0.25)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={blog.title}
                      loading="lazy"
                      className="h-32 w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="p-3.5">
                    <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                      {blog.category}
                    </span>

                    <h2 className="mt-2 line-clamp-2 text-base font-bold text-white">
                      {blog.title}
                    </h2>

                    <p className="mt-1.5 line-clamp-2 text-sm text-gray-400">
                      {blog.content}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-xs text-gray-500">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>

                      <span>
                        {Math.max(
                          1,
                          Math.ceil(blog.content.split(" ").length / 200)
                        )}{" "}
                        min read
                      </span>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-1.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/40"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 py-10 text-center text-xl text-gray-400">
              No blogs available.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}