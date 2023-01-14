import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Hotel() {
  const [hotel, setHotel] = useState([]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="bg-white pb-4 dark:bg-gray-900">
        <label for="table-search" className="sr-only">
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
            className="bg-wblock block w-full w-80 rounded-md rounded-lg border border border-gray-300 border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
            placeholder="Procurar"
          />
        </div>
      </div>
      <table class="w-full text-left text-sm text-gray-500">
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
        <tbody></tbody>
      </table>
    </div>
  );
}
