import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './Slider.css';
import SliderCompent from './SliderCompent';
import {Navigation } from 'swiper/modules';
import bg1 from '../../assets/imgs/bg1.png'
import bg2 from '../../assets/imgs/bg2.png'
import { useEffect, useRef } from 'react';


export default function Slider() {

  const sliderRef = useRef(null);

  useEffect(() => {
    window.sliderRef = sliderRef;
  }, []);

  return (
    <div ref={sliderRef}>
      <Swiper
       className="mySwiper1"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={true}
        modules={[Navigation]}
      >
        <SwiperSlide>
          <SliderCompent
            backgroundImage={bg1} 
            subtitle="LET’S BE SMARTER"
            title={<>Enjoy your daily<br />life Smart way...</>}
            description={<>Smartwatches provide quick access to notifications, calls, messages,<br />and apps right on your wrist, reducing the constantly check your phone.</>}
            btn_labal_1="Pre-Order"
            btn_labal_2="View more"
          />
        </SwiperSlide>

        <SwiperSlide>
          <SliderCompent
            backgroundImage={bg2}
            subtitle="DISCOUNT UPTO 75%, HURRY UP!"
            title={<>Next generation<br />Virtual reality</>}
            description={<>VR is the most quick access to notifications, calls, messages,<br />apps right on your wrist, reducing the constantly check.</>}
             btn_labal_1="Buy Now"
             btn_labal_2="View more"
          />
        </SwiperSlide>

      </Swiper>
    </div>
  )
}
