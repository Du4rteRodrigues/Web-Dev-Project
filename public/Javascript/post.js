document.addEventListener('DOMContentLoaded', function () {
    var userElement = document.querySelector('.user');
    var postBtnElement = document.getElementById('postBtn');
  
  window.onload= onLoad
  
  function onLoad() {
    getUserCard()
  }
    window.addEventListener('scroll', function() {
      userElement.classList.add('follow')
      postBtnElement .classList.add('follow')
    });
  
  function getUserCard(){
    var storedUsername = sessionStorage.getItem('username');
    const hiddenUser = document.getElementById('input-user')
    const currentUser = document.getElementById('current-user')
  
    hiddenUser.value = storedUsername
    currentUser.textContent= `${storedUsername}`
}
  
});