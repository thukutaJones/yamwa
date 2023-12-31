"use client";

import { signInFields, signUpFields } from "../../../constants/authFields";
import { baseUrl } from "../../../constants/baseUrl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormValues = {
  email: string;
  password: string;
};

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [focuedValues, setFocusedValues] = useState({
    email: false,
    password: false,
  });

  const [hidePassword, setHidePassword] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningIn, setIsSigning] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("yamwaToken");
  //   if (token) {
  //     router.push("/home");
  //   }
  // }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSigning(true);
    try {
      const res = await axios.post(`${baseUrl}/api/auth/sign-in`, formValues);
      if (res?.data?.status === "success") {
        setErrorMessage("");
        localStorage.setItem("yamwaToken", res.data?.token);
        router.push("/home");
      }
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <div className="w-full flex flex-row-reverse bg-white h-[100vh]">
      <div className="hidden md:flex flex-col w-[35%] bg-green-600 h-full relative justify-center px-8 overflow-hidden animated fadeInLeft">
        <h2 className="text-3xl font-bold mb-4">WELCOME BACK</h2>
        <p className="text-sm">
          Sign in to track your timetable, get updates on classes, and never
          miss important events.
        </p>
      </div>
      <div className="z-10 flex flex-col items-center justify-center md:mt-4 no-scrollbar w-full md:w-[60%] overflow-scroll pb-4 animated fadeInUp">
        <h2 className="text-center text-green-600 md:text-black font-black text-3xl mt-10">
          SIGN IN
        </h2>
        {errorMessage && (
          <div className="w-[85%]  md:w-[50%] mt-4 rounded-lg p-2 bg-red-600 text-sm text-white font-medium">
            <p>{errorMessage}</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="w-full p-8 md:p-0 md:w-[50%] mt-4"
        >
          {signInFields?.map((item) => (
            <div className="mt-4 w-full" key={item.id}>
              <label className="block text-sm font-bold text-gray-700">
                {item.label}
              </label>
              <div
                className={`flex flex-row justify-between rounded-md w-full shadow-md ${
                  focuedValues[item.variable as keyof FormValues] &&
                  "shadow-green-600"
                } bg-gray-100 h-11 hover:shadow-green-600`}
              >
                <input
                  type={
                    item.placeHolder !== "password"
                      ? item.variable
                      : hidePassword
                      ? item.placeHolder
                      : "text"
                  }
                  formNoValidate
                  id={item.id}
                  value={formValues[item.variable as keyof FormValues]}
                  onFocus={() =>
                    setFocusedValues({ ...focuedValues, [item.variable]: true })
                  }
                  onBlur={() =>
                    setFocusedValues({
                      ...focuedValues,
                      [item.variable]: false,
                    })
                  }
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      [item.variable]: e.target.value,
                    })
                  }
                  className="w-[85%] px-4 bg-transparent focus:outline-none focus:shadow-green-600 text-gray-600"
                  placeholder={item.placeHolder}
                  required
                />
                {item.placeHolder === "password" && (
                  <div
                    className="h-full w-[15%] flex items-center justify-center cursor-pointer"
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? (
                      <FaEye className="text-black" size={20} />
                    ) : (
                      <FaEyeSlash className="text-black" size={20} />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            disabled={isSigningIn}
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none shadow-md focus:shadow-green-600 o focus:ring-green-500 focus:ring-offset-2 mt-8  flex items-center justify-center"
          >
            {isSigningIn ? (
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin" />
            ) : (
              <p>Sign In</p>
            )}
          </button>
          <p className="mt-4 md:mt-2 text-right text-gray-600 text-base font-semibold md:text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-600">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
