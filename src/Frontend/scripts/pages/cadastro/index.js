const REGISTER_URL = "http://localhost:3000/teachers";

function set_register_error(message) {
    let paragraph = document.querySelector('.register-error');
    paragraph.innerHTML = message;
    paragraph.style.display = 'block';

    setTimeout(() => {
        paragraph.style.display = 'none';
    }, 5000);
}


document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector(".form-register");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        var name = form.name.value
        var email = form.email.value;
        var password = form.password.value;
        var confirm_password = form.confirm_password.value;

        if (password.length < 8) {
            set_register_error('A senha deve ter no mínimo 8 caracteres');
            return;
        }

        if (password !== confirm_password) {
            set_register_error('As senhas não coincidem');
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
            if (response.status === 409) {
                set_register_error('Já existe um usuário com esse email');
                return;
            }

            if (response.status !== 201) {
                alert('Ocorreu um erro no cadastro');
                return;
            }

            alert("Cadastro realizado com sucesso!");

            response.json().then((body) => {
                let teacherID = body.teacherID;
                localStorage.setItem("teacherID", teacherID);
            });
            window.location.href = "../home/index.html";

        }).catch(function (error) {
            alert("Ocorreu um erro no cadastro");
        });
    })
});

