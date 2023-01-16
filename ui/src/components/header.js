import React from "react";
import { logo } from "../backend/styles/images";

export default function Header() {
  return (
    <div className="absolute w-full">
      <a href="/">
        <img
          src={logo}
          alt="WTF logo"
          className="m-5 inline-block h-auto w-40"
        ></img>
      </a>
      <div className="float-right">
        <a href="/">
          <button className="m-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
            Início
          </button>
        </a>
        <a href="/dashboard">
          <button className="m-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
            Dashboard
          </button>
        </a>
      </div>
    </div>
  );
}
