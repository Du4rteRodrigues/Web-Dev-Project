function goHome(){
    window.location.replace("http://localhost:8888/home")
}
function post(){
    window.location.replace("http://localhost:8888/post")
}

function logout(){
    window.location.replace("http://localhost:8888/logout")
  
}

function profile(){
    window.location.replace("http://localhost:8888/profile")
}

function createPost(){
    const posts = document.getElementById('posts')

    for(var i=0; i<6;i++){
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
        var br = document.createElement("br")
    
        title.className = 'post-content'
        title.id = 'post-title'

        title.placeholder = '80 chars'

        user.className = 'post-content'
        user.id = 'post-user'

        user.placeholder = '14 chars'

        content.id = 'post-content'
        content.className = 'post-content'

        content.placeholder='900 chars'

        likes.id = 'post-likes'
        likes.className= 'post-engagment'
        likes.placeholder = 0
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

        posts.appendChild(post)
        posts.appendChild(br)
    }
}

function showMenu(nav){
    elements = document.querySelectorAll(nav);
    for(var i=0; i<elements.length; i++){
        if(elements[i].style.display == 'none'){
            elements[i].style.display ='block';
            continue;
        }
        else{
        elements[i].style.display = 'none'
        }
    }
}

function changeLikes(type){
    var likes = document.getElementById('post-likes');
    var upBtn = document.getElementById('post-like-img');
    var downBtn = document.getElementById('post-dislike-img');

    if(type == 'up'){

        if(upBtn.getAttribute('src') == '../Images/up.png' && downBtn.getAttribute('src') == '../Images/down.png'){
            upBtn.src = '../Images/up-clicked.png'
            likes.stepUp(1)
        }

        else if(upBtn.getAttribute('src') == '../Images/up-clicked.png'){
            upBtn.src = '../Images/up.png'
            likes.stepDown(1)
        }

        else if(downBtn.getAttribute('src') == '../Images/down-clicked.png' && upBtn.getAttribute('src') == '../Images/up.png'){
            downBtn.src = '../Images/down.png'
            upBtn.src = '../Images/up-clicked.png'
            likes.stepUp(2)
        }

        }

    else{
        if(downBtn.getAttribute('src') == '../Images/down.png' && upBtn.getAttribute('src') == '../Images/up.png'){
            downBtn.src = '../Images/down-clicked.png'
            likes.stepDown(1)
        }

        else if(downBtn.getAttribute('src') == '../Images/down-clicked.png'){
            downBtn.src = '../Images/down.png'
            likes.stepUp(1)
        }

        else if(upBtn.getAttribute('src') == '../Images/up-clicked.png' && downBtn.getAttribute('src') == '../Images/down.png'){
            downBtn.src = '../Images/down-clicked.png'
            upBtn.src = '../Images/up.png'
            likes.stepDown(2)
        }
        }
    }


window.onload = createPost