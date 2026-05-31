'use client'

import React, { useEffect, useState } from 'react'
import FeaturesSection from '../sections/FeaturesSection'
import TrustSection from '../sections/TrustSection'
import WhatsappNow from '../sections/WhatsappNow'
import Faqs from '../sections/Faqs'
import { motion } from 'motion/react'
import axios from 'axios'
import type { Language, Product } from '@/types/type'
import { translations, useLanguage } from '@/context/LanguageContext'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import WalnutBtn from '../shared/buttons/WalnutBtn'
import WhatsappBtn from '../shared/buttons/WhatsappBtn'

const Product = ({ slug }: { slug: string }) => {
    //@ts-ignore
    const { lang } = useLanguage()

    const [selectedImage, setSelectedImage] = useState('')
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState<Product | null>(null)

    const fetchProduct = async () => {
        try {
            setLoading(true)

            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/single/${slug}`
            )

            if (data.success) {
                setProduct(data.product)

                if (data.product?.futureImage) {
                    setSelectedImage(data.product.futureImage)
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [slug])

    if (loading) {
        return (
            <div className='min-h-[70vh] flex items-center justify-center'>
                <AiOutlineLoading3Quarters className='w-10 h-10 animate-spin ' />
            </div>
        )
    }

    if (!product) {
        return (
            <div className='min-h-[50vh] flex items-center justify-center text-xl'>
                Product Not Found
            </div>
        )
    }

    const allImages = [
        product.futureImage,
        ...(product.imageGallery || [])
    ]

    return (
        <div className='w-full overflow-hidden'>

            {/* HERO SECTION */}
            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start'>

                    {/* LEFT IMAGES */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='flex flex-col lg:flex-row gap-4'
                    >

                        {/* THUMBNAILS */}
                        <div className='flex lg:flex-col gap-3 order-2 lg:order-1 overflow-auto lg:max-h-137.5 p-2'>
                            {allImages.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(img)}
                                    className={`min-w-20 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${selectedImage === img
                                        ? 'border-yellow-500 scale-105'
                                        : 'border-gray-200 hover:border-yellow-400'
                                        }`}
                                >
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${img}`}
                                        alt='product'
                                        className='w-full h-full object-cover'
                                    />
                                </button>
                            ))}
                        </div>

                        {/* MAIN IMAGE */}
                        <div className='flex-1 order-1 lg:order-2'>
                            <div className='bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-xl'>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${selectedImage}`}
                                    alt={product.title?.[lang as Language]}
                                    className='w-full h-75 sm:h-112.5 lg:h-137.5 object-cover hover:scale-105 transition-transform duration-500'
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className='flex flex-col justify-center'
                    >

                        <span className='bg-royal-gold/40 text-deep-walnut w-fit px-4 py-2 rounded-full text-sm font-semibold mb-4'>
                            Premium Collection
                        </span>

                        <h1 className='text-2xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-6'>
                            {product.title?.[lang as Language]}
                        </h1>

                        <p className='text-gray-600 text-base sm:text-lg leading-relaxed mb-8'>
                            {product.des?.[lang as Language]}
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam temporibus voluptatem eum facilis, tempora deleniti officia veniam distinctio deserunt aut rerum non est odio facere perferendis iste! Reprehenderit veritatis magni placeat! Eos deleniti corporis iusto facilis vel tempore voluptates non voluptatem autem quis sapiente minus, veniam temporibus repudiandae, qui commodi?
                        </p>

                        {/* BUTTONS */}
                        <div className='flex flex-col sm:flex-row gap-4'>
                            <WhatsappBtn />

                            <WalnutBtn
                                text={translations[lang as Language].get_quote}
                                className='text-white '
                            />
                        </div>

                        {/* FEATURES */}
                        <div className='grid grid-cols-2 gap-4 mt-10'>
                            <div className='bg-white shadow-md rounded-2xl p-4'>
                                <h3 className='font-bold text-lg'>Premium</h3>
                                <p className='text-gray-500 text-sm'>High Quality Material</p>
                            </div>

                            <div className='bg-white shadow-md rounded-2xl p-4'>
                                <h3 className='font-bold text-lg'>Modern</h3>
                                <p className='text-gray-500 text-sm'>Elegant Design</p>
                            </div>

                            <div className='bg-white shadow-md rounded-2xl p-4'>
                                <h3 className='font-bold text-lg'>Custom</h3>
                                <p className='text-gray-500 text-sm'>Made For Your Space</p>
                            </div>

                            <div className='bg-white shadow-md rounded-2xl p-4'>
                                <h3 className='font-bold text-lg'>Support</h3>
                                <p className='text-gray-500 text-sm'>Installation Included</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* WHAT ARE */}
            <section className=' py-14 lg:py-20'>
                <div className='max-w-5xl mx-auto px-4 text-center'>
                    <h2 className='text-3xl lg:text-4xl font-bold mb-8'>
                        {product.whatAre?.title?.[lang as Language]}
                    </h2>

                    <p className='text-gray-600 text-lg leading-relaxed'>
                        {product.whatAre?.des?.[lang as Language]}
                    </p>
                </div>
            </section>

            {/* 4 STEPS */}
            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

                    {/* IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${product.futureImage}`}
                            alt=''
                            className='rounded-3xl shadow-2xl w-full object-cover'
                        />
                    </motion.div>

                    {/* CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className='text-3xl lg:text-4xl font-bold mb-8 leading-tight'>
                            Get {product.title?.[lang as Language]} In 4 Easy Steps
                        </h2>

                        <div className='space-y-6'>

                            {[
                                'Share your requirements and measurements.',
                                'Our team takes accurate sizing details.',
                                'Premium crafting with expert finishing.',
                                'Professional installation at your location.'
                            ].map((step, i) => (
                                <div
                                    key={i}
                                    className='flex items-start gap-4 bg-white shadow-md rounded-2xl p-5'
                                >
                                    <div className='min-w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center font-bold text-lg'>
                                        {i + 1}
                                    </div>

                                    <p className='text-gray-600 leading-relaxed'>
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* QUALITIES */}
            <motion.section
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='bg-deep-walnut text-white py-16 lg:py-24'
            >
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                    <h2 className='text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-16'>
                        What Makes {product.title?.[lang as Language]} Special
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        {product.qualities?.cards?.map((q, i) => (
                            <div
                                key={i}
                                className='bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300'
                            >
                                <span className='text-royal-gold text-5xl font-bold'>
                                    0{i + 1}
                                </span>

                                <h3 className='text-2xl font-semibold mt-4 mb-4'>
                                    {q.title?.[lang as Language]}
                                </h3>

                                <p className='text-gray-300 leading-relaxed'>
                                    {q.des?.[lang as Language]}
                                </p>
                            </div>
                        ))}

                        {product.qualities?.cards?.map((q, i) => (
                            <div
                                key={i}
                                className='bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300'
                            >
                                <span className='text-royal-gold text-5xl font-bold'>
                                    0{i + 1}
                                </span>

                                <h3 className='text-2xl font-semibold mt-4 mb-4'>
                                    {q.title?.[lang as Language]}
                                </h3>

                                <p className='text-gray-300 leading-relaxed'>
                                    {q.des?.[lang as Language]}
                                </p>
                            </div>
                        ))}

                        {product.qualities?.cards?.map((q, i) => (
                            <div
                                key={i}
                                className='bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:-translate-y-1.5 transition-all duration-300'
                            >
                                <span className='text-royal-gold text-5xl font-bold'>
                                    0{i + 1}
                                </span>

                                <h3 className='text-2xl font-semibold mt-4 mb-4'>
                                    {q.title?.[lang as Language]}
                                </h3>

                                <p className='text-gray-300 leading-relaxed'>
                                    {q.des?.[lang as Language]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* OTHER SECTIONS */}
            <div className='py-10'>
                <TrustSection />
            </div>

            <div className='py-10 bg-gray-50'>
                <FeaturesSection />
            </div>

            <div className='py-10'>
                <WhatsappNow />
            </div>

            {/* FAQS */}
            <section className='max-w-6xl mx-auto px-4 pb-20'>
                <Faqs faqs={product?.faqs} />
            </section>
        </div>
    )
}

export default Product