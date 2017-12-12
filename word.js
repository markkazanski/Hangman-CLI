var Letter = require("./letter.js");

function Word(value){
    this.value = value;
    this.length = this.value.length;
    this.guessesRemaining = 7;
    this.lettersArray = [];
    this.userGuesses = [];
    this.initLetters = function(){
        for(var i=0; i<this.value.length; i++){
            this.lettersArray.push( new Letter( this.value[i]) ); //add letter to array
        }
        //console.log(this.lettersArray);
    };
    this.checkGuess = function(guess){
        var correctGuess = false;

        if(this.alreadyGuessed(guess))
            return false;

        for(var i=0; i<this.lettersArray.length; i++){
            if( this.lettersArray[i].value === guess ){
                correctGuess = true;
                this.lettersArray[i].isGuessed = true;
            }
        }

        if(!correctGuess) this.guessesRemaining--;
        
        this.userGuesses.push(guess);

        return correctGuess;
    };
    this.displayWord = function(){
        var output = "";
        for(var i=0; i<this.lettersArray.length; i++){
            output += this.lettersArray[i].output() + " ";
        }
        console.log("Word: " + output);    
    };
    this.wordComplete = function(){
        var complete = true;
        for(var i=0; i<this.lettersArray.length; i++){
            if(!this.lettersArray[i].isGuessed)
                complete = false;
        }
        return complete;
    };
    this.alreadyGuessed = function(guess){
        for(var i=0; i < this.userGuesses.length; i++){
            if(this.userGuesses[i] === guess)
                return true;
        }
        return false;
    };
}

module.exports = Word;