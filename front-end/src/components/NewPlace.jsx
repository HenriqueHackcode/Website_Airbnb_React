import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext.jsx";
import Perks from "./Perks";
import axios from "axios";
import PhotoUploader from "./PhotoUploader.jsx";

const NewPlace = () => {
  const { user } = useUserContext();
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [photolink, setPhotoLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // !photos.length > 0  &&
    if (
      title &&
      city &&
      description &&
      price &&
      checkin &&
      checkout &&
      guests
    ) {
      console.log("Todos estão preenchidos");
    } else {
      alert("Por favor, preencha todos os campos.");
    }

    try {
      const newPlace = await axios.post("/places", {
        owner: user._id,
        title,
        city,
        photos,
        description,
        extras,
        perks,
        price,
        checkin,
        checkout,
        guests,
      });
      console.log(newPlace.data);
      setRedirect(true);
    } catch (error) {
      console.error(JSON.stringify(error));
      alert("Erro ao cadastrar o novo lugar!");
    }
  };

  if (redirect) return <Navigate to={"/account/places"} />;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 px-8">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="ml-2 text-2xl font-bold">
          Título
        </label>
        <input
          type="text"
          placeholder="Digite o titulo do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="ml-2 text-2xl font-bold">
          Cidade e País
        </label>
        <input
          type="text"
          placeholder="Digite a cidade e país do seu anúncio"
          className="rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <PhotoUploader {...{ photolink, setPhotoLink, setPhotos, photos }} />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="ml-2 text-2xl font-bold">
          Descrição
        </label>
        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2 placeholder-gray-400"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="perks" className="ml-2 text-2xl font-bold">
          Comodidades
        </label>
        <Perks {...{ perks, setPerks }} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="extras" className="ml-2 text-2xl font-bold">
          Informações adicionais
        </label>
        <textarea
          placeholder="Digite a descrição do seu anúncio"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2 placeholder-gray-400"
          id="extras"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="ml-2 text-2xl font-bold">Restrições e Preço</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-6 pt-2">
          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="price">
              Preço
            </label>
            <input
              type="number"
              placeholder="0"
              className="grow rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkin">
              Checkin
            </label>
            <input
              type="text"
              placeholder="14:00"
              className="grow rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
              id="checkin"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="checkout">
              Checkout
            </label>
            <input
              type="text"
              placeholder="12:00"
              className="grow rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
              id="checkout"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="ml-2 text-xl font-bold" htmlFor="guests">
              N° convidados
            </label>
            <input
              type="number"
              placeholder="2"
              className="grow rounded-full border border-gray-300 px-4 py-2 placeholder-gray-400"
              id="guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-3">
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
            d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
          />
        </svg>
        <button className="w-max cursor-pointer self-end rounded-full bg-green-700 px-6 py-2 font-bold text-white transition hover:bg-green-800">
          Salvar Informações
        </button>
      </div>
    </form>
  );
};

export default NewPlace;
