import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/utils";
import { Providers } from "@/components/providers";
import { AudioPlayer } from "./components/AudioPlayer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "Echome",
  description: "Echo Your Inner Growth",
  openGraph: {
    title: 'Echome',
    description: 'Echo Your Inner Growth',
    images: [
      {
        url: '/share.png',
        width: 1200,
        height: 630,
        alt: 'Echome - Echo Your Inner Growth',
        type: 'image/png'
      }
    ],
    locale: 'en_US',
    type: 'website',
    siteName: 'Echome'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echome',
    description: 'Echo Your Inner Growth',
    images: ['/share.png'],
    creator: '@echome'
  },
  icons: {
    icon: '/history.png',
    apple: '/history.png'
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Echome',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen"
        )}
      >
        <Providers>
          {children}
          <AudioPlayer />
        </Providers>
      </body>
    </html>
  );
} 