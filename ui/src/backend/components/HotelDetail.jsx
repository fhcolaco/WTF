import { getHotelById } from "../../shared/hotelApi";
import { getHotelCategory } from "../../shared/hotel_categoryApi";
import { getServices } from "../../shared/servicesApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import locationList from "../../shared/locationList";
import { CheckIcon } from "@heroicons/react/24/solid";

//falta criar o handler para a loacalização e acabar o carousel

export default function HotelDetail(props) {
  const [hotel, setHotel] = useState({});
  const [services, setServices] = useState([]);
  const [hotelType, setHotelType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [state, setState] = useState("");
  const [files, setFiles] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id === undefined) {
      setHotel({
        _id: "",
        name: "",
        description: "",
        location: "",
        address: "",
        postal_code: "",
        _hotel_type: "",
        _services: [""],
        images: [""],
      });
    } else {
      getHotelById(params.id).then((res) => {
        console.log(res);
        setHotel(res);
        if (
          res.location !== "" &&
          res.location !== null &&
          res.location !== undefined
        ) {
          locationList.map((location) => {
            if (location.concelho.includes(res.location)) {
              setState(location.distrito);
            }
          });
        }
      });
    }

    getHotelCategory().then((res) => {
      setHotelType(res);
    });

    getServices().then((res) => {
      setServices(res);
    });
  }, []);

  useEffect(() => {
    if (hotelType.length !== 0 && services.length !== 0 && hotel.length !== 0) {
      setLoading(false);
    }
  }, [hotelType, services, hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const isChecked = (e) => {
    if (!hotel._services.includes(e.target.value)) {
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

  useEffect(() => {
    if (loading === true && hotel.images !== undefined) {
      let aux = [];
      hotel.images.map((image) => {
        return aux.push(`https://wtf-backend.onrender.com/images/${image}`);
      });
      setImages(aux);
    }
  }, [hotel.images, loading]);

  const send = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("_id", hotel._id);
    data.append("name", hotel.name);
    data.append("description", hotel.description);
    data.append("location", hotel.location);
    data.append("address", hotel.address);
    data.append("postal_code", hotel.postal_code);
    data.append("_hotel_type", hotel._hotel_type);
    hotel._services.forEach((service) => {
      data.append("_services", service);
    });
    data.append("images", hotel.images);
    if (files.length !== 0) {
      data.append("files", files);
    }

    props.submit(data, event);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid w-full grid-cols-12 gap-6">
          <form
            encType="multipart/form-data"
            className="col-span-6 col-start-3"
            onSubmit={(e) => send(e)}
          >
            <div className="inline-block">
              <h2 className="mb-8 text-4xl font-extrabold">
                {hotel.name === ""
                  ? "Criar novo hotel"
                  : `Editar ${hotel.name}`}
              </h2>
            </div>
            <div className="group relative z-0 my-8 w-full">
              <input
                type="text"
                name="name"
                id="name"
                value={hotel.name}
                onChange={handleChange}
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
                name="description"
                id="description"
                value={hotel.description}
                onChange={handleChange}
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
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group relative z-0 my-8 w-full">
                <select
                  required
                  value={hotel._hotel_type}
                  name="_hotel_type"
                  id="_hotel_type"
                  onChange={handleChange}
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
                  value={hotel.address}
                  name="address"
                  id="address"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="address"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Endereço
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="group relative z-0 my-8 w-full">
                <label
                  htmlFor="distrito"
                  className="absolute top-0 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Distrito
                </label>
                <select
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  required
                  name="distrito"
                  id="distrito"
                  defaultValue={"default"}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="default" disabled>
                    Distrito
                  </option>
                  {locationList.map((distrito) => (
                    <option value={distrito.distrito} key={distrito}>
                      {distrito.distrito}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative z-0 my-8 w-full">
                <label
                  htmlFor="location"
                  className="absolute top-0 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Concelho
                </label>
                <select
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  required
                  name="location"
                  id="location"
                  defaultValue={"default"}
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Concelho
                  </option>
                  {locationList.map((location) => {
                    if (location.distrito === state) {
                      return location.concelho.map((concelho) => (
                        <option value={concelho} key={concelho}>
                          {concelho}
                        </option>
                      ));
                    }
                  })}
                </select>
              </div>
              <div className="group relative z-0 my-8 w-full">
                <input
                  value={hotel.postal_code}
                  name="postal_code"
                  id="postal_code"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                  onChange={handleChange}
                />
                <label
                  htmlFor="postal_code"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Código Postal
                </label>
              </div>
            </div>
            <div className="relative z-0 my-8 w-full">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Serviços:
              </h3>
            </div>
            <div as="div" className="grid md:grid-cols-3 md:gap-6">
              {services.map((service) => (
                <div
                  className="my-30 group relative z-0 h-16 w-full gap-6"
                  key={service._id}
                >
                  <label
                    className={`inline-flex h-full w-full cursor-pointer select-none items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-5 text-xs font-semibold  text-gray-500 hover:text-gray-600 md:grid-cols-3 ${
                      hotel._services?.includes(service._id)
                        ? "bg-green-300 text-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    {service.name}
                    <input
                      name="_services"
                      value={service._id}
                      onChange={(e) => isChecked(e)}
                      type="checkbox"
                      className="hidden"
                    />
                    <span className="relative">
                      <span className="absolute inset-0 rounded-lg bg-gray-300"></span>
                      <span className="relative flex  h-8 w-8 transform items-center justify-center rounded-lg bg-white shadow duration-200 ease-in-out">
                        {hotel._services?.includes(service._id) ? (
                          <CheckIcon className="h-5 w-5 text-green-500" />
                        ) : (
                          ""
                        )}
                      </span>
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
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
          </form>
          <div className="col-span-4 mx-5 mb-5 sm:px-0">
            <h1 className="mb-8 text-4xl font-extrabold">Imagens do Hotel</h1>
            <div id="carousel" className="relative" data-carousel="static">
              <div className="relative h-96 overflow-hidden rounded-lg">
                {hotel.images?.length > 0 ? (
                  hotel.images.map((image) => (
                    <div
                      className="hidden duration-700 ease-in-out"
                      data-carousel-item
                      key={image}
                    >
                      <img
                        src={`https://wtf-backend.onrender.com/images/${image}`}
                        alt="hotel"
                        className="absolute top-0 left-0 h-full w-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148090410.jpg"
                      alt="hotel"
                      className="absolute top-0 left-0 h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
                <button
                  type="button"
                  className="h-3 w-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 1"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  type="button"
                  className="h-3 w-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 2"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  type="button"
                  className="h-3 w-3 rounded-full"
                  aria-current="false"
                  aria-label="Slide 3"
                  data-carousel-slide-to="2"
                ></button>
              </div>
              <button
                type="button"
                className="group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-prev
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
                data-carousel-next
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
            <div className="group relative z-0 my-8 w-full">
              <input
                name="images"
                id="images"
                type="file"
                onChange={(e) => {
                  setFiles(e.target.files[0]);
                }}
                accept="image/*"
                multiple
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
              />
              <label
                htmlFor="images"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
              >
                Imagem
              </label>
            </div>
          </div>
          <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </div>
      )}
    </>
  );
}
