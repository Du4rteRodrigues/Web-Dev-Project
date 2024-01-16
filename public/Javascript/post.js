document.addEventListener("DOMContentLoaded", function () {
    // Seleciona o botão "Create Post" e o popup
    var createPostBtn = document.getElementById("createPostBtn");
    var postPopup = document.getElementById("postPopup");
    var closePostPopupBtn = document.getElementById("closePostPopupBtn");
    var postPopup = document.getElementById("postPopup");

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


    // Adiciona um evento de clique ao botão "Create Post"
    createPostBtn.addEventListener("click", function () {
        // Exibe o popup
        postPopup.style.display = "block";
    });

    closePostPopupBtn.addEventListener("click", function () {
        // Fecha o popup
        postPopup.style.display = "none";
    });

    for (const post of posts) {
        // Aqui você pode criar elementos HTML ou fazer qualquer coisa que desejar
        const postElement = document.createElement('div');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <p>Author: ${post.username}</p>
        `;
    
        // Adicionar o elemento do post à seção da página
        document.querySelector('section').appendChild(postElement);
      }


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

window.addEventListener("load", myInit, true); 

