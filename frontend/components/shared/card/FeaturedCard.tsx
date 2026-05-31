import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { motion } from 'motion/react'

interface IFeaturedCard {
    Icon: IconType,
    title: string,
    des: string,
    lang?: string,
    link?: string,
    index: number
}

const FeaturedCard = ({ Icon, title, des, lang, link, index }: IFeaturedCard) => {
    return (
        <motion.div
            dir={lang === 'ar' ? 'rtl' : 'lrt'}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: index * 0.2,
            }}
            className={`bg-royal-gold/40 text-black w-[90%] lg:w-[45%] p-4 h-70 flex flex-col justify-between rounded-md ${lang === 'ar' ? 'items-end! ' : ' items-start '}`}>
            {/* Icon */}
            <Icon className={`bg-mahogany-brown p-2 rounded-full text-royal-gold ${lang === 'ar' ? 'text-end' : ''}`} size={50} />
            {/* Heading */}
            <div>
                <h3 className='text-xl md:text-xl font-playfair font-semibold'>{title}</h3>
                {/* des */}
                <p className='text-md pt-2 pb-4 font-poppins'>{des}</p>

                <Link href={''} className='pt-6 text-deep-walnut font-playfair font-medium'>{link}</Link>
            </div>
        </motion.div>
    )
}

export default FeaturedCard