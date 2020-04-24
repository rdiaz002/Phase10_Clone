const io = require("socket.io")();
/**
 * TODO: add phase patterns and checks
 * TODO: add winning conditions and ending game logic.
 * TODO: add logic for players disconnecting in middle of game.
 * TODO: change currentPlayer to an index for easier search.
 */

const setOf = (cards = [], size) => {
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
};

const runOf = (cards = [], size) => {
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
};

var DEFAULT_PHASES = [
  {
    patterns: [
      { check: setOf, size: 3, desc: "Set of", funcID: 0 },
      { check: setOf, size: 3, desc: "Set of", funcID: 0 },
    ],
  },
  {
    patterns: [
      { check: setOf, size: 3, desc: "Set of", funcID: 0 },
      { check: runOf, size: 4, desc: "Run of", funcID: 1 },
    ],
  },
  {
    patterns: [
      { check: setOf, size: 4, desc: "Set of", funcID: 0 },
      { check: runOf, size: 4, desc: "Run of", funcID: 1 },
    ],
  },
  {
    patterns: [{ check: runOf, size: 7, desc: "Run of", funcID: 1 }],
  },
  {
    patterns: [{ check: runOf, size: 8, desc: "Run of", funcID: 1 }],
  },
  {
    patterns: [{ check: runOf, size: 9, desc: "Run of", funcID: 1 }],
  },
  {
    patterns: [
      { check: setOf, size: 4, desc: "Set of", funcID: 0 },
      { check: setOf, size: 4, desc: "Set of", funcID: 0 },
    ],
  },
  {
    patterns: [
      { check: setOf, size: 3, desc: "Set of", funcID: 0 },
      { check: runOf, size: 4, desc: "Run of", funcID: 1 },
    ],
  },
  {
    patterns: [
      { check: setOf, size: 5, desc: "Set of", funcID: 0 },
      { check: setOf, size: 2, desc: "Set of", funcID: 0 },
    ],
  },
  {
    patterns: [
      { check: setOf, size: 5, desc: "Set of", funcID: 0 },
      { check: setOf, size: 3, desc: "Set of", funcID: 0 },
    ],
  },
];

var DEFAULT_DECK = [
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  [8],
  [4],
];
var COLORS = ["Red", "Green", "Blue", "Yellow", "Wild", "Skip"];

var playerList = [];
var hostID = "";
var gameState = "WAITING";
var playersHands = [];
var currentPlayer = "";
var currentIndex = 0;
var deck = [...DEFAULT_DECK];
var deckSize = 108;
var discardPile = [];

const UpdateRoomInfo = () => {
  io.emit("ROOM_INFO", {
    hostID,
    playerList,
    gameState,
    currentPlayer,
    discardPile,
    phases: DEFAULT_PHASES,
  });
  //where i will pass all needed info that will be updated
};

const discardCard = (card) => {
  if (discardPile.length > 1) {
    returnToDeck([discardPile[0]]);
    discardPile.splice(0, 1);
    discardPile.push(card);
  } else {
    discardPile.push(card);
  }
};

const nextPlayer = (inc = 1) => {
  currentIndex += inc;
  currentIndex %= playerList.length;
  currentPlayer = playerList[currentIndex].id;
};

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
//Change default_deck structure into array for easier removal and replacement.
const createRandomHand = (size) => {
  var hand = [];
  for (i = 0; i < size; i++) {
    if (deckSize == 0) {
      return hand;
    }
    var colorNum = getRndInt(0, deck.length);
    while (
      !deck[colorNum].some((val) => {
        return val > 0;
      })
    ) {
      colorNum = getRndInt(0, deck.length);
    }
    var cardNum = getRndInt(0, deck[colorNum].length);
    while (deck[colorNum][cardNum] == 0) {
      cardNum = getRndInt(0, deck[colorNum].length);
    }
    hand.push({ type: COLORS[colorNum], number: cardNum + 1 });
    deck[colorNum][cardNum]--;
    deckSize--;
  }
  return hand;
};

const chooseRandomPlayer = () => {
  var index = getRndInt(0, playerList.length);
  currentIndex = index;
  return playerList[index].id;
};

const returnToDeck = (cards) => {
  cards.forEach((element) => {
    var colorIndex;
    switch (element.type) {
      case "Red":
        colorIndex = 0;
        break;
      case "Green":
        colorIndex = 1;
        break;
      case "Blue":
        colorIndex = 2;
        break;
      case "Yellow":
        colorIndex = 3;
        break;
      case "Wild":
        colorIndex = 4;
        break;
      case "Skip":
        colorIndex = 5;
        break;
    }
    deck[colorIndex][element.number - 1]++;
    deckSize++;
  });
};

