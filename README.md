# Wireframe
* Deck made of 52 card array
* Each number is an array of four, one for each suit with index number to decide image for suit
* Game starts with no cards and default bankroll
* Player’s bankroll = number (100)
* Prompt number bet, subtract from bankroll value and display in bet
* Shuffle deck, take highest in array, pop it and put its value into player’s hand
* Take next highest and give it to dealer, then to player and dealer again
* Should place image corresponding to card in places designated (bottom of screen for player, top for dealer, then next card is to the right) first dealer card gets value given but facedown card image is shown
* Each player has a sum taken from the two values
* For Aces, if sum is 10 or lower add 11, if 11 or higher add 1
* Prompt for another card, if yes take another card from array, place it in next spot, add it’s value to sum and prompt again, if no dealer tries hit
* If dealer sum is 16 or lower he must hit, if 17 or higher, he cannot hit
* After both values are done, compare
* If either number is over 21 they lose
* For 21 or under, whoever has the highest number wins, if they have the same it is a tie
* Display who wins
* If player wins double bet and add it to bankroll, if player ties return bet to bankroll, if player loses return bet to 0
* After game hide all images, reset deck array, shuffle deck and start over
* If player’s bankroll is 0 at start of round the game ends

# My Approach
For the javascript, I programmed the game from beginning to end in order of events. It worked well because each function led to another one. First I got the shuffling and deck creation to work, then made betting possible before the game itself. I then needed to add the HTML for the cards so I could use Jquery on them. After that the game progressed from one stage to another with straightforward checks and tests to reach the end. I ended up spending a lot of time with the CSS in the middle of this though.

# Black-Jack
* window.onload
Hides all the card images, runs makeDeck, startGame and sets gameOver click event.
* playDeck
Array of 52 numbers, with values 0-10, one for each card of the same value with Aces being 0.
* makeDeck()
Assigns the images to the playDeck array based on index number.
* playersBankroll
Amount of money the player has. Starts at 100.
* currentBet
Amount of money bet for the current round.
* playerSum
The current total value of the player's cards. Updated with every new card.
* dealerSum
The current total value of the dealer's card. Updated with every new card.
* hiddenDealerSum
A value that shows the player the value of the dealer's cards without the hidden card.
* winner
Global variable that changes based on win conditions. Its value is used for declareWinner.
* playerMove
Variable used to set position of player's cards. Starts at 75 and is reset to it each round.
* dealerMove
Variable used to set position of dealer's cards. Starts at 75 and is reset to it each round.
* facedownDisplay
Variable used in positioning and showing facedown card. Is a global variable so that all functions that end the game can use it.
* fourthCardDisplay
Variable used in positioning and showing the fourth card. Is a global variable so that all functions that end the game can use it.
* startGame()
Run onload and by gameOver. Resets playersBankroll, the current bet and both sums, then runs placeBet.
* placeBet()
Prompts the player for a number to bet. Subtracts that number from playersBankroll and adds it to currentBet. The p tags for Bankroll and Bet are given these numbers as text for display. If the number given is higher than playersBankroll, the players is alerted and then the function is run again. Afterwords, it runs the shuffle function on playDeck and then runs initialDeal.
* shuffle()
Randomizes the order of the elements in playDeck. Since they were already assigned to the index values of the images, the order of the cards appearing is random.
* initialDeal()
firstCard variable is a popped element from playDeck. After every card, the checkAces function is run to determine the Ace's value. firstCard is given to the player, adding the cards value to playerSum. firstCardDisplay display is a clone of firstCard. It is appended to the #Player-Hand div and displayed there, with playerMove determining it's horizontal position. secondCard does the same except for the dealer, going to the #Dealer-Hand div. hiddenDealerSum is set to dealerSum's value at this time. thirdCard is for the player again, but also changes the #Your-Sum p tag to playerSum's number. For thirdCardDisplay, 40 is subtracted from playerMove to put it slightly to the right of the first card. After fourthCard is added to dealerSum, the value of hiddenDealerSum, which has not been updated, is made into the text for the #Dealers-Sum p tag with a "+" string added to it to show the player that the number is higher than what they see. instead of displaying fourthCard, a facedown variable is set to the #Facedown-Card image and is cloned into the Dealer-Hand div, taking fourthCardDisplay's place. Then runs the blackjackTie to check for two blackjacks. If the test returns false, it runs checkBlackjack on both sums via Short-circuit evaluation. Because it already tested for a tie, only one of the two could have blackjack, so there is no danger of it skipping the run on dealerSum. If either one returns true, facedownDisplay is hidden and removed from the div and a clone of fourthCard is put in its place, so the player can see the dealer's hand and the declareWinner function is immediately run. If no one has gotten blackjack, playerHit is run. All three of these functions are on setTimeout for one second so that the player has time to read the screen.
* blackjackTie()
Checks if the values of playerSum and dealerSum are both 21. If so, it makes the same changes to #Dealer-Hand's display as an individual blackjack, then sets the winner variable to tie and runs declareWinner.
* checkAces()
Run after every card is popped. It runs if the cards value is 0. It takes the card and the owner's sum as parameters. The function determines the ace's value by looking at the taken sum. If the sum is 10 or lower, it returns 11, if the value is 11 or higher, it returns 1. The returned number is added to the sum in its original function.
* checkBlackjack()
Takes the sum of either the player or dealer after each has two cards, and a string of "Player" or "Dealer" for the corresponding sum. If the sum is equal to 21, the winner variable is changed to the given string and true is returned.
* playerHit()
The player is prompted if they want to hit or stand. If they choose hit, another card is popped from playDeck and the playerSum and #Player-Hand div are updated accordingly. After each card, checkBust is run to see if the player has busted. If so, it runs declareWinner. If not, playerHit is run again so the player can hit until they stand or bust. If the player chooses stand, dealerHit is run.
* dealerHit()
dealerHit works similarly to playerHit without the prompts with two exceptions. It updates hiddenDealerSum to display the dealer's card total while skipping the second card. After each hit, checkBust is run and the function runs again. However, before each run, the function checks dealerSum. if the value is 16 or lower, the function is run normally. If the value is 17 or higher it moves on to checkWin.
* checkBust()
Takes three parameter, the sum after the hit, and both a "Player" and "Dealer" string. The order of the two in the parameter list is changed depending on whose card is being checked. If the sum is over 21, the opposing string is assigned to winner and an alert says who busted. The secondCardDisplay is changed and true is return like blackjackTie and checkBlackjack.
* checkWin()
Since this is the end of the round, the second card is revealed. The two sums are compared. Whichever is higher sets winner to the appropriate string. If the sums are the same, winner is set to tie. Afterwords, declareWinner is run.
* declareWinner()
Checks the winner variable to decide what happens to currentBet. If winner is Player, double the value of currentBet is added to playersBankroll. If winner is dealer, nothing happens. However if this happens when playersBankroll is 0, the game ends. If the winner is tie, the value of currentBet is returned to playersBankroll.
Finally, currentBet is reset to 0, #Bankroll and #Bet p tags are updated and playAgain is run.
* playAgain()
In order to reset the deck, the #Player-Hand and #Dealer-Hand divs are emptied and playDeck is set equal to it's full array. All global variables except playersBankroll are reset to their original values. makeDeck and placeBet are run to start the game again.
* gameOver()
Can be run at any time via click event. Works the same as playAgain except it also resets playersBankroll to 100.

