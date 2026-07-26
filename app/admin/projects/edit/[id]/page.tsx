"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ProjectForm {
  title: string;
  description: string;
  technology: string;
  githubUrl: string;
  liveUrl: string;
}

export default function EditProjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false);
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState<ProjectForm>({
    title: "",
    description: "",
    technology: "",
    githubUrl: "",
    liveUrl: "",
  });

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/projects/${id}`
      );

      const data = res.data.data;

      setFormData({
        title: data.title || "",
        description: data.description || "",
        technology: data.technology || "",
        githubUrl: data.githubUrl || "",
        liveUrl: data.liveUrl || "",
      });

      if (data.projectImage) {
        setPreview(data.projectImage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch project.");
    }
  };

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
      data.append("description", formData.description);
      data.append("technology", formData.technology);
      data.append("githubUrl", formData.githubUrl);
      data.append("liveUrl", formData.liveUrl);

      if (projectImage) {
        data.append("projectImage", projectImage);
      }

      await axios.put(
        `${API_URL}/api/projects/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Project updated successfully.");
      router.push("/admin/projects");

    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ??
          "Failed to update project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4 text-black">
  <div className="mx-auto max-w-2xl rounded-xl bg-white p-3 sm:p-5 shadow">
    <h1 className="mb-3 sm:mb-5 text-lg sm:text-xl font-bold">
      Edit Project
    </h1>

    <form
      onSubmit={handleSubmit}
      className="space-y-3"
    >
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full rounded-lg border p-2 text-sm"
      />

      <textarea
        rows={3}
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Project Description"
        className="w-full rounded-lg border p-2 text-sm"
      />

      <input
        type="text"
        name="technology"
        value={formData.technology}
        onChange={handleChange}
        placeholder="Technologies"
        className="w-full rounded-lg border p-2 text-sm"
      />

      <input
        type="url"
        name="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        placeholder="GitHub URL"
        className="w-full rounded-lg border p-2 text-sm"
      />

      <input
        type="url"
        name="liveUrl"
        value={formData.liveUrl}
        onChange={handleChange}
        placeholder="Live Demo URL"
        className="w-full rounded-lg border p-2 text-sm"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full rounded-lg border p-2 text-xs sm:text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto rounded-lg bg-slate-900 px-4 sm:px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Project"}
      </button>

        {preview && (
        <img
          src={preview}
          alt="Project Preview"
          className="h-32 w-full sm:h-40 sm:w-64 rounded-lg border object-cover"
        />
      )}
    </form>
  </div>
</main>
  );
}