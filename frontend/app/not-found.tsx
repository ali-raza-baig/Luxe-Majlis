'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { FaHome } from "react-icons/fa"
import { FiArrowLeft } from "react-icons/fi"

export default function NotFound() {
    return (
        <div className='min-h-screen bg-[#f8f5f0] flex items-center justify-center px-4 py-10'>

            <div className='max-w-3xl w-full text-center'>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='bg-white rounded-3xl shadow-xl border border-[#e7dfd3] p-8 md:p-14 overflow-hidden relative'
                >

                    {/* background blur */}
                    <div className='absolute -top-24 -right-24 w-64 h-64 bg-[#7a4b32]/10 rounded-full blur-3xl'></div>
                    <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-[#c8a27a]/10 rounded-full blur-3xl'></div>

                    {/* 404 */}
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className='text-7xl md:text-9xl font-bold text-[#7a4b32] font-playfair'
                    >
                        404
                    </motion.h1>

                    {/* heading */}
                    <h2 className='mt-6 text-2xl md:text-4xl font-playfair text-[#2d2d2d]'>
                        Page Not Found
                    </h2>

                    {/* description */}
                    <p className='mt-4 text-gray-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed'>
                        The page you are looking for may have been removed,
                        renamed, or is temporarily unavailable.
                    </p>

                    {/* buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>

                        <Link
                            href='/'
                            className='inline-flex items-center gap-2 bg-[#7a4b32] hover:bg-[#623b27] transition-all duration-300 text-white px-6 py-3 rounded-xl font-medium shadow-lg'
                        >
                            <FaHome size={18} />
                            Back To Home
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className='inline-flex items-center gap-2 border border-[#7a4b32] text-[#7a4b32] hover:bg-[#7a4b32] hover:text-white transition-all duration-300 px-6 py-3 rounded-xl font-medium'
                        >
                            <FiArrowLeft size={18} />
                            Go Back
                        </button>

                    </div>

                    {/* bottom line */}
                    <div className='mt-12 border-t border-[#ece5db] pt-5'>
                        <p className='text-sm text-gray-500'>
                            Luxury Interior & Curtain Collection
                        </p>
                    </div>

                </motion.div>

            </div>

        </div>
    )
}
