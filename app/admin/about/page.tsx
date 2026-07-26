"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface AboutForm {
  heading: string;
  subHeading: string;
  name: string;
  descriptionOne: string;
  descriptionTwo: string;
  location: string;
  education: string;
  experience: string;
  languages: string;
  skills: string;
}

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  const [formData, setFormData] = useState<AboutForm>({
    heading: "",
    subHeading: "",
    name: "",
    descriptionOne: "",
    descriptionTwo: "",
    location: "",
    education: "",
    experience: "",
    languages: "",
    skills: "",
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const res = await api.get("/api/about");

      const data = res.data.data;

      setFormData({
        heading: data.heading || "",
        subHeading: data.subHeading || "",
        name: data.name || "",
        descriptionOne: data.descriptionOne || "",
        descriptionTwo: data.descriptionTwo || "",
        location: data.location || "",
        education: data.education || "",
        experience: data.experience || "",
        languages: data.languages || "",
        skills: Array.isArray(data.skills)
          ? data.skills.join(", ")
          : JSON.parse(data.skills || "[]").join(", "),
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch About data.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("heading", formData.heading);
      data.append("subHeading", formData.subHeading);
      data.append("name", formData.name);
      data.append("descriptionOne", formData.descriptionOne);
      data.append("descriptionTwo", formData.descriptionTwo);
      data.append("location", formData.location);
      data.append("education", formData.education);
      data.append("experience", formData.experience);
      data.append("languages", formData.languages);

      data.append(
        "skills",
        JSON.stringify(
          formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        )
      );

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      if (resume) {
        data.append("resume", resume);
      }

      await api.put("/api/about", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("About updated successfully.");

      fetchAbout();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update About."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-3 sm:p-5 shadow">
        <h1 className="mb-3 text-lg font-bold text-gray-900 sm:mb-5 sm:text-xl">
          About Information
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <input
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            placeholder="Heading"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="subHeading"
            value={formData.subHeading}
            onChange={handleChange}
            placeholder="Sub Heading"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <textarea
            rows={3}
            name="descriptionOne"
            value={formData.descriptionOne}
            onChange={handleChange}
            placeholder="Description One"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <textarea
            rows={3}
            name="descriptionTwo"
            value={formData.descriptionTwo}
            onChange={handleChange}
            placeholder="Description Two"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Education"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Experience"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Next.js, TypeScript"
            className="w-full rounded-lg border p-2 text-sm text-black"
          />

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProfileImage(e.target.files?.[0] || null)
              }
              className="w-full rounded-lg border p-2 text-xs text-black sm:text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700 sm:text-sm">
              Resume (PDF)
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                setResume(e.target.files?.[0] || null)
              }
              className="w-full rounded-lg border p-2 text-xs text-black sm:text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 sm:w-auto sm:px-6"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}