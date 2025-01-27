import { getGreeting } from "@/constants/getGreeting";
import React from "react";

const ScheduleTopNav = ({ currentDay, handleClickDay, user }: { currentDay: number; handleClickDay: any; user: any;}) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date().getDay();
  const today_string = days[today];

  let format = [];
  format.push(new Date().toDateString().split(" ").slice(0, 3).join(" "));

  for (let i = today; i < days.length; i++) {
    if (days[i] !== today_string) {
      format.push(days[i]);
    }
  }

  format = [...format, ...days.slice(0, today)];

  return (
    <nav className="w-full">
      <h2 className="font-bold text-2xl text-green-600 font-sans">{getGreeting()}, <span className="text-gray-300">{user?.userName} 👋</span></h2>
      <ul className="flex flex-row items-end gap-4 mt-6 overflow-x-auto no-scrollbar">
        {format?.map((item: string, index: number) => (
          <li key={index} className="list-none">
            <button
              onClick={() => handleClickDay(days.indexOf(item?.split(" ")[0]))}
              className={`${
                currentDay === days.indexOf(item?.split(" ")[0]) ? "font-bold text-green-600 text-xl" : "text-gray-600"
              } cursor-pointer hover:scale-105 font-sans`}
            >
              <span className="">{item}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ScheduleTopNav;
