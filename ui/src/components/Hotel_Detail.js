import React from "react";
import { Fragment, useState } from "react";
import { ShoppingCartIcon, StarIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export default function Hotel_Detail() {
  return (
    <>
      <div className="w-full rounded-lg bg-white">
        <a class="mb-4 flex h-full w-full rounded-lg bg-white">
          <img
            class="h-full rounded-lg object-cover p-4"
            src="https://rhotelgeelong.com.au/wp-content/uploads/2021/03/R-Hotel-Geelong-Hotel-Room-11.jpg"
            alt=""
          />
          <div className="flex h-full w-full flex-col p-4">
            <div>
              <h5 class="mb-3 text-2xl font-bold text-gray-900">
                CASA DA AVÓ ZIRINHA
              </h5>
              <p>Motel - Viseu</p>
              <div className="flex">
                <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
              </div>
            </div>
            <div className="inset-0 flex items-end">
              <div class="flex w-full items-center">
                <span class=" rounded-lg bg-gray-800 p-4">
                  <p className="h-6 w-6 text-center text-white">9,5</p>
                </span>
                <h2 class="ml-4 text-lg font-bold">Todo Bom</h2>
              </div>
            </div>
          </div>
        </a>

        <div class="relative p-4 shadow-md sm:rounded-lg">
          <table class="w-full text-left text-sm text-gray-500">
            <thead class="text-gray-70 bg-blue-50 text-xs uppercase">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Tipo de Quarto
                </th>
                <th scope="col" class="px-6 py-3">
                  Capacidade
                </th>
                <th scope="col" class="px-6 py-3">
                  Preço
                </th>
                <th scope="col" class="px-6 py-3">
                  Quantidade Quartos
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  Quarto Xico da Tina
                  <p className="mt-4">info</p>
                  <p>info</p>
                  <p>info</p>
                  <p>info</p>
                  <p>info</p>
                </th>
                <td class="px-6 py-4">20</td>
                <td class="px-6 py-4">$2999</td>
                <td class="px-6 py-4 ">
                  <div className="w-20">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  Quarto da Alzira
                  <p className="mt-4">info</p>
                  <p>info</p>
                  <p>info</p>
                  <p>info</p>
                  <p>info</p>
                </th>
                <td class="px-6 py-4">2</td>
                <td class="px-6 py-4">$1999</td>
                <td class="px-6 py-4">
                  <div className="w-20">
                    <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="right-0 w-40">
            <button
              type="button"
              class="m-3 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800"
            >
              <ShoppingCartIcon class="mr-2 -ml-1 h-5 w-5" />
              Reservar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// src =
//   "https://classic-motel.com/wp-content/uploads/2021/04/014-Classic-Motel-1.jpg";
// src = "https://aff.bstatic.com/images/hotel/840x460/353/353970913.jpg";
// src =
//   "https://media-cdn.tripadvisor.com/media/photo-s/21/5b/78/6e/unico-motel-faria-lima.jpg";
