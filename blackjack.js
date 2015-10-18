console.log("hi");

$(function () {
  $("img").hide();
  makeDeck();
  startGame();
  $("#Game-Over-Button").click(gameOver);
});


// Setting up global card variables.
var playDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0];

//Function that assigns HTML images to deck array.
var makeDeck = function() {
  for (var i = 0; i < playDeck.length; i++) {
    playDeck[i] = $("img").eq(i).attr("data-id", playDeck[i]);
  }
}

var playersBankroll = 100;
var currentBet = 0;

//Function starts the game on reload, resets bankroll and bet, and runs placeBet;
var startGame = function() {
  playersBankroll = 100;
  $("#Bankroll > p").text(playersBankroll);
  currentBet = 0;
  $("#Bet > p").text(currentBet);
  playerSum = 0;
  $("#Your-Sum > p").text(playerSum);
  dealerSum = 0;
  $("#Dealers-Sum > p").text(dealerSum);
  placeBet();
}

/*function that will ask player how much to bet and will take that amount from playersBankroll and put it in currentBet*/
var placeBet = function() {
  var bet = parseInt(prompt("How much would you like to bet?"));
  if (bet != NaN) {
    if (bet > playersBankroll) {
      /* If player's input is too high, they will be prompted again.*/
      alert("You do not have that much. Please place a lower bet.")
      placeBet();
    } else {
      /* If bet is number player has, it will be subtracted from the bankroll and made the currentBet. The text for the corresponding paragraphs will show this in the HTML. It will then shuffle the deck.*/
      playersBankroll -= bet;
      currentBet += bet;
      $("#Bankroll > p").text(playersBankroll);
      $("#Bet > p").text(currentBet);
      shuffle(playDeck);
      initialDeal();
    };
  } else {
    /* If the player's input is not a number, they will be prompted again.*/
    alert("That is not a number. Please try betting again");
    placeBet();
  }
};

// Shuffle function
function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

var playerSum;
var dealerSum;
var hiddenDealerSum;
var winner;
var playerMove = 75;
var dealerMove = 75;
var facedownDisplay;
var fourthCardDisplay;

