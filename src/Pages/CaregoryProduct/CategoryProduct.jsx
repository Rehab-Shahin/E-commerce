import React, { useEffect, useState } from "react";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import supabase from "../../supabase";

export default function CategoryProduct() {
  const [activebtn, setActivebtn] = useState(2);
  const [sortOption, setSortOption] = useState("");
  const [CategoryInfo, setCategoryInfo] = useState(null);
  const [check, setCheck] = useState(false);
  const [numOfCols, setNmeOfCols] = useState(4);

  const params = useParams();

  const handleChange = (e) => {
    setSortOption(e.target.value);
  };

  const gridColsMap = {
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
  };

  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      // ======= SORT SETTINGS ==========
      const sortMap = {
        "Alphabetically, A-Z": { column: "product_name", ascending: true },
        "Alphabetically, Z-A": { column: "product_name", ascending: false },
        "Price, low to high": { column: "product_price_after", ascending: true },
        "Price, high to low": { column: "product_price_after", ascending: false },
        "Date, old to new": { column: "created_at", ascending: true },
        "Date, new to old": { column: "created_at", ascending: false },
      };

      const sortSettings = sortMap[sortOption] || null;

      // ======= FETCH CATEGORY + PRODUCTS =======
      const { data, error } = await supabase
        .from("Category")
        .select(
          `
          *,
          product_categories(
            products(*)
          )
        `
        )
        .eq("id", params.id);

      if (error) {
        console.error(error);
        return;
      }

      // ======= EXTRACT CATEGORY ========
      const category = data[0];

      // ======= EXTRACT PRODUCTS FROM MANY-TO-MANY ========
      let products =
        category?.product_categories?.map((pc) => pc.products) || [];

      // ======= APPLY SORTING IN FRONTEND ========
      if (sortSettings && sortSettings.column) {
        products = products.sort((a, b) => {
          const col = sortSettings.column;

          // لو القيمة نص
          if (typeof a[col] === "string") {
            return sortSettings.ascending
              ? a[col].localeCompare(b[col])
              : b[col].localeCompare(a[col]);
          }

          // لو القيمة رقم (price)
          if (typeof a[col] === "number") {
            return sortSettings.ascending ? a[col] - b[col] : b[col] - a[col];
          }

          // لو تاريخ
          return sortSettings.ascending
            ? new Date(a[col]) - new Date(b[col])
            : new Date(b[col]) - new Date(a[col]);
        });
      }

      // ======= SEND TO STATE ========
      setCategoryInfo({
        ...category,
        products,
      });

      setCheck(true);
    };

    fetchCategoryProducts();
  }, [sortOption, params.id]);

  return (
    <div>
      <div className="py-[70px] lg:py-[100px]">
        <div className="p-10 bg-[#f3f3f3] md:p-15 text-3xl md:text-5xl font-bold">
          <h1>{CategoryInfo?.category_name}</h1>
        </div>

        <div className="p-10 text-black md:p-15 md:text-[15px] flex flex-col md:flex-row md:justify-between gap-5">
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => {
                setActivebtn(1);
                setNmeOfCols(3);
              }}
              className={`hover:text-[#ad985c] cursor-pointer ${
                activebtn === 1 ? "text-[#ad985c]" : ""
              }`}
            >
              |||
            </button>

            <button
              onClick={() => {
                setActivebtn(2);
                setNmeOfCols(4);
              }}
              className={`hover:text-[#ad985c] cursor-pointer ${
                activebtn === 2 ? "text-[#ad985c]" : ""
              }`}
            >
              ||||
            </button>

            <button
              onClick={() => {
                setActivebtn(3);
                setNmeOfCols(5);
              }}
              className={`hover:text-[#ad985c] cursor-pointer ${
                activebtn === 3 ? "text-[#ad985c]" : ""
              }`}
            >
              |||||
            </button>
          </div>

          <div className="flex flex-wrap gap-5 items-center">
            <p className="font-bold">Sort by:</p>

            <select
              value={sortOption}
              onChange={handleChange}
              className="w-[200px] border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none"
            >
              <option value="">Default</option>
              <option value="Alphabetically, A-Z">Alphabetically, A-Z</option>
              <option value="Alphabetically, Z-A">Alphabetically, Z-A</option>
              <option value="Price, low to high">Price, low to high</option>
              <option value="Price, high to low">Price, high to low</option>
              <option value="Date, old to new">Date, old to new</option>
              <option value="Date, new to old">Date, new to old</option>
            </select>

            <p className="font-bold">
              {CategoryInfo?.products?.length || 0} products
            </p>
          </div>
        </div>

        <hr className="m-2 text-gray-300" />

        {check && (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 ${gridColsMap[numOfCols]} p-10 gap-10`}
          >
            {CategoryInfo.products?.map((el) => (
              <ProductCard
                key={el.id}
                img={el.product_img}
                name={el.product_name}
                price_after={el.product_price_after}
                price_before={el.product_price_before}
                documentId={el.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
