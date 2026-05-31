'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { Language } from "@/types/type";

type LangContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  ready: boolean;
};

const LangContext = createContext<LangContextType | null>(null);

export const LanguageProvider = ({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Language;
}) => {
  const [lang, setLang] = useState<Language>(initialLang);
  const [ready, setReady] = useState(false);

  // sync with localStorage (client only)
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Language | null;

    if (saved === "en" || saved === "ar") {
      setLang(saved);
    }

    setReady(true);
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);

    if (typeof window !== "undefined") {
      localStorage.setItem("lang", newLang);
    }
  };

  return (
    <LangContext.Provider
      value={{ lang, setLang: changeLanguage, ready }}
    >
      {children}
    </LangContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LangContext);

  if (!ctx) {
    throw new Error("useLanguage must be used inside provider");
  }

  return ctx;
};