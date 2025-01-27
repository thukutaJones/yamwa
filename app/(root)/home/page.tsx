"use client";

import EmptySchedule from "@/components/EmptySchedule";
import LoadingAnimation from "@/components/LoadingAnimation";
import LoadingSchedule from "@/components/LoadingSchedule";
import ScheduleCard from "@/components/ScheduleCard";
import ScheduleTopNav from "@/components/ScheduleTopNav";
import { baseUrl } from "@/constants/baseUrl";
import { generateTimeTableHtml } from "@/constants/generateTimetableHtml";
import { retriveUserData } from "@/constants/getUserData";
import axios from "axios";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [currentDay, setCurrentDay] = useState<number>(new Date().getDay());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const [schedule, setSchedule] = useState<any>({});
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchUser = async () => {
        const token: string = localStorage.getItem("yamwaToken") || "";
        const user = await retriveUserData(token);
        setUser(user);
      };
      fetchUser();
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setIsFetching(true);
        const token = localStorage.getItem("yamwaToken");
        const { program } = await retriveUserData(token || "");
        const res = await axios.post(`${baseUrl}/api/timetable/schedule`, {
          programCode: program,
          day: currentDay,
        });
        console.log(res?.data?.schedule);
        setSchedule(res?.data?.schedule);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchSchedule();
  }, [currentDay]);

  useEffect(() => {
    const token = localStorage.getItem("yamwaToken");
    if (!token) {
      router.push("/signin");
    }
  }, []);

  const exportSchedule = async () => {
    setIsExporting(true);
    try {
      const htmlContent = generateTimeTableHtml(schedule);

      const response = await axios.post(
        "/api/generate-pdf",
        { htmlContent },
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response?.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "timetable.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
      }
    } catch (error) {
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="flex-1 w-full">
      <ScheduleTopNav
        currentDay={currentDay}
        handleClickDay={(index: any) => setCurrentDay(index)}
        user={user}
      />
      {!schedule?.content?.length && !isLoading && !isFetching && (
        <EmptySchedule />
      )}
      {isFetching && <LoadingSchedule />}
      {!isFetching && schedule?.content?.length && (
        <div className="mt-8 flex flex-col gap-4">
          {schedule?.content?.map((item: any, index: number) => (
            <ScheduleCard
              item={item}
              currentDay={currentDay}
              key={index?.toString()}
            />
          ))}
        </div>
      )}
      {schedule?.content?.length && (
        <div className="mt-8 flex justify-end w-full">
          <button
            disabled={isExporting}
            onClick={async () => await exportSchedule()}
            className={`${
              isExporting ? "px-16 py-1" : "py-2 px-10"
            } bg-green-600 text-white rounded-md hover:bg-green-700 hover:scale-105 transition-transform`}
          >
            {isExporting ? (
              <div className="w-8 h-8 border-4 border-gray-200 border-t-green-600 rounded-full animate-spin" />
            ) : (
              <p className="text-sm font-bold text-white">Export as pdf</p>
            )}
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
