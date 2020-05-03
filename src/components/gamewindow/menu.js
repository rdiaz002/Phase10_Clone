import React from "react";
import * as util from "../../utils";
import * as api from "../../api";

const Menu = () => {
  //Create Check to make sure all players are ready.

  const handleStartClick = (e) => {
    e.preventDefault();
    if (util.arePlayersReady()) {
      api.startGame();
    }
  };

  const handleReadyClick = (e) => {
    e.preventDefault();
    api.updatePlayerState();
    e.target.disabled = true;
  };

  return (
    <>
      {util.isHost() ? (
        <button onClick={handleStartClick}>Start Game</button>
      ) : (
        <button onClick={handleReadyClick}>Ready</button>
      )}
    </>
  );
};

export default Menu;
