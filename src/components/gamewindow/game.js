import React from "react";
import Menu from "./menu";
import CardView from "../../containers/cardview";
import { store } from "../../store";
import DiscardPile from "../../containers/discardpile";
import PlayerStacks from "../../containers/stacks";

const Game = () => {
  const state = store.getState();

  return (
    <>
      {state.gameState == "Running" ? (
        <>
          <PlayerStacks />
          <DiscardPile />
          <CardView />
        </>
      ) : (
        <Menu />
      )}
    </>
  );
};
export default Game;
