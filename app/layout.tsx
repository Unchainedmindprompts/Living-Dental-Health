import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { livingDentalHealthSchema, sanitizeJsonLd } from "@/lib/schema";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://livingdentalhealth.com"),
  title: "Living Dental Health — Family Dentist in Bend, Oregon",
  description:
    "Customized care, with a gentle touch. Dr. Andy Engel, DMD — a private dental studio serving Central Oregonians age 12+ in Bend since 1998.",
  openGraph: {
    title: "Living Dental Health — Family Dentist in Bend, Oregon",
    description:
      "Customized care, with a gentle touch. Dr. Andy Engel, DMD — a private dental studio in Bend since 1998.",
    images: ["/hero-couple.webp"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Dental Health — Family Dentist in Bend, Oregon",
    description: "Customized care, with a gentle touch. Dr. Andy Engel, DMD.",
    images: ["/hero-couple.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sanitizeJsonLd(livingDentalHealthSchema)),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
