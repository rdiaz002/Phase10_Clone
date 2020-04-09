import React, { useEffect } from "react";
import { requestHand } from "../../api";

const CardView = ({ playerHand }) => {
  useEffect(() => {
    requestHand();
  }, []);

  const handleOnClick = e => {
    console.log(e.currentTarget);
  };

  //TODO:Create Card Look in CSS
  return (
    <div className="CardView">
      <div className="Container">
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
