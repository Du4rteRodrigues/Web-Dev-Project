function aboutUs(){
  window.location.replace("../Templates/about.html")
}

document.addEventListener('DOMContentLoaded', function () {
  var logoutBtn = document.getElementById('logoutBtn');
  var management = document.getElementById('moderation-btn');
  var currentUser = document.getElementById('current-user')
  var userElement = document.querySelector('.user');
  var postBtnElement = document.getElementById('postBtn');
  var aboutBtn = document.getElementById("about-us")

aboutBtn.addEventListener('click',function () {
  window.location.href = '/about';
})

logoutBtn.addEventListener('click',function () {
  window.location.href = '/login';
})

postBtnElement.addEventListener('click',function () {
  if(currentUser.textContent == "Login"){
    window.location.href = '/login';
    return;
  }
  window.location.href = '/post';
})

management.addEventListener('click',function () {
  window.location.href = '/moderation';
})

currentUser.addEventListener('click',function () {
  if(currentUser.textContent == "Login"){
    window.location.href = '/login';
    return;
  }
  window.location.href = '/profile';
})

window.onload = onLoad
async function onLoad() {
  try {
     const postResponse = await fetch('/post-data-json');
     if (!postResponse.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
     }
     const postData = await postResponse.json();

     const userResponse = await fetch('/user-data-json');
     if (!userResponse.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
     }
     const userData = await userResponse.json();

     getUserCard(userData)
     createPosts(postData, userData);
     updateContentHeight();
    return data;
  } catch (error) {
     console.error('Error fetching data:', error);
  }

 
}

  window.addEventListener('scroll', function() {
    userElement.classList.add('follow')
    postBtnElement .classList.add('follow')
  });

management.addEventListener('click',function () {
  window.location.href = '/moderation';
});

function getUserCard(userData){
  var storedUsername = sessionStorage.getItem('username');
  const userCard = document.querySelector(".user")
  const currentUser = document.getElementById('current-user')
  const modBtn = document.getElementById('moderation-btn')

  if (storedUsername) {
    currentUser.textContent= `${storedUsername}`
    userCard.style.display = 'flex'
    if(storedUsername != "Login"){
    const user = userData.users.find(user => user.user_name === storedUsername);
    if(user.role == "admin"){modBtn.style.display = 'flex'}
    }
    
  }
}
  
function changeNumberSize(num){
  if(num.value == 0){
    num.style.width = '35px'
  }else if (num.value/10 <= 5){
    num.style.width = `55px`
  }
  else if (num.value/10 <= 10){
    num.style.width = `75px`
  }else if (num.value/10 >= 99){
    num.style.width = `110px`
  }
  return num.style.width
}

function createPosts(postData, userData){
  const num = postData.postCount

  for(var i=0; i<num;i++){
      var post = document.createElement('div');
      var infoDiv = document.createElement('div')
      var contentDiv = document.createElement('div')
      var engagmentDiv = document.createElement('div')

      var title = document.createElement('textarea');
      var user = document.createElement('textarea')
      var content = document.createElement('textarea')
      var likes = document.createElement('input')

      var likeImg = document.createElement('img')
      var dislikeImg = document.createElement('img')
      var commentsImg = document.createElement('img')

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
      title.value = postData.posts[i].post_title

      user.className = 'post-user'
      user.id = `post-user-${i}`
      user.readOnly = true
      const postUserId = postData.posts[i].user_id;
      const userDataForPost = userData.users.find(users => users.user_id === postUserId);
      user.value = userDataForPost.user_name;


      content.id = `post-content-${i}`
      content.className = 'post-content'
      content.readOnly = true
      content.value = postData.posts[i].post_content
      
      likes.id = `post-likes-${i}`
      likes.className= 'post-engagment'
      likes.value = postData.posts[i].post_likes
      likes.readOnly = true
      likes.disabled= "yes"
      likes.type = 'number'

      if(likes.value == 0){
        likes.style.width = '35px'
      }else if (likes.value/10 <= 1){
        likes.style.width = `55px`
      }
      else if (likes.value/10 <= 10){
        likes.style.width = `75px`
      }else if (likes.value/10 >= 99){
        likes.style.width = `110px`
      }

      const id = postData.posts[i].post_id

      likeImg.src ='../Images/up.png'
      likeImg.id = `post-like-img-${i}`
      likeImg.className ='post-up'
      likeImg.addEventListener("click", function() {
         changeLikes('up', this.id, id)
      })

      dislikeImg.src ='../Images/down.png'
      dislikeImg.id = `post-dislike-img-${i}`
      dislikeImg.className ='post-down'
      dislikeImg.addEventListener("click", function() {
         changeLikes('down', this.id, id);
      })

      commentsImg.src ='../Images/comments.png'
      commentsImg.id = `post-comments-img-${i}`
      commentsImg.className ='post-comments-img'
       commentsImg.addEventListener("click", function() {
          getComments(id);
        }
         );

      infoDiv.appendChild(user)
      infoDiv.appendChild(title)
      contentDiv.appendChild(content)
      engagmentDiv.appendChild(likes)
      engagmentDiv.appendChild(dislikeImg)
      engagmentDiv.appendChild(likeImg)
      engagmentDiv.appendChild(commentsImg)

      post.appendChild(infoDiv)
      post.appendChild(contentDiv)
      post.appendChild(engagmentDiv)
      document.getElementsByTagName('section')[0].appendChild(post);
  }
}

async function getComments(id){
  const currentUser = document.getElementById('current-user')
  if(currentUser.textContent == "Login"){
    window.location.href = '/login';
    return;
  }
  const postId = id
  
  try {const response = await fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        postId: postId,
      }),
  });
  window.location.href = '/comments';
  if (!response.ok) {
    throw new Error(`Failed to verify post: ${response.statusText}`);
  }
  // Optionally, you can update the UI or perform additional actions after a successful verification
} catch (error) {
  console.error('Error verifying post:', error);
}
}

async function updateLikes(id, newLikes) {
  const likeNum = newLikes.value  
  const postId = id
  try {const response = await fetch('/home', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        postId: postId,
        likes: likeNum,
      }),
  });
  if (!response.ok) {
    throw new Error(`Failed to verify post: ${response.statusText}`);
  }
} catch (error) {
  console.error('Error verifying post:', error);
}
}

function changeLikes(type, element, id){  
    const btn = document.getElementById(element)
    const post = document.getElementById(btn.parentNode.id)
    const currentUser = document.getElementById('current-user')
    const postId = id

  if(currentUser.textContent == "Login"){
    window.location.href = '/login';
    return;
  }

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
      updateLikes(postId, likes)
}

function updateContentHeight(){
  var allPosts = document.querySelectorAll('.post');
  allPosts.forEach(function(post) {
  var elementsInDiv = post.querySelectorAll('.post-content');
  updateSize(elementsInDiv);
});
}

function updateSize(elements) {
    elements.forEach(function(element) {
      element.style.height = element.scrollHeight+ 'px'
    });
}

});

async function getWeather() {
  try {
      const apiKey = '00e37a36f3be204d34c344b97edeaf11';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);

      // Atualiza o elemento HTML com as informações do tempo
      const weatherInfoElement = document.getElementById('weather-info');
      weatherInfoElement.innerHTML =
          `<p>Cidade: ${data.name}</p>
          <p>Temperatura: ${data.main.temp}°C</p>
          <p>Condição: ${data.weather[0].description}</p>`;
  } catch (error) {
      console.error('Erro ao obter dados do clima:', error);
  }
}


