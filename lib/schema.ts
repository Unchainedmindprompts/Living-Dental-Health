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

// NAP stub — emitted on EVERY page via the layout. Identity + name,
// address, phone, geo, areaServed: enough to be a real local signal.
// Deliberately omits aggregateRating and sameAs so those are never
// duplicated across pages (one entity = one rating node, on home only).
const businessNapStub: JsonLdNode = {
  "@type": ["Dentist", "LocalBusiness", "MedicalBusiness"],
  "@id": "https://livingdentalhealth.com/#business",
  "name": "Living Dental Health",
  "url": "https://livingdentalhealth.com/",
  "telephone": "+1-541-550-5311",
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
  "areaServed": [
    {
      "@type": "City",
      "name": "Bend",
      "containedInPlace": {
        "@type": "State",
        "name": "Oregon",
        "sameAs": "https://en.wikipedia.org/wiki/Oregon",
      },
      "sameAs": "https://en.wikipedia.org/wiki/Bend,_Oregon",
    },
    {
      "@type": "AdministrativeArea",
      "name": "Deschutes County",
      "sameAs": "https://en.wikipedia.org/wiki/Deschutes_County,_Oregon",
    },
    {
      "@type": "AdministrativeArea",
      "name": "Central Oregon",
      "sameAs": "https://en.wikipedia.org/wiki/Central_Oregon",
    },
  ],
};

// Non-NAP enrichment — merges onto #business by @id, home page only.
const businessEnrichment: Record<string, unknown> = {
  "alternateName": "Living Dental Health Bend Oregon",
  "description":
    "Living Dental Health is a Bend, Oregon dental practice led by Dr. Andrew W. Engel, DMD, providing general dentistry, cosmetic dentistry, dental implants, oral surgery, preventive care, and patient-focused dental treatment for adults and families.",
  "faxNumber": "+1-541-317-5038",
  "email": "info@livingdentalhealth.com",
  "slogan": "Focused on customized care with a gentle touch",
  "image":
    "https://livingdentalhealth.com/images/brand/living-dental-health-office.jpg",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://livingdentalhealth.com/#logo",
    "url": "https://livingdentalhealth.com/images/brand/living-dental-health-logo.png",
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
  "foundingDate": "2013",
  "award": [
    "CommunityVotes Bend 2026 Platinum Winner — Dental Hygiene Clinic",
    "CommunityVotes Bend 2026 Gold Winner — Dental Clinic",
    "CommunityVotes Bend 2025 Platinum Winner — Dental Hygiene Clinic",
    "CommunityVotes Bend 2025 Gold Winner — Dental Clinic",
  ],
  "founder": {
    "@id": "https://livingdentalhealth.com/#doctor",
  },
  "employee": {
    "@id": "https://livingdentalhealth.com/#doctor",
  },
  "medicalSpecialty": [
    "Dentistry",
    "General Dentistry",
    "Cosmetic Dentistry",
    "Oral Surgery",
    "Dental Implants",
    "Preventive Dentistry",
  ],
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "General Dentistry",
      "url": "https://livingdentalhealth.com/general-dentistry",
    },
    {
      "@type": "MedicalProcedure",
      "name": "Cosmetic Dentistry",
      "url": "https://livingdentalhealth.com/cosmetic-dentistry",
    },
    {
      "@type": "MedicalProcedure",
      "name": "Dental Implants & Oral Surgery",
      "url": "https://livingdentalhealth.com/implants-surgery",
    },
    {
      "@type": "MedicalProcedure",
      "name": "Full Mouth Reconstruction",
      "url": "https://livingdentalhealth.com/full-mouth-reconstruction",
    },
    {
      "@type": "MedicalProcedure",
      "name": "Sedation Dentistry",
      "url": "https://livingdentalhealth.com/sedation-dentistry",
    },
    {
      "@type": "MedicalProcedure",
      "name": "Oral Cancer Screening",
      "url": "https://livingdentalhealth.com/oral-cancer-screening",
    },
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
    "in-house 3D CBCT dental imaging",
    "panoramic dental X-rays",
  ],
  "sameAs": [
    "https://www.google.com/maps/place/Living+Dental+Health/@44.0413898,-121.3340262,17z/data=!3m1!4b1!4m6!3m5!1s0x54b8c7c4d1e44381:0xd160c3863d913f92!8m2!3d44.0413898!4d-121.3340262!16s%2Fg%2F1q2w9q7d5",
    "https://www.bing.com/maps?ss=id.ypid%3AYN37673BB561363F36&q=Living+Dental+Health",
    "https://maps.apple.com/place?place-id=IA9A533B964A8ECD6&address=930+SW+Yates+Dr%2C+Bend%2C+OR++97702%2C+United+States&coordinate=44.041362%2C-121.333961&name=Living+Dental+Health",
    "https://www.yelp.com/biz/living-dental-health-bend",
    "https://www.bbb.org/us/or/bend/profile/dentist/living-dental-health-llc-1296-1000184711",
    "https://www.patientconnect365.com/Dentists/Oregon/Bend/97702/Living_Dental_Health",
    "https://www.facebook.com/LivingDentalHealth",
    "https://www.linkedin.com/company/living-dental-health/",
  ],
};

// Full #business node — NAP stub + enrichment, home page only.
const businessFull: JsonLdNode = {
  ...businessNapStub,
  ...businessEnrichment,
};

