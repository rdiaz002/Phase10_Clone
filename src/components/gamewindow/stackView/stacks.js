import React, { useState } from "react";
import StackSubmission from "./stackSubmission";

//TODO: replace stacks placeholder with cards.
const PlayerStacks = ({ playerList }) => {
  console.log(playerList);
  const [showStkSub, setStkSub] = useState(false);
  const [bundle, setBundle] = useState({});

  const handleStackClick = (e, playerID, stackInd) => {
    var ownerID = playerID;
    var stack = playerList.find((player) => player.id == playerID).phaseStacks[
      stackInd
    ];
    setStkSub(!showStkSub);
    setBundle({ ownerID, stack });
  };

  const handleSubmit = () => {
    setStkSub(!showStkSub);
  };
  return (
    <div className="StacksView">
      {playerList.map((player, index) => (
        <div key={index} className="">
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
                {stack.deck.map((card) => (
                  <div className="Card">
                    <h2>{card.type}</h2>
                    <h2>{card.number}</h2>
                  </div>
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
