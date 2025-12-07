import PageHeader from '../../Components/PageHeader/PageHeader'
import React, { useEffect, useState } from "react";
import { useUserData } from '../../store';

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  const { user } = useUserData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const mapContainerStyle = {
    width: "100%",
    height: "550px",
    borderRadius: "3px",
  };

  const center = {
    lat: 30.0444,
    lng: 31.2357,
  };

  return (
    <div className='pt-15 lg:pt-25'>
      <PageHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-3 lg:p-10">
        <div>
          <h1 className="text-5xl font-bold mb-5">Let’s Collaborate</h1>
          <p className="text-gray-600 mb-8">
            The Best electronics products continue to drive innovation we live,
            work, and interact with our environment opportunities customers to test
            out products before making a purchase...
          </p>

          <h3 className="font-bold text-2xl text-gray-500 mb-2">Phone:</h3>
          <p className="mb-10 font-bold text-2xl">+(2) 123 -456 -789</p>

          <h3 className="font-bold text-2xl text-gray-500 mb-2">Email:</h3>
          <p className="mb-10 font-bold text-2xl">support@example.com</p>

          <h3 className="font-bold text-2xl text-gray-500 mb-2">Head office</h3>
          <p className="mb-10 font-bold text-2xl">70 Washington Square, New York, NY 10012, USA</p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-5">Say hello</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block mb-1 font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-300 mb-2 pb-2 bg-transparent focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b mb-2 pb-2 border-gray-300 bg-transparent focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Phone number:</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                className="w-full border-b mb-2 pb-2 border-gray-300 bg-transparent focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Message:</label>
              <textarea
                name="message"
                onChange={handleChange}
                className="w-full border-b mb-2 pb-2 border-gray-300 bg-transparent focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-black text-white py-3 px-6 rounded-full font-semibold hover:bg-gray-800 transition cursor-pointer"
            >
              Send Now
            </button>
          </form>
        </div>
      </div>

      <div className="p-3 lg:p-10">
        <LoadScript googleMapsApiKey="AIzaSyCXLcLP6aARvFSCqozXhTsXLTPfGsbKTYA">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
