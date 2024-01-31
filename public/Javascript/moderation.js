document.addEventListener('DOMContentLoaded', function () {
    var logoutBtn = document.getElementById('logoutBtn');
    var profileBtn = document.getElementById('profileBtn');
    var popup = document.getElementById('popup');
  
    
    function aboutUs(){
      window.location.replace("../Templates/about.html")
    }
  
  window.onload= onLoad

  function addBreaks() {
    const section = document.querySelector('section');
    
    for (let i = 0; i < 3; i++) {
      const br = document.createElement('br');
      section.appendChild(br);
    }
  }

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
 
      createUsers(userData)
      createUnverifiedPosts(postData, userData);
       updateContentHeight();
       addBreaks()
       return data;
    } catch (error) {
       console.error('Error fetching data:', error);
    }
  }
    
    var userElement = document.querySelector('.user');
    var postBtnElement = document.getElementById('postBtn');
  
    window.addEventListener('scroll', function() {
      userElement.classList.add('follow')
      postBtnElement .classList.add('follow')
    });
      

    function createUsers(userData){
      const num = userData.userCount
      for(var i=0; i<num;i++){
          var user = document.createElement('div');
          var infoDiv = document.createElement('div')
          var moderationDiv = document.createElement('div')
    
          var username = document.createElement('textarea')
          var verifyBtn = document.createElement('button')
          var deleteBtn = document.createElement('button')
    
          user.className='post';
          user.id = `post-${i}`
    
          infoDiv.id = `post-info-div-${i}`
          infoDiv.className = 'post-info-div'
        
          moderationDiv.id =`post-mod-div-${i}`
          moderationDiv.className = 'post-mod-div'
          
          username.className = 'users'
          username.id = `post-user-${i}`
          username.readOnly = true
          username.value = userData.users[i].user_name
      
          const userId = userData.users[i].user_id
          var status = userData.users[i].active

          verifyBtn.id = `user-verify-${i}`
          verifyBtn.className= 'post-verify'
          verifyBtn.onclick = function() {
              evaluateUser('verify', this.id, userId, status);
            };

            deleteBtn.id = `user-delete-${i}`
            deleteBtn.className= 'post-deny'
            deleteBtn.innerHTML = "Delete"
            deleteBtn.onclick = function() {
                
                evaluateUser('delete', this.id, userId, status);
              };
  
  
          if(status == true){
            user.style.backgroundColor = "#27b331"
            verifyBtn.innerHTML = "Ban"
            }else{
              user.style.backgroundColor = "#e03d34"
              verifyBtn.innerHTML = "Unban"
            }
            
          
          infoDiv.appendChild(username)
          moderationDiv.appendChild(verifyBtn)
          moderationDiv.appendChild(deleteBtn)
          user.appendChild(infoDiv)
          user.appendChild(moderationDiv)
          document.getElementsByTagName('aside')[0].appendChild(user);
      }
    }
  
  function createUnverifiedPosts(postData, userData){
    const num = postData.postCount
    for(var i=0; i<num;i++){
        var post = document.createElement('div');
        var infoDiv = document.createElement('div')
        var contentDiv = document.createElement('div')
        var moderationDiv = document.createElement('div')
  
        var title = document.createElement('textarea');
        var user = document.createElement('textarea')
        var content = document.createElement('textarea')
        var likes = document.createElement('input')
        var verifyBtn = document.createElement('button')
        var denyBtn = document.createElement('button')
        var br = document.createElement("br")
  
        post.className='post';
        post.id = `post-${i}`
  
        infoDiv.id = `post-info-div-${i}`
        infoDiv.className = 'post-info-div'
  
        contentDiv.id = `post-content-div-${i}`
        contentDiv.className = 'post-content-div'
  
        moderationDiv.id =`post-mod-div-${i}`
        moderationDiv.className = 'post-mod-div'
    
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

        const id = postData.posts[i].post_id
        var userId = postData.posts[i].user_id
        var status = postData.posts[i].verified

        verifyBtn.id = `post-verify-${i}`
        verifyBtn.className= 'post-verify'
        verifyBtn.onclick = function() {
            evaluatePost('verify', this.id, id, status);
          };

        denyBtn.id = `post-verify-${i}`
        denyBtn.className= 'post-deny'
        denyBtn.innerHTML = "Delete"
        denyBtn.onclick = function() {
            evaluatePost('deny', this.id, id, userId, status);
          };

        if(status == true){
          post.style.backgroundColor = "#27b331"
          verifyBtn.innerHTML = "Unverify"
          }else{
            post.style.backgroundColor = "#e03d34"
            verifyBtn.innerHTML = "Verify"
          }
        
        infoDiv.appendChild(user)
        infoDiv.appendChild(title)
        contentDiv.appendChild(content)
        moderationDiv.appendChild(verifyBtn)
        moderationDiv.appendChild(denyBtn)
        moderationDiv.appendChild(likes)
        post.appendChild(infoDiv)
        post.appendChild(contentDiv)
        post.appendChild(moderationDiv)
        document.getElementsByTagName('nav')[0].appendChild(post);

    }
  }
    
async function evaluatePost(type, element, id, status) { 
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const post = document.getElementById(modDiv.parentNode.id);

    const postStatus = status
    const postId = id
    
    try {const response = await fetch('/moderation-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: postId,
            action: type,
            status: postStatus,
          }),
      });
      if (!response.ok) {
        throw new Error(`Failed to verify post: ${response.statusText}`);
      }
      window.reload()
    } catch (error) {
      console.error('Error verifying post:', error);
    }
   
  }

  async function evaluateUser(type, element, id, status) { 
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const user = document.getElementById(modDiv.parentNode.id);

    const userStatus = status
    const userId = id
    try {const response = await fetch('/moderation-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            action: type,
            status: userStatus,
          }),
      });
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

  