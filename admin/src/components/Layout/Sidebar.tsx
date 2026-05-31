import {
    FaTachometerAlt,
    FaTags,
    FaBoxOpen,
    FaImages,
    FaEnvelope,
    FaPlus,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export const sidebarItems = [
    {
        name: "Dashboard",
        link: "/",
        icon: FaTachometerAlt,
    },
    {
        name: "Category",
        link: "/category",
        icon: FaTags,
    },
    {
        name: "Products",
        link: "/products",
        icon: FaBoxOpen,
    },
    {
        name: "New Product",
        link: "/new-product",
        icon: FaPlus,
    },
    {
        name: "Media Library",
        link: "/media-library",
        icon: FaImages,
    },
    {
        name: "Messages",
        link: "/messages",
        icon: FaEnvelope,
    },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside
            className='bg-deep-walnut w-full! h-[79.5vh]'
        >
            <div className="flex flex-col gap-2 p-4 w-full!">
                {sidebarItems.map((s, i) => {
                    const Icon = s.icon;
                    const active = location.pathname === s.link;

                    return (
                        <Link
                            to={s.link}
                            key={i}
                            className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${active ? "bg-royal-gold text-deep-walnut shadow-lg" : "text-royal-gold hover:bg-royal-gold/10 hover:text-white"}`}>
                            <Icon className="text-lg min-w-5" />

                            <span className="text-sm font-medium whitespace-nowrap">
                                {s.name}
                            </span>

                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};

export default Sidebar;