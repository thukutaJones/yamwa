import TopBar from "@/components/TopBar";
import React from "react";
import LeftSideBar from "@/components/LeftSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col overflow-auto scroll-container bg-white">
      <div className="w-full relative">
        <TopBar />
        <div className="min-h-[calc(100vh-120px)] mt-[80px] p-4">{children}</div>
      </div>
      <footer className="bg-gray-50 text-gray-600 font-bold font-sans text-center p-4">
        &copy; {new Date().getFullYear()} Yamwa. All rights reserved.
      </footer>
    </main>
  );
}
