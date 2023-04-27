import styles from "./styles.module.scss";
import MainSwiper from "./swiper";
import Offers from "./offers";
import { useSession } from "next-auth/react";
import Menu from "./Menu";
import Link from "next/link";

//-----------------------------
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

export default function Main() {
  const { data: session } = useSession();
  return (
    <div className={styles.main}>
      <MainSwiper />
    </div>
  );
}
