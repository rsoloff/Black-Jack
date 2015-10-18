# Black-Jack
Deck made of 52 card array
Each number is an array of four, one for each suit with index number to decide image for suit
Game starts with no cards and default bankroll
Player’s bankroll = number (100)
Prompt number bet, subtract from bankroll value and display in bet
Shuffle deck, take highest in array, pop it and put its value into player’s hand
Take next highest and give it to dealer, then to player and dealer again
Should place image corresponding to card in places designated (bottom of screen for player, top for dealer, then next card is to the right) first dealer card gets value given but facedown card image is shown
Each player has a sum taken from the two values
For Aces, if sum is 10 or lower add 11, if 11 or higher add 1
Prompt for another card, if yes take another card from array, place it in next spot, add it’s value to sum and prompt again, if no dealer tries hit
If dealer sum is 16 or lower he must hit, if 17 or higher, he cannot hit
After both values are done, compare
If either number is over 21 they lose
For 21 or under, whoever has the highest number wins, if they have the same it is a tie
Display who wins

If player wins double bet and add it to bankroll, if player ties return bet to bankroll, if player loses return bet to 0
After game hide all images, reset deck array, shuffle deck and start over
If player’s bankroll is 0 at start of round the game ends

#HTML
Deck div contains each image
Background image
Paragraph for bet value
Paragraph for bankroll

#CSS
* body

Changes background-color to green.

* img

Sets all image's positions to relative.
