// import { useForm } from "react-hook-form";
// import { useLoginMutation } from "@/redux/api/auth/authApi";
// import { setUser } from "@/redux/api/auth/authSlice";
// import { Link, useLocation, useNavigate } from "react-router-dom"; // Assuming you're using React Router
// // import { useDispatch } from "react-redux";
// import { TUser } from "@/types";
// import { verifyToken } from "@/utils/verifyToken";
// import {  toast } from 'sonner'
// import { useAppDispatch } from "@/redux/hook";

// const Login = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useAppDispatch()
//   const [login] = useLoginMutation();

//   const { handleSubmit, reset, register } = useForm<TUser>({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: TUser) => {
//     try {
//       const res = await login(data).unwrap();
//       const token = res.token;
//       const user  = verifyToken(token) as TUser;
//       dispatch(setUser({ user, token }));
//       if (user) {
//         toast.success('Login Successfully')
//         navigate(location.state?.from?.pathname || "/", {
//           replace: true,
//         });
//         reset();

//         // console.log(user)
        
//       }
//     } catch (error) {
//       toast.error('Login Failed')
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto my-12 p-6 shadow-lg rounded-lg bg-white">
//       <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium">
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             {...register("email")}
//             placeholder="Enter your email"
//             className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="password" className="block text-sm font-medium">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             {...register("password")}
//             placeholder="Enter your password"
//             className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
//         >
//           Login
//         </button>
//       </form>

//       <div className="text-center mt-4">
//         <span className="text-sm">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-500 hover:underline">
//             Register here
//           </Link>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Login;


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
    <div className="max-w-sm mx-auto my-12 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl text-center font-semibold mb-6">Login</h2>

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

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handleDemoAdmin}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
        >
          Demo Admin
        </button>
        <button
          onClick={handleDemoUser}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-200"
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

