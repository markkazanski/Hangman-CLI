var Letter = require("./letter.js");

function Word(value){
    this.value = value;
    this.length = this.value.length;
    this.guessesRemaining = 7;
    this.lettersArray = [];
    this.initLetters = function(){
        for(var i=0; i<this.value.length; i++){
            this.lettersArray.push( new Letter( this.value[i]) ); //add letter to array
        }
        console.log(this.lettersArray);
    };
    this.checkGuess = function(guess){
        var correctGuess = false;
        for(var i=0; i<this.lettersArray.length; i++){
            if( this.lettersArray[i].value === guess ){
                correctGuess = true;
                this.lettersArray[i].isGuessed = true;
            }
        }

        if(!correctGuess) this.guessesRemaining--;
        
        return correctGuess;
    };
    this.displayWord = function(){
        var output = "";
        for(var i=0; i<this.lettersArray.length; i++){
            output += this.lettersArray[i].output();
        }
        console.log(output);    
    };
    this.wordComplete = function(){
        var complete = true;
        for(var i=0; i<this.lettersArray.length; i++){
            if(!this.lettersArray.isGuessed)
                complete = false;
        }
        return complete;
    };
}

module.exports = Word;