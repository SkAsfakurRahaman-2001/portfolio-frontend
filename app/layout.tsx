import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  metadataBase: new URL("https://sk-asfakur-portfolio.vercel.app/"),

  title: "Sk Asfakur Rahaman | Full Stack Developer",

  description:
    "Sk Asfakur Rahaman is a Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Explore projects, skills, and experience.",

  keywords: [
    "Sk Asfakur Rahaman",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
  ],

  authors: [{ name: "Sk Asfakur Rahaman" }],

  openGraph: {
    title: "Sk Asfakur Rahaman | Full Stack Developer",
    description:
      "Full Stack Developer building modern web applications with React, Next.js and Node.js.",
    url: "https://sk-asfakur-portfolio.vercel.app/",
    siteName: "Sk Asfakur Rahaman Portfolio",
    images: [
      {
        url: "/asfakur.jpg",
        width: 1200,
        height: 630,
        alt: "Sk Asfakur Rahaman Portfolio",
      },
    ],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon:"/asfakur.jpg",
  },

  alternates: {
    canonical: "https://sk-asfakur-portfolio.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-right" />

        {children}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sk Asfakur Rahaman",
              jobTitle: "Full Stack Developer",
              url: "https://sk-asfakur-portfolio.vercel.app/",
            }),
          }}
        />
      </body>
    </html>
  );
}