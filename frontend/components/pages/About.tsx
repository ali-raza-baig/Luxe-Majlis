'use client'
import React from 'react'
import WalnutBtn from '../shared/buttons/WalnutBtn'
import TrustSection from '../sections/TrustSection'
import WhyChoiceUs from '../sections/WhyChoiceUs'
import Faqs from '../sections/Faqs'
import WhatsappNow from '../sections/WhatsappNow'
import { translations, useLanguage } from '@/context/LanguageContext'
import { translation } from '@/constants/translation'
import { Language } from '@/types/type'

const About = () => {
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <div className='bg-midnight-charcoal'>
            <section className='relative overflow-hidden'>

                {/* Background Image */}
                <div className='absolute inset-0'>
                    <img
                        src='/images/about-hero.webp'
                        alt='Luxury Interior'
                        className='w-full h-full object-cover scale-105'
                    />
                    <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/30'></div>
                </div>

                {/* Decorative Blur */}
                <div className='absolute top-20 left-10 w-40 h-40 bg-royal-gold/20 blur-3xl rounded-full z-10'></div>
                <div className='absolute bottom-10 right-10 w-52 h-52 bg-walnut-brown/20 blur-3xl rounded-full z-10'></div>

                {/* Content */}
                <div className='relative z-20 min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-20'>
                    <div className='max-w-3xl text-ivory-silk'>

                        {/* Tag */}
                        <div className='mb-5 inline-flex items-center gap-3'>
                            <span className='w-10 h-px bg-royal-gold'></span>
                            <span className='uppercase tracking-[4px] text-sm md:text-base text-royal-gold font-medium'>
                                {translation[lang as Language].about_page.hero_section.text}
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className='font-playfair text-4xl sm:text-5xl lg:text-7xl leading-tight font-bold mb-6'>
                            <div dangerouslySetInnerHTML={{ __html: translation[lang as Language].about_page.hero_section.heading }} />
                        </h1>

                        {/* Description */}
                        <p className='text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-poppins'>
                            {translation[lang as Language].about_page.hero_section.des}
                        </p>

                        {/* Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'>
                            <WalnutBtn text={translations[lang as Language].get_quote} />

                            <button className='border border-white/30 hover:border-royal-gold text-white hover:text-royal-gold px-7 py-3 transition-all duration-300 backdrop-blur-sm'>
                                {translation[lang as Language].about_page.hero_section.btn}
                            </button>
                        </div>

                        {/* Stats */}
                        <div className='grid grid-cols-2 md:grid-cols-3 gap-6 mt-14'>
                            <div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5'>
                                <h3 className='text-3xl font-bold text-royal-gold'>
                                    3+
                                </h3>
                                <p className='text-gray-300 text-sm mt-1'>
                                    {translation[lang as Language].about_page.hero_section.stats[0]}
                                </p>
                            </div>

                            <div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5'>
                                <h3 className='text-3xl font-bold text-royal-gold'>
                                    500+
                                </h3>
                                <p className='text-gray-300 text-sm mt-1'>
                                    {translation[lang as Language].about_page.hero_section.stats[1]}
                                </p>
                            </div>

                            <div className='backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 col-span-2 md:col-span-1'>
                                <h3 className='text-3xl font-bold text-royal-gold'>
                                    100%
                                </h3>
                                <p className='text-gray-300 text-sm mt-1'>
                                    {translation[lang as Language].about_page.hero_section.stats[2]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Fade */}
                <div className='absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-midnight-charcoal to-transparent z-20'></div>
            </section>
            <div>
                <WhyChoiceUs />
                <TrustSection />

                <Faqs />
                <WhatsappNow />
            </div>
        </div>
    )
}

export default About