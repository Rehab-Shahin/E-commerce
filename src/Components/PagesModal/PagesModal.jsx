import React from "react";
import { UseModal } from "../../store";
import { Link } from "react-router-dom";
export default function ProductModal() {
  const { pagesopenModal, pagescloseModal} = UseModal();

  return (
    <div
      className="bg-black w-[200px] h-[220px] fixed top-[80px] left-[250px] mt-2 pt-5 text-white px-4 rounded shadow-lg z-10"
      onMouseEnter={pagesopenModal}
      onMouseLeave={pagescloseModal}>
      <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <Link to='/about-Us'><p className="text-white ">About us</p></Link>
            <Link to='/contact'><p className="text-white ">Contact us</p></Link>
            <p className="text-white ">FAQ's</p>
            <p className="text-white ">Teams</p>
          </div>
      </div>
    </div>
  );
}
