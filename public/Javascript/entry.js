function goHome(){
    window.location.replace("http://localhost:8888/home")
}

function login(){
    window.location.replace("../Templates/login.html")
}

function recover(){
    window.location.replace("../Templates/recover.html")
}

function signup() {
    window.location.replace("../Templates/signup.html")
  }

function aboutUs(){
    window.location.replace("../Templates/about.html")
}

  document.addEventListener('DOMContentLoaded', function() {
    // Adicione um evento ao formulário de signup
    document.querySelector('form').addEventListener('submit', function(event) {
        // Obtenha o valor do campo de username
        var username = document.getElementById('username').value;

        // Armazene o username na sessionStorage
        sessionStorage.setItem('username', username);
    });
});