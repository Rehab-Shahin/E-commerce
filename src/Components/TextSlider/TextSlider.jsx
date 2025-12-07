import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { PiStarFourFill } from "react-icons/pi";
export default function TextSlider() {

  const texts = Array(10).fill("Welcome to our store");

  return (
    <div className="bg-black text-white py-3 h-36 flex justify-center items-center">
      <Swiper
        modules={[Autoplay]}
        slidesPerView="auto"
        spaceBetween={40}
        loop={true}
        speed={4000}
        autoplay={{
          delay: 0,
          reverseDirection: true, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true, 
        }}
        className="flex items-center"
      >
        {texts.map((text, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <div className="flex items-center justify-center gap-3">
              <PiStarFourFill className="text-xl" /> 
              <span className="text-4xl font-extrabold stroke-white">
                {text}
              </span>
              <PiStarFourFill className="text-xl" /> 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
