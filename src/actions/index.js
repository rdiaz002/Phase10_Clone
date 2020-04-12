const updateChat_t = "UPDATE_CHAT";
const updatePlayerName_t = "UPDATE_NAME";
const updatePlayerID_t = "UPDATE_ID";
const updateHostID_t = "UPDATE_HOSTID";
const updatePlayerList_t = "UPDATE_PLAYERLIST";
const updateGameState_t = "UPDATE_GAMESTATE";
const updatePlayerHand_t = "UPDATE_PLAYERHAND";
const updateCurrentPlayer_t = "UPDATE_TURN";
const updateDiscardPile_t = "UPDATE_PILE";
const updatePlayerState_t = "UPDATE_PLAYERSTATE";

export const updateChat = (msg) => ({
  type: updateChat_t,
  msg,
});

export const updatePlayerID = (id) => ({
  type: updatePlayerID_t,
  id,
});

export const updatePlayerName = (name) => ({
  type: updatePlayerName_t,
  name,
});

export const updateHostID = (hostID) => ({
  type: updateHostID_t,
  hostID,
});

export const updatePlayerList = (playerList) => ({
  type: updatePlayerList_t,
  playerList,
});

export const updateGameState = (gameState) => ({
  type: updateGameState_t,
  gameState,
});

export const updatePlayerHand = (hand) => ({
  type: updatePlayerHand_t,
  hand,
});

export const updateCurrentPlayer = (currentPlayer) => ({
  type: updateCurrentPlayer_t,
  currentPlayer,
});

export const updateDiscardPile = (discardPile) => ({
  type: updateDiscardPile_t,
  discardPile,
});

export const updatePlayerState = () => ({
  type: updatePlayerState_t,
});
