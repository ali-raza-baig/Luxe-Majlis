'use client'

import React, { useState } from 'react'
import WalnutBtn from '../shared/buttons/WalnutBtn'
import { translations, useLanguage } from '@/context/LanguageContext'
import { Language } from '@/types/type'
import { motion } from 'motion/react'

const ContactForm = () => {
    //@ts-ignore
    const { lang } = useLanguage()
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(form)

        // reset form
        setForm({
            name: '',
            email: '',
            phone: '',
            city: '',
            message: ''
        })
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
                duration: 0.6,
                delay: 0.2,
            }}
            className="px-2 md:px-0">
            <h2 className='text-center max-w-xl text-2xl md:text-3xl font-semibold font-playfair mx-auto py-6' dangerouslySetInnerHTML={{ __html: translations[lang as Language].contact.title }} />

            <div className='flex items-center justify-center'>
                <form
                    onSubmit={handleSubmit}
                    className='w-full max-w-3xl  p-1 md:p-8'
                >
                    {/* Row 1 */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <InputField lang={lang} label={translations[lang as Language].contact.label[0]} name="name" value={form.name} onChange={handleChange} />
                        <InputField lang={lang} label={translations[lang as Language].contact.label[1]} name="email" value={form.email} onChange={handleChange} />
                    </div>

                    {/* Row 2 */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                        <InputField lang={lang} label={translations[lang as Language].contact.label[2]} name="phone" value={form.phone} onChange={handleChange} />
                        <InputField lang={lang} label={translations[lang as Language].contact.label[3]} name="city" value={form.city} onChange={handleChange} />
                    </div>

                    {/* Message */}
                    <div className='mt-4'>
                        <label className={`text-sm font-medium ${lang === 'ar' ? 'text-end!' : ''}`}>{translations[lang as Language].contact.label[4]}</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows={4}
                            className='w-full mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
                            placeholder='Write your message...'
                        />
                    </div>

                    {/* Button */}
                    <div className='mt-6 text-center'>
                        <WalnutBtn text={translations[lang as Language].contact.btn} />
                    </div>
                </form>
            </div>
        </motion.div>
    )
}

interface InputFieldProps {
    label: string
    name: string
    value: string
    lang?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const InputField = ({ label, name, value, onChange, lang }: InputFieldProps) => (
    <div className='flex flex-col'>
        <label className={`text-sm font-medium ${lang === 'ar' ? 'text-end' : ''}`}>{label}</label>
        <input
            name={name}
            value={value}
            onChange={onChange}
            required
            className='mt-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            placeholder={lang === 'ar' ? label : `Enter your ${label}`}
        />
    </div>
)

export default ContactForm