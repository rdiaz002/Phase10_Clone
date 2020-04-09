import openSocket from "socket.io-client";
export const socket = openSocket(process.env.REACT_APP_SERVER_URL);

export const setupClient = (setGlobalStates,setPlayerID) => {
  socket.on("ROOM_INFO", serverState => {
    setGlobalStates(serverState);
  });
  socket.on("PLAYER_ID", (id) => {
    setPlayerID(id)
  });
};
export const setupHand = setGlobalHand =>{
  socket.on("HAND_REQUEST",(hand)=>{setGlobalHand(hand)})
}
export const onSocketConnect = cb => {
  socket.on("connect", () => {
    cb(socket.id);
  });
  console.log(socket.id)
};

export const setupChat = cb => {
  socket.on("NEW_MSG", msg => {
    cb(msg);
  });
};

export const updatePlayerName = name => {
  socket.emit("UPDATE_NAME", name);
};

export const updatePlayerState = () => {
  socket.emit("READY");
};
export const sendMsg = msg => {
  socket.emit("ROOM_MSG", msg);
};

export const startGame = () => {
  socket.emit("START_GAME");
};

export const requestHand=()=>{
  socket.emit("CREATE_HAND");
}
