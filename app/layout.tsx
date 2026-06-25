import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "sonner";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dare Prints - Professional Printing Services",
  description: "High-quality printing services and materials for your needs",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },

  keywords: [
    "Dare Prints",
    "Printing Services",
    "Professional Printing",
    "High-Quality Printing",
    "Custom Printing",
    "Print Materials",
    "Business Printing",
    "printing",
    "printing in somolu",
    "printing in lagos",
    "printing in nigeria",
    "printing services in somolu",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${_geist.className} ${_geistMono.className}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            {process.env.NODE_ENV === "production" && <Analytics />}
            <Toaster richColors position="top-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
