'use client'

import Navbar from '@/components/layout/Navbar'
import ContactForm from '@/components/sections/ContactForm'
import Faqs from '@/components/sections/Faqs'
import FeaturesSection from '@/components/sections/FeaturesSection'
import HeroSection from '@/components/sections/HeroSection'
import HomeCollection from '@/components/sections/HomeCollection'
import WhatsappNow from '@/components/sections/WhatsappNow'
import WhyChoiceUs from '@/components/sections/WhyChoiceUs'
import TrustSection from '@/components/sections/TrustSection'
import React, { useEffect, useState } from 'react'
import CategorySection from '@/components/sections/CategorySection'
import Footer from '@/components/layout/Footer'
import { translations, useLanguage } from '@/context/LanguageContext'
import type { FAQ, Language } from '@/types/type'

const Home = () => {

    const langs = Object.keys(translations)

    const faqResult = translations[langs[0] as Language].faqs.map((_, index) => {
        const faq: FAQ = {
            //@ts-ignore
            question: {},
            //@ts-ignore
            answer: {}
        }

        langs.forEach((lang) => {
            //@ts-ignore
            faq.question[lang] = translations[lang as Language]?.faqs[index].question
            //@ts-ignore
            faq.answer[lang] = translations[lang as Language]?.faqs[index].answer
        })
        return faq;
    })

    return (
        <div>

            <HeroSection />
            <CategorySection />
            <FeaturesSection />
            <TrustSection />
            <WhyChoiceUs />
            <div className='mb-10'>
                <WhatsappNow />
            </div>
            <Faqs faqs={faqResult} />
            <ContactForm />
        </div>
    )
}

export default Home