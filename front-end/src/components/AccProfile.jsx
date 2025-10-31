import { useUserContext } from "../contexts/UserContext";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AccProfile = () => {
  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/users/logout");
      console.log(data);
      setUser(null);
      setRedirect(true);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  if (redirect) return <Navigate to={"/"} />;

  if (!user) return <></>;
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 px-14 py-6">
      <p className="font-semibold">
        Bem vindo:&nbsp;{" "}
        <span className="text-xl text-gray-500">{user.name}</span>
      </p>
      <div>
        <div className="flex items-center text-gray-900">
          <span className="font-semibold">Email: </span>&nbsp; {user.email}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#00af54"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-primary-400 hover:bg-primary-500 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AccProfile;
