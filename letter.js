function Letter(value){
    this.value = value;
    this.isGuessed = false;
    this.output = function(){
        if(this.isGuessed)
            return this.value;
        else    
            return "_";
    };
}
    
module.exports = Letter;