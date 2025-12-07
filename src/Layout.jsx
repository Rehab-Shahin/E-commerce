import React from "react";
import { Outlet } from "react-router-dom";
import NavHeader from "./Components/NavHeader/NavHeader";
import Footer from "./Components/Footer/Footer";
import InstagramShop from "./Components/InstagramShop/InstagramShop";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavHeader/>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      <InstagramShop/>
      <Footer />
    </div>
  );
}
