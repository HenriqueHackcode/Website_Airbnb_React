import React, { useEffect, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Perk from "../components/perk";
import Booking from "../components/Booking";

const Place = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const [place, setPlace] = useState(null);
  const [overlay, setOverlay] = useState(false);
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [image, setImage] = useState(0);
  const [booking, setBooking] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const numberOfDays = (dateOne, dateTwo) => {
    const dateOneGMT = dateOne + "GMT -03:00";
    const dateTwoGMT = dateTwo + "GMT -03:00";
    const dateCheckin = new Date(dateOneGMT);
    const dateCheckout = new Date(dateTwoGMT);
    return (
      (dateCheckout.getTime() - dateCheckin.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const nextImage = () => {
    setImage((prevIndex) => {
      const lastIndex = place.photos.length - 1;

      if (prevIndex === lastIndex) {
        return 0;
      }

      return prevIndex + 1;
    });
  };

  const prevImage = () => {
    setImage((prevIndex) =>
      prevIndex === 0 ? place.photos.length - 1 : prevIndex - 1,
    );
  };

  const navigate = useNavigate();
  const handleOnBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (place) {
      const axiosGet = async () => {
        try {
          const { data } = await axios.get("/bookings/owner");
          setBooking(data.filter((booking) => booking.place._id === place._id));
        } catch (error) {
          console.error("Erro ao buscar reservas:", error);
        }
      };

      axiosGet();
    }
  }, [place]);

  useEffect(() => {
    if (id) {
      const axiosGet = async () => {
        const { data } = await axios.get(`/places/${id}`);

        setPlace(data);
      };
      axiosGet();
    }
  }, [id]);

  useEffect(() => {
    overlay
      ? document.body.classList.add("overflow-hidden")
      : document.body.classList.remove("overflow-hidden");
  }, [overlay]);

  const handleBookin = async (e) => {
    e.preventDefault();

    if (checkin && checkout && guests) {
      const nigths = numberOfDays(checkin, checkout);

      const objBooking = {
        place: id,
        user: user._id,
        price: place.price,
        total: place.price * nigths,
        checkin,
        checkout,
        guests,
        nigths,
      };
      const { data } = await axios.post("/bookings", objBooking);
      setRedirect(true);
    } else {
      alert("Preencha todas as informações antes de finalizar a reserva!");
    }
  };

  if (redirect) return <Navigate to="/account/bookings" />;

  if (!place) {
    return <></>;
  }
  return (
    <section>
      <div className="relative mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:gap-6 sm:p-8">
        <div className="absolute top-0 left-[-50]">
          <button
            onClick={handleOnBack}
            className="absolute top-6 left-0 -translate-x-40 cursor-pointer rounded-full p-2 transition hover:scale-105"
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        {/* Title */}
        <div className="flex flex-col sm:gap-1">
          <div className="text-xl font-bold sm:text-3xl">{place.title}</div>

          <div className="flex items-center gap-1">
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>

            <p>{place.city}</p>
          </div>
        </div>

        {/* Booking */}
        <div className="flex flex-col gap-4">
          {booking && booking.length > 0
            ? booking.map((reserva) => (
                <Booking
                  key={reserva._id}
                  booking={reserva}
                  place={true}
                  user={user}
                />
              ))
            : ""}
        </div>

        {/* Grid Imagens */}
        <div className="relative grid aspect-square gap-4 overflow-hidden rounded-xl sm:aspect-3/2 sm:grid-cols-[2fr_1fr] sm:grid-rows-2">
          {place.photos
            .filter((photo, index) => index < 3)
            .map((photo, index) => (
              <img
                className={`${index === 0 ? "row-span-2 h-full object-center" : ""} aspect-square h-full w-full cursor-pointer transition hover:opacity-75 sm:object-cover`}
                src={photo}
                key={photo}
                alt="Imagem da acomodação"
                onClick={() => setOverlay(true)}
              />
            ))}

          <div
            className="absolute right-2 bottom-2 flex cursor-pointer gap-2 rounded-xl border border-black bg-white px-2 py-1 transition hover:scale-105"
            onClick={() => setOverlay(true)}
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
                d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <p>Mostrar mais imagens</p>
          </div>
        </div>
        {/* Colunas  */}
        <div
          className={`grid ${booking && booking.length > 0 ? "" : "grid-cols-1 md:grid-cols-2"}`}
        >
          <div className="order-2 flex flex-col gap-4 p-6 md:order-0">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">Descrição</p>
              <p>{place.description}</p>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">
                Horários e Restrições
              </p>
              <div>
                <p>Checkin: {place.checkin}</p>
                <p>Checkout: {place.checkout}</p>
                <p>Máximo de convidados: {place.guests}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold sm:text-2xl">Diferenciais</p>
              <div className="flex flex-col gap-2">
                {place.perks.map((perk) => (
                  <div className="flex items-center gap-2" key={perk}>
                    <Perk perk={perk}></Perk>{" "}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {booking && booking.length > 0 ? (
            ""
          ) : (
            <form className="order-1 flex flex-col gap-4 self-center justify-self-center rounded-2xl border border-gray-300 px-4 py-3 sm:px-8 sm:py-4 md:order-0">
              <p className="text-center text-lg font-bold text-green-700 sm:text-2xl">
                <span className="font-semibold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(place.price) || 0)}
                </span>{" "}
                <span className="text-gray-900 font-stretch-50% underline">
                  por noite
                </span>
              </p>

              {/* Checkin e Checkout */}
              <div className="flex flex-col sm:flex-row">
                <div className="rounded-tl-2xl rounded-tr-2xl border border-gray-300 px-4 py-2 sm:rounded-tr-none sm:rounded-bl-2xl">
                  <p className="font-bold">Checkin</p>
                  <input
                    className="w-full sm:w-auto"
                    type="date"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </div>
                <div className="rounded-br-2xl rounded-bl-2xl border border-t-0 border-gray-300 px-4 py-2 sm:rounded-tr-2xl sm:rounded-bl-none sm:border-t sm:border-l-0">
                  <p className="font-bold">Checkout</p>
                  <input
                    className="w-full sm:w-auto"
                    type="date"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex flex-col gap-2 rounded-2xl border border-gray-300 px-4 py-2">
                <p className="font-bold">N° de convidados</p>
                <input
                  type="number"
                  className="rounded-2xl border border-gray-300 px-4 py-2"
                  placeholder="0"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>

              {user ? (
                <button
                  className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-center font-bold text-white"
                  onClick={handleBookin}
                >
                  Reservar
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-primary-400 w-full cursor-pointer rounded-full border border-gray-300 px-4 py-2 text-center font-bold text-white"
                >
                  Faça o login
                </Link>
              )}
            </form>
          )}
        </div>
        {/* Extras */}
        <div className="flex flex-col gap-2 rounded-2xl bg-gray-100 p-6">
          <p className="text-2xl font-bold">Informações Extras</p>
          <p>{place.extras}</p>
        </div>
        {/* Overlay */}
        <div
          className={`${overlay ? "fixed" : "hidden"} inset-0 z-50 bg-black`}
        >
          <div className="relative flex h-full w-full items-center justify-center p-4">
            {(() => {
              const lastIndex = place.photos.length - 1;

              return (
                <>
                  <div className="flex h-full w-full items-center justify-center overflow-hidden">
                    <img
                      className="h-full w-full object-contain"
                      src={place.photos[image]}
                      alt={`Imagem ${image + 1} da acomodação`}
                    />
                  </div>

                  <button
                    onClick={() => setOverlay(false)}
                    className="absolute top-4 right-4 z-10 cursor-pointer text-white transition hover:text-gray-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 sm:size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  {image > 0 && (
                    <button
                      className="absolute left-2 flex aspect-square w-4 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 font-bold text-white transition hover:scale-105 sm:w-8"
                      onClick={prevImage}
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
                          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                        />
                      </svg>
                    </button>
                  )}
                  {image < lastIndex && (
                    <button
                      className="absolute right-2 flex aspect-square w-4 cursor-pointer items-center justify-center rounded-full border-2 border-gray-200 font-bold text-white transition hover:scale-105 sm:w-8"
                      onClick={nextImage}
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
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Place;
