const apiKey = '20b73068'; // Replace with your OMDb API key

// Function to fetch movie data
async function fetchMovieData(searchTerm) {

  const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`);
  const data = await response.json();

  return data.Search;
}

// Function to clear movie listings

function clearMovieListings() {
  const movieListings = document.querySelector('.movie-listings');
  movieListings.innerHTML = '';
}

// Function to clear movie details

function clearMovieDetails() {
  const movieDetails = document.querySelector('.movie-details');
  movieDetails.innerHTML = '';
}

// Function to handle search form submission
function handleSearch(event) {
  event.preventDefault();
  
  const searchInput = document.querySelector('#search-input');
  const searchTerm = searchInput.value.trim();

  // Clear previous movie listings
  clearMovieListings();
  clearMovieDetails();

  

// Call the function to fetch movie data
fetchMovieData(searchTerm)
  .then(movies => {
    // Display the movie listings
    const movieListings = document.querySelector('.movie-listings');

    movies.forEach(movie => {
      const movieElement = createMovieElement(movie);
      movieListings.appendChild(movieElement);
    });
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });
}

  // Event listener for the search form submission
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSearch);

  // Function to fetch movie details by IMDb ID
  async function fetchMovieDetails(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
    const data = await response.json();
  
    return data;
  }

  function createMovieElement(movie) {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title} Poster">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
      <button data-imdbid="${movie.imdbID}">View Details</button>
    `;
  
    return movieElement;
  }
  
  // Function to display movie details
  function displayMovieDetails(movie) {
    const movieDetails = document.querySelector('.movie-details');
    movieDetails.innerHTML = `
      <h2>${movie.Title}</h2>
      <img src="${movie.Poster}" alt="${movie.Title} Poster">
      <p><strong>Year:</strong> ${movie.Year}</p>
      <p><strong>Genre:</strong> ${movie.Genre}</p>
      <p><strong>Director:</strong> ${movie.Director}</p>
      <p><strong>Actors:</strong> ${movie.Actors}</p>
      <p><strong>Plot:</strong> ${movie.Plot}</p>
    `;
  }
  
  // Event listener for the "View Details" button clicks
  document.addEventListener('click', async event => {
    if (event.target.matches('button[data-imdbid]')) {
      const imdbID = event.target.dataset.imdbid;
      const movieDetails = await fetchMovieDetails(imdbID);
      displayMovieDetails(movieDetails);
    }
  });
  
