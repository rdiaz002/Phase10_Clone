import React from "react";
import PickUpDeck from "./pickupdeck";
import { requestPickupDiscard } from "../../api";
import * as utils from "../../utils";
const DiscardPile = ({ discardPile, playerState }) => {
  const handleOnClick = (e) => {
    if (utils.isCurrentPlayer() && playerState == "PICKUP") {
      requestPickupDiscard();
    }
  };

  return (
    <div className="Discard">
      <div className="DiscardContainer">
        {discardPile.map((item, index) => (
          <div className="DiscardCard" key={index} onClick={handleOnClick}>
            <h2>{item.type}</h2>
            <h2>{item.number}</h2>
          </div>
        ))}

        <PickUpDeck playerState={playerState} />
      </div>
    </div>
  );
};

export default DiscardPile;
