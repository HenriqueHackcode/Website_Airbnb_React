import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AccPlaces = () => {
  // const { action } = useParams(); // 👈 REMOVIDO: Este componente só deve ser a lista
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/places/owner");
      setPlaces(data);
    };

    axiosGet();
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
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
              <p className="text-xl font-medium">{place.title}</p>
              <p>{place.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccPlaces;
