/* Abrir sidebar */
document.addEventListener("DOMContentLoaded", function() {
  const headerButton = document.querySelector(".header-container-logged-in i.fa-bars");
  const asideContainer = document.querySelector(".aside-container");

  headerButton.addEventListener("click", function() {
    asideContainer.style.display = "flex";
  });
});

/* Fechar sidebar */
document.addEventListener("DOMContentLoaded", function() {
  const asideButton = document.querySelector(".aside-container i.fa-bars");
  const asideContainer = document.querySelector(".aside-container");

  asideButton.addEventListener("click", function() {
    asideContainer.style.display = "none";
  });
});
