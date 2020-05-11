import React, { useEffect } from "react";
import "./App.css";
import { setupClient, setupHand, setupNotifications } from "./api";
import "../node_modules/react-toastify/dist/ReactToastify.css";
import Chat from "./containers";
import Dashboard from "./containers/dashboard";
import * as actions from "./actions";
import NameWindow from "./components/namewindow";
import Game from "./components/gamewindow/game";
import { toast } from "react-toastify";

const App = ({ dispatch, state }) => {
  const setGlobalState = (serverState) => {
    dispatch(actions.updateHostID(serverState.hostID));
    dispatch(actions.updatePlayerList(serverState.playerList));
    dispatch(actions.updateGameState(serverState.gameState));
    dispatch(actions.updateCurrentPlayer(serverState.currentPlayer));
    dispatch(actions.updateDiscardPile(serverState.discardPile));
    dispatch(actions.updatePhases(serverState.phases));
  };
  const setGlobalHand = (hand) => {
    dispatch(actions.updatePlayerHand(hand));
  };

  const setPlayerID = (id) => {
    dispatch(actions.updatePlayerID(id));
  };

  const stateChangeCB = (state = "") => {
    dispatch(actions.updatePlayerState(state));
  };

  const setupNoti = (msg, level = "info") => {
    toast(msg, {autoClose:2000, type:level});
  };

  useEffect(() => {
    setupClient(setGlobalState, setPlayerID, stateChangeCB);
    setupHand(setGlobalHand);
    setupNotifications(setupNoti);
  }, []);

  return (
    <div className="App">
      {state.gameState == "FULL" ? (
        <h1>GAME IN PROGRESS</h1>
      ) : (
        <>
        {state.gameState=="WAITING"?<Dashboard/>:null}
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
