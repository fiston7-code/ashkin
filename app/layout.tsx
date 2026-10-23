import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "leaflet/dist/leaflet.css";
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });



export const metadata: Metadata = { title: "Nuitée - Hôtels & Passages à Kinshasa" };

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col justify-between pb-16 selection:bg-brand-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}