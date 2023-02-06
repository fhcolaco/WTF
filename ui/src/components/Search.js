import { Combobox } from "@headlessui/react";
import {
  StarIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyEuroIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotel } from "../shared/hotelApi";
import { getHotelCategory } from "../shared/hotel_categoryApi";
import Loader from "../Loader";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

export default function Search(props) {
  const [selectedLocation, setSelectedLocation] = props.selectedLocation;
  const [quantityOptions, setQuantityOptions] = props.quantityOptions;
  const [date, setDate] = props.date;
  const [query, setQuery] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [hotelSearch, setHotelSearch] = useState([0, 1]);
  const [hotel, setHotel] = useState([]);
  const [hotelCategory, setHotelCategory] = useState([]);
  const [loading, setloading] = useState(true);
  const [openQuantityOptions, setOpenQuantityOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const filteredLocation =
    query === ""
      ? locationList
      : locationList.filter((loc) => {
          return loc.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    getHotel().then((res) => {
      setHotel(res);
    });

    getHotelCategory().then((res) => {
      setHotelCategory(res);
    });
  }, []);

  useEffect(() => {
    if (hotel.length !== 0 && hotelCategory.length !== 0) {
      setloading(false);
    }
  }, [hotel, hotelCategory]);

  const handleQuantityOption = (item, operacao) => {
    setQuantityOptions((prev) => {
      return {
        ...prev,
        [item]:
          operacao === "mais"
            ? quantityOptions[item] + 1
            : quantityOptions[item] - 1,
      };
    });
  };

  return (
    <>
      {loading ? (
        <div className=" bg-black/10">
          <Loader />
        </div>
      ) : (
        <div className="flex">
          <div className=" mr-6 h-full w-4/12 rounded-lg border border-gray-300 bg-white p-4">
            <p className="text-2xl font-bold">Filtros</p>
            <form className="mt-6">
              <h6 className="mb-0.5">Destino</h6>
              <Combobox
                as="div"
                onChange={setSelectedLocation}
                className="relative"
                onClick={() => setOpenDate(false)}
              >
                <div className="absolute inset-y-0 left-0 mb-1 flex items-center pl-3">
                  <MapPinIcon className="h-6 w-6 text-gray-500" />
                </div>
                <Combobox.Input
                  id="city"
                  name="city"
                  onChange={(event) => setQuery(event.target.value)}
                  className="block w-72 rounded border-none pl-10 outline outline-1 outline-black focus:ring-orange-500 "
                  placeholder={"cidade"}
                ></Combobox.Input>
                <Combobox.Options className="absolute mt-1 w-56 rounded bg-white">
                  {filteredLocation.map((location, index) => (
                    <Combobox.Option
                      key={index}
                      value={location}
                      className="pl-4 hover:rounded hover:bg-blue-100"
                    >
                      {location}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
              <h6 className="mt-3 mb-0.5">Check-in/Check-out</h6>
              <button
                type="button"
                className={` flex h-10 w-72 flex-row rounded bg-white py-2 pl-4 align-middle text-gray-500  hover:cursor-pointer ${
                  openDate
                    ? "ring-1 ring-orange-500"
                    : "outline outline-1 outline-black"
                }`}
                onClick={() => setOpenDate(!openDate)}
              >
                <CalendarIcon className="mr-2 h-6 w-6" />
                {`${format(date[0].startDate, "dd/MM/yyyy")} até ${format(
                  date[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </button>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  className="absolute top-56 z-40 mr-5 -mt-1.5 rounded-md border border-gray-300 p-2 shadow-md"
                />
              )}
              <h6 className="mt-3 mb-0.5">Hóspedes/Quartos</h6>
              <button
                className={`flex h-10 w-72 rounded bg-white py-2 pl-4 align-middle text-gray-500 hover:cursor-pointer ${
                  openQuantityOptions
                    ? "ring-1 ring-orange-500"
                    : "outline outline-1 outline-black"
                }`}
                type="button"
                onClick={() => setOpenQuantityOptions(!openQuantityOptions)}
              >
                <UsersIcon className="mr-2 h-5 w-5" />
                {quantityOptions.pessoas} Pessoas {quantityOptions.quartos}{" "}
                Quartos
              </button>
              {openQuantityOptions && (
                <div className="absolute top-72 mt-2 w-72 rounded border border-gray-300 bg-white p-2 shadow-md">
                  <div className="m-2 flex justify-between">
                    <p>Pessoas</p>
                    <div className="flex items-center gap-5">
                      <button
                        className="h-6 w-6 border border-black hover:border-orange-500"
                        type="button"
                        onClick={() => handleQuantityOption("pessoas", "menos")}
                      >
                        -
                      </button>
                      <span>{quantityOptions.pessoas}</span>
                      <button
                        className="h-6 w-6 border border-black hover:border-orange-500"
                        type="button"
                        onClick={() => handleQuantityOption("pessoas", "mais")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="m-2 flex justify-between">
                    <p>Quartos</p>
                    <div className="flex items-center gap-5">
                      <button
                        className="h-6 w-6 border border-black hover:border-orange-500"
                        type="button"
                        onClick={() => handleQuantityOption("quartos", "menos")}
                      >
                        -
                      </button>
                      <span>{quantityOptions.quartos}</span>
                      <button
                        className="h-6 w-6 border border-black hover:border-orange-500"
                        type="button"
                        onClick={() => handleQuantityOption("quartos", "mais")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <hr class="col-span-6 mt-8 mb-4 h-px border-0 bg-gray-300" />
              <div>
                <h6>Preço (por noite)</h6>
                <div className="flex">
                  <select className="mr-1 w-full rounded">
                    <option value="" disabled selected hidden>
                      <p>MIN</p>
                    </option>
                    <option>50</option>
                    <option>100</option>
                    <option>150</option>
                  </select>
                  <select className="ml-1 w-full rounded">
                    <option value="" disabled selected hidden>
                      <p>MAX</p>
                    </option>
                    <option>50</option>
                    <option>100</option>
                    <option>150</option>
                  </select>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Filtrar
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex-col">
            {hotelSearch.map((index) => {
              return (
                <a class="mb-4 flex h-72 w-full rounded-lg bg-white">
                  <img
                    class="h-full w-96 rounded-l-lg object-cover"
                    src="https://aquashowpark.com/wp-content/uploads/2022/03/Hotelae%CC%81rio-65-e1646846021885.jpg"
                    alt=""
                  />
                  <div className="grid w-full flex-col p-4">
                    <div>
                      <h5 class="mb-3 text-2xl font-bold text-gray-900">
                        {hotel[index].name}
                      </h5>
                      {hotelCategory.map((category) => {
                        // console.log(category.name, category);
                        if (hotel[index]._hotel_type.includes(category._id))
                          return <p>{category.name} - Location</p>;
                      })}
                      <div className="flex">
                        <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                        <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                        <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                        <StarIcon className="stroke h-6 w-6 fill-yellow-300 stroke-none" />
                      </div>
                    </div>
                    <p className="h-12 overflow-hidden text-clip">
                      {hotel[index].description}
                    </p>
                    (...)
                    <div className="inset-0 flex items-end">
                      <div class="flex w-full items-center">
                        <span class=" rounded-lg bg-gray-800 p-4">
                          <p className="h-6 w-6 text-center text-white">8,9</p>
                        </span>
                        <h2 class="ml-4 text-lg font-bold">demo evaluation</h2>
                      </div>
                      <div className="grid w-full justify-items-end">
                        <p>demo price €</p>
                        <NavLink to={`/hoteldetail/${hotel[index]._id}`}>
                          <button
                            type="button"
                            class="rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-bl"
                          >
                            Ver Oferta
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

{
  /* // cidade // Datas // quantidade pessoas // preco // estrelas // tipo de
      alojamento // categoria do quarto */
}
