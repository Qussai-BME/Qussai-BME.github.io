/** Injects a JSON-LD <script> tag for structured data. Removed on unmount so tags don't accumulate across route changes. */
import { useEffect } from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [data]);
  return null;
}

const SITE_URL = "https://qussai-bme.github.io";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Qussai Adlbi",
  jobTitle: "Biomedical Engineering Student & Emerging Researcher",
  url: SITE_URL,
  email: "mailto:adlbiqussai@gmail.com",
  sameAs: [
    "https://github.com/Qussai-BME",
    "https://www.linkedin.com/in/qussai-adlbi-bme/",
    "https://orcid.org/0009-0000-7667-1992",
    "https://scholar.google.com/citations?user=nKaW0H4AAAAJ&hl=en",
    "https://www.researchgate.net/profile/Qussai-Adlbi",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Al-Andalus University for Medical Sciences",
  },
  knowsAbout: ["Biomedical Engineering", "Biosignal Processing", "sEMG", "EEG", "Brain-Computer Interfaces", "Cross-Subject Generalisation", "Machine Learning"],
};

export function scholarlyArticleSchema(opts: { title: string; description: string; status: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: opts.title,
    abstract: opts.description,
    creativeWorkStatus: opts.status,
    author: { "@type": "Person", name: "Qussai Adlbi", url: SITE_URL },
    url: `${SITE_URL}/research/${opts.slug}`,
    isPartOf: { "@type": "ResearchProject", name: "Human Motor Intelligence" },
  };
}

export function softwareSchema(opts: { name: string; description: string; codeRepository?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: opts.name,
    description: opts.description,
    author: { "@type": "Person", name: "Qussai Adlbi", url: SITE_URL },
    codeRepository: opts.codeRepository,
    isPartOf: { "@type": "ResearchProject", name: "Human Motor Intelligence" },
  };
}

export const researchProjectSchema = {
  "@context": "https://schema.org",
  "@type": "ResearchProject",
  name: "Human Motor Intelligence",
  description: "A research programme investigating reliable, zero-calibration, cross-subject decoding of human motor intent from biosignals — sEMG, EEG, multimodal fusion, and simulated systems.",
  url: SITE_URL,
  founder: { "@type": "Person", name: "Qussai Adlbi" },
};
