import { useState, useEffect, Fragment } from "react";
import SideBar from "./Sidebar";
import TopBar from "./TopBar";
import { Transition } from "@headlessui/react";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 640) {
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
    }
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
      <TopBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Transition as={Fragment} show={sidebarOpen} enter="transform transition duration-[400ms]" enterFrom="-translate-x-full"
        enterTo="translate-x-0" leave="transform duration-[400ms] transition ease-in-out" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
        <SideBar sidebarOpen={sidebarOpen} />
      </Transition>
      <main className={`pt-16 transition-all duration-[400ms] ${sidebarOpen && !isMobile ? "pl-56" : ""}`}>
        <div className="px-4 md:px-16">
          {children}
        </div>
      </main>
    </>
  );
}