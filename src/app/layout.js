import { Analytics } from "@vercel/analytics/react"; // Analytics
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HushString",
  description: "HushString - Where Melodies Whisper on Strings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
