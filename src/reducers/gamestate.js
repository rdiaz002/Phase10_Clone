export const gameState = (state = "WAITING", action) => {
  switch (action.type) {
    case "UPDATE_GAMESTATE":
      return action.gameState;
    default:
      return state;
  }
};

export const currentPlayer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_TURN":
      return action.currentPlayer;
    default:
      return state;
  }
};

export const discardPile = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PILE":
      return action.discardPile;
    default:
      return state;
  }
};

export const phases = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PHASES":
      return action.phases;
    default:
      return state;
  }
};
