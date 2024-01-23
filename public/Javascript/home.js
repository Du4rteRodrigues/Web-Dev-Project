
function post(){
  window.location.replace("../Templates/poster.html")
}

function aboutUs(){
  window.location.replace("../Templates/about.html")
}


document.addEventListener('DOMContentLoaded', function () {
  var openPopupBtn = document.getElementById('openPopupBtn');
  var closePopupBtn = document.getElementById('closePopupBtn');
  var logoutBtn = document.getElementById('logoutBtn');
  var profileBtn = document.getElementById('profileBtn');
  var popup = document.getElementById('popup');


  window.onload= onLoad

  function onLoad(){
    createPosts()
    updateContentHeight()
  }

  var userElement = document.querySelector('.user');
  var postBtnElement = document.getElementById('postBtn');

  window.addEventListener('scroll', function() {
    userElement.classList.add('follow')
    postBtnElement .classList.add('follow')
  });


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

function changeNumberSize(num){
  if(num.value == 0){
    num.style.width = '35px'
  }else if (num.value/10 <= 1){
    num.style.width = `50px`
  }
  else if (num.value/10 <= 10){
    num.style.width = `70px`
  }else if (num.value/10 >= 100){
    num.style.width = `100px`
  }
  return num.style.width
}

function createPosts(){

  for(var i=0; i<10;i++){
      var post = document.createElement('div');
      var infoDiv = document.createElement('div')
      var contentDiv = document.createElement('div')
      var engagmentDiv = document.createElement('div')

      var title = document.createElement('textarea');
      var user = document.createElement('textarea')
      var content = document.createElement('textarea')
      var likes = document.createElement('input')
      var commentNum = document.createElement('input')

      var likeImg = document.createElement('img')
      var dislikeImg = document.createElement('img')
      var commentsImg = document.createElement('img')
      var br = document.createElement("br")

      post.className='post';
      post.id = `post-${i}`

      infoDiv.id = `post-info-div-${i}`
      infoDiv.className = 'post-info-div'

      contentDiv.id = `post-content-div-${i}`
      contentDiv.className = 'post-content-div'

      engagmentDiv.id =`post-eng-div-${i}`
      engagmentDiv.className = 'post-engagment-div'
  
      title.className = 'post-title'
      title.id = `post-title-${i}`
      title.readOnly = true
      title.value = ''
      //80 chars

      user.className = 'post-user'
      user.id = `post-user-${i}`
      user.readOnly = true
      user.value= ''
      //17 chars

      content.id = `post-content-${i}`
      content.className = 'post-content'
      content.readOnly = true
      content.value = ''
      
      likes.id = `post-likes-${i}`
      likes.className= 'post-engagment'
      likes.value = 0
      likes.readOnly = true
      likes.disabled= "yes"
      likes.type = 'number'

      if(likes.value == 0){
        likes.style.width = '35px'
      }else if (likes.value/10 <= 1){
        likes.style.width = `50px`
      }
      else if (likes.value/10 <= 10){
        likes.style.width = `70px`
      }else if (likes.value/10 >= 99){
        likes.style.width = `100px`
      }

      likeImg.src ='../Images/up.png'
      likeImg.id = `post-like-img-${i}`
      likeImg.className ='post-up'
      likeImg.addEventListener("click", function() { changeLikes('up', this.parentNode.id);});
      
      dislikeImg.src ='../Images/down.png'
      dislikeImg.id = `post-dislike-img-${i}`
      dislikeImg.className ='post-down'
      dislikeImg.addEventListener("click", function() { changeLikes('down', this.id);});

      commentNum.id = `post-comments-${i}`
      commentNum.className= 'post-comments'
      commentNum.value = 0
      commentNum.readOnly = true
      commentNum.disabled= "yes"
      commentNum.type = 'number'
      if(commentNum.value == 0){
        commentNum.style.width = '35px'
      }else if (commentNum.value/10 <= 1){
        commentNum.style.width = `50px`
      }
      else if (commentNum.value/10 <= 10){
        commentNum.style.width = `70px`
      }else if (commentNum.value/10 >= 100){
        commentNum.style.width = `100px`
      }

      commentsImg.src ='../Images/comments.png'
      commentsImg.id = `post-comments-img-${i}`
      commentsImg.className ='post-comments-img'
      commentsImg.addEventListener("click", function() { changeComments('up', this.parentNode.id);});

      infoDiv.appendChild(user)
      infoDiv.appendChild(title)
      contentDiv.appendChild(content)
      engagmentDiv.appendChild(likes)
      engagmentDiv.appendChild(dislikeImg)
      engagmentDiv.appendChild(likeImg)
      engagmentDiv.appendChild(commentsImg)
      engagmentDiv.appendChild(commentNum)
      post.appendChild(infoDiv)
      post.appendChild(contentDiv)
      post.appendChild(engagmentDiv)
      document.getElementsByTagName('section')[0].appendChild(post);
      document.getElementsByTagName('section')[0].appendChild(br);
  }
}

function changeComments(type, element){
  const btn = document.getElementById(element)
  const post = document.getElementById(btn.parentNode.id)
  const commentsNum = post.querySelector('.post-comments')
  commentsNum.stepUp(1)
}

function changeLikes(type, element){
  const btn = document.getElementById(element)
  const post = document.getElementById(btn.parentNode.id)

  const likes = post.querySelector('.post-engagment')
  const upBtn = post.querySelector('.post-up')
  const downBtn = post.querySelector('.post-down')

  if(type == 'up'){
      if(upBtn.getAttribute('src') == '../Images/up.png' && downBtn.getAttribute('src') == '../Images/down.png'){
          upBtn.src = '../Images/up-clicked.png'
          likes.stepUp(1)
        likes.style.width = changeNumberSize(likes)
        likes.style.color = "#22B14C"
      }

      else if(upBtn.getAttribute('src') == '../Images/up-clicked.png'){
          upBtn.src = '../Images/up.png'
          likes.stepDown(1)
          likes.style.width = changeNumberSize(likes)
          likes.style.color = "black"
      }

      else if(downBtn.getAttribute('src') == '../Images/down-clicked.png' && upBtn.getAttribute('src') == '../Images/up.png'){
          downBtn.src = '../Images/down.png'
          upBtn.src = '../Images/up-clicked.png'
          likes.stepUp(2)
          likes.style.width = changeNumberSize(likes)
          likes.style.color = "#22B14C"
      }

      }

  else{
      if(downBtn.getAttribute('src') == '../Images/down.png' && upBtn.getAttribute('src') == '../Images/up.png'){
          downBtn.src = '../Images/down-clicked.png'
          likes.stepDown(1)
          likes.style.width = changeNumberSize(likes)
          likes.style.color = "red"
      }

      else if(downBtn.getAttribute('src') == '../Images/down-clicked.png'){
          downBtn.src = '../Images/down.png'
          likes.stepUp(1)
          likes.style.width = changeNumberSize(likes)
          likes.style.color = "black"
      }

      else if(upBtn.getAttribute('src') == '../Images/up-clicked.png' && downBtn.getAttribute('src') == '../Images/down.png'){
          downBtn.src = '../Images/down-clicked.png'
          upBtn.src = '../Images/up.png'
          likes.stepDown(2)
          likes.style.width = changeNumberSize(likes)
          likes.style.color = "red"
      }
      }
}
          // Obtenha o username da sessionStorage
        var username = sessionStorage.getItem('username');

function updateContentHeight(){
  var allPosts = document.querySelectorAll('.post');
  allPosts.forEach(function(post) {
  var elementsInDiv = post.querySelectorAll('.post-content');
  updateSize(elementsInDiv);
});
}

// Example: Log the text content of each element
function updateSize(elements) {
    elements.forEach(function(element) {
      element.style.height = element.scrollHeight+ 'px'
    });
}
});