#HTML
* #Dealers-Sum
Div with an h1 that says Dealer's Sum. Contains an empty paragraph that will change to display the sum of the dealer's current cards, with the facedown card's value hidden. Reverts to 0 at end of round.
* #Bet
Div with an h1 that says Current Bet. Contains an empty paragraph and changes to the bet the player has made. Reverts to 0 at end of round.
* #Bankroll
Div with an h1 that says Your Bankroll. Paragraph starts with 100, and the amount added to #Bet is subtracted from here. Player gets a game over if the number is 0 at the end of a round.
* #Your-Sum
Div with an h1 that says Your Sum. Contains an empty paragraph and changes to the value of playerSum after the third card is added and each concurrent hit. Reverts to 0 at end of round.
* #Game-Over-Button
Div with an h1 that says Game Over. Is given a click event to run gameOver.
* .Deck
Contains 53 images, one for each card and one for the facedown card. They are ordered so their index numbers correspond to the values of playDeck.
* #Player-Hand
An empty div. Clones of the images in .Deck are appended to it when player pops an element from playDeck.
* #Dealer-Hand
An empty div. Clones of the images in .Deck are appended to it when dealer pops an element from playDeck.

#CSS
* body
Changes background-color to green.
* img
Sets all image's positions to relative.
* h1
All text is colored white.
* p
All text is colored white.
font-size is 25px.
* #Dealers-Sum
Positions text on right side of screen on the top.
* #Bankroll
Positions text on right side of screen below #Dealers-Sum.
* #Bet
Positions text on right side of screen below #Bankroll.
* #Your-Sum
Positions text on right side of screen below #Bet.
* #Player-Hand
Div centered at the bottom of screen. Card images are cloned in here to display player's hand.
* #Dealer-Hand
Div centered at the top of screen. Card images are cloned in here to display dealer's hand.
* #Game-Over-Button
Div in center of screen. Has a click event for gameOver function.
* #Game-Over-Button > p
Changes text color of just this paragraph to black.

# Unsolved Problems
* I was never able to figure out why the alert for the player not putting a number into the bet prompt wouldn't activate. I checked the console and it was getting NaN, but that did not set off the alert like it was supposed to.
* I wanted to add buttons for the hit or stand prompts, but I was unsure of how to make the click events turn off if the buttons were hidden until the player is allowed to hit. I ran out of time before I could solve this.
* I was working on the insurance betting and thought I had it set up properly, acting almost exactly like the original bet, but for some reason running it would stop everything else from working and I was unable to spare the time to fix the problem, so I removed it.
* I wanted to make the presentation less ugly, at the very least by positioning the text better. However, I am terrible at CSS and so I did the little I could, which already took way too much time.
