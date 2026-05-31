'use client'

import HeroSliderCard from "../shared/card/HeroSliderCard";
import { translations, useLanguage } from "@/context/LanguageContext";
import { Language } from "@/types/type";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from 'swiper/modules';
import { AnimatePresence } from "motion/react";

export default function HeroSection() {
    // @ts-ignore
    const { lang } = useLanguage()
    return (
        <>
            <Swiper className="mySwiper h-screen w-full  pt-30"
                loop={true}
                effect={'fade'}
                autoplay={{
                    delay: 4500,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                }}
                modules={[Autoplay, EffectFade]}
            >
                <AnimatePresence>
                    {translations[lang as Language].slider?.map((s, i) => (
                        <SwiperSlide>
                            <HeroSliderCard key={i} index={i} title={s.title} des={s.des} img={s.img} btn_text={s.btn_text} />
                        </SwiperSlide>
                    ))}
                </AnimatePresence>

            </Swiper>
        </>
    );
}


