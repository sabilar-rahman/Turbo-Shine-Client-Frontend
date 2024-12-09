import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";
import { TService } from "@/types";
import { useGetAllServicesQuery } from "@/redux/api/adminApi/service.Api";
import LoaderSpinner from "../shared/loadingPage/LoadingSpinner";
import PageTitle from "../shared/PageTitleHelmet/PageTitle";
import { FiDollarSign } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";


const Service = () => {
  // Fetch services data from the API
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  // States for search, sorting, and filtering
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("");
  const [filter, setFilter] = useState<{ minPrice: number; maxPrice: number }>({
    minPrice: 0,
    maxPrice: 500,
  });

  // const navigate = useNavigate();
  // const user = useAppSelector((state) => state.auth.user);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (!data || data.length === 0) {
    return <p>No services available at the moment.</p>;
  }

  // Function to handle service click
  // const handleServiceClick = (serviceId: string) => {
  //   if (user) {
  //     navigate(`/services/${serviceId}`);
  //   } else {
  //     navigate("/login", {
  //       state: { from: `/services/${serviceId}` },
  //     });
  //   }
  // };

  // Reset filter options
  const handleResetFilters = () => {
    setSearchTerm("");
    setSortKey("");
    setFilter({ minPrice: 0, maxPrice: 500 });
  };

  // Filter services based on search term and price range
  const filteredServices = data?.data?.filter((service: TService) => {
    return (
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      service.price >= filter.minPrice &&
      service.price <= filter.maxPrice
    );
  });

  // Sort services based on selected sort key
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortKey) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "durationAsc":
        return a.duration - b.duration;
      case "durationDesc":
        return b.duration - a.duration;
      default:
        return 0;
    }
  });

  return (
    <div className="py-2 lg:py-2  min-h-screen">
      <PageTitle title="Services | Turbo Shine" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex lg:space-x-8">
          {/* Sidebar for Search and Filter */}
          <div className="lg:w-1/4 p-2 rounded-lg mb-10 lg:mb-0 bg-white">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Filter</h3>
            <input
              type="text"
              placeholder="Search here.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortKey}
                  onChange={(e) => setSortKey(e.target.value)}
                  className="p-3 border border-gray-300 rounded-lg w-full"
                >
                  <option value="">Select</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="durationAsc">Duration: Short to Long</option>
                  <option value="durationDesc">Duration: Long to Short</option>
                </select>
              </div>

              <div>
              <label className="block text-gray-700 mb-1">Price range</label>
<div className="flex space-x-4">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filter.minPrice}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      minPrice: Number(e.target.value),
                    }))
                  }
                  className="p-3 border border-gray-300 rounded-lg w-full"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filter.maxPrice}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="p-3 border border-gray-300 rounded-lg w-full"
                />
              </div>
              </div>
              

              {/* Reset Filter Button */}
              <button
                onClick={handleResetFilters}
                className="mt-4 bg-red-500 text-white p-2 rounded-lg w-full hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Services List */}
          <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedServices.map((service: TService, index: number) => (
              <div
                key={index}
                className="relative flex flex-col  bg-white shadow-sm border border-slate-200 rounded-lg w-full"
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
                      ? service.description.substring(0, 80) + "..."
                      : service.description}
                  </p> */}

                  <hr />

                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-cyan-600 font-semibold flex items-center">
                    <FiDollarSign /> {service.price} 
                    </p>
                    <p className="text-sm flex items-center"><IoIosTimer />  {service.duration} min</p>
                  </div>

                  {/* <button
                    className="rounded-md w-full mt-6 bg-[#1f746a] py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-[#2A9D8F] focus:bg-[#2A9D8F] focus:shadow-none active:bg-[#2A9D8F] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => handleServiceClick(service._id)}
                  >
                    Details
                  </button> */}

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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
