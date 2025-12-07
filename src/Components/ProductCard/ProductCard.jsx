
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BiGitCompare } from "react-icons/bi";
import { useCompare, useSingleProductModal } from "../../store";
import { useCart } from "../../store/cartStore";
import { useFav } from "../../store";

export default function ProductCard({
  img,
  name,
  price_after,
  price_before,
  documentId,
  description,
  type,
}) {
  const navigate = useNavigate();
  const { openModal } = useSingleProductModal();
  const { cartItems, removeFromCart } = useCart();
  const { favItems, addToFav, removeFromFav } = useFav();
  const { compareItems, addToCompare, removeFromCompare } = useCompare();

  const product = {
    documentId,
    name,
    price_after,
    price_before,
    img,
    description,
    type,
  };

   const openProductPage = (id) => {
    navigate(`/products/${id}`);
  };

  const isInCart = cartItems.some((item) => item.documentId === documentId);
  const isFav = favItems.some((item) => item.documentId === documentId);
  const isCompare = compareItems.some((item) => item.documentId === documentId);

  return (
    <div className="flex flex-col gap-3 bg-white shadow-md hover:shadow-xl/30 rounded-xl group relative overflow-hidden transition">
      <img
        src={img}
        className="w-full h-[350px] md:h-[300px] rounded-t-xl object-cover cursor-pointer"
        alt={name}
        onClick={() => openProductPage(documentId)}
      />
      <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => {
            if (isInCart) removeFromCart(documentId);
            else openModal(product);
          }}
        >
          <div
            className={`${
              isInCart ? "bg-black text-white" : "bg-white text-gray-900"
            } rounded-full w-9 h-9 flex justify-center items-center text-lg hover:shadow-md transition-colors`}
          >
            <FaPlus />
          </div>
        </button>
        <button onClick={() => openModal(product)}>
          <div className="bg-white text-gray-600 rounded-full w-9 h-9 flex justify-center items-center text-lg hover:shadow-md">
            <IoEyeOutline />
          </div>
        </button>
        <button
          onClick={() => {
            if (isFav) removeFromFav(documentId);
            else addToFav(product);
          }}
        >
          <div
            className={`${
              isFav ? "bg-black text-white" : "bg-white text-gray-600"
            } rounded-full w-9 h-9 flex justify-center items-center text-lg hover:shadow-md transition-colors`}
          >
            {isFav ? <MdFavorite /> : <MdFavoriteBorder />}
          </div>
        </button>
        <button
          onClick={() => {
            if (isCompare) removeFromCompare(documentId);
            else addToCompare(product);
          }}
        >
          <div
            className={`${
              isCompare ? "bg-black text-white" : "bg-white text-gray-600"
            } rounded-full w-9 h-9 flex justify-center items-center text-lg hover:shadow-md`}
          >
            <BiGitCompare />
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-1 p-3 px-4">
        <h1 className="text-lg sm:text-xl font-bold line-clamp-1">{name}</h1>
        <div className="flex gap-2 flex-wrap">
          <span className="text-[15px] sm:text-[16px] font-semibold">
            Tk {price_after}
          </span>
          <span className="line-through text-gray-600 text-sm sm:text-base">
            Tk {price_before}
          </span>
        </div>
      </div>
    </div>
  );
}
