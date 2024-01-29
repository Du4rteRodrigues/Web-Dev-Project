document.addEventListener('DOMContentLoaded', function () {
    var management = document.getElementById('moderation-btn');
    var userElement = document.querySelector('.user');
    var postBtnElement = document.getElementById('postBtn');
  
    
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

       createPosts(postData, userData);
       updateContentHeight();
       return data;
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
    /*
    var storedUsername = sessionStorage.getItem('username');
    try {
      // Fetch the JSON file
      const response = await fetch('/user-data-json');
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON: ${response.statusText}`);
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if the username exists in the JSON data
      const user = data.users.find(user => user.user_name === storedUsername);
  
      if (user) {
        // Check if the user is verified
        if (user.verified) {
          alert("here")
        } else {
          console.log(`User "${storedUsername}" exists in the JSON but is not verified.`);
        }
      } else {
        console.log(`User "${storedUsername}" not found in JSON.`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
    const response = await fetch('/user-data-json');
    if (!response.ok) {
       throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    const currentUser = document.getElementById('current-user')
    */
  });
  
  function getUserCard(){
    var storedUsername = sessionStorage.getItem('username');
    const userCard = document.querySelector(".user")
    const currentUser = document.getElementById('current-user')
    const modBtn = document.getElementById('moderation-btn')
  
    // Checking if the username exists
    if (storedUsername) {
      currentUser.textContent= `@${storedUsername}`
      userCard.style.display = 'flex'
      modBtn.style.display = 'flex'
      }else{
      userCard.style.display = 'none'
      return
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
        document.getElementsByTagName('section')[0].appendChild(post);
        document.getElementsByTagName('section')[0].appendChild(br);
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

  /*
  async function deletePost(element, postData, user, type) { 
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const post = document.getElementById(modDiv.parentNode.id);

    const titleElement = post.querySelector('.post-title');
    const contentElement = post.querySelector('.post-content');

    // Get title and content from HTML elements
    const title = titleElement.value;
    const content = contentElement.value;
    const postId = getPostId(user, title, content, postData);
    post.style.display = 'none';
    try {const response = await fetch('/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type:type,
            postId: postId,
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
  */

  async function handlePost(type, element, postData, post_id) {
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const post = document.getElementById(modDiv.parentNode.id);

    //const userElement = post.querySelector('.post-user');
    const titleElement = post.querySelector('.post-title');
    const contentElement = post.querySelector('.post-content');

    // Get title and content from HTML elements
    //const storedUsername = sessionStorage.getItem('username');

    //const user = userData.users.find(user => user.user_name === storedUsername);
    //const userId = user.user_id
    const title = titleElement.value;
    const content = contentElement.value;

    //const postId = getPostId(userId, title, content, postData);
    if(type== "delete"){post.style.display = 'none';}
    try {const response = await fetch('/profile', {
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
      // Optionally, you can update the UI or perform additional actions after a successful verification
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
  
  // Example: Log the text content of each element
  function updateSize(elements) {
      elements.forEach(function(element) {
        element.style.height = element.scrollHeight+ 'px'
      });
  }
  
  });
  
  