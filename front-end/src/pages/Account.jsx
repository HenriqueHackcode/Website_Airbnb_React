import { Link, Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import React from "react";
import AccProfile from "../components/AccProfile";
import AccPlaces from "../components/AccPlaces";
import NewPlace from "../components/NewPlace";
import AccBookings from "../components/AccBookings";

const Account = () => {
  const { subpage, action, id } = useParams();
  const { user, ready } = useUserContext();

  if (!user && ready) return <Navigate to="/login" />;

  let activeSubpage = subpage;
  if (activeSubpage === undefined) {
    activeSubpage = "profile";
  }

  const buttonClass = (button) => {
    let finalClass =
      "hover:bg-primary-400 cursor-pointer rounded-full px-4 py-2 transition hover:text-white";

    if (button === activeSubpage) finalClass += " bg-primary-400 text-white";
    return finalClass;
  };

  let content = <AccProfile />;

  if (activeSubpage === "places") {
    if (action === "new" || id) {
      content = <NewPlace />;
    } else {
      content = <AccPlaces />;
    }
  }

  if (activeSubpage === "bookings") {
    content = <AccBookings />;
  }

  if (activeSubpage === "profile") {
    content = <AccProfile />;
  }

  return (
    <section className="px-3 sm:p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 pt-6">
        <div className="flex gap-2">
          <Link to="/account/profile" className={buttonClass("profile")}>
            {" "}
            Perfil
          </Link>
          <Link to="/account/bookings" className={buttonClass("bookings")}>
            Reservas
          </Link>
          <Link to="/account/places" className={buttonClass("places")}>
            Lugares
          </Link>
        </div>

        {content}
      </div>
    </section>
  );
};

export default Account;
