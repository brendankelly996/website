class Timer {
    //receive some arguements inside our constructor
    constructor(durationInput, startButton, pauseButton, callbacks) {
        //store a reference to the arguements in case we need to work with them further
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        //bind event listeners to the arguements we selected
        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }

//create a method that will be called which we defined inside of our class
start = () => {
    if (this.onStart){
        this.onStart(this.timeRemaining);
    }
    //immediately run 1 tick
    this.tick();
    //to call the tick function every second we use the built in setInterval
    //Whenever you call set interval you get back an integer - The integer is an id
    //We use this. to assign the timer variable we create to the class in order to share information between the functions in the class
    this.interval = setInterval(this.tick, 50);
 };

 //call tick method
tick = () => {
    //the timeRemaining - 1 is automatically set as time in the "set" function because we used that keyword
    if(this.timeRemaining <= 0){
        this.pause();
        if(this.onComplete){
            this.onComplete();
    }
}else {
        this.timeRemaining = this.timeRemaining - 0.05;
        if(this.onTick){
            this.onTick(this.timeRemaining);
        }
    }
};

get timeRemaining(){
     //parseFloat takes a string that has a number and extracts the number value
     //We could use parseInt however it does not support decimals
    return parseFloat(this.durationInput.value);
}

//toFixed rounds to the indicated number of decimal places you pass in
set timeRemaining(time){
    this.durationInput.value = time.toFixed(2);
}

pause = () => {
    clearInterval(this.interval);

};

}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const circle = document.querySelector('circle');

//calculating the perimeter of the circle so we can create an animation
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

//create a counter that we want the stroke dashoffset to be removed from
//this counter "duration" goes to negative integers from 0 as we want the animation to run clockwise

//create the instance for the timer and pass in the three elements we just selected
let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
    onStart(totalDuration){
        duration = totalDuration;
    },
    onTick(timeRemaining){
        circle.setAttribute('stroke-dashoffset',
          perimeter * timeRemaining / duration - perimeter
          );
        //offset = (perimeter * timeRemaining)/totalDuration - perimeter
    },
    onComplete(){
        console.log("Timer Complete");
    }
});

//added 4th arguement that has three callbacks functions
//we added the callbacks arguement above in the class
//we set these callbacks using the this. keyword and assigning it
//performed multiple checks using if statements