const button = document.querySelector(".display-content-button");
const icon = button.querySelector("i");
const section = document.querySelector(".add-class-container");

button.addEventListener("click", function() {
  if (icon.classList.contains("fa-plus")) {
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
    section.classList.remove("hide");
  } else {
    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
    section.classList.add("hide");
  }
});