const doctorEntity: JsonLdNode = {
  "@type": "Person",
  "@id": "https://livingdentalhealth.com/#doctor",
  "name": "Andrew W. Engel DMD",
  "alternateName": ["Dr. Andy Engel", "Dr. Andrew Engel"],
  "jobTitle": "Dentist",
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Dentist",
    "occupationalCategory": "29-1021.00 Dentists, General",
  },
  "description":
    "Dr. Andrew W. Engel is the founder of Living Dental Health in Bend, Oregon, and has cared for Bend families since 1998. A graduate of Oregon Health Sciences University School of Dentistry, he completed advanced training in full mouth reconstruction, oral surgery, dental implants, ClearCorrect, and tissue and bone grafting, offering comprehensive care under one roof. He has practiced cosmetic dentistry since 1999 and provided clear aligner therapy since 2001. During his training he worked directly alongside a prosthodontist, learning occlusion and bite architecture at the chair — the discipline that determines whether a full mouth reconstruction lasts for decades. In 28 years of practice he has become one of Central Oregon's most trusted dentists for complex cases.",
  "url": "https://livingdentalhealth.com/about",
  "image": "https://livingdentalhealth.com/images/brand/dr-andy-engel.jpg",
  "worksFor": {
    "@id": "https://livingdentalhealth.com/#business",
  },
  "alumniOf": [
    {
      "@type": "CollegeOrUniversity",
      "name": "University of Oregon",
    },
    {
      "@type": "CollegeOrUniversity",
      "name": "Oregon Health Sciences University",
    },
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Undergraduate Degree",
      "name": "Bachelor of Science in General Science, Minor in Chemistry",
      "educationalLevel": "Bachelor's",
      "recognizedBy": {
        "@type": "CollegeOrUniversity",
        "name": "University of Oregon",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Professional Degree",
      "name": "Doctor of Dental Medicine",
      "abbreviation": "DMD",
      "recognizedBy": {
        "@type": "CollegeOrUniversity",
        "name": "Oregon Health Sciences University",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Continuing Education",
      "name": "Over 1,000 hours of continuing education in Smile Design, Cosmetic Dentistry, and Full Mouth Reconstruction",
    },
  ],
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "NPI",
    "value": "1700144870",
  },
  "knowsAbout": [
    "full mouth reconstruction",
    "cosmetic smile design",
    "occlusion and bite calibration",
    "oral surgery",
    "dental implants",
    "ClearCorrect",
    "tissue grafting",
    "bone grafting",
    "CBCT cone-beam dental imaging",
    "3D diagnostic imaging for implant planning",
  ],
  "sameAs": [
    "https://www.healthgrades.com/dentist/dr-andrew-engel-yyh3w",
    "https://npiregistry.cms.hhs.gov/provider-view/1700144870",
  ],
};

const websiteEntity: JsonLdNode = {
  "@type": "WebSite",
  "@id": "https://livingdentalhealth.com/#website",
  "name": "Living Dental Health",
  "url": "https://livingdentalhealth.com/",
  "inLanguage": "en-US",
  "description":
    "Bend, Oregon dental practice providing general dentistry, cosmetic dentistry, dental implants, oral surgery, ClearCorrect, and preventive dental care.",
  "publisher": {
    "@id": "https://livingdentalhealth.com/#business",
  },
};

// Emitted on EVERY page via app/layout.tsx — NAP only.
export const napStubSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [businessNapStub],
};

// Emitted on the home page only — the full source of truth. On the home
// page this merges with the layout's NAP stub (same @id) into one
// complete #business node; aggregateRating and sameAs live here alone.
export const homeSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    businessFull,
    doctorEntity,
    websiteEntity,
    {
      "@type": "WebPage",
      "@id": "https://livingdentalhealth.com/#webpage",
      "url": "https://livingdentalhealth.com/",
      "name": "Living Dental Health — Family Dentist in Bend, Oregon",
      "description":
        "Customized care, with a gentle touch. Dr. Andy Engel, DMD — a private dental studio serving Central Oregonians age 12+ in Bend since 1998.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/#business" },
      "inLanguage": "en-US",
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
  ],
};

export const contactPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://livingdentalhealth.com/contact#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact",
          "item": "https://livingdentalhealth.com/contact",
        },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": "https://livingdentalhealth.com/contact#contactpage",
      "url": "https://livingdentalhealth.com/contact",
      "name": "Contact Living Dental Health",
      "description":
        "Phone, email, address, and hours for Living Dental Health, a dental practice in Bend, Oregon led by Dr. Andrew W. Engel, DMD.",
      "isPartOf": {
        "@id": "https://livingdentalhealth.com/#website",
      },
      "about": {
        "@id": "https://livingdentalhealth.com/#business",
      },
      "mainEntity": {
        "@id": "https://livingdentalhealth.com/#business",
      },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/contact#breadcrumbs",
      },
      "inLanguage": "en-US",
    },
  ],
};

