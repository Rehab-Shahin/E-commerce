import React from "react";
import { UseModal } from "../../store";
import styles from "./ProductModal.module.css";
export default function ProductModal() {
  const { openModal, closeModal } = UseModal();

  return (
    <div
      className="bg-black w-full h-[350px] fixed top-[80px] left-0 mt-2 px-30 pt-10 text-white p-4 rounded shadow-lg z-[9999]"
      onMouseEnter={openModal}
      onMouseLeave={closeModal}>
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold">PRODUCT STYLES</h1>
            <p className="text-gray-400 text-[16px]">Product style 01</p>
            <p className="text-gray-400 text-[16px]">Product style 02</p>
            <p className="text-gray-400 text-[16px]">Product style 03</p>
            <p className="text-gray-400 text-[16px]">Product style 04</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold">PRODUCT STYLES</h1>
            <p className="text-gray-400 text-[16px]">Dropdown swatch</p>
            <p className="text-gray-400 text-[16px]">
              Product recently viewed{" "}
            </p>
            <p className="text-gray-400 text-[16px]">Grid 1 columns</p>
            <p className="text-gray-400 text-[16px]">Product 3D, AR models</p>
            <p className="text-gray-400 text-[16px]">Short description</p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-gray-400 font-bold">PRODUCT STYLES</h1>
            <p className="text-gray-400 text-[16px]">Countdown product</p>
            <p className="text-gray-400 text-[16px]">Product video</p>
            <p className="text-gray-400 text-[16px]">Pickup available</p>
            <p className="text-gray-400 text-[16px]">Thumbnails carousel</p>
            <p className="text-gray-400 text-[16px]">Stacked</p>
          </div>
        </div>
        <div className="flex gap-5">
          <div className={styles.headerImg1}>
            <div className={styles.background1}></div>
            <div className={styles.label1}>Accessories</div>
          </div>

          <div className={styles.headerImg2}>
            <div className={styles.background2}></div>
            <div className={styles.label2}>Home Appliances</div>
          </div>
        </div>
      </div>
    </div>
  );
}
