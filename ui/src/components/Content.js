import { useState, useRef, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { geocodeAPIKEY } from "../backend/components/Hotel";
import Geocode from "react-geocode";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar, DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";
import { data } from "autoprefixer";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import {
  ChevronLeftIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  UsersIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { getHotelCategory } from "../shared/hotel_categoryApi";
import Loader from "../Loader";
import Hotel_Category from "./Hotel_Category";
import Destaques from "./Destaques";
import Search from "./Search";

export default function Content(props) {
  const [selectedLocation, setSelectedLocation] = props.selectedLocation;
  const [quantityOptions, setQuantityOptions] = props.quantityOptions;
  const [date, setDate] = props.date;
  const [loading, setloading] = useState(true);
  const [query, setQuery] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [hotel, setHotel] = useState(props.hotel);
  const [hotelCategory, setHotelCategory] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [openQuantityOptions, setOpenQuantityOptions] = useState(false);
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

  const filteredLocation =
    query === ""
      ? locationList
      : locationList.filter((loc) => {
          return loc.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    getHotelCategory().then((res) => {
      setHotelCategory(res);
    });
  }, []);

  useEffect(() => {
    if (hotel.length > 0 && hotelCategory.length > 0) {
      console.log(hotel);
      setloading(false);
    }
  }, [hotel, hotelCategory]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className=" bg-black/10">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="inset-x-0 top-0 mt-64">
            <div className="mb-10 snap-start text-center text-5xl text-white">
              <h1>Descubra o seu próximo Hotel!</h1>
            </div>
            <form className="flex justify-center">
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
                  className="block w-56 rounded border-none pl-10 outline outline-1 outline-black focus:ring-orange-500 "
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
              <button
                type="button"
                className={`mx-0.5 flex h-10 flex-row rounded bg-white px-4 py-2 align-middle text-gray-500  hover:cursor-pointer ${
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
                  className="absolute top-36 z-40 mr-5 -mt-3.5 rounded-md border border-gray-600 p-2 outline-red-500"
                />
              )}
              <button
                className={`flex h-10 rounded bg-white py-2 px-8 align-middle text-gray-500 hover:cursor-pointer ${
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
                <div className="absolute top-32 left-2/4 ml-24 mt-0.5 w-60 rounded bg-white p-2">
                  <div className="m-2 flex  justify-between">
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

              <div>
                <NavLink to="/search">
                  <MagnifyingGlassIcon className="ml-2 h-11 w-11 rounded-full bg-orange-500 stroke-white p-2 hover:cursor-pointer hover:bg-orange-600" />
                </NavLink>
              </div>
            </form>
          </div>

          <div
            className={`${
              isVisible
                ? "opacity-100 transition-opacity duration-500"
                : "opacity-0 transition-opacity duration-500"
            } mt-44`}
          >
            <Destaques hotel_list={hotel} />

            <Hotel_Category
              hotel_category={[hotelCategory, setHotelCategory]}
            />
            <p className="mb-5 mt-28 w-full text-right text-4xl font-bold text-white">
              Vem à descoberta
            </p>
            <div className="flex flex-row">
              <div class=" h-96 w-full bg-white p-12 text-center">
                <p class="text-sm font-semibold uppercase tracking-widest">
                  Run with the pack
                </p>

                <h2 class="mt-6 font-black uppercase">
                  <span class="text-5xl font-black sm:text-6xl">
                    Até 30% de desconto
                  </span>
                  <span class="mt-2 block text-sm">Em alojamentos WTF</span>
                </h2>

                <a
                  class="mt-8 inline-block w-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white"
                  href=""
                >
                  Ver Promoções
                </a>

                <p class="mt-12 text-xs font-medium uppercase text-gray-400">
                  Offer valid until 24th March, 2021 *
                </p>
              </div>

              <div class=" ml-10 w-full  overflow-hidden rounded-lg bg-white shadow">
                <ul class="divide-y divide-gray-300 py-2 px-4">
                  <li class="flex py-4 hover:cursor-pointer">
                    <div class="mr-4 flex-1">
                      <h4 class="text-lg font-medium text-gray-900">Viseu</h4>
                      <div class="mt-1 text-sm text-gray-400">
                        <p className="text-gray-700">a 0Km de si</p>
                        <br />
                        <p>1 000 alojamentos</p>
                        <p>Preço Médio - 57€</p>
                      </div>
                    </div>
                    <div>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/S%C3%A9_de_Viseu_%282%29_%28cropped%29.jpg/1200px-S%C3%A9_de_Viseu_%282%29_%28cropped%29.jpg"
                        class="h-40 w-80 rounded-lg object-cover"
                        alt=""
                      />
                    </div>
                  </li>
                  <li class="flex py-4 hover:cursor-pointer">
                    <div class="mr-4 flex-1">
                      <h4 class="text-lg font-medium text-gray-900">Braga</h4>
                      <div class="mt-1 text-sm text-gray-400">
                        <p className="text-gray-700">a 0Km de si</p>
                        <br />
                        <p>1 000 alojamentos</p>
                        <p>Preço Médio - 57€</p>
                      </div>
                    </div>
                    <div>
                      <img
                        src="https://www.bloom-consulting.com/journal/wp-content/uploads/2020/01/bloom_consulting_braga-the-city-brand-that-brings-history-to-the-future.jpg"
                        class="h-40 w-80 rounded-lg object-cover"
                        alt=""
                      />
                    </div>
                  </li>
                  <li class="flex py-4 hover:cursor-pointer">
                    <div class="mr-4 flex-1">
                      <h4 class="text-lg font-medium text-gray-900">
                        Lado Nenhum
                      </h4>
                      <div class="mt-1 text-sm text-gray-400">
                        <p className="text-gray-700">a 0Km de si</p>
                        <br />
                        <p>1 000 alojamentos</p>
                        <p>Preço Médio - 57€</p>
                      </div>
                    </div>
                    <div>
                      <img
                        src="https://www.bloom-consulting.com/journal/wp-content/uploads/2020/01/bloom_consulting_braga-the-city-brand-that-brings-history-to-the-future.jpg"
                        class="h-40 w-80 rounded-lg object-cover"
                        alt=""
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
