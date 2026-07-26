"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  FiHome,
  FiFolder,
  FiFileText,
  FiMail,
  FiUser,
  FiBriefcase,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const menuItems = [
    {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: FiHome,
  },
  {
    title: "Home",
    href: "/admin/home",
    icon: FiHome,
  },
    {
    title: "About",
    href: "/admin/about",
    icon: FiUser,
  },
    {
    title: "Projects",
    href: "/admin/projects",
    icon: FiFolder,
  },
    {
    title: "Exprience",
    href: "/admin/exprience",
    icon: FiBriefcase,
  },
    {
    title: "Blog",
    href: "/admin/blog",
    icon: FiFileText,
  },
  {
    title: "Contact",
    href: "/admin/contact",
    icon: FiMail,
  },

];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <>
      {/* Hamburger Button (Visible on ALL devices) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 sm:top-5 sm:left-5 z-[60] bg-slate-900 hover:bg-slate-800 text-white p-2.5 sm:p-3 rounded-lg shadow-lg transition"
        >
          <FiMenu size={20} />
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[80%] max-w-72 sm:w-72 bg-slate-900 text-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 border-b border-slate-700 shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Portfolio</h2>
            <p className="text-xs sm:text-sm text-slate-400">Admin Panel</p>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-2 rounded-lg hover:bg-slate-800 transition"
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 sm:px-4 py-4 sm:py-5 space-y-1.5 sm:space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition-all text-sm sm:text-base ${
                  active
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="w-full p-3 sm:p-4 border-t border-slate-700 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 sm:gap-3 w-full py-2.5 sm:py-3 rounded-lg bg-red-500 hover:bg-red-600 transition text-sm sm:text-base"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}