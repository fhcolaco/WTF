import React from "react";
import { logo } from "../backend/styles/images";

export default function Header() {
  return (
    <div className=" w-full bg-slate-300">
      <img src={logo} alt="sdxc" className="h-auto w-40"></img>
      <a href="/dashboard">
        <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Início
        </button>
      </a>
    </div>
  );
}
