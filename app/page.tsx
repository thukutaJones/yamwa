"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeroSection() {
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("yamwaToken");
  //   if (token) {
  //     router.push("/home");
  //   }
  // }, []);

  return (
    <div
      className="relative h-screen bg-cover bg-center text-white flex items-center justify-center px-6 lg:px-16"
      style={{
        backgroundImage: "url('/Student_schedule.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center max-w-4xl">
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animated fadeInDown">
          Stay Organized with <span className="text-green-500">Yamwa</span>
        </h1>
        <p className="text-lg lg:text-xl font-medium mb-8 animated fadeIn">
          Manage your school timetable effortlessly and track your classes with
          ease.
        </p>
        <button
          onClick={() => router.push("/signin")}
          className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-green-800 hover:shadow-xl transition duration-300 animated fadeInUp"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
