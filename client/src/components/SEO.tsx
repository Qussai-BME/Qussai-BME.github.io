/**
 * Lightweight, dependency-free per-page SEO: sets document.title, meta description,
 * canonical URL, and Open Graph tags on route change. No react-helmet needed for a
 * site this size — this keeps the bundle smaller and the behaviour easy to audit.
 */
import { useEffect } from "react";

const SITE_URL = "https://qussai-bme.github.io";
const SITE_NAME = "Qussai Adlbi — Biomedical Engineering Researcher";

function setMeta(selector: string, attr: string, value: string, content: string) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  if (el.tagName === "LINK") el.setAttribute("href", content);
  else el.setAttribute("content", content);
}

export function SEO({ title, description, path }: { title: string; description: string; path: string }) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} — Qussai Adlbi`;
    document.title = fullTitle;
    const url = `${SITE_URL}${path}`;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:type"]', "property", "og:type", "website");
    setMeta('link[rel="canonical"]', "rel", "canonical", url);
  }, [title, description, path]);
  return null;
}
