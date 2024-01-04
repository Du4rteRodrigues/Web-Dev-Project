function post(){
    window.location.replace("../Templates/poster.html")
}

document.addEventListener('DOMContentLoaded', function() {
        // Obtenha o username da sessionStorage
        var username = sessionStorage.getItem('username');

        // Verifique se o username está definido
        if (username) {
            // Atualize o conteúdo da div com o username
            document.querySelector('.user h4').textContent = '@' + username;
        }
    });
         // Função para obter o valor de um cookie específico
    function getItem(username) {
        var cookieArr = document.cookie.split(';');
        for (var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split('=');
            if (username === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    }