console.log("hi");

$(function () {
  $("img").hide();
  makeDeck();
  startGame();
});


// Setting up global card variables.
/* Making two decks, one to take cards from and another to easily reset it.
Not sure if there's a more DRY way to make this.*/
var fullDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, "", "", "", ""];
var playDeck = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, "", "", "", ""];

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
  playerSum = 0;
  dealerSum = 0;
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
var winner;

/* The player and dealer are dealt two cards, first and third for player, second and fourth for dealer. Cards are removed from deck. Cards appear on top and bottom of screen (top dealer, bottom player) and second card is slightly to the right, but overlapping first card. Adds value of card to respective sum.*/
var initialDeal = function() {
  var firstCard = playDeck.pop();
  console.log(firstCard);
  checkAces(firstCard);
  firstCard.css("display", "inline");
  firstCard.css("left", 450);
  firstCard.css("top", 170);
  playerSum += firstCard.data("id");
  var secondCard = playDeck.pop();
  console.log(secondCard);
  checkAces(secondCard);
  //make facedown card display here
  dealerSum += secondCard.data("id");
  var thirdCard = playDeck.pop();
  console.log(thirdCard);
  checkAces(thirdCard);
  playerSum += thirdCard.data("id");
  var fourthCard = playDeck.pop();
  console.log(fourthCard);
  checkAces(fourthCard);
  dealerSum += fourthCard.data("id");
  console.log(playerSum);
  console.log(dealerSum);
  if (playerSum = 21 && dealerSum = 21) {
    winner = "tie";
    checkWin();
  }
  checkBlackjack(playerSum);
  checkBlackjack(dealerSum);
};

var checkAces = function(card) {

};

checkBlackjack = function(sum) {

};

/* Asks the player to hit or stand. Pops another card if hit, with image appearing slightly more to the right, and adds it to sum. Ends if bust, otherwise player is asked again.*/
var playerHit = function() {
  var hitOrStand = prompt("Would you to hit or to stand?")
  if (hitOrStand === "hit") {
    var hitCard = playDeck.pop();
    console.log(hitCard);
    checkAces(hitCard);
    playerSum += hitCard.data("id");
    console.log(playerSum);
    checkBust(playerSum);
    // checkBlackjack and checkBust
    playerHit();
  } else if (hitOrStand === "stand"){
    dealerHit();
  }
};

var dealerHit = function() {
  if (dealerSum < 16) {
    var hitCard = playDeck.pop();
    console.log(hitCard);
    checkAces(hitCard);
    dealerSum += hitCard.data("id");
    console.log(dealerSum);
    checkBust;
    // checkBlackjack and checkbust
  } else {
    checkWin();
  }
};

var checkBust = function(sum) {

};

var checkWin = function() {
}
