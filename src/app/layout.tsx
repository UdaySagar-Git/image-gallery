import type { Metadata } from "next";
import "./globals.css";
import Logo from "@/assets/uday.png";

export const metadata: Metadata = {
  title: "Image Gallery",
  description: "Search and view images from Unsplash",
  icons: {
    icon: Logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
