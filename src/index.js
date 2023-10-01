import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';
import { createCatInfoMarkup } from './js/templates/cat-info-markup';
import { createOptionsCatMarkup } from './js/templates/cat-options-markup';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  breedSelect: document.querySelector('.js-breed-select'),
  catsInfoDiv: document.querySelector('.js-cat-info'),
  infoLoader: document.querySelector('.js-loader'),
};
const IS_HIDDEN = 'is-hidden';

Notify.init({
  position: 'center-top',
  distance: '45px',
  timeout: 2000,
  cssAnimationStyle: 'zoom',
  fontFamily: 'Arial, sans-serif',
});

refs.breedSelect.classList.add(IS_HIDDEN);
refs.catsInfoDiv.classList.add(IS_HIDDEN);

refs.breedSelect.addEventListener('change', handleSelectedCatInfoChange);

processFetchedBreeds();

function handleSelectedCatInfoChange(event) {
  const selectedCatIndex = event.currentTarget.selectedIndex;
  const selectedId = event.currentTarget[selectedCatIndex].value;

  refs.infoLoader.classList.remove(IS_HIDDEN);
  refs.catsInfoDiv.classList.add(IS_HIDDEN);
  refs.catsInfoDiv.innerHTML = '';

  processFetchedCatByBreed(selectedId);
}

function processFetchedBreeds() {
  fetchBreeds()
    .then(breeds => {
      refs.breedSelect.insertAdjacentHTML(
        'beforeend',
        createOptionsCatMarkup(breeds.data)
      );

      new SlimSelect({
        select: '#single',
        settings: {
          placeholderText: 'Choose your favorite cat',
        },
      });

      refs.infoLoader.classList.add(IS_HIDDEN);
      refs.breedSelect.classList.remove(IS_HIDDEN);
    })
    .catch(() => {
      refs.infoLoader.classList.add(IS_HIDDEN);
      Notify.warning('Oops! Something went wrong! Try reloading the page!');
    });
}

function processFetchedCatByBreed(selectedId) {
  fetchCatByBreed(selectedId)
    .then(cat => {
      refs.infoLoader.classList.add(IS_HIDDEN);
      refs.catsInfoDiv.classList.remove(IS_HIDDEN);
      refs.catsInfoDiv.innerHTML = createCatInfoMarkup(cat.data[0]);
    })
    .catch(() => {
      refs.catsInfoDiv.classList.add(IS_HIDDEN);
      Notify.warning('Oops! Something went wrong! Try reloading the page!');
    });
}
