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

function createCard(title, description, url, image_url) {
  const card_container = document.createElement("div");
  card_container.classList.add("second-card-container");

  const card_image = document.createElement("img");
  card_image.src = image_url;

  const card_content = document.createElement("div");

  const card_title = document.createElement("h4");
  card_title.innerHTML = title;

  const card_description = document.createElement("p");
  card_description.innerHTML = description;

  card_content.appendChild(card_title);
  card_content.appendChild(card_description);

  card_container.appendChild(card_image);
  card_container.appendChild(card_content);

  const card_link = document.createElement("a");
  card_link.href = url;

  card_link.appendChild(card_container);

  const card_list = document.getElementsByClassName("second-images-container")[0];
  card_list.appendChild(card_link);

  return card_container;
}

window.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const skill = urlParams.get('habilidade');

  getContents(skill, 3).then((contents) => {
    document.getElementById("skill_description").textContent = contents[0].habilidades[0];
    contents.forEach(element => {
      element.resumoCard = element.resumoCard.split(':')[1].substring(0, 75) + "...";
      createCard(element.titulo, element.resumoCard, element.url, element.thumbnail);
    });
  });
});
