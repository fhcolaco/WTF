import { getServices } from "../../shared/servicesApi";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { getRoomCategory } from "../../shared/room_categoryApi";
import { getRoomById } from "../../shared/roomApi";
import { getHotel } from "../../shared/hotelApi";
import { CheckIcon } from "@heroicons/react/24/solid";

export default function RoomDetail() {
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [roomCategory, setRoomCategory] = useState(null);
  const [services, setServices] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const params = useParams();

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
    id ? getRoomById(id).then((room) => setRoom(room)) : setRoom({ _id: "" });
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
                {room._id === "" ? "Criar novo quarto" : `Editar quarto`}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group relative z-0 my-8 w-full">
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
              <div className="group relative z-0 my-8 w-full">
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
              <div className="group relative z-0 my-8 w-full">
                <textarea
                  name="description"
                  required
                  id="description"
                  value={room.description}
                  onChange={handleChange}
                  rows="5"
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  placeholder=" "
                />
                <label
                  htmlFor="description"
                  className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Descrição do quarto
                </label>
              </div>
              <div as="div" className="grid md:grid-cols-3 md:gap-6">
                <div className="my-30 group relative z-0 h-16 w-full gap-6">
                  <label
                    className={`inline-flex h-full w-full cursor-pointer select-none items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-5 text-xs font-semibold  text-gray-500 hover:text-gray-600 md:grid-cols-3 ${
                      room.isAvailable
                        ? "bg-green-300 text-gray-600"
                        : "bg-gray-300"
                    }`}
                  >
                    Está disponível?
                  </label>
                  <input
                    type="checkbox"
                    name="isAvailable"
                    id="isAvailable"
                    checked={room.isAvailable}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="relative">
                    <span className="absolute inset-0 rounded-lg bg-gray-300"></span>
                    <span className="relative flex  h-8 w-8 transform items-center justify-center rounded-lg bg-white shadow duration-200 ease-in-out">
                      {room.isAvailable && (
                        <CheckIcon className="h-5 w-5 text-green-500" />
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
