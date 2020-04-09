import { combineReducers } from "redux";
import chatLog from "./chat";
import {
  playerName,
  playerID,
  hostID,
  playerList,
  playerHand,
} from "./playerinfo";
import { gameState, currentPlayer, discardPile } from "./gamestate";

export default combineReducers({
  playerName,
  playerID,
  hostID,
  playerList,
  chatLog,
  gameState,
  playerHand,
  currentPlayer,
  discardPile,
});