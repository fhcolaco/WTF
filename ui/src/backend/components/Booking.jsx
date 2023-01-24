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
import { format } from "date-fns";

export default function Booking(props) {
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState([]);
  const [countRoomBooking, setCountRoomBooking] = useState([]);

  useEffect(() => {
    getBookings().then((res) => {
      setBooking(res);
    });
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  useEffect(() => {
    if (booking.length !== 0) {
      let count = {};
      let exist = false;
      let id = "";
      booking.map((book) => {
        exist = false;
        count = {};
        book._room.map((r) => {
          getRoomById(r).then((room) => {
            getRoomCategoryById(room._room_category).then((roomCategory) => {
              count[roomCategory.name] = count[roomCategory.name]
                ? count[roomCategory.name] + 1
                : 1;
            });
          });
          id = book._id;
          for (const element of countRoomBooking) {
            if (element[id]) {
              exist = true;
            }
          }
          if (!exist) {
            setCountRoomBooking((element) => [...element, { [id]: count }]);
          }
        });
      });
    }
  }, [booking]);

  useEffect(() => {
    setHotel(props.hotel);
  }, [props.hotel]);

  useEffect(() => {
    if (
      booking.length !== 0 &&
      hotel.length !== 0 &&
      users.length !== 0 &&
      countRoomBooking.length === booking.length &&
      countRoomBooking.length !== 0
    ) {
      setLoading(false);
    } else {
      console.log(countRoomBooking.length === booking.length);
      console.log(booking.length);
      console.log(countRoomBooking);
    }
  }, [booking, countRoomBooking, hotel, users]);

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
                .map((book) => (
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
                      {countRoomBooking.map((index) =>
                        Object.keys(index).map((key) =>
                          key === book._id
                            ? Object.keys(index[key]).map(
                                (room) => `${room} ${index[key][room]}x`
                              )
                            : null
                        )
                      )}
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
