import styles from "./styles.module.scss";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper";
import { useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
export default function ProductSwiper({
  images,
  slug,
  active,
  addToCartHandler,
}) {
  const [swiper, setSwiper] = useState();
  const [onEnter, setonEnter] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });
  const swiperRef = useRef();
  useEffect(() => {
    swiper?.autoplay?.stop();
  }, [swiper]);
  return (
    <div
      className={styles.swiper + " relative overflow-hidden"}
      onMouseEnter={() => {
        swiper?.autoplay?.start();
        setonEnter(true);
      }}
      onMouseLeave={() => {
        swiper?.autoplay?.stop();
        swiper?.slideTo(0);
        setonEnter(false);
      }}
    >
      <Link href={`/product/${slug}?style=${active}`}>
        <a>
          <Swiper
            ref={swiperRef}
            onSwiper={(swiper) => {
              setSwiper(swiper);
            }}
            centeredSlides={true}
            autoplay={{ delay: 500, stopOnLastSlide: false }}
            speed={500}
            modules={[Autoplay]}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img.url} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </a>
      </Link>

      <div
        className={`absolute bottom-[20px] flex justify-center z-[1000] transition-all ${
          (onEnter || isMobile) && "slide-in-bottom"
        } translate-y-[1000px] w-full`}
      >
        <button
          type="button"
          onClick={addToCartHandler}
          className={`relative inline-flex items-center text-center justify-center rounded-md border border-transparent bg-black  px-4 py-3 w-[90%] text-sm font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
