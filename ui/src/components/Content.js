import React, { useEffect } from "react";
import { useState } from "react";
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

export default function Content() {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [query, setQuery] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [placeId, setPlaceId] = useState([]);
  const city = "New York";
  const geocodeAPIKEY2 = "AIzaSyCuUAUZGSEYbCM6KbC-0LSB7e0AMV8_Rzg";
  const [imageUrl, setImageUrl] = useState(null);

  const getPlaceId = async (city) => {
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${geocodeAPIKEY2}`
      )
      .then((data) =>
        setPlaceId((place) => [...place, data.data.results[0].place_id])
      );
  };

  useEffect(() => {
    getPlaceId(city);
  }, []);

  useEffect(() => {
    if (placeId !== "" && placeId !== undefined) {
      placeId.map((place) => {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&key=${geocodeAPIKEY2}`,
            { headers: { "Access-Control-Allow-Origin": "*" } }
          )
          .then((response) => {
            console.log("response");
            console.log(response);
            const data = response;
            const photo_reference = data.results[0].photos[0].photo_reference;
            axios
              .get(
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${geocodeAPIKEY2}`,
                { headers: { "Access-Control-Allow-Origin": "*" } }
              )
              .then((response) => {
                const data = response;
                console.log(response);
                setImageUrl((image) => [...image, data.url]);
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      });
    }
  }, []);

  const filteredLocation =
    query === ""
      ? locationList
      : locationList.filter((loc) => {
          return loc.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    getHotel()
      .then((res) => {
        setHotel(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (hotel !== [])
      hotel.map((hot) => {
        if (hot.location !== undefined && hot.location !== "") {
          geocodeAPIKEY();
          Geocode.setLanguage("pt");
          Geocode.setRegion("pt");
          let [lat, lng] = hot.location.split(", ");
          let toAdd = "";
          Geocode.fromLatLng(lat, lng).then(
            (response) => {
              toAdd = response.results[0].address_components[2].long_name;
              if (!locationList.includes(toAdd))
                return setLocationList((prev) => [...prev, toAdd]);
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          console.log(2);
        }
      });
  }, [hotel]);

  useEffect(() => {
    console.log(city);
    console.log(placeId);
    console.log(imageUrl);
    console.log(data);
    // console.log(photo_reference);
  }, [placeId, imageUrl]);

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
      <div className="inset-x-0 top-0 mt-64 ">
        <div className="mb-10 snap-start text-center text-5xl text-white">
          <h1>Descubra o seu próximo Hotel!</h1>
        </div>
        <form className="flex flex-row justify-center">
          <Combobox as="div" onChange={setSelectedLocation}>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 w-56 rounded border-white px-4 outline outline-1 outline-black"
              placeholder={"cidade"}
            ></Combobox.Input>
            <Combobox.Options className="absolute w-56 rounded-b bg-white px-2">
              {filteredLocation.map((location, index) => (
                <Combobox.Option key={index} value={location}>
                  {location}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>

          <div
            className="mx-0.5 flex h-10 flex-row rounded bg-white px-4 py-2 align-middle text-gray-500 outline outline-1 outline-black hover:cursor-pointer"
            onClick={() => setOpenDate(!openDate)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2 h-6 w-6 stroke-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
            {`${format(date[0].startDate, "dd/MM/yyyy")} até ${format(
              date[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
              className="absolute top-36 z-10 mr-5"
            />
          )}
          <div className="flex h-10 rounded bg-white py-2 px-4 align-middle text-gray-500 outline outline-1 outline-black hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mr-2 h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            2 adultos 2 crianças 1 quarto
          </div>
          <div>
            <NavLink to="/search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="ml-2 h-11 w-11 rounded-full bg-orange-500 stroke-white p-2 hover:cursor-pointer hover:bg-orange-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </NavLink>
          </div>
        </form>
      </div>
      <div
        className={`${
          isVisible
            ? "opacity-100 transition-opacity duration-500"
            : "opacity-0 transition-opacity duration-500"
        } mt-64`}
      >
        <div className=" flex flex-row justify-center rounded-lg  py-6 px-4 ">
          <a
            href="#"
            class="relative mx-2 block w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat"
          >
            <span class="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              4.5
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-1.5 h-4 w-4 text-yellow-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>

            <div class="relative bg-black bg-opacity-40 p-8 pt-40 text-white">
              <h3 class="text-2xl font-bold">Rome</h3>

              <p class="text-sm">Italy</p>
            </div>
          </a>
          <a
            href="#"
            class="relative mx-2 block w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat"
          >
            <span class="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              4.5
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-1.5 h-4 w-4 text-yellow-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>

            <div class="relative bg-black bg-opacity-40 p-8 pt-40 text-white">
              <h3 class="text-2xl font-bold">Rome</h3>

              <p class="text-sm">Italy</p>
            </div>
          </a>
          <a
            href="#"
            class="relative mx-2 block w-full overflow-hidden rounded-xl bg-[url(https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1592&q=80)] bg-cover bg-center bg-no-repeat"
          >
            <span class="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
              4.5
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ml-1.5 h-4 w-4 text-yellow-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>

            <div class="relative bg-black bg-opacity-40 p-8 pt-40 text-white">
              <h3 class="text-2xl font-bold">Rome</h3>

              <p class="text-sm">Italy</p>
            </div>
          </a>
        </div>

        <p className="mb-5 mt-28 w-full text-center text-4xl font-bold text-white">
          Tipos de Alojamento
        </p>
        {/* bg-white/10 backdrop-blur */}
        <div className=" flex flex-row justify-center rounded-lg  py-6 px-4 ">
          <div class="mx-2 max-w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
            <img
              src="https://habanamotel.com/wp-content/uploads/2023/01/suite-com-baloico-cancan-baloico-quarto-motel.jpg"
              class="aspect-video w-full object-cover"
              alt=""
            />
            <div class="p-4">
              <h3 class="text-xl font-medium text-gray-900">Hotel</h3>

              <p class="mt-1 text-gray-500">1 000 alojamentos</p>
            </div>
          </div>
          <div class="mx-2 max-w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
            <img
              src="https://habanamotel.com/wp-content/uploads/2023/01/suite-com-baloico-cancan-baloico-quarto-motel.jpg"
              class="aspect-video w-full object-cover hover:cursor-pointer"
              alt=""
            />
            <div class="p-4">
              <h3 class="text-xl font-medium text-gray-900">Motel</h3>

              <p class="mt-1 text-gray-500">1 000 alojamentos</p>
            </div>
          </div>
          <div class="mx-2 max-w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
            <img
              src="https://habanamotel.com/wp-content/uploads/2023/01/suite-com-baloico-cancan-baloico-quarto-motel.jpg"
              class="aspect-video w-full object-cover hover:cursor-pointer"
              alt=""
            />
            <div class="p-4">
              <h3 class="text-xl font-medium text-gray-900">Hostel</h3>
              <p class="mt-1 text-gray-500">1 000 alojamentos</p>
            </div>
          </div>
          <div class="mx-2 max-w-full overflow-hidden rounded-lg bg-white shadow hover:cursor-pointer">
            <img
              src="https://habanamotel.com/wp-content/uploads/2023/01/suite-com-baloico-cancan-baloico-quarto-motel.jpg"
              class="aspect-video w-full object-cover hover:cursor-pointer"
              alt=""
            />
            <div class="p-4">
              <h3 class="text-xl font-medium text-gray-900">Aparthotel</h3>
              <p class="mt-1 text-gray-500">1 000 alojamentos</p>
            </div>
          </div>
        </div>

        <div class="mx-auto  overflow-hidden rounded-lg bg-white shadow">
          <ul class="divide-y divide-gray-100 py-2 px-4">
            <li class="flex py-4">
              <div class="mr-4 flex-1">
                <h4 class="text-lg font-medium text-gray-900">
                  The Bank of England Risks Hiking Too Far Ahead
                </h4>
                <div class="mt-1 text-sm text-gray-400">
                  <span>Business</span> • <time>18 Nov 2022</time>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
                  class="h-40 w-80 rounded-lg object-cover"
                  alt=""
                />
              </div>
            </li>
            <li class="flex py-4">
              <div class="mr-4 flex-1">
                <h4 class="text-lg font-medium text-gray-900">
                  The Bank of England Risks Hiking Too Far Ahead
                </h4>
                <div class="mt-1 text-sm text-gray-400">
                  <span>Business</span> • <time>18 Nov 2022</time>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1550510537-89d5433de5cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                  class="h-20 w-20 rounded-lg object-cover"
                  alt=""
                />
              </div>
            </li>
            <li class="flex py-4">
              <div class="mr-4 flex-1">
                <h4 class="text-lg font-medium text-gray-900">
                  The Bank of England Risks Hiking Too Far Ahead
                </h4>
                <div class="mt-1 text-sm text-gray-400">
                  <span>Business</span> • <time>18 Nov 2022</time>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1587614380862-0294308ae58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  class="h-20 w-20 rounded-lg object-cover"
                  alt=""
                />
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h1>wertyhgfd</h1>
          <img
            src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aap_uEA7vb0DDYVJWEaX3O-AtYp77AaswQKSGtDaimt3gt7QCNpdjp1BkdM6acJ96xTec3tsV_ZJNL_JP-lqsVxydG3nh739RE_hepOOL05tfJh2_ranjMadb3VoBYFvF0ma6S24qZ6QJUuV6sSRrhCskSBP5C1myCzsebztMfGvm7ij3gZT&key=${geocodeAPIKEY2}`}
          />
          <h1>hjkelmwdç,sx</h1>
          <div>
            <button type="button" onClick={() => getPlaceId(city)}>
              Get Place ID
            </button>
            <p>{`PLACE ID: ${placeId[0]}`}</p>

            <img
              src={
                imageUrl !== undefined && imageUrl !== null ? imageUrl[0] : ""
              }
              alt="City Photo"
            />
          </div>
        </div>
      </div>
    </>
  );
}
