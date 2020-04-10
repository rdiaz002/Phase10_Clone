import React from "react";
import { requestPickup } from "../../api";
const PickUpDeck = () => {
  const handlePickup = () => {
    requestPickup();
  };

  return (
    <div className="Card" onClick={handlePickup}>
      <h1>DECK</h1>
    </div>
  );
};
export default PickUpDeck;
