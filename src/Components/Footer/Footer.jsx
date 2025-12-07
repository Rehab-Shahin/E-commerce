import { LiaInstagram } from "react-icons/lia";
import { BiLogoTwitter } from "react-icons/bi";
import { TiSocialFacebook } from "react-icons/ti";
import { FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useSearch } from "../../store";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);
  const { openSearch } = useSearch();
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections = [
    {
      title: "Quick Links",
      links: ["Search", "Reviews", "About us", "Privacy Policy"],
    },
    {
      title: "Quick Links",
      links: ["About us", "Blogs", "Single blog", "Register", "FAQ's"],
    },
    {
      title: "Information",
      links: [
        "Terms & Conditions",
        "Payment",
        "Return Policy",
        "Promotions",
        "Contact us",
        "Privacy Policy",
      ],
    },
    {
      title: "Company",
      links: [
        "My account",
        "My Cart",
        "Wishlist",
        "Product Compare",
        "Create account",
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#141e24] to-[#2b201e] p-10 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h1 className="text-[2rem] md:text-[3rem] font-bold text-white text-center md:text-left">
          <p className="m-0">Subscribe our Newsletter</p>
          <p className="m-0">and get all of our update</p>
        </h1>
        <form className="flex justify-between items-center border border-white rounded-full w-full md:w-150 h-15 p-4 pr-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="text-white bg-transparent border-0 focus:outline-0 w-full px-2"
          />
          <button className="bg-white rounded-full p-4 w-40 h-12 flex justify-center items-center cursor-pointer">
            Submit Now
          </button>
        </form>
      </div>

      <hr className="my-10 text-gray-500" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="text-white">
            <div
              className="flex justify-between items-center md:block cursor-pointer md:cursor-default"
              onClick={() => toggleSection(idx)}
            >
              <h1 className="text-xl font-bold mb-4">{section.title}</h1>
              <IoIosArrowDown
                className={`md:hidden transition-transform ${
                  openSection === idx ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`flex flex-col gap-3 text-[17px] overflow-hidden transition-all duration-300 ${
                openSection === idx ? "max-h-96" : "max-h-0 md:max-h-full"
              }`}
            >
              {section.links.map((link, i) => (
                <Link
                   onClick={openSearch }
                   key={i} className="hover:text-gray-300">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="text-white text-[15px]">
          <h1 className="text-xl font-bold mb-4">Contact Info</h1>
          <p className="text-[#ffffffbf]">70 Washington Square South, New</p>
          <p className="mb-4 text-[#ffffffbf]">
            York, NY 10012, United States
          </p>
          <p className="text-[#ffffffbf]">+12345 678 910</p>
          <p className="text-[#ffffffbf] mb-4">+12345 678 109</p>
          <div className="flex gap-2">
            <Link to="https://www.instagram.com/" target="_blank">
              <div className="w-7 h-7 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black">
                <LiaInstagram />
              </div>
            </Link>
            <Link to="https://twitter.com/" target="_blank">
              <div className="w-7 h-7 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black">
                <BiLogoTwitter />
              </div>
            </Link>
            <Link to="https://facebook.com/" target="_blank">
              <div className="w-7 h-7 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black">
                <TiSocialFacebook />
              </div>
            </Link>
            <Link to="https://youtube.com/" target="_blank">
              <div className="w-7 h-7 rounded-full border border-white flex justify-center items-center hover:bg-white hover:text-black">
                <FaYoutube />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
