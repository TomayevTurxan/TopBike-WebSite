import React from 'react'
import "./blogsDownSection.scss"
import { Link } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useFetchData from '../../hooks/useFetchData';

function BlogsDownSection() {
  const { product } = useFetchData('latestNews')
  return (
    <section id='latestNewSection'>
      <div className="latestSectionUpBox">
        <h1>LATEST NEWS</h1>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          538: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          product && product.map((item) => (
            <SwiperSlide key={item._id}>

              <div className="latestBox" >
                <div className="latestImgBox">
                  <img src={item.bgImg} alt="" />
                  <div className="dec">
                    <p>08</p>
                    <hr />
                    <p>DEC</p>
                  </div>
                </div>
                <div className="latestTextBox">
                  <p style={{ color: "gray", fontSize: "18px", cursor: "pointer" }}>{item.news}</p>
                  <p style={{ fontSize: "23px", cursor: "pointer" }}>{item.title}</p>
                  <span style={{ color: "gray" }}>{item.description}</span>
                  <button><p>{item.read}</p></button>
                </div>
              </div>
            </SwiperSlide>

          ))
        }
      </Swiper>
    </section>
  )
}

export default BlogsDownSection