import { IoIosArrowDown } from "react-icons/io";
import { UseModal, useSearch, useCompare, useUserData } from "../../store";
import ProductModal from "../productModal/ProductModal";
import ShopModal from "../ShopModal/ShopModal";
import HomeModal from "../HomeModal/HomeModal";
import PagesModal from "../PagesModal/PagesModal";
import logo from "../../assets/imgs/logo.png";
import logo2 from "../../assets/imgs/logo-2.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiGitCompare } from "react-icons/bi";
import { useCart } from "../../store/cartStore";
import { useFav } from "../../store";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { LiaInstagram } from "react-icons/lia";
import { BiLogoTwitter } from "react-icons/bi";
import { TiSocialFacebook } from "react-icons/ti";
import { FaYoutube } from "react-icons/fa6";

export default function NavHeader() {
  const { pagesopenModal, pagesmodalIndex } = UseModal();

  const { openSearch } = useSearch();
  const { openCartModal, cartItems } = useCart();
  const { favItems } = useFav();
  const totalFav = favItems.length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const { user } = useUserData();
  const navigate = useNavigate();
  const { compareItems } = useCompare();
  const totalCompare = compareItems.length;
  const [openDropdown, setOpenDropdown] = useState(null);
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed bg-[#121212] shadow-[0_8px_10px_-11px_#fff] h-[70px] md:h-[100px] w-full flex items-center justify-between px-4 md:px-10 z-[100]">
      <button
        className="md:hidden text-white text-[1.8rem]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <HiMenu />
      </button>

      <nav className="hidden md:flex items-center gap-7 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#ad985c] text-[1.1rem]"
              : "text-white text-[1.1rem]"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/about-Us"
          className={({ isActive }) =>
            isActive
              ? "text-[#ad985c] text-[1.1rem]"
              : "text-white text-[1.1rem]"
          }
        >
          About us
        </NavLink>

        <div
          className="cursor-pointer flex items-center gap-1 relative"
          onMouseEnter={() => pagesopenModal()}
        >
          <span className="text-white text-[1.1rem]">Pages</span>
          <IoIosArrowDown className="text-white text-[0.8rem] mt-1" />
          {pagesmodalIndex && <PagesModal />}
        </div>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "text-[#ad985c] text-[1.1rem]"
              : "text-white text-[1.1rem]"
          }
        >
          Contact
        </NavLink>
      </nav>

      <Link to="/" className="absolute left-1/2 -translate-x-1/2">
        <img
          src={logo}
          alt="Logo"
          className="w-[60px] md:w-[70px] h-[25px] md:h-[30px]"
        />
      </Link>

      <div className="flex items-center gap-3 md:gap-4 ml-auto">
        <button onClick={openSearch}>
          <FiSearch className="text-white text-[1.3rem]" />
        </button>

        <Link to="/compare">
          <div className="relative inline-block pt-2">
            <BiGitCompare className="text-white text-[1.3rem]" />
            <span className="absolute -top-[5px] -right-2 bg-[#ad985c] text-white text-[11px] md:text-[12px] font-bold px-[5px] rounded-full shadow">
              {totalCompare}
            </span>
          </div>
        </Link>

        <Link to="/wishlist">
          <div className="relative inline-block pt-2">
            <MdOutlineFavoriteBorder className="text-white text-[1.3rem]" />
            <span className="absolute -top-[5px] -right-2 bg-[#ad985c] text-white text-[11px] md:text-[12px] font-bold px-[5px] rounded-full shadow">
              {totalFav}
            </span>
          </div>
        </Link>

        <div
          onClick={openCartModal}
          className="relative inline-block cursor-pointer pt-1"
        >
          <AiOutlineShoppingCart className="text-white text-[1.3rem]" />
          <span className="absolute -top-[8px] -right-2 bg-[#ad985c] text-white text-[11px] md:text-[12px] font-bold px-[5px] rounded-full shadow">
            {totalQuantity}
          </span>
        </div>

        <div
          onClick={() => {
            if (user) {
              navigate("/account");
            } else {
              navigate("/login");
            }
          }}
          className="cursor-pointer hidden md:block"
        >
          <FaRegUser className="text-white text-[1.3rem]" />
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white p-5 md:hidden z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Link to="/" onClick={() => handleNavigate("/")}>
            <img src={logo2} alt="Logo" className="w-[80px] h-auto" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)}>
            <HiX className="text-black text-2xl" />
          </button>
        </div>

        <div>
          <button
            className="flex justify-between items-center w-full text-black text-lg py-2"
          >
            <NavLink to="/" onClick={() => handleNavigate("/home")}
               className=
              {({ isActive }) =>
                isActive
                  ? "text-[#ba9d4d] text-[1.1rem]"
                  : " text-[1.1rem]"
              }>
                Home
            </NavLink>
          </button>
        </div>
        <div>
          <button
            onClick={() => toggleDropdown("home")}
            className="flex justify-between items-center w-full text-black text-lg py-2"
          >
            <NavLink to="/about-Us" onClick={() => handleNavigate("/about-Us")}
               className=
              {({ isActive }) =>
                isActive
                  ? "text-[#ba9d4d] text-[1.1rem]"
                  : " text-[1.1rem]"
              }>
                About us
            </NavLink>
          </button>
        </div>

        <div>
          <button
            onClick={() => toggleDropdown("pages")}
            className="flex justify-between items-center w-full text-black text-lg py-2"
          >
            Pages <IoIosArrowDown />
          </button>
          {openDropdown === "pages" && (
            <div className="pl-5 flex flex-col gap-2 mt-2 text-black">
              <NavLink to="/about-Us" onClick={() => handleNavigate("/about-Us")}
               className=
              {({ isActive }) =>
                isActive
                  ? "text-[#ba9d4d] text-[1.1rem]"
                  : " text-[1.1rem]"
              }>
                About us
            </NavLink>
              <NavLink to="/" onClick={() => handleNavigate("/")}
               className=
              {({ isActive }) =>
                isActive
                  ? "text-[#ba9d4d] text-[1.1rem]"
                  : " text-[1.1rem]"
              }>
                 Privacy Policy
            </NavLink>
            </div>
          )}
        </div>
        <NavLink to="/contact" onClick={() => handleNavigate("/contact")}
               className=
              {({ isActive }) =>
                isActive
                  ? "text-[#ba9d4d] text-[1.1rem]"
                  : " text-[1.1rem]"
              }>
                Contact
            </NavLink>

        <div
          onClick={() => {
            if (user) {
              handleNavigate("/account");
            } else {
              handleNavigate("/login");
            }
          }}
          className="flex items-center gap-2 text-lg py-2 cursor-pointer"
        >
          <FaRegUser /> Account
        </div>

        <div className="flex justify-center mt-60 border-t border-gray-200 p-4 gap-2">
          <Link to="https://www.instagram.com/" target="_blank">
            <div className="w-7 h-7 rounded-full text-[#BB398B] border border-black flex justify-center items-center hover:bg-white hover:text-black">
              <LiaInstagram />
            </div>
          </Link>
          <Link to="https://twitter.com/" target="_blank">
            <div className="w-7 h-7 rounded-full text-[#00AAEC] border border-black flex justify-center items-center hover:bg-white hover:text-black">
              <BiLogoTwitter />
            </div>
          </Link>
          <Link to="https://facebook.com/" target="_blank">
            <div className="w-7 h-7 rounded-full text-[#0B5799] border border-black flex justify-center items-center hover:bg-white hover:text-black">
              <TiSocialFacebook />
            </div>
          </Link>
          <Link to="https://youtube.com/" target="_blank">
            <div className="w-7 h-7 rounded-full text-[#CE1312] border border-black flex justify-center items-center hover:bg-white hover:text-black">
              <FaYoutube />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
