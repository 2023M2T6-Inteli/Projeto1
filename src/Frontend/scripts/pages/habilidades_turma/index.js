const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const classId = searchParams.get("class_id");
console.log(classId);

const classInfoUrl = `/api/classes/${classId}`;

fetch(classInfoUrl)
  .then(function(response) {
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(function(data) {
    console.log(data)
    const nameSchoolElement = document.querySelector('.name_school');
    nameSchoolElement.textContent = data.school_id;

    const activitiesUrl = `api/classes/${classId}/activities`;
    return fetch(activitiesUrl);
  })
  .then(function(response) {
    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  })
  .then(function(data) {
    const listContainer = document.querySelector('.list-class-container');
    console.log(data);
  
    data.forEach(function(item) {
      const li = document.createElement('li');
      const div = document.createElement('div');
      const a = document.createElement('a');
      a.href = `/indicacao_de_conteudo/?habilidade=${item.skill_id}`;
      const span = document.createElement('span');
    
      a.textContent = item.activity_name;
    
      div.classList.add('class-container');
      div.appendChild(a);
      div.appendChild(span);
      li.appendChild(div);
      listContainer.appendChild(li);
    
      // Fazendo a requisição GET
      const activityUrl = `/api/activities/${item.activity_id}/class/${classId}`;
      fetch(activityUrl)
        .then(response => response.json())
        .then(data => {
          span.textContent = `Média da turma: ${data.grade_value}`;
        })
        .catch(error => {
          console.log('Ocorreu um erro na requisição:', error);
        });
    });
  })
  .catch(function(error) {
    console.error(`Ocorreu um erro na solicitação: ${error.message}`);
  });
