import type { Dispatch, SetStateAction } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoClose } from "react-icons/io5"


const Header = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <div className="flex items-center justify-between  bg-deep-walnut h-[20vh]">

            <div className="w-70">
                <img
                    className="w-full h-full object-cover"
                    src="/images/luxe-majlis-4.webp" alt="" />
            </div>
            <div onClick={() => setOpen(!open)} className="block pr-10 text-royal-gold lg:hidden">
                {!open ? <>
                    <GiHamburgerMenu className="" size={30} />
                </> : <>
                    <IoClose className="" size={30} />
                </>}
            </div>
        </div>
    )
}

export default Header