import { Combobox } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Search() {
  return (
    <>
      <div className="flex w-full flex-row">
        <div className="fixed mr-6 h-auto w-3/12 rounded-lg bg-white p-4">
          <p className="text-2xl font-bold">Filtrar</p>
          <Combobox>
            <Combobox.Input
              className="mt-6 h-10 w-56 rounded border-white px-4 outline outline-1 outline-black"
              placeholder={"cidade"}
            ></Combobox.Input>
          </Combobox>
        </div>
        <div className="w-full flex-col">
          <a class="mb-4 flex h-72 w-full rounded-lg bg-white">
            <img
              class="h-full w-96 rounded-l-lg object-cover"
              src="https://aquashowpark.com/wp-content/uploads/2022/03/Hotelae%CC%81rio-65-e1646846021885.jpg"
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
                <div className="grid w-full justify-items-end">
                  <p>78 €</p>
                  <NavLink to="/hoteldetail">
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
          <a class="mb-4 flex h-72 w-full rounded-lg bg-white">
            <img
              class="h-full w-96 rounded-l-lg object-cover"
              src="https://aquashowpark.com/wp-content/uploads/2022/03/Hotelae%CC%81rio-65-e1646846021885.jpg"
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
                <div className="grid w-full justify-items-end">
                  <p>78 €</p>
                  <NavLink to="/hoteldetail">
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
          <a class="mb-4 flex h-72 w-full rounded-lg bg-white">
            <img
              class="h-full w-96 rounded-l-lg object-cover"
              src="https://aquashowpark.com/wp-content/uploads/2022/03/Hotelae%CC%81rio-65-e1646846021885.jpg"
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
                <div className="grid w-full justify-items-end">
                  <p>78 €</p>
                  <NavLink to="/hoteldetail">
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
          <a class="mb-4 flex h-72 w-full rounded-lg bg-white">
            <img
              class="h-full w-96 rounded-l-lg object-cover"
              src="https://aquashowpark.com/wp-content/uploads/2022/03/Hotelae%CC%81rio-65-e1646846021885.jpg"
              alt=""
            />
            <div className="flex h-full w-full flex-col p-4">
              <div>
                <h5 class="mb-3 text-2xl font-bold text-gray-900">
                  CASA DA AVÓ ZIRINHA
                </h5>
                <p>Motel</p>
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
                <div className="grid w-full justify-items-end">
                  <p>78 €</p>
                  <NavLink to="/hoteldetail">
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
      </div>
    </>
  );
}
{
  /* // cidade // Datas // quantidade pessoas // preco // estrelas // tipo de
      alojamento // categoria do quarto */
}
