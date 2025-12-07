export default function TeamCard({ img, name, role }) {
  return (
    <div className="flex flex-col gap-3 md:gap-4 bg-white rounded-xl group relative overflow-hidden cursor-pointer">
      <div className="relative w-full h-[400px] md:h-[350px] overflow-hidden rounded-t-xl">
        <img
          src={img}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={name}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      
      <div className="flex flex-col gap-1 md:gap-2 p-3 md:px-5">
        <h1 className="text-lg sm:text-xl md:text-[23px] font-bold">{name}</h1>
        <p className="text-gray-600 text-sm md:text-base">{role}</p>
      </div>
    </div>
  );
}
