import React, { useState, useEffect } from "react";
import requester from "easier-requests";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors();
  });

  async function getColors() {
    try {
      const id = requester.createUniqueID();
      await requester.get(`http://localhost:5000/api/colors`, id);
      setColorList(requester.response(id).data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
