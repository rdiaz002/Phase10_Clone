import React from "react";
import PickUpDeck from "./pickupdeck";
import { requestPickupDiscard } from "../../api";
import * as utils from "../../utils";
import Card from "../card";
import PhaseCard from "./phasecard";
const DiscardPile = ({ discardPile, playerState }) => {
  const handleOnClick = (e) => {
    if (utils.isCurrentPlayer() && playerState == "PICKUP") {
      requestPickupDiscard();
    }
  };

  return (
    <div className="Discard">
      <PhaseCard />
      <div className="FlexColumn">
        <h3>Discard Pile</h3>
        <div className="DiscardContainer">
          {discardPile.map((card, index) => (
            <Card card={card} key={index} index={index} click={handleOnClick} />
          ))}
        </div>
      </div>
      <PickUpDeck playerState={playerState} />
    </div>
  );
};

export default DiscardPile;
