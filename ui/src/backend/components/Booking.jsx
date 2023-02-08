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
import { Combobox } from "@headlessui/react";
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
    setBooking(props.booking);
  }, [props.booking]);

  useEffect(() => {
    setHotel(props.hotel);
  }, [props.hotel]);

  useEffect(() => {
    setUsers(props.users);
  }, [props.users]);

  useEffect(() => {
    if (
      booking.length !== [] &&
      Object.keys(countRoom).length !== booking.length
    ) {
      let aux = [];
      booking.map((book) => {
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
        });
        let id = book._id;
        aux = [...aux, { room: id, count: count }];
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
      countRoom.length === booking.length
    ) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [booking, countRoom, hotel, loading, users]);

  const filt = (rows) => {
    return rows.filter(
      (row) => row.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const deleteBooking = (id) => {
    deleteBooking(id).then((res) => {
      if (res.status === 200) {
        setBooking(booking.filter((book) => book._id !== id));
      }
    });
  };

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
                value={
                  search.length < selected.length
                    ? hotel.find((hotel) => hotel._id === selected)?.name
                    : search
                }
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
                onClick={() => {
                  setSelected("");
                  setSearch("");
                }}
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
                  console.log(book);
                  return book._hotel === selected || selected === "";
                })
                .map((book, index) => (
                  <tr key={book._id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      {hotel.find((hotel) => hotel._id === book._hotel)?.name ||
                        "..."}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {users.map((user) =>
                        user._id === book._user ? user.name : ""
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {`${
                        countRoom?.find((cnt) => cnt.room === book._id)
                          ?.count[0][1]
                      }x ${
                        countRoom?.find((cnt) => cnt.room === book._id)
                          ?.count[0][0]
                      }`}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {new Date(book.start_date).toLocaleDateString("pt-PT")} -{" "}
                      {new Date(book.end_date).toLocaleDateString("pt-PT")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {book.total_price}€
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {book.is_cancelled ? (
                        <span class="mr-2 rounded border border-red-400 bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-gray-700 dark:text-red-400">
                          Cancelado
                        </span>
                      ) : book.is_paid ? (
                        <span class="mr-2 rounded border border-green-400 bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-gray-700 dark:text-green-400">
                          Confirmado
                        </span>
                      ) : (
                        <span class="mr-2 rounded border border-yellow-300 bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-gray-700 dark:text-yellow-300">
                          Pendente
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-baseline space-x-4 text-sm">
                        <a
                          className="text-indigo-600 hover:text-indigo-900"
                          href={`tel:${
                            users.find((usr) => book._user === usr._id)
                              ?.phone || "911234567"
                          }`}
                        >
                          <PhoneIcon className="h-5 w-5" />
                        </a>
                        <a
                          className="text-indigo-600 hover:text-indigo-900"
                          href={`mailto:${
                            users.find((usr) => book._user === usr._id).email ||
                            "example@wtf.dev"
                          }`}
                        >
                          <EnvelopeIcon className="h-5 w-5" />
                        </a>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-baseline space-x-4 text-sm">
                        <Link to={`${book._id}`}>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                        </Link>
                        <button
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => deleteBooking(book._id)}
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
