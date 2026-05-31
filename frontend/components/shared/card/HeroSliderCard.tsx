import React from 'react'
import WalnutBtn from '../buttons/WalnutBtn'
import { motion } from 'motion/react'

interface HeroSliderCardProps {
    title: string,
    img: string,
    des: string,
    btn_text: string,
    index: number
}

const HeroSliderCard = ({ title, img, des, btn_text, index }: HeroSliderCardProps) => {
    return (
        <div className='relative w-full h-[90vh] overflow-hidden'>

            <motion.img
                initial={{ scale: 1.1 }}
                // animate={{ scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={img} alt="" className='absolute inset-0 w-full h-full object-cover' />

            <div className='absolute inset-0 bg-black/50 z-10' />
            <motion.div initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: index * 0.2, }}
                className='relative  flex items-center justify-center z-20 h-full px-6 text-center'>
                <div className='max-w-2xl text-ivory-silk'>
                    <h1 className='text-4xl md:text-6xl font-playfair font-semibold'>{title}</h1>
                    <p className='text-base md:text-lg my-4 font-poppins text-gray-200'>{des}</p>

                    <WalnutBtn text={btn_text} />
                </div>

            </motion.div>
        </div>
    )
}

export default HeroSliderCard