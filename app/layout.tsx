import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google";
import "./globals.css";

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

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Living Dental Health",
  image: "https://livingdentalhealth.com/hero-couple.webp",
  url: "https://livingdentalhealth.com",
  telephone: "+1-541-550-5311",
  address: {
    "@type": "PostalAddress",
    streetAddress: "930 SW Yates Drive",
    addressLocality: "Bend",
    addressRegion: "OR",
    postalCode: "97702",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.0294,
    longitude: -121.3331,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "210",
  },
  founder: {
    "@type": "Person",
    name: "Dr. Andy Engel, DMD",
  },
  foundingDate: "1998",
  areaServed: "Bend, Oregon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
