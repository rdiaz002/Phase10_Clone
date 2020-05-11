import React, { useState, useEffect } from "react";
import * as utils from "../../../utils";
import HoldView from "./holdView";
import { submitPhase } from "../../../api";
import Card from "../../card";
import { toast } from "react-toastify";

const Submission = (props) => {
  const [subDeck, setSubDeck] = useState([]);
  const [holdDeck, setHoldDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);

  useEffect(() => {
    props.currentPhases.patterns.forEach((pattern) => {
      holdDeck.push({ desc: pattern.desc, funcID: pattern.funcID, deck: [] });
    });
    setPlayerHand(utils.getPlayerHand());
  }, []);

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setSubDeck([...subDeck, playerHand[e.currentTarget.id]]);
    playerHand.splice(e.currentTarget.id, 1);
  };

  const returnCard = (e) => {
    e.preventDefault();
    playerHand.push(subDeck[e.currentTarget.id]);
    subDeck.splice(e.currentTarget.id, 1);
    setSubDeck([...subDeck]);
  };

  const handleCheck = (index, funcid, minsize, e) => {
    e.preventDefault();
    if (utils.checks[funcid](subDeck, minsize)) {
      if (holdDeck[index].deck.length > 0) {
        holdDeck[index].deck.forEach((card) => {
          playerHand.push(card);
        });
        holdDeck[index].deck = subDeck;
      } else {
        holdDeck[index].deck = [...subDeck];
      }
      setSubDeck([]);
    } else {
      subDeck.forEach((card) => {
        playerHand.push(card);
      });
      setSubDeck([]);
    }
  };

  const handlePhaseSubmit = (e) => {
    var res = holdDeck.reduce((prev, stack) => {
      if (stack.deck.length > 0) {
        return prev && true;
      } else {
        return prev && false;
      }
    }, true);

    if (res) {
      submitPhase(holdDeck);
      toast("Phase Completed", { type: "success", autoClose: 1000 });
      props.onSubmit(e);
    } else {
      toast("Must complete all stacks before submission.", {
        type: "error",
        autoClose: 1000,
      });
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
              <Card card={card} index={index} click={returnCard} />
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
          {playerHand.map((card, index) => (
            <Card card={card} index={index} click={handleCardSubmit} />
          ))}
        </div>
        <HoldView holdDeck={holdDeck} />
        <button onClick={handlePhaseSubmit}>Submit Phase</button>
      </div>
    </>
  );
};

export default Submission;
