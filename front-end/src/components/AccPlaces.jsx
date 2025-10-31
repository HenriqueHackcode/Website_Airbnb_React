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
        className="bg-primary-400 hover:bg-primary-500 mb-4 flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-white transition"
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
        Adicionar novo lugar
      </Link>
      <div className="absolute top-0 left-0">
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

      <div className="flex flex-col items-center gap-6">
        {places.map((place) => (
          <Link
            to={`/account/places/new/${place._id}`}
            className="flex items-center gap-6 rounded-2xl bg-gray-100 p-4"
            key={place._id}
          >
            <img
              className="aspect-square max-w-56 rounded-2xl object-center"
              src={place.photos[0]}
              alt="Foto da acomodação"
            />
            <div className="flex flex-col gap-6">
              <p className="text-xl font-semibold text-gray-700">
                {place.title}
              </p>
              <p>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccPlaces;
