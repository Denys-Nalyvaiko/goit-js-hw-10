export function createOptionsCatMarkup(breeds) {
  return (
    placeholderText + breeds.map(breed => createOptionCatMarkup(breed)).join('')
  );
}

function createOptionCatMarkup({ id, name }) {
  return `<option value="${id}">${name}</option>`;
}

function placeholderText() {
  return `<option data-placeholder="true"></option>`;
}
