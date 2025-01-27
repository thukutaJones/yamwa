"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import MobileMenu from "./MobileMenu";
import { usePathname, useRouter } from "next/navigation";
import { retriveUserData } from "@/constants/getUserData";
import LeftSideBar from "./LeftSideBar";

const TopBar = () => {
  const currentRoute = usePathname();
  const [user, setUser] = useState<any>({});

  const router = useRouter();
  const route = usePathname();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("yamwaToken");
      if (!token) {
        router.push("/signin");
      }
      const user = await retriveUserData(token || "");
      setUser(user || {});
    };
    getUserData();
  }, [route]);

  return (
    <header className="fixed flex items-center justify-between bg-green-600 text-white p-4 h-[70px] w-full top-0 left-0">
      <LeftSideBar />
      <button
        className="flex items-center gap-2"
        onClick={() => router.push("/profile")}
      >
        <div className="hidden md:flex flex-col items-start">
          <p className="font-bold font-sans text-sm">{user?.userName}</p>
          <p className="font-sans text-xs">{user?.email}</p>
        </div>
        <div className="w-10 h-10">
          <img
            src="/avatar.jpg"
            alt="Profile"
            className="h-full w-full rounded-full border-2 border-white"
          />
        </div>
      </button>
    </header>
  );
};

export default TopBar;
