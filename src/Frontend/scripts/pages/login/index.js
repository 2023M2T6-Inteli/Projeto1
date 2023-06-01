const LOGIN_URL = "http://localhost:3000/login";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".form-login");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = form.email.value;
    var password = form.password.value;

    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.status === 200) {
        alert("Login realizado com sucesso!");
        window.location.href = "../../../pages/home/index.html";
      } else {
        alert("Ocorreu um erro no login");
      }
    }).catch(function (error) {
      alert("Ocorreu um erro no login");
    });
  })
});