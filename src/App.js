import React, { useEffect } from "react";
import "./App.css";
import { setupClient, setupHand } from "./api";

import Chat from "./containers";
import Dashboard from "./containers/dashboard";
import * as actions from "./actions";
import NameWindow from "./components/namewindow";
import Game from "./components/gamewindow/game";

const App = ({ dispatch, state }) => {
  const setGlobalState = (serverState) => {
    dispatch(actions.updateHostID(serverState.hostID));
    dispatch(actions.updatePlayerList(serverState.playerList));
    dispatch(actions.updateGameState(serverState.gameState));
    dispatch(actions.updateCurrentPlayer(serverState.currentPlayer));
    dispatch(actions.updateDiscardPile(serverState.discardPile));
  };

  const setGlobalHand = (hand) => {
    dispatch(actions.updatePlayerHand(hand));
  };

  const setPlayerID = (id) => {
    dispatch(actions.updatePlayerID(id));
  };

  useEffect(() => {
    setupClient(setGlobalState, setPlayerID);
    setupHand(setGlobalHand);
  }, []);
  console.log(state);
  return (
    <div className="App">
      {state.gameState == "FULL" ? (
        <h1>GAME IN PROGRESS</h1>
      ) : (
        <>
          <Dashboard />
          <Game />
          <Chat />
          {state.playerName == "" ? (
            <NameWindow className="overlay" dispatch={dispatch} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default App;
