document.addEventListener('DOMContentLoaded', function () {
    var openPopupBtn = document.getElementById('openPopupBtn');
    var closePopupBtn = document.getElementById('closePopupBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var profileBtn = document.getElementById('profileBtn');
    var popup = document.getElementById('popup');
  
    // function post(){
    //   window.location.replace("../Templates/poster.html")
    // }
    
    function aboutUs(){
      window.location.replace("../Templates/about.html")
    }
  
  window.onload= onLoad
  
  async function onLoad() {
    try {
       const response = await fetch('/data-json');
       if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
       }
       const data = await response.json();
       createUnverifiedPosts(data);
       updateContentHeight();
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
  
  function createUnverifiedPosts(data){
    const num = data.postCount
  
    for(var i=0; i<num;i++){
        var post = document.createElement('div');
        var infoDiv = document.createElement('div')
        var contentDiv = document.createElement('div')
        var moderationDiv = document.createElement('div')
  
        var title = document.createElement('textarea');
        var user = document.createElement('textarea')
        var content = document.createElement('textarea')
        var verifyBtn = document.createElement('button')
        var denyBtn = document.createElement('button')
        //var likes = document.createElement('input')
        //var commentNum = document.createElement('input')
  
        //var likeImg = document.createElement('img')
        //var dislikeImg = document.createElement('img')
        //var commentsImg = document.createElement('img')
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
        title.value = data.posts[i].post_title
        //80 chars
  
        user.className = 'post-user'
        user.id = `post-user-${i}`
        user.readOnly = true
        user.value= data.posts[i].user_id
        //17 chars
  
        content.id = `post-content-${i}`
        content.className = 'post-content'
        content.readOnly = true
        content.value = data.posts[i].post_content

        verifyBtn.id = `post-verify-${i}`
        verifyBtn.className= 'post-verify'
        verifyBtn.innerHTML = "Verify"
        verifyBtn.onclick = function() {
            evaluatePost('verify', this.id, data);};

        denyBtn.id = `post-verify-${i}`
        denyBtn.className= 'post-deny'
        denyBtn.innerHTML = "Deny"
        denyBtn.onclick = function() {
            evaluatePost('deny', this.id, data);};
        
        infoDiv.appendChild(user)
        infoDiv.appendChild(title)
        contentDiv.appendChild(content)
        moderationDiv.appendChild(verifyBtn)
        moderationDiv.appendChild(denyBtn)
        post.appendChild(infoDiv)
        post.appendChild(contentDiv)
        post.appendChild(moderationDiv)
        document.getElementsByTagName('section')[0].appendChild(post);
        document.getElementsByTagName('section')[0].appendChild(br);
    }
  }
    
// Obtenha o username da sessionStorage
// var username = sessionStorage.getItem('username');

function getPostId(user, title, content, data) {
    for (const postData of data.posts) {
      if (postData.user_id == user && postData.post_title == title && postData.post_content == content) {
        return postData.post_id; // Assuming there is a post_id in your data
      }
    }
    return null; // Return null if no match is found
  }

async function evaluatePost(type, element, data) { 
    const btn = document.getElementById(element);
    const modDiv = document.getElementById(btn.parentNode.id);
    const post = document.getElementById(modDiv.parentNode.id);

    const userElement = post.querySelector('.post-user');
    const titleElement = post.querySelector('.post-title');
    const contentElement = post.querySelector('.post-content');

    // Get title and content from HTML elements
    const user = userElement.value;
    const title = titleElement.value;
    const content = contentElement.value;
    const postId = getPostId(user, title, content, data);
    post.style.display = 'none';
    try {const response = await fetch('/moderation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            postId: postId,
            action: type,
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

  