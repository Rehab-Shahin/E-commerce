import { useNavigate } from 'react-router-dom'
import styles from './Slider.module.css'

export default function SliderCompent({ 
  backgroundImage, 
  subtitle, 
  title, 
  description,
  btn_labal_1,
  btn_labal_2
}) {
  const navigate = useNavigate()
  
  return (
    <div 
      className="w-full h-[70vh] lg:h-[100vh] flex flex-col justify-center 
                 items-center text-center 
                 md:items-start md:text-left
                 px-4 sm:px-6 md:px-10 lg:px-[90px] gap-5 md:gap-7" 
      id={styles.background} 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <p 
        className="text-[#b4976c] text-base sm:text-lg md:text-xl lg:text-2xl 
                   animate__animated animate__fadeInUp" 
        style={{ letterSpacing: "3px" }}
      >{subtitle}</p>
      <h1 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold animate__animated animate__fadeInUp max-w-[900px]">
        {title}
      </h1>
      <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl animate__animated animate__fadeInUp 
                    max-w-[250px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[650px]">
        {description}
      </p>

      <div className="flex flex-wrap justify-center md:justify-start gap-4 animate__animated animate__fadeInUp">
        <button 
          onClick={() => navigate("/collections")} 
          className="rounded-full bg-white text-black 
                     px-6 sm:px-7 md:px-8 
                     h-[45px] sm:h-[50px] md:h-[55px] 
                     text-sm sm:text-base md:text-lg 
                     hover:translate-y-[-5px] transition-all duration-300 ease-in-out"
        >
          {btn_labal_1}
        </button>
        
        <button 
          onClick={() => navigate("/collections")} 
          className="rounded-full text-white border border-white 
                     px-6 sm:px-7 md:px-8 
                     h-[45px] sm:h-[50px] md:h-[55px] 
                     text-sm sm:text-base md:text-lg
                     hover:translate-y-[-5px] hover:text-black hover:bg-white 
                     transition-all duration-300 ease-in-out"
        >
          {btn_labal_2}
        </button>
      </div>
    </div>
  )
}
