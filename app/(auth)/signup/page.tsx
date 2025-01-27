"use client";

import { signUpFields } from "../../../constants/authFields";
import { baseUrl } from "../../../constants/baseUrl";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type FormValues = {
  fullName: string;
  phoneNumber: string;
  email: string;
  setPassword: string;
  comfirmPassword: string;
  program: string;
};

type HidePassword = {
  setPassword: false;
  comfirmPassword: false;
};

type Program = {
  _id: string;
  name: string;
  codes: any;
};

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    program: "",
    setPassword: "",
    comfirmPassword: "",
  });

  const [focuedValues, setFocusedValues] = useState({
    fullName: false,
    phoneNumber: false,
    email: false,
    setPassword: false,
    comfirmPassword: false,
    selectedProgram: false,
    program: false,
  });

  const [hidePassword, setHidePassword] = useState({
    setPassword: true,
    comfirmPassword: true,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSigningUp, setIsSigning] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program>();

  const router = useRouter();

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProgram = programs.find(
      (program: any) => program?._id === e.target.value
    );
    setSelectedProgram(selectedProgram);
  };

  useEffect(() => {
    const token = localStorage.getItem("yamwaToken");
    if (token) {
      router.push("/home");
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSigning(true);
    setErrorMessage("");
    try {
      if (formValues.setPassword?.length >= 8) {
        if (formValues.setPassword === formValues.comfirmPassword) {
          const payload = {
            userName: formValues.fullName,
            email: formValues.email,
            password: formValues.comfirmPassword,
            role: "student",
            program: formValues.program,
          };
          const res = await axios.post(`${baseUrl}/api/auth/sign-up`, payload);
          if (res?.data?.status === "success") {
            setErrorMessage("");
            localStorage.setItem("yamwaToken", res.data?.token);
            router.push("/home");
          }
        } else {
          setErrorMessage("passwords does not match");
        }
      } else {
        setErrorMessage("password has to be 8 characters or more");
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

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/program`);
        setPrograms(res?.data?.programs);
      } catch (error) {
        setErrorMessage("Failed to fetch programs");
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="w-full flex flex-row bg-white md:bg-white h-[100vh]">
      <div className="hidden md:flex flex-col w-[35%] bg-green-600 h-full relative justify-center px-8 overflow-hidden animated fadeInRight">
        <h2 className="text-3xl font-bold mb-4">Join Yamwa Today</h2>
        <p className="text-sm">
          Sign up to track your timetable, get updates on classes, and never
          miss important events.
        </p>
      </div>
      <div className="z-10 flex flex-col items-center justify-center md:mt-4 no-scrollbar w-full md:w-[60%] overflow-scroll pb-4 animated fadeInUp">
        <h2 className="text-center text-green-600 md:text-black font-black text-3xl mt-10">
          SIGN UP
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
          {signUpFields?.map((item: any, index: number) => (
            <div key={index?.toString()}>
              <div className="mt-4 w-full">
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
                    formNoValidate
                    type={
                      item.placeHolder !== "password"
                        ? item.variable
                        : hidePassword[item.variable as keyof HidePassword]
                        ? item.placeHolder
                        : "text"
                    }
                    id={item.id}
                    value={formValues[item.variable as keyof FormValues]}
                    onFocus={() =>
                      setFocusedValues({
                        ...focuedValues,
                        [item.variable]: true,
                      })
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
                      onClick={() =>
                        setHidePassword({
                          ...hidePassword,
                          [item.variable]:
                            !hidePassword[item.variable as keyof HidePassword],
                        })
                      }
                    >
                      {hidePassword[item.variable as keyof HidePassword] ? (
                        <FaEye className="text-black" size={20} />
                      ) : (
                        <FaEyeSlash className="text-black" size={20} />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {item?.variable === "email" && (
                <>
                  <div className="mt-4">
                    <label className="block text-sm font-bold text-gray-700">
                      Program
                    </label>
                    <div
                      className={`flex flex-row justify-between rounded-md w-full shadow-md ${
                        focuedValues[item.variable as keyof FormValues] &&
                        "shadow-green-600"
                      } bg-gray-100 h-11 hover:shadow-green-600`}
                    >
                      <select
                        name="selectedProgram"
                        className="w-[85%] px-4 bg-transparent focus:outline-none focus:shadow-green-600 text-gray-600"
                        value={selectedProgram?._id || ""}
                        onChange={handleProgramChange}
                        required
                      >
                        <option value="">Select your program</option>
                        {programs.map((program) => (
                          <option key={program._id} value={program._id}>
                            {program.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {selectedProgram?.name && (
                    <div className="mt-4">
                      <label className="block text-sm font-bold text-gray-700">
                        Program Code
                      </label>
                      <div
                        className={`flex flex-row justify-between rounded-md w-full shadow-md ${
                          focuedValues[item.variable as keyof FormValues] &&
                          "shadow-green-600"
                        } bg-gray-100 h-11 hover:shadow-green-600`}
                      >
                        <select
                          name="selectedProgram"
                          className="w-[85%] px-4 bg-transparent focus:outline-none focus:shadow-green-600 text-gray-600"
                          value={formValues.program}
                          onChange={(e: any) =>
                            setFormValues({
                              ...formValues,
                              program: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select your program code</option>
                          {selectedProgram?.codes?.map(
                            (program: any, index: any) => (
                              <option key={index} value={program.name}>
                                {program.name}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          <button
            disabled={isSigningUp}
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none shadow-md focus:shadow-green-600 o focus:ring-green-500 focus:ring-offset-2 mt-8  flex items-center justify-center"
          >
            {isSigningUp ? (
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin" />
            ) : (
              <p>Sign Up</p>
            )}
          </button>
          <p className="mt-4 md:mt-2 text-right text-gray-600 text-base font-semibold md:text-sm">
            Aleardy have an account?{" "}
            <Link href="/signin" className="text-green-600">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
