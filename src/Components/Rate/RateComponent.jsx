import { MdOutlineStar } from "react-icons/md";

export default function RateComponent({ header, subtitle, name, jopTitle }) {
  return (
    <div className="flex flex-col gap-4 p-4 sm:p-5 bg-white shadow-md rounded-xl">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <MdOutlineStar key={i} className="text-[#ad985c] text-xl sm:text-2xl" />
        ))}
      </div>
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{header}</h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
        {subtitle}
      </p>
      <div>
        <h2 className="font-bold text-sm sm:text-base md:text-lg">{name}</h2>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base">{jopTitle}</p>
      </div>
    </div>
  );
}
