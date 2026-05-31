'use client'
import React, { useEffect, useState } from 'react'
import HeroSliderCard from '../shared/card/HeroSliderCard'
import { translations, useLanguage } from '@/context/LanguageContext'
import HomeCollection from '../sections/HomeCollection'
import WhatsappNow from '../sections/WhatsappNow'
import Faqs from '../sections/Faqs'
import WhyChoiceCategory from '../sections/WhyChoiceCategory'
import TrustSection from '../sections/TrustSection'
import FeaturesSection from '../sections/FeaturesSection'
import axios from 'axios'
import NotFound from '@/app/not-found'
import { Language } from '@/types/type'


const Category = ({ slug }: { slug: string }) => {
    // @ts-ignore
    const { lang } = useLanguage()
    const [category, setCategory] = useState<any>({});
    const [product, setProduct] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);

    const fetchCategory = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/single/${slug}`
            );
            if (data.success) {
                setCategory(data.category);
            }

        } catch (error) {
            console.log(error);
            setError(true)

        } finally {
            setLoading(false);
        }
    };


    const fetchProduct = async () => {
        if (!category?._id) return;
        setLoading(true);

        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/all?category=${category._id}`
            );
            if (data.success) {
                setProduct(data.products);
            }

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, [])
    useEffect(() => {
        fetchProduct();
    }, [category])

    if (!loading && error) {
        return NotFound()
    }

    return (
        <>
            {loading ? (<>

            </>) : (
                <div>
                    <HeroSliderCard index={1} title={category.hero.title[lang]} img={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${category.hero.img}`} des={category.hero.des[lang]} btn_text={translations[lang as Language].get_quote} />


                    <div className='mt-4 md:mt-10'>
                        <HomeCollection products={product} lang={lang} />
                    </div>
                    <div>
                        <WhyChoiceCategory whyChoice={category.whyChoice} />
                    </div>
                    <div>
                        <TrustSection />
                        <FeaturesSection />
                    </div>
                    <div className='my-4'>
                        <WhatsappNow />
                    </div>
                    <Faqs faqs={category.faq} />
                </div>
            )}
        </>
    )
}

export default Category