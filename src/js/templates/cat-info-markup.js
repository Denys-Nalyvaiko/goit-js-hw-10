export function createCatInfoMarkup({ breeds, url }) {
  const { name, description, temperament } = breeds[0];
  return `
      <img src="${url}" alt="${name}" height=400 class="cat-img">
      <h2 class="cat-name">${name}</h2>
      <p class="cat-description"><span>Description:</span> ${description}</p>
      <p class="cat-temperament"><span>Temperament:</span> ${temperament}</p>
  `;
}
