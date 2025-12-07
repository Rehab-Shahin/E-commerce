import React, { useEffect } from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import StorySection from "../../Components/StorySection/StorySection";
import FeaturesSection from "../../Components/FeaturesSection/FeaturesSection";
import DreamSection from "../../Components/DreamSection/DreamSection";
import TextSlider from "../../Components/TextSlider/TextSlider";
import Rate from "../../Components/Rate/Rate";
import Team from "../../Components/Team/Team";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0); // دا بيخلي الصفحة تبدأ من فوق
  }, []);
  return (
    <div className="pt-15 lg:pt-25">
      <PageHeader />
      <DreamSection />
      <FeaturesSection />
      <StorySection />
      <Team/>
      <TextSlider/>
      <Rate padding={10}/>
    </div>
  );
}
