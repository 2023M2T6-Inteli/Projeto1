const capitalizeFirstLetter = (str) => {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getContents = async (subject, hits) => {
  try {
    const response = await fetch(
      `https://6I7NDWQ9YU-dsn.algolia.net/1/indexes/conteudo-pane-teste?query=${subject}&hitsPerPage=${hits}`,
      {
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
};

const fetchClasses = async (teacherId) => {
  const url = `http://127.0.0.1:1234/api/teachers/${teacherId}/classes`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const data = await response.json();
    const selectClass = document.querySelector('.set-class-select');
    const selectSchool = document.querySelector('.set-school-select');

    data.forEach((classItem) => {
      const optionClass = document.createElement('option');
      optionClass.value = classItem.class_id;
      optionClass.textContent = classItem.class_name;
      selectClass.appendChild(optionClass);

      const optionSchool = document.createElement('option');
      optionSchool.value = classItem.school_id;
      optionSchool.textContent = classItem.school_id;
      selectSchool.appendChild(optionSchool);
    });
  } catch (error) {
    console.error(error);
  }
};

const fetchActivity = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('activity_id');

  const url = `http://127.0.0.1:1234/api/activities/${id}`;

  const nameSpan = document.querySelector('.name-span');
  const descriptionSpan = document.querySelector('.description-span');
  const disciplineSpan = document.querySelector('.discipline-span');

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const data = await response.json();

    nameSpan.textContent = data.name;
    descriptionSpan.textContent = data.description;

    const content = await getContents(data.skillId, 1);
    const discipline = content[0]?.disciplina?.[0]?.toLowerCase();

    disciplineSpan.textContent = capitalizeFirstLetter(discipline);
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const teacherID = localStorage.getItem('teacherID');
  await fetchClasses(teacherID);
  await fetchActivity();
});

const form = document.querySelector('.form-container');
const averageInput = document.getElementById('average');
const classSelect = document.querySelector('.set-class-select');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const gradeValue = averageInput.value;
  const classId = classSelect.value;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('activity_id');

  const url = 'http://127.0.0.1:1234/api/grades';
  const body = {
    grade_value: gradeValue,
    class_id: classId,
    activity_id: id
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    console.log('Avaliação enviada com sucesso!');
  } catch (error) {
    console.error(error);
  }
});
