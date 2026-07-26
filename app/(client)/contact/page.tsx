"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface ContactData {
  email: string;
  phone: number;
  location: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await api.get("/api/contact");
      setContact(res.data.data);
    } catch (error) {
      console.error("Failed to fetch contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSending(true);

      const res = await api.post(
        "/api/mail/send-mail",
        formData
      );

      toast.success(
        res.data.message || "Message sent successfully."
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send message."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Contact information not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* Heading */}
        <div className="text-center">

          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Contact Me
            </span>
          </h1>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Have a project in mind or just want to say hello?
            Feel free to contact me.
          </p>

        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">

          {/* Left */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 backdrop-blur-xl">

            <h2 className="text-xl font-bold">
              Get In Touch
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              I'm always open to discussing new projects,
              freelance work, collaborations, or opportunities.
            </p>

            <div className="mt-4 space-y-3">

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  📧 Email
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {contact.email}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  📍 Location
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {contact.location}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                  📱 Phone
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                  {contact.phone}
                </p>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 backdrop-blur-xl">

            <form
              onSubmit={handleSubmit}
              className="space-y-3"
            >

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-300">
                  Message
                </label>

                <textarea
                  rows={3}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/40"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </section>
    </main>
  );
}