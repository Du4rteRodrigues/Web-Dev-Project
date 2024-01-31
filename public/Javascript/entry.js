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
    document.querySelector('form').addEventListener('submit', function(event) {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password)
    });

});