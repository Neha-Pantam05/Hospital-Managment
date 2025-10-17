
import Navbar from "@/components/navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30">
      <Navbar />
     
      {children}
    </main>
  );
};

export default HomeLayout;
