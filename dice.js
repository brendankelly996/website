let image1 = document.querySelector(".img1");
let image2 = document.querySelector(".img2");
let h1 = document.querySelector("h1");
let refresh = document.querySelector("#refresh");
let refreshMe = document.querySelector(".refreshMe")
let random1 = Math.floor(Math.random() * 6) + 1;
let random2 = Math.floor(Math.random() * 6) + 1;
let randomDice1 = "dice/dice"+random1+".png";
let randomDice2 = "dice/dice"+random2+".png";

const refreshDie = () => {
    image1.setAttribute("src", randomDice1);
    image2.setAttribute("src", randomDice2);
if(random1 > random2){
    h1.innerText = "Player 1 Wins!"
}
if (random1 === random2){
    h1.innerText = "It's a Tie!"
}
if (random1 < random2){
    h1.innerText = "Player 2 Wins!"
}
    refresh.style.display = "none";
    refreshMe.style.display= "block";
}

const refreshPage = () => {
    window.location.reload();
}

refresh.addEventListener("click", refreshDie);
refreshMe.addEventListener("click", refreshPage);






