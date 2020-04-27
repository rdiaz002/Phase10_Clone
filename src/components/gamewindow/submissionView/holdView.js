import React from "react";

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
              <div className="Card" key={index} id={index}>
                <h2>{card.type}</h2>
                <h1>{card.number}</h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default HoldView;
