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
    <div className="flex flex-col items-center gap-4">
      <p>
        Logado com {user.name} ({user.email})
      </p>
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
