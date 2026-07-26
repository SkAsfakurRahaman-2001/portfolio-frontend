import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      {/* Top Gradient Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-12 md:grid-cols-3">

          {/* Left */}

          <div>

            <Link
              href="/"
              className="text-2xl font-extrabold tracking-wide"
            >
              Portfolio
            </Link>

            <p className="mt-5 max-w-sm leading-7 text-gray-400">
              Passionate Full Stack Developer building responsive,
              high-performance web applications — blending clean
              design with solid engineering to create seamless
              digital experiences.
            </p>

          </div>

          {/* Center */}

          <div>

            <h3 className="mb-5 text-xl font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([name, href]) => (

                <li key={name}>

                  <Link
                    href={href}
                    className="inline-block text-gray-400 transition-all duration-300 hover:translate-x-2 hover:text-cyan-400"
                  >
                    {name}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

          {/* Right */}

          <div>

            <h3 className="mb-5 text-xl font-semibold text-white">
              Connect With Me
            </h3>

            <div className="flex flex-wrap gap-4">

              <Link
                href="https://github.com/SkAsfakurRahaman-2001"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <FaGithub />
              </Link>

              <Link
                href="https://www.linkedin.com/in/sk-asfakur-rahaman-0b364123b"
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <FaLinkedin />
              </Link>

              <Link
                href="https://www.instagram.com/sk_aspak_2001?igsh=MXIwcm80dTQwZmwwYw=="
                target="_blank"
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl transition-all duration-300 hover:-translate-y-1 hover:border-pink-500 hover:bg-red-500/10 hover:text-red-400 hover:shadow-lg hover:shadow-red-500/20"
              >
                <FaInstagram />
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-12 border-t border-white/10 pt-6">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">

            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-cyan-400">
                Sk Asfakur Rahaman ❤️ 
              </span>
              . All Rights Reserved.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}