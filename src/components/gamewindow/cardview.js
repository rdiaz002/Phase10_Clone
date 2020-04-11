import React, { useEffect } from "react";
import { requestHand, requestDiscard } from "../../api";
import * as utils from "../../utils";

const CardView = ({ playerHand, playerState, currentPlayer }) => {
  useEffect(() => {
    requestHand();
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();

    //TODO:add local player state for picking up and discarding to keep playerhand constant sized.
    if (utils.isCurrentPlayer()) {
      requestDiscard(playerHand[e.currentTarget.id]);
    }
  };

  //TODO:Create Card Look in CSS
  return (
    <div className="CardView">
      <div
        className={
          utils.isCurrentPlayer() ? "Container Turn" : "Container NoGo"
        }
      >
        {playerHand.map((card, index) => (
          <div className="Card" key={index} id={index} onClick={handleOnClick}>
            <h2>{card.type}</h2>
            <h1>{card.number}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardView;
