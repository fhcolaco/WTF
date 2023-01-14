import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteHotel, getHotel } from "../../shared/hotelApi";
import { Link } from "react-router-dom";

export default function Hotel() {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    getHotel().then((data) => {
      console.log(data);
      setHotel(data);
    });
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="bg-white pb-4 dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Procurar
        </label>
        <div className="relative mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          {/* COLOCAR AQUI O AJAX PARA MUDAR A LISTA ENQUANTO PROCURA - NÂO ESQUECER A PAGINAÇÃO */}
          <input
            type="text"
            id="serach-table "
            name="serach-table"
            className="bg-wblock block w-full rounded-md  border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
            placeholder="Procurar"
          />
        </div>
      </div>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th className="px-6 py-3" scope="col">
              <span className="sr-only">Imagem</span>
            </th>
            <th className="px-6 py-3" scope="col">
              Nome
            </th>
            <th className="px-6 py-3" scope="col">
              Localização
            </th>
            <th className="px-6 py-3" scope="col">
              Categoria
            </th>
            <th className="px-6 py-3" scope="col">
              Acções
            </th>
          </tr>
        </thead>
        <tbody>
          {hotel.map((hotel) => (
            <tr key={hotel._id} className="border-b bg-white">
              <td className="w-32 p-4">
                <img src={hotel.images[0]} alt="" className="w-full" />
              </td>
              <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {hotel.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">{hotel.location}</td>
              <td className="whitespace-nowrap px-6 py-4">
                {hotel._hotel_type}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-baseline space-x-4 text-sm">
                  <Link to={`${hotel._id}`}>
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  </Link>
                  <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => deleteHotel(hotel._id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
