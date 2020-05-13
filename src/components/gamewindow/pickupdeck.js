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
    <div className="Deck" onClick={handlePickup}>
      <h2>DECK</h2>
    </div>
  );
};
export default PickUpDeck;
