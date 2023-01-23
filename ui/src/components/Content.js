import React, { useEffect } from "react";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { geocodeAPIKEY } from "../backend/components/Hotel";
import Geocode from "react-geocode";
import { getHotel } from "../shared/hotelApi";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import axios from "axios";
import { data } from "autoprefixer";

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
  }, [placeId]);

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

  return (
    <>
      <div className="inset-x-0 top-0 mt-64 h-screen min-h-screen ">
        <div className="mb-10 snap-start text-center text-5xl text-white">
          <h1>Descubra o seu próximo Hotel!</h1>
        </div>
        <form className="flex flex-row justify-center">
          <Combobox as="div" onChange={setSelectedLocation}>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              className="rounded px-4 outline outline-1 outline-black"
              placeholder={"cidade"}
            ></Combobox.Input>
            <Combobox.Options className="rounded-b bg-white pl-2">
              {filteredLocation.map((location, index) => (
                <Combobox.Option key={index} value={location}>
                  {location}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>

          <div
            className="flex h-10 flex-row rounded bg-white px-4 py-2 align-middle text-gray-500 outline outline-1 outline-black hover:cursor-pointer"
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
              className="absolute top-36"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="ml-2 h-11 w-11 rounded-full bg-orange-500 stroke-white p-2 hover:cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </form>
      </div>
      <div className="-mt-72 text-white">
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
            src={imageUrl !== undefined && imageUrl !== null ? imageUrl[0] : ""}
            alt="City Photo"
          />
        </div>
      </div>
    </>
  );
}
