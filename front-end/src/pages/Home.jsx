import React, { useEffect, useState } from "react";
import Item from "../components/Item";
import axios from "axios";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const axiosGet = async () => {
      const { data } = await axios.get("/places");
      setPlaces(data);
    };

    axiosGet();
  }, []);
  return (
    <section>
      <div className="mx-auto mt-2 grid max-w-7xl grid-cols-1 gap-8 p-4 sm:grid-cols-2 sm:px-8 sm:py-8 md:grid-cols-2 md:p-2 lg:grid-cols-4">
        {places.map((place) => (
          <Item {...{ place }} key={place._id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
