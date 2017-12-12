var inquirer = require("inquirer");
var Word = require("./word.js");
//var Animals = require("./animals.txt");
var fs = require("fs");

var animalsArray = [];

function randomWord(){
    fs.readFile("animals.txt", "utf8", function(error, data) {
        
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        
        // We will then print the contents of data
        //console.log(data);
        
        // Then split it by commas (to make it more readable)
        var animalsArray = data.split("\r\n");
        
        wordToGuess = new Word( animalsArray[ randomIntFromInterval(0, animalsArray.length) ] );
        wordToGuess.initLetters();
        wordToGuess.displayWord();
        getUserGuess();
    });
}
    

var wins = 0;
var losses = 0;

var wordToGuess = new Word("momomonkeys");
wordToGuess.initLetters();

randomWord();

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
                    console.log("You Lose! It was: " + wordToGuess.value);
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
                randomWord();
                //wordToGuess.initLetters();
                //getUserGuess();     
            }else
                console.log("GOOD BYE");
        });
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
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