import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RouteProvider } from "@/context/RouteContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Stridr",
  description: "Smarter Paths, Healthier You",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-o9N1j7kUNZdsC9AqKyPzCkFl6RykWBA9+0m0m0XQPUk="
            crossOrigin=""
          />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <RouteProvider>
            <Navbar />
            {children}
            <Footer />
          </RouteProvider>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
