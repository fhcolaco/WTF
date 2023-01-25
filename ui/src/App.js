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

function App() {
  const [hotel, setHotel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getHotel().then((data) => {
      console.log(data);
      setHotel(data);
    });
  }, []);

  const onSubmitHotel = (data, event) => {
    event.preventDefault();
    console.log("inicio");
    let id = data.get("_id");
    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
    if (data._id !== "") {
      updateHotel(id, data)
        .then((teste) => {
          console.log("update");
          console.log(teste);
          getHotel().then((res) => {
            console.log(res);
            setHotel(res);
          });
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    } else {
      console.log("create");
      createHotel(data).then((data) => {
        console.log(data);
        setHotel([...hotel, data]);
      });
    }
    console.log("fim");
    console.log(hotel);
    navigate("/dashboard/hotel");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout_Front />}>
          <Route path="" element={<Content />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/hoteldetail" element={<Hotel_Detail />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
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
          <Route path="hotel/categoria" element={<HotelCategory />} />
          <Route path="quarto" element={<Room />} />
          <Route path="quarto/criar" element={<RoomDetail />} />
          <Route path="quarto/:id" element={<RoomDetail />} />
          <Route path="quarto/categoria" element={<RoomCategory />} />
          <Route path="reserva" element={<Booking hotel={hotel} />} />
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
    </>
  );
}

export default App;
