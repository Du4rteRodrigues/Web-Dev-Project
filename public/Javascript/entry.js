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