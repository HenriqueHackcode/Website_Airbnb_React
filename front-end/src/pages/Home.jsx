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
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 px-8 py-8">
        {places.map((place) => (
          <Item {...{ place }} key={place._id} />
        ))}
      </div>
    </section>
  );
};

export default Home;
