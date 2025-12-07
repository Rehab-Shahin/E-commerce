
import { Link } from "react-router-dom";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { useFav } from "../../store";
import PageHeader from "../../Components/PageHeader/PageHeader";
import { useEffect } from "react";

export default function Wishlist() {
  const { favItems } = useFav();
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  return (
    <div className="pt-15 lg:pt-25">
      <PageHeader/>
      <div className="p-10">
      {favItems.length === 0 ? (
        <div className="flex flex-col justify-center h-[50vh] items-center gap-3">
                  <p className=" text-6xl font-bold">Empty Wishlist</p>
                  <Link to="/" className="hover:text-gray-500">
                    Continue shopping
                  </Link>
                </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {favItems.map((item) => (
            <ProductCard key={item.documentId} {...item} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
