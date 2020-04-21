import { store } from "../store";

export const isHost = () => {
  const state = store.getState();
  return state.hostID == state.playerID;
};

export const getCurrentPhase = () => {
  const state = store.getState();
  const playerPhase = state.playerList.find(
    (player) => player.id == state.playerID
  ).phase;
  return playerPhase;
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
export const checks = [
  (cards = [], size) => {
    if (cards.length < size) {
      return false;
    }
    var initial;
    var cond = true;

    cards.forEach((card) => {
      if (card.type == "Wild") {
        cond = cond && true;
        return;
      } else if (card.type == "Skip") {
        cond = cond && false;
        return;
      }

      if (initial == null) {
        initial = card;
        cond = cond && true;
        console.log("init", initial, cond);
      } else if (initial.number == card.number) {
        cond = cond && true;
        console.log("match", initial, cond);
      } else {
        cond = cond && false;
        console.log("mismatch", initial, cond);
      }
    });

    return cond;
  },
  (cards = [], size) => {
    if (cards.length < size) {
      return false;
    }
    var initial;
    var cond = true;

    cards.forEach((card) => {
      if (initial == null) {
        if (card.type == "Wild") {
          cond = cond && true;
          return;
        } else if (card.type == "Skip") {
          cond = cond && false;
          return;
        } else {
          initial = parseInt(card.number);
          cond = cond && true;
        }
      } else {
        if (card.type == "Wild") {
          initial++;
          cond = cond && true;
        } else if (card.type == "Skip") {
          cond = cond && false;
          return;
        } else {
          var val = parseInt(card.number);
          if (val == initial + 1) {
            cond = cond && true;
            initial = val;
          } else {
            cond = cond && false;
          }
        }
      }
    });
    return cond;
  },
];