export const generalDentistryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "General Dentistry",
          "item": "https://livingdentalhealth.com/general-dentistry",
        },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://livingdentalhealth.com/general-dentistry#webpage",
      "url": "https://livingdentalhealth.com/general-dentistry",
      "inLanguage": "en-US",
      "name": "General Dentistry — Living Dental Health, Bend Oregon",
      "description":
        "Cleanings, exams, fillings, crowns, and bridges in Bend, Oregon. Foundational care from Dr. Andy Engel with in-house digital X-rays and 3D CBCT imaging.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": {
        "@id": "https://livingdentalhealth.com/general-dentistry#cleanings",
      },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/general-dentistry#breadcrumbs",
      },
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#cleanings",
      "name": "Dental Cleanings & Exams",
      "description":
        "Professional dental cleaning that removes built-up tartar, checks for early signs of decay, and gives Dr. Engel a chance to catch small problems before they become expensive ones. Recommended every six months; most appointments run about 60 minutes.",
      "url":
        "https://livingdentalhealth.com/general-dentistry#cleanings",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#fillings",
      "name": "Dental Fillings",
      "description":
        "Tooth-colored composite fillings restore a decayed tooth to full function without metal. They bond directly to the tooth structure, look natural, and are completed in a single visit.",
      "url":
        "https://livingdentalhealth.com/general-dentistry#fillings",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#crowns",
      "name": "Dental Crowns",
      "description":
        "A custom-fitted porcelain or ceramic crown that fully covers a damaged or weakened tooth, restoring its shape, strength, and appearance. Used to protect teeth after root canals, repair cracked teeth, or anchor a dental bridge.",
      "url":
        "https://livingdentalhealth.com/general-dentistry#crowns",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#bridges",
      "name": "Dental Bridges",
      "description":
        "A fixed bridge fills the gap left by a missing tooth using the surrounding teeth as anchors. It restores the bite, prevents neighboring teeth from shifting, and looks natural — a reliable non-surgical option for tooth replacement.",
      "url":
        "https://livingdentalhealth.com/general-dentistry#bridges",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#dentures",
      "name": "Dentures",
      "description":
        "Custom-fitted full and partial dentures designed for comfort and function. Implant-supported dentures are available for patients who want a more permanent solution.",
      "url":
        "https://livingdentalhealth.com/general-dentistry#dentures",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://livingdentalhealth.com/general-dentistry#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/general-dentistry#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How often should I get a dental cleaning and exam at Living Dental Health?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "We recommend a professional cleaning and exam every six months. Most appointments run about 60 minutes and include a routine oral cancer screening at no extra cost.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Living Dental Health offer digital X-rays and 3D CBCT imaging in-house?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Digital X-rays are taken on-site for every routine exam. For more complex cases, Dr. Engel uses in-house cone-beam CT (CBCT) — a true three-dimensional scan of the teeth, jaw, and sinuses — without referring patients to an outside imaging center.",
          },
        },
        {
          "@type": "Question",
          "name": "Are tooth-colored fillings safe and how long do they last?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Tooth-colored composite fillings are safe, contain no mercury, and bond directly to the tooth structure. With normal care, composite fillings typically last 7 to 10 years or longer.",
          },
        },
        {
          "@type": "Question",
          "name": "Is Dr. Andy Engel accepting new patients in Bend, Oregon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Living Dental Health is accepting new patients ages 12 and up. Call (541) 550-5311 to schedule a first visit.",
          },
        },
        {
          "@type": "Question",
          "name": "What ages do you treat at Living Dental Health?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Living Dental Health serves patients ages 12 and up — teens, adults, families, and longtime patients alike. Younger children are referred to a pediatric dentist for age-appropriate care.",
          },
        },
      ],
    },
  ],
};

