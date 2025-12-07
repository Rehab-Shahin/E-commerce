import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation} from "swiper/modules";
import { useCategories } from "../../store";
import TeamCard from "../TeamCard/TeamCard";

export default function Team() {
  const {team } = useCategories();

  return (
    <div className="flex flex-col gap-5 my-[160px]">
      <h1 className="text-4xl md:text-6xl font-bold flex justify-center text-center">
        Player’s behind the screen
      </h1>
      <div className="text-[15px] md:text-[17px] flex flex-col justify-center items-center pb-10 text-center px-4">
        <p>
          Smartwatches provide quick access to notifications, calls, messages,
          and
        </p>
        <p>apps right on your wrist, reducing the constantly check your phone.</p>
      </div>
      <div className="px-4 md:px-10 group2 relative">
        <Swiper
          className="team-swiper"
          spaceBetween={20}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            0: { slidesPerView: 2 }, 
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 }
          }}
        >
          {team.map((el, index) => (
            <SwiperSlide key={el.documentId || index}>
              <TeamCard
                img={el.img}
                name={el.name}
                role={el.role}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
