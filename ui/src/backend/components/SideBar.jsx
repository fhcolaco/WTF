import { forwardRef } from "react";
import { logo } from "../styles/images";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  BuildingOffice2Icon,
  UserIcon,
} from "@heroicons/react/24/solid";

//CREATE NAV ITEMS ARRAY

export const SideBar = forwardRef((props, ref) => {
  const router = useNavigate();
  return (
    <div
      ref={ref}
      className="fixed h-screen
    w-56 bg-zinc-800 shadow-sm"
    >
      <div className="mt-6 mb-14 flex justify-center">
        <img src={logo} alt="WTF_logo" className="h-auto w-32 " />
      </div>
      <div className="flex flex-col">
        <Link to="/dashboard">
          <div
            className={`mx-5 mb-3 flex cursor-pointer items-center rounded py-3 pl-6 text-center transition-colors ${
              router.path === "/dashboard"
                ? "bg-orange-100 text-orange-500"
                : "text-grey-400 hover: text-orange-500 hover:bg-orange-100"
            }`}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Página Inicial</p>
            </div>
          </div>
        </Link>
        <Link to="/dashboard/users">
          <div
            className={`mx-5 mb-3 flex cursor-pointer items-center rounded py-3 pl-6 text-center transition-colors ${
              router.path === "/dashboard/users"
                ? "bg-orange-100 text-orange-500"
                : "text-grey-400 hover: text-orange-500 hover:bg-orange-100"
            }`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Utilizadores</p>
            </div>
          </div>
        </Link>
        <Link to="/dashboard/hotel">
          <div
            className={`mx-5 mb-3 flex cursor-pointer items-center rounded py-3 pl-6 text-center transition-colors ${
              router.path === "/dashboard/hotel"
                ? "bg-orange-100 text-orange-500"
                : "text-grey-400 hover: text-orange-500 hover:bg-orange-100"
            }`}
          >
            <div className="mr-2">
              <BuildingOffice2Icon className="h-5 w-5" />
            </div>
            <div>
              <p>Hotéis</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});
