import React from "react";
import PickUpDeck from "./pickupdeck";
import { requestPickupDiscard } from "../../api";
import * as utils from "../../utils";
import Card from "../card";
const DiscardPile = ({ discardPile, playerState }) => {
  const handleOnClick = (e) => {
    if (utils.isCurrentPlayer() && playerState == "PICKUP") {
      requestPickupDiscard();
    }
  };

  return (
    <div className="Discard">
      <div className="DiscardContainer">
        {discardPile.map((card, index) => (
          <Card card={card} index={index} click={handleOnClick} />
        ))}

        <PickUpDeck playerState={playerState} />
      </div>
    </div>
  );
};

export default DiscardPile;
