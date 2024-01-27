function createPosts(num){
    for(var i=0; i<3;i++){
      console.log("here "+i)
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

//module.exports = { createPosts };