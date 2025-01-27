import { checkTimeInterval } from "@/constants/checkTimeInterval";
import React from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { GiNotebook } from "react-icons/gi";
import { IoTimeOutline } from "react-icons/io5";



const ScheduleCard = ({ item, currentDay }: { item: any; currentDay: any }) => {
  return (
    <div
      className={`p-4 rounded-md shadow flex flex-col gap-2 ${
        checkTimeInterval(item?.time, currentDay)?.status === "in progress"
          ? "border-yellow-600 bg-yellow-100 shadow-yellow-600"
          : checkTimeInterval(item?.time, currentDay)?.status === "pending"
          ? "border-orange-600 bg-orange-100 shadow-orange-600"
          : "border-green-600 bg-green-100 shadow-green-600"
      }  border-l-4 `}
    >
      <div className="flex gap-2 items-center">
        <GiNotebook className="text-gray-500" size={25}/>
        <p className="text-lg font-bold text-black">{item?.course}</p>
      </div>
      <div className="flex gap-2 items-center">
        <SiGoogleclassroom className="text-gray-500" size={25}/>
        <p className="text-lg font-bold text-black">{item?.location}</p>
      </div>
      <div className="flex gap-2 items-center">
        <IoTimeOutline className="text-gray-500" size={25}/>
        <p className="text-lg font-bold text-black">
        {item?.time?.replace("-", " - ")}
      </p>
      </div>
      <p
        className={`text-sm font-semibold ${
          checkTimeInterval(item?.time, currentDay)?.status === "in progress"
            ? "text-yellow-600"
            : checkTimeInterval(item?.time, currentDay)?.status === "pending"
            ? "text-orange-600"
            : "text-green-600"
        }`}
      >
        {checkTimeInterval(item?.time, currentDay)?.status}
      </p>
    </div>
  );
};

export default ScheduleCard;
