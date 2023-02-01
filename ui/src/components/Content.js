import { useState, useRef, useEffect } from "react";
import { Combobox } from "@headlessui/react";
import { geocodeAPIKEY } from "../backend/components/Hotel";
import Geocode from "react-geocode";
import { getHotel } from "../shared/hotelApi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar, DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";
import { data } from "autoprefixer";
import { NavLink } from "react-router-dom";
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

export default function Content() {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [loading, setloading] = useState(true);
  const [query, setQuery] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [hotel, setHotel] = useState({});
  const [hotelCategory, setHotelCategory] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openQuantityOptions, setOpenQuantityOptions] = useState(false);
  const [quantityOptions, setQuantityOptions] = useState({
    pessoas: 2,
    quartos: 1,
  });
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
  const [topHoteis, setTopHoteis] = useState([0, 1]);
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
    console.log("HOTEL");
    console.log(hotel);
    console.log("CATEGORY");
    console.log(hotelCategory);
  }, [hotel, hotelCategory]);

  useEffect(() => {
    if (hotel.length !== 0 && hotelCategory.length !== 0) {
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

  //-----------------------CARROSSEL--------------------

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  // const isDisabled = (direction) => {
  //   if (direction === "prev") {
  //     return currentIndex <= 0;
  //   }

  //   if (direction === "next" && carousel.current !== null) {
  //     return (
  //       carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
  //     );
  //   }

  //   return false;
  // };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <>
      {loading ? (
        <div className="bg-black/10">
          <Loader className=" relative h-screen w-screen" />
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
                  className="absolute top-36 z-10 mr-5"
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
            <p className="mb-5 mt-28 ml-6 w-full text-4xl font-bold text-white">
              Destaques
            </p>
            <div className=" flex flex-row justify-center rounded-lg py-6 ">
              {topHoteis.map((index) => {
                return (
                  <a
                    href="#"
                    className={`relative mx-2 block w-full overflow-hidden rounded-xl bg-[url(https://www.kayak.pt/rimg/himg/9f/e7/f6/arbisoftimages-59430-Facade-lower-image.jpg?width=1366&height=768&xhint=832&yhint=377&crop=true)] bg-cover bg-center bg-no-repeat`}
                  >
                    <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                      4.5
                      <StarIcon class="ml-1.5 h-4 w-4 fill-yellow-300 text-yellow-300" />
                    </span>
                    <div className="relative bg-black bg-opacity-40 p-8 pt-40 text-white hover:bg-opacity-10">
                      <h3 className="text-2xl font-bold">
                        {hotel[index].name}
                        {console.log("INDEX: ", index)}
                      </h3>
                      <p className="text-sm">Localização</p>
                    </div>
                  </a>
                );
              })}
              <a
                href="#"
                className={`relative mx-2 block w-full overflow-hidden rounded-xl bg-[url(https://www.rivierahotel.pt/media/riviera-hotel-carcavelos-bannerfachada22.jpg)] bg-cover bg-center bg-no-repeat`}
              >
                <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                  4.5
                  <StarIcon class="ml-1.5 h-4 w-4 fill-yellow-300 text-yellow-300" />
                </span>
                <div className="relative bg-black bg-opacity-40 p-8 pt-40 text-white hover:bg-opacity-10">
                  <h3 className="text-2xl font-bold">Demo Information</h3>
                  <p className="text-sm">Localização</p>
                </div>
              </a>
            </div>

            {/* -----------------------------CARROSSEL--------------------- */}

            <div className="carousel my-12 mx-auto">
              <p className="mb-5 mt-28 ml-6 w-full text-4xl font-bold text-white">
                Tipos de Alojamento
              </p>
              <div className="relative overflow-hidden">
                <div className="top left absolute flex h-full w-full justify-between">
                  <button
                    onClick={movePrev}
                    className="z-10 ml-2 h-full w-16 rounded-l-lg text-center text-white transition-all duration-300 ease-in-out hover:bg-white/25 hover:opacity-100"
                    // disabled={isDisabled("prev")}
                  >
                    <ChevronLeftIcon />
                    <span className="sr-only">Prev</span>
                  </button>
                  <button
                    onClick={moveNext}
                    className="z-10 mr-2 h-full w-16 rounded-r-lg p-0 text-center text-white transition-all duration-300 ease-in-out hover:bg-white/25 hover:opacity-100"
                    // disabled={isDisabled("next")}
                  >
                    <ChevronRightIcon />
                    <span className="sr-only">Next</span>
                  </button>
                </div>
                <div
                  ref={carousel}
                  className="carousel-container relative z-0 flex touch-pan-x snap-x snap-mandatory gap-1 overflow-hidden scroll-smooth"
                >
                  {hotelCategory.map((category, index) => {
                    return (
                      <div
                        key={index}
                        class="mx-2 w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/7/79/Ponta_Negra_Beach_Hotel.jpg"
                          class="aspect-video h-52 w-full object-cover"
                          alt=""
                        />
                        <div class="p-4">
                          <h3 class="text-xl font-medium text-gray-900">
                            {category.name}
                            {console.log("TESTE")}
                          </h3>
                          <p class="mt-1 text-gray-500">1 000 alojamentos</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* <p className="mb-5 mt-28 ml-6 w-full text-4xl font-bold text-white">
              Tipos de Alojamento
            </p>
            <div className=" flex flex-row justify-center rounded-lg py-6 ">
              {hotelCategory.map((category) => {
                return (
                  <div class="mx-2 w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/79/Ponta_Negra_Beach_Hotel.jpg"
                      class="aspect-video h-52 w-full object-cover"
                      alt=""
                    />
                    <div class="p-4">
                      <h3 class="text-xl font-medium text-gray-900">
                        {category.name}
                        {console.log("TESTE")}
                      </h3>

                      <p class="mt-1 text-gray-500">1 000 alojamentos</p>
                    </div>
                  </div>
                );
              })}
              <div class="mx-2 w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
                <img
                  src="https://img.freepik.com/premium-photo/image-planet-outer-space-mixed-media-elements-image-furnished-by-nasa_641298-3434.jpg?w=2000"
                  class="aspect-video h-52 w-full object-cover"
                  alt=""
                />
                <div class="p-4">
                  <h3 class="text-xl font-medium text-gray-900">
                    Demo Information
                  </h3>

                  <p class="mt-1 text-gray-500">Demo Information</p>
                </div>
              </div>
              <div class="mx-2 w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
                <img
                  src="https://www.momondo.pt/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true"
                  class="aspect-video h-52 w-full object-cover hover:cursor-pointer"
                  alt=""
                />
                <div class="p-4">
                  <h3 class="text-xl font-medium text-gray-900">
                    Demo Information
                  </h3>

                  <p class="mt-1 text-gray-500">Demo Information</p>
                </div>
              </div>
              <div class="mx-2 w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
                <img
                  src="https://pesweb.azureedge.net/spimg/hotelbannerimages/pestana-cr7-hotels/cr7-lisboa-building.jpg?scale=downscaleonly&encoder=freeimage&progressive=true&quality=50&w=1440&h=780&mode=crop&anchor=bottomcenter"
                  class="aspect-video h-52 w-full object-cover hover:cursor-pointer"
                  alt=""
                />
                <div class="p-4">
                  <h3 class="text-xl font-medium text-gray-900">
                    Demo Information
                  </h3>
                  <p class="mt-1 text-gray-500">Demo Information</p>
                </div>
              </div>
            </div> */}
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
