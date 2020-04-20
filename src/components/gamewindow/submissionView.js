import React, { useState } from "react";

//TODO: Add onclick for cards in submission view.
//TODO: Add logic for server communication when checking stacks. 

const Submission = (props) => {
  const [subDeck, setSubDeck] = useState([]);

  return (
    <>
      <div className="SubmissionView">
      <div className="View">    
      <button onClick={props.onSubmit}>X</button>
      </div>
        <div className="SubContainer">
          {props.playerHand.map((card, index) => (
            <div
              className="Card"
              key={index}
              id={index}
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