export const implantsSurgeryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Implants & Surgery",
          "item": "https://livingdentalhealth.com/implants-surgery",
        },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://livingdentalhealth.com/implants-surgery#webpage",
      "url": "https://livingdentalhealth.com/implants-surgery",
      "inLanguage": "en-US",
      "name": "Implants & Oral Surgery — Living Dental Health, Bend",
      "description":
        "Dental implants, bone and tissue grafting, wisdom teeth, and in-house CBCT 3D imaging in Bend, Oregon with Dr. Andy Engel. Surgical work handled in-house.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": {
        "@id": "https://livingdentalhealth.com/implants-surgery#implants",
      },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/implants-surgery#breadcrumbs",
      },
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#implants",
      "name": "Dental Implants",
      "description":
        "A titanium post placed directly into the jawbone that fuses with the bone over time and supports a custom crown. Dr. Engel places and restores implants entirely in-house, from initial consultation through the final crown — single tooth or full arch.",
      "url":
        "https://livingdentalhealth.com/implants-surgery#implants",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "howPerformed":
        "Placed and restored in-house by Dr. Engel under local anesthesia.",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#bone-grafting",
      "name": "Bone & Tissue Grafting",
      "description":
        "Grafting rebuilds bone density lost through tooth loss, gum disease, or time so the jaw can support a dental implant. Dr. Engel performs bone and tissue grafting himself, with no separate specialist or additional referral.",
      "url":
        "https://livingdentalhealth.com/implants-surgery#bone-grafting",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#wisdom-teeth",
      "name": "Wisdom Teeth Removal",
      "description":
        "Removal of one or all four wisdom teeth, impacted or straightforward, handled in-office under local anesthesia. Patients are seen promptly and given clear post-op instructions for a smooth recovery.",
      "url":
        "https://livingdentalhealth.com/implants-surgery#wisdom-teeth",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "howPerformed": "Performed in-office under local anesthesia.",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#extractions",
      "name": "Dental Extractions",
      "description":
        "Removal of a tooth that cannot be saved, performed with gentle technique under local anesthesia. Dr. Engel discusses replacement options, including implants, at the time of extraction so patients leave with a clear plan.",
      "url":
        "https://livingdentalhealth.com/implants-surgery#extractions",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#cbct-imaging",
      "name": "CBCT 3D Dental Imaging",
      "alternateName": [
        "Cone Beam Computed Tomography",
        "3D Dental CT Scan",
      ],
      "description":
        "In-house cone-beam CT (CBCT) provides a true three-dimensional image of the teeth, jaw, sinuses, and surrounding structures. Used to plan dental implants with precision, evaluate bone density before grafting, locate impacted wisdom teeth, and catch problems that two-dimensional panoramic X-rays cannot show. Most general dentists refer patients out for CBCT — Dr. Engel performs it here.",
      "url":
        "https://livingdentalhealth.com/implants-surgery#cbct-imaging",
      "procedureType": "https://schema.org/DiagnosticProcedure",
      "bodyLocation": ["Jaw", "Teeth", "Sinuses"],
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://livingdentalhealth.com/implants-surgery#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/implants-surgery#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does Dr. Andy Engel place dental implants in-house?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Dr. Engel places and restores dental implants entirely in-house at Living Dental Health in Bend, Oregon — from the initial CBCT scan and planning through implant placement and the final crown. Patients are not referred to an outside oral surgeon.",
          },
        },
        {
          "@type": "Question",
          "name": "What is CBCT 3D imaging and why does it matter for dental implants?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Cone-beam computed tomography (CBCT) produces a true three-dimensional image of the teeth, jaw, sinuses, and surrounding structures. CBCT lets Dr. Engel plan implant placement to the millimeter, evaluate bone density before grafting, and locate impacted wisdom teeth precisely. Most general dentists in Central Oregon refer patients out for CBCT; Living Dental Health performs it in-house.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Living Dental Health perform bone and tissue grafting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Dr. Engel performs bone and tissue grafting in-house. Grafting is often required before an implant can be placed in an area that has lost bone density due to tooth loss, gum disease, or time.",
          },
        },
        {
          "@type": "Question",
          "name": "Are wisdom teeth extractions handled in the office?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Wisdom teeth removal — one tooth or all four, impacted or straightforward — is one of the most common surgical procedures performed at Living Dental Health, handled in-office under local anesthesia. Patients are seen promptly and given clear post-op care instructions.",
          },
        },
        {
          "@type": "Question",
          "name": "Will I be referred to an outside specialist for surgery?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Most of the surgical work general dentists refer out — implants, bone grafting, tissue grafting, extractions, wisdom teeth — Dr. Engel performs in-house. The exception is endodontics (root canals), which are referred to a trusted endodontist in Bend.",
          },
        },
      ],
    },
  ],
};

export const cosmeticDentistryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cosmetic Dentistry",
          "item": "https://livingdentalhealth.com/cosmetic-dentistry",
        },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://livingdentalhealth.com/cosmetic-dentistry#webpage",
      "url": "https://livingdentalhealth.com/cosmetic-dentistry",
      "inLanguage": "en-US",
      "name": "Cosmetic Dentistry — Living Dental Health, Bend Oregon",
      "description":
        "Teeth whitening, porcelain veneers, ClearCorrect, smile design, and full mouth reconstruction with Dr. Andy Engel in Bend, Oregon. No upsell, ever.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": {
        "@id": "https://livingdentalhealth.com/cosmetic-dentistry#veneers",
      },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/cosmetic-dentistry#breadcrumbs",
      },
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#whitening",
      "name": "Teeth Whitening",
      "description":
        "Professional teeth whitening — prescription-strength whitening, custom bleaching, and other custom options — brightening the smile several shades in a controlled, safe process; results over-the-counter products can’t match.",
      "url":
        "https://livingdentalhealth.com/cosmetic-dentistry#whitening",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#veneers",
      "name": "Porcelain Veneers",
      "description":
        "Ultra-thin custom-crafted porcelain shells bonded to the front of the teeth to permanently correct chips, discoloration, gaps, and uneven shapes. Each veneer is designed to complement the patient’s facial features and natural tooth color.",
      "url":
        "https://livingdentalhealth.com/cosmetic-dentistry#veneers",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#bonding",
      "name": "Dental Bonding",
      "description":
        "Tooth-colored resin applied and sculpted directly onto a chipped, cracked, discolored, or misaligned tooth, then polished to a natural finish — often in a single visit. Mercury-free and conservative.",
      "url":
        "https://livingdentalhealth.com/cosmetic-dentistry#bonding",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#clearcorrect",
      "name": "ClearCorrect Clear Aligners",
      "description":
        "Custom-fitted removable clear aligners that gradually shift the teeth with no metal or wires. Dr. Engel has provided clear aligner therapy since 2001, is a certified ClearCorrect provider, and manages the entire process in-house, typically over 12–18 months.",
      "url":
        "https://livingdentalhealth.com/cosmetic-dentistry#clearcorrect",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#smile-design",
      "name": "Smile Design",
      "description":
        "The planning process behind a complete cosmetic transformation, led by Dr. Engel, who has practiced cosmetic dentistry since 1999. He evaluates the teeth, gums, bite, and facial proportions and coordinates whitening, veneers, bonding, crowns, or ClearCorrect into a single harmonious plan.",
      "url":
        "https://livingdentalhealth.com/cosmetic-dentistry#smile-design",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/cosmetic-dentistry#reconstruction",
      "name": "Full Mouth Reconstruction",
      "description":
        "A coordinated rebuild of the entire mouth for patients with significant damage, bone loss, missing teeth, or severe bite issues. Drawing on advanced OHSU training, Dr. Engel combines implants, bone grafting, crowns, veneers, and orthodontia in-house — the complex case most dentists refer out.",
      "url":
        "https://livingdentalhealth.com/cosmetic-dentistry#reconstruction",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "provider": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://livingdentalhealth.com/cosmetic-dentistry#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/cosmetic-dentistry#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does Dr. Engel offer cosmetic dentistry in Bend Oregon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Dr. Andrew Engel at Living Dental Health provides cosmetic dentistry including teeth whitening, porcelain veneers, dental bonding, ClearCorrect clear aligners, smile design, and full mouth reconstruction at 930 SW Yates Dr, Bend OR 97702.",
          },
        },
        {
          "@type": "Question",
          "name":
            "What is ClearCorrect and how is it different from Invisalign?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "ClearCorrect was developed by the founders of Invisalign who left to build a product they believed was better. Dr. Engel is a certified ClearCorrect provider and manages the entire process in-house.",
          },
        },
        {
          "@type": "Question",
          "name":
            "Does Living Dental Health offer full mouth reconstruction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Dr. Engel completed advanced training at Oregon Health Sciences University in full mouth reconstruction and oral surgery. He performs complex reconstructive cases in-house including bone and tissue grafting, implants, crowns, and veneers.",
          },
        },
      ],
    },
  ],
};

