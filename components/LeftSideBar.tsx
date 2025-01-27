"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { RiHome5Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { usePathname, useRouter } from "next/navigation";
import { TbFileDescription, TbFileCv } from "react-icons/tb";
import { LiaHandshake } from "react-icons/lia";

const LeftSideBar = () => {
  const currentPath = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const handlePressTab = (route: string) => {
    router.push(route);
    setIsOpen(false);
  };
  return (
    <div className="w-full">
      <button
        className="flex gap-2 items-center hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full flex-col">
          <div className="flex flex-col gap-1 cursor-pointer">
            <div
              className={`w-6 h-1 bg-white rounded-sm ${
                isOpen ? "rotate-45" : ""
              } origin-left ease-in-out duration-500`}
            />
            <div
              className={`w-6 h-1 bg-white  rounded-sm ${
                isOpen ? "opacity-0" : ""
              } ease-in-out duration-500`}
            />
            <div
              className={`w-6 h-1 bg-white  rounded-sm ${
                isOpen ? "-rotate-45" : ""
              } origin-left ease-in-out duration-500`}
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold font-sans">Yamwa</h1>
      </button>
      {isOpen && (
        <div
          className="w-full absolute bg-black bg-opacity-20 top-0 left-0 h-screen z-20"
          onClick={() => setIsOpen(false)}
        >
          <nav
            className="py-4 px-6 border-4 border-l-0 border-b-0 border-green-700 rounded-r-3xl h-full bg-green-600 w-[80%] md:w-[25%] animated2 slideInLeft z-30"
            onClick={(e: any) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold font-sans">Yamwa</h1>
              <button className="flex-col" onClick={() => setIsOpen(false)}>
                <div className="flex flex-col gap-1 cursor-pointer">
                  <div
                    className={`w-6 h-1 bg-white rounded-sm ${
                      isOpen ? "rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                  />
                  <div
                    className={`w-6 h-1 bg-white  rounded-sm ${
                      isOpen ? "opacity-0" : ""
                    } ease-in-out duration-500`}
                  />
                  <div
                    className={`w-6 h-1 bg-white  rounded-sm ${
                      isOpen ? "-rotate-45" : ""
                    } origin-left ease-in-out duration-500`}
                  />
                </div>
              </button>
            </div>
            <ul className="space-y-4 font-bold font-sans mt-6">
              <li>
                <button
                  className={`p-2 w-full text-left hover:scale-105 rounded-3xl ${
                    currentPath === "/home" ? " bg-green-700" : "bg-white"
                  }  `}
                  onClick={() => handlePressTab("/home")}
                >
                  <div className="flex gap-2 items-center px-4">
                    <RiHome5Fill
                      size={25}
                      color={currentPath === "/home" ? "white" : "green"}
                    />
                    <p
                      className={`${
                        currentPath === "/home"
                          ? "text-white"
                          : "text-green-600"
                      }`}
                    >
                      Schedules
                    </p>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className={`p-2 w-full text-left rounded-3xl hover:scale-105 ${
                    currentPath === "/full-timetable"
                      ? "bg-green-700"
                      : "bg-white"
                  }  `}
                  onClick={() => handlePressTab("/full-timetable")}
                >
                  <div className="flex gap-2 items-center px-4">
                    <TbFileDescription
                      size={25}
                      color={
                        currentPath === "/full-timetable" ? "white" : "green"
                      }
                    />
                    <p
                      className={`${
                        currentPath === "/full-timetable"
                          ? "text-white"
                          : "text-green-600"
                      }`}
                    >
                      Full timetable
                    </p>
                  </div>
                </button>
              </li>
              <li>
                <button
                  className={`p-2 w-full text-left rounded-3xl hover:scale-105 ${
                    currentPath === "/profile" ? "bg-green-700" : "bg-white"
                  }  `}
                  onClick={() => handlePressTab("/profile")}
                >
                  <div className="flex gap-2 items-center px-4">
                    <CgProfile
                      size={25}
                      color={currentPath === "/profile" ? "white" : "green"}
                    />
                    <p
                      className={`${
                        currentPath === "/profile"
                          ? "text-white"
                          : "text-green-600"
                      }`}
                    >
                      Profile
                    </p>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default LeftSideBar;
