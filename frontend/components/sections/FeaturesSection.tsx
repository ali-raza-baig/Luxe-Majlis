'use client'
import React from 'react'
import { SiZap } from 'react-icons/si'
import WalnutBtn from '../shared/buttons/WalnutBtn'
import FeaturedCard from '../shared/card/FeaturedCard'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import { motion } from 'motion/react'


const FeaturesSection = () => {
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <section>
            <div className={`flex flex-col md:flex-row items-start justify-center gap-6 p-2 ${lang === 'ar' ? 'md:flex-row-reverse text-end' : ''}`}>
                {/* Left side heading + buttons  */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                    }}
                    className={`w-[90%] md:w-[30%] lg:w-[40%] flex flex-col  ${lang === 'ar' ? 'items-end' : ''}`}>

                    <SiZap className='bg-mahogany-brown p-2 rounded-full text-royal-gold' size={50} />

                    <h2 className='py-2 mt-1 md:mt-4 leading-snug text-2xl lg:text-4xl font-playfair font-semibold'>{translations[lang as Language].why_chose?.title}</h2>
                    <p className='text-gray-700 text-sm md:text-base font-poppins py-4 leading-relaxed'>
                        {translations[lang as Language].why_chose?.des}
                    </p>
                    <div className='py-2'>
                        <WalnutBtn text={translations[lang as Language].get_quote} className='text-white!' />
                    </div>
                </motion.div>

                {/* Right side cards */}
                <div className='w-full md:w-[70%] lg:w-[50%] flex items-center justify-center gap-4 flex-wrap'>
                    {translations[lang as Language].feature.map((f, i) => (
                        <FeaturedCard key={i} index={i} title={f.title} des={f.des} Icon={f.icon} link={translations[lang as Language].top_collection} />
                    ))}

                </div>
            </div>
        </section>
    )
}

export default FeaturesSection