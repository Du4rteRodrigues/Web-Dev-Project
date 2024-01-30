function goHome(){
    window.location.href = '/home';
}

function login(){
    window.location.href = '/login';
}

function recover(){
    window.location.href = '/login';
}

function signup() {
    window.location.href = '/signup';
  }

function aboutUs(){
    window.location.href = '/about';
}

  document.addEventListener('DOMContentLoaded', function() {
    // Adicione um evento ao formulário de signup
    document.querySelector('form').addEventListener('submit', function(event) {
        // Obtenha o valor do campo de username
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        // Armazene o username na sessionStorage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password)
    });

});