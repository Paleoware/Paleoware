"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import esMessages from "@/messages/es.json";
import enMessages from "@/messages/en.json";

const messages = { es: esMessages, en: enMessages } as const;

function detectLocale(): "es" | "en" {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem("paleoware-locale");
  if (saved === "es" || saved === "en") return saved;
  return navigator.language.startsWith("en") ? "en" : "es";
}

export default function NotFound() {
  const [locale, setLocale] = useState<"es" | "en">(detectLocale);

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem("paleoware-locale");
      if (saved === "es" || saved === "en") setLocale(saved);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const t = messages[locale].NotFound;

  return (
    <main className="nf" data-stratum="05">
      <p className="nf__code" aria-hidden="true">
        {t.title}
      </p>
      <h1>{t.heading}</h1>
      <p>{t.description}</p>
      <Link className="btn btn--primary" href={`/${locale}/`}>
        {t.cta}
      </Link>
    </main>
  );
}
