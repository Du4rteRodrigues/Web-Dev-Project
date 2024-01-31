
document.addEventListener('DOMContentLoaded', function () {
    var openPopupBtn = document.getElementById('openPopupBtn');
    var closePopupBtn = document.getElementById('closePopupBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var management = document.getElementById('moderation-btn');
    var profileBtn = document.getElementById('profileBtn');
    var currentUser = document.getElementById('current-user')
    var popup = document.getElementById('popup');
    var userElement = document.querySelector('.user');
    var postBtnElement = document.getElementById('postBtn');
    var aboutBtn = document.getElementById("about-us")
  
  aboutBtn.addEventListener('click',function () {
    window.location.href = '/about';
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
  
    function aboutUs(){
      window.location.replace("../Templates/about.html")
    }
  
  window.onload= onLoad
  
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

       const commentResponse = await fetch('/comment-data-json');
       if (!commentResponse.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
       }
       const commentData = await commentResponse.json();
  
       getUserCard(userData)
       createPosts(postData, userData);
       createForm(postData, userData)
       createComments(userData, commentData)
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
  
  
  
  management.addEventListener('click',function () {
    window.location.href = '/moderation';
  });
  
  function getUserCard(userData){
    var storedUsername = sessionStorage.getItem('username');
    const userCard = document.querySelector(".user")
    const currentUser = document.getElementById('current-user')
    const modBtn = document.getElementById('moderation-btn')
  
    // Checking if the username exists
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
  /*
        var likeImg = document.createElement('img')
        var dislikeImg = document.createElement('img')
        var commentsImg = document.createElement('img')
        */
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
        title.value = postData.posts[i].post_title
        //80 chars
  
        user.className = 'post-user'
        user.id = `post-user-${i}`
        user.readOnly = true
        const postUserId = postData.posts[i].user_id;
        const userDataForPost = userData.users.find(users => users.user_id === postUserId);
        user.value = userDataForPost.user_name;
  
        //17 chars
  
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
  
        /*
        const id = postData.posts[i].post_id
        //alert("nha: "+id)
  
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
        // commentsImg.addEventListener("click", function() {
        //    changeComments('up', this.parentNode.id);}
        //   );
        */
  
        infoDiv.appendChild(user)
        infoDiv.appendChild(title)
        contentDiv.appendChild(content)
        engagmentDiv.appendChild(likes)
        //engagmentDiv.appendChild(dislikeImg)
        //engagmentDiv.appendChild(likeImg)
        //engagmentDiv.appendChild(commentsImg)
  
        post.appendChild(infoDiv)
        post.appendChild(contentDiv)
        post.appendChild(engagmentDiv)
        document.getElementsByTagName('section')[0].appendChild(post);
        //document.getElementsByTagName('section')[0].appendChild(br);
    }
  }

 function createForm(postData, userData){
/*
      const postUserId = postData.posts[i].user_id;
      const userDataForPost = userData.users.find(users => users.user_id === postUserId);
      const storedUsername = sessionStorage.getItem('username');

      if (storedUsername != userDataForPost.user_name) {
          // Skip to the next iteration if the usernames don't match
          continue;
      }
      */

        var user = document.createElement('div');
        var nameDiv = document.createElement('div')
        var emailDiv = document.createElement('div')
        var passwordDiv = document.createElement('div')
        var moderateDiv = document.createElement('div')
  
        var username = document.createElement('textarea');
        var saveBtn = document.createElement('button')
        var deleteBtn = document.createElement('button')
        //var likes = document.createElement('input')

        var br = document.createElement("br")
  
        user.className='post';
        user.id = `post-`
  
        nameDiv.id = `post-name-div`
        nameDiv.className = 'post-name-div'

        emailDiv.id = `post-mail-div`
        emailDiv.className = 'post-mail-div'

        passwordDiv.id = `post-pass-div`
        passwordDiv.className = 'post-pass-div'
  
        moderateDiv.id =`post-eng-div`
        moderateDiv.className = 'post-engagment-div'

        username.className = 'comment-content'
        username.id = `com-content`
        username.readOnly = false
        username.value = ""
/*
        nameLabel.innerHTML = "Username:"
        nameLabel.id = ""
        nameLabel.className = ""
        
        passLabel.innerHTML = "Password:"
        passLabel.id = ""
        passLabel.className = ""
        
        emailLabel.innerHTML = "Email:"
        emailLabel.id = ""
        emailLabel.className = ""
    
        username.className = 'post-name'
        username.id = `post-name`
        username.readOnly = false
        username.value = ""
        //80 chars

        email.id = `post-email`
        email.className = 'post-email'
        email.readOnly = false
        email.value = ""

        password.id = `post-pass`
        password.className = 'post-pass'
        password.readOnly = false
        password.value = ""
        */
/*
        const user_id = currentUser.user_id

        deleteBtn.id = `post-delete`
        deleteBtn.className= 'post-delete'
        deleteBtn.innerHTML = "Delete"
        deleteBtn.onclick = function() {
          handleUser('delete',this.id, user_id,)};
*/
        const postId = postData.posts[0].post_id

        saveBtn.id = `post-edit`
        saveBtn.className= 'post-edit'
        saveBtn.innerHTML = "Comment"
        saveBtn.onclick = function() {
          saveComment(this.id, postId, userData)
        };
        
          
        //nameDiv.appendChild(nameLabel)
        nameDiv.appendChild(username)
        /*
        emailDiv.appendChild(emailLabel)
        emailDiv.appendChild(email)
        passwordDiv.appendChild(passLabel)
        passwordDiv.appendChild(password)
        */
        moderateDiv.appendChild(saveBtn)
        //moderateDiv.appendChild(deleteBtn)
        
  
        user.appendChild(nameDiv)
        //user.appendChild(passwordDiv)
        //user.appendChild(emailDiv)
        user.appendChild(moderateDiv)
        document.getElementsByTagName('section')[0].appendChild(user);
        //document.getElementsByTagName('section')[0].appendChild(br);
 }

 function createComments(userData, comData){
  const num = comData.comCount  
  for(var i=0; i<num;i++){
  /*
        const postUserId = postData.posts[i].user_id;
        const userDataForPost = userData.users.find(users => users.user_id === postUserId);
        const storedUsername = sessionStorage.getItem('username');
  
        if (storedUsername != userDataForPost.user_name) {
            // Skip to the next iteration if the usernames don't match
            continue;
        }
        */
  
          var user = document.createElement('div');
          var nameDiv = document.createElement('div')
          var emailDiv = document.createElement('div')
          var passwordDiv = document.createElement('div')
          var moderateDiv = document.createElement('div')
    
          var username = document.createElement('textarea');
          var content = document.createElement('textarea');
          var saveBtn = document.createElement('button')
          var deleteBtn = document.createElement('button')
          //var likes = document.createElement('input')
  
          var br = document.createElement("br")
    
          user.className='post';
          user.id = `post-`
    
          nameDiv.id = `post-name-div`
          nameDiv.className = 'post-name-div'
  
          emailDiv.id = `post-mail-div`
          emailDiv.className = 'post-mail-div'
  
          passwordDiv.id = `post-pass-div`
          passwordDiv.className = 'post-pass-div'
    
          moderateDiv.id =`post-eng-div`
          moderateDiv.className = 'post-engagment-div'
  
          username.className = 'comment-content'
          username.id = `com-content`
          username.readOnly = true
          const comUserId = comData.comments[i].user_id;
          const comDataForUsers = userData.users.find(users => users.user_id === comUserId);
          username.value = comDataForUsers.user_name;

          content.id = `post-email`
          content.className = 'post-email'
          content.readOnly = false
          content.value = comData.comments[i].comment_content
  /*
          nameLabel.innerHTML = "Username:"
          nameLabel.id = ""
          nameLabel.className = ""
          
          passLabel.innerHTML = "Password:"
          passLabel.id = ""
          passLabel.className = ""
          
          emailLabel.innerHTML = "Email:"
          emailLabel.id = ""
          emailLabel.className = ""
      
          username.className = 'post-name'
          username.id = `post-name`
          username.readOnly = false
          username.value = ""
          //80 chars
  
          email.id = `post-email`
          email.className = 'post-email'
          email.readOnly = false
          email.value = ""
  
          password.id = `post-pass`
          password.className = 'post-pass'
          password.readOnly = false
          password.value = ""
          */
  /*
          const user_id = currentUser.user_id
  
          deleteBtn.id = `post-delete`
          deleteBtn.className= 'post-delete'
          deleteBtn.innerHTML = "Delete"
          deleteBtn.onclick = function() {
            handleUser('delete',this.id, user_id,)};
  */
          //const postId = postData.posts[0].post_id
  
          saveBtn.id = `post-edit`
          saveBtn.className= 'post-edit'
          saveBtn.innerHTML = "Comment"
          saveBtn.onclick = function() {
            //saveComment(this.id, postId, userData)
          };
          
            
          //nameDiv.appendChild(nameLabel)
          nameDiv.appendChild(username)
          nameDiv.appendChild(content)
          /*
          emailDiv.appendChild(emailLabel)
          emailDiv.appendChild(email)
          passwordDiv.appendChild(passLabel)
          passwordDiv.appendChild(password)
          */
          moderateDiv.appendChild(saveBtn)
          //moderateDiv.appendChild(deleteBtn)
          
    
          user.appendChild(nameDiv)
          //user.appendChild(passwordDiv)
          //user.appendChild(emailDiv)
          user.appendChild(moderateDiv)
          document.getElementsByTagName('section')[0].appendChild(user);
          //document.getElementsByTagName('section')[0].appendChild(br);
        }
   }

 async function saveComment(element, post_id, userData){
  const btn = document.getElementById(element);
  const modDiv = document.getElementById(btn.parentNode.id);
  const comment = document.getElementById(modDiv.parentNode.id);

  const postId = post_id 
  const username = sessionStorage.getItem("username")
  const user = userData.users.find(user => user.user_name === username);
  const content = comment.querySelector('.comment-content')
  const contValue = content.value
  const userId = user.user_id
  comment.style.display = 'none'
  
  try {const response = await fetch('/save-comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        postId: postId,
        userId:userId,
        comContent: contValue,
      }),
  });
  comment.style.display = 'none'
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
    // Optionally, you can update the UI or perform additional actions after a successful verification
  } catch (error) {
    console.error('Error verifying post:', error);
  }
  }
  
  function getPostId(user, title, content, data) {
    for (const postData of data.posts) {
      if (postData.user_id == user && postData.post_title == title && postData.post_content == content) {
        return postData.post_id; // Assuming there is a post_id in your data
      }
    }
    return null; // Return null if no match is found
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
  
  // Example: Log the text content of each element
  function updateSize(elements) {
      elements.forEach(function(element) {
        element.style.height = element.scrollHeight+ 'px'
      });
  }
  
  });
  
  