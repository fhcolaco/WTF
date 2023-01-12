import { useState, useEffect, Fragment } from "react";
import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";
import { Transition } from "@headlessui/react";
import { Routes, Route } from "react-router-dom";
import { error404 } from "../styles/images";

export const Layout = (props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
      setIsMobile(true);
    } else {
      setSidebarOpen(true);
      setIsMobile(false);
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
    <>
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
      <Routes>
        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center">
              <img src={error404} alt="404" />
            </div>
          }
        />
      </Routes>
    </>
  );
};
