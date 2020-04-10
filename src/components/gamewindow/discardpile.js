import React from "react";
import PickUpDeck from "./pickupdeck";

const DiscardPile = ({ discardPile }) => {
  return (
    <div className="Discard">
      <div className="Container">
        <div className="Card">
          {discardPile.map((item) => (
            <>
              <h2>{item.type}</h2>
              <h2>{item.number}</h2>
            </>
          ))}
        </div>

        <PickUpDeck />
      </div>
    </div>
  );
};

export default DiscardPile;
