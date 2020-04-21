import React, { useEffect, useState } from "react";
import { requestHand, requestDiscard } from "../../api";
import * as utils from "../../utils";
import Submission from "./submissionView";

//TODO: Add default phases to passed in states.
//TODO: implement logic to place cards on others stacks.

const CardView = ({ playerHand, playerState, phases }) => {
  const [showSubmit, setShowSubmit] = useState(false);
  const currentPhase = utils.getCurrentPhase();
  useEffect(() => {
    requestHand();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSubmit(!showSubmit);
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    if (utils.isCurrentPlayer() && playerState == "DISCARD") {
      requestDiscard(playerHand[e.currentTarget.id]);
    }
  };
  return (
    <>
      <div className="CardView">
        <div
          className={
            utils.isCurrentPlayer() ? "Container Turn" : "Container NoGo"
          }
        >
          {playerHand.map((card, index) => (
            <div
              className="Card"
              key={index}
              id={index}
              onClick={handleOnClick}
            >
              <h2>{card.type}</h2>
              <h1>{card.number}</h1>
            </div>
          ))}
        </div>
      </div>
      {showSubmit ? (
        <>
          <Submission playerHand={[...playerHand]} onSubmit={handleSubmit} currentPhases={phases[currentPhase]}/>
        </>
      ) : null}
      <button onClick={handleSubmit} hidden={!utils.isCurrentPlayer()}>
        Submit Phases
      </button>
    </>
  );
};

export default CardView;
