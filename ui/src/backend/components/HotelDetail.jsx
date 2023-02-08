import { getHotelById } from "../../shared/hotelApi";
import { getHotelCategory } from "../../shared/hotel_categoryApi";
import { getServices } from "../../shared/servicesApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import locationList from "../../shared/locationList";
import { CheckIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
//falta criar o handler para a loacalização e acabar o carousel

export default function HotelDetail(props) {
  const [hotel, setHotel] = useState({});
  const [services, setServices] = useState([]);
  const [hotelType, setHotelType] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
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
        setHotel(res);
        if (res.location) {
          locationList.map((location) => {
            if (location.concelho.includes(res.location)) {
              setState(location.distrito);
            }
          });
        }
        setImages(res.images.filter((image) => image !== ""));
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
    if (
      hotelType.length !== 0 &&
      services.length !== 0 &&
      hotel.length !== 0 &&
      (images.length !== 0 || hotel.images === [""])
    ) {
      console.log(images);
      setLoading(false);
    }
  }, [hotelType, services, hotel, images]);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    console.log(currentIndex);
  }, [currentIndex]);

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
    data.append("images", images);

    if (files) {
      [...files].map((file) => {
        data.append("files", file);
      });
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
                required
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
                required
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
                  required
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
                  defaultValue={
                    locationList.find((element) =>
                      element.concelho.includes(hotel.location)
                    )?.distrito || "default"
                  }
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="default" disabled>
                    Distrito
                  </option>
                  {locationList.map((distrito, index) => (
                    <option value={distrito.distrito} key={(distrito, index)}>
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
                  defaultValue={hotel.location || "default"}
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Concelho
                  </option>
                  {locationList.map((location) => {
                    if (location.distrito === state) {
                      return location.concelho.map((concelho, index) => (
                        <option value={concelho} key={(concelho, index)}>
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
                  required
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
            {images.length > 0 && (
              <div className="group relative m-auto h-96 w-full py-16 px-4">
                <img
                  src={`https://wtf-backend.onrender.com/images/${images[currentIndex]}`}
                  className={`h-full w-full rounded-2xl bg-cover bg-center duration-500`}
                  alt={currentIndex}
                ></img>
                <div className="absolute top-1/2 left-5 hidden h-10 w-10 -translate-x-0 -translate-y-1/2 cursor-pointer rounded-full bg-black/20 p-2 text-white group-hover:block">
                  <ChevronLeftIcon
                    className="inset-0"
                    onClick={() => prevSlide()}
                  />
                </div>
                <div className="absolute top-1/2 right-5 hidden h-10 w-10 -translate-x-0 -translate-y-1/2 cursor-pointer rounded-full bg-black/20 p-2 text-white  group-hover:block">
                  <ChevronRightIcon
                    className="inset-0"
                    onClick={() => nextSlide()}
                  />
                </div>
                <div className="top-4 hidden justify-center py-2 group-hover:flex">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`mx-1 h-2 w-2 cursor-pointer rounded-full ${
                        currentIndex === index ? "bg-orange-500" : "bg-gray-300"
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-x-0  bottom-5 hidden h-0 group-hover:block">
                  <button
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    onClick={() => {
                      setImages(
                        images.filter((image, index) => index !== currentIndex)
                      );
                      if (currentIndex > images.length - 1) prevSlide();
                    }}
                  >
                    Eliminar Imagem
                  </button>
                </div>
              </div>
            )}
            <div className="group relative z-0 my-16 w-full">
              <input
                name="images"
                id="images"
                type="file"
                multiple
                onChange={(e) => {
                  setFiles(e.target.files);
                }}
                accept="image/*"
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
        </div>
      )}
    </>
  );
}
