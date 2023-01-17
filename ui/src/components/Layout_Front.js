import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout_Front() {
  return (
    <div>
      <Header />
      <div className="absolute inset-0 mt-40">
        <div className="relative z-10 mx-10">
          <Outlet />
        </div>
      </div>
      <div className="-z-10">
        <div className="fixed inset-0 h-screen bg-gradient-to-t from-black bg-cover"></div>
        <div className=" h-screen bg-[url('https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg')] bg-cover bg-no-repeat"></div>
        <div className=" h-screen bg-[url('https://checkin.com.pt/wp-content/uploads/2020/10/Captura-de-ecra%CC%83-2020-10-27-a%CC%80s-09.43.24.png')] bg-cover bg-no-repeat"></div>
      </div>
    </div>
  );
}
