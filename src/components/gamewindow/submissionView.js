import React, { useState, useEffect } from "react";
import * as utils from "../../utils";

//TODO: Add component to display correct stacks ready for phase completion.
//TODO: Add complete phase button for final stack submission.

const Submission = (props) => {
  const [subDeck, setSubDeck] = useState([]);
  const [holdDeck, setHoldDeck] = useState([]);
  useEffect(() => {
    props.currentPhases.patterns.forEach(() => {
      holdDeck.push([]);
    });
  }, []);

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setSubDeck([...subDeck, props.playerHand[e.currentTarget.id]]);
    props.playerHand.splice(e.currentTarget.id, 1);
  };

  const returnCard = (e) => {
    e.preventDefault();
    props.playerHand.push(subDeck[e.currentTarget.id]);
    subDeck.splice(e.currentTarget.id, 1);
    setSubDeck([...subDeck]);
  };

  const handleCheck = (index, funcid, minsize, e) => {
    e.preventDefault();
    if (utils.checks[funcid](subDeck, minsize)) {
      if(holdDeck[index].length>0){
        holdDeck[index].forEach((card)=>{props.playerHand.push(card)});
        holdDeck[index]=[];
      }else{
        holdDeck[index] = [...subDeck];
      }
      setSubDeck([]);
    } else {
      subDeck.forEach((card) => {
        props.playerHand.push(card);
      });
      setSubDeck([]);
    }
  };

  return (
    <>
      <div className="SubmissionView">
        <div className="View">
          <button key={0} onClick={props.onSubmit}>
            X
          </button>
        </div>
        <div className="SelectView">
          <div className="SelectContainer">
            {subDeck.map((card, index) => (
              <div className="Card" key={index} id={index} onClick={returnCard}>
                <h2>{card.type}</h2>
                <h1>{card.number}</h1>
              </div>
            ))}
          </div>
          <div className="ButtonDiv">
            {props.currentPhases.patterns.map((phase, index) => (
              <button
                key={index}
                id={index}
                onClick={(e) => {
                  handleCheck(index, phase.funcID, phase.size, e);
                }}
              >
                {phase.desc} {phase.size}
              </button>
            ))}
          </div>
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
