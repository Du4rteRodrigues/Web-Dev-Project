const loginForm =document.getElementById('loginForm');
const signupForm =document.getElementById('signupForm');
const recoverForm =document.getElementById('recoverForm');


function showForm(id){
    //Put all none
    document.getElementById("login").style.display = "none";
    document.getElementById("recover").style.display = "none";
    document.getElementById("signup").style.display = "none";

    document.getElementById(id).style.display = "block";
}

function goHome(){
    window.location.replace("http://localhost:8888/home")
}

function signup(){
    window.location.replace("http://localhost:8888/signup")
}

function login(){
    window.location.replace("http://localhost:8888/login")
}

function recover(){
    window.location.replace("http://127.0.0.1:5501/public/Templates/login.html")
}
