'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaLocationArrow, FaPhoneVolume, FaBars, FaTimes, FaPhoneAlt } from 'react-icons/fa'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  //@ts-expect-error
  const { lang, changeLanguage } = useLanguage()

  const links = translations[lang as Language].links;

  return (
    <nav className="bg-deep-walnut w-full  top-0 z-50 shadow-lg">

      {/* Top bar */}
      <div className="fixed top-0 flex justify-between px-2 md:px-10 py-3 border-b border-white/10 text-ivory-silk text-sm font-poppins bg-deep-walnut w-full z-50 ">
        <div className="hidden md:flex items-center gap-2">
          <FaLocationArrow className="text-antique-gold" />
          <span>{translations[lang as Language].address}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaPhoneAlt className="text-antique-gold" />
          <span>+966 53 743 3740</span>
        </div>
        <div>
          <select name="" id="" value={lang} onChange={(e) => changeLanguage(e.target?.value)} className='bg-deep-walnut text-white py-1 px-1 border border-ivory-silk rounded-sm'>
            <option value="ar">Arabic</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Main navbar */}
      <div className="flex items-center justify-between px-2 mt-10 md:px-10 py-4">

        {/* Logo */}
        <Link href={'/'} className='cursor-pointer'>
          <img
            src="/images/luxe-majlis-4.webp"
            alt="logo"
            className="w-[180px] md:w-[220px] h-[90px] object-cover"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.path}
              href={l.path}
              className="text-ivory-silk font-playfair text-lg hover:text-antique-gold transition"
            >
              {l.name}
            </Link>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-ivory-silk text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-6 py-6 bg-deep-walnut border-t border-white/10">
          {links.map((l) => (
            <Link
              key={l.path}
              href={l.path}
              onClick={() => setOpen(false)}
              className="text-ivory-silk font-playfair text-lg hover:text-antique-gold"
            >
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar