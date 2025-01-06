import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerPost } from "../../HttpService/APIService";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectImage = useRef(null);
  // const [file,setFile] = useState(null);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const selectAvtar = () => {
    selectImage.current.click();
  };

  const navigate = useNavigate();

  const onsubmit = (data) => {
    delete data.confirmPassword;
    console.log(formData);

    registerPost("/auth/register", data)
      .then((result) => {
        console.log(result);
        toast.success("User Register successfully");
        reset();
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  const uploadImage = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    registerPost("/user/upload", formData)
    .then((result) => {
      console.log(result);
      toast.success("Upload image successfully");
    })
    .catch((error) => console.log(error));
    
  };

  return (
    <>
      <section className="w-196 bg-gray-400 dark:bg-gray-900 flex items-center p-4 rounded-xl">
        <div
          className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0"
          style={{ width: "700px" }}
        >
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onsubmit)}
              >
                <div className="mt-6">
                  <label
                    htmlFor="userName"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Username
                  </label>
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="nishant jarang"
                    required=""
                  />
                  {errors?.username?.type == "required" && (
                    <p className="text-red-600 text-start">
                      Username is required
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Your email
                  </label>
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-start">email is required</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 7,
                        message: "Password must be at least 7 characters long",
                      },
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.password?.type == "required" && (
                    <p className="text-red-600 text-start">
                      Password is required
                    </p>
                  )}
                  {errors.password?.type == "minLength" && (
                    <p className="text-red-600 text-start">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white text-start"
                  >
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword", {
                      validate: (val) => {
                        if (watch("password") != val) {
                          return "Your passwords do no match";
                        }
                      },
                    })}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                  {errors.confirmPassword?.type == "validate" && (
                    <p className="text-red-600 text-start">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <button
                  onClick={selectAvtar}
                  type="button"
                  className="relative inline-flex items-center p-2 rounded-full text-sm font-medium text-center text-white bg-gray-200  hover:bg-sky-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <div className="w-20 rounded-full">
                    <img
                      className="rounded-full"
                      src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3467.jpg"
                      alt=""
                    />
                  </div>
                  <div className="absolute  inline-flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                    <i className="fa-solid fa-camera"></i>
                  </div>
                </button>
                <input
                  ref={selectImage}
                  style={{ display: "none" }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  id="file_input"
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                />

                <button className="bg-sky-400 w-full" type="submit">
                  Sign Up
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
