// const express = require('express')
// const cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser');
// const {getCount} = require('./database')

document.addEventListener('DOMContentLoaded', function () {
  var openPopupBtn = document.getElementById('openPopupBtn');
  var closePopupBtn = document.getElementById('closePopupBtn');
  var logoutBtn = document.getElementById('logoutBtn');
  var profileBtn = document.getElementById('profileBtn');
  var popup = document.getElementById('popup');

  window.onload= createPost

  // Abrir o pop-up
  openPopupBtn.addEventListener('click', function () {
    popup.style.display = 'block';
  });

  // Fechar o pop-up
  closePopupBtn.addEventListener('click', function () {
    popup.style.display = 'none';
  });

  // Ação de logout
  logoutBtn.addEventListener('click', function () {
    // Adicione aqui a lógica de logout
    alert('Logout realizado com sucesso!');
    window.location.href = "/public/Templates/login.html"
    popup.style.display = 'none';
  });

  // Outra ação
  profileBtn.addEventListener('click', function () {
    // Adicione aqui a lógica para a outra ação
    alert('Outra opção realizada com sucesso!');
    popup.style.display = 'none';
  });
});

/*
function createPost(num){
  for(var i=0; i<num;i++){
      var post = document.createElement('div');
      var infoDiv = document.createElement('div')
      var contentDiv = document.createElement('div')
      var engagmentDiv = document.createElement('div')
      engagmentDiv.style.height = '50px'

      var title = document.createElement('textarea');
      var user = document.createElement('textarea')
      var content = document.createElement('textarea')
      var likes = document.createElement('input')

      var likeImg = document.createElement('img')
      var dislikeImg = document.createElement('img')
      var br = document.createElement("br")
  
      title.className = 'post-content'
      title.id = 'post-title'
      title.readOnly = true
      title.placeholder = '80 chars'

      user.className = 'post-content'
      user.id = 'post-user'
      user.readOnly = true
      user.placeholder = '14 chars'

      content.id = 'post-content'
      content.className = 'post-content'
      content.readOnly = true
      content.placeholder='900 chars'

      likes.id = 'post-likes'
      likes.className= 'post-engagment'
      likes.value = 0
      likes.readOnly = true
      likes.disabled= "yes"
      likes.type = 'number'

      likeImg.src ='../Images/up.png'
      likeImg.id = 'post-like-img'
      likeImg.className ='post-engagment-img'
      likeImg.addEventListener("click", function() { changeLikes('up');});
      
      dislikeImg.src ='../Images/down.png'
      dislikeImg.id = 'post-dislike-img'
      dislikeImg.className ='post-engagment-img'
      dislikeImg.addEventListener("click", function() { changeLikes('down');});

      post.className='post';

      infoDiv.appendChild(user)
      infoDiv.appendChild(title)
      contentDiv.appendChild(content)
      engagmentDiv.appendChild(likes)
      engagmentDiv.appendChild(dislikeImg)
      engagmentDiv.appendChild(likeImg)
      post.appendChild(infoDiv)
      post.appendChild(content)
      post.appendChild(engagmentDiv)

      document.getElementsByTagName('section')[0].appendChild(post);
      document.getElementsByTagName('section')[0].appendChild(br);
  }
}
*/

function aboutUs(){
window.location.replace("http://localhost:8888/about")
}