const setupClients = (client) => {
  client.on("ROOM_MSG", (msg) => {
    io.emit("NEW_MSG", msg);
  });

  //UPDATE_NAME
  client.on("UPDATE_NAME", (name) => {
    playerList.forEach((val) => {
      if (val.id == client.client.id) {
        val.name = name;
      }
    });
    UpdateRoomInfo();
  });

  //START GAME
  client.on("START_GAME", () => {
    if (client.client.id == hostID) {
      //when host starts game
      gameState = "Running";
      playersHands = [];
      deck = [...DEFAULT_DECK];
      deckSize = 108;
      currentPlayer = chooseRandomPlayer();
      discardPile = createRandomHand(1);
      while (discardPile[0].type == "Skip") {
        returnToDeck(discardPile);
        discardPile = createRandomHand(1);
      }
      UpdateRoomInfo();
    }
  });

  //READY
  client.on("READY", () => {
    playerList.find((player) => {
      return player.id == client.client.id;
    }).STATE = "READY";
    UpdateRoomInfo();
  });

  //CREATE HAND
  client.on("CREATE_HAND", () => {
    var hand = createRandomHand(10);
    var play = createPlayerHand(client.client.id);
    play.cards = hand;
    playersHands.push(play);
    client.emit("HAND_REQUEST", hand);
  });

  //REQUEST PICKUP FROM DECK
  client.on("PICKUP_DECK", () => {
    var card = createRandomHand(1);
    var hand = playersHands.find((player) => player.id == client.client.id)
      .cards;
    hand.push(card[0]);
    client.emit("HAND_REQUEST", hand);
    client.emit("NEXT_STATE");
  });

  //REQUEST PICKUP FROM DISCAR
  //TODO: setup server-client messaging to advise players.
  client.on("PICKUP_DISCARD", () => {
    if (discardPile[discardPile.length - 1].type == "Skip") {
      return;
    }
    var card = discardPile.pop();

    var hand = playersHands.find((player) => player.id == client.client.id)
      .cards;
    hand.push(card);
    client.emit("HAND_REQUEST", hand);
    client.emit("NEXT_STATE");
    UpdateRoomInfo();
  });

  //Discard Card
  client.on("DISCARD", (card) => {
    if (currentPlayer == client.client.id) {
      var hand = playersHands.find((player) => player.id == client.client.id)
        .cards;
      var ind = hand.findIndex(
        (item) => item.type == card.type && item.number == card.number
      );
      discardCard(hand[ind]);
      hand.splice(ind, 1);
      client.emit("HAND_REQUEST", hand);
      client.emit("NEXT_STATE");

      if (card.type == "Skip") {
        nextPlayer(2);
      } else {
        nextPlayer();
      }

      UpdateRoomInfo();
    }
  });

  //disconnect
  client.on("disconnect", () => {
    var index = playerList.findIndex((usr) => usr.id == client.client.id);
    var handIndex = playersHands.findIndex(
      (hand) => hand.id == client.client.id
    );
    if ((handIndex > -1) & (gameState == "Running")) {
      var hand = playersHands[handIndex].cards;
      returnToDeck(hand);
      playersHands.splice(handIndex, 1);
    }

    playerList.splice(index, 1);

    if (client.client.id == hostID && playerList.length != 0) {
      hostID = playerList[0].id;
      playerList[0].STATE = "READY";
    }

    if (playerList.length < 2) {
      gameState = "WAITING";
      if (playersHands.length > 0) {
        returnToDeck(playersHands[0].cards);
        playersHands.splice(0, 1);
      }
    }
    if (currentPlayer == client.client.id && playerList.length > 0) {
      nextPlayer(0);
    }
    UpdateRoomInfo();
  });
};

io.on("connection", (client) => {
  client.emit("PLAYER_ID", client.client.id);
  if (gameState == "Running") {
    client.emit("ROOM_INFO", { hostID, playerList, gameState: "FULL" });
    client.disconnect();
    return;
  }

  if (
    !playerList.some((player) => {
      return player.id == client.client.id;
    })
  ) {
    if (playerList.length === 0) {
      hostID = client.client.id;
      playerList.push(createPlayerObject(client.client.id, "READY"));
      gameState = "WAITING";
    } else {
      playerList.push(createPlayerObject(client.client.id));
    }
  }
  setupClients(client);
  UpdateRoomInfo();
});

const createPlayerObject = (clientid, STATE = "NOT_READY") => ({
  name: "",
  id: clientid,
  STATE,
  phase: 0,
  phaseStacks: [],
});

const createPlayerHand = (clientid) => ({
  id: clientid,
  cards: [],
});

var fakeDeck = [
  { type: "Blue", number: "2" },
  { type: "Wild", number: "1" },
  { type: "Red", number: "3" },
  { type: "Red", number: "5" },
  { type: "Red", number: "6" },
];

//console.log(runOf(fakeDeck, 3));

const port = 13337;
io.listen(port);
