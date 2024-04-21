import Navbar from "@/components/navbar/NavBar";
// import Providers from '@/components/Providers'
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
import {Aljazira , tajawal} from '@/app/font/font'

export const metadata: Metadata = {
  title: "eco-city",
  description: "Your City, Cleaner and Safer with Eco-City.",
  // Add more metadata properties here if needed
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={metadata.description || "Marketplace for selling products"}
        />
      </Head>
      <body
        className={cn("relative h-full font-sans antialiased", inter.className , Aljazira.className , tajawal.className)}
      >
        <main className="relative flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex-1">{children}</div>
          <Footer />
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
