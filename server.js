const io = require("socket.io")();
const Deque = require("collections/deque");
const Random = require("random-js").Random;
const random = new Random();
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
  [0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
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

//reset players for new game.
const resetPlayerInfo = () => {
  playerList.forEach((player) => {
    player.phase = 0;
    player.phaseStacks = [];
    player.phaseState = "INCOMPLETE";
  });
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
  return random.integer(min, max);
};

const randomizeDeck = () => {
  deck = new Deque(createRandomHand(108));
};
//Change default_deck structure into array for easier removal and replacement.
const createRandomHand = (size) => {
  var hand = [];
  for (i = 0; i < size; i++) {
    if (deckSize == 0) {
      return hand;
    }
    var colorNum = getRndInt(0, deck.length - 1);
    var cardNum = getRndInt(0, deck[colorNum].length - 1);
    while (deck[colorNum][cardNum] == 0) {
      colorNum = getRndInt(0, deck.length - 1);
      cardNum = getRndInt(0, deck[colorNum].length - 1);
    }
    var type = COLORS[colorNum];
    var number = colorNum > 3 ? 0 : cardNum + 1;
    hand.push({ type, number });
    deck[colorNum][cardNum]--;
    deckSize--;
  }
  return hand;
};

const dealDeck = (size) => {
  var hand = [];
  for (var i = 0; i < size; i++) {
    hand.push(deck.shift());
  }
  return hand;
};

const chooseRandomPlayer = () => {
  var index = getRndInt(0, playerList.length);
  currentIndex = index;
  return playerList[index].id;
};

const returnToDeck = (cards) => {
  cards.forEach((card) => {
    deck.push(card);
  });
};

const broadcastNoti = (msg, client = null) => {
  if (!client) {
    io.emit("NOTI", msg);
  } else {
    client.emit("NOTI", msg);
  }
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
    broadcastNoti(name + " has joined the game");
  });

  //START GAME
  client.on("START_GAME", () => {
    if (client.client.id == hostID) {
      //when host starts game
      gameState = "Running";
      playersHands = [];
      deck = [...DEFAULT_DECK];
      randomizeDeck();
      deckSize = 108;
      resetPlayerInfo();
      currentPlayer = chooseRandomPlayer();
      discardPile = dealDeck(1);
      while (discardPile[0].type == "Skip") {
        returnToDeck(discardPile);
        discardPile = dealDeck(1);
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
    var hand = dealDeck(10);
    var player = createPlayerHand(client.client.id);
    player.cards = hand;
    playersHands.push(player);
    client.emit("HAND_REQUEST", hand);
  });

  //REQUEST PICKUP FROM DECK
  client.on("PICKUP_DECK", () => {
    var card = dealDeck(1);
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

  client.on("PHASE_COMPLETE", (stacks) => {
    var playerHand = playersHands.find(
      (player) => player.id == client.client.id
    ).cards;
    stacks.forEach((stack) => {
      var indexs = [];
      stack.deck.forEach((card) => {
        for (var i = 0; i < playerHand.length; i++) {
          var cType = playerHand[i].type;
          var cNum = playerHand[i].number;
          if (card.type == cType && card.number == cNum) {
            playerHand.splice(i, 1);
            break;
          }
        }
      });
    });
    var player = playerList.find((player) => player.id == client.client.id);
    player.phaseStacks = stacks;
    player.phaseState = "COMPLETE";
    client.emit("HAND_REQUEST", playerHand);
    UpdateRoomInfo();
  });

  //Update Stack
  //TODO Optional: Add another check to make sure stack is legit.
  client.on("UPDATE_STACK", (data) => {
    var player = playerList.find((player) => player.id == data.playerID);
    player.phaseStacks[data.stackIndx].deck = data.newStack;
    var clientDeck = playersHands.find(
      (player) => player.id == client.client.id
    ).cards;

    var indx = clientDeck.findIndex(
      (card) =>
        card.type == data.newCard.type && card.number == data.newCard.number
    );
    clientDeck.splice(indx, 1);
    client.emit("HAND_REQUEST", clientDeck);
    UpdateRoomInfo();
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
  broadcastNoti("Welcome to phase10.", client);
  UpdateRoomInfo();
});

const createPlayerObject = (clientid, STATE = "NOT_READY") => ({
  name: "",
  id: clientid,
  STATE,
  phase: 0,
  phaseStacks: [],
  phaseState: "INCOMPLETE",
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

const port = 13337;
io.listen(port);
