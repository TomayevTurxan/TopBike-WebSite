import React from 'react'
import './index.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router';

function Header() {
  const navigate = useNavigate()

  return (
    <header>

      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
      >
        <SwiperSlide >
          <div className="slider1Box">
            <div className="sliderBox">
              <h1 data-aos="fade-left" data-aos-duration="1500">Off Road Bicycle</h1>
              <p data-aos="fade-right" data-aos-duration="1500">Here to bring your life style to the next level.</p>
              <div className='headerBtn' onClick={() => navigate('/shop')} data-aos="fade-up" data-aos-duration="1500">SHOP NOW</div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide >
          <div className="slider2Box">
            <div className="sliderBox">
              <h1 data-aos="fade-left" data-aos-duration="1500">Sport Bicycle</h1>
              <p data-aos="fade-right" data-aos-duration="1500">Accompany you to the end of the road</p>
              <div className='headerBtn' onClick={() => navigate('/shop')} data-aos="fade-up" data-aos-duration="1500">SHOP NOW</div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </header>
  );
}

export default Header;


{/* <div className="bicycle-texts" key={item._id}>
<img className='bgimg' src={item.bgImg} alt="" />
<h1 data-aos="fade-left" data-aos-duration="1500">{item.headText}</h1>
<p data-aos="fade-right" data-aos-duration="1500">{item.description}</p>
</div> */}
