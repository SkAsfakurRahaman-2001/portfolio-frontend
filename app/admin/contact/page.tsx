"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface ContactForm {
  email: string;
  location: string;
  phone: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminContactPage() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<ContactForm>({
    email: "",
    location: "",
    phone: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(`${API_URL}/contact`);

      const data = res.data.data;

      setFormData({
        email: data?.email || "",
        location: data?.location || "",
        phone: data?.phone || "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load contact information.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
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

      await axios.put(
        `${API_URL}/contact`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Contact information updated successfully.");

      fetchContact();
    } catch (error: any) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update contact information."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-2 sm:p-4">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-3 shadow sm:p-5">

        <h1 className="mb-5 text-lg font-bold text-gray-900 sm:text-xl">
          Contact Information
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border p-2 text-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full rounded-lg border p-2 text-black"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="West Bengal, India"
              className="w-full rounded-lg border p-2 text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-6 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 sm:w-auto"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>
    </main>
  );
}