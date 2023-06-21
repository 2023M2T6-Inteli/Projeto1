var capitalizeFirstLetter = (str) => {
  if (str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

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

const fetchClasses = async (teacherID) => {
  const url = `http://127.0.0.1:1234/api/teachers/${teacherID}/classes`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const fetchActivity = async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('activity_id');

  const url = `http://127.0.0.1:1234/api/activities/${id}`;

  let nameSpan = document.getElementsByClassName('name-span')[0]
  let descriptionSpan = document.getElementsByClassName('description-span')[0]
  let disciplineSpan = document.getElementsByClassName('discipline-span')[0]

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const data = await response.json();
    
    nameSpan.textContent = data.name
    descriptionSpan.textContent = data.description

    const content = await getContents(data.skillId, 1)
    const discipline = content[0]?.disciplina?.[0]?.toLowerCase();

    disciplineSpan.textContent = capitalizeFirstLetter(discipline)

  } catch (error) {
    console.error(error);
  }
};

const teacherID = localStorage.getItem("teacherId")

/* fetchClasses(teacherID); */
fetchActivity();

