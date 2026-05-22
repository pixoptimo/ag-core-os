import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AG-CORE OS // NEXUS",
  description: "Futuristic tactical operating environment and realtime gaming content intelligence command console.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050816] select-none overflow-hidden h-screen w-screen">
      <body className="antialiased font-mono text-neon-blue bg-bg-base overflow-hidden select-none h-screen w-screen relative">
        {children}
      </body>
    </html>
  );
}
