import React from "react";
import { UseModal } from "../../store";
import { Link } from "react-router-dom";
export default function HomeModal() {
  const { homeopenModal, homecloseModal } = UseModal();

  return (
    <div
      className="bg-black w-[200px] h-[250px] fixed top-[80px] left-[70px] mt-2 pt-10 text-white px-4 rounded shadow-lg z-10"
      onMouseEnter={homeopenModal}
      onMouseLeave={homecloseModal}>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <Link to='/' className="text-white">Home 1</Link>
            <p className="text-white ">Home 2</p>
            <p className="text-white ">Home 3</p>
            <p className="text-white ">Home 4</p>
            <p className="text-white ">Home 5</p>
            <p className="text-white ">Dark Home</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
