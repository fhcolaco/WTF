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

  // useEffect(() => {
  //   console.log("Hotel");
  //   console.log(hotel);
  //   console.log("CityList");
  //   console.log(locationList);
  // }, [hotel, locationList]);

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
              className="rounded"
              placeholder="Cidade"
            />
            <Combobox.Options className="bg-white pl-2">
              {filteredLocation.map((location, index) => (
                <Combobox.Option key={index} value={location}>
                  {location}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox>
          <div
            className="rounded  bg-white px-4 align-middle text-gray-500 outline-none hover:cursor-pointer"
            onClick={() => setOpenDate(!openDate)}
          >
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
        </form>
      </div>
      <div className="-mt-72 text-white">
        <h1>wertyhgfd</h1>
      </div>
    </>
  );
}
