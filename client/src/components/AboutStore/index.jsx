import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss';


function Store() {


    return (
        <section id='reasonToShopSection'>
            <h1>Reasons to shop with us</h1>
            <div className="reasonShopLine"></div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                <SwiperSlide>

                    <div className="aboutInformCard">
                        <h2>7 DAYS EASY RETURN</h2>
                        <p>Product any fault within 7 days for an immediately exchange.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="aboutInformCard">
                        <h2>QUALITY  GUARANTEE</h2>
                        <p>Product any fault within 7 days for an immediately exchange.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="aboutInformCard">
                        <h2>7 DAYS EASY RETURN</h2>
                        <p>Product any fault within 7 days for an immediately exchange.</p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="aboutInformCard">
                        <h2>QUALITY  CHECK ONLINE BEFORE YOU BUY!</h2>
                        <p>Product any fault within 7 days for an immediately exchange.</p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

export default Store