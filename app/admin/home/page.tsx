"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

interface HomeForm {
  name: string;
  designation: string;
  description: string;
}

export default function AdminHomePage() {
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [profileImage, setProfileImage] =
    useState<File | null>(null);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] =
    useState<HomeForm>({
      name: "",
      designation: "",
      description: "",
    });

  useEffect(() => {
    fetchHome();
  }, []);

  const fetchHome = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/home`
      );

      const data = res.data.data;

      setFormData({
        name: data.name || "",
        designation: data.designation || "",
        description: data.description || "",
      });

      if (data.homeImage) {
        setPreview(
          `${API_URL}${data.homeImage}`
        );
      }
    } catch (error) {
      console.log(error);
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

    setProfileImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append(
        "designation",
        formData.designation
      );
      data.append(
        "description",
        formData.description
      );

      if (profileImage) {
        data.append(
          "profileImage",
          profileImage
        );
      }

      await axios.put(
        `${API_URL}/api/home`,
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

      toast.success("Home updated successfully.");

      fetchHome();
    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-4 sm:p-6 shadow">

        <h1 className="mb-4 sm:mb-5 text-xl sm:text-2xl font-bold text-gray-900">
          Home Information
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-3 sm:space-y-4"
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full rounded-lg border p-2 sm:p-2.5 text-sm text-black"
          />

          <input
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="w-full rounded-lg border p-2 sm:p-2.5 text-sm text-black"
          />

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full rounded-lg border p-2 sm:p-2.5 text-sm text-black"
          />

          <div>
            <label className="mb-1.5 block font-semibold text-gray-700 text-sm">
              Profile Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border p-2 sm:p-2.5 text-xs sm:text-sm text-black"
            />
          </div>

          {preview && (
            <Image
              src={preview}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-lg border object-cover w-20 h-20 sm:w-24 sm:h-24"
            />
          )}

          <button
            disabled={loading}
            className="w-full sm:w-auto rounded-lg bg-slate-900 px-6 py-2 sm:py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>
      </div>
    </main>
  );
}