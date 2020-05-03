export const playerName = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return action.name;
    default:
      return state;
  }
};

export const playerID = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_ID":
      return action.id;
    default:
      return state;
  }
};

export const hostID = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_HOSTID":
      return action.hostID;
    default:
      return state;
  }
};

export const playerList = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PLAYERLIST":
      return action.playerList;
    default:
      return state;
  }
};

export const playerHand = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_PLAYERHAND":
      return action.hand;
    default:
      return state;
  }
};

export const playerState = (state = "PICKUP", action) => {
  switch (action.type) {
    case "UPDATE_PLAYERSTATE":
      if (action.playerState != "") {
        return action.playerState;
      } else if (state == "DISCARD") {
        return "PICKUP";
      } else {
        return "DISCARD";
      }
    default:
      return state;
  }
};
