const chatLog = (state = [], action) => {
  switch (action.type) {
    case "UPDATE_CHAT":
      return [...state, action.msg];
    default:
      return state;
  }
};

export default chatLog;
