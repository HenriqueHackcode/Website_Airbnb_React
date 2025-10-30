import React from "react";
import { Link } from "react-router-dom";

const Item = ({ place }) => {
  return (
    <Link to={`/place/${place._id}`} className="flex flex-col gap-3">
      <img
        src={place.photos[0]}
        alt="Imagens"
        className="aspect-square rounded-2xl object-cover"
      />
      <div>
        <h3 className="text-xl font-semibold">{place.city}</h3>
        <p className="truncate text-gray-600">{place.description}</p>
      </div>
      <p className="text-green-700">
        <span className="font-semibold">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(place.price) || 0)}
        </span>
        {""} <span className="text-gray-600">por noite</span>
      </p>
    </Link>
  );
};

export default Item;
