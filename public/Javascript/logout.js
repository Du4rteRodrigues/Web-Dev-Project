document.addEventListener('DOMContentLoaded', function () {
    var openPopupBtn = document.getElementById('openPopupBtn');
    var closePopupBtn = document.getElementById('closePopupBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    var profileBtn = document.getElementById('profileBtn');
    var popup = document.getElementById('popup');
  
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
  });
  