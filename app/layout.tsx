import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BIZI",
  description: "Video calling App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        layout: {
          // logoImageUrl: '/icons/yoom-logo.svg'
          logoImageUrl: '/icons/video-solid.svg',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#33364a',
          colorInputBackground: '#1C1F2E',
          colorInputText: '#fff',
        }
      }}
      >
      <body className={`${inter.className} bg-dark-2`}>
        {children}
        <Toaster />
      </body>

      </ClerkProvider>
    </html>
   
  );
}