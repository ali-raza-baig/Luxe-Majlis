'use client'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import { motion } from 'motion/react'

const TrustSection = () => {
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: 0.2,
            }}
            className='bg-black text-md text-white py-4 my-10'>
            <div className='max-w-7xl flex flex-col md:flex-row items-center justify-evenly gap-3'>
                {translations[lang as Language].trust.map((t, i) => {
                    return (
                        <div key={i} className={`flex items-center justify-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <t.icon className='text-white' size={25} />
                            <p>{t.text}</p>
                        </div>
                    )
                })

                }
            </div>

        </motion.div>
    )
}

export default TrustSection