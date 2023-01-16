import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useForm } from "react-hook-form";

function App() {
  const [hotel, setHotel] = useState([]);
  const { unregister } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    getHotel().then((data) => {
      setHotel(data);
    });
  }, []);

  const onSubmitHotel = (data, event) => {
    console.log(data);
    event.preventDefault();
    console.log(data);
    // if (data._id !== "" || data._id !== undefined) {
    //   updateHotel(data._id, data).then((data) => {
    //     console.log(data);
    //     setHotel([...hotel, data]);
    //   });
    // } else {
    //   createHotel(data).then((data) => {
    //     console.log(data);
    //     setHotel([...hotel, data]);
    //   });
    // }
    navigate("/dashboard/hotel");
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <section>
              <h1 className="text-3xl font-bold">
                Só estava a testar para ver se funcionava o tailwind :D
              </h1>
              <a href="/dashboard">
                <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                  Dashboard
                </button>
              </a>
            </section>
          }
        />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="hotel" element={<Hotel hotel={hotel} />} />
          <Route
            path="hotel/criar"
            element={<HotelDetail submit={onSubmitHotel} />}
          />
          <Route path="hotel/:id" element={<HotelDetail />} />
          <Route path="hotel/categoria" element={<HotelCategory />} />
          <Route path="quarto" element={<Room />} />
          <Route path="quarto/criar" element={<RoomDetail />} />
          <Route path="quarto/:id" element={<RoomDetail />} />
          <Route path="quarto/categoria" element={<RoomCategory />} />
          <Route path="reserva" element={<Booking />} />
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
