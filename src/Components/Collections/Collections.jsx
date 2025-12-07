
import { useCategories } from "../../store";
import { useNavigate } from "react-router-dom";
import PageHeader from "../PageHeader/PageHeader";

export default function Collections() {
  const { categories} = useCategories();
  console.log(categories);
  const navigate = useNavigate();

   const openCategory = (id) => {
    navigate(`/collections/${id}`);
  };

  return (
    <div className="pt-15 lg:pt-25">
      <PageHeader/>
      <div className="flex flex-col gap-5 justify-center items-center my-[60px] px-20">
      <h1 className="text-6xl font-bold text-center">Collections</h1>
      <p className="text-[20px] m-0 text-gray-600 text-center max-w-3xl">
        At our store you will find a wide selection of products to suit your
        every need.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mt-6 gap-10">
        {categories.map((el, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 justify-center items-center cursor-pointer"
            onClick={() => openCategory(el.id)}
          >
            <div className="group relative 
              w-[220px] h-[220px] 
              sm:w-[280px] sm:h-[280px] 
              lg:w-[320px] lg:h-[320px] 
              rounded-full overflow-hidden shadow-lg"
            >
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${el.category_img})`,
                }}
              ></div>
            </div>
            <h1 className="text-3xl font-semibold text-center">
              {el.category_name}
            </h1>
            <p className="text-gray-500 text-[20px]">
              {/* {el.products.length} items */}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
