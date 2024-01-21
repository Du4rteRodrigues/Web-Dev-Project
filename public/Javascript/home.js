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

  var userElement = document.querySelector('.user');
  var postBtnElement = document.getElementById('postBtn');

  window.addEventListener('scroll', function() {
    userElement.classList.add('follow')
    postBtnElement .classList.add('follow')
  });


  window.onload= createPost

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


function createPost(){
  for(var i=0; i<10;i++){
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
      title.placeholder = '80 chars'

      user.className = 'post-user'
      user.id = `post-user-${i}`
      user.readOnly = true
      user.placeholder = '14 chars'

      content.id = `post-content-${i}`
      content.className = 'post-content'
      content.readOnly = false
      content.value = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod hic nam autem quae vero blanditiis ipsum laudantium commodi facere rem! Omnis cupiditate velit similique facilis harum. Tenetur eum quam ad porro earum fugiat ullam, pariatur tempore quas iure nobis laborum ratione harum laudantium commodi officia ipsam reiciendis eius, magni minus impedit illo omnis hic et. Culpa ipsa exercitationem, perspiciatis cumque tenetur eveniet doloremque eum, obcaecati optio omnis minus id numquam quo officia fugit totam similique minima quod quae. Aperiam a iusto delectus magni eligendi quod deserunt quos non id nemo repellendus qui officia amet enim, repellat dolore quas dolor accusamus sunt. Consectetur ut illo fugiat porro, nisi voluptatibus, vel eveniet minus odio nam nulla voluptates maiores non itaque doloribus, quis nobis asperiores cum! Quidem unde temporibus rem. Possimus, consequatur quam? Quia, nesciunt rem. Veniam sequi tenetur, eveniet hic deserunt corrupti et eligendi itaque quia sapiente amet dolor nihil laborum pariatur facilis repellendus! Quidem porro accusamus aliquid exercitationem odio, obcaecati consectetur eveniet ut commodi veritatis pariatur voluptates ipsa laudantium laborum facilis dolor. Consectetur similique suscipit natus voluptatem dignissimos obcaecati id velit! Sequi, itaque aut harum earum laboriosam totam, laborum saepe magnam quod obcaecati recusandae reprehenderit ea voluptatem nam quasi, provident in rerum vitae? Vero tempora consequuntur laudantium pariatur iusto, ullam eligendi dolore aliquid necessitatibus enim alias quis quaerat odit officiis! Reprehenderit asperiores dolores, consequatur minus laborum atque debitis cumque autem officiis amet officia soluta modi quidem perspiciatis explicabo error ex maxime rem velit! Cum, nihil excepturi magni incidunt quas provident error, ea sunt assumenda exercitationem quam, eum ab. Quo consequuntur numquam laboriosam veritatis rem ducimus, corporis error culpa iusto voluptatum odit dolores neque quaerat quis perferendis fugit et voluptatem cum inventore optio alias dicta possimus labore? Nam distinctio dolorum non obcaecati facilis accusamus alias provident aut consequatur reprehenderit voluptas blanditiis quia iusto neque impedit quisquam, consectetur et hic incidunt, ab praesentium officia expedita laboriosam? Dolores, praesentium. Et dolores asperiores repellat quas harum quidem maxime vitae, sapiente expedita odit doloribus, nisi sed, neque assumenda? Tempore exercitationem maiores ipsum repellat voluptatibus ut recusandae magni debitis corrupti, aperiam perferendis odio consequatur dolorem perspiciatis distinctio quis. Minima soluta a velit, deleniti reiciendis cupiditate minus distinctio! Ut, tempora! Laudantium architecto ipsa, vitae rem vel eius temporibus sunt fuga optio provident ad fugit rerum! Repudiandae autem aspernatur possimus similique libero minus tempora. Enim rerum veniam vel non nesciunt? Animi odit qui, reprehenderit eligendi non asperiores deserunt adipisci aliquam, quaerat a et necessitatibus impedit autem quis nobis ullam exercitationem suscipit provident, nisi nihil labore doloribus quasi! Voluptate eius quaerat incidunt non praesentium porro autem, alias esse minus nisi? Debitis fugiat quos perspiciatis, blanditiis sapiente esse dolore quas porro aperiam voluptatem provident laudantium repudiandae assumenda sint. Praesentium sunt, at nisi ab velit culpa debitis saepe et vel pariatur ea quidem eos animi, odio nesciunt voluptate doloremque! Dolor, laborum voluptatibus? Velit, ut facilis quam molestiae commodi consequatur deleniti. Beatae inventore saepe, minima, molestiae voluptatibus aspernatur eaque excepturi explicabo tenetur accusantium veritatis fuga architecto dolorem dignissimos fugit, nemo nam suscipit FIMMM'
      content.placeholder='900 chars'

      likes.id = `post-likes-${i}`
      likes.className= 'post-engagment'
      likes.value = 0
      likes.readOnly = true
      likes.disabled= "yes"
      likes.type = 'number'

      likeImg.src ='../Images/up.png'
      likeImg.id = `post-like-img-${i}`
      likeImg.className ='post-up'
      likeImg.addEventListener("click", function() { changeLikes('up', this.parentNode.id);});
      
      dislikeImg.src ='../Images/down.png'
      dislikeImg.id = `post-dislike-img-${i}`
      dislikeImg.className ='post-down'
      dislikeImg.addEventListener("click", function() { changeLikes('down', this.id);});

      infoDiv.appendChild(user)
      infoDiv.appendChild(title)
      contentDiv.appendChild(content)
      engagmentDiv.appendChild(likes)
      engagmentDiv.appendChild(dislikeImg)
      engagmentDiv.appendChild(likeImg)
      post.appendChild(infoDiv)
      post.appendChild(contentDiv)
      post.appendChild(engagmentDiv)

      document.getElementsByTagName('section')[0].appendChild(post);
      document.getElementsByTagName('section')[0].appendChild(br);
  }
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
          likes.style.color = "green"
      }

      else if(upBtn.getAttribute('src') == '../Images/up-clicked.png'){
          upBtn.src = '../Images/up.png'
          likes.stepDown(1)
          likes.style.color = "black"
      }

      else if(downBtn.getAttribute('src') == '../Images/down-clicked.png' && upBtn.getAttribute('src') == '../Images/up.png'){
          downBtn.src = '../Images/down.png'
          upBtn.src = '../Images/up-clicked.png'
          likes.stepUp(2)
          likes.style.color = "green"
      }

      }

  else{
      if(downBtn.getAttribute('src') == '../Images/down.png' && upBtn.getAttribute('src') == '../Images/up.png'){
          downBtn.src = '../Images/down-clicked.png'
          likes.stepDown(1)
          likes.style.color = "red"
      }

      else if(downBtn.getAttribute('src') == '../Images/down-clicked.png'){
          downBtn.src = '../Images/down.png'
          likes.stepUp(1)
          likes.style.color = "black"
      }

      else if(upBtn.getAttribute('src') == '../Images/up-clicked.png' && downBtn.getAttribute('src') == '../Images/down.png'){
          downBtn.src = '../Images/down-clicked.png'
          upBtn.src = '../Images/up.png'
          likes.stepDown(2)
          likes.style.color = "red"
      }
      }
}
          // Obtenha o username da sessionStorage
        var username = sessionStorage.getItem('username');

        // Verifique se o username está definido
        if (username) {
            // Atualize o conteúdo da div com o username
            document.querySelector('.user h4').textContent = '@' + username;
        }
    });

