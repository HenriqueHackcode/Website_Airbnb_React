import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export const UserContext = createContext(null);
export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/users/profile");

      setUser(data);
      setReady(true);
    };
    axiosGet();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
