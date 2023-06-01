const REGISTER_URL = "http://localhost:3000/teachers";

document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".form-register");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var email = form.email.value;

        var password = form.password.value;
        var confirm_password = form.confirm_password.value;

        if (email === "") {
            alert("Preencha o campo de e-mail");
            return;
        }

        if (password === "") {
            alert("Preencha o campo de senha");
            return;
        }

        if (confirm_password === "") {
            alert("Preencha o campo de confirmação de senha");
            return;
        }

        if (password !== confirm_password) {
            alert("As senhas não conferem");
            return;
        }

        fetch(REGISTER_URL, {
            method: "POST",
            body: JSON.stringify({
                teacher_name: 'abaababababa',
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