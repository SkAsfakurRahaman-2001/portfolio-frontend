"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  {name:"Exprience", href:"/exprience"},
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          href="/"
          className="text-2xl font-extrabold tracking-wide text-white"
        >
          Portfolio
        </Link>

        {/* Desktop Navigation */}

        <ul className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (

            <li key={link.name}>

              <Link
                href={link.href}
                className="relative font-medium text-gray-300 transition-all duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>

            </li>

          ))}

        </ul>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

      </nav>

      {/* Mobile Menu */}

      {menuOpen && (

        <div className="border-t border-white/10 bg-slate-950 md:hidden">

          <ul className="space-y-2 px-6 py-5">

            {navLinks.map((link) => (

              <li key={link.name}>

                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-4 py-3 font-medium text-gray-300 transition hover:bg-white/5 hover:text-cyan-400"
                >
                  {link.name}
                </Link>

              </li>

            ))}

          </ul>

        </div>
        

      )}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

    </header>
  );
}