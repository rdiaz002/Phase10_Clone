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

export const getPlayerHand = () => {
  const state = store.getState();
  return [...state.playerHand];
};

export const getPlayerList = () => {
  const state = store.getState();
  return state.playerList;
};

export const isPhaseComplete = () => {
  const state = store.getState();
  return (
    state.playerList.find((player) => player.id == state.playerID).phaseState ==
    "COMPLETE"
  );
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
      } else if (initial.number == card.number) {
        cond = cond && true;
      } else {
        cond = cond && false;
      }
    });

    return cond;
  },
  (cards = [], size) => {
    if (cards.length < size) {
      return false;
    }
    var tempCards = [...cards];
    var initial;
    var cond = true;
    var wildCount = 0;
    var wildEnd = 0;
    customSort(tempCards);

    tempCards.forEach((card, index) => {
      if (initial == null) {
        if (card.type == "Wild") {
          cond = cond && true;
          wildCount++;
          wildEnd = index + 1;
          return;
        } else if (card.type == "Skip") {
          cond = cond && false;
          return;
        } else {
          initial = parseInt(card.number);
          if (initial - wildCount <= 0) {
            cond = cond && false;
            return;
          } else {
            for (var i = wildEnd - wildCount; i < wildEnd; i++) {
              cards[i].number = initial - wildCount + i;
            }
          }
          cond = cond && true;
        }
      } else {
        if (card.type == "Wild") {
          initial++;
          card.number = initial;
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

    if (cond) {
      cards = tempCards;
    }

    return cond;
  },
  (cards ,size)=>{
    var initialColor;
    var cond=true;
    cards.forEach((card)=>{
      if(!initialColor){
        switch(card.type){
          case "Wild":
            cond = cond && true;
            break;
          case "Skip":
            cond = cond && false;
            break;
          default:
            initialColor=card.type;
            cond = cond && true;
            break;
        }
      }else{
        switch(card.type){
          case "Wild":
            cond = cond && true;
            break;
          case "Skip":
            cond = cond && false;
            break;
          default:
            cond = cond && (card.type==initialColor?true:false);
            break;
        }
      }
    })
    return cond;
  },
];

const customSort = (cards) => {
  var indeces = [];
  var buff = [];
  var numBuff = [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].number == 0) {
      indeces.push(i);
    }
  }
  buff = cards.filter((card) => card.number == 0);
  numBuff = cards.filter((card) => card.number > 0);

  numBuff.sort((first, second) => first.number > second.number);

  for (var i = 0, j = 0; indeces.length > 0; ) {
    if (j < numBuff.length && indeces[0] > j) {
      j++;
    } else if (j < numBuff.length && indeces[0] <= j) {
      numBuff.splice(j, 0, buff.pop());
      j++;
      indeces.splice(0, 1);
    } else {
      numBuff.push(buff.pop());
      indeces.splice(0, 1);
    }
  }
};
