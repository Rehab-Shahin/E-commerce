import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { useSingleProductModal, useUserData } from "../../store";
import { useCart } from "../../store/cartStore";
import { useNavigate, Link } from "react-router-dom";

export default function SingleProductModal() {
  const navigate = useNavigate();
  const { setBuyNowItem, addToCart, openCartModal, cartItems } = useCart();
  const { isOpen, product, closeModal } = useSingleProductModal();
  const { requireLogin } = useUserData();

  const itemInCart = cartItems.find((i) => i.documentId === product?.documentId);
  const [quantity, setQuantity] = useState(itemInCart ? itemInCart.quantity : 1);

  useEffect(() => {
    if (itemInCart) {
      setQuantity(itemInCart.quantity);
    } else {
      setQuantity(1);
    }
  }, [itemInCart, isOpen]);

  const handleIncrease = () => setQuantity((q) => q + 1);
  const handleDecrease = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = () => {
    requireLogin(() => {
      if (product) {
        addToCart(product, quantity);
        closeModal();
        setTimeout(() => openCartModal(), 500);
      }
    });
  };

  const handleBuyNow = () => {
    requireLogin(() => {
      if (product) {
        setBuyNowItem(product, quantity);
        closeModal();
        navigate("/checkouts");
      }
    });
  };

  if (!isOpen || !product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="overlay"
          onClick={(e) => e.target.id === "overlay" && closeModal()}
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white w-[1100px] h-[560px] relative flex gap-6 top-10"
          >
            <button
              className="absolute top-4 right-4 text-2xl"
              onClick={closeModal}
            >
              <IoClose />
            </button>
            <div>
              <img
                src={product.img}
                alt={product.name}
                className="w-full object-cover h-[100%]"
              />
            </div>

            <div className="w-1/2 flex flex-col gap-4 py-4 px-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-5xl font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex gap-3 items-center">
                  <span className="text-xl text-black">
                    Tk {product.price_after}
                  </span>
                  <span className="line-through text-gray-500">
                    Tk {product.price_before}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-gray-600">
                  <span className="font-bold">Color: </span>Black
                </p>
                <div className="flex gap-2">
                  <div className="w-20 h-10 border bg-black text-white flex justify-center items-center">
                    Black
                  </div>
                  <div className="w-20 h-10 border border-gray-500 text-[#9c9b9b] flex justify-center items-center">
                    Silver
                  </div>
                  <div className="w-20 h-10 border border-gray-500 text-[#9c9b9b] flex justify-center items-center">
                    White
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full">
                <div className="flex items-center gap-3 border px-3 py-2 rounded-lg">
                  <button
                    onClick={handleDecrease}
                    className="px-3 py-1 border rounded-lg"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={handleIncrease}
                    className="px-3 py-1 border rounded-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white w-[73%] h-[53px] py-2 rounded-full hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
                >
                  Add To Cart
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="bg-black text-white h-[53px] py-2 rounded-full hover:translate-y-[-5px] transition-all duration-300 ease-in-out mt-3"
              >
                Buy It Now
              </button>

              <Link
                to={`/products/${product.documentId}`}
                onClick={closeModal}
                className="text-black underline mt-2"
              >
                View full details →
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
