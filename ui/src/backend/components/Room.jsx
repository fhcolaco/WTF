import Loader from "../../Loader";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { getRoom } from "../../shared/roomApi";
import Geocode from "react-geocode";
import { geocodeAPIKEY } from "./Hotel";
import { getRoomCategory } from "../../shared/room_categoryApi";

export default function Room(props) {
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [location, setLocation] = useState([]);
  const [filt, setFilt] = useState("");
  const [roomType, setRoomType] = useState([]);

  //use effect para obter os dados da API
  useEffect(() => {
    getRoom().then((res) => {
      setRoom(res);
    });
    getRoomCategory().then((res) => {
      setRoomType(res);
    });
    setHotel(props.hotel);
    hotel.map((hotel) => {
      geocodeAPIKEY();
      setLocation([]);
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
  }, [props.hotel, hotel]);

  useEffect(() => {
    if (
      hotel.length === location.length &&
      room.length === hotel.length &&
      roomType.length !== 0 &&
      location.length !== 0
    ) {
      setLoading(false);
    }
  }, [hotel, location, room, roomType]);

  const removeRoom = (id) => {
    const newRoom = room.filter((room) => room._id !== id);
    setRoom(newRoom);
  };

  function search(rows) {
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(filt.toLowerCase()) > -1
    );
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
                  Localização
                </th>
                <th className="px-6 py-3" scope="col">
                  Tipo de quarto
                </th>
                <th className="px-6 py-3" scope="col">
                  Hotel
                </th>
                <th className="px-6 py-3" scope="col">
                  Disponibilidade
                </th>
                <th className="px-6 py-3" scope="col">
                  Acções
                </th>
              </tr>
            </thead>
            <tbody>
              {search(room).map((hotel) => (
                <tr key={room._id} className="border-b bg-white">
                  <td className="w-32 p-4">
                    <img
                      src={`http://localhost:4000/images/${room.images[0]}`}
                      alt=""
                      className="w-full"
                    />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                    {room.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {location.map((location) =>
                      location.hotelID === hotel._id ? location.city : ""
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {roomType.map((roomType) =>
                      roomType._id === room._room_type ? roomType.name : ""
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-baseline space-x-4 text-sm">
                      <Link to={`${room._id}`}>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                      </Link>
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => removeRoom(room._id)}
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
