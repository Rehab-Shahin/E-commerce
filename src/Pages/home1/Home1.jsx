
import Slider from '../../Components/Slider/Slider'
import productImg1 from '../../assets/imgs/banner-image.png'
import productImg2 from '../../assets/imgs/banner-image-2.png'
import productImg3 from '../../assets/imgs/banner-image-3.png'
import productImg4 from '../../assets/imgs/banner-image-4.png'
import productImg5 from '../../assets/imgs/banner-image-5.png'
import productImg6 from '../../assets/imgs/banner-image-6.png'
import productImg7 from '../../assets/imgs/banner-image-7.png'
import productImg8 from '../../assets/imgs/banner-image-8.png'
import productImg9 from '../../assets/imgs/banner-image-9.png'
import Categories from '../../Components/Categories/Categories'
import Products from '../../Components/Product/Product'
import ProductShowcase from '../../Components/ProductShowcase/ProductShowcase'
import Rate from '../../Components/Rate/Rate'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Home1() {

  const location = useLocation();
   useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  useEffect(() => {
    if (location.hash === "#products") {
      const el = document.getElementById("products");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
    const products = [
      {
        smallTitle: 'NEW ARRIVAL',
        bigTitle1: 'Latest Qpad ',
        bigTitle2: 'with keyboard',
        buttonText: 'Buy Now',
        buttonLink: '/buy/qpad',
        backgroundImage: productImg1,
      },
      {
        smallTitle: 'GET UP TO 35% OFF',
        bigTitle1: 'And then their',
        bigTitle2: 'was pro versions',
        buttonText: 'Buy Now',
        buttonLink: '/buy/pro',
        backgroundImage: productImg2
      },
      {
        smallTitle: 'HURRY UP!',
        bigTitle1: 'Modern &',
        bigTitle2: 'Style Headphone',
        buttonText: 'Buy Now',
        buttonLink: '/buy/headphone',
        backgroundImage: productImg3
      }
    ];
    const products_2 = [
      {
        smallTitle: 'NEW ARRIVAL',
        bigTitle1: 'Latest Qpad ',
        bigTitle2: 'with keyboard',
        buttonText: 'Buy Now',
        buttonLink: '/buy/qpad',
        backgroundImage: productImg4,
        paddingLeft:'pl-40',
        paddingTop:'pt-20',
      },
      {
        smallTitle: 'GET UP TO 35% OFF',
        bigTitle1: 'Make your life',
        bigTitle2: 'Easier & Stylish',
        buttonText: 'Buy Now',
        buttonLink: '/buy/pro',
        backgroundImage: productImg5,
        paddingLeft:'pl-35',
        paddingTop:'pt-20',
      },
      {
        smallTitle: 'HURRY UP!',
        bigTitle1: 'Modern &',
        bigTitle2: 'Style Headphone',
        buttonText: 'Buy Now',
        buttonLink: '/buy/headphone',
        backgroundImage: productImg6
      }
    ];
     const products_3 = [
      {
        smallTitle: 'NEW ARRIVAL',
        bigTitle1: 'Latest Qpad ',
        bigTitle2: 'with keyboard',
        buttonText: 'Buy Now',
        buttonLink: '/buy/qpad',
        backgroundImage: productImg7,
        rounded:'rounded-xl '
      },
      {
        smallTitle: 'GET UP TO 35% OFF',
        bigTitle1: 'Make your life',
        bigTitle2: 'Easier & Stylish',
        buttonText: 'Buy Now',
        buttonLink: '/buy/pro',
        backgroundImage: productImg8,
        rounded:'rounded-xl '
      },
      {
        smallTitle: 'HURRY UP!',
        bigTitle1: 'Modern &',
        bigTitle2: 'Style Headphone',
        buttonText: 'Buy Now',
        buttonLink: '/buy/headphone',
        backgroundImage: productImg9,
        rounded:'rounded-xl '
      }
    ];
  return (
    <div>
        <Slider/>
        <ProductShowcase products={products} />
        <Categories/>
        <Products header={"Highly Recommended"} id="products"/>
        <ProductShowcase products={products_2} />
        <Products header={"Best Selling Products"}/>
        <ProductShowcase products={products_3} paddingX ={"lg:px-[60px]"} smPx={"px-3"} gap = {"gap-8"}/>
        <Rate padding={20}/>
    </div>     
  )
}
