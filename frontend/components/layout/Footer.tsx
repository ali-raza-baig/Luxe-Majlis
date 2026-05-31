'use client'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import Link from 'next/link'


const Footer = () => {
    //@ts-ignore
    const { lang } = useLanguage()
    return (
        <footer className="text-ivory-silk bg-deep-walnut body-font">
            <div className="container  md:px-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">

                <div className="w-64 shrink-0 md:mx-0 -my-10 text-center md:text-left">
                    <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center text-white">
                        <img src="/images/luxe-majlis-4.webp" alt="" />
                    </Link>
                </div>

                <div className="grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left gap-6 ">
                    <div className="lg:w-[30%] md:w-1/2 w-full px-4">
                        <h2 className="title-font font-playfair font-medium text-white tracking-widest text-lg mb-1 md:mb-3">
                            Contact Us
                        </h2>
                        <div className='flex flex-col gap-1 md:gap-2'>
                            <Link href={''}>contact@luxemajlis.com</Link>
                            <Link href={''}>+966 53 743 3740</Link>
                            <Link href={''}>{translations[lang as Language].address}</Link>
                        </div>
                    </div>

                    <div className="lg:w-[30%] md:w-1/2 w-full px-4">
                        <h2 className="title-font font-playfair font-medium text-white tracking-widest text-lg mb-1 md:mb-3">
                            Top Collections
                        </h2>
                        <nav className="list-none flex flex-col gap-1 md:gap-2">
                            {translations[lang as Language].category.map((c, i) => (
                                <li key={i}><Link href={c.link} className=" hover:text-royal-gold">{c.name}</Link></li>
                            ))}
                        </nav>
                    </div>
                    <div className="lg:w-[30%] md:w-1/2 w-full px-4">
                        <h2 className="title-font font-playfair font-medium text-white tracking-widest text-lg mb-1 md:mb-3">
                            Pages
                        </h2>
                        <nav className="list-none mb-10 flex flex-col gap-1 md:gap-2">
                            {translations[lang as Language].links.map((l) => (
                                <li key={l.path}><Link href={l.path} className=" hover:text-royal-gold ">{l.name}</Link></li>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div className=" bg-opacity-75 border-t-2 border-royal-gold">
                <div className="container mx-auto py-4 px-5 flex flex-wrap justify-evenly sm:flex-row">
                    <p className="text-gray-100 text-sm text-center sm:text-left">
                        {new Date().getFullYear()} Developed and Maintained —
                        <Link href="https://baigdevlab.vercel.app/"
                            className="text-gray-500 ml-1"
                            target="_blank"
                            rel="noopener noreferrer">
                            Baig DevLab
                        </Link>
                    </p>

                    <p className="text-gray-100 text-sm text-center sm:text-left">
                        © {new Date().getFullYear()} Luxe Majlis —
                        <Link href="/"
                            className="text-gray-500 ml-1"
                            target="_blank"
                            rel="noopener noreferrer">
                            @luxemajlis
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer