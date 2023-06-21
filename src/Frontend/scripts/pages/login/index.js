const LOGIN_URL = "http://localhost:1234/api/login";

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
        window.location.href = "../home";
      } else if (response.status === 401) {
        let paragraph = document.querySelector('.password-error')

        paragraph.style.display = 'block'

        setTimeout(() => {
          paragraph.style.display = 'none'
        }, 5000);
        return;
      }

      alert("Login realizado com sucesso!");

      response.json().then((body) => {
        let teacherID = body.teacherID;
        localStorage.setItem("teacherID", teacherID);
      });
      window.location.href = "../home";

    }).catch(function (error) {
      alert("Ocorreu um erro no login");
    });
  })
});
