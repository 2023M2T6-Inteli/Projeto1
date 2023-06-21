var capitalizeFirstLetter = (str) => {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getContents(subject, hits) {
  try {
    const response = await fetch(
      `https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`,
      {
        method: 'GET',
        headers: {
          'X-Algolia-Application-Id': '6I7NDWQ9YU',
          'X-Algolia-API-Key': '459b8ac86fdd4dc47c31095c2dd12e2f'
        }
      }
    );

    const json = await response.json();
    return json.hits;
  } catch (error) {
    console.error('Ocorreu um erro na requisição:', error);
    throw error;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const teacherId = localStorage.getItem('teacherID');
  
  if (!teacherId) {
    console.error('ID do professor não encontrado no localStorage.');
    return;
  }
  
  const defaultUrl = `http://127.0.0.1:3000/api/teachers/${teacherId}/activities`;

  try {
    const response = await fetch(defaultUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    const container = document.querySelector('.disciplines-container');
    const selectElement = document.querySelector('.filters-container-select');

    for (const activity of data) {
      try {
        const content = await getContents(activity.skill_id, 1);
        const discipline = content[0]?.disciplina?.[0]?.toLowerCase();

        if (!discipline) {
          console.warn(`Disciplina não encontrada para a atividade: ${activity.activity_name}`);
          continue;
        }

        let divElement = container.querySelector(`.${discipline}`);

        if (!divElement) {
          divElement = document.createElement('div');
          divElement.classList.add('discipline-container', discipline);

          const heading = document.createElement('h2');
          heading.textContent = capitalizeFirstLetter(discipline);

          const ulElement = document.createElement('ul');
          const liElement = document.createElement('li');
          const paragraphElement = document.createElement('p');
          paragraphElement.textContent = activity.activity_name;

          liElement.appendChild(paragraphElement);
          ulElement.appendChild(liElement);
          divElement.appendChild(heading);
          divElement.appendChild(ulElement);

          container.appendChild(divElement);

          const option = document.createElement('option');
          option.textContent = discipline;
          selectElement.appendChild(option);
        } else {
          const ulElement = divElement.querySelector('ul');
          const liElement = document.createElement('li');
          const paragraphElement = document.createElement('p');
          paragraphElement.textContent = activity.activity_name;

          liElement.appendChild(paragraphElement);
          ulElement.appendChild(liElement);
        }
      } catch (error) {
        console.error(`Ocorreu um erro ao processar a atividade: ${activity.activity_name}`, error);
      }
    }

    selectElement.addEventListener('change', function () {
      const selectedOption = selectElement.value.toLowerCase();

      const divElements = document.querySelectorAll('.discipline-container');

      divElements.forEach(divElement => {
        if (divElement.classList.contains(selectedOption)) {
          divElement.style.display = 'block';
        } else {
          divElement.style.display = 'none';
        }
      });
    });
  } catch (error) {
    console.error(`Ocorreu um erro na requisição: ${error}`);
    alert(`Ocorreu um erro na requisição: ${error}`);
  }
});
