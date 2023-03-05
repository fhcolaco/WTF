import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { getBookingById } from "../../shared/bookingApi";
import { getHotel } from "../../shared/hotelApi";
import { getRoom } from "../../shared/roomApi";
import { getUsers } from "../../shared/userApi";
import { CheckIcon } from "@heroicons/react/24/solid";
import { getRoomCategory } from "../../shared/room_categoryApi";

export default function BookingDetail(props) {
  const [room, setRoom] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [booking, setBooking] = useState({});
  const [users, setUsers] = useState([]);
  const [roomCategory, setRoomCategory] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBookingById(id).then((data) => {
        setBooking(data);
      });
    } else {
      setBooking({});
    }
  }, [id]);
  useEffect(() => {
    getRoomCategory().then((data) => {
      setRoomCategory(data);
    });
    getRoom().then((data) => {
      setRoom(data);
    });
    getHotel().then((data) => {
      setHotel(data);
    });
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    if (
      booking.length !== 0 &&
      room.length > 0 &&
      hotel.length > 0 &&
      users.length > 0 &&
      roomCategory.length > 0
    ) {
      setLoading(false);
    }
  }, [booking, room, hotel, users, roomCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid w-full grid-cols-12 gap-6">
          <form
            className="col-span-8 col-start-3"
            onSubmit={(e) => props.submit(e)}
          >
            <div className="inline-block">
              <h2 className="mb-8 text-4xl font-extrabold">
                {id === "" ? `Editar reserva` : "Criar nova reserva"}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="group group relative z-0 my-8 w-full">
                <label
                  htmlFor="_user"
                  className="absolute top-0 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-orange-500"
                >
                  Utilizador
                </label>

                <select
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-orange-500 focus:outline-none focus:ring-0 "
                  required
                  name="_user"
                  id="_user"
                  defaultValue={
                    users.find((usr) => usr._id === booking._user)?._id ||
                    "default"
                  }
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Selecione um utilizador
                  </option>
                  {users.map((user, index) => {
                    return (
                      <option value={user._id} key={user._id}>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
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
                  name="_hotel"
                  id="_hotel"
                  defaultValue={
                    hotel.find((element) => room._hotel === element._id)?._id ||
                    "default"
                  }
                  onChange={handleChange}
                >
                  <option value="default" disabled>
                    Selecione um hotel
                  </option>
                  {hotel.map((hotel, index) => {
                    return (
                      <option value={hotel._id} key={(hotel, index)}>
                        {hotel.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="relative z-0 my-8 w-full">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {`Quartos do ${
                  hotel.find((element) => booking._hotel === element._id)
                    ?.name || "Hotel"
                }`}
              </h3>
            </div>
            <div className="grid md:grid-cols-3 md:gap-6">
              {room.map((roo) => {
                roo._hotel === booking._hotel && (
                  <div
                    className="my-30 group relative z-0 h-16 w-full gap-6"
                    key={roo._id}
                  >
                    <label
                      className={`inline-flex h-full w-full cursor-pointer select-none items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-50 p-5 text-xs font-semibold  text-gray-500 hover:text-gray-600 md:grid-cols-3 ${
                        booking._rooms?.includes(roo._id)
                          ? "bg-green-300 text-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      {""}
                      <input
                        name="_services"
                        value={roo._id}
                        type="checkbox"
                        className="hidden"
                      />
                      <span className="relative">
                        <span className="absolute inset-0 rounded-lg bg-gray-300"></span>
                        <span className="relative flex  h-8 w-8 transform items-center justify-center rounded-lg bg-white shadow duration-200 ease-in-out">
                          {booking._rooms?.includes(roo._id) ? (
                            <CheckIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            ""
                          )}
                        </span>
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
