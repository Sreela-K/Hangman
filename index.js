const wordDisplay = document.querySelector(".word-display")
const keyboardDiv = document.querySelector(".keyboard")
const guessesText = document.querySelector(".guesses b")
const hangmanImg = document.querySelector('.hangmanBox img')
const gameModal = document.querySelector('.game-modal')
const playAgainbtn = document.querySelector('.play-again')


let currentWord, correctLetters = [],
    wrongGuessCount = 0;
const maxGuesses = 6;

const resetGame= ()=>{
    //restarting all game variables and UI elements
    correctLetters = []
    wrongGuessCount = 0;
    hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled=false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //getting randon word and hint 
    const {
        word,
        hint
    } = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word;
    //hint
    document.querySelector(".hint-text b").innerHTML = hint;
    //word
    console.log(word)
    resetGame();
   

}

//gameover
 const gameOver = (isVictory)=>{
    //after 600ms of game complete.. showing modal with relevant details
    setTimeout(() => {
        const modalText =isVictory?`You found the word` : `The correct word is:`
        gameModal.querySelector("img").src =`images/${isVictory ? 'victory': 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!': 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300)
 }


const initGame = (button, clickedLetter) => {
    //checking if the clicked letter is present in current word
    if (currentWord.includes(clickedLetter)) {
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");

            }
        })
    } else {
        //if clicked letter dosent exist then updae the wrongguess count and img
        wrongGuessCount++;
        hangmanImg.src = `images/hangman-${wrongGuessCount}.svg`
    }
    button.disabled = true;
    guessesText.innerHTML = `${wrongGuessCount} / ${maxGuesses}`;

    //calling gameover funtion if any of this condition meets
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}
//creating keyboard buttons and adding event listener
for (let i = 97; i <= 122; i++) { //ascii values
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => {
        initGame(e.target, String.fromCharCode(i))
    })
}



getRandomWord();
playAgainbtn.addEventListener("click",getRandomWord)