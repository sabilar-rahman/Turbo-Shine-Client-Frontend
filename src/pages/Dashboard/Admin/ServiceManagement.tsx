import { useState } from "react";
import ServiceForm from "./ServiceForm"; // Updated ServiceForm component
import {
  useCreateAServiceMutation,
  useDeleteServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} from "@/redux/api/adminApi/service.Api";
import { TService } from "@/types";
import LoaderSpinner from "@/pages/shared/loadingPage/LoadingSpinner";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ServiceManagement = () => {
  const { data: servicesResponse, isLoading: servicesLoading } =
    useGetAllServicesQuery({});
  const [addService] = useCreateAServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [deleteService] = useDeleteServiceMutation();
  const [selectedService, setSelectedService] = useState<TService | null>(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const handleAddService = async (serviceData: TService) => {
    try {
      await addService(serviceData).unwrap();
      setAddModalOpen(false);

      toast.success("Service added successfully!");

      // Optimistically update data or refetch
    } catch (error) {
      toast.error("Failed to add service.");

      // console.error("Failed to add service:", error);

      // // Error alert
      // Swal.fire({
      //   title: "Error",
      //   text: "Failed to add service.",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
    }
  };

  // Handle updating a service
  const handleUpdateService = async (serviceData: TService) => {
    try {
      await updateService({
        id: selectedService?._id as string,
        data: serviceData,
      }).unwrap();
      setUpdateModalOpen(false);

      toast.success("Service updated successfully!");

      // Success alert
      // Swal.fire({
      //   title: "Success",
      //   text: "Service updated successfully!",
      //   icon: "success",
      //   confirmButtonText: "OK",
      // });

      // Optimistically update data or refetch
    } catch (error) {
      toast.error("Failed to update service.");

      // console.error("Failed to update service:", error);

      // // Error alert
      // Swal.fire({
      //   title: "Error",
      //   text: "Failed to update service.",
      //   icon: "error",
      //   confirmButtonText: "OK",
      // });
    }
  };

  // const handleDeleteService = async (serviceId: string) => {
  //   try {

  //     await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         await deleteService(serviceId).unwrap();
  //         Swal.fire("Deleted!", "Your service has been deleted.", "success");
  //         // Optimistically update data or refetch
  //       }
  //     });
  //   } catch (error) {
  //     console.error("Failed to delete service:", error);
  //   }
  // };

  const handleDeleteService = async (id: string) => {
    // it is for show name to delete spesfic product
    // const productToDelete = Products?.find(product => product._id === _id);
    try {
      const res = await deleteService(id);
      console.log(res);
      toast.success("Product delete Successful");
      // toast.promise(
      //   Promise.resolve({ name: productToDelete?.name }), // Use the product name directly here
      //   {
      //     loading: 'Loading...',
      //     success: (product) => `${product.name} has been deleted`,
      //     error: 'Error occurred while deleting the product',
      //   }
      // );
    } catch (error) {
      console.log(error);
      toast.error("Delete Unsuccessful");
    }
  };

  if (servicesLoading) {
    return <LoaderSpinner />;
  }

  const services = servicesResponse?.data;

  return (
    <div>
      <h2 className="text-xl md:text-3xl text-primary text-center font-semibold mb-4">
        Service Management
      </h2>

      <div className="flex justify-center items-center mb-4">
        <button
          className="btn bg-red-700 hover:bg-red-500 text-white hover:text-white "
          onClick={() => setAddModalOpen(true)}
        >
          Add Service
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full bg-white md:p-8">
          <thead className="text-xl">
            <tr>
              <th>Service</th>
              <th>Image </th>
              <th>Description</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service: TService) => (
              <tr key={service._id} className="text-[17px]">
                <td>{service.name}</td>
                <td>
                  <img
                    src={service.img}
                    alt="Not found"
                    className="w-12 h-10 "
                  />
                </td>
                <td>{service.description}</td>
                <td>${service.price}</td>
                <td>{service.duration} Minutes</td>
                <td>
                  <button
                    className="text-blue-500 hover:text-blue-700 mr-2"
                    onClick={() => {
                      setSelectedService(service);
                      setUpdateModalOpen(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>

                  <button className="text-red-500 hover:text-red-700 ml-2">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            data from server.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteService(service._id)}
                            className="bg-red-500 hover:bg-red-700"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </button>

                  {/* <button
                    className="btn bg-red-500 hover:bg-primary text-white"
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        // @ts-expect-error: Ignoring type error due to mismatch in expected types from external library
        <ServiceForm
          isOpen={isAddModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={handleAddService}
        />
      )}

      {/* Update Service Modal */}
      {isUpdateModalOpen && selectedService && (
        <ServiceForm
          isOpen={isUpdateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          onSubmit={handleUpdateService}
          initialData={selectedService}
        />
      )}
    </div>
  );
};

export default ServiceManagement;
