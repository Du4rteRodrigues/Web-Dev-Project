function goHome(){
    window.location.replace("http://localhost:8888/home")
}
function post(){
    window.location.replace("http://localhost:8888/post")
}

function updateInput(){
    var input = document.getElementById("input-user")
    input.value = document.getElementById("userName").textContent
}

// var form =document.getElementById("post-form") 

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log("made it")
//     var userInput = document.getElementById("input-user");
//     userInput.value = document.getElementsByName("user").textContent;
// });

function myInit(){
    updateInput()
} 

window.addEventListener("load", myInit, true); 