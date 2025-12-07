import React, { useEffect } from "react";
import { useCart } from "../../store/cartStore";
import { Link, useNavigate } from "react-router-dom";
import { IoTrashOutline } from "react-icons/io5";
import PageHeader from "../../Components/PageHeader/PageHeader";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price_after * item.quantity,
    0
  );
   useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  return (
    <div className="pt-15 lg:pt-25">
      <PageHeader/>
      <div className="p-10">
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center h-[50vh] items-center gap-3">
          <p className=" text-6xl font-bold">Your cart is empty</p>
          <Link to="/" className="hover:text-gray-500">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600 border-b border-b-[#d2d5d6]">
                <th className="py-3">PRODUCT</th>
                <th className="py-3 text-center">QUANTITY</th>
                <th className="py-3 text-right pr-4">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.documentId}
                >
                  <td
                   className="py-4 flex gap-4 items-center"
                   onClick={() => navigate(`/products/${item.documentId}`)}>
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-500">{item.type}</p>
                      <p className="text-sm text-gray-600">
                        Color: <span className="font-light">Rose gold</span>
                      </p>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.documentId, item.quantity - 1)
                            : removeFromCart(item.documentId)
                        }
                        className="px-3 py-1 border rounded-full"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.documentId, item.quantity + 1)
                        }
                        className="px-3 py-1 border rounded-full"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.documentId)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <IoTrashOutline size={20} />
                      </button>
                    </div>
                  </td>
                  <td className="text-right pr-4 font-bold">
                    Tk {(item.price_after * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {cartItems.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex-1 min-w-[280px]">
                <h3 className="font-semibold mb-2">
                  Order special instructions
                </h3>
                <textarea
                  rows="5"
                  placeholder="Add your notes here..."
                  className="w-full border border-gray-400 rounded-md p-3"
                ></textarea>
              </div>

              <div className="flex-1 min-w-[280px] pl-10">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Estimate shipping rates <span className="text-gray-400">ⓘ</span>
                </h3>
                <select className="w-full border rounded-md p-3 mb-3">
                  <option>---</option>
                  <option>Bangladesh</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
                <input
                  type="text"
                  placeholder="Postal/ZIP code"
                  className="w-full border rounded-md p-3 mb-3"
                />
                <button className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800">
                  Calculate
                </button>
              </div>

              <div className="flex-1 min-w-[280px] pt-10 flex flex-col gap-3 items-center text-right">
                <div>
                  <p className="text-xl font-bold mb-2">
                    Subtotal: Tk {subtotal.toLocaleString()} BDT
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Taxes and shipping calculated at checkout
                  </p>
                </div>
                <button
                   onClick={() => navigate("/checkouts")}
                  className="w-80 bg-black text-white py-3 rounded-full hover:translate-y-[-3px] transition-all duration-300">
                  Check Out
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </div>
  );
}
