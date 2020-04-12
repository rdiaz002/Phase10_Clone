import React from "react";
import { requestPickup } from "../../api";
import * as utils from "../../utils";
const PickUpDeck = (props) => {
  const handlePickup = () => {
    if (utils.isCurrentPlayer() && props.playerState == "PICKUP") {
      requestPickup();
    }
  };

  return (
    <div className="Card" onClick={handlePickup}>
      <h1>DECK</h1>
    </div>
  );
};
export default PickUpDeck;
