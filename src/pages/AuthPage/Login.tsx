import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/auth/authApi";
import { setUser } from "@/redux/api/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Assuming you're using React Router
import { TUser } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const { handleSubmit, reset, register, setValue } = useForm<TUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TUser) => {
    try {
      const res = await login(data).unwrap();
      const token = res.token;
      const user = verifyToken(token) as TUser;
      dispatch(setUser({ user, token }));
      if (user) {
        toast.success("Login Successfully");
        navigate(location.state?.from?.pathname || "/", {
          replace: true,
        });
        reset();
      }
    } catch (error) {
      toast.error("Login Failed");
    }
  };

  const handleDemoAdmin = () => {
    setValue("email", "Sabilar@admin.com");
    setValue("password", "12345678");
  };

  const handleDemoUser = () => {
    setValue("email", "Sabilar@user.com");
    setValue("password", "12345678");
  };

  return (
    <div className="max-w-sm mx-auto my-20 p-4 shadow-lg rounded-lg bg-white">
      <h1 className="text-4xl text-center font-semibold mb-2">Welcome </h1>
      <h2 className="text-2xl text-center font-semibold mb-2">
        Login to Turbo <span className="text-[#02c39a]">Shine</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>

      <div className="flex justify-between gap-4 mt-4">
        <button
          onClick={handleDemoAdmin}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Demo Admin
        </button>
        <button
          onClick={handleDemoUser}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Demo User
        </button>
      </div>

      <div className="text-center mt-4">
        <span className="text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
