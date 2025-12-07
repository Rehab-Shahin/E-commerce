import React from "react";
import { FaCreditCard, FaGift } from "react-icons/fa";
import { MdPayment } from "react-icons/md";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaCreditCard size={28} />,
      title: "Free Shipping",
      desc: "Free shipping for order over $250",
    },
    {
      icon: <MdPayment size={28} />,
      title: "Flexible Payment",
      desc: "Easy and secure payment system",
    },
    {
      icon: <FaGift size={28} />,
      title: "Earn Point",
      desc: "Shop more and earn points",
    },
  ];

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 my-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col lg:flex items-center justify-center p-8 text-center gap-4"
        >
          <div className="border rounded-full p-5">{feature.icon}</div>
        <div>
            <h4 className="font-bold text-lg">{feature.title}</h4>
            <p className="text-gray-600">{feature.desc}</p>
        </div>
        </div>
      ))}
    </section>
  );
}
