import { FaRegGem, FaToolbox, FaUsers } from "react-icons/fa6";
import { FiZap } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuScissors, LuShieldCheck } from "react-icons/lu";

export const English = {

    category_page: {
        title: 'Explore Our Collections'
    },

    contact_page: {
        hero_section: {
            text: 'CONTACT US',
            heading: `            Let’s Transform Your <br/> Space Together       `,
            des: 'Get in touch with Luxe Majlis for premium curtains, blinds, sofa covers, and sofa repair services across Saudi Arabia. Our team is ready to help with expert advice, pricing, and custom solutions.',
            btn: 'WhatsApp',
        }
    },

    about_page: {
        hero_section: {
            text: 'About Luxe Majlis',
            heading: `                            Crafting Elegant <br />
                            <span className='text-royal-gold'>
                                Living Spaces
                            </span>
                            Across Saudi Arabia`,
            des: 'At Luxe Majlis, we specialize in premium curtains, modern blinds, custom sofa covers, and expert sofa repair services designed to bring comfort, sophistication, and timeless luxury into every home.',
            btn: 'Explore Collection',
            stats: ['Years Experience', 'Happy Clients', 'Custom Designs']
        }
    },

    category: [
        {
            name: 'Curtains',
            image: '/images/category_curtains.webp',
            link: '/category/curtains'
        },
        {
            name: 'Blinds',
            image: '/images/category_blinds.webp',
            link: '/category/blinds'
        },
        {
            name: 'Sofa',
            image: '/images/category_sofa.webp',
            link: '/category/sofa'
        },
    ],
    trust: [
        {
            text: 'Serving Homes Across Saudi Arabia',
            icon: FaUsers
        },
        {
            text: 'Precision Quality in Every Detail',
            icon: IoShieldCheckmarkOutline
        },
        {
            text: 'Crafted for Superior Quality',
            icon: FaToolbox
        },
    ],
    slider: [
        {
            title: 'Luxury Curtains & Modern Blinds',
            des: 'Transform your space with elegant designs, premium fabrics, and perfect light control.',
            img: '/images/curtains-1.webp',
            btn_text: 'Explore Collection'
        },
        {
            title: 'Custom Sofa Covers That Fit Perfectly',
            des: 'Refresh your furniture with stylish, durable, and tailor-made sofa covers.',
            img: '/images/sofa-1.webp',
            btn_text: 'Get Custom Quote'
        },
        {
            title: 'Expert Sofa Repair Services',
            des: 'Bring your sofa back to life with our professional repair and upholstery solutions.',
            img: '/images/sofa-repair.webp',
            btn_text: 'Book Service'
        },
    ],
    feature: [
        {
            title: 'Custom-Made Solutions',
            des: 'Tailored curtains, blinds, and sofa covers designed to perfectly fit your space and style.',
            icon: LuScissors
        },
        {
            title: 'Premium Quality Materials',
            des: 'We use high-quality fabrics and durable materials for long-lasting elegance and comfort.',
            icon: LuShieldCheck
        },
        {
            title: 'Fast & Professional Service',
            des: 'Quick response, expert installation, and reliable sofa repair services you can trust.',
            icon: FiZap
        },
        {
            title: 'Affordable Luxury',
            des: 'Get premium home solutions at competitive prices without compromising on quality.',
            icon: FaRegGem
        },
    ],
    why_chose: {
        title: 'Why Choose Luxe Majlis',
        des: 'At Luxe Majlis, we provide premium curtains, modern blinds, custom sofa covers, and expert sofa repair services across Saudi Arabia (KSA). Our focus is on quality materials, elegant designs, and professional installation to transform your home with comfort and style.',
    },

    why_choice_1: [
        {
            title: 'Precision Craftsmanship & Premium Materials',
            des: 'At Luxe Majlis, we combine expert craftsmanship with high-quality fabrics to deliver luxury curtains, modern blinds, and custom sofa covers. Every product is carefully designed and crafted to ensure durability, elegance, and a perfect finish for homes across Saudi Arabia.',
            img: '/images/why-choice-1.webp'
        },
        {
            title: 'From Consultation to Installation — We Handle Everything',
            des: 'Enjoy a seamless experience with Luxe Majlis. From initial consultation and design selection to precise measurement, installation, and sofa repair, our team manages every step with professionalism and care across Saudi Arabia (KSA).',
            img: '/images/why-choice-2.webp'
        },
        {
            title: 'Built for Lasting Comfort & Timeless Style',
            des: 'Our curtains, blinds, and sofa solutions are made to stand the test of time. Using durable materials and expert techniques, Luxe Majlis ensures long-lasting quality, comfort, and elegance for every home in Saudi Arabia.',
            img: '/images/why-choice-3.webp'
        },
    ],

    faqs: [
        {
            question: "Do you offer custom curtains and blinds?",
            answer: "Yes, we provide fully custom-made curtains and blinds tailored to your window size, style, and interior design preferences."
        },
        {
            question: "Can I order custom sofa covers for my furniture?",
            answer: "Absolutely. Our custom sofa covers are designed to fit perfectly and are available in a wide range of premium fabrics and colors."
        },
        {
            question: "Do you provide sofa repair services at home?",
            answer: "Yes, we offer professional sofa repair and upholstery services. Our team can assess and repair your sofa with high-quality workmanship."
        },
        {
            question: "How long does installation take?",
            answer: "Installation time depends on the project size, but most curtain and blind installations are completed quickly and efficiently by our expert team."
        },
        {
            question: "Which areas do you serve in Saudi Arabia?",
            answer: "We serve customers across Saudi Arabia, including major cities like Riyadh, Jeddah, and Dammam."
        },
        {
            question: "What types of fabrics do you use?",
            answer: "We use high-quality, durable, and stylish fabrics to ensure long-lasting comfort and a premium look for your home."
        },
        {
            question: "How can I get a price or consultation?",
            answer: "You can easily contact us via WhatsApp or request a quote directly from our website for a quick and free consultation."
        },
        {
            question: "Are your products affordable?",
            answer: "Yes, we offer competitive pricing while maintaining premium quality, giving you the best value for your investment."
        }
    ],
    whatsapp_now: {
        title: 'We’re just a WhatsApp away',
        des: 'Whether you want to book a consultation or have a question about curtains, blinds, or wallpaper — we’re here to help.',
        features: [
            "Quick replies",
            "Free consultation",
            "Custom recommendations",
            "Saudi-wide service"
        ]
    },
    links: [
        { name: 'Home', path: '/' },
        { name: 'Curtains', path: '/category/curtain' },
        { name: 'About', path: '/about-us' },
        { name: 'Contact', path: '/contact-us' },
    ],
    get_quote: 'Get Free Consultation',
    top_collection: 'View Top Collection',
    welcome: 'hello from english',
    address: 'Street Ibn Sina Almasif Exit 5 Riyadh',
    contact: {
        title: `GET A FREE HOME <br/> CONSULTATION`,
        btn: 'Get Free Consultation',
        label: ['Name', 'Email', 'Mobile No.', 'City', 'Message']
    }

}