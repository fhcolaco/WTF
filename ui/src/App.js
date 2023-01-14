import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./backend/components/Layout";
import "./styles/App.css";
import { getHotel } from "./shared/hotelApi";
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
import Loader from "./Loader";

function App() {
  const [hotel, setHotel] = useState([]);

  useEffect(() => {
    getHotel().then((data) => {
      console.log(data);
      setHotel(data);
    });
  }, []);
  // #### Change the loading state to false after loading the data
  function loadingFunction() {
    return <Loader />;
  }

  return (
    <BrowserRouter>
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
          <Route
            path="hotel"
            element={
              <Hotel hotel={[hotel, setHotel]} loader={loadingFunction} />
            }
          />
          <Route path="hotel/criar" element={<HotelDetail />} />
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
    </BrowserRouter>
  );
}

export default App;
