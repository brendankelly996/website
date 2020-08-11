let drums = document.querySelectorAll(".drum").length;
let drum = document.querySelectorAll(".drum");

for (let i = 0; i < drums; i++){

drum[i].addEventListener("click", function(){
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);

});

document.addEventListener("keydown", function(event){
    makeSound(event.key);
    buttonAnimation(event.key);

});

}

    function makeSound(key){
        switch(key){
    
            case "w": 
            let crash = new Audio ("drumsounds/crash.mp3");
            crash.play();
            break;
    
            case "a": 
            var kick = new Audio('drumsounds/kick-bass.mp3');
            kick.play();
            break;
    
            case "s": 
            var snare = new Audio('drumsounds/snare.mp3');
            snare.play();
            break;
    
            case "d": 
            var tomOne = new Audio('drumsounds/tom-1.mp3');
            tomOne.play();
            break;
    
            case "j": 
            let tom2 = new Audio('drumsounds/tom-2.mp3');
            tom2.play();
            break;
    
            case "k": 
            let tom3 = new Audio('drumsounds/tom-3.mp3');
            tom3.play();
            break;
    
            case "l": 
            let tom4 = new Audio('drumsounds/tom-4.mp3');
            tom4.play();
            break;
    
    
            default: console.log();
    
        }
    }

    function buttonAnimation(currentKey){
        var activeButton = document.querySelector("." + currentKey)
        activeButton.classList.add("pressed");
        setTimeout(function(){
            activeButton.classList.remove("pressed");},100)}