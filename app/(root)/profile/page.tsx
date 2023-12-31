"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { retriveUserData } from "@/constants/getUserData";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getUserId } from "@/constants/getUserId";
import { baseUrl } from "@/constants/baseUrl";
import LoadingSchedule from "@/components/LoadingSchedule";

const Profile = () => {
  const [user, setUser] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const token: string = localStorage.getItem("yamwaToken") || "";
        const user = await retriveUserData(token);
        setUser(user);
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("yamwaToken");
      router.replace("/signin");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("yamwaToken");
    if (!token) {
      router.push("/signin");
    }
  }, []);

  return (
    <div className="py-4 px-8 md:pr-4 w-full">
      {isLoading && <LoadingSchedule />}
      {user?.userName && !isLoading && (
        <>
          <div
            className="flex flex-col md:flex-row md:gap-4 w-full items-center md:items-start md:p-4"
            style={{ borderRadius: "8px" }}
          >
            {user?.profilePhoto && (
              <Image
                src={user?.profilePhoto}
                width={200}
                height={200}
                alt="profile_pic"
                className="rounded-full h-28 w-28"
              />
            )}
            <div className="mt-2 font-work-sans">
              <p className="text-gray-500 text-lg md:text-3xl font-bold">
                {user?.userName}
              </p>
              <p className="text-center md:text-left text-xs text-gray-600 font-sans">
                User
              </p>
            </div>
          </div>
          <div
            className="w-full mt-16 md:mt-4 md:bg-white md:p-4"
            style={{ borderRadius: "8px" }}
          >
            <p className="text-xs md:text-sm font-bold text-gray-600">
              User Information
            </p>
            <div className="p-4 mt-2 md:mt-0 md:p-0 bg-white md:bg-transparent w-full rounded-2xl">
              <div className="w-full flex flex-col md:mt-4 md:flex-row md:gap-48">
                <div className="flex flex-row md:flex-col gap-2 md:gap-0 pb-3 border-b md:border-0 border-gray-300">
                  <p className="text-black font-sans font-bold">
                    User name <span className="md:hidden">:</span>{" "}
                  </p>
                  <p className="text-gray-500">{user?.userName}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 md:gap-0 pb-3 border-b md:border-0 border-gray-300">
                  <p className="text-black font-sans font-bold">
                    Program<span className="md:hidden">:</span>{" "}
                  </p>
                  <p className="text-gray-500">{user?.program}</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 md:gap-0 mt-2 md:mt-0">
                  <p className="text-black font-sans font-bold">
                    E-mail<span className="md:hidden">:</span>{" "}
                  </p>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="w-full mt-8 md:mt-4 md:p-4 bg-transparent md:bg-white"
            style={{ borderRadius: "8px" }}
          >
            <p className="text-xs md:text-sm font-bold text-black">Account</p>
            <div className="p-4 mt-2 md:mt-0 md:p-0 bg-white md:bg-transparent w-full rounded-2xl">
              {/* <div
                className="flex gap-2 md:mt-4 text-red-600 items-center border-b pb-2 md:border-0 md:pb-0 border-gray-300 cursor-pointer"
                onClick={handleDeleteAccount}
              >
                <MdDelete size={30} />
                <p>Delete Account</p>
              </div> */}
              <div
                className="flex gap-2 mt-2 text-blue-600 items-center cursor-pointer"
                onClick={handleLogout}
              >
                <IoMdLogOut size={30} />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
