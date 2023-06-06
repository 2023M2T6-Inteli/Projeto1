/* Abrir sidebar */
document.addEventListener("DOMContentLoaded", function () {
  const headerButton = document.querySelector(".header-container-logged-in i.fa-bars");
  const asideContainer = document.querySelector(".aside-container");

  headerButton.addEventListener("click", function () {
    asideContainer.style.display = "flex";
  });
});

/* Fechar sidebar */
document.addEventListener("DOMContentLoaded", function () {
  const asideButton = document.querySelector(".aside-container i.fa-bars");
  const asideContainer = document.querySelector(".aside-container");

  asideButton.addEventListener("click", function () {
    asideContainer.style.display = "none";
  });
});

/* Verificar teacherID no localStorage */
document.addEventListener("DOMContentLoaded", function () {
  var teacherID = localStorage.getItem('teacherID');
  console.log('teacherID:', teacherID);

  // Verifica se o teacherID existe
  if (teacherID === null) {
    // Redireciona o usuário para a página de login
    window.location.href = '../login/index.html';
  } else {
    // O teacherID existe, faça algo aqui se necessário
    console.log('teacherID:', teacherID);
  }
});
