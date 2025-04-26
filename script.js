let countries = [];

countryFlagsCard.addEventListener('click', () => {
  flagsContainer.classList.remove('hidden');
  fetchCountries(); // Fetch country data from the API
});

function fetchCountries() {
  // Fetch data from Restcountries API
  fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
      countries = data.map(country => ({
        name: country.name.common,
        flag: country.flags.png || country.flags[0],  // Correct flag URL access
        continent: country.region || 'N/A', // Region/continent information
        bird: 'Not Available', // Placeholder for national bird
        animal: 'Not Available' // Placeholder for national animal
      }));
      loadCountryCards();
    })
    .catch(error => {
      console.error('Error fetching country data:', error);
    });
}

function loadCountryCards() {
  flagsContainer.innerHTML = '';

  countries.forEach((country) => {
    const card = document.createElement('div');
    card.className = 'flag-card';
    card.innerHTML = `
      <img src="${country.flag}" alt="${country.name}">
      <h3>${country.name}</h3>
    `;
    card.addEventListener('click', () => showCountryDetails(country));
    flagsContainer.appendChild(card);
  });

  ScrollReveal().reveal('.flag-card', { interval: 100, scale: 0.9, duration: 1000 });
}

function showCountryDetails(country) {
  detailModal.classList.remove('hidden');  // Show the detail modal
  countryDetails.innerHTML = `
    <h2>${country.name}</h2>
    <p><strong>Continent:</strong> ${country.continent}</p>
    <p><strong>National Bird:</strong> ${country.bird}</p>
    <p><strong>National Animal:</strong> ${country.animal}</p>
  `;
}

// Close the modal when clicking the close button
const closeDetailModal = document.getElementById('closeDetailModal');
closeDetailModal.addEventListener('click', () => {
  detailModal.classList.add('hidden');  // Hide the modal when close button is clicked
});
