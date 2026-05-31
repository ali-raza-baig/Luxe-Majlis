import { useState, type ReactNode } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"


const Layout = ({ children }: { children: ReactNode }) => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className="border-b border-gray-300 ">
                <Header open={open} setOpen={setOpen} />
            </div>

            <div className={`fixed z-10 lg:hidden w-[70%] ${open ? 'block' : 'hidden'}`}>
                <Sidebar />
            </div>

            <div className="grid grid-cols-12">
                <div
                    className={`hidden lg:block lg:col-span-2`}
                >
                    <Sidebar />
                </div>

                <div className="col-span-12 lg:col-span-10 p-2 h-[79vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout