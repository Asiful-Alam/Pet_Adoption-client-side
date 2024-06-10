import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAxiosPublic from "../Hook/useAxiosPublic";

const SignupForm = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          // create user entry in the database
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: data.photoURL,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              reset();
            
              navigate("/");
            }
          });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Pet || Sign Up</title>
      </Helmet>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Create an Account
          </h5>

          <div>
            <label
              htmlFor="displayName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="displayName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="John Doe"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Photo URL
            </label>
            <input
              type="text"
              {...register("photoURL", { required: true })}
              id="photoURL"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Photo URL"
            />
            {errors.photoURL && (
              <span className="text-red-500 text-sm">
                Photo URL is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 15,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              })}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="••••••••"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500 text-sm">
                Password must be at least 6 characters long
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500 text-sm">
                Password must be at most 15 characters long
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500 text-sm">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character
              </span>
            )}
          </div>

          <div>
            <input
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
              value="Sign Up"
            />
          </div>

          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered?
            <Link
              to="/login"
              className="text-blue-700 hover:underline dark:text-blue-500"
            >
              {" "}
              Sign in
            </Link>
          </div>
        </form>
        <div>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
