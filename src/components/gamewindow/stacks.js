import React from "react";

//TODO: replace stacks placeholder with cards. 
const PlayerStacks = ({ playerList }) => {
  console.log(playerList);
  return (
    <div className="StacksView">
      {playerList.map((player) => (
        <div className="StackContainer">
          <div>
            <h2>{player.name}</h2>
            <h4>phase: {player.phase}</h4>
          </div>
          <div className="Stack">
            <h3>Stacks</h3> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStacks;
