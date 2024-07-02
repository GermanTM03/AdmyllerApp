"use client";
import 'swiper/css';
import 'swiper/css/effect-cards';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { FeaturesData } from "./FeaturesData";
import Image from "next/image";

export function Features() {
    
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCardClick = (index: number ) => {
        setActiveIndex(index);
    };

    return (
        <div className="relative px-5 py-5 md:py-30" id="Features">
            <div className="block max-w-5xl mx-auto md:grid md:grid-cols-2">
                <h2 className="text-5xl font-semibold">
                    Contamos con diferentes
                    <span className="block degradedBlue bg-blueLight">Funcionalidades </span>
                    pensadas en tu negocio
                </h2>
                <div className="px-5">
                    <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        modules={[EffectCards]}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        initialSlide={activeIndex}
                    >
                        {FeaturesData.map(({ image, id }, index) => (
                            <SwiperSlide key={id} onClick={() => handleCardClick(index)}>
                                <Image src={image} alt="Credit Card" width="400" height="300" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
