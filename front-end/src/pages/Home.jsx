import React from "react";
import Item from "../components/Item";

const Home = () => {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 px-8 py-8">
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </section>
  );
};

export default Home;
