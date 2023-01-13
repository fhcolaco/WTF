import React from "react";
import { Routes, Route, BrowserRouter, useRoutes } from "react-router-dom";
import Layout from "./backend/components/Layout";
import Dashboard from "./backend/components/Dashboard";
import "./styles/App.css";
import NotFound from "./backend/components/404";
import { sideBarItems } from "./backend/components/SideBar";
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
import theWay from "./backend/theWay";

function App() {
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
        {theWay.map((item) => {
          return (
            <Route key={item.path} path={item.path} element={item.element}>
              {item.children?.map((child) => {
                return (
                  <Route
                    key={child.path}
                    path={child.path}
                    element={child.element}
                  />
                );
              })}
            </Route>
          );
        })}
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
