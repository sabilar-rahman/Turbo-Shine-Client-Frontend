import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  useGetAServiceByIdQuery,
  useGetAvailabilityByDateAndServiceIdQuery,
} from "@/redux/api/adminApi/service.Api";
import { TSlot } from "@/types";
import LoaderSpinner from "../shared/loadingPage/LoadingSpinner";

import { FiDollarSign } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: service,
    isLoading: serviceLoading,
    error: serviceError,
  } = useGetAServiceByIdQuery(id as string);

  const today = new Date().toLocaleDateString("en-CA");

  const {
    data: slotData,
    isLoading: slotLoading,
    error: slotError,
  } = useGetAvailabilityByDateAndServiceIdQuery({
    date: today,

    serviceId: id as string,
  });

  const [selectedSlot, setSelectedSlot] = useState<TSlot | null>(null);

  useEffect(() => {
    if (serviceError) {
      console.error("Error fetching service:", serviceError);
    }
    if (slotError) {
      console.error("Error fetching slots:", slotError);
    }
  }, [serviceError, slotError]);

  if (serviceLoading || slotLoading) {
    return <LoaderSpinner />;
  }
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  if (serviceError || !service || !service?.data) {
    return (
      <p className="text-center text-[#1f746a]">Service not available now.</p>
    );
  }

  const handleSlotClick = (slot: TSlot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedSlot) {
      navigate("/booking", { state: { selectedSlot, service } });
    }
  };
  // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
  const { name, price, img, duration, description } = service.data;

  return (
    <div className="container mx-auto ">
      <div className=" py-2 md:py-2 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Section: Service Details */}
          <div className="hero bg-base-200  rounded-lg shadow-lg">
            <div className="hero-content flex flex-col space-y-6">
              <img
                src={img}
                alt={name}
                className="w-full rounded-lg shadow-2xl object-cover"
              />
              <div>
                <h1 className="text-4xl font-bold text-primary mb-4">{name}</h1>
                <p className="text-lg text-gray-700 mb-6">{description}</p>

                <p className="text-xl text-cyan-600 font-semibold  mb-2 flex items-center">
                  <FiDollarSign /> {price}
                </p>
                <p className="text-xl  flex items-center">
               < IoIosTimer /> {duration} mins
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Available Slots & Booking */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {slotError || !slotData || slotData.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">
                No availability data for today.
              </p>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-primary mb-6">
                  Available Slots for {today}
                </h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {slotData.data.map((slot: TSlot, index: number) => (
                    <li
                      key={index}
                      className={`p-4 border rounded-md text-center transition-all duration-300 ${
                        slot.isBooked === "available"
                          ? selectedSlot === slot
                            ? "border-primary bg-primary text-white"
                            : "border-green-500 cursor-pointer hover:bg-green-500 hover:text-white"
                          : "border-red-500 text-red-500 cursor-not-allowed"
                      }`}
                      onClick={() =>
                        slot.isBooked === "available" && handleSlotClick(slot)
                      }
                    >
                      <div className="text-xl font-semibold">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </li>
                  ))}
                </ul>

                {selectedSlot && (
                  <div className="mt-8 flex justify-center">
                    <button
                      className="btn bg-primary text-white hover:bg-hover transition-all duration-300 py-3 px-6 rounded-lg shadow-lg"
                      onClick={handleBooking}
                    >
                      Book This Service
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
