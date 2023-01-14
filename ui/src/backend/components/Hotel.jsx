import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { deleteHotel } from "../../shared/hotelApi";
import Geocode from "react-geocode";

export default function Hotel(props) {
  const [loading, setLoading] = useState(true);
  const loader = props.loader;
  const [hotel, setHotel] = props.hotel;
  const [location, setLocation] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      hotel.map((hotel) => {
        setLocation([]);
        Geocode.setApiKey("AIzaSyCuUAUZGSEYbCM6KbC-0LSB7e0AMV8_Rzg");
        Geocode.setLanguage("pt");
        Geocode.setRegion("pt");
        let [lat, lng] = hotel.location.split(", ");
        Geocode.fromLatLng(lat, lng).then(
          (response) => {
            const city =
              response.results[0].address_components[2].long_name +
              ", " +
              response.results[0].address_components[4].long_name;
            setLocation((location) => [
              ...location,
              { hotelID: hotel._id, city: city },
            ]);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    }, 1000);
  }, [hotel]);

  useEffect(() => {
    if (location.length === hotel.length) {
      setLoading(false);
    }
  }, [location]);

  const removeHotel = (id) => {
    deleteHotel(id).then((data) => {
      setHotel(hotel.filter((hotel) => hotel._id !== id));
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        loader()
      ) : (
        <>
          <div className=" flex items-baseline bg-white pb-4">
            <label htmlFor="table-search" className="sr-only">
              Procurar
            </label>
            <div className="relative mx-2 mt-1 flex-1">
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
            <div className="relative mx-2 mt-1 flex flex-1 justify-end">
              <Link to="criar">
                <button className="rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700">
                  Criar
                </button>
              </Link>
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
                  <td className="whitespace-nowrap px-6 py-4">
                    {location.map((location) =>
                      location.hotelID === hotel._id ? location.city : ""
                    )}
                  </td>
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
                        onClick={() => removeHotel(hotel._id)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
