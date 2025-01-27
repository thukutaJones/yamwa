import Image from "next/image";
import React from "react";

const EmptySchedule = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[50vh] px-16">
      <Image src="/no_class.png" width={200} height={200} alt="no_class" />
      <p className="text-center font-bold text- text-gray-500">
        You have no classes today. Good luck in your studies 😊
      </p>
    </div>
  );
};

export default EmptySchedule;
