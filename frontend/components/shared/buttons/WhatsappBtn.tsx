import React from 'react'
import { IoLogoWhatsapp } from 'react-icons/io'

const WhatsappBtn = () => {
    const phone = "923001234567" // change to your number (no +, no spaces)
    const message = "Hi, I want to book a consultation"
    const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    return (
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className='bg-black hover:bg-gray-900 transition text-white rounded-lg px-6 py-3 font-medium shadow-md'>
                WhatsApp Now
            </button>
        </a>
    )
}

export default WhatsappBtn