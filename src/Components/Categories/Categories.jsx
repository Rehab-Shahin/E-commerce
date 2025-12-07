import React from "react";
import { useCategories } from "../../store";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const { categories } = useCategories();
  const navigate = useNavigate();

  const openCategory = (id) => {
    navigate(`/collections/${id}`);
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center my-12 md:px-16 lg:px-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Choose your Category
      </h1>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-md sm:max-w-xl md:max-w-2xl">
        Smartwatches provide quick access to notifications, calls, messages, and
        apps right on your wrist, reducing the need to constantly check your phone.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full mt-6">
        {categories.map((el, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 sm:gap-4 justify-center items-center cursor-pointer"
            onClick={() => openCategory(el.id)}
          >
            <div className="group relative 
                w-[180px] h-[180px]          
                sm:w-[200px] sm:h-[200px]   
                md:w-[220px] md:h-[220px]   
                lg:w-[250px] lg:h-[250px]  
                rounded-full overflow-hidden shadow-lg"
            >
              <div
                className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-in-out group-hover:scale-110"
                style={{
                  backgroundImage: `url(${el.category_img})`,
                }}
              ></div>
            </div>

            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
              {el.category_name}
            </h1>

            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              {/* {el.products.length} items */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
