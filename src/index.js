import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';

const refs = {
  breedSelect: document.querySelector('.breed-select'),
  catsInfoDiv: document.querySelector('.cat-info'),
};

refs.breedSelect.addEventListener('change', handleSelectedCatInfoChange);

fetchBreeds()
  .then(breeds => {
    refs.breedSelect.insertAdjacentHTML(
      'beforeend',
      createOptionsCatMarkup(breeds.data)
    );
  })
  .catch(error => console.log(error));

function handleSelectedCatInfoChange(event) {
  const selectedIndex = event.currentTarget.selectedIndex;
  const selectedId = event.currentTarget[selectedIndex].value;
  console.dir(event.currentTarget[selectedIndex].value);

  fetchCatByBreed(selectedId)
    .then(
      cat => (refs.catsInfoDiv.innerHTML = createCatInfoMarkup(cat.data[0]))
    )
    .catch(error => console.log(error));
}

function createOptionsCatMarkup(breeds) {
  return breeds.map(breed => createOptionCatMarkup(breed)).join('');
}

function createOptionCatMarkup({ id, name }) {
  return `<option value="${id}">${name}</option>`;
}

function createCatInfoMarkup({ breeds, url }) {
  const { name, description, temperament } = breeds[0];
  return `
      <img src="${url}" alt="${name}" width=600>
      <h2>${name}</h2>
      <p>${description}</p>
      <p>${temperament}</p>
  `;
}
