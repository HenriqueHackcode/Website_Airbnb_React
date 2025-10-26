import { Link, Navigate, useParams } from "react-router-dom";
import React from "react";
import AccProfile from "../components/AccProfile";
import AccPlaces from "../components/AccPlaces";
import NewPlace from "../components/NewPlace"; // 👈 IMPORTANTE: Importe o formulário
import { useUserContext } from "../contexts/UserContext";

const Account = () => {
  // Captura os três parâmetros da rota no App.jsx
  const { subpage, action, id } = useParams();
  const { user, ready } = useUserContext();

  if (!user && ready) return <Navigate to="/login" />;

  // Define a subpágina ativa para o menu de navegação
  // Se a subpage estiver vazia (apenas /account), considera "profile" como padrão
  let activeSubpage = subpage;
  if (activeSubpage === undefined) {
    activeSubpage = "profile";
  }

  const buttonClass = (button) => {
    let finalClass =
      "hover:bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition hover:text-white";
    // Usa activeSubpage para aplicar a classe
    if (button === activeSubpage) finalClass += " bg-primary-400 text-white";
    return finalClass;
  };

  // --- LÓGICA DE RENDERIZAÇÃO MODIFICADA ---
  let content = <AccProfile />; // Conteúdo padrão (Perfil)

  // Se a subpágina for "places"
  if (activeSubpage === "places") {
    // Se a rota for /account/places/new ou /account/places/ID (edição)
    // O parâmetro 'action' ou 'id' estará presente
    if (action === "new" || id) {
      content = <NewPlace />; // Renderiza o formulário
    } else {
      content = <AccPlaces />; // Renderiza a lista de lugares (/account/places)
    }
  }
  // Se a subpágina for "bookings"
  if (activeSubpage === "bookings") {
    content = <div>Minhas Reservas. (Componente Bookings deve vir aqui)</div>;
  }

  // Se a subpágina for "profile" (inclui a rota base /account)
  if (activeSubpage === "profile") {
    content = <AccProfile />;
  }
  // ----------------------------------------

  return (
    <section className="p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
        <div className="flex gap-2">
          <Link to="/account" className={buttonClass("profile")}>
            {" "}
            {/* Rota base simples */}
            Perfil
          </Link>
          <Link to="/account/bookings" className={buttonClass("bookings")}>
            Reservas
          </Link>
          <Link to="/account/places" className={buttonClass("places")}>
            Lugares
          </Link>
        </div>

        {/* Renderiza o conteúdo decidido pela lógica acima */}
        {content}
      </div>
    </section>
  );
};

export default Account;