export const patientInfoPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://livingdentalhealth.com/patient-info#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "New Patients",
          "item": "https://livingdentalhealth.com/patient-info",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://livingdentalhealth.com/patient-info#webpage",
      "url": "https://livingdentalhealth.com/patient-info",
      "name": "New Patients — Living Dental Health, Bend Oregon",
      "description":
        "What new patients need to know before a first visit to Living Dental Health, Bend Oregon — scheduling, insurance, financing, and the in-office plan.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/patient-info#faq" },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/patient-info#breadcrumbs",
      },
      "inLanguage": "en-US",
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://livingdentalhealth.com/patient-info#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/patient-info#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Living Dental Health accepting new patients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Living Dental Health welcomes new patients at 930 SW Yates Dr, Bend OR 97702. Call (541) 550-5311 to schedule your first visit.",
          },
        },
        {
          "@type": "Question",
          "name":
            "What should I bring to my first dental appointment at Living Dental Health?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Bring any recent dental x-rays, a list of current medications, your insurance card, and completed forms if applicable. A parent or guardian must accompany patients under 18.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Living Dental Health accept dental insurance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Living Dental Health is in-network with multiple dental insurance plans and accepts out-of-network patients as well.",
          },
        },
        {
          "@type": "Question",
          "name": "What if I don't have dental insurance?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Living Dental Health offers an in-office dental plan for patients without insurance, covering preventive care and more comprehensive treatment options. Call (541) 550-5311 to learn more.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Living Dental Health offer financing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. CareCredit financing is available for larger treatment plans. Most major credit cards are also accepted.",
          },
        },
      ],
    },
  ],
};

export const articlesPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://livingdentalhealth.com/articles#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Articles",
          "item": "https://livingdentalhealth.com/articles",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://livingdentalhealth.com/articles#webpage",
      "url": "https://livingdentalhealth.com/articles",
      "name": "Articles — Living Dental Health, Bend Oregon",
      "description":
        "Practical dental health information from Dr. Andy Engel and the Living Dental Health team in Bend, Oregon.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/articles#blog" },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/articles#breadcrumbs",
      },
      "inLanguage": "en-US",
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "Blog",
      "@id": "https://livingdentalhealth.com/articles#blog",
      "name": "Living Dental Health Articles",
      "url": "https://livingdentalhealth.com/articles",
      "description":
        "Practical dental health information from Dr. Andy Engel and the Living Dental Health team in Bend, Oregon.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
  ],
};

export function articlePostSchema(input: {
  slug: string;
  title: string;
  excerpt: string;
  datePublished: string;
  dateModified: string;
  featuredImage: string;
}): JsonLdGraph {
  const url = `https://livingdentalhealth.com/articles/${input.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumbs`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://livingdentalhealth.com/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Articles",
            "item": "https://livingdentalhealth.com/articles",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": input.title,
            "item": url,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "headline": input.title,
        "description": input.excerpt,
        "datePublished": input.datePublished,
        "dateModified": input.dateModified,
        "url": url,
        "image": input.featuredImage,
        "mainEntityOfPage": url,
        "inLanguage": "en-US",
        "isPartOf": { "@id": "https://livingdentalhealth.com/articles#blog" },
        "author": { "@id": "https://livingdentalhealth.com/#doctor" },
        "publisher": { "@id": "https://livingdentalhealth.com/#business" },
      },
    ],
  };
}

