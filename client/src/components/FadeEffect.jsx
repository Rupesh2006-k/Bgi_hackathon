import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
const slides = [img1, img2, img3, img4];

const FadeEffect = () => {
  return (
    <div className="h-[270px] w-full overflow-hidden rounded-2xl sm:h-[320px] md:h-[360px] lg:h-[420px]">
      <Swiper
        spaceBetween={30}
        effect="fade"
        navigation={false} // ← arrows remove ho jayenge
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[EffectFade, Pagination, Autoplay]}
        className="h-full w-full rounded-2xl
    [&_.swiper-pagination-bullet]:!bg-orange-200
    [&_.swiper-pagination-bullet]:!opacity-100
    [&_.swiper-pagination-bullet-active]:!bg-orange-500
    [&_.swiper-pagination-bullet-active]:scale-125
    [&_.swiper-pagination-bullet]:transition-all
    [&_.swiper-pagination-bullet]:duration-300"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="block h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FadeEffect;
