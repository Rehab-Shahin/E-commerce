import React from "react";
import { UseModal } from "../../store";
import styles from "./ShowModal.module.css";
export default function ProductModal() {
  const { shopopenModal, shopcloseModal } = UseModal();

  return (
    <div
      className="bg-black w-full  h-[350px] fixed top-[80px] left-0 mt-2 px-30 pt-10 text-white p-4 rounded shadow-lg z-200"
      onMouseEnter={shopopenModal}
      onMouseLeave={shopcloseModal}>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold">SHOP LAYOUTS</h1>
            <p className="text-gray-400 text-[16px]">Default</p>
            <p className="text-gray-400 text-[16px]">Shop Left Sidebar</p>
            <p className="text-gray-400 text-[16px]">Shop Left Sidebar</p>
            <p className="text-gray-400 text-[16px]">Shop Canvas Sidebar</p>
            <p className="text-gray-400 text-[16px]">Collections list</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold">PRODUCT STYLES</h1>
            <p className="text-gray-400 text-[16px]">Product style 01</p>
            <p className="text-gray-400 text-[16px]">Product style 02</p>
            <p className="text-gray-400 text-[16px]">Product style 03</p>
            <p className="text-gray-400 text-[16px]">Product style 04</p>
            <p className="text-gray-400 text-[16px]">Product style 05</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold">SHOP LAYOUTS</h1>
            <p className="text-gray-400 text-[16px]">Hidden sidebar</p>
            <p className="text-gray-400 text-[16px]">Full-width layout</p>
            <p className="text-gray-400 text-[16px]">Pagination page</p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className={styles.headerImg1}>
            <div className={styles.background1}></div>
            <div className={styles.label1}>Speaker</div>
          </div>

          <div className={styles.headerImg2}>
            <div className={styles.background2}></div>
            <div className={styles.label2}>PC & Laptop</div>
          </div>
        </div>
      </div>
    </div>
  );
}