export const fullMouthReconstructionPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/full-mouth-reconstruction#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Full Mouth Reconstruction",
          "item":
            "https://livingdentalhealth.com/full-mouth-reconstruction",
        },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id":
        "https://livingdentalhealth.com/full-mouth-reconstruction#webpage",
      "url": "https://livingdentalhealth.com/full-mouth-reconstruction",
      "inLanguage": "en-US",
      "name": "Full Mouth Reconstruction — Living Dental Health, Bend",
      "description":
        "Full mouth reconstruction in Bend, Oregon with Dr. Andy Engel. Over 1,000 CE hours and precision planning that protects your bite, jaw, and oral health.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": {
        "@id":
          "https://livingdentalhealth.com/full-mouth-reconstruction#procedure",
      },
      "breadcrumb": {
        "@id":
          "https://livingdentalhealth.com/full-mouth-reconstruction#breadcrumbs",
      },
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/full-mouth-reconstruction#procedure",
      "name": "Full Mouth Reconstruction",
      "description":
        "Comprehensive rebuild of teeth, bite, and oral function for patients with severe wear, multiple missing teeth, or failed past dental work. Performed in-house by Dr. Andy Engel, who trained directly alongside a prosthodontist in occlusion and bite architecture — the discipline that determines whether a reconstruction lasts for decades — and has completed over 1,000 hours of continuing education focused on smile design, cosmetic dentistry, and full mouth reconstruction. Diagnostic planning uses in-house CBCT 3D imaging for precise mapping of teeth, bite, and bone, and implant placement uses custom surgical guides designed and 3D-printed in-house for accurate positioning. Crown and veneer fabrication includes custom shade matching with the dental laboratory when needed.",
      "url":
        "https://livingdentalhealth.com/full-mouth-reconstruction",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "bodyLocation": "Mouth",
      "provider": { "@id": "https://livingdentalhealth.com/#business" },
      "performer": { "@id": "https://livingdentalhealth.com/#doctor" },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://livingdentalhealth.com/full-mouth-reconstruction#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/full-mouth-reconstruction#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is full mouth reconstruction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Full mouth reconstruction is a comprehensive process of rebuilding the teeth, bite, and oral function for patients with severe wear, multiple missing teeth, bone loss, or failed past dental work. It commonly combines dental implants, bone and tissue grafting, crowns, veneers, and precise bite calibration into a coordinated treatment plan.",
          },
        },
        {
          "@type": "Question",
          "name": "Does Dr. Andy Engel perform full mouth reconstruction in Bend, Oregon?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Dr. Andy Engel performs full mouth reconstruction in-house at Living Dental Health in Bend, Oregon. He has completed advanced training at Oregon Health Sciences University and over 1,000 hours of continuing education in smile design, cosmetic dentistry, and full mouth reconstruction.",
          },
        },
        {
          "@type": "Question",
          "name": "Why does precision matter in full mouth reconstruction?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "A poorly executed reconstruction can cause TMJ pain, chronic headaches, speech difficulties, and chewing problems. The bite must be calibrated with precision so the new teeth function in harmony with the jaw joints, muscles, and surrounding teeth. This is why Dr. Engel approaches each case as a planning exercise before any treatment begins.",
          },
        },
      ],
    },
  ],
};

export const sedationDentistryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/sedation-dentistry#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Sedation Dentistry",
          "item":
            "https://livingdentalhealth.com/sedation-dentistry",
        },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://livingdentalhealth.com/sedation-dentistry#webpage",
      "url": "https://livingdentalhealth.com/sedation-dentistry",
      "inLanguage": "en-US",
      "name": "Sedation Dentistry — Living Dental Health, Bend Oregon",
      "description":
        "Mild oral Halcion sedation for anxious patients and oral surgery in Bend, Oregon. Calm pace, gentle approach, out of your system in about 24 hours.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": {
        "@id": "https://livingdentalhealth.com/sedation-dentistry#procedure",
      },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/sedation-dentistry#breadcrumbs",
      },
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/sedation-dentistry#procedure",
      "name": "Sedation Dentistry",
      "alternateName": "Oral Sedation Dentistry",
      "description":
        "Mild oral sedation with Halcion (triazolam) for patients with dental anxiety, those scheduled for oral surgery, or anyone who would prefer a more relaxed visit. Used selectively at Living Dental Health alongside a calm, unhurried approach to every appointment. Halcion is fully cleared from the system within about 24 hours.",
      "url":
        "https://livingdentalhealth.com/sedation-dentistry",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "drug": {
        "@type": "Drug",
        "name": "Halcion",
        "alternateName": "triazolam",
      },
      "provider": { "@id": "https://livingdentalhealth.com/#business" },
      "performer": { "@id": "https://livingdentalhealth.com/#doctor" },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://livingdentalhealth.com/sedation-dentistry#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/sedation-dentistry#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Halcion and how does it work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Halcion is the brand name for triazolam, a mild oral sedative in the benzodiazepine class. You take it as a pill before your appointment so you arrive already relaxed. You stay conscious and can respond to instructions, but most patients feel calm enough to rest comfortably — many end up taking a cozy nap in the chair.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does Halcion stay in my system?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Halcion is short-acting and generally clears your body within about 24 hours. You'll feel like yourself by the next day. Don't drive, operate machinery, or make important decisions for the rest of the day after taking it.",
          },
        },
        {
          "@type": "Question",
          "name": "Will I need someone to drive me home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Because Halcion is active for several hours after the appointment, every patient who takes oral sedation needs a responsible adult to drive them to and from Living Dental Health and stay with them for the rest of the day.",
          },
        },
      ],
    },
  ],
};

export const oralCancerScreeningPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/oral-cancer-screening#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Oral Cancer Screening",
          "item":
            "https://livingdentalhealth.com/oral-cancer-screening",
        },
      ],
    },
    {
      "@type": "MedicalWebPage",
      "@id": "https://livingdentalhealth.com/oral-cancer-screening#webpage",
      "url": "https://livingdentalhealth.com/oral-cancer-screening",
      "inLanguage": "en-US",
      "name": "Oral Cancer Screening — Living Dental Health, Bend Oregon",
      "description":
        "Routine oral cancer screening at every cleaning at Living Dental Health, Bend Oregon. Painless, one minute, and dramatically improves early outcomes.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": {
        "@id":
          "https://livingdentalhealth.com/oral-cancer-screening#procedure",
      },
      "breadcrumb": {
        "@id":
          "https://livingdentalhealth.com/oral-cancer-screening#breadcrumbs",
      },
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://livingdentalhealth.com/oral-cancer-screening#procedure",
      "name": "Oral Cancer Screening",
      "description":
        "Routine oral cancer screening performed at every cleaning and exam at Living Dental Health in Bend, Oregon. A short, painless visual and physical examination of the lips, tongue, cheeks, palate, throat, and neck to identify early signs of oral or oropharyngeal cancer when it is most treatable.",
      "url":
        "https://livingdentalhealth.com/oral-cancer-screening",
      "procedureType": "https://schema.org/DiagnosticProcedure",
      "bodyLocation": ["Mouth", "Throat", "Neck"],
      "provider": { "@id": "https://livingdentalhealth.com/#business" },
      "performer": { "@id": "https://livingdentalhealth.com/#doctor" },
    },
    {
      "@type": "FAQPage",
      "@id":
        "https://livingdentalhealth.com/oral-cancer-screening#faq",
      "isPartOf": { "@id": "https://livingdentalhealth.com/oral-cancer-screening#webpage" },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is oral cancer screening part of a normal dental exam?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. At Living Dental Health, oral cancer screening is part of every routine cleaning and exam. Most patients aren't aware it's happening — it's built into the normal visit.",
          },
        },
        {
          "@type": "Question",
          "name": "What does the dentist look for during an oral cancer screening?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Dr. Engel and the hygiene team look for sores that haven't healed, white or red patches, lumps or thickening of tissue, unusual asymmetry, and any changes in the lips, tongue, cheeks, palate, throat, or neck. The exam includes both visual inspection and gentle palpation.",
          },
        },
        {
          "@type": "Question",
          "name": "Does an oral cancer screening hurt?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "No. The screening is painless and takes about one to two minutes. It's a visual examination combined with gentle palpation of the tissues in and around the mouth and neck.",
          },
        },
        {
          "@type": "Question",
          "name": "Who is at higher risk for oral cancer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Tobacco use of any kind, heavy alcohol use, HPV infection, prolonged sun exposure to the lips, and being over age 40 are all risk factors. That said, oral cancer can occur in patients with no risk factors at all, which is why routine screening matters for everyone.",
          },
        },
      ],
    },
  ],
};

export const aboutPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://livingdentalhealth.com/about#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Meet Dr. Engel",
          "item": "https://livingdentalhealth.com/about",
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://livingdentalhealth.com/about#aboutpage",
      "url": "https://livingdentalhealth.com/about",
      "name": "Meet Dr. Andy Engel — Living Dental Health",
      "description":
        "Dr. Andrew W. Engel DMD is the founder of Living Dental Health in Bend, Oregon. OHSU graduate with a chemistry minor from the University of Oregon and over 1,000 hours of continuing education in smile design, cosmetic dentistry, and full mouth reconstruction.",
      "isPartOf": {
        "@id": "https://livingdentalhealth.com/#website",
      },
      "about": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
      "mainEntity": {
        "@id": "https://livingdentalhealth.com/#doctor",
      },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/about#breadcrumbs",
      },
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
  ],
};

// Team page: AboutPage + Person entities for the team + Review entities
// for the patient testimonials displayed on the page.
export const teamPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://livingdentalhealth.com/team#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "The Team",
          "item": "https://livingdentalhealth.com/team",
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://livingdentalhealth.com/team#aboutpage",
      "url": "https://livingdentalhealth.com/team",
      "name": "Meet the Team — Living Dental Health",
      "description":
        "Meet Dr. Andy Engel and the Living Dental Health team in Bend, Oregon — hygienists, dental assistant, office manager, and operations.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/#business" },
      "breadcrumb": { "@id": "https://livingdentalhealth.com/team#breadcrumbs" },
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "Person",
      "@id": "https://livingdentalhealth.com/team#samantha-gassman",
      "name": "Samantha Gassman",
      "jobTitle": "Office Manager",
      "worksFor": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "Person",
      "@id": "https://livingdentalhealth.com/team#francie-engel",
      "name": "Francie Engel",
      "jobTitle": "Operations Administrator",
      "worksFor": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "Person",
      "@id": "https://livingdentalhealth.com/team#nicole-tarpey",
      "name": "Nicole Tarpey",
      "jobTitle": "Dental Hygienist",
      "worksFor": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "Person",
      "@id": "https://livingdentalhealth.com/team#sacha-lodge",
      "name": "Sacha Lodge",
      "jobTitle": "Dental Hygienist",
      "worksFor": { "@id": "https://livingdentalhealth.com/#business" },
    },
    {
      "@type": "Person",
      "@id": "https://livingdentalhealth.com/team#christy-spencer",
      "name": "Christy Spencer",
      "jobTitle": "Dental Assistant",
      "worksFor": { "@id": "https://livingdentalhealth.com/#business" },
    },
  ],
};

export const postOpPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/patient-info/post-op#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Patient Info",
          "item": "https://livingdentalhealth.com/patient-info",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Post-Op Instructions",
          "item":
            "https://livingdentalhealth.com/patient-info/post-op",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id":
        "https://livingdentalhealth.com/patient-info/post-op#webpage",
      "url": "https://livingdentalhealth.com/patient-info/post-op",
      "name": "Post-Op Instructions — Living Dental Health",
      "description":
        "After-care instructions following dental procedures at Living Dental Health in Bend, Oregon — covering extractions, dental implants, bone and tissue grafting, and routine care.",
      "isPartOf": {
        "@id": "https://livingdentalhealth.com/#website",
      },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/#business" },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/patient-info/post-op#breadcrumbs",
      },
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://livingdentalhealth.com/#business",
      },
    },
  ],
};

export const beforeAndAfterPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://livingdentalhealth.com/before-and-after#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "The Work",
          "item": "https://livingdentalhealth.com/before-and-after",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id":
        "https://livingdentalhealth.com/before-and-after#collectionpage",
      "url": "https://livingdentalhealth.com/before-and-after",
      "name": "The Work — Before & After Cases",
      "description":
        "Real before-and-after dental cases from Dr. Andy Engel at Living Dental Health in Bend, Oregon — porcelain veneers, crowns, and full mouth reconstruction, planned and finished in-house.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/#business" },
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/before-and-after#breadcrumbs",
      },
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://livingdentalhealth.com/#business",
      },
      "hasPart": [
        { "@id": "https://livingdentalhealth.com/before-and-after#case-01" },
        { "@id": "https://livingdentalhealth.com/before-and-after#case-02" },
        { "@id": "https://livingdentalhealth.com/before-and-after#case-03" },
        { "@id": "https://livingdentalhealth.com/before-and-after#case-04" },
        { "@id": "https://livingdentalhealth.com/before-and-after#case-05" },
        { "@id": "https://livingdentalhealth.com/before-and-after#case-06" },
      ],
    },
    {
      "@type": "ImageObject",
      "@id": "https://livingdentalhealth.com/before-and-after#case-01",
      "contentUrl": "https://livingdentalhealth.com/case-01.webp",
      "name": "Case 01",
      "caption":
        "Before and after porcelain veneers by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 01",
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "creditText": "Dr. Andy Engel, Living Dental Health",
      "isPartOf": {
        "@id":
          "https://livingdentalhealth.com/before-and-after#collectionpage",
      },
    },
    {
      "@type": "ImageObject",
      "@id": "https://livingdentalhealth.com/before-and-after#case-02",
      "contentUrl": "https://livingdentalhealth.com/case-02.webp",
      "name": "Case 02",
      "caption":
        "Before and after full mouth reconstruction by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 02",
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "creditText": "Dr. Andy Engel, Living Dental Health",
      "isPartOf": {
        "@id":
          "https://livingdentalhealth.com/before-and-after#collectionpage",
      },
    },
    {
      "@type": "ImageObject",
      "@id": "https://livingdentalhealth.com/before-and-after#case-03",
      "contentUrl": "https://livingdentalhealth.com/case-03.webp",
      "name": "Case 03",
      "caption":
        "Before and after porcelain crowns by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 03",
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "creditText": "Dr. Andy Engel, Living Dental Health",
      "isPartOf": {
        "@id":
          "https://livingdentalhealth.com/before-and-after#collectionpage",
      },
    },
    {
      "@type": "ImageObject",
      "@id": "https://livingdentalhealth.com/before-and-after#case-04",
      "contentUrl": "https://livingdentalhealth.com/case-04.webp",
      "name": "Case 04",
      "caption":
        "Before and after porcelain crowns by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 04",
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "creditText": "Dr. Andy Engel, Living Dental Health",
      "isPartOf": {
        "@id":
          "https://livingdentalhealth.com/before-and-after#collectionpage",
      },
    },
    {
      "@type": "ImageObject",
      "@id": "https://livingdentalhealth.com/before-and-after#case-05",
      "contentUrl": "https://livingdentalhealth.com/case-05.webp",
      "name": "Case 05",
      "caption":
        "Before and after full mouth reconstruction by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 05",
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "creditText": "Dr. Andy Engel, Living Dental Health",
      "isPartOf": {
        "@id":
          "https://livingdentalhealth.com/before-and-after#collectionpage",
      },
    },
    {
      "@type": "ImageObject",
      "@id": "https://livingdentalhealth.com/before-and-after#case-06",
      "contentUrl": "https://livingdentalhealth.com/case-06.webp",
      "name": "Case 06",
      "caption":
        "Before and after crowns and veneers by Dr. Andy Engel at Living Dental Health in Bend, Oregon — Case 06",
      "creator": { "@id": "https://livingdentalhealth.com/#doctor" },
      "creditText": "Dr. Andy Engel, Living Dental Health",
      "isPartOf": {
        "@id":
          "https://livingdentalhealth.com/before-and-after#collectionpage",
      },
    },
  ],
};

export const privacyPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://livingdentalhealth.com/privacy#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://livingdentalhealth.com/privacy",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://livingdentalhealth.com/privacy#webpage",
      "url": "https://livingdentalhealth.com/privacy",
      "name": "Privacy Policy — Living Dental Health, Bend Oregon",
      "description":
        "How Living Dental Health collects, uses, and protects patient information.",
      "isPartOf": { "@id": "https://livingdentalhealth.com/#website" },
      "about": { "@id": "https://livingdentalhealth.com/#business" },
      "mainEntity": { "@id": "https://livingdentalhealth.com/#business" },
      "breadcrumb": {
        "@id": "https://livingdentalhealth.com/privacy#breadcrumbs",
      },
      "inLanguage": "en-US",
      "publisher": { "@id": "https://livingdentalhealth.com/#business" },
    },
  ],
};

