import React, { useState, useEffect, Fragment } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { logo } from "../backend/styles/images";
import { adminAvatar } from "../backend/styles/images";
import { Menu, Transition } from "@headlessui/react";
import {
  XCircleIcon,
  ChevronDownIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { getUserById } from "../shared/userApi";

export default function Header() {
  const location = useLocation();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const [userImage, setUserImage] = useState("");
  const [session, setSession] = useState();
  const navigate = useNavigate();
  const Logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setSession();
    navigate("/");
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const session = sessionStorage.getItem("token").split(".")[1];
      setSession(JSON.parse(atob(session)));
    }
  }, []);

  useEffect(() => {
    getUserById(session?.id).then((res) => {
      setUserImage(res.image);
    });
  }, [session]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`fixed z-30 w-full font-sans italic ${
          window.scrollY > 50
            ? "bg-black/10 backdrop-blur transition-colors duration-700"
            : "bg-transparent"
        }`}
      >
        <a href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 819.9 414.89"
            className="m-5 ml-8 inline-block h-auto w-40 fill-white"
          >
            <path
              d="M15.24 195.1c6-1.2 12.08-2.36 18.11-3.61 9.08-1.88 18.16-3.82 27.7-5.83q12.18 91.77 24.32 183.2l.45.14c.37-.72.75-1.43 1.09-2.15Q136.47 264.08 186 161.32a4.62 4.62 0 013.66-2.86c12.55-2.55 25.07-5.26 37.6-7.91.84-.17 1.7-.27 2.79-.45 8.1 61.78 16.17 123.38 24.34 185.73.68-1.35 1.06-2.08 1.41-2.82q49.54-103.54 99-207.13a5 5 0 014-3.13c13.89-2.83 27.74-5.82 41.6-8.75a11.56 11.56 0 011.18-.13c-.34.82-.56 1.46-.85 2.07q-64.66 136.38-129.35 272.75a4 4 0 01-3.12 2.49c-15.59 3.23-31.17 6.54-47.13 9.91-8.24-58.81-16.48-117.53-24.8-176.9-.7 1.2-1.16 1.88-1.51 2.6q-46.23 94.89-92.44 189.79c-1.51 3.1-2.94 6.23-4.55 9.27a3.54 3.54 0 01-2.06 1.63C80 430.9 64.15 434.23 48 437.66c-.46-3.14-.93-6.19-1.34-9.24q-4.66-34.89-9.35-69.79-4.93-36.63-9.91-73.35t-9.82-73.36c-.7-5.13-1.55-10.25-2.34-15.37zM835.15 22.77c-.94 5-1.79 9.59-2.68 14.2-1.53 7.94-3.18 15.86-4.58 23.83-.32 1.87-1.15 2.46-2.82 2.81q-31.27 6.52-62.51 13.15-34.18 7.24-68.37 14.41a2.31 2.31 0 00-2.1 2.15Q685 131 677.76 168.58a17.14 17.14 0 00-.13 1.9l119.65-25.25c-.81 4.28-1.53 8.17-2.27 12.05-1.67 8.81-3.39 17.61-5 26.43a3 3 0 01-2.78 2.87c-38.47 8-76.91 16.23-115.37 24.28-1.91.4-2.43 1.27-2.74 2.91q-6.52 34.57-13.12 69.14-2.46 13-4.91 26a2.43 2.43 0 01-2.18 2.32c-14.11 2.9-28.19 5.93-42.29 8.91a14.2 14.2 0 01-2 .16c1.18-6.21 2.32-12.23 3.46-18.25q10.49-54.78 20.92-109.51 9.74-51 19.45-101.92c1.71-9 3.45-17.92 5.11-26.9.36-1.95.92-3 3.25-3.53Q745 41.71 833 23c.58-.09 1.14-.11 2.15-.23zM483.57 135.78l-82.14 17.33c1.09-5.8 2.09-11.2 3.12-16.6 1.39-7.32 2.84-14.62 4.17-21.95a2.87 2.87 0 012.6-2.77Q510 91 608.67 70.14c3.36-.71 6.73-1.39 10.56-2.18-.6 3.2-1.14 6.13-1.7 9.07-1.85 9.75-3.77 19.49-5.52 29.26a3.15 3.15 0 01-2.9 3q-33.5 7-67 14.08c-3.68.78-7.34 1.63-11 2.32a2.23 2.23 0 00-2.14 2.08q-9.82 52.23-19.73 104.35-9.93 52.5-19.88 105a14.84 14.84 0 00-.48 2.6c0 4.08-2.08 5.64-6.11 6.39-13 2.43-25.86 5.35-38.78 8.06-.6.13-1.23.14-2.17.24 13.93-72.9 27.8-145.57 41.75-218.63z"
              transform="translate(-15.24 -22.77)"
            ></path>
          </svg>
        </a>
        <div className="item-center float-right mt-7 inline-flex items-center justify-center">
          <NavLink to="/">
            <button
              className={`m-2  py-2 px-4 font-bold  ${
                location.pathname == "/"
                  ? "rounded text-white outline outline-1 outline-white"
                  : "hover:outline-outline-white rounded  text-white hover:outline hover:outline-1"
              }`}
            >
              Início
            </button>
          </NavLink>
          <NavLink to="/about">
            <button
              className={`m-2 py-2 px-4 font-bold  ${
                location.pathname == "/about"
                  ? "rounded text-white outline outline-1 outline-white"
                  : "rounded text-white  hover:outline hover:outline-1 hover:outline-white"
              }`}
            >
              Sobre Nós
            </button>
          </NavLink>

          {session?.isAdmin ? (
            <a href="/dashboard">
              <button
                className={`m-2 py-2 px-4 font-bold  ${
                  location.pathname == "/AAA"
                    ? "rounded text-white outline outline-1 outline-white"
                    : "hover:outline-outline-white rounded  text-white hover:outline hover:outline-1"
                }`}
              >
                Dashboard
              </button>
            </a>
          ) : null}
          {session ? (
            <div className="flex items-center pr-4 md:pr-16">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="item-center inline-flex w-full items-center justify-center">
                    <img
                      src={`https://wtf-backend.onrender.com/images/${userImage}`}
                      className="h-8 rounded-full border-2 border-white shadow-sm md:mr-4"
                      alt="Avatar"
                    />
                    <span className="hidden text-gray-700 md:inline-block">
                      {session.name}
                    </span>
                    <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
                  </Menu.Button>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform scale-95"
                  enterTo="transform scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform scale-100"
                  leaveTo="transform scale-95"
                >
                  <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-white shadow-sm ">
                    <div className="p-1 ">
                      <Menu.Item>
                        <Link
                          to="/profile"
                          className="flex items-center p-2 text-sm text-gray-700 transition-colors hover:bg-orange-100"
                        >
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Editar Perfil
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link
                          onClick={(e) => Logout(e)}
                          className="flex items-center p-2 text-sm text-gray-700 transition-colors hover:bg-orange-100 "
                        >
                          <ArrowRightOnRectangleIcon className="mr-2 h-4 w-4" />
                          Sair
                        </Link>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <NavLink to="/login">
              <button
                type="button"
                className="mr-8 mb-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
              >
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
