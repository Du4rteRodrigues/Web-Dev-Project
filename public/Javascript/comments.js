
document.addEventListener('DOMContentLoaded', function () {
    var management = document.getElementById('moderation-btn');
    var currentUser = document.getElementById('current-user')
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
    
        infoDiv.appendChild(user)
        infoDiv.appendChild(title)
        contentDiv.appendChild(content)
        engagmentDiv.appendChild(likes)
  
        post.appendChild(infoDiv)
        post.appendChild(contentDiv)
        post.appendChild(engagmentDiv)
        document.getElementsByTagName('section')[0].appendChild(post);
    }
  }

 function createForm(postData, userData){
        var user = document.createElement('div');
        var nameDiv = document.createElement('div')
        var moderateDiv = document.createElement('div')
  
        var content = document.createElement('textarea');
        var saveBtn = document.createElement('button')
  
        user.className='post';
        user.id = `post-`
  
        nameDiv.id = `post-name-div`
        nameDiv.className = 'post-name-div'
  
        moderateDiv.id =`post-eng-div`
        moderateDiv.className = 'post-engagment-div'

        content.className = 'form-content'
        content.id = `com-content`
        content.readOnly = false
        content.value = ""

        const postId = postData.posts[0].post_id

        saveBtn.id = `post-edit`
        saveBtn.className= 'post-edit'
        saveBtn.innerHTML = "Comment"
        saveBtn.onclick = function() {
          saveComment(this.id, postId, userData)
        };
        
          
        nameDiv.appendChild(content)
        moderateDiv.appendChild(saveBtn)
        
        user.appendChild(nameDiv)
        user.appendChild(moderateDiv)
        document.getElementsByTagName('section')[0].appendChild(user);
 }

 function createComments(userData, comData){
  const num = comData.comCount  
  const currentUser = sessionStorage.getItem("username")

  for(var i=0; i<num;i++){
  
          var user = document.createElement('div');
          var nameDiv = document.createElement('div')
          var emailDiv = document.createElement('div')
          var passwordDiv = document.createElement('div')
          var moderateDiv = document.createElement('div')
    
          var editBtn = document.createElement('button')
          var deleteBtn = document.createElement('button')
          var username = document.createElement('textarea');
          var content = document.createElement('textarea');
  
          var br = document.createElement("br")
    
          user.className='post';
          user.id = `post-${i}`
    
          nameDiv.id = `post-name-div-${i}`
          nameDiv.className = 'post-name-div'
    
          moderateDiv.id =`post-eng-div${i}`
          moderateDiv.className = 'com-engagment-div'

          const comId = comData.comments[i].comment_id;

          editBtn.id = `post-edit-${i}`
          editBtn.className= 'post-edit'
          editBtn.innerHTML = "Edit"
          editBtn.onclick = function() {
            handleComment('edit',this.id, comId)
          };

          deleteBtn.id = `post-edit-${i}`
          deleteBtn.className= 'post-edit'
          deleteBtn.innerHTML = "Delete"
          deleteBtn.onclick = function() {
            handleComment('delete',this.id, comId)
          };
  
          username.className = 'comment-name'
          username.id = `com-name-${i}`
          username.readOnly = true
          const comUserId = comData.comments[i].user_id;
          const comDataForUsers = userData.users.find(users => users.user_id === comUserId);
          username.value = comDataForUsers.user_name;

          content.id = `com-cont-${i}`
          content.className = 'cont'
          content.readOnly = true
          content.value = comData.comments[i].comment_content
           
          if(currentUser == username.value){
            content.readOnly = false
            moderateDiv.appendChild(editBtn)
            moderateDiv.appendChild(deleteBtn)
          }

          nameDiv.appendChild(username)
          nameDiv.appendChild(content)
          
          user.appendChild(nameDiv)
          user.appendChild(moderateDiv)
          document.getElementsByTagName('section')[0].appendChild(user);
        }
   }

   async function handleComment(type, element, com_id) {
    const btn = document.getElementById(element);
    const modDiv = btn.parentNode;
    const com = modDiv.parentNode;
  
    const contentElement = com.querySelector('.cont');

    const comId = com_id;
    const content = contentElement.value;

    
    try {const response = await fetch('/handle-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comId: comId,
            action: type,
            content:content,
          })
      });
      com.style.display = 'none'
      if (!response.ok) {
        throw new Error(`Failed to verify post: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error verifying post:', error);
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
} catch (error) {
  console.error('Error verifying post:', error);
}

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
  
  