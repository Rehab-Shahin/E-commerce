import React from "react";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../store/cartStore";
import { Link, useNavigate } from "react-router-dom";

export default function CartModal() {
  const {
    cartModal,
    cartItems,
    closeCartModal,
    removeFromCart,
    addToCart,
    clearBuyNow
  } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price_after * item.quantity,
    0
  );
  const navigate = useNavigate();
  const viewCart = () => {
    navigate("/cart");
    closeCartModal();
  };

  return (
    <AnimatePresence>
      {cartModal && (
        <div
          id="overlay"
          onClick={(e) => e.target.id === "overlay" && closeCartModal()}
          className="fixed inset-0 bg-black/50 flex justify-end z-200"
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="bg-white w-[360px] lg:w-[430px] h-full flex flex-col"
          >
            <div className="p-6 flex flex-col flex-grow overflow-y-auto">
              <div className="flex items-center justify-between bg-green-100 text-green-700 px-3 py-2 rounded-md mb-4">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-600 text-lg" />
                  <span className="font-medium">Item added to your cart</span>
                </div>
                <button
                  className="text-gray-500 hover:text-black"
                  onClick={closeCartModal}
                >
                  <IoClose className="text-xl" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.documentId}
                      className="flex justify-between gap-3"
                    >
                      <Link
                        to={`/products/${item.documentId}`}
                        onClick={closeCartModal}
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-40 h-40 object-cover rounded-md"
                        />
                      </Link>

                      <div className="flex flex-col flex-grow">
                        <h3 className="text-[20px] text-[#bab7b7]">
                          {item.type}
                        </h3>
                        <h3 className="font-bold">{item.name}</h3>
                        <h3 className="font-bold">
                          Color:{" "}
                          <span className="font-light text-[15px]">
                            Rose gold
                          </span>
                        </h3>
                        <p className="text-sm text-black">
                          Tk {(item.price_after * item.quantity).toLocaleString()}
                        </p>
                        <div className="flex gap-10 pt-3">
                          <div className="flex justify-center items-center w-[90px] h-[40px] gap-2 mt-1 rounded-full border border-[#e2dddd]">
                            <button
                              onClick={() =>
                                item.quantity > 1
                                  ? removeFromCart(item.documentId, true)
                                  : removeFromCart(item.documentId) 
                              }
                              className="px-2 py-1"
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item, 1)}
                              className="px-2 py-1"
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="pt-4 underline text-black"
                            onClick={() => removeFromCart(item.documentId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 shadow-[0_-4px_10px_rgba(0,0,0,0.3)] h-[150px]">
                <div className="flex justify-between items-center text-lg mb-4">
                  <span className="text-2xl font-bold">Subtotal</span>
                  <span className="text-[#9c9b9b] text-[20px] pr-3 ">
                    Tk {subtotal.toLocaleString()} BDT
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={viewCart}
                    className=" text-black border border-b-gray-500 hover:bg-black hover:text-white w-[50%] h-[50px] py-2 rounded-full hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
                  >
                    View Cart
                  </button>
                  <button
                     onClick={()=>{
                      closeCartModal();
                      clearBuyNow()
                      navigate("/checkouts");
                      }}
                     className="text-white bg-black w-[50%] h-[50px] py-2 rounded-full hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
                     >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