/* The player and dealer are dealt two cards, first and third for player, second and fourth for dealer. Cards are removed from deck. Cards are moved to divs on top and bottom of screen (top dealer, bottom player) and second card is slightly to the right, but overlapping first card. Second dealer card is hiddenAdds value of card to respective sum.*/
var initialDeal = function() {
  console.log("initialDeal run");
  var firstCard = playDeck.pop();
  console.log(firstCard);
  if (firstCard.data("id") == 0) {
    var aceValue = checkAces(firstCard, playerSum);
    playerSum += aceValue;
  };
  playerSum += firstCard.data("id");
  var firstCardDisplay = firstCard.clone();
  firstCardDisplay.appendTo("#Player-Hand");
  firstCardDisplay.css("display", "inline-block");
  firstCardDisplay.css("height", "100%");
  firstCardDisplay.css("left", playerMove);
  var secondCard = playDeck.pop();
  console.log(secondCard);
  if (secondCard.data("id") == 0) {
    var aceValue = checkAces(secondCard, dealerSum);
    dealerSum += aceValue;
  };
  dealerSum += secondCard.data("id");
  hiddenDealerSum = dealerSum;
  var secondCardDisplay = secondCard.clone();
  secondCardDisplay.appendTo("#Dealer-Hand");
  secondCardDisplay.css("display", "inline-block");
  secondCardDisplay.css("height", "100%");
  secondCardDisplay.css("left", dealerMove);
  var thirdCard = playDeck.pop();
  console.log(thirdCard);
  if (thirdCard.data("id") == 0) {
    var aceValue = checkAces(thirdCard, playerSum);
    playerSum += aceValue;
  };
  playerSum += thirdCard.data("id");
  $("#Your-Sum > p").text(playerSum);
  console.log(playerSum);
  var thirdCardDisplay = thirdCard.clone();
  thirdCardDisplay.appendTo("#Player-Hand");
  thirdCardDisplay.css("display", "inline-block");
  thirdCardDisplay.css("height", "100%");
  thirdCardDisplay.css("left", playerMove -= 40);
  var fourthCard = playDeck.pop();
  console.log(fourthCard);
  if (fourthCard.data("id") == 0) {
    var aceValue = checkAces(fourthCard, dealerSum);
    dealerSum += aceValue;
  };
  dealerSum += fourthCard.data("id");
  $("#Dealers-Sum > p").text(hiddenDealerSum + "+");
  console.log(dealerSum);
  var facedown = $("#Facedown-Card");
  facedownDisplay = facedown.clone();
  facedownDisplay.appendTo("#Dealer-Hand");
  facedownDisplay.css("display", "inline-block");
  facedownDisplay.css("height", "100%");
  facedownDisplay.css("left", dealerMove -= 40);
  fourthCardDisplay = fourthCard.clone();
  console.log(playerSum);
  console.log(dealerSum);
  // If both players get 21, it's a tie blackjack and automatically ends. There is no need to run the CheckBlackjack function for this.
  var blackjackTie = function () {
    if (playerSum === 21 && dealerSum === 21) {
      $("#Dealers-Sum > p").text(dealerSum);
      facedownDisplay.hide();
      facedownDisplay.remove();
      fourthCardDisplay.appendTo("#Dealer-Hand");
      fourthCardDisplay.css("display", "inline-block");
      fourthCardDisplay.css("height", "100%");
      fourthCardDisplay.css("left", 35);
      winner = "tie";
      declareWinner();
    }
  };
  setTimeout(blackjackTie, 1000);
  //Short-circuit evaluation, if the player doesn't win, check dealer.
  if (checkBlackjack(playerSum, "Player") || checkBlackjack(dealerSum, "Dealer")) {
    facedownDisplay.hide();
    facedownDisplay.remove();
    fourthCardDisplay = fourthCard.clone();
    fourthCardDisplay.appendTo("#Dealer-Hand");
    fourthCardDisplay.css("display", "inline-block");
    fourthCardDisplay.css("height", "100%");
    fourthCardDisplay.css("left", 35);
    setTimeout(declareWinner, 1000);
  } else {
    setTimeout(playerHit, 1000);
  }
};
//Will take the data-id of the card and the current sum as parameters. returns 11 or 1 depending on sum. This number is then added to the sum
var checkAces = function(card, sum) {
  if (sum < 11) {
    return 11;
  } else {
    return 1;
  }
};

//Will check playerSum then dealerSum, if they win, victor argument puts winner variable equal to who won.
var checkBlackjack = function(sum, victor) {
  if (sum === 21) {
    winner = victor;
    return true;
  }
};

/* Asks the player to hit or stand. Pops another card if hit, with image appearing slightly more to the right, and adds it to sum. Ends if bust, otherwise player is asked again.*/
var playerHit = function() {
  var hitOrStand = prompt("Would you like to hit or to stand?")
  if (hitOrStand === "hit") {
    var hitCard = playDeck.pop();
    console.log(hitCard);
    if (hitCard.data("id") == 0) {
      var aceValue = checkAces(hitCard, playerSum);
      playerSum += aceValue;
    };
    playerSum += hitCard.data("id");
    $("#Your-Sum > p").text(playerSum);
    var hitCardDisplay = hitCard.clone();
    hitCardDisplay.appendTo("#Player-Hand");
    hitCardDisplay.css("display", "inline-block");
    hitCardDisplay.css("height", "100%");
    hitCardDisplay.css("left", playerMove -= 40);
    console.log(playerSum);
    // See if hit made player bust.
    if (checkBust(playerSum, "Player", "Dealer")) {
      setTimeout(declareWinner, 1000);
    } else {
      setTimeout(playerHit, 1000);
    };
  } else if (hitOrStand === "stand"){
    dealerHit();
  }
};

