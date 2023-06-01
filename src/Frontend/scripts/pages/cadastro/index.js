const REGISTER_URL = "http://localhost:3000/teachers";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".form-register");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = form.name.value
    var email = form.email.value;
    var password = form.password.value;
    var confirm_password = form.confirm_password.value;

    if (password !== confirm_password) {
      alert("As senhas não conferem");
      return;
    }

    fetch(REGISTER_URL, {
      method: "POST",
      body: JSON.stringify({
        teacher_name: name,
        email: email,
        teacher_password: password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      if (response.status === 201) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "../../../pages/home/index.html";
      } else {
        alert("Ocorreu um erro no cadastro");
      }
    }).catch(function (error) {
      alert("Ocorreu um erro no cadastro");
    });
  })
});