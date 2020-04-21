import React, { useState } from "react";

//TODO: Add onclick for cards in submission view.
//TODO: Add logic for server communication when checking stacks. 

const Submission = (props) => {
  const [subDeck, setSubDeck] = useState([]);

  const handleCardSubmit=(e)=>{
    e.preventDefault();
    setSubDeck([...subDeck,props.playerHand[e.currentTarget.id]]);
    props.playerHand.splice(e.currentTarget.id,1);
  }

  const returnCard=(e)=>{
    e.preventDefault();
    props.playerHand.push(subDeck[e.currentTarget.id])
    subDeck.splice(e.currentTarget.id,1);
    setSubDeck([...subDeck]);
  }

  return (
    <>
      <div className="SubmissionView">
      <div className="View">    
      <button onClick={props.onSubmit}>X</button>
      </div>
      <div className="SelectContainer">
          {subDeck.map((card, index) => (
            <div
              className="Card"
              key={index}
              id={index}
              onClick={returnCard}
            >
              <h2>{card.type}</h2>
              <h1>{card.number}</h1>
            </div>
          ))}
        </div>
        <div className="SubContainer">
          {props.playerHand.map((card, index) => (
            <div
              className="Card"
              key={index}
              id={index}
              onClick={handleCardSubmit}
            >
              <h2>{card.type}</h2>
              <h1>{card.number}</h1>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

export default Submission;
