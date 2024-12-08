import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
const FeaturedService = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  });
  const services = [
    {
      title: "Car Wash",
      description:
        "Our professional car wash service ensures your vehicle shines inside and out, leaving it spotless and sparkling clean.",
      image:
        "https://images.pexels.com/photos/1557228/pexels-photo-1557228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Oil Change",
      description:
        "Regular oil changes to keep your engine running smoothly and efficiently, extending your car's life.",
      image:
        "https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Tire Rotation",
      description:
        "Ensure even tire wear and extend the life of your tires with our expert tire rotation service.",
      image:
        "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Interior Detailing",
      description:
        "Give your car's interior a deep clean and refresh with our meticulous detailing service, perfect for maintaining a pristine interior.",
      image:
        "https://images.pexels.com/photos/7541990/pexels-photo-7541990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Wax & Polish",
      description:
        "Protect your car's paint and bring out a mirror-like shine with our high-quality waxing and polishing services.",
      image:
        "https://images.pexels.com/photos/14615269/pexels-photo-14615269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Engine Cleaning",
      description:
        "Maintain your vehicle's performance with a thorough engine cleaning to remove dirt and debris.",
      image:
        "https://images.pexels.com/photos/2027045/pexels-photo-2027045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="" data-aos="fade-right">
      <div className="">
        {/* <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
              services of Using Our Gym Products
            </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white shadow-lg rounded-lg p-6 text-center overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="relative z-10">
                <h3
                  className="text-xl font-semibold text-gray-800 mb-2"
                  data-aos="fade-right"
                >
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedService;
