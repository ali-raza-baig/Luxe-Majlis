'use client'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CategorySection = () => {
    //@ts-ignore
    const { lang } = useLanguage()
    const [category, setCategory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)

    const fetchCategory = async () => {
        setLoading(true);

        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`
            );
            if (data.success) {
                setCategory(data.categories);
            }
            

        } catch (error) {
            console.log(error);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory()
    }, [])

    return (
        <div className='p-2'>
            <h2 className='pt-6 text-center text-2xl lg:text-4xl font-playfair'>{translations[lang as Language].category_page.title}</h2>
            {loading ? (<>
                <div className='h-full items-center justify-center'>
                    <p className='text-lg'>Loading...</p>
                </div>
            </>) :
                (
                    <div className='max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-6 py-6'>
                        {
                            category?.map((c, i) => (
                                <Link key={i} href={`/category/${c.slug}`}>
                                    <div className='relative flex-1'>
                                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${c.hero.img}`} alt="" className='w-100 h-100' />
                                        <p className='py-2 px-4 font-playfair font-semibold rounded-md bg-mahogany-brown text-white absolute top-1 left-2'>{c.hero.title[lang]}</p>
                                    </div>
                                </Link>

                            ))
                        }
                    </div>
                )}

        </div>

    )
}

export default CategorySection