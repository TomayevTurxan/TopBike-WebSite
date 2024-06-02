import React, { useEffect, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss';
import useFetchData from '../../hooks/useFetchData';

function Shipping() {

    const { product } = useFetchData('shipping')

    return (
        <section id='informSection'>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    '@1.50': {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                className="mySwiper"
            >
                {
                    product && product.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className="informBox">
                                <img src={item.img} alt="" />
                                <p>{item.title}</p>
                                <span>{item.description}</span>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    )
}

export default Shipping


