import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useCategories } from "../../store";
import ProductCard from "../ProductCard/ProductCard";

export default function RecommendedProduct() {
  const { products } = useCategories();

  return (
    <div className="flex flex-col gap-5 my-[100px] md:my-[160px]">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex justify-center pb-6 md:pb-10">
        Recommended products
      </h1>
      <div>
        <Swiper
          className="mySwiper1"
          spaceBetween={20} 
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          breakpoints={{
            0: {
              slidesPerView: 2, 
            },
            640: {
              slidesPerView: 2, 
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.map((el, index) => (
            <SwiperSlide key={el.documentId || index}>
              <ProductCard
                img={el.product_img}
                name={el.product_name}
                price_before={el.product_price_before}
                price_after={el.product_price_after}
                documentId={el.documentId}
                type={el.product_type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
