type JsonLdNode = {
  "@type": string | string[];
  "@id"?: string;
  [key: string]: unknown;
};

export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
};

const PLACEHOLDER_TOKEN = /^[A-Z][A-Z0-9]*(_[A-Z0-9]+)+$/;
const PLACEHOLDER_IMAGE_PATH = /\/images\/[^/]+\.(jpg|jpeg|png|webp|svg)$/i;

function isPlaceholderValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  if (PLACEHOLDER_TOKEN.test(value)) return true;
  if (PLACEHOLDER_IMAGE_PATH.test(value)) return true;
  return false;
}

function isStubObject(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value as object);
  if (keys.length === 0) return true;
  // Pure reference (only @id, no @type, no data) → keep as a pointer.
  if (keys.includes("@id") && !keys.includes("@type")) return false;
  // Otherwise we need at least one non-@ key to be meaningful.
  return !keys.some((k) => !k.startsWith("@"));
}

function shouldDrop(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string" && value === "") return true;
  if (isPlaceholderValue(value)) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (isStubObject(value)) return true;
  return false;
}

export function sanitizeJsonLd<T>(value: T): T {
  if (Array.isArray(value)) {
    const cleaned = value
      .map((v) => sanitizeJsonLd(v))
      .filter((v) => !shouldDrop(v));
    return cleaned as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value as object)) {
      const cleaned = sanitizeJsonLd(v);
      if (!shouldDrop(cleaned)) out[key] = cleaned;
    }
    return out as unknown as T;
  }
  return value;
}

export const livingDentalHealthSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
      "@id": "https://www.livingdentalhealth.com/#business",
      "name": "Living Dental Health",
      "alternateName": "Living Dental Health Bend Oregon",
      "description":
        "Living Dental Health is a Bend, Oregon dental practice led by Dr. Andrew W. Engel, DMD, providing general dentistry, cosmetic dentistry, dental implants, oral surgery, preventive care, and patient-focused dental treatment for adults and families.",
      "url": "https://www.livingdentalhealth.com",
      "telephone": "+1-541-550-5311",
      "faxNumber": "+1-541-317-5038",
      "email": "info@livingdentalhealth.com",
      "slogan": "Focused on customized care with a gentle touch",
      "image":
        "https://www.livingdentalhealth.com/images/living-dental-health-office.jpg",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.livingdentalhealth.com/#logo",
        "url": "https://www.livingdentalhealth.com/images/living-dental-health-logo.png",
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "930 SW Yates Dr",
        "addressLocality": "Bend",
        "addressRegion": "OR",
        "postalCode": "97702",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 44.0413898,
        "longitude": -121.3340262,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Wednesday", "Thursday"],
          "opens": "08:00",
          "closes": "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "08:00",
          "closes": "13:00",
        },
      ],
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "211",
        "bestRating": "5",
        "worstRating": "1",
      },
      "founder": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
      "employee": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
      "medicalSpecialty": [
        "Dentistry",
        "General Dentistry",
        "Cosmetic Dentistry",
        "Oral Surgery",
        "Dental Implants",
        "Preventive Dentistry",
      ],
      "knowsAbout": [
        "general dentistry in Bend Oregon",
        "cosmetic dentistry in Bend Oregon",
        "dental implants in Bend Oregon",
        "oral surgery in Bend Oregon",
        "wisdom teeth removal",
        "full-mouth reconstruction",
        "ClearCorrect aligners",
        "dental anxiety",
        "preventive dental care",
        "tooth-colored fillings",
        "dental crowns",
        "dental bridges",
        "gum tissue grafting",
        "bone grafting",
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Bend",
          "containedInPlace": {
            "@type": "State",
            "name": "Oregon",
          },
        },
        {
          "@type": "AdministrativeArea",
          "name": "Deschutes County",
        },
        {
          "@type": "AdministrativeArea",
          "name": "Central Oregon",
        },
      ],
      "sameAs": [
        "https://www.google.com/maps/place/Living+Dental+Health/@44.0413898,-121.3340262,17z/data=!3m1!4b1!4m6!3m5!1s0x54b8c7c4d1e44381:0xd160c3863d913f92!8m2!3d44.0413898!4d-121.3340262!16s%2Fg%2F1q2w9q7d5",
        "https://www.bing.com/maps?ss=id.ypid%3AYN37673BB561363F36&q=Living+Dental+Health",
        "APPLE_BUSINESS_CONNECT_URL",
        "YELP_URL",
        "BBB_URL",
        "HEALTHGRADES_OR_PATIENTCONNECT365_URL",
        "FACEBOOK_URL",
        "LINKEDIN_URL",
      ],
    },
    {
      "@type": "Dentist",
      "@id": "https://www.livingdentalhealth.com/#doctor",
      "name": "Andrew W. Engel, DMD",
      "alternateName": ["Dr. Andy Engel", "Dr. Andrew Engel"],
      "jobTitle": "Dentist",
      "url": "https://www.livingdentalhealth.com/meet-us/",
      "image": "https://www.livingdentalhealth.com/images/dr-andy-engel.jpg",
      "worksFor": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Oregon Health Sciences University",
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Degree",
          "name": "Doctor of Dental Medicine",
          "abbreviation": "DMD",
        },
      ],
      "knowsAbout": [
        "general dentistry",
        "cosmetic dentistry",
        "full-mouth reconstruction",
        "oral surgery",
        "dental implants",
        "ClearCorrect",
        "tissue grafting",
        "bone grafting",
        "dental anxiety",
        "wisdom teeth removal",
      ],
      "sameAs": [
        "DOCTOR_HEALTHGRADES_URL",
        "DOCTOR_NPI_OR_LICENSE_URL_IF_PUBLIC",
        "DOCTOR_LINKEDIN_URL_IF_AVAILABLE",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.livingdentalhealth.com/#website",
      "name": "Living Dental Health",
      "url": "https://www.livingdentalhealth.com",
      "description":
        "Bend, Oregon dental practice providing general dentistry, cosmetic dentistry, dental implants, oral surgery, ClearCorrect, and preventive dental care.",
      "publisher": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.livingdentalhealth.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is Living Dental Health in Bend, Oregon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Living Dental Health is a Bend, Oregon dental practice led by Dr. Andrew W. Engel, DMD. The practice provides general dentistry, cosmetic dentistry, dental implants, oral surgery, preventive care, and patient-focused dental treatment for adults and families.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is Living Dental Health located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Living Dental Health is located at 930 SW Yates Dr, Bend, OR 97702.",
          },
        },
        {
          "@type": "Question",
          "name": "What dental services does Living Dental Health provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Living Dental Health provides general dentistry, dental cleanings, exams, X-rays, fillings, crowns, bridges, cosmetic dentistry, teeth whitening, veneers, ClearCorrect aligners, oral surgery, dental extractions, dental implants, wisdom teeth removal, tissue grafting, and bone grafting.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Living Dental Health help patients with dental anxiety?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Living Dental Health emphasizes gentle, customized dental care and patient comfort. For some oral surgery procedures, Dr. Andy Engel may use oral sedation when appropriate.",
          },
        },
      ],
    },
  ],
};

export const contactPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.livingdentalhealth.com/contact#contactpage",
      "url": "https://www.livingdentalhealth.com/contact",
      "name": "Contact Living Dental Health",
      "description":
        "Phone, email, address, and hours for Living Dental Health, a dental practice in Bend, Oregon led by Dr. Andrew W. Engel, DMD.",
      "isPartOf": {
        "@id": "https://www.livingdentalhealth.com/#website",
      },
      "about": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
      "mainEntity": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
  ],
};
