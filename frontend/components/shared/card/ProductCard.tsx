import React from 'react'
import WhatsappBtn from '../buttons/WhatsappBtn'
import WalnutBtn from '../buttons/WalnutBtn'
import Link from 'next/link'



interface IProductCard {
    img1: string,
    img2?: string,
    title: string,
    slug: string
}

const ProductCard = ({ img1, img2, title, slug }: IProductCard) => {
    return (
        <Link href={`/product/${slug}`} className='relative group mb-2 w-full sm:w-[48%] lg:w-[23%] overflow-hidden'>
            <div className='relative w-75 h-80 '>
                <img src={img1}
                    className='absolute inset-0 rounded-md w-75 h-80 transition-opacity duration-500 opacity-100 group-hover:opacity-0 object-cover'
                    alt="" />
                <img src={img2 ? img2 : img1}
                    className='absolute inset-0 w-75 h-80 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 object-cover'
                    alt="" />

                {/* <div className='absolute hidden group-hover:flex items-center justify-center gap-4 bottom-1 left-[10%]'>
                    <WhatsappBtn />
                    <WalnutBtn text='Get Consultation' className='bg-black! text-ivory-silk! hover:bg-black/80 ' />
                </div> */}
            </div>


            <h4 className='text-center text-lg md:text-lg font-poppins font-normal py-2'>{title}</h4>
        </Link>
    )
}

export default ProductCard