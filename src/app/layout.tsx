import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { ParticleCanvas } from "../components/ParticleCanvas";

export const metadata: Metadata = {
  title: "CineCraft Studio | Master Video Editor & Colorist Portfolio",
  description: "CineCraft Studio — Premier Video Editing & 4K Colorist Portfolio. Features commercial showreels, before/after color grading, instant scope calculator, and 3D studio integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[var(--bg-dark)] text-[#f3f4f6] font-sans antialiased overflow-hidden transition-colors duration-700">
        <ThemeProvider>
          <ParticleCanvas />
          <div className="relative z-10 h-full flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
