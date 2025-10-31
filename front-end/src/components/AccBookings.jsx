import axios from "axios";
import React, { useEffect, useState } from "react";
import Booking from "./Booking";
import { Link } from "react-router-dom";

const AccBookings = () => {
  const [bookings, setBookings] = useState([]);

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      return;
    }

    try {
      await axios.delete(`/bookings/${bookingId}`);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId),
      );
    } catch (error) {
      console.error("Erro ao deletar a reserva:", error);
      alert("Não foi possível cancelar a reserva. Tente novamente.");
    }
  };

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data } = await axios.get("/bookings/owner");
        setBookings(data);
      } catch (error) {
        console.error("Erro ao buscar reservas:", error);
      }
    };

    axiosGet();
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      {bookings.length === 0 ? (
        <div className="flex flex-col gap-8">
          <p className="mt-6 flex text-2xl text-gray-700">
            Você ainda não possui reservas.
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
          </p>
          <div className="flex flex-col justify-center gap-4 self-center text-center text-lg font-semibold">
            <p className="text-gray-700">Faça a sua reserva, clique abaixo!</p>
            <Link
              to="/"
              className="bg-primary-400 hover:bg-primary-500 mb-4 flex cursor-pointer items-center gap-2 self-center rounded-full px-5 py-1 text-lg font-medium text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              Reservar
            </Link>
          </div>
        </div>
      ) : (
        bookings.map((booking) => (
          <Booking
            booking={booking}
            key={booking._id}
            onDelete={handleDeleteBooking}
          />
        ))
      )}
    </div>
  );
};

export default AccBookings;
