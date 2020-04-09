import React from "react";
import Menu from "./menu";
import CardView from "../../containers/cardview";
import { store } from "../../store";
import DiscardPile from "../../containers/discardpile";
const Game = () => {
  const state = store.getState();

  return (
    <>
      {state.gameState == "Running" ? (
        <>
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
