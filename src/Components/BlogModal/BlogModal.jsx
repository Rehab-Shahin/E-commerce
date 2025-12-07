import React from "react";
import { UseModal } from "../../store";
export default function ProductModal() {
  const {blogopenModal,blogcloseModal} = UseModal();

  return (
    <div
      className="bg-black w-[200px] h-[130px] fixed top-[90px] left-[551px] mt-2 pt-5 text-white px-4 rounded shadow-lg z-10"
      onMouseEnter={blogopenModal}
      onMouseLeave={blogcloseModal}>
      <div className="flex justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-white ">Blog Left Sidebar</p>
            <p className="text-white ">Blog Right Sidebar</p>
            <p className="text-white ">Blog Post Details</p>
          </div>
      </div>
    </div>
  );
}
