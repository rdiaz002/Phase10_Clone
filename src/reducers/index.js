import { combineReducers } from "redux";
import chatLog from "./chat";
import {
  playerName,
  playerID,
  hostID,
  playerList,
  playerHand,
  playerState,
} from "./playerinfo";
import { gameState, currentPlayer, discardPile, phases } from "./gamestate";

export default combineReducers({
  playerName,
  playerID,
  hostID,
  playerList,
  chatLog,
  gameState,
  playerState,
  playerHand,
  currentPlayer,
  discardPile,
  phases,
});
