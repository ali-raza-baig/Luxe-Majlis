'use client'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import React from 'react'
import { motion } from 'motion/react'
import WhatsappBtn from '../shared/buttons/WhatsappBtn'
const WhatsappNow = () => {
    const phone = "923001234567" // change to your number (no +, no spaces)
    const message = "Hi, I want to book a consultation"
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <motion.section
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: 0.2,
            }}
            className='bg-[#059E66] px-4 md:px-8 pt-10 md:pt-14 '>
            <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center'>

                {/* Content */}
                <div className='text-center md:text-left'>
                    <h2 className={`text-white text-2xl md:text-4xl font-playfair font-semibold leading-snug ${lang === 'ar' ? 'text-right' : ''}`}>
                        {translations[lang as Language].whatsapp_now.title}
                    </h2>

                    <p className={`text-white/90 font-poppins text-sm md:text-base py-4 ${lang === 'ar' ? 'text-right' : ''}`}>
                        {translations[lang as Language].whatsapp_now.des}
                    </p>
                    <div className="text-white pb-4">
                        <ul
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                            className={`grid grid-cols-1 sm:grid-cols-2 gap-2 justify-items-start list-disc list-inside ${lang === 'ar' ? 'text-right ' : 'text-left'}`}>
                            {translations[lang as Language].whatsapp_now.features.map((f) => (
                                <li key={f} className="py-0.5">{f} </li>
                            ))}

                        </ul>
                    </div>
                    <div className={`flex ${lang === 'ar' ? 'items-end justify-end' : ''}`}>
                        <WhatsappBtn />
                    </div>
                </div>

                {/* Image */}
                <div className='flex justify-center md:justify-end'>
                    <img
                        src="/images/whatsapp.webp"
                        alt="WhatsApp Support"
                        className='w-52 md:w-72 object-contain drop-shadow-lg'
                    />
                </div>

            </div>
        </motion.section>
    )
}

export default WhatsappNow