var inquirer = require("inquirer");
var Word = require("./word.js");

var wins = 0;
var losses = 0;

var wordToGuess = new Word("momomonkeys");
wordToGuess.initLetters();
/*
console.log(wordToGuess.wordComplete());
wordToGuess.displayWord();

wordToGuess.checkGuess("m");
wordToGuess.checkGuess("o");
wordToGuess.checkGuess("n");
wordToGuess.checkGuess("k");
wordToGuess.checkGuess("e");
wordToGuess.checkGuess("y");
wordToGuess.checkGuess("s");

wordToGuess.displayWord();
console.log(wordToGuess.wordComplete());
*/

wordToGuess.displayWord();
getUserGuess();
//wordToGuess.displayWord();

function getUserGuess(){
    var question = {
        name:"letterGuess",
        type:"input",
        message:"Guess letter: ",
        validate: function(input){
            if(input.length === 1 && /^[a-z]+$/.test(input) )
                return true;
            else    
                return false;
        }
    };
    inquirer
        .prompt(question)
        .then(function(answer){
            if(wordToGuess.checkGuess(answer.letterGuess))
                console.log("Correct");
            else    
                console.log("Wrong");

            wordToGuess.displayWord();
            console.log("Guesses left: " + wordToGuess.guessesRemaining);
            console.log("Letters guessed: " + wordToGuess.userGuesses);

            if(!wordToGuess.wordComplete() && wordToGuess.guessesRemaining > 0)
                getUserGuess();
            else{
                console.log("Game Over");
                if(wordToGuess.wordComplete()){
                    console.log("You Win");
                    wins++;
                }
                else{    
                    console.log("You Lose");
                    losses++;
                }
                
                console.log(`Wins: ${wins} Losses: ${losses}`);
                restart();
            }
    });
}

function restart(){

    var question = {
        name:"restart",
        type:"list",
        message:"Restart?",
        choices:["yes", "no"]
    };

    inquirer
        .prompt(question)
        .then(function(answer){
            if(answer.restart === "yes"){
                wordToGuess = new Word("monkeys");
                wordToGuess.initLetters();
                wordToGuess.displayWord();
                getUserGuess();     
            }else
                console.log("GOOD BYE");
        });
}

/*
function start() {
    inquirer
      .prompt({
        name: "postOrBid",
        type: "rawlist",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid.toUpperCase() === "POST") {
          postAuction();
        }
        else {
          bidAuction();
        }
      });
  }
  */

/*
wordToGuess.initLetters();
wordToGuess.displayWord();
console.log(wordToGuess.guessesRemaining);
wordToGuess.checkGuess("m");
wordToGuess.displayWord();
wordToGuess.checkGuess("q");
console.log(wordToGuess.guessesRemaining);
wordToGuess.displayWord();
*/