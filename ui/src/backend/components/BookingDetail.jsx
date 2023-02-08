import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { getBookingById } from "../../shared/bookingApi";
import { getHotel } from "../../shared/hotelApi";
import { getRooms } from "../../shared/roomApi";

export default function BookingDetail() => {
    const [room, setRoom] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [booking, setBooking] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getBookingById(id).then((data) => {
            setBooking(data);
        });
        getRooms().then((data) => {
            setRoom(data);
        });
        getHotels().then((data) => {
            setHotel(data);
        });
    }, [id]);

    useEffect(() => {
        if (booking && room && hotel) {
            setLoading(false);
        }
    }, [booking, room, hotel]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoom({ ...room, [name]: value });
      };



    return (
        <> {
            loading ? <Loader /> : (<div></div>)

        }
        </>
    );
    }
