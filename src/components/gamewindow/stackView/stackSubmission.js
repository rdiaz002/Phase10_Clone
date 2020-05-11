import React, { useEffect, useState } from "react";
import Card from "../../card";
import * as utils from "../../../utils";
import * as api from "../../../api";
const StackSubmission = (props) => {
  //TODO: make code easier to read.

  const [playerHand, setHand] = useState([]);
  var addToFront = false;
  useEffect(() => {
    setHand(utils.getPlayerHand());
  }, []);

  const addCard = (e, index) => {
    var funcID = props.bundle.stack.funcID;
    var newCard = playerHand[index];

    var deck = addToFront
      ? [playerHand[index], ...props.bundle.stack.deck]
      : [...props.bundle.stack.deck, playerHand[index]];

    if (utils.checks[funcID](deck, deck.length)) {
      api.updateStack(
        props.bundle.ownerID,
        props.bundle.stackIndx,
        deck,
        newCard
      );
      playerHand.splice(index, 1);
      props.bundle.stack.deck.push(newCard);
      setHand(playerHand);
    } else {
      console.log("BAD CARD");
    }
  };

  return (
    <div className="overlay">
      <button onClick={props.onSubmit}>Close</button>
      <div className="Flex">
        <button
          onClick={(e) => {
            addToFront = true;
          }}
        >
          Front
        </button>
        <div className="SubContainer">
          {props.bundle.stack.deck.map((card, index) => (
            <Card card={card} index={index} />
          ))}
        </div>
        <button
          onClick={(e) => {
            addToFront = false;
          }}
        >
          Back
        </button>
      </div>
      <div className="SubContainer">
        {playerHand.map((card, index) => (
          <Card
            card={card}
            index={index}
            click={(e) => {
              addCard(e, index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StackSubmission;
