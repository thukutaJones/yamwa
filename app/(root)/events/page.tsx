import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[50vh] px-16">
      <Image src="/no_class1.png" width={200} height={200} alt="no_class" />
      <p className="text-center font-bold text- text-gray-500">
        No events found
      </p>
    </div>
  );
};

export default page;
