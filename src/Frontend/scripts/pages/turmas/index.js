const button = document.querySelector(".display-content-button");
const icon = button.querySelector("i");
const section = document.querySelector(".add-class-container");
const defaultUrl = "/api";

var capitalizeFirstLetter = (str) => {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

  if (!teacherID) {
    console.error("ID do professor não encontrado no localStorage.");
    return;
  }

  fetch(`${defaultUrl}/teachers/${teacherID}/classes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`Erro ao carregar as turmas: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(function (classes) {
      let classesList = document.querySelector(".class-list");
      const selectElement = document.querySelector('.filters-container-select');

      classes.forEach((classe) => {
        let schoolDiv = classesList.querySelector(`.school-container[data-school-id="${classe.school_id.toLowerCase()}"]`);
        if (!schoolDiv) {
          schoolDiv = document.createElement("div");
          schoolDiv.classList.add("school-container");
          schoolDiv.setAttribute("data-school-id", classe.school_id.toLowerCase());
          classesList.appendChild(schoolDiv);

          let h2 = document.createElement("h2");
          h2.textContent = capitalizeFirstLetter(classe.school_id)
          schoolDiv.appendChild(h2);

          const option = document.createElement('option');
          option.textContent = classe.school_id;
          selectElement.appendChild(option);
        }

        let li = document.createElement("li");
        let a = document.createElement("a")
        a.href = `/habilidades_turma?class_id=${classe.class_id}`;
        a.innerHTML = classe.class_name;
        li.appendChild(a)
        schoolDiv.appendChild(li);

        selectElement.addEventListener('change', function () {
          const selectedOption = selectElement.value.toLowerCase();

          const divElements = document.querySelectorAll('.school-container');

          divElements.forEach(divElement => {
            const schoolId = divElement.getAttribute('data-school-id');
            if (schoolId == selectedOption) {
              divElement.style.display = 'block';
            } else {
              divElement.style.display = 'none';
            }
          });
        });

      });
    })
    .catch(function (error) {
      console.error(`Ocorreu um erro ao carregar as turmas: ${error.message}`);
      alert("Ocorreu um erro ao carregar as turmas");
    });

  var form = document.querySelector(".form-add-class-container");

  form.addEventListener("submit", function (event) {
    fetch(`${defaultUrl}/classes`, {
      method: "POST",
      body: JSON.stringify({
        class_name: form.name.value,
        school_year: form.school_year.value,
        school_id: form.school.value.toLowerCase(),
        teacher_id: parseInt(localStorage.getItem("teacherID")),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error(`Erro ao criar a turma: ${response.status} - ${response.statusText}`);
        }
        alert("Turma criada com sucesso!");
        return response.json();
      })
      .then(function (body) {
        let a = document.createElement("a")
        a.innerHTML = form.name.value;
        a.href = '#'
        let li = document.createElement("li");
        li.classList.add("class-list-li")
        document.querySelector(".class-list-li").appendChild(a)
        document.querySelector(".class-list").appendChild(li);
      })
      .catch(function (error) {
        console.error(`Ocorreu um erro ao criar a turma: ${error.message}`);
        alert("Ocorreu um erro ao criar a turma");
      });
  });
});
