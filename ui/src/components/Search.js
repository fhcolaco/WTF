import { Combobox } from "@headlessui/react";
import React from "react";

export default function Search() {
  return (
    <>
      <div className="flex w-full flex-row">
        <div className="mr-10 w-1/3 rounded-lg bg-white">
          <p className="text-2xl font-bold">Filtrar</p>
          <Combobox>
            <Combobox.Input
              className="ml-6 mt-6 h-10 w-56 rounded border-white px-4 outline outline-1 outline-black"
              placeholder={"cidade"}
            ></Combobox.Input>
          </Combobox>
        </div>

        <a
          href="#"
          class="flex h-72  w-full items-center rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <img
            class="h-full w-96 object-cover"
            src="https://cdn.guiademoteis.com.br/Images/moteis/2115-Intense-Motel/suites/16845-Infinity-Erotica/fotos/268a9a04-3600-49d3-b53a-340a38d5814f-suites.jpg"
            alt=""
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
{
  /* // cidade // Datas // quantidade pessoas // preco // estrelas // tipo de
      alojamento // categoria do quarto */
}
