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
let openCards = [];

let vTimer = "";
let minutes = 0;
let seconds = 0;
let time = 0;   
let stopTime = 0;
let timerIncrementHandle = 0;
let resetTime = 0;

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

function resetVariables() {
    console.log("resetting variables")
    numOfClicks = 0;
    totalNumOfCards = 16;
    totalNumOfMatch = 0;
    firstClickClass  = "";
    secondClickClass = "";
    firstTarget = "";
    secondTarget = "";
    openCards = [];
    vTimer = "";
    minutes = 0;
    seconds = 0;
    time = 0;   
    stopTime = 0;
    timerIncrementHandle = 0;
    resetTime = 0;
}


function resetDeck() {
    stopTimer();
    //intiateCardShuffle();
    createDeck();
    resetVariables();
    resetStars();  
    resetTimer();  
}

function resetStars() {
    addElementsByClass('fa fa-star')
}

function resetClick() {
    resetNumClicks();
    updateHTMLNumberMessage();
}

function intiateCardShuffle() {
    shuffle(arrayofCards);
}

function resetNumClicks() {
    numOfClicks = 0;
    
}
function updateHTMLNumberMessage() {
      
    moves = document.getElementsByClassName('moves')[0];
    while (moves.firstChild) {
        moves.removeChild(moves.firstChild);
      }
      moves.appendChild(document.createTextNode(numOfClicks));  
}

function startTimer() {
    //vTimer = "hello";
    console.log("starting timer");
    let score = document.getElementsByClassName('score-panel')[0];
    let span = document.getElementsByClassName('timer')[0];

    if (span == null)  {
        timer = document.createElement('span');
        timer.classList.add('timer')
        
        timer.appendChild(document.createTextNode(vTimer));
        score.appendChild(timer)
    } else {
        span.innerHTML = vTimer;
    }


    stopTime = 0;

    updateTimer(); //make sure to update timer every one second
    //otherwise, the clock is already ticking
    
}

function stopTimer() {
    stopTime = 1;
}

function updateTimer() {

   console.log("updating timer " + stopTime);
   if (stopTime == 1) {
       //resetTimer();  
       return;
   }
       
    timerIncrementHandle = setTimeout(function(){
        seconds++;
        if(seconds%60==0 & seconds > 0) {
            seconds = 0
            minutes = minutes + 1;
        }

        //let seconds = Math.floor(time/100);

        console.log(seconds);

        let span = document.getElementsByClassName('timer')[0];
        let secondFormatter =  ("0" + seconds).slice(-2);
        let minuteFormatter =  ("0" + minutes).slice(-2);
        //credit https://stackoverflow.com/questions/8043026/how-to-format-numbers-by-prepending-0-to-single-digit-numbers
         
        vTimer = minuteFormatter + ":" + secondFormatter;
        span.innerHTML = vTimer;
        updateTimer();  
        updatePlayerRanking(40); //remove starts if players take more than 40 seconds to complete
    }
    ,1000);
}

function resetTimer() {

    stopTime = 1;
    resetTime = 1;
    seconds = 0;
    minutes = 0;
    vTimer = "00" + ":" + "00";
    let span = document.getElementsByClassName('timer')[0];
    span.innerHTML = vTimer;
}

function incrementNumClick() {
    numOfClicks = numOfClicks + 1;
    console.log("num of clicks = " + numOfClicks);
    updateHTMLNumberMessage();
}

function createDeck() {
    resetClick();

    deck = document.getElementsByClassName('deck')[0];
    
    while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
      }

    for(i=0;i<arrayofCards.length;i++) {
        
        let card = document.createElement('li');
        card.classList.add('card');
        //card.classList.add('open');
        card.addEventListener("click",delegateCardClickBehavior,false); //event capture at capture phase
        //https://www.quirksmode.org/js/events_order.html#link4

        deck.appendChild(card);

        let cardPicture = document.createElement('i');
        cardPicture.className = arrayofCards[i];
        //cardPicture.addEventListener("click",delegateCardClickBehavior,true);
        card.appendChild(cardPicture);

        resetClick();
        // TODO: add event listener

    }
}

function cardMatchTurn() {
    target = event.target;
    console.log(target.className);
    $("#card").flip();
    
}

function getNumClicks()
{
    return numOfClicks;
}

function getTimeElapsedInSeconds() {
  return minutes*60+seconds;
}

function updatePlayerRanking (removeStarAfterNSeconds) {
    //remove a star if the player is taking more than 40 seconds

    //moves = document.getElementsByClassName('moves')[0];
    //while (moves.firstChild) {
        //moves.removeChild(moves.firstChild);
      //}
      //moves.appendChild(document.createTextNode(numOfClicks));  

    timeElapsed = getTimeElapsedInSeconds()
    console.log("updating stars @ second ..." + timeElapsed);
    console.log("will remove stars after " + removeStarAfterNSeconds)
    console.log()

    if (timeElapsed >= removeStarAfterNSeconds && timeElapsed%removeStarAfterNSeconds == 0 )
    {
        console.log("about to remove starts")
        removeElementsByClass('fa fa-star')
    }
        

}

function removeElementsByClass(className){
    var elements = document.getElementsByClassName(className);
    if (elements.length > 1) //do not remove the last star
        elements[0].remove()
}

function addElementsByClass(className){

    let starPicture = document.createElement('i');
    starPicture.className = "fa fa-star";

    var liNode = document.createElement("li");   
    liNode.appendChild(starPicture);           // Create a <li> node

    //append the clone (or star) to the parent
    totalNumOfStars  = 3;
    numOfStarsRequired = totalNumOfStars-countElementsByClass(className)

    console.log(numOfStarsRequired)
    for (i = 0;i<numOfStarsRequired;i++) {
         console.log(i)
         document.getElementsByClassName('stars')[0].appendChild(liNode)
         console.log("adding")
    }
}
  
function countElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    return elements.length
}



function delegateCardClickBehavior(event) {

  //  congratulateUser();
  if(!event.target.classList.contains('card')) return;
  incrementNumClick();

  if(getNumClicks() == 1) startTimer();
 
     
   openCards.push(event.target);
   event.target.classList.toggle('show');
   //console.log(event.target.classList);

   if(openCards.length == 2) {
    console.log(openCards[0].classList);
    console.log(openCards[1].classList);
     
     if(doesCardsMatch(openCards[0],openCards[1])) {      
        openCards[0].classList.remove('show');
        openCards[1].classList.remove('show');
        openCards[0].classList.add('match');
        openCards[1].classList.add('match');  
        
        totalNumOfMatch++;
        openCards = [];    

        
        
        console.log(totalNumOfMatch)
        console.log(totalNumOfCards/2)
        if(totalNumOfMatch === totalNumOfCards/2) {
            setTimeout(function congrats() {
            //console.log("Congratulations!. You have successfully matched all the cards.");
            congratulateUser();
            },500)  
          

        }
        
     }
     else {
        setTimeout(function cardClose() {
        openCards[0].classList.remove('show'); //remove show
        openCards[1].classList.remove('show');
        openCards[0].classList.remove('close'); 
        openCards[1].classList.remove('close'); 
        openCards = [];       
       }, 500);
       openCards[0].classList.add('close'); 
       openCards[1].classList.add('close');
     }
     
    }
}


function congratulateUser() {

    //create section for modal
    stopTimer();
    modalMessage = "Congratulations! " + "You won the game in " + getTimeElapsedInSeconds() + " seconds ( " + getNumClicks() + " moves ) and have been awarded " + countElementsByClass('fa fa-star') + " stars!"
    alert(modalMessage)
    if (confirm('Do you want to play again?')) {
        resetDeck();
    } else {
        // Do nothing!
    }
    
}

    function doesCardsMatch(card1,card2) {
        return card1.firstChild.classList[1]===card2.firstChild.classList[1];
    }

   function updateClickedClassStatusToMatch(firstCard, secondCard) {
        //change the correctly guessed cards to 'match' so they always show up
        totalNumOfMatch++;
        console.log("match");
        firstCard.classList.remove("open");
        firstCard.classList.add("match");

        secondCard.classList.remove("open");
        secondCard.classList.add("match");


   }

   function updateClickedClassStatusToIncorrectlyGuessed(firstCard, secondCard) {
       //change the incorrectly guessed cards to not have 'match' so they go back to hide
       setTimeout(function cardClose() {
        firstCard.classList.remove('show');
        secondCard.classList.remove('show');
       }, 500);

      

   }

   document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready to be interacted with!');
    resetDeck(); 
   });



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
