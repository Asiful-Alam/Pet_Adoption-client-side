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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="flex justify-center mb-6">
            <img
              src="https://i.ibb.co/YZyjz3L/category-pet.jpg"
              alt="Sign Up Illustration"
              className="w-32 h-32 object-cover rounded-full shadow-md"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h5 className="text-2xl font-bold text-center text-gray-900">
              Create an Account
            </h5>

            <div>
              <label
                htmlFor="displayName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                id="displayName"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Photo URL
              </label>
              <input
                type="text"
                {...register("photoURL", { required: true })}
                id="photoURL"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                id="email"
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="block mb-2 text-sm font-medium text-gray-900"
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
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full py-2.5 text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-center cursor-pointer"
                type="submit"
                value="Sign Up"
              />
            </div>

            <div className="text-sm font-medium text-gray-500 text-center">
              Already registered?
              <Link to="/login" className="text-blue-700 hover:underline ml-1">
                Sign in
              </Link>
            </div>
          </form>
          <div className="mt-6">
            <SocialLogin />
          </div>
          {/* <div className="my-6 space-y-4">
          <button
            onClick={handleGitHubSignIn}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-blue-500 bg-white text-gray-700 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p>Login with Github</p>
          </button>
        </div> */}
      
        </div>
      </div>
    </>
  );
};

export default SignupForm;
