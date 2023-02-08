import { getServices } from "../../shared/servicesApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { getRoomCategory } from "../../shared/room_categoryApi";
import { getRoomById } from "../../shared/roomApi";
import { getHotel } from "../../shared/hotelApi";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

export default function RoomDetail() {
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [roomCategory, setRoomCategory] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRoomCategory().then((roomCategory) => {
      setRoomCategory(roomCategory);
    });
    getServices().then((services) => {
      setServices(services);
    });
    getHotel().then((hotel) => {
      setHotel(hotel);
    });
  }, []);

  useEffect(() => {
    id
      ? getRoomById(id).then((room) => {
          setRoom(room);
          setImages(room.images);
        })
      : setRoom({ isAvailable: true });
  }, [id]);

  useEffect(() => {
    if (room && roomCategory && services && hotel) {
      setLoading(false);
    }
  }, [hotel, room, roomCategory, services]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  const isChecked = (e) => {
    if (!room._services.includes(e.target.value)) {
      setRoom({ ...room, _services: [...room._services, e.target.value] });
    } else {
      setRoom({
        ...room,
        _services: room._services.filter(
          (service) => service !== e.target.value
        ),
      });
    }
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  useEffect(() => {
    console.log(room);
  }, [room]);

  const send = (e) => {
    e.preventDefault();
    //
    //
    //
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
                {id === "" ? `Editar quarto` : "Criar novo quarto"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group group relative z-0 my-8 w-full">
                <label
                  htmlFor="hotel"
                  className="absolute top-0 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Hotel
                </label>
                <select
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  required
                  name="hotel"
                  id="hotel"
                  defaultValue={
                    hotel.find((element) => room._hotel === element._id) ||
                    "default"
                  }
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Selecione um hotel
                  </option>
                  {hotel.map((hotel, index) => (
                    <option value={hotel._id} key={(hotel, index)}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="group group relative z-0 my-8 w-full">
                <label
                  htmlFor="category"
                  className="absolute top-0 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Categoria do quarto
                </label>
                <select
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  required
                  name="_room_category"
                  id="_room_category"
                  defaultValue={
                    roomCategory.find(
                      (element) => room._hotel === element._id
                    ) || "default"
                  }
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Selecione uma categoria
                  </option>
                  {roomCategory.map((category, index) => (
                    <option value={category._id} key={(category, index)}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="group relative z-0 my-8 w-full">
              <textarea
                name="description"
                required
                id="description"
                value={room.description}
                onChange={handleChange}
                rows="5"
                className="-transparent peer block w-full appearance-none border-0 border-b-2  border-gray-300 px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                placeholder=" "
              />
              <label
                htmlFor="description"
                className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
              >
                Descrição do quarto
              </label>
            </div>
            <div className="grid items-center md:grid-cols-3 md:gap-6">
              <div className="my-30 group relative z-0 w-full gap-6">
                <label
                  className={`flex h-full w-full cursor-pointer select-none flex-row items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-5 text-xs font-semibold  text-gray-500 hover:text-gray-600 md:grid-cols-3 ${
                    room.isAvailable
                      ? "bg-green-300 text-gray-600"
                      : "bg-gray-300"
                  }`}
                >
                  Está operacional?
                  <input
                    name="isAvailable"
                    value={!room.isAvailable}
                    onChange={(e) =>
                      setRoom({
                        ...room,
                        isAvailable: e.target.checked,
                      })
                    }
                    type="checkbox"
                    className="hidden"
                  />
                  <span className="relative">
                    <span className="absolute inset-0 rounded-lg bg-gray-300"></span>
                    <span className="relative flex  h-8 w-8 transform items-center justify-center rounded-lg bg-white shadow duration-200 ease-in-out">
                      {room.isAvailable ? (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        ""
                      )}
                    </span>
                  </span>
                </label>
              </div>
              <div className="group relative z-0 my-8 w-full">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={room.price}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="price"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Preço por noite
                </label>
              </div>
              <div className="group relative z-0 my-8 w-full">
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  value={room.discount}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="discount"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  % Desconto
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
                      room._services?.includes(service._id)
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
                        {room._services?.includes(service._id) ? (
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
            <h1 className="mb-8 text-4xl font-extrabold">Imagens do quarto</h1>
            {images?.length > 0 && (
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
                      setCurrentIndex(0);
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