var dealerHit = function() {
  if (dealerSum < 17) {
    var hitCard = playDeck.pop();
    console.log(hitCard);
    if (hitCard.data("id") == 0) {
      var aceValue = checkAces(hitCard, playerSum);
      dealerSum += aceValue;
    };
    dealerSum += hitCard.data("id");
    hiddenDealerSum += hitCard.data("id");
    $("#Dealers-Sum > p").text(hiddenDealerSum + "+");
    var hitCardDisplay = hitCard.clone();
    hitCardDisplay.appendTo("#Dealer-Hand");
    hitCardDisplay.css("display", "inline-block");
    hitCardDisplay.css("height", "100%");
    hitCardDisplay.css("left", dealerMove -= 40);
    console.log(dealerSum);
    if (checkBust(dealerSum, "Dealer", "Player")) {
      setTimeout(declareWinner, 1000);
    } else {
      dealerHit();
    };
  } else {
    setTimeout(checkWin, 1000);
  }
};

/* Looks at sum after every hit. Takes hitter's sum and name as well as opponent name as parameters.
Tells who lost and changes winner variable to opponent.*/
var checkBust = function(sum, loser, victor) {
  if (sum >= 21) {
    winner = victor;
    $("#Dealers-Sum > p").text(dealerSum);
    facedownDisplay.hide();
    facedownDisplay.remove();
    fourthCardDisplay.appendTo("#Dealer-Hand");
    fourthCardDisplay.css("display", "inline-block");
    fourthCardDisplay.css("height", "100%");
    fourthCardDisplay.css("left", 35);
    alert(loser + " has busted!");
    return true;
  }
};

// Compares both sums and assigns to winner variable. Also checks for tie.
var checkWin = function() {
  facedownDisplay.hide();
  facedownDisplay.remove();
  fourthCardDisplay.appendTo("#Dealer-Hand");
  fourthCardDisplay.css("display", "inline-block");
  fourthCardDisplay.css("height", "100%");
  fourthCardDisplay.css("left", 35);
  if (playerSum > dealerSum) {
    winner = "Player";
  } else if (playerSum < dealerSum) {
    winner = "Dealer";
  } else {
    winner = "tie";
  };
  declareWinner();
};

/* After someone has won, this function is called to alert the player.
If player wins it returns double the bet to player, and returns the original bet in a tie.
Afterwards, current bet is reset to zero, the HTML text is updated and the game begins again. */
var declareWinner = function() {
  $("#Dealers-Sum > p").text(dealerSum);
  if (winner === "Player") {
    alert("You win! Here are your winnings.")
    playersBankroll += currentBet * 2;
  } else if (winner === "Dealer") {
    alert("You lose!")
    if (playersBankroll === 0) {
      alert("You are out of money! The game is over.");
      return undefined;
    };
  } else if (winner === "tie") {
    alert("This game is a tie! You get your bet back.");
    playersBankroll += currentBet;
  };
  currentBet = 0;
  $("#Bankroll > p").text(playersBankroll);
  $("#Bet > p").text(currentBet);
  playAgain();
};

/* Starts the game again. Clears the hand divs, resets the deck, winner, sum and move variables, as well as the sum div text.*/
var playAgain = function() {
    $("#Player-Hand").empty();
    $("#Dealer-Hand").empty();
    playDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0];
    winner = undefined;
    playerSum = 0;
    dealerSum = 0;
    hiddenDealerSum = 0;
    $("#Your-Sum > p").text(playerSum);
    $("#Dealers-Sum > p").text(hiddenDealerSum);
    playerMove = 75;
    dealerMove = 75;
    makeDeck();
    setTimeout(placeBet, 1000);
}

//When pressed runs playAgain but also resets bankroll.
var gameOver = function() {
  $("#Player-Hand").empty();
  $("#Dealer-Hand").empty();
  playDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0];
  winner = undefined;
  hiddenDealerSum = 0;
  makeDeck();
  startGame();
  playerMove = 75;
  dealerMove = 75;
}
