const button = document.querySelector(".display-content-button");
const icon = button.querySelector("i");
const section = document.querySelector(".add-class-container");
const CLASSES_URL = "http://localhost:3000/teachers";

button.addEventListener("click", function () {
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

document.addEventListener("DOMContentLoaded", function () {
    let teacherID = localStorage.getItem("teacherID");

    fetch(`${CLASSES_URL}/${teacherID}/classes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (response) {
        if (response.status !== 200) {
            alert("Ocorreu um erro ao carregar as turmas");
            return;
        }

        response.json().then((classes) => {
            let classesList = document.querySelector(".class-list");
            classes.forEach((classe) => {
                let li = document.createElement("li");
                li.innerHTML = classe.class_name;
                classesList.appendChild(li);
            });
        });
    });

    var form = document.querySelector(".form-add-class-container");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        fetch(`http://localhost:3000/classes`, {
            method: "POST",
            body: JSON.stringify({
                class_name: form.name.value,
                school_year: form.school_year.value,
                school_id: 1,
                teacher_id: parseInt(localStorage.getItem("teacherID"))
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(function (response) {
            if (response.status !== 201) {
                alert("Ocorreu um erro ao criar a turma");
                return;
            }

            alert("Turma criada com sucesso!");

            response.json().then((body) => {
                let li = document.createElement("li");
                li.innerHTML = name;
                document.querySelector(".class-list").appendChild(li);
            });
        });
    });
});
