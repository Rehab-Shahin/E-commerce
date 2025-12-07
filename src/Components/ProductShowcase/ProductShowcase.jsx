import { Link } from "react-router-dom";

export default function ProductShowcase({ products, gap, paddingX ,smPx}) {
  const scrollToSlider = () => {
    const sliderElement = window.sliderRef?.current;
    if (sliderElement) {
      sliderElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`flex flex-col md:flex-row justify-between items-center w-full pt-[1px] ${gap} ${paddingX} ${smPx}`}
    >
      {products.map((product, index) => (
        <div
          onClick={scrollToSlider} 
          key={index}
          className={`group relative flex flex-col justify-between p-12 w-full md:w-1/3 h-[300px] ${product.rounded} overflow-hidden`}
        >
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{
              backgroundImage: `url(${product.backgroundImage})`,
            }}
          ></div>
          <div className="relative z-10">
            <p className={`text-[#ad985c] text-sm mb-3 uppercase ${product.paddingLeft} ${product.paddingTop}`}>
              {product.smallTitle}
            </p>
            <h2 className={`text-white text-3xl font-bold mb-5 ${product.paddingLeft}`}>
              {product.bigTitle1}
              <br />
              {product.bigTitle2}
            </h2>
            <Link
              to={product.buttonLink}
              className={`text-white underline font-medium mb-5 hover:text-[#ad985c] transition ${product.paddingLeft}`}
            >
              {product.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
