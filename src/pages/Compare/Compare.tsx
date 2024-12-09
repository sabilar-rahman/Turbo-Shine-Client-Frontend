import { useState } from "react";
// import { useGetAllServicesQuery } from "../../redux/features/admin/service.api";
// import { TService } from "../../types";
import { useGetAllServicesQuery } from "@/redux/api/adminApi/service.Api";
import { TService } from "@/types";
import LoaderSpinner from "../shared/loadingPage/LoadingSpinner";
import PageTitle from "../shared/PageTitleHelmet/PageTitle";



const Compare = () => {
  const { data: response, error, isLoading } = useGetAllServicesQuery({});
  const [selectedServices, setSelectedServices] = useState<TService[]>([]);
 
  const services: TService[] = response?.data || [];

  // Handle service selection, restrict to a maximum of 5
  const handleSelectService = (service: TService) => {
    setSelectedServices((prev) => {
      if (prev.some((s) => s._id === service._id)) {
        return prev.filter((s) => s._id !== service._id);
      }
      if (prev.length < 6) {
        return [...prev, service];
      }
      return prev;
    });
  };

  // Render the selected services in a comparison table
  const renderServiceComparison = () => {
    if (selectedServices.length < 1) {
      return (
        <p className="text-[#3f9e99] text-center">Please select at least two</p>
      );
    }

    return (
      <div className="container mx-auto overflow-x-auto">
       
      
        <table className="min-w-full bg-white border border-gray-300">
       
          <thead>
            <tr>
              <th className="py-2 px-4 border text-[#1f746a] ">Service Name</th>
              {selectedServices.map((service) => (
                <th
                  key={service._id}
                  className="py-2 px-4 border text-[#1f746a] "
                >
                  {service.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border font-semibold text-[#1f746a]">
                Price
              </td>
              {selectedServices.map((service) => (
                <td key={service._id} className="py-2 px-4 border">
                  {service.price} $
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-4 border font-semibold text-[#1f746a]">
                Duration
              </td>
              {selectedServices.map((service) => (
                <td key={service._id} className="py-2 px-4 border">
                  {service.duration} min
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 px-4 border font-semibold text-[#1f746a]">
                Description
              </td>
              {selectedServices.map((service) => (
                <td key={service._id} className="py-2 px-4 border">
                  {service.description}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <div>Error fetching services</div>;
  }

  return (
    <div className="container mx-auto h-dvh">
       <PageTitle title="Compare | Turbo Shine" />
      <div className="mb-2">
        <h3 className=" font-semibold mb-8 text-xl ">
          Select Services to Compare
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services?.map((service: TService) => (
            <div
              key={service._id}
              className={`p-2 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out ${
                selectedServices.some((s) => s._id === service._id)
                  ? "bg-white border-4 border-primary"
                  : "bg-[#3f9e99] hover:bg-[#1f746a]"
              } ${
                selectedServices.length >= 5 &&
                !selectedServices.some((s) => s._id === service._id)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleSelectService(service)}
            >
              <h3 className="text-xl font-semibold text-primary">
                {service.name}
              </h3>
              <p className="text-lg">Duration: {service.duration} min</p>
              <p className="text-lg">
                Price:{service.price} <span className="text-xl">$</span>{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">{renderServiceComparison()}</div>
    </div>
  );
};

export default Compare;

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services?.map((service: TService) => (
            <div
              key={service._id}
              className={` p-2 rounded-lg shadow-md cursor-pointer bg-[#3f9e99] hover: hover:bg-[#1f746a] ${
                selectedServices.some((s) => s._id === service._id)
                  ? "border-4 border-primary"
                  : ""
              } ${
                selectedServices.length >= 5 &&
                !selectedServices.some((s) => s._id === service._id)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handleSelectService(service)}
            >
              <h3 className="text-xl font-semibold text-primary">
                {service.name}
              </h3>
              <p className="text-lg">Price: ${service.price}</p>
              <p className="text-lg">Duration: {service.duration}</p>
            </div>
          ))}
    </div> */
}
