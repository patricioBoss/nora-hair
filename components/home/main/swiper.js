import styles from "./styles.module.scss";

import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function MainSwiper() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mainSwiper !rounded-none"
      >
        {[...Array(2).keys()].map((i) => (
          <SwiperSlide key={i} className=" !rounded-none">
            <img src={`../../../images/hair-bg/hair-banner${i + 1}.jpg`} className="!rounded-none !w-full" alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
