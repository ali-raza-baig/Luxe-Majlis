'use client'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import React from 'react'
import WalnutBtn from '../shared/buttons/WalnutBtn'
import { motion } from 'motion/react'
const WhyChoiceUs = () => {
    //@ts-ignore
    const { lang } = useLanguage()

    return (
        <section className='py-12 md:py-16'>
            <div className='flex flex-col gap-12'>

                {translations[lang as Language].why_choice_1.map((w, i) => (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.6,
                            delay: i * 0.2,
                        }}
                        key={i}
                        className={`
                        max-w-6xl mx-auto px-4
                        flex flex-col md:flex-row items-center gap-8 md:gap-12
                        ${i === 1 ? 'md:flex-row-reverse' : ''}
                        ${lang === 'ar' ? 'text-right' : 'text-left'}
                        `}
                    >

                        {/* Content */}
                        <div className='flex-1'>
                            <h2 className='text-2xl md:text-3xl lg:text-4xl font-playfair font-semibold leading-snug'>
                                {w.title}
                            </h2>

                            <p className='text-gray-700 text-sm md:text-base font-poppins py-4 leading-relaxed'>
                                {w.des}
                            </p>

                            <WalnutBtn
                                text={translations[lang as Language].get_quote}
                                className='text-white mt-2!'
                            />
                        </div>

                        {/* Image */}
                        <div className='flex-1 w-full'>
                            <div className='overflow-hidden rounded-xl shadow-md'>
                                <img
                                    src={w.img}
                                    alt={w.title}
                                    className='w-full h-64 md:h-80 lg:h-[420px] object-cover transition-transform duration-500 hover:scale-105'
                                />
                            </div>
                        </div>

                    </motion.div>
                ))}

            </div>
        </section>
    )
}

export default WhyChoiceUs