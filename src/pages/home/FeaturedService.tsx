import { useGetAllServicesQuery } from "@/redux/api/adminApi/service.Api";

import LoaderSpinner from "../shared/loadingPage/LoadingSpinner";
import { Link,  } from "react-router-dom";

import { FiDollarSign } from "react-icons/fi";

import { IoIosTimer } from "react-icons/io";

export type TService = {
  _id: string;
  name: string;
  img: string;
  description: string;
  price: number;
  duration: number;
};

const FeaturedService = () => {
  // Fetch services data from the API
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  console.log(data); // Debugging to check the structure of the data



  if (isLoading) {
    return <LoaderSpinner />;
  }

  // Ensure that the data is an array and contains the services array
  if (!data || !Array.isArray(data.data) || data.data.length === 0) {
    return <p>No services available at the moment.</p>;
  }

  // const handleNavigate = (serviceId: string) => {
  //   navigate(`/services/${serviceId}`); // Navigate to the service details page
  // };

  // Get the first four services if data is valid
  const servicesToShow = data.data.slice(0, 4); // Access the `data` array within the response

  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {servicesToShow.map((service: TService, index: number) => (
        <div
          key={index}
          className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full"
        >
          {/* Image Section */}
          <div className="relative p-2.5 h-64 overflow-hidden rounded-xl bg-clip-border">
            <img
              src={service.img}
              alt={service.name}
              className="h-full w-full object-cover rounded-md"
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="mb-2">
              <p className="text-slate-800 text-xl font-semibold">
                {service.name}
              </p>
            </div>
            {/* <p className="text-slate-600 leading-normal font-light">
              {service.description.length > 80
                ? service.description.substring(0, 40) + ""
                : service.description}
            </p> */}
            <hr />

            <div className="mb-2 flex items-center justify-between">
              <p className="text-cyan-600 font-semibold flex items-center">
              <FiDollarSign /> {service.price} 
              </p>
              <p className="text-sm flex items-center"><IoIosTimer /> {service.duration} min</p>
            </div>

             <Link
              to={`/services/${service._id}`}
              className="text-slate-600 font-semibold"
            >
              <button
                className="rounded-md w-full mt-6 bg-[#1f746a] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-[#2A9D8F] focus:bg-[#2A9D8F] focus:shadow-none active:bg-[#2A9D8F] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                View Details
              </button>
            </Link> 



            {/* <button
              className="rounded-md w-full mt-6 bg-[#1f746a] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-[#2A9D8F] focus:bg-[#2A9D8F] focus:shadow-none active:bg-[#2A9D8F] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => handleNavigate(service._id)}
            >
              View Details
            </button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedService;
