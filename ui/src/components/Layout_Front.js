import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout_Front() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="absolute inset-0 pt-40">
        <div className="relative z-10 mx-40">
          <Outlet />
        </div>
      </div>
      <div className="fixed h-screen w-full bg-[url('https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg')] bg-cover  bg-no-repeat" />
      <div className="fixed inset-0  h-screen bg-gradient-to-t from-black bg-cover" />
      <div
        className={`fixed h-screen w-full ${
          window.location.pathname == "/"
            ? isVisible
              ? "transition-color bg-black/50 duration-500"
              : "transition-color bg-black/5 duration-500"
            : "transition-color bg-black/50 duration-500"
        } bg-cover`}
      />
    </>
  );
}
