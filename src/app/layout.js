import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Siddhartha Boarding Secondary School, Nawalpur",
  description:
    "Siddhartha Boarding Secondary School, Kawasoti-3, Nawalpur, Nepal. Nursery to Grade 10 (SEE), established 2046 B.S. (1989). Live to learn, learn to serve the country and the poor.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icon-512.png", sizes: "512x512" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
