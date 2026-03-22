import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "FlowKit — Premium Animated UI Components",
  description: "A free collection of premium animated UI components. Browse, preview, and copy production-ready components instantly.",
  keywords: ["UI components", "animated components", "React components", "Tailwind CSS", "framer motion", "free components", "FlowKit"],
  openGraph: {
    title: "FlowKit",
    description: "Free premium animated UI components",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ colorScheme: 'dark' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
