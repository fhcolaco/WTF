import { Combobox } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Search() {
  return (
    <>
      <div className="flex w-full flex-row px-20">
        <div className="mr-10 w-5/12 rounded-lg bg-white">
          <p className="text-2xl font-bold">Filtrar</p>
          <Combobox>
            <Combobox.Input
              className="ml-6 mt-6 h-10 w-56 rounded border-white px-4 outline outline-1 outline-black"
              placeholder={"cidade"}
            ></Combobox.Input>
          </Combobox>
        </div>
        {/* items-center */}
        <a
          href="#"
          class="flex h-72 w-full  rounded-lg bg-white shadow hover:bg-gray-100"
        >
          <img
            class="h-full w-96 rounded-l-lg object-cover"
            src="https://cdn.guiademoteis.com.br/Images/moteis/2115-Intense-Motel/suites/16845-Infinity-Erotica/fotos/268a9a04-3600-49d3-b53a-340a38d5814f-suites.jpg"
            alt=""
          />
          <div className="w-full">
            <div class="flex flex-col justify-end p-4">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                CASA DA AVÓ ZIRINHA
              </h5>
              <div className="flex">
                <StarIcon className="stroke h-6 w-6 fill-yellow-300" />
                <StarIcon className="stroke h-6 w-6 fill-yellow-300" />
                <StarIcon className="stroke h-6 w-6 fill-yellow-300" />
                <StarIcon className="stroke h-6 w-6 fill-yellow-300" />
                <p> - Motel</p>
              </div>
            </div>
            <div className=" right-0 flex w-full justify-items-end p-4">
              <div class="flex w-full items-center">
                <span class=" rounded-lg bg-gray-800 p-4">
                  <p className="h-6 w-6 text-center text-white">9,5</p>
                </span>
                <h2 class="ml-4 text-lg font-bold">Todo Bom</h2>
              </div>
              <div className="grid w-full justify-items-end">
                <p>78 €</p>
                <NavLink to="/aaa">
                  <button
                    type="button"
                    class="rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl"
                  >
                    Ver Oferta
                  </button>
                </NavLink>
              </div>
            </div>
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
