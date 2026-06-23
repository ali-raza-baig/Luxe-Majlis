

const Button = ({ text, handleClick }: { text: string, handleClick?: () => void }) => {
    return (
        <div onClick={handleClick} className='py-2 px-6 rounded-2xl bg-deep-walnut text-royal-gold font-playfair text-lg cursor-pointer'>
            {text}
        </div>
    )
}

export default Button