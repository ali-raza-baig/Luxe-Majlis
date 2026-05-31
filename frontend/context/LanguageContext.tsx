'use client'
import { translation } from "@/constants/translation";
import { LangguageContextType, Language } from "@/types/type";
import { ReactNode, useContext, useState, createContext } from "react";

const LanguageContext = createContext<LangguageContextType | undefined>(undefined);

// create translation object
export const translations: Record<Language, {
    welcome: string,
    slider: any[],
    feature: any[],
    why_chose: any,
    get_quote: string,
    top_collection: string,
    why_choice_1: any[],
    faqs: { question: string, answer: string }[],
    trust: any[],
    whatsapp_now: { title: string, des: string, features: any[] },
    category: any[],
    address: string,
    links: any[],
    contact: any,
    about_page: any,
    contact_page: any,
    category_page: any

}> = {
    ...translation
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>(
        (typeof window !== "undefined" ?
            (localStorage.getItem('lang') as Language) : 'ar'
        ) || 'ar'
    )

    const isValidLang = (language: string): language is Language => {
        return ['en', 'ar'].includes(language)
    }

    const changeLanguage = (language: string) => {
        const newLang = isValidLang(language) ? language : "ar";

        if (typeof window !== "undefined") {
            localStorage.setItem("lang", newLang);
        }

        setLang(newLang);
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)

export default { translations }