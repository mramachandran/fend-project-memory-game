/*
 * Create a list that holds all of your cards
 */
let arrayofCards = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

let numOfClicks = 0;
let totalNumOfCards = 16;
let totalNumOfMatch = 0;

let firstClickClass  = "";
let secondClickClass = "";
let firstTarget = "";
let secondTarget = "";


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function resetDeck() {
    intiateCardShuffle();
    createDeck();
    resetNumClicks();
}

function intiateCardShuffle() {
    shuffle(arrayofCards);
}

function resetNumClicks() {
    numOfClicks = 0;
    updateHTMLNumberMessage();
}
function updateHTMLNumberMessage() {
      
    moves = document.getElementsByClassName('moves')[0];
    while (moves.firstChild) {
        moves.removeChild(moves.firstChild);
      }
      moves.appendChild(document.createTextNode(numOfClicks));  
}

function incremenetNumClick() {
    numOfClicks = numOfClicks + 1;
    updateHTMLNumberMessage();
}

function createDeck() {
    resetNumClicks();
    deck = document.getElementsByClassName('deck')[0];
    
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
      }

    for(i=0;i<arrayofCards.length;i++) {
        
        
        let card = document.createElement('li');
        card.classList.add('card');
        //card.classList.add('open');
        card.addEventListener("click",delegateCardClickBehavior,false);
        deck.appendChild(card);

        let cardPicture = document.createElement('i');
        cardPicture.className = arrayofCards[i];
        //cardPicture.addEventListener("click",delegateCardClickBehavior,true);
        card.appendChild(cardPicture);


        resetNumClicks();
        // TODO: add event listener

       
    }
}

function cardMatchTurn() {
    target = event.target;
    console.log(target.className);
    $("#card").flip();
    
}

function delegateCardClickBehavior(event) {
   //set rules for what a card should do
   //TODO: can't click on the 'match' card for second time 
   incremenetNumClick();

   target = event.target;
   target.classList.add('show');
   console.log(target.classList);

   console.log(target.firstChild.classList[1]);

   cardPictureClassList = target.firstChild.classList[1];

   if (firstClickClass.length === 0) {
       firstClickClass = cardPictureClassList;
       firstTarget = target;
       console.log(firstClickClass);

    
   }else {
       secondClickClass = cardPictureClassList;
       secondTarget = target;
       console.log(secondClickClass);

       if (firstClickClass === secondClickClass && firstTarget != secondTarget) {
        //user guessed correctly
        updateClickedClassStatusToMatch(firstTarget,secondTarget);
        console.log("correct guess");
        } else {
        //user guessed incorrectly
        updateClickedClassStatusToIncorrectlyGuessed(firstTarget,secondTarget);
        console.log("incorrect guess");
       }

       firstClickClass = "";
       secondClickClass = "";
       
     }
    }


   function updateClickedClassStatusToMatch(firstCard, secondCard) {
        //change the correctly guessed cards to 'match' so they always show up
        totalNumOfMatch++;
        console.log("match");
        firstCard.classList.remove("open");
        firstCard.classList.add("match");

        secondCard.classList.remove("open");
        secondCard.classList.add("match");
        if(totalNumOfMatch === totalNumOfCards/2) {
            conole.log("Congratulations!. You have successfully matched all the cards.");
            //resetDeck();
        }

   }

   function updateClickedClassStatusToIncorrectlyGuessed(firstCard, secondCard) {
       //change the incorrectly guessed cards to not have 'match' so they go back to hide
       setTimeout(function cardClose() {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');
       }, 500);
   }
   
   


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
