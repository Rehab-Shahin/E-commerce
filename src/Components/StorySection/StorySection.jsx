import React from "react";
import teamImg from "../../assets/imgs/story.png";

export default function StorySection() {
  return (
    <section className="grid md:grid-cols-2 gap-10 items-center p-3 lg:p-10">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Our story and how we grow up
        </h2>
        <p className="text-gray-700 leading-relaxed">
          The Best electronics products continue to drive innovation and shape
          the way we live, work, and interact with our environment
          opportunities for customers to test out products before making a
          purchase.
        </p>

        <div>
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To be world most products continue to drive innovation and shape
            the way we live, work, and interact with our environment
            opportunities for customers to test out products before making a
            purchase.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            To be world most products continue to drive innovation and shape
            the way we live, work, and interact with our environment
            opportunities for customers to test out products before making a
            purchase.
          </p>
        </div>
      </div>
      <div>
        <img
          src={teamImg}
          alt="Our Team"
          className="rounded-2xl shadow-lg w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}
