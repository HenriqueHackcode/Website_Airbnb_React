import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AccPlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/places/owner");
      setPlaces(data);
    };

    axiosGet();
  }, []);

  const navigate = useNavigate();
  const handleOnBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      <Link
        to="/account/places/new"
        className="bg-primary-400 hover:bg-primary-500 mb-4 flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-xs text-white transition md:px-4 md:py-2 md:text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7 md:size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Adicionar novo lugar
      </Link>
      <button
        onClick={handleOnBack}
        className="fixed top-45 left-0 cursor-pointer rounded-full p-2 transition hover:scale-105"
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

      <div className="flex flex-col items-center gap-6">
        {places.map((place) => (
          <Link
            to={`/account/places/new/${place._id}`}
            className="flex min-h-full min-w-full flex-col gap-3 rounded-2xl bg-gray-100 p-4 sm:w-auto sm:flex-row sm:items-center sm:gap-6"
            key={place._id}
          >
            <div className="flex flex-col gap-4 text-center text-sm md:text-lg">
              <p className="order-1 w-full text-xl font-semibold text-gray-700 sm:order-0 sm:w-auto">
                {place.title}
              </p>

              <img
                className="order-2 aspect-square w-full max-w-56 self-center rounded-2xl object-center sm:order-0 sm:w-auto sm:flex-none"
                src={place.photos[0]}
                alt="Foto da acomodação"
              />

              <p className="order-3 w-full sm:order-0 sm:w-auto">
                <span className="font-semibold text-gray-700">Descrição:</span>{" "}
                {place.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccPlaces;
