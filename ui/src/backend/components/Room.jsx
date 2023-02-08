import Loader from "../../Loader";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { deleteRoom } from "../../shared/roomApi";
import { getHotel } from "../../shared/hotelApi";
import { getRoomCategory } from "../../shared/room_categoryApi";

export default function Room(props) {
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState([]);
  const [room, setRoom] = useState([]);
  const [roomCategory, setRoomCategory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRoom(props.room);
    getHotel().then((res) => {
      setHotel(res);
    });
    getRoomCategory().then((res) => {
      setRoomCategory(res);
    });
  }, []);

  useEffect(() => {
    if (room.length !== 0 && hotel.length !== 0 && roomCategory.length !== 0) {
      setLoading(false);
    }
  }, [room, hotel, roomCategory]);

  function removeRoom(id) {
    deleteRoom(id).then((res) => {
      if (res.status === 200) {
        setRoom(room.filter((room) => room.id !== id));
      }
    });
  }

  function filt(rows) {
    return rows.filter((row) => {
      return hotel.some((hotel) => {
        return (
          hotel._id === row._hotel &&
          hotel.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {loading ? (
        <Loader />
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
                className="bg-wblock block w-full rounded-md  border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Procurar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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
                <th className="px-6 py-4" scope="col">
                  Hotel
                </th>
                <th className="px-6 py-4" scope="col">
                  Categoria do quarto
                </th>
                <th className="px-6 py-4" scope="col">
                  Disponibilidade
                </th>
                <th className="px-6 py-4" scope="col">
                  Desconto
                </th>
                <th className="px-6 py-4" scope="col">
                  Preço/Noite
                </th>
                <th className="px-6 py-4" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filt(room) !== undefined && filt(room).length !== 0 ? (
                filt(room).map((room) => (
                  <tr key={room._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <img
                        className="h-24 w-full object-cover"
                        src={`https://wtf-backend.onrender.com/images/${room.images[0]}`}
                        alt=""
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {hotel.map((hotel) => {
                        if (hotel._id === room._hotel) {
                          return hotel.name;
                        }
                      })}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {roomCategory
                        .filter(
                          (roomCategory) =>
                            roomCategory.id === room.room_category_id
                        )
                        .map((roomCategory) => roomCategory.name)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {room.isAvailable ? "Sim" : "Não"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {room.discount !== 0 ? room.discount + "%" : "Não"}
                    </td>
                    <td className="  whitespace-nowrap px-6 py-4">
                      {room.discount !== 0 ? (
                        <p className="text-red-500 line-through">
                          {room.price} €
                        </p>
                      ) : (
                        ""
                      )}
                      {`${room.price - (room.price * room.discount) / 100} €`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-baseline space-x-4 text-sm">
                        <Link to={`${room._id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                        </Link>
                        <TrashIcon
                          className="h-5 w-5 text-indigo-600 hover:text-indigo-900"
                          onClick={() => removeRoom(room._id)}
                        />
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
                    Não existem quartos com esses parâmetros...
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
