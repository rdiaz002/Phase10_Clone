import { store } from "../store";

export const isHost = () => {
  const state = store.getState();
  return state.hostID == state.playerID;
};

export const isCurrentPlayer = () => {
  const state = store.getState();
  return state.currentPlayer == state.playerID;
};

export const arePlayersReady = () => {
  const state = store.getState();
  if (state.playerList.length < 2) {
    return false;
  }
  var ready = !state.playerList.some((player) => {
    return player.STATE == "NOT_READY";
  });

  return ready;
};
