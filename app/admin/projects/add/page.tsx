"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

interface ProjectForm {
  title: string;
  description: string;
  technology: string;
  githubUrl: string;
  liveUrl: string;
}

export default function AddProjectPage() {
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);

  const [projectImage, setProjectImage] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] =
    useState<ProjectForm>({
      title: "",
      description: "",
      technology: "",
      githubUrl: "",
      liveUrl: "",
    });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    setProjectImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "technology",
        formData.technology
      );
      data.append(
        "githubUrl",
        formData.githubUrl
      );
      data.append(
        "liveUrl",
        formData.liveUrl
      );

      if (projectImage) {
        data.append(
          "projectImage",
          projectImage
        );
      }

      await axios.post(
        `${API_URL}/api/projects`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success("Project added successfully.");

      router.push("/admin/projects");

      setFormData({
        title: "",
        description: "",
        technology: "",
        githubUrl: "",
        liveUrl: "",
      });

      setProjectImage(null);
      setPreview("");

    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to Add project."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4 text-black">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-3 sm:p-5 shadow">

        <h1 className="mb-3 sm:mb-5 text-lg sm:text-xl font-bold">
          Add Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-1.5"
        >

          <div>
            <label className="mb-1 block text-xs sm:text-sm font-semibold">
              Project Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Portfolio Website"
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs sm:text-sm font-semibold">
              Description
            </label>

            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Project Description"
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs sm:text-sm font-semibold">
              Technologies
            </label>

            <input
              type="text"
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              placeholder="Next.js, Express, PostgreSQL"
              className="w-full rounded-lg border p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-xs sm:text-sm font-semibold">
              GitHub URL
            </label>

            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/project"
              className="w-full rounded-lg border p-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs sm:text-sm font-semibold">
              Live Demo URL
            </label>

            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://yourproject.com"
              className="w-full rounded-lg border p-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs sm:text-sm font-semibold">
              Project Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border p-2 text-xs sm:text-sm"
            />
          </div>

          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={250}
              height={150}
              className="rounded-lg border object-cover w-full h-32 sm:w-[250px] sm:h-[150px]"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-lg bg-slate-900 px-4 sm:px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : "Save Project"}
          </button>
        </form>
      </div>
    </main>
  );
}