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
  "@id": "https://www.livingdentalhealth.com/#business",
  "name": "Living Dental Health",
  "url": "https://www.livingdentalhealth.com",
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
    "https://www.livingdentalhealth.com/images/living-dental-health-office.jpg",
  "logo": {
    "@type": "ImageObject",
    "@id": "https://www.livingdentalhealth.com/#logo",
    "url": "https://www.livingdentalhealth.com/images/living-dental-health-logo.png",
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
  "@type": "Dentist",
  "@id": "https://www.livingdentalhealth.com/#doctor",
  "name": "Andrew W. Engel DMD",
  "alternateName": ["Dr. Andy Engel", "Dr. Andrew Engel"],
  "jobTitle": "Dentist",
  "medicalSpecialty": ["Oral Surgery", "Dental Implants"],
  "description":
    "Dr. Andrew W. Engel is the founder of Living Dental Health in Bend, Oregon, and has cared for Bend families since 1998. A graduate of Oregon Health Sciences University School of Dentistry, he completed advanced training in full mouth reconstruction, oral surgery, dental implants, ClearCorrect, and tissue and bone grafting, offering comprehensive care under one roof. In 28 years of practice he has become one of Central Oregon's most trusted dentists for complex cases.",
  "url": "https://www.livingdentalhealth.com/about",
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
  "identifier": {
    "@type": "PropertyValue",
    "propertyID": "NPI",
    "value": "1700144870",
  },
  "knowsAbout": [
    "full mouth reconstruction",
    "oral surgery",
    "dental implants",
    "ClearCorrect",
    "tissue grafting",
    "bone grafting",
  ],
  "sameAs": [
    "https://www.healthgrades.com/dentist/dr-andrew-engel-yyh3w",
    "https://npiregistry.cms.hhs.gov/provider-view/1700144870",
  ],
};

const websiteEntity: JsonLdNode = {
  "@type": "WebSite",
  "@id": "https://www.livingdentalhealth.com/#website",
  "name": "Living Dental Health",
  "url": "https://www.livingdentalhealth.com",
  "description":
    "Bend, Oregon dental practice providing general dentistry, cosmetic dentistry, dental implants, oral surgery, ClearCorrect, and preventive dental care.",
  "publisher": {
    "@id": "https://www.livingdentalhealth.com/#business",
  },
};

const faqEntity: JsonLdNode = {
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
  "@graph": [businessFull, doctorEntity, websiteEntity, faqEntity],
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

export const generalDentistryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.livingdentalhealth.com/general-dentistry#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "General Dentistry",
          "item": "https://www.livingdentalhealth.com/general-dentistry",
        },
      ],
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/general-dentistry#cleanings",
      "name": "Dental Cleanings & Exams",
      "description":
        "Professional dental cleaning that removes built-up tartar, checks for early signs of decay, and gives Dr. Engel a chance to catch small problems before they become expensive ones. Recommended every six months; most appointments run about 60 minutes.",
      "url":
        "https://www.livingdentalhealth.com/general-dentistry#cleanings",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/general-dentistry#fillings",
      "name": "Dental Fillings",
      "description":
        "Tooth-colored composite fillings restore a decayed tooth to full function without metal. They bond directly to the tooth structure, look natural, and are completed in a single visit.",
      "url":
        "https://www.livingdentalhealth.com/general-dentistry#fillings",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/general-dentistry#crowns",
      "name": "Dental Crowns",
      "description":
        "A custom-fitted porcelain or ceramic crown that fully covers a damaged or weakened tooth, restoring its shape, strength, and appearance. Used to protect teeth after root canals, repair cracked teeth, or anchor a dental bridge.",
      "url":
        "https://www.livingdentalhealth.com/general-dentistry#crowns",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/general-dentistry#bridges",
      "name": "Dental Bridges",
      "description":
        "A fixed bridge fills the gap left by a missing tooth using the surrounding teeth as anchors. It restores the bite, prevents neighboring teeth from shifting, and looks natural — a reliable non-surgical option for tooth replacement.",
      "url":
        "https://www.livingdentalhealth.com/general-dentistry#bridges",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/general-dentistry#dentures",
      "name": "Dentures",
      "description":
        "Custom-fitted full and partial dentures designed for comfort and function. Implant-supported dentures are available for patients who want a more permanent solution.",
      "url":
        "https://www.livingdentalhealth.com/general-dentistry#dentures",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#business",
      },
    },
  ],
};

export const implantsSurgeryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.livingdentalhealth.com/implants-surgery#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Implants & Surgery",
          "item": "https://www.livingdentalhealth.com/implants-surgery",
        },
      ],
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/implants-surgery#implants",
      "name": "Dental Implants",
      "description":
        "A titanium post placed directly into the jawbone that fuses with the bone over time and supports a custom crown. Dr. Engel places and restores implants entirely in-house, from initial consultation through the final crown — single tooth or full arch.",
      "url":
        "https://www.livingdentalhealth.com/implants-surgery#implants",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "howPerformed":
        "Placed and restored in-house by Dr. Engel under local anesthesia.",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/implants-surgery#bone-grafting",
      "name": "Bone & Tissue Grafting",
      "description":
        "Grafting rebuilds bone density lost through tooth loss, gum disease, or time so the jaw can support a dental implant. Dr. Engel performs bone and tissue grafting himself, with no separate specialist or additional referral.",
      "url":
        "https://www.livingdentalhealth.com/implants-surgery#bone-grafting",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/implants-surgery#wisdom-teeth",
      "name": "Wisdom Teeth Removal",
      "description":
        "Removal of one or all four wisdom teeth, impacted or straightforward, handled in-office under local anesthesia. Patients are seen promptly and given clear post-op instructions for a smooth recovery.",
      "url":
        "https://www.livingdentalhealth.com/implants-surgery#wisdom-teeth",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "howPerformed": "Performed in-office under local anesthesia.",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/implants-surgery#extractions",
      "name": "Dental Extractions",
      "description":
        "Removal of a tooth that cannot be saved, performed with gentle technique under local anesthesia. Dr. Engel discusses replacement options, including implants, at the time of extraction so patients leave with a clear plan.",
      "url":
        "https://www.livingdentalhealth.com/implants-surgery#extractions",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
  ],
};

export const cosmeticDentistryPageSchema: JsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cosmetic Dentistry",
          "item": "https://www.livingdentalhealth.com/cosmetic-dentistry",
        },
      ],
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#whitening",
      "name": "Teeth Whitening",
      "description":
        "Professional in-office whitening that brightens the smile several shades in a single visit using a controlled, safe process — results over-the-counter products can’t match.",
      "url":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#whitening",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#veneers",
      "name": "Porcelain Veneers",
      "description":
        "Ultra-thin custom-crafted porcelain shells bonded to the front of the teeth to permanently correct chips, discoloration, gaps, and uneven shapes. Each veneer is designed to complement the patient’s facial features and natural tooth color.",
      "url":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#veneers",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#bonding",
      "name": "Dental Bonding",
      "description":
        "Tooth-colored resin applied and sculpted directly onto a chipped, cracked, discolored, or misaligned tooth, then polished to a natural finish — often in a single visit. Mercury-free and conservative.",
      "url":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#bonding",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#clearcorrect",
      "name": "ClearCorrect Clear Aligners",
      "description":
        "Custom-fitted removable clear aligners that gradually shift the teeth with no metal or wires. Dr. Engel is a certified ClearCorrect provider and manages the entire process in-house, typically over 12–18 months.",
      "url":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#clearcorrect",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#smile-design",
      "name": "Smile Design",
      "description":
        "The planning process behind a complete cosmetic transformation. Dr. Engel evaluates the teeth, gums, bite, and facial proportions and coordinates whitening, veneers, bonding, crowns, or ClearCorrect into a single harmonious plan.",
      "url":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#smile-design",
      "procedureType": "https://schema.org/TherapeuticProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "MedicalProcedure",
      "@id":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#reconstruction",
      "name": "Full Mouth Reconstruction",
      "description":
        "A coordinated rebuild of the entire mouth for patients with significant damage, bone loss, missing teeth, or severe bite issues. Drawing on advanced OHSU training, Dr. Engel combines implants, bone grafting, crowns, veneers, and orthodontia in-house — the complex case most dentists refer out.",
      "url":
        "https://www.livingdentalhealth.com/cosmetic-dentistry#reconstruction",
      "procedureType": "https://schema.org/SurgicalProcedure",
      "provider": {
        "@id": "https://www.livingdentalhealth.com/#doctor",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.livingdentalhealth.com/cosmetic-dentistry#faq",
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
      "@id": "https://www.livingdentalhealth.com/patient-info#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "New Patients",
          "item": "https://www.livingdentalhealth.com/patient-info",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.livingdentalhealth.com/patient-info#faq",
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
      "@id": "https://www.livingdentalhealth.com/articles#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.livingdentalhealth.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Articles",
          "item": "https://www.livingdentalhealth.com/articles",
        },
      ],
    },
    {
      "@type": "Blog",
      "@id": "https://www.livingdentalhealth.com/articles#blog",
      "name": "Living Dental Health Articles",
      "url": "https://www.livingdentalhealth.com/articles",
      "description":
        "Practical dental health information from Dr. Andy Engel and the Living Dental Health team in Bend, Oregon.",
      "publisher": {
        "@id": "https://www.livingdentalhealth.com/#business",
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
  const url = `https://www.livingdentalhealth.com/articles/${input.slug}`;
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
            "item": "https://www.livingdentalhealth.com/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Articles",
            "item": "https://www.livingdentalhealth.com/articles",
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
        "mainEntityOfPage": { "@id": url },
        "isPartOf": { "@id": "https://www.livingdentalhealth.com/articles#blog" },
        "author": { "@id": "https://www.livingdentalhealth.com/#doctor" },
        "publisher": { "@id": "https://www.livingdentalhealth.com/#business" },
      },
    ],
  };
}
