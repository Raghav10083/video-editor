import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { ParticleCanvas } from '../components/ParticleCanvas';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Raghav Portfolio (TXNB) | Content Strategist, Content Writer & Video Editor',
  description: 'Raghav Portfolio (TXNB) — Content Strategist, Content Writer & Video Editor Portfolio. Features vertical 9:16 reels, 16:9 long-form edits, food science collaborations, and YouTube content from @TXnbStudios.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="bg-[#07080d] text-gray-100 font-sans antialiased selection:bg-purple-600 selection:text-white overflow-x-hidden">
        <ThemeProvider>
          {/* Interactive Dynamic Background Canvas */}
          <ParticleCanvas />
          
          {/* Page Content */}
          <main className="relative z-10">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
