import { getHotelById } from "../../shared/hotelApi";
import { getHotelCategory } from "../../shared/hotel_categoryApi";
import { getServices } from "../../shared/servicesApi";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../../Loader";
import { geocodeAPIKEY } from "./Hotel";
import Geocode from "react-geocode";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function HotelDetail(props) {
  const [hotel, setHotel] = useState({});
  const [services, setServices] = useState([]);
  const [hotelType, setHotelType] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState();

  useEffect(() => {
    if (params.id === undefined) {
      setHotel({
        _id: "",
        name: "",
        location: "",
        description: "",
        _hotel_type: "",
        _services: [""],
        images: [""],
      });
    } else {
      getHotelById(params.id).then((res) => {
        setHotel(res);
      });
    }

    getHotelCategory().then((res) => {
      setHotelType(res);
    });

    getServices().then((res) => {
      setServices(res);
    });
    if (hotel.location !== undefined && hotel.location !== "") {
      geocodeAPIKEY();
      Geocode.setLanguage("pt");
      Geocode.setRegion("pt");
      let [lat, lng] = hotel.location.split(", ");
      Geocode.fromLatLng(lat, lng).then(
        (response) => {
          return setAddress({
            city: response.results[0].address_components[2].long_name,
            country: response.results[0].address_components[4].long_name,
            street:
              response.results[0].address_components[1].long_name +
              ", " +
              response.results[0].address_components[0].long_name,
            zip: response.results[0].address_components[5].long_name,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      setAddress({
        city: "",
        country: "",
        street: "",
        zip: "",
      });
    }
  }, [hotel.location, params.id]);

  useEffect(() => {
    if (
      hotelType.length !== 0 &&
      services.length !== 0 &&
      hotel.length !== 0 &&
      address.length !== 0 &&
      (address.city !== "" || hotel.location === "")
    ) {
      setLoading(false);
    }
  }, [hotelType, services, hotel, address]);

  useEffect(() => {
    if (hotel._id !== undefined) {
      register("_id", { value: hotel._id });
    }
  }, [hotel._id, register, handleSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "city" ||
      name === "country" ||
      name === "street" ||
      name === "zip"
    ) {
      setAddress({ ...address, [name]: value });
    } else {
      setHotel({ ...hotel, [name]: value });
    }
  };

  const isChecked = (e) => {
    if (e.target.checked) {
      setHotel({ ...hotel, _services: [...hotel._services, e.target.value] });
    } else {
      setHotel({
        ...hotel,
        _services: hotel._services.filter(
          (service) => service !== e.target.value
        ),
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form className="w-2/3" onSubmit={handleSubmit(props.submit)}>
          <div className="inline-block">
            <h2 className="mb-8 text-4xl font-extrabold">
              {hotel.name === "" ? "Criar novo hotel" : `Editar ${hotel.name}`}
            </h2>
          </div>
          <div className="group relative z-0 my-8 w-full">
            <input
              {...register("name", {
                type: "text",
                value: hotel.name,
                name: "name",
                id: "name",
                onChange: handleChange,
              })}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
            >
              Nome do hotel
            </label>
          </div>
          <div className="group relative z-0 my-8 w-full">
            <textarea
              {...register("description", {
                value: hotel.description,
                name: "description",
                id: "description",
                onChange: handleChange,
              })}
              rows="5"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
              placeholder=" "
            />
            <label
              htmlFor="description"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
            >
              Descrição do hotel
            </label>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group relative z-0 my-8 w-full">
                <select
                  {...register("_hotel_type", {
                    value: hotel._hotel_type,
                    name: "_hotel_type",
                    id: "_hotel_type",
                    onChange: handleChange,
                  })}
                  defaultValue="default"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                >
                  <option value="default" disabled>
                    ...
                  </option>
                  {hotelType.map((hotelType) => (
                    <option value={hotelType._id} key={hotelType._id}>
                      {hotelType.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="hotel_type"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Tipo de hotel
                </label>
              </div>
              <div className="relative z-0 my-8 w-full">
                <input
                  value={address.street}
                  name="street"
                  id="street"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="address"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Localização
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="group relative z-0 my-8 w-full">
                <input
                  value={address.city}
                  name={"city"}
                  id={"city"}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="city"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Cidade
                </label>
              </div>
              <div className="group relative z-0 my-8 w-full">
                <input
                  value={address.country}
                  name="country"
                  id="country"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="country"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  País
                </label>
              </div>
              <div className="group relative z-0 my-8 w-full">
                <input
                  value={address.zip}
                  name="zip"
                  id="zip"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="zip"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Código Postal
                </label>
              </div>
            </div>
            <div as="div" className="grid md:grid-cols-6 md:gap-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Serviços:
              </h3>
              {services.map((service) => (
                <div className="my-30 group relative z-0 h-16 w-full gap-6">
                  <label
                    className={`inline-flex h-full w-full cursor-pointer select-none items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-5 text-xs font-semibold  text-gray-500 hover:text-gray-600 md:grid-cols-3 ${
                      hotel._services.includes(service._id)
                        ? "bg-green-300 text-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    {service.name}
                    <input
                      {...register("_services", {
                        value: service._id,
                      })}
                      name="_services"
                      value={service._id}
                      onChange={(e) => isChecked(e)}
                      type="checkbox"
                      className="hidden"
                    />
                    {hotel._services.includes(service._id) ? (
                      <span className="relative">
                        <span className="absolute inset-0 rounded-lg bg-gray-300"></span>
                        <span className="relative flex  h-8 w-8 transform items-center justify-center rounded-lg bg-white shadow duration-200 ease-in-out">
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        </span>
                      </span>
                    ) : (
                      ""
                    )}
                  </label>
                </div>
              ))}
            </div>
            <div className="group relative z-0 my-8 w-full">
              <textarea
                {...register("images", {
                  value: hotel.images,
                  name: "images",
                  id: "images",
                  onChange: handleChange,
                })}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                placeholder=" "
              />
              <label
                htmlFor="images"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
              >
                Imagens
              </label>
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="image_input_help"
              >
                Colocar o link das imagens seguido de uma vírgula
              </p>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Guardar
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
