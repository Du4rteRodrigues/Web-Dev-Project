document.addEventListener('DOMContentLoaded', function () {
    var management = document.getElementById('moderation-btn');
    var userElement = document.querySelector('.user');
    var postBtnElement = document.getElementById('postBtn');
  
      
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

      createUserInfo(userData);
      createPosts(postData, userData);
       updateContentHeight();
       //return data;
    } catch (error) {
       console.error('Error fetching data:', error);
    }
  
    try {
      const response = await fetch('/user-data-json');
      if (!response.ok) {
         throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error fetching data:', error);
   }
  }

    window.addEventListener('scroll', function() {
      userElement.classList.add('follow')
      postBtnElement .classList.add('follow')
    });
      
  management.addEventListener('click',async function () {
    window.location.href = '/moderation';
  });
      
  function createPosts(postData, userData){
    const num = postData.postCount
    for(var i=0; i<num;i++){

      const postUserId = postData.posts[i].user_id;
      const userDataForPost = userData.users.find(users => users.user_id === postUserId);
      const storedUsername = sessionStorage.getItem('username');

      if (storedUsername != userDataForPost.user_name) {
          // Skip to the next iteration if the usernames don't match
          continue;
      }

        var post = document.createElement('div');
        var infoDiv = document.createElement('div')
        var contentDiv = document.createElement('div')
        var engagmentDiv = document.createElement('div')
  
        var title = document.createElement('textarea');
        
        var content = document.createElement('textarea')
        var editBtn = document.createElement('button')
        var deleteBtn = document.createElement('button')
        var likes = document.createElement('input')

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
        title.readOnly = false
        title.value = postData.posts[i].post_title
        //80 chars

        content.id = `post-content-${i}`
        content.className = 'post-content'
        content.readOnly = false
        content.value = postData.posts[i].post_content

        var postId = postData.posts[i].post_id

        deleteBtn.id = `post-delete-${i}`
        deleteBtn.className= 'post-delete'
        deleteBtn.innerHTML = "Delete"
        deleteBtn.onclick = function() {
            handlePost('delete', this.id, postData, postId);};

        editBtn.id = `post-edit-${i}`
        editBtn.className= 'post-edit'
        editBtn.innerHTML = "Edit"
        editBtn.onclick = function() {
          handlePost('edit', this.id, postData, postId)};
        
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
  
        infoDiv.appendChild(title)
        contentDiv.appendChild(content)
        engagmentDiv.appendChild(editBtn)
        engagmentDiv.appendChild(deleteBtn)
        engagmentDiv.appendChild(likes)
  
        post.appendChild(infoDiv)
        post.appendChild(contentDiv)
        post.appendChild(engagmentDiv)
        document.getElementsByTagName('nav')[0].appendChild(post);
        //document.getElementsByTagName('section')[0].appendChild(br);
    }
  }

  function createUserInfo(userData){
    const storedUsername = sessionStorage.getItem('username');
    const currentUser = userData.users.find(user => user.user_name === storedUsername);

        var user = document.createElement('div');
        var nameDiv = document.createElement('div')
        var emailDiv = document.createElement('div')
        var passwordDiv = document.createElement('div')
        var moderateDiv = document.createElement('div')
  
        var username = document.createElement('textarea');
        var email = document.createElement('textarea')
        var password = document.createElement('textarea')
        var nameLabel = document.createElement('label')
        var passLabel = document.createElement('label')
        var emailLabel = document.createElement('label')
        var saveBtn = document.createElement('button')
        var deleteBtn = document.createElement('button')

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
        username.value = currentUser.user_name
        //80 chars

        email.id = `post-email`
        email.className = 'post-email'
        email.readOnly = false
        email.value = currentUser.user_email

        password.id = `post-pass`
        password.className = 'post-pass'
        password.readOnly = false
        password.value = sessionStorage.getItem('password')

        const user_id = currentUser.user_id

        deleteBtn.id = `post-delete`
        deleteBtn.className= 'post-delete'
        deleteBtn.innerHTML = "Delete"
        deleteBtn.onclick = function() {
          handleUser('delete',this.id, user_id,)};

        saveBtn.id = `post-edit`
        saveBtn.className= 'post-edit'
        saveBtn.innerHTML = "Edit"
        saveBtn.onclick = function() {
          handleUser('edit',this.id, user_id,)};
          
        nameDiv.appendChild(nameLabel)
        nameDiv.appendChild(username)
        emailDiv.appendChild(emailLabel)
        emailDiv.appendChild(email)
        passwordDiv.appendChild(passLabel)
        passwordDiv.appendChild(password)
        moderateDiv.appendChild(saveBtn)
        moderateDiv.appendChild(deleteBtn)
  
        user.appendChild(nameDiv)
        user.appendChild(passwordDiv)
        user.appendChild(emailDiv)
        user.appendChild(moderateDiv)
        document.getElementsByTagName('aside')[0].appendChild(user);
    }

  async function handlePost(type, element, postData, post_id) {
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const post = document.getElementById(modDiv.parentNode.id);

    const titleElement = post.querySelector('.post-title');
    const contentElement = post.querySelector('.post-content');

    const title = titleElement.value;
    const content = contentElement.value;

    if(type== "delete"){post.style.display = 'none';}
    try {const response = await fetch('/profile-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: post_id,
            action: type,
            title:title,
            content:content,
          }),
      });
      if (!response.ok) {
        throw new Error(`Failed to verify post: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error verifying post:', error);
    }
  }

async function handleUser(type, element, user_id) {
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const user = document.getElementById(modDiv.parentNode.id);

    const nameElement = user.querySelector('.post-name');
    const emailElement = user.querySelector('.post-email');
    const passElement = user.querySelector('.post-pass');

    const userId = user_id
    const name = nameElement.value
    const mail = emailElement.value
    const password= passElement.value

    if(type == "delete"){ 
      sessionStorage.clear();
      sessionStorage.setItem("username", "Login")
    }else{
    sessionStorage.setItem('username', name)
    sessionStorage.setItem('password', password)
    }
    
    try {const response = await fetch('/profile-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            action: type,
            name:name,
            mail:mail,
            password:password
          })
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
  
  