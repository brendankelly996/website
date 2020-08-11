const form = document.querySelector('form');
const messageForm = document.querySelector("#message-form");
const messageShow = document.querySelector("#message-show");
const linkForm = document.querySelector("#link-form");


const {hash} = window.location;
const message = atob(hash.replace('#',''));

if(message){
    messageForm.classList.add("hide");
    messageShow.classList.remove("hide");

    document.querySelector("h1").innerHTML = message;
}

form.addEventListener('submit', function(event){
    event.preventDefault();

    messageForm.classList.add("hide");
    linkForm.classList.remove("hide");

    const input = document.querySelector('#message-input');
    const encrypted = btoa(input.value);

    const linkInput = document.querySelector("#link-input");
    linkInput.value = `${window.location}#${encrypted}`;
    linkInput.select();
});

//convert to base64 encoding - use btoa() function - reverse the encoding with - atob() function 
