import { useState, useEffect, Fragment } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Transition } from "@headlessui/react";
import { Outlet } from "react-router-dom";

export default function Layout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [sidebarOpen]);

  return (
    <div className="absolute h-screen w-screen">
      <TopBar sideBarState={[sidebarOpen, setSidebarOpen]} />
      <Transition
        as={Fragment}
        show={sidebarOpen}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar sidebar={sidebarOpen} />
      </Transition>
      <div className="relative flex h-full items-center justify-center bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}
