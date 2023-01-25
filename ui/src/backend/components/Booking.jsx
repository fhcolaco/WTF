import Loader from "../../Loader";
import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { getBookings } from "../../shared/bookingApi";
import { Combobox } from "@headlessui/react";
import { getUsers } from "../../shared/userApi";
import { getRoomById } from "../../shared/roomApi";
import { getRoomCategoryById } from "../../shared/room_categoryApi";

export default function Booking(props) {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState([]);
  const [countRoom, setCountRoom] = useState({});

  useEffect(() => {
    getBookings().then((res) => {
      setBooking(res);
    });
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    if (
      booking.length !== [] &&
      Object.keys(countRoom).length !== booking.length
    ) {
      let aux = {};
      booking.map((book) => {
        let exist = false;
        let count = [];
        book._room.map((r) => {
          getRoomById(r).then((room) => {
            getRoomCategoryById(room._room_category).then((roomCategory) => {
              if (!count.includes(roomCategory.name))
                count.push([roomCategory.name, 1]);
              else
                count[
                  count.findIndex((x) => x[0] === roomCategory.name)
                ][1] += 1;
            });
          });
          let id = book._id;
          console.log(countRoom);
          console.log(id);
          console.log(count);
          if (!countRoom[id] === undefined) {
            console.log("existe");
            exist = true;
          } else {
            console.log("n existe");
            exist = false;
          }
          if (!exist) {
            aux[id] = count;
          }
        });
      });
      setCountRoom(aux);
    }
  }, [booking]);

  useEffect(() => {
    setHotel(props.hotel);
  }, [props.hotel]);

  useEffect(() => {
    if (
      loading &&
      booking.length !== 0 &&
      hotel.length !== 0 &&
      users.length !== 0 &&
      Object.keys(countRoom).length === booking.length &&
      Object.keys(countRoom).length !== 0
    ) {
      setLoading(false);
    } else {
      console.log(Object.keys(countRoom).length);
    }
  }, [booking, countRoom, hotel, users]);

  const filt = (rows) => {
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

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
            <Combobox
              as="div"
              value={selected}
              onChange={setSelected}
              className="relative mx-2 mt-1 flex-1"
            >
              <Combobox.Button
                as="div"
                className="absolute inset-y-0 left-0 flex items-center pl-3"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </Combobox.Button>
              <Combobox.Input
                type="text"
                id="search-table "
                name="search-table"
                className="block w-full rounded-md  border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500"
                placeholder="Procurar"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Combobox.Options className="absolute z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filt(hotel)?.map((hotel) => (
                  <Combobox.Option
                    key={hotel._id}
                    value={hotel._id}
                    className={({ active }) =>
                      `${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }
                          relative cursor-default select-none py-2 pl-10 pr-4`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? "font-medium" : "font-normal"
                          } block truncate`}
                        >
                          {hotel.name}
                        </span>
                        {selected ? (
                          <span
                            className={`${
                              active ? "text-amber-600" : "text-green-600"
                            }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
              <button
                className={`absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 ${
                  selected === "" ? "hidden" : ""
                }`}
                onClick={() => setSelected("")}
              >
                <XMarkIcon className=" h-5 w-5 text-gray-400" />
              </button>
            </Combobox>
            <div className="relative mx-2 mt-1 flex flex-1 justify-end">
              <Link to="criar">
                <button className="rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700">
                  Criar
                </button>
              </Link>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-4" scope="col">
                  Nome do Hotel
                </th>
                <th className="px-6 py-4" scope="col">
                  Nome do Cliente
                </th>
                <th className="px-6 py-4" scope="col">
                  Quartos
                </th>
                <th className="px-6 py-4" scope="col">
                  Datas
                </th>
                <th className="px-6 py-4" scope="col">
                  Valor
                </th>
                <th className="px-6 py-4" scope="col">
                  Status
                </th>
                <th className="px-6 py-4" scope="col">
                  Contactos
                </th>
                <th className="px-6 py-4" scope="col">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {booking
                .filter((book) => {
                  return book._hotel === selected || selected === "";
                })
                .map((book, index) => (
                  <tr key={book._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {hotel.map((hotel) =>
                        hotel._id === book._hotel ? hotel.name : ""
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {users.map((user) =>
                        user._id === book._user ? user.name : ""
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {countRoom[book._id].map(
                        (room) => `${room[0]} - ${room[1]}x`
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(book.start_date).toLocaleDateString("pt-PT")} -{" "}
                      {new Date(book.end_date).toLocaleDateString("pt-PT")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {book.total_price}€
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
