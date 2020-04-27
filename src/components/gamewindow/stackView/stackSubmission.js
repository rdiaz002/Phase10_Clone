import React, { useEffect, useState } from "react";

import * as utils from "../../../utils";
const StackSubmission = (props) => {
  //TODO: add display to show card submission for stack.
  //TODO: add logic to check cards.
  //TODO: add logic to submit cards onto stack.
  //TODO: make code easier to read.

  const [playerHand, setHand] = useState([]);
  useEffect(() => {
    setHand(utils.getPlayerHand());
  }, []);

  return (
    <div className="overlay">
      <button onClick={props.onSubmit}>Close</button>

      <button>{props.bundle.stack.desc}</button>
      <div className="SubContainer">
        {playerHand.map((card, index) => (
          <div className="Card" key={index} id={index}>
            <h2>{card.type}</h2>
            <h1>{card.number}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackSubmission;
