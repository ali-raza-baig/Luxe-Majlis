'use client'
import { useLanguage } from '@/context/LanguageContext'
import React from 'react'
import { FaShield } from 'react-icons/fa6'
import { motion } from 'motion/react'

const WhyChoiceCategory = ({ whyChoice }: { whyChoice: any }) => {
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <div>
            {/* Image  */}
            <div></div>

            {/* Content */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                    duration: 0.6,
                    delay: 0.2,
                }}
            >
                <h1 className='text-2xl md:text-4xl font-playfair font-semibold leading-snug text-center py-4 pt-8'>{whyChoice.title[lang]}</h1>
                <div className='max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-4'>
                    {whyChoice.cards.map((c: any, i: any) => (
                        <div key={i} className={` bg-royal-gold/40 text-black w-[90%] lg:w-[35%] p-2 gap-4 flex flex-col justify-between rounded-md ${lang === 'ar' ? ' items-end text-end' : ' items-start '}`}>
                            {/* Icon */}
                            <div className={`flex items-center justify-center gap-2 ${lang === 'ar' ? 'flex-row-reverse items-end' : ''}`}>
                                <FaShield className='bg-mahogany-brown p-2 rounded-full text-royal-gold' size={35} />
                                <h3 className='text-xl md:text-xl font-playfair font-semibold'>{c.title[lang]}</h3>
                            </div>
                            <div>
                                {/* des */}
                                <p className='text-md pt-2 pb-4 font-poppins'>{c.des[lang]}</p>
                            </div>
                        </div>
                    ))}


                </div>

            </motion.div>
        </div>
    )
}

export default WhyChoiceCategory