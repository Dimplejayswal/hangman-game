
const DEFAULT_IMAGE = "001-face.png"
// @NOTE: your game must work for any size array!
const POSSIBLE_WORDS = ["TORONTO", "PARIS", "ROME", "MISSISSIPPI"]; 
const numberarray = [];
const MAX_CHANCES = 6;
let REMAINING_CHANCES = MAX_CHANCES;
let currentWord = "";
let current_word_Array = [];
let current_word_guess_array = [];
let currentWordGuess = "";
let clickedCharacter = "";
let firstrun = 1;
let flagstart = 0;
const moviesname = ['Dark','Love','Transformer','Baby'].map(v => v.toUpperCase());
const contriesname = ['India','Canada','USA','UK'].map(v => v.toUpperCase());
const languagename = ['Gujarati','Hindi','English','French'].map(v => v.toUpperCase());



// game variables
const saveGame = function() {
  alert("SAVING THE GAME!");
  console.log("Save Game button pressed");
  
  let player = {
    "word":currentWord,
    "Remaning chances":REMAINING_CHANCES
}
localStorage.setItem("Hangman", JSON.stringify(player));
  
}

const startGame = function() {

   alert("Starting the Game");
   var category = document.getElementById('categoryoption')
   console.log(category.value);
   const randomvalue = Math.floor((Math.random() * 4)+0);

   if(category.value === "countries"){
    currentWord = contriesname[randomvalue];
   }
   else if(category.value === "movies"){
    currentWord = moviesname[randomvalue];
   }
   else if(category.value === "languages"){
    currentWord = languagename[randomvalue];
   }
   else{
      console.log("Nothing is selected");
   }
   let letterArray = document.querySelectorAll(".letter");
   for(let i=0;i<letterArray.length;i++)
   {
     letterArray[i].classList.remove("disable");
   }
   current_word_Array.length = 0;
   current_word_guess_array.length = 0;
   currentWordGuess = "";
   document.querySelector("#word").innerText = currentWordGuess;
   document.querySelector("#img-hangperson-status").src = "img/img1.png";
   document.querySelector("#results").innerText = "";
   REMAINING_CHANCES = 6;
   gameOver = 0;
  numberarray.push(randomvalue);
  document.querySelector("#debug-actual-word").innerText = "DEBUG: Selected Word is: "+currentWord; 
  document.querySelector(".chancesLabel").innerText = REMAINING_CHANCES;
  
  for(let i=0;i<currentWord.length;i++){
      console.log(currentWord.charAt(i));
      current_word_Array.push(currentWord.charAt(i));
      current_word_guess_array.push("_"); 
  }
 

  console.log("Current word length:"+currentWord.length);


  for(let i=0;i<currentWord.length;i++){
    currentWordGuess = currentWordGuess.concat(current_word_guess_array[i]," "); 
  }
  console.log("Current guess :"+currentWordGuess);
  document.querySelector("#word").innerText = currentWordGuess;
  flagstart = 1;

}
const getletter = function(){

  if(flagstart === 1){
    let gameOver = 0;
    this.classList.add("disable");
    for(let i=0;i<currentWord.length;i++){
      if(current_word_guess_array[i] === "_")
      {
        gameOver = 0;
        break;
      }
      else{
        gameOver = 1;
      }
    }
  
    if(gameOver === 1)
    {
      document.querySelector("#results").innerText = "GAME OVER! YOU WIN!"
    }
    else{
    clickedCharacter = this.innerText;
    console.log(clickedCharacter);
    checkChar();
    }
  }
  else{
    alert("Please press start to play the game")
  }
  
}
 
  buttons = document.querySelectorAll(".letter")
  for(const button of buttons){
  button.addEventListener("click",getletter);
}

const checkChar = function(){
  
  if(REMAINING_CHANCES > 0)
  {
    let checkwordavailable = 0;
    for(let i=0;i<currentWord.length;i++){
      if(current_word_Array[i] === clickedCharacter)
      {
          current_word_guess_array[i] = clickedCharacter;
          checkwordavailable = 1;
      }
  }
  if(checkwordavailable === 0)
  {
      REMAINING_CHANCES = REMAINING_CHANCES - 1;  
      document.querySelector("#results").innerText = "WRONG! "+clickedCharacter+" is not in the word!"
  }
  else{
    checkwordavailable = 0;
    document.querySelector("#results").innerText = "CORRECT! "+clickedCharacter+" is in the word!"
  }
  updateDashes();
}

if(REMAINING_CHANCES === 5)
{
  document.querySelector("#img-hangperson-status").src = "img/002.png";
}
if(REMAINING_CHANCES === 4)
{
  document.querySelector("#img-hangperson-status").src = "img/003.png";
}
if(REMAINING_CHANCES === 3)
{
  document.querySelector("#img-hangperson-status").src = "img/004.png";
}
if(REMAINING_CHANCES === 2)
{
  document.querySelector("#img-hangperson-status").src = "img/005.png";
}
if(REMAINING_CHANCES === 1)
{
  document.querySelector("#img-hangperson-status").src = "img/006.png";
}
if(REMAINING_CHANCES === 0)
{
  document.querySelector("#img-hangperson-status").src = "img/007.png";
}
document.querySelector(".chancesLabel").innerText = REMAINING_CHANCES;

let gameOver = 0;
  for(let i=0;i<currentWord.length;i++){
    if(current_word_guess_array[i] === "_")
    {
      gameOver = 0;
      break;
    }
    else{
      gameOver = 1;
    }
  }

if(gameOver === 1)
{
  document.querySelector("#results").innerText = "GAME OVER! YOU WIN!"
  flagstart = 0;
}
if(gameOver === 0 && REMAINING_CHANCES <1)
{
  document.querySelector("#results").innerText = "GAME OVER! YOU LOSE!"
  flagstart = 0;
}

}

const updateDashes = function(){
  currentWordGuess = "";
  for(let i=0;i<currentWord.length;i++){
    currentWordGuess = currentWordGuess.concat(current_word_guess_array[i]," "); 
  }
  console.log("Current guess :"+currentWordGuess);
  document.querySelector("#word").innerText = currentWordGuess;
}

// -------------------
// EVENT LISTENERS
// -------------------

// start button: when clicked, start a new game
document.querySelector(".btn-start-game").addEventListener("click", startGame);

// save button: when clicked, save game to local storage
document.querySelector(".btn-save-game").addEventListener("click", saveGame);


