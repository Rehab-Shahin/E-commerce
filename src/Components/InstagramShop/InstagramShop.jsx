import { Link } from 'react-router-dom';
import img1 from '../../assets/imgs/instagram-1.png';
import img2 from '../../assets/imgs/instagram-2.png';
import img3 from '../../assets/imgs/instagram-3.png';
import img4 from '../../assets/imgs/instagram-4.png';
import { BsInstagram } from "react-icons/bs";

export default function InstagramShop() {
  const categories = [
    { backgroundImage: img1 },
    { backgroundImage: img2 },
    { backgroundImage: img3 },
    { backgroundImage: img4 },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-12 mt-10">
      <h1 className="text-5xl font-bold mb-10">Instagram Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {categories.map((el, index) => (
          <div
            key={index}
            className="group relative w-full h-[250px] overflow-hidden">
            <div
              className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url(${el.backgroundImage})` }}
            ></div>
            <Link
              to="https://www.instagram.com/"
              target="_blank"
              className="absolute z-10 inset-0 flex justify-center items-center"
            >
              <div className="bg-[#b4976c] rounded-full w-20 h-20 flex justify-center items-center text-4xl text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <BsInstagram />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
