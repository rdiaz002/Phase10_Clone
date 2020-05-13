import React, { useState } from "react";
import StackSubmission from "./stackSubmission";
import { isCurrentPlayer, isPhaseComplete } from "../../../utils";
import Card from "../../card";
const PlayerStacks = ({ playerList }) => {
  const [showStkSub, setStkSub] = useState(false);
  const [bundle, setBundle] = useState({});

  const handleStackClick = (e, playerID, stackIndx) => {
    if (isCurrentPlayer() && isPhaseComplete()) {
      var ownerID = playerID;
      var stack = playerList.find((player) => player.id == playerID)
        .phaseStacks[stackIndx];
      setStkSub(!showStkSub);
      setBundle({ ownerID, stack, stackIndx });
    }
  };

  const handleSubmit = () => {
    setStkSub(!showStkSub);
  };
  return (
    <div className="StacksView">
      {playerList.map((player, index) => (
        <div key={index} className="StackUnit">
          <div>
            <h2>{player.name}</h2>
            <h4>phase: {player.phase}</h4>
          </div>
          <div className="Stack">
            {player.phaseStacks.map((stack, index) => (
              <div
                className="StackContainer"
                onClick={(e) => {
                  handleStackClick(e, player.id, index);
                }}
              >
                {stack.deck.map((card, index) => (
                  <Card card={card} index={index} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      {showStkSub ? (
        <StackSubmission bundle={bundle} onSubmit={handleSubmit} />
      ) : null}
    </div>
  );
};

export default PlayerStacks;
