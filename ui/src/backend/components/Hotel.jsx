import Loader from "../../Loader";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { deleteHotel } from "../../shared/hotelApi";
import { getHotelCategory } from "../../shared/hotel_categoryApi";
import locationList from "../../shared/locationList";

export default function Hotel(props) {
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState([]);
  const [filt, setFilt] = useState("");
  const [hotelType, setHotelType] = useState([]);
  useEffect(() => {
    setHotel(props.hotel);
    getHotelCategory().then((data) => {
      setHotelType(data);
    });
  }, [props.hotel]);

  useEffect(() => {
    if (hotel.length !== 0 && hotelType.length !== 0) {
      setLoading(false);
    }
  }, [hotel, hotelType]);

  const removeHotel = (id) => {
    deleteHotel(id).then(() => {
      setHotel(hotel.filter((hotel) => hotel._id !== id));
    });
  };

  function search(rows) {
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(filt.toLowerCase()) > -1
    );
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        <Loader className="w-screen" />
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
              <input
                type="text"
                id="search-table "
                name="search-table"
                className="block w-full rounded-md  border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Procurar"
                value={filt}
                onChange={(e) => setFilt(e.target.value)}
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
                  Localiza????o
                </th>
                <th className="px-6 py-3" scope="col">
                  Categoria
                </th>
                <th className="px-6 py-3" scope="col">
                  A????es
                </th>
              </tr>
            </thead>
            <tbody className="border-b bg-white">
              {search(hotel).length !== 0 ? (
                search(hotel).map((hotel) => (
                  <tr key={hotel._id}>
                    <td className="w-32 p-4">
                      <img
                        src={`https://wtf-backend.onrender.com/images/${hotel.images.find(
                          (image) => image !== ""
                        )}`}
                        alt=""
                        className="w-full"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                      {hotel.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {`${hotel.location}, ${
                        locationList.find((element) =>
                          element.concelho.includes(hotel.location)
                        )?.distrito
                      }
                      `}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {hotelType.map((hotelType) =>
                        hotelType._id === hotel._hotel_type
                          ? hotelType.name
                          : ""
                      )}
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
                ))
              ) : (
                <tr key="err">
                  <td
                    className="whitespace-nowrap px-6 py-4 text-center"
                    colSpan="10"
                  >
                    N??o existem quartos com esses par??metros...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
