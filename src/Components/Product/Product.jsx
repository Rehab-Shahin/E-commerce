import { useCategories } from "../../store";
import ProductCard from "../ProductCard/ProductCard";

export default function Products({ header }) {
  const { products } = useCategories();

  return (
    <div className="flex flex-col gap-5 px-3 md:px-16 lg:px-20 my-[160px]">
      <h1 className="text-5xl font-bold">{header}</h1>
      <p className="text-[20px] m-0 text-gray-600">
        Electronics products continue to drive innovation and shape the
        <br />
        way we live, work, and interact with our environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-7 gap-10">
        {products.map((el, index) => (
          <ProductCard
            key={index}
            img={el.product_img}
            name={el.product_name}
            price_before={el.product_price_before}
            price_after={el.product_price_after}
            documentId={el.id}
            type ={el.product_type}
        />
        ))}
      </div>
    </div>
  );
}
