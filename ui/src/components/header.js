import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { logo } from "../backend/styles/images";
import { adminAvatar } from "../backend/styles/images";
import { Menu, Transition } from "@headlessui/react";
import {
  XCircleIcon,
  ChevronDownIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed z-30 w-full font-sans italic ${
          window.pageYOffset > 50
            ? "bg-gray-100 transition-colors duration-700"
            : "bg-transparent"
        }`}
      >
        <a href="/">
          <img
            src={logo}
            alt="WTF logo"
            className="m-5 inline-block h-auto w-40"
          ></img>
        </a>
        <div className="item-center float-right mt-7 inline-flex items-center justify-center">
          <NavLink to="/">
            <button
              className={`m-2  py-2 px-4 font-bold  ${
                location.pathname == "/"
                  ? "bg-black text-yellow-500"
                  : "text-black  hover:bg-yellow-500"
              }`}
            >
              Início
            </button>
          </NavLink>
          {/* TESTE TESTE TESTE */}
          <NavLink to="/AAA">
            <button
              className={`m-2 py-2 px-4 font-bold  ${
                location.pathname == "/AAA"
                  ? "bg-black text-amber-600"
                  : "text-black hover:bg-yellow-500"
              }`}
            >
              AAA
            </button>
          </NavLink>

          <a href="/dashboard">
            <button
              className={`m-2 py-2 px-4 font-bold  ${
                location.pathname == "/AAA"
                  ? "bg-black text-amber-600"
                  : "text-black hover:bg-yellow-500"
              }`}
            >
              Dashboard
            </button>
          </a>
          <div className="item-center inline-flex items-center justify-center">
            <img
              src={adminAvatar}
              className="h-12 rounded-full border-2 border-white shadow-sm "
              alt="Avatar"
            />
            <ChevronDownIcon className="ml-2 mr-2 h-4 w-4 text-gray-700" />
          </div>
        </div>
      </div>
    </>
  );
}
