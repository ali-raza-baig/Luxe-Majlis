import React from 'react'
import { IoClose } from 'react-icons/io5';

const ModelBox = ({ open, setOpen, title, children, className }: { children: React.ReactNode, open: boolean, setOpen: any, title?: string, className?: string }) => {
    if (!open) return null;
    return (
        <div onClick={() => setOpen(false)} className='w-full h-full inset-0 fixed bg-gray-800/80 flex items-center justify-center'>
            <div onClick={(e) => e.stopPropagation()} className={`w-[80%] h-[80%] bg-white overflow-y-auto ${className}`}>
                <div className='flex items-center justify-between p-2 px-4 border-b border-deep-walnut'>
                    <h3 className='text-xl lg:text-2xl font-semibold'>{title} </h3>
                    <IoClose size={25} onClick={() => setOpen(false)}
                        className=' rounded-md bg-deep-walnut text-white cursor-pointer'
                    />
                </div>
                <div className='p-3'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModelBox