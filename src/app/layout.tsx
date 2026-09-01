import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineFlux 3D | Dynamic Video Editing Studio",
  description: "CineFlux 3D Studio - Dynamic browser-based video editing web app with interactive 3D WebGL elements, multi-track timeline, real-time video filters, and high-speed export engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#07080d] text-[#f3f4f6] font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
