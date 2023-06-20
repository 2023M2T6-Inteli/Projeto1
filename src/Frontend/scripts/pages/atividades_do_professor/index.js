async function getContents(subject, hits) {
  // fetch na URL de busca do Algolia com query params
  const response = await fetch(`https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`, {
    method: 'GET',
    headers: {
      // Headers necessários para autenticação no Algolia
      'X-Algolia-Application-Id': '6I7NDWQ9YU',
      'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
    }
  });
  // Transforma a resposta em JSON
  const json = await response.json();
  // Retorna o array de hits
  return json.hits;
}

document.addEventListener("DOMContentLoaded", () => {
  let teacherId = localStorage.getItem('teacherID')

  const defaultUrl = `http://127.0.0.1:3000/teachers/${teacherId}/activities`

  fetch(defaultUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
  }).then(function (response) {  
    response.json().then((data) => {
      data.map(activity => {
        getContents(activity.skill_id, 1).then(content => {
          const discipline = content[0].disciplina[0].toLowerCase();
          const container = document.getElementsByClassName('disciplines-container')[0];

          let divElement = container.querySelector(`.${discipline}`);

          if (!divElement) {
            divElement = document.createElement('div');
            divElement.classList.add('discipline-container', discipline);

            const heading = document.createElement('h2')
            heading.textContent = discipline

            const ulElement = document.createElement('ul');
            const liElement = document.createElement('li');
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = activity.activity_name;

            liElement.appendChild(paragraphElement);
            ulElement.appendChild(liElement);
            divElement.appendChild(heading);
            divElement.appendChild(ulElement);

            container.appendChild(divElement);
          } else {
            const ulElement = divElement.querySelector('ul');
            const liElement = document.createElement('li');
            const paragraphElement = document.createElement('p');
            paragraphElement.textContent = activity.activity_name;

            liElement.appendChild(paragraphElement);
            ulElement.appendChild(liElement);
          }
        })
      })
    });
    
  
  }).catch(function (error) {
    alert(`Ocorreu um erro: ${error}`);
  });
})
