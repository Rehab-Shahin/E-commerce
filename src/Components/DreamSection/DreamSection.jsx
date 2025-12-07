import React from "react";
import shopImg from "../../assets/imgs/dream.png";
import { useNavigate } from "react-router-dom";

export default function DreamSection() {

  const navigate =useNavigate()
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center p-3 lg:p-10">
      <div>
        <img
          src={shopImg}
          alt="Shop"
          className="rounded-2xl shadow-lg w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Our Dream is to be a Global Electronic Brand
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Best electronics products continue to drive innovation and shape
          the way we live, work, and interact with our environment
          opportunities for customers to test out products before making a
          purchase. This can include hands-on demonstrations, features, and
          functionalities, allowing customers to experience the product
          decisions.
        </p>

        <ul className="grid grid-cols-2 gap-3 font-bold">
          <li>• Latest Technology</li>
          <li>• Quick Servicing</li>
          <li>• Best R&D Team</li>
          <li>• Expert Team</li>
        </ul>

        <button
          onClick={()=>navigate('/collections')}
          className="bg-black text-white w-full px-6 py-3 rounded-full sm:w-max hover:bg-gray-800">
          Shop Now
        </button>
      </div>
    </section>
  );
}
