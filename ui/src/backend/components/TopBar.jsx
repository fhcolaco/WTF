import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import {
  XCircleIcon,
  ChevronDownIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "../../shared/userApi";
import { useEffect, useState } from "react";

export const TopBar = (props) => {
  const [sideBar, setSideBar] = props.sideBarState;
  const [userImage, setUserImage] = useState("");
  const [session, setSession] = useState({});
  const navigate = useNavigate();
  const Logout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      console.log("Não tem token");
      navigate("/");
    } else {
      const session = sessionStorage.getItem("token").split(".")[1];
      setSession(JSON.parse(atob(session)));
    }
  }, []);

  useEffect(() => {
    if (!session.isAdmin && session.isAdmin !== undefined) {
      console.log("Não é admin");
      navigate("/");
    }
    getUserById(session.id).then((res) => {
      setUserImage(res.image);
    });
  }, [session]);

  return (
    <div
      className={`item-center absolute z-10 flex h-16 w-full justify-between bg-gray-200 transition-all duration-[400ms] ${
        sideBar ? "pl-56" : ""
      }`}
    >
      <div clssname="pl-4 md:pl-16">
        {!sideBar ? (
          <Bars3BottomLeftIcon
            className="h-14 w-14 cursor-pointer text-gray-700 transition-colors duration-300 hover:text-orange-500"
            onClick={() => setSideBar(!sideBar)}
          />
        ) : (
          <XCircleIcon
            className="h-14 w-14 cursor-pointer text-gray-700 transition-colors duration-300 hover:text-orange-500"
            onClick={() => setSideBar(!sideBar)}
          />
        )}
      </div>
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
                    to={`/dashboard/utilizador/${session.id}`}
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
    </div>
  );
};
