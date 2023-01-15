import { getHotelById } from "../../shared/hotelApi";
import { getHotelCategory } from "../../shared/hotel_categoryApi";
import { getServices } from "../../shared/servicesApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader";

export default function HotelDetail() {
  const [hotel, setHotel] = useState({});
  const [services, setServices] = useState([]);
  const [hotelType, setHotelType] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    if (params.id === undefined) {
      setHotel({
        _id: "",
        name: "",
        location: "",
        description: "",
        _hotel_type: "",
        _services: "",
        images: "",
      });
    } else {
      getHotelById(params.id).then((res) => {
        setHotel(res);
      });
    }

    getHotelCategory().then((res) => {
      setHotelType(res);
    });

    getServices().then((res) => {
      setServices(res);
    });
  }, [params.id]);

  useEffect(() => {
    if (hotelType.length !== 0 && services.length !== 0 && hotel.length !== 0) {
      setLoading(false);
    }
  }, [hotelType, services, hotel]);
  return <>{loading ? <Loader /> : <div></div>}</>;
}
