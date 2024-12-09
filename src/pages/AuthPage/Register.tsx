


import { useSignUpMutation } from "@/redux/api/auth/authApi";
import { setRegistrationData } from "@/redux/api/auth/registerSlice";
import { TUser } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signUp] = useSignUpMutation();

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<TUser>();

  const onSubmit: SubmitHandler<TUser> = async (data) => {
    try {
      console.log("Registration Data:", data);

      // Set default role to 'user'
      const formData = { ...data, role: "user" };

      // Dispatch the registerUser action to store the data in Redux
      dispatch(setRegistrationData(formData));
      const user = await signUp(formData).unwrap();
      console.log("user data:", user);

      toast.success("Registration Successful");
      navigate("/login", { replace: true });

      // Reset the form fields after submission
      reset();
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-8 shadow-lg rounded-lg bg-white">
      <h2 className="text-3xl font-semibold text-center mb-4 text-gray-700">
        Create an Account
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            id="phone"
            {...register("phone",{ required: "Phone Number is required" })}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register("address")}
            placeholder="Enter your address"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-600"
          >
            Image URL Link
          </label>
          <input
            id="img"
            {...register("img")}
            placeholder="Enter your Image URL"
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 transition-colors"
        >
          Register
        </button>
      </form>

      <div className="text-center mt-6">
        <span className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
