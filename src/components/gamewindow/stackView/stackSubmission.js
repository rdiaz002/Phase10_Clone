import React, { useEffect, useState } from "react";

import * as utils from "../../../utils";
import * as api from "../../../api";
const StackSubmission = (props) => {
  //TODO: add display to show card submission for stack.
  //TODO: add logic to check cards.
  //TODO: add logic to submit cards onto stack.
  //TODO: make code easier to read.

  const [playerHand, setHand] = useState([]);
  useEffect(() => {
    setHand(utils.getPlayerHand());
  }, []);

  const addCard=(e,index)=>{
    var funcID= props.bundle.stack.funcID;
    var newCard= playerHand[index];
    var deck = [...props.bundle.stack.deck,playerHand[index]];

    if(utils.checks[funcID](deck,deck.length)){
      //TODO: send new card to player stack and update server. 
      api.updateStack(props.bundle.ownerID,props.bundle.stackIndx,deck,newCard);
      playerHand.splice(index,1);
      setHand(playerHand);
    }else{
      console.log("BAD CARD");
    }
  }

  return (
    <div className="overlay">
      <button onClick={props.onSubmit}>Close</button>

      <div className="SubContainer">
        {props.bundle.stack.deck.map((card, index) => (
          <div className="Card" key={index} id={index}>
            <h2>{card.type}</h2>
            <h1>{card.number}</h1>
          </div>
        ))}
      </div>
      <div className="SubContainer">
        {playerHand.map((card, index) => (
          <div className="Card" key={index} id={index} onClick={(e)=>{addCard(e,index)}}>
            <h2>{card.type}</h2>
            <h1>{card.number}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackSubmission;
