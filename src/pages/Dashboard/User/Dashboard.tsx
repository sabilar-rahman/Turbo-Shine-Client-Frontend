import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types";

const Dashboard = () => {
  const user: TUser | null = useAppSelector((state) => state.auth?.user as TUser | null);
  console.log(user);
  if (!user) {
    return <div>No user information available</div>;
  }

  const { name, email, role, phone, address, img } = user;

  return (
    <div className="p-6  flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center">
          {/* User Image */}
          <img
            src={img}
           
            className="w-56 h-56 rounded-full mb-2 object-cover"
          />
          {/* User Information */}
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-600">{role}</p>
          <div className="mt-4 space-y-2 text-left w-full">
            <p className="text-gray-700">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-gray-700">
              <strong>Phone:</strong> {phone}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
