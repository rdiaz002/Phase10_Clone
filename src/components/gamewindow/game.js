import React, { useEffect } from "react";
import Menu from "./menu";
import CardView from "../../containers/cardview";
import DiscardPile from "../../containers/discardpile";
import PlayerStacks from "../../containers/stacks";
import Dashboard from "../../containers/dashboard";
import Chat from "../../containers";
import NameWindow from "../../components/namewindow";
import { setupClient, setupHand, setupNotifications } from "../../api";
import { toast } from "react-toastify";
import * as actions from "../../actions";

const Game = ({ dispatch, state }) => {
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
    toast(msg, { autoClose: 2000, type: level });
  };

  useEffect(() => {
    setupClient(setGlobalState, setPlayerID, stateChangeCB);
    setupHand(setGlobalHand);
    setupNotifications(setupNoti);
  }, []);

  return (
    <div className="Game">
      {state.gameState == "FULL" ? (
        <h1>GAME IN PROGRESS</h1>
      ) : state.gameState == "Running" ? (
        <>
          <PlayerStacks />
          <DiscardPile />
          <CardView />
          <Chat />
        </>
      ) : (
        <>
          {state.playerName == "" && state.gameState == "WAITING" ? (
            <NameWindow className="overlay" dispatch={dispatch} />
          ) : null}
          <Dashboard />
          <Menu />
          <Chat />
        </>
      )}
    </div>
  );
};
export default Game;
