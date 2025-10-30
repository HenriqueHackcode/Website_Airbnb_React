import React from "react";
import { Link } from "react-router-dom";

const Booking = ({ booking, place, user, onDelete }) => {
  if (!booking || !booking.place || !booking.place._id) {
    return <></>;
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (onDelete) {
      onDelete(booking._id);
    }
  };

  return (
    <div
      className={`relative flex w-full max-w-3xl items-center gap-6 rounded-2xl bg-gray-100 p-4 transition ${place ? "cursor-auto" : "hover:shadow-md"}`}
      key={booking._id}
    >
      {!place ? (
        <Link
          to={`/place/${booking.place._id}`}
          className="flex w-full items-center gap-6"
        >
          <img
            className="aspect-square w-48 rounded-2xl object-cover"
            src={booking.place.photos?.[0]}
            alt={booking.place.title}
          />

          <div className="flex grow flex-col gap-4">
            <p className="text-xl font-semibold">{booking.place.title}</p>
            <p className="text-gray-700">{booking.place.description}</p>

            <div className="flex flex-col gap-1 text-sm font-medium">
              <p>
                <span className="font-bold">Check-in: </span>
                {new Date(booking.checkin + "GMT -03:00").toLocaleDateString(
                  "pt-BR",
                )}
              </p>
              <p>
                <span className="font-bold">Check-out: </span>
                {new Date(booking.checkout + "GMT -03:00").toLocaleDateString(
                  "pt-BR",
                )}
              </p>
              <p>
                <span className="font-bold">Hóspedes: </span> {booking.guests}
              </p>
            </div>
            <p className="font-bold text-green-700">
              <span className="text-gray-950">Total: </span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(booking.total) || 0)}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex w-full flex-col gap-4">
          <p className="flex flex-col items-center text-xl font-semibold">
            {`${user.name}, você já possui uma reserva para esse lugar!`}
          </p>
          <div className="flex flex-col items-center gap-1 text-sm font-medium">
            <p>
              <span className="font-bold">Check-in: </span>
              {new Date(booking.checkin + "GMT -03:00").toLocaleDateString(
                "pt-BR",
              )}
            </p>
            <p>
              <span className="font-bold">Check-out: </span>
              {new Date(booking.checkout + "GMT -03:00").toLocaleDateString(
                "pt-BR",
              )}
            </p>
            <p>
              <span className="font-bold">Hóspedes: </span> {booking.guests}
            </p>
          </div>
          <p className="text-center font-bold text-green-700">
            <span className="text-gray-950">Total: </span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(booking.total) || 0)}
          </p>
        </div>
      )}

      {!place && (
        <button
          onClick={handleDeleteClick}
          className="absolute top-2 right-2 cursor-pointer rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200 hover:text-red-600"
          title="Deletar reserva"
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.74 5.918m.346-.144a.5.5 0 0 1 .45-1.125h13.67c.361 0 .685.22.823.541.138.322.035.687-.26.911l-1.021.75c-.244.18-.54.275-.845.275h-2.583c-.305 0-.601-.095-.845-.275l-1.021-.75c-.295-.224-.398-.589-.26-.911.138-.321.462-.541.823-.541h13.67Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.74 5.918m.346-.144a.5.5 0 0 1 .45-1.125h13.67c.361 0 .685.22.823.541.138.322.035.687-.26.911l-1.021.75c-.244.18-.54.275-.845.275h-2.583c-.305 0-.601-.095-.845-.275l-1.021-.75c-.295-.224-.398-.589-.26-.911.138-.321.462-.541.823-.541h13.67Z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Booking;
