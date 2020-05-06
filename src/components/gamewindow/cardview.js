import React, { useEffect, useState } from "react";
import { requestHand, requestDiscard } from "../../api";
import * as utils from "../../utils";
import Submission from "./submissionView/submissionView";
import Card from "../card";
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
            <Card card={card} index={index} click={handleOnClick} />
          ))}
        </div>
      </div>
      {showSubmit ? (
        <>
          <Submission
            onSubmit={handleSubmit}
            currentPhases={phases[currentPhase]}
          />
        </>
      ) : null}
      <button onClick={handleSubmit} hidden={!utils.isCurrentPlayer()}>
        Submit Phases
      </button>
    </>
  );
};

export default CardView;
