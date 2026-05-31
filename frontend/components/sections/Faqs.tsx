'use client'
import { translations, useLanguage } from '@/context/LanguageContext'
import type { FAQ, Language } from '@/types/type'
import React, { useState } from 'react'
import FaqItem from '../shared/card/FaqItem'
import { motion } from 'motion/react'

const Faqs = ({ faqs }: { faqs?: FAQ[] }) => {
    //@ts-ignore
    const { lang } = useLanguage()
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const toggleIndex = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
    }
    console.log(faqs)
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: 0.2,
            }}
            className='w-full md:w-[85%] lg:w-[70%] mx-auto p-2 pb-10'>
            <h3 className='text-2xl md:text-4xl font-playfair font-semibold text-center pb-6 '>FAQ's</h3>
            <div className='h-80 overflow-y-auto overflow-x-hidden'>
                {faqs?.map((f, i) => (
                    <FaqItem key={i} index={i} question={f.question[lang as Language]} answer={f.answer[lang as Language]} activeIndex={activeIndex} toggleIndex={toggleIndex} />
                ))}
            </div>
        </motion.div>
    )
}

export default Faqs