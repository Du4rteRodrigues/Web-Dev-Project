const loginForm =document.getElementById('loginForm');
const signinForm =document.getElementById('signinForm');
const recoverForm =document.getElementById('recoverForm');


function showForm(id){
    //Put all none
    document.getElementById("login").style.display = "none";
    document.getElementById("recover").style.display = "none";
    document.getElementById("signin").style.display = "none";

    document.getElementById(id).style.display = "block";
}

function goHome(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/index.html")
}
function post(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/post.html")
}

function signin(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}

function login(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}

function editProfile(){
    window.location.replace("http://127.0.0.1:5500/public/Templates/entry.html")
}