import React from 'react'
import ProductCard from '../shared/card/ProductCard'

interface ICollection {
    title?: string,
    products: any[],
    lang: string
}

const HomeCollection = ({ title, products, lang }: ICollection) => {
    return (
        <div className='relative p-2'>
            <h2 className='text-2xl md:text-4xl font-playfair font-semibold text-center'>{lang === 'ar' ? 'مصمم لمساحتك' : 'Designed for Your Space'}</h2>

            <div className='flex items-center flex-col md:flex-row md:flex-wrap justify-center gap-2 md:gap-6 mt-8  overflow-hidden'>
                {products?.map((p) => (
                    <ProductCard
                        key={p.slug}
                        slug={p.slug}
                        img1={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${p.futureImage}`}
                        img2={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${p.imageGallery[0]}`}
                        title={p.title[lang]} />
                ))}

            </div>
        </div>
    )
}

export default HomeCollection