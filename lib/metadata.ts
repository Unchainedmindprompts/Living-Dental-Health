import type { Metadata } from "next";
export function serviceMetadata(
  path: string,
  title: string,
  description: string,
  image: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: `https://livingdentalhealth.com${path}`,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
