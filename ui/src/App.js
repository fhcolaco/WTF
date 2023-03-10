import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Layout from "./backend/components/Layout";
import "./styles/App.css";
import { getHotel, createHotel, updateHotel } from "./shared/hotelApi";
import Dashboard from "./backend/components/Dashboard";
import Hotel from "./backend/components/Hotel";
import HotelDetail from "./backend/components/HotelDetail";
import HotelCategory from "./backend/components/HotelCategory";
import Room from "./backend/components/Room";
import RoomDetail from "./backend/components/RoomDetail";
import RoomCategory from "./backend/components/RoomCategory";
import Booking from "./backend/components/Booking";
import Users from "./backend/components/Users";
import UsersDetail from "./backend/components/UsersDetail";
import Services from "./backend/components/Services";
import ServicesDetail from "./backend/components/ServicesDetail";
import ServicesCategory from "./backend/components/ServicesCategory";
import Settings from "./backend/components/Settings";
import NotFound from "./backend/components/404";
import Layout_Front from "./components/Layout_Front";
import Content from "./components/Content";
import Login from "./components/Login";
import Search from "./components/Search";
import About from "./components/About";
import Hotel_Detail from "./components/Hotel_Detail";
import HotelCategory_Detail from "./backend/components/HotelCategory_Detail";
import {
  updateHotelCategory,
  createHotelCategory,
  getHotelCategory,
} from "./shared/hotel_categoryApi";
import UserRegister from "./components/UserRegister";
import { createRoom, getRoom, updateRoom } from "./shared/roomApi";
import { getBookings } from "./shared/bookingApi";
import { getUsers } from "./shared/userApi";
import BookingDetail from "./backend/components/BookingDetail";

function App() {
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState([]);
  const [room, setRoom] = useState([]);
  const [hotelCategory, setHotelCategory] = useState([]);
  const [booking, setBooking] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBookings().then((data) => {
      setBooking(data);
    });
    getHotel().then((data) => {
      setHotel(data);
    });
    getHotelCategory().then((data) => {
      setHotelCategory(data);
    });
    getRoom().then((data) => {
      setRoom(data);
    });
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  useEffect(() => {
    if (hotel.length > 0 && hotelCategory.length > 0 && booking.length > 0)
      setLoading(false);
  }, [hotel, hotelCategory, booking]);

  const onSubmitHotel = (data, event) => {
    event.preventDefault();
    console.log("inicio");
    let id = data.get("_id");
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    if (id !== "") {
      updateHotel(id, data)
        .then(() => {
          getHotel().then((res) => {
            setHotel(res);
          });
        })
        .catch((err) => {
          console.log("ERRO", err);
        });
    } else {
      createHotel(data).then((data) => {
        console.log(data);
        setHotel([...hotel, data]);
      });
    }
    navigate("/dashboard/hotel");
  };

  const onSubmitHotelCategory = (data, event) => {
    event.preventDefault();
    console.log(data);
    if (data._id !== "") {
      updateHotelCategory(data._id, data)
        .then((data) => {
          console.log("UPDATE", data);
          getHotelCategory().then((res) => {
            setHotelCategory(res);
          });
        })
        .catch((err) => {
          console.log("ERRO", err);
        });
    } else {
      createHotelCategory(data)
        .then((data) => {
          console.log("CREATE", data);
          setHotelCategory([...hotelCategory, data]);
        })
        .catch((err) => {
          console.log("ERRO2", err);
        });
    }
    navigate("/dashboard/hotel/categoria");
  };

  const onSubmitRoom = (data, event) => {
    event.preventDefault();
    console.log("inicio");
    let id = data.get("_id");
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    if (id !== "") {
      updateRoom(id, data)
        .then(() => {
          getRoom().then((res) => {
            setRoom(res);
          });
        })
        .catch((err) => {
          console.log("ERRO", err);
        });
    } else {
      createRoom(data)
        .then((data) => {
          setRoom([...room, data]);
        })
        .catch((err) => {
          console.log("ERRO", err);
        });
    }
    navigate("/dashboard/quarto");
  };

  // ------------------------- FILTROS DE PESQUISA  -------------------------

  const [selectedLocation, setSelectedLocation] = useState([]);
  const [quantityOptions, setQuantityOptions] = useState({
    pessoas: 2,
    quartos: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // -----------------------------------------------------------------------------
  return (
    <>
      {loading ? (
        <div />
      ) : (
        <Routes>
          <Route path="/" element={<Layout_Front />}>
            <Route
              path=""
              element={
                <Content
                  selectedLocation={[selectedLocation, setSelectedLocation]}
                  quantityOptions={[quantityOptions, setQuantityOptions]}
                  date={[date, setDate]}
                  hotel={hotel}
                  hotelCategory={hotelCategory}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  selectedLocation={[selectedLocation, setSelectedLocation]}
                  quantityOptions={[quantityOptions, setQuantityOptions]}
                  date={[date, setDate]}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/hoteldetail/:id" element={<Hotel_Detail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/profile" element={<UserRegister />} />
          <Route path="/dashboard" element={<Layout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="hotel" element={<Hotel hotel={hotel} />} />
            <Route
              path="hotel/criar"
              element={<HotelDetail submit={onSubmitHotel} />}
            />
            <Route
              path="hotel/:id"
              element={<HotelDetail submit={onSubmitHotel} />}
            />
            <Route
              path="hotel/categoria"
              element={<HotelCategory hotelCategory={hotelCategory} />}
            />
            <Route
              path="hotel/categoria/:id"
              element={<HotelCategory_Detail submit={onSubmitHotelCategory} />}
            />
            <Route
              path="hotel/categoria/criar"
              element={<HotelCategory_Detail submit={onSubmitHotelCategory} />}
            />
            <Route path="quarto" element={<Room room={room} />} />
            <Route
              path="quarto/criar"
              element={<RoomDetail submit={onSubmitRoom} />}
            />
            <Route
              path="quarto/:id"
              element={<RoomDetail submit={onSubmitRoom} />}
            />
            <Route path="quarto/categoria" element={<RoomCategory />} />
            <Route
              path="reserva"
              element={
                <Booking
                  hotel={hotel}
                  room={room}
                  booking={booking}
                  users={users}
                />
              }
            />
            <Route path="reserva/:id" element={<BookingDetail />} />
            <Route path="reserva/criar" element={<BookingDetail />} />
            <Route path="utilizador" element={<Users />} />
            <Route path="servico" element={<Services />} />
            <Route path="servico/criar" element={<ServicesDetail />} />
            <Route path="servico/:id" element={<ServicesDetail />} />
            <Route path="servico/categoria" element={<ServicesCategory />} />
            <Route path="utilizador/criar" element={<UsersDetail />} />
            <Route path="utilizador/:id" element={<UsersDetail />} />
            <Route path="configuracao" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      )}
    </>
  );
}

export default App;
