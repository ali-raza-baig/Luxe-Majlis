import React from 'react'
import {motion} from 'motion/react'

interface IWalnutBtn {
    className?: string,
    text: string
}

const WalnutBtn = ({ className, text }: IWalnutBtn) => {
    return (

        <motion.button className={` ${className} bg-mahogany-brown text-white px-4 py-2 rounded-md font-normal text-lg font-playfair hover:bg-deep-walnut transition-colors duration-500`}>
            {text}
        </motion.button>
    )
}

export default WalnutBtn