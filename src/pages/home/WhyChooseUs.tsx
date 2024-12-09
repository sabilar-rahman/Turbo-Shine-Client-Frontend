import  { useEffect } from "react";
import WhyChooseImg from "../../assets/whychoose.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });

  return (
    <div
      data-aos="fade-right"
      className="flex flex-col md:flex-row items-center justify-between p-4"
    >
      <div className="md:w-1/2 mb-4 md:mb-0">
        <h1 className="text-2xl font-bold mb-4">
          We are the best in the business,with years of experience
        </h1>
        <p className="mb-4">we are the best choice for you.</p>
        <ul className="list-disc pl-5 mb-4">
          <li>24/7 Emergency Service</li>
          <li>Fast Response Time</li>
          <li>Professional Service</li>
          <li>Competitive Pricing</li>
          <li>High-Quality Materials</li>
          <li>Customer Satisfaction Guarantee</li>
          <li>Experienced Technicians</li>
        </ul>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src={WhyChooseImg}
          alt="Why Choose Us"
          className="rounded-md max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
