import { Link, useLocation } from "react-router-dom";

export default function PageHeader() {
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const pageName = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <div className="bg-[#F3F3F3] w-full h-45 py-13 px-10">
      <h1 className="text-4xl font-bold mb-2">{pageName}</h1>
      <div className="text-gray-600">
        <Link to="/" className="hover:text-black">Home</Link>
        <span className="mx-2">/</span>
        <span>{pageName}</span>
      </div>
    </div>
  );
}
