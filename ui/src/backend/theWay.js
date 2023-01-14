import Dashboard from "./components/Dashboard";
import Hotel from "./components/Hotel";
import HotelDetail from "./components/HotelDetail";
import HotelCategory from "./components/HotelCategory";
import Room from "./components/Room";
import RoomDetail from "./components/RoomDetail";
import RoomCategory from "./components/RoomCategory";
import Booking from "./components/Booking";
import Users from "./components/Users";
import UsersDetail from "./components/UsersDetail";
import Services from "./components/Services";
import ServicesDetail from "./components/ServicesDetail";
import ServicesCategory from "./components/ServicesCategory";
import Settings from "./components/Settings";
import NotFound from "./components/404";
import Layout from "./components/Layout";

const theWay = [
  {
    // Dashboard
    path: "/dashboard",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      // Hotel
      {
        path: "hotel",
        element: <Hotel />,
        props: [
          ["hotel", "[hotel, setHotel]"],
          ["location", "[location, setLocation]"],
        ],
      },
      { path: "hotel/criar", element: <HotelDetail /> },
      { path: "hotel/:id", element: <HotelDetail /> },

      // Hotel Category
      { path: "hotel/categoria", element: <HotelCategory /> },

      // Room
      { path: "quarto", element: <Room /> },
      { path: "quarto/criar", element: <RoomDetail /> },
      { path: "quarto/:id", element: <RoomDetail /> },

      // Room Category
      { path: "quarto/categoria", element: <RoomCategory /> },

      // Booking
      { path: "reserva", element: <Booking /> },

      // Users
      { path: "utilizador", element: <Users /> },
      { path: "utilizador/criar", element: <UsersDetail /> },
      { path: "utilizador/:id", element: <UsersDetail /> },

      // Services
      { path: "servico", element: <Services /> },
      { path: "servico/criar", element: <ServicesDetail /> },
      { path: "servico/:id", element: <ServicesDetail /> },

      // Services Category
      { path: "servico/categoria", element: <ServicesCategory /> },

      // Settings
      { path: "configuracao", element: <Settings /> },

      // 404
      { path: "*", element: <NotFound /> },
    ],
  },
];

export default theWay;
