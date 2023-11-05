import type { Viewport, Metadata } from "next";
import { Lora, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const serif = Lora({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-serif",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "DesignEngineer.xyz",
  description:
    "A new platform to help Design Engineers learn, find their next role, hear from experts, and demonstrate their skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${serif.variable} ${mono.variable} ${sans.variable} overflow-x-hidden bg-white p-4 font-sans dark:bg-slate-950 md:p-16`}
      >
        {children}
      </body>
    </html>
  );
}
