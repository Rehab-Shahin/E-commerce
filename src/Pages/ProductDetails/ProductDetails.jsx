import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../store/cartStore";
import { useUserData } from "../../store";
import supabase from "../../supabase";
import RecommendedProduct from "../../Components/RecommendedProduct/RecommendedProduct";

export default function ProductDetails() {
  const { requireLogin } = useUserData();
  const { addToCart, openCartModal, cartItems, setBuyNowItem } = useCart();
  const params = useParams();
  const documentId = params.id;
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState(null);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", documentId)
        .single(); // جلب صف واحد فقط

      if (error) {
        console.error("Error fetching product:", error);
        return;
      }

      setProductInfo({
        id: data.id,
        name: data.product_name,
        vendor: data.product_type,
        img: data.product_img,
        price_after: data.product_price_after,
        price_before: data.product_price_before,
        stock: data.stock || 60, // لو مش موجود
        colors: ["black", "silver", "white"], // ممكن تضيفي عمود colors لاحقاً
      });

      const itemInCart = cartItems.find((i) => i.id === data.id);
      setQuantity(itemInCart ? itemInCart.quantity : 1);
    };

    fetchProduct();
  }, [documentId, cartItems]);

  if (!productInfo) {
    return <p className="p-10 text-center">Loading product details...</p>;
  }

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    requireLogin(() => {
      addToCart(productInfo, quantity);
      setTimeout(() => openCartModal(), 500);
    });
  };

  const handleBuyNow = () => {
    requireLogin(() => {
      setBuyNowItem(productInfo, quantity);
      navigate("/checkouts");
    });
  };

  const discountPercent = Math.round(
    ((productInfo.price_before - productInfo.price_after) /
      productInfo.price_before) *
      100
  );
  const stockPercent = Math.min((productInfo.stock / 300) * 100, 100);

  return (
    <div className="pt-[90px] lg:pt-[120px] px-4 md:px-[50px]">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <img
            className="rounded-md w-full h-[350px] md:h-[500px] lg:h-[600px] object-cover"
            src={productInfo.img}
            alt={productInfo.name}
          />
        </div>
        <div className="w-full lg:w-1/2 pt-6 flex flex-col gap-5">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            {productInfo.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xl md:text-2xl font-semibold">
              Tk {productInfo.price_after}
            </p>
            <p className="line-through text-gray-500">
              Tk {productInfo.price_before}
            </p>
            <span className="bg-gray-200 text-sm px-2 py-1 rounded">SALE</span>
            <span className="bg-black text-white text-sm px-2 py-1 rounded">
              -{discountPercent}%
            </span>
          </div>

          <p className="text-gray-600">
            <span className="font-bold">Vendor:</span> {productInfo.vendor}
          </p>

          <div className="w-full">
            <p className="text-gray-600 mb-1">
              Only {productInfo.stock} items in stock!
            </p>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-black h-2 rounded"
                style={{ width: `${stockPercent}%` }}
              ></div>
            </div>
          </div>

          <p className="text-gray-600">
            <span className="font-bold">Color:</span> {productInfo.colors[0]}
          </p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-black"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>

          <p className="text-gray-600 font-bold">Quantity</p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center gap-3 border px-3 py-2 rounded-full h-[53px] border-b-gray-300">
              <button onClick={handleDecrease} className="px-3 py-1">
                -
              </button>
              <span>{quantity}</span>
              <button onClick={handleIncrease} className="px-3 py-1">
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white w-full sm:w-[60%] h-[53px] py-2 rounded-full hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
            >
              Add To Cart
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="bg-black text-white w-full h-[53px] py-2 rounded-full hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
          >
            Buy It Now
          </button>
        </div>
      </div>
      <RecommendedProduct />
    </div>
  );
}
