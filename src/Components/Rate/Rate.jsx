
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation } from "swiper/modules";
import RateComponent from "./RateComponent";
import {MdOutlineArrowBackIos,MdOutlineArrowForwardIos,} from "react-icons/md";

export default function Rate({ padding }) {
  const RateDetails = [
    {
      header: "Smart Home Assistant",
      subtitle:
        "“This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.”",
      name: "Willie Bradley",
      jopTitle: "/ Reporter",
    },
    {
      header: "Best quality product",
      subtitle:
        "“This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.”",
      name: "Lisa Decamp",
      jopTitle: "Investor, Zemlex Co.",
    },
    {
      header: "Amazing build quality",
      subtitle:
        "“This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.”",
      name: "Cameron Williamson",
      jopTitle: "Banker, Simtom Bank Co.",
    },
    {
      header: "Best quality product",
      subtitle:
        "“This smart home assistant has become very important part of my daily routine. From managing my schedule and setting reminders to controlling smart home devices and answering questions.”",
      name: "Brain Armstrong",
      jopTitle: "CEO Deplex Group",
    },
  ];

  return (
    <div className={`my-[60px] sm:my-[90px] px-5 sm:px-10 lg:px-${padding}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div className="flex flex-col gap-3 sm:gap-5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Our Client’s Happiness
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600">
            The Best electronics products continue to drive innovation and shape
            <br className="hidden sm:block" />
            the way we live, work, and interact with our environment.
          </p>
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="mySwiper2-prev rounded-full shadow-sm border border-gray-300 w-9 h-9 sm:w-11 sm:h-11 cursor-pointer flex justify-center items-center">
            <span className="text-[16px] sm:text-[20px] text-gray-500">
              <MdOutlineArrowBackIos />
            </span>
          </div>
          <div className="mySwiper2-next rounded-full shadow-sm border border-gray-300 w-9 h-9 sm:w-11 sm:h-11 cursor-pointer flex justify-center items-center">
            <span className="text-[16px] sm:text-[20px] text-gray-500">
              <MdOutlineArrowForwardIos />
            </span>
          </div>
        </div>
      </div>

      <Swiper
        className="mySwiper2"
        spaceBetween={20}
        loop={true}
        navigation={{
          nextEl: ".mySwiper2-next",
          prevEl: ".mySwiper2-prev",
        }}
        breakpoints={{
          0: { slidesPerView: 1 }, 
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation]}
      >
        {RateDetails.map((el, index) => (
          <SwiperSlide key={index}>
            <RateComponent
              header={el.header}
              subtitle={el.subtitle}
              name={el.name}
              jopTitle={el.jopTitle}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
