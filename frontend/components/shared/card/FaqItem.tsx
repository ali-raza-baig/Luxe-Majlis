'use client'
import { useLanguage } from '@/context/LanguageContext'
import React, { useState } from 'react'

interface IFaqItem {
    index: number,
    question: string,
    answer: string,
    activeIndex: number | null,
    toggleIndex: (index: number) => void
}

const FaqItem = ({ index, question, answer, activeIndex, toggleIndex }: IFaqItem) => {
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <div className={`m-1 cursor-pointer ${lang === 'ar' ? 'text-end!' : 'text-start'}`}>
            {/* Question */}
            <div onClick={() => toggleIndex(index)}
                className={`border border-gray-500 p-2 rounded-sm
                flex items-center justify-between text-md md:text-lg font-playfair font-medium ${lang === 'ar' ? 'flex-row-reverse' : 'text-start'}`}>
                <h3 className={``}>{question}</h3>
                {activeIndex === index ? '-' : '+'}
            </div>
            {/* Ans */}
            <div className='bg-royal-gold/50 rounded-sm m-1 '>
                {activeIndex === index && (
                    <p className='text-base md:text-md font-poppins p-2'>
                        {answer}
                    </p>
                )}
            </div>
        </div>
    )
}

export default FaqItem