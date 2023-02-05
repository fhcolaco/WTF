import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import {
  MapPinIcon,
  ShoppingCartIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelById } from "../shared/hotelApi";
import { getHotelCategory } from "../shared/hotel_categoryApi";
import Loader from "../Loader";

export default function Hotel_Detail() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const params = useParams();
  const [hotel, setHotel] = useState([]);
  const [hotelCategory, setHotelCategory] = useState([]);

  useEffect(() => {
    getHotelById(params.id).then((res) => {
      setHotel(res);
    });

    getHotelCategory().then((res) => {
      setHotelCategory(res);
    });
  }, [params.id]);

  useEffect(() => {
    if (hotel.length !== 0 && hotelCategory.length !== 0) {
      setloading(false);
    }
  }, [hotel, hotelCategory]);

  return (
    <>
      {loading ? (
        <div className=" bg-black/10">
          <Loader />
        </div>
      ) : (
        <div className="w-full rounded-lg bg-white">
          <div className="absolute inset-y-0 right-0 m-10 ">
            <button onClick={() => navigate(-1)}>
              <XMarkIcon className="h-6 w-6"></XMarkIcon>
            </button>
          </div>
          <div class=" flex w-full flex-row rounded-lg bg-white">
            <img
              class="h-full w-6/12 rounded-lg p-4"
              src="https://rhotelgeelong.com.au/wp-content/uploads/2021/03/R-Hotel-Geelong-Hotel-Room-11.jpg"
              alt=""
            />
            <div className="flex flex-col p-4">
              <div>
                <h5 class="mb-3 text-2xl font-bold text-gray-900">
                  {hotel.name}
                </h5>

                {hotelCategory.map((category) => {
                  console.log(category.name, category);
                  if (hotel._hotel_type.includes(category._id))
                    return <p>{category.name}</p>;
                })}

                <div className="flex">
                  <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                  <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                  <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                  <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                </div>
                <div className="mt-3 flex">
                  <MapPinIcon className="h-5 w-5 text-gray-700" />
                  Rua, 1234-567 Cidade, País
                </div>
              </div>

              <div className="mt-5">{hotel.description}</div>
              <div>
                <h5 class="mt-6 text-2xl font-bold text-gray-900">Serviços</h5>
                <li>Service demo 1</li>
                <li>Service demo 2</li>
              </div>
            </div>
          </div>
          <div className="relative rounded-l p-4">
            <div className="rounded-lg border border-gray-300 p-4">
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
              <div className="flex w-full justify-end">
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
          {/* <hr class="col-span-6 mx-8 mt-8 mb-8 h-px  border-0 bg-gray-300" /> */}
          <p class="ml-4 text-2xl font-bold">Avaliação dos nossos clientes</p>
          <div className="inset-0 flex items-end p-5">
            <div className="flex w-full items-center">
              <span className=" rounded-lg bg-gray-800 p-4">
                <p className="aspect-square items-center text-center text-5xl text-white">
                  9,5
                </p>
              </span>
              <h2 class="ml-4 text-2xl font-bold">Muito Bom</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// src =
//   "https://classic-motel.com/wp-content/uploads/2021/04/014-Classic-Motel-1.jpg";
// src = "https://aff.bstatic.com/images/hotel/840x460/353/353970913.jpg";
// src =
//   "https://media-cdn.tripadvisor.com/media/photo-s/21/5b/78/6e/unico-motel-faria-lima.jpg";
