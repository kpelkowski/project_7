
//=============================================================================
//get elements from html and variables
//=============================================================================
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('overlay');
  const phrase = document.getElementById('phrase');
  const keyboard = document.getElementById('qwerty');
  let resetBtn = document.getElementsByClassName('btn__reset');
  let title = document.getElementsByClassName('title');
  let missed = 0;
  const phrases = [
    "ricky ticky tacky",
    "quit being rickdiculous",
    "gonna get schwifty",
    "wubba lub a dub dub",
    "rubber baby buggy bumpers"];
//=============================================================================
//get rid of the first screen when start link is clicked or restart the game
//=============================================================================
  function reset() {
    location.reload();
  }

  resetBtn[0].addEventListener('click', (event) => {
    if(event.target.tagName == 'A') {
      overlay.style.display = 'none';
      overlay.classList.remove('start');
    }

    if(event.target.textContent == 'Play again?') {
      reset();
    }
    });

//=============================================================================
//get a random phrase from the array
//=============================================================================
  function getRandomPhraseArray() {

    let randPhraseInt = Math.floor(Math.random() * phrases.length);
    let randPhrase = phrases[randPhraseInt];
    return randPhrase;
  }
//=============================================================================
//add the phrase to the display
//=============================================================================
  function addPhraseToDisplay() {
       let randPhrase = getRandomPhraseArray();
       const ul = phrase.firstElementChild;
       let randPhraselength = randPhrase.length;
       let letters = randPhrase.split('');

       for(let i = 0; i < randPhraselength; i++) {
         let li = document.createElement("li");
         li.textContent = letters[i];

         if(letters[i] === " " ) {
           li.classList.add('space');
         } else {
           li.classList.add('letter');
         }

        ul.appendChild(li);
       }
     }

  addPhraseToDisplay();
  //==========================================================================
  //add an event listener to keyboard for chosen letters
  //==========================================================================
  keyboard.addEventListener('click', (event) => {

      if(event.target.tagName == 'BUTTON') {
        let button = event.target;
        button.classList.add('chosen');

        checkLetter(button);
      }
  });
  //=============================================================================
  //replace liveHearts with lostHearts if wrong letter chosen
  //=============================================================================
  function changeHeart() {
      const heart = document.getElementsByTagName('img');
      heart[missed - 1].src = 'images/lostHeart.png';
      checkWin();
  }
//=============================================================================
//create checkLetter function to see if it matches the random phrase
//=============================================================================
  function checkLetter(button) {
    let phraseLetters = document.querySelectorAll('.letter');
    let foundLetter = false;
    let match = null;

    for(let i = 0; i < phraseLetters.length; i++) {
      if(phraseLetters[i].textContent == button.textContent ) {
          phraseLetters[i].classList.add('show');
          phraseLetters[i].style.transition = "all 1s";
          foundLetter = true;
          match = button.textContent;
          checkWin();
        }
      }
      //count the missed guesses in the game

      if(foundLetter == false){
        button.setAttribute('disabled', true);
        missed ++;
        changeHeart();
        }
    }
//=============================================================================
//create checkWin function
//=============================================================================
  function checkWin() {
    let guesses = document.getElementsByClassName('show');
    let correctPhrase = document.getElementsByClassName('letter');
    let overlay = document.getElementById('overlay');

    if(guesses.length === correctPhrase.length) {
      overlay.classList.add('win');
      title[0].innerHTML = "YOU WON!"
      resetBtn[0].innerHTML = "Play again?";
      displayWinLost();
    }
      else if(missed === 5) {
        overlay.classList.add('lose');
        title[0].innerHTML = "YOU LOST"
        resetBtn[0].innerHTML = "Play again?";
        displayWinLost();
      }
  }
//=============================================================================
//create function to display the win/lost pages and be able to reset the game
//=============================================================================
  function displayWinLost() {
    overlay.style.display = '';
      resetBtn[0].addEventListener('click', (event) => {
        });
  }
});
