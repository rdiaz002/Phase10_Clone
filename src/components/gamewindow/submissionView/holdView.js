import React from "react";
import Card from "../../card";
const HoldView = (props) => {
  return (
    <>
      <div>
        <h2 style={{ color: "white", textDecoration: "underline" }}>
          Completed Stacks
        </h2>
        {props.holdDeck.map((stack) => (
          <div className="Container">
            {stack.deck.map((card, index) => (
              <Card card={card} index={index} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default HoldView;
