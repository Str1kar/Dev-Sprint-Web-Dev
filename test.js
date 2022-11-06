const API_KEY = 'api_key=db75be3f6da59e6c54d0b9f568d19d16';
const BASE_URL = 'https://api.themoviedb.org/3/';
const POP_URL = BASE_URL+'movie/popular?'+API_KEY;
const UPC_URL = BASE_URL+'movie/upcoming?'+API_KEY;
const TR_URL = BASE_URL+'movie/top_rated?'+API_KEY;
const IMG_URL = 'https://image.tmdb.org';
const SEARCH_URL = BASE_URL+'/search/movie?'+API_KEY+'&query=';

const main = document.getElementById('main');
const main2 = document.getElementById('main2');
const form = document.getElementById('form');
const search = document.getElementById('search');
const top_rated = document.getElementById('top-rated');
const popular = document.getElementById('popular');
const upcoming = document.getElementById('upcoming');
const web_title = document.getElementById('title'); 

if (web_title.innerHTML == "Movie Details - MoviesWatch")
{
  const URL = window.localStorage.getItem('URL');
  getDetails(URL);
}
else if (web_title.innerHTML == "Popular - MoviesWatch"){
  getMovies(POP_URL);
}
else if (web_title.innerHTML == "Top_Rated - MoviesWatch"){
  getMovies(TR_URL);
}
else if (web_title.innerHTML == "Upcoming - MoviesWatch"){
  getMovies(UPC_URL);
}
else{
  getMovies(POP_URL);
}


function getMovies(url){
  fetch(url).then(res => res.json()).then(data => {
    console.log(data.results);
    showMovies(data.results);
  })
}

function showMovies(data){
  main.innerHTML = '';
  const page_title = document.createElement('div');
  page_title.classList.add('page-title');
  page_title.innerHTML = '<h2 id="pagetitle">Popular</h2>';
  main.appendChild(page_title);
  data.forEach(movie => {
    const {title, poster_path,id} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.setAttribute('id','movies');
    movieEl.innerHTML = `
      <a href="javascript:storeURL('${BASE_URL}movie/${id}?${API_KEY}')">
        <img src="${IMG_URL}/t/p/w500${poster_path}" alt = ${title}>
        <div class="movie-info">
          <h3>${title}</h3>
      </a>
      </div>
    
    `
    main.appendChild(movieEl);
  });
}

const movie = document.getElementById('movies');

function storeURL(url){
  const URL = url;
  window.localStorage.setItem('URL', url);
  window.location.href = 'MovieDetails.html';
}

function getDetails(url){
  fetch(url).then(res => res.json()).then(data => {
    showMovieDetails(data);
  })
}


function showMovieDetails(data){
  main2.innerHTML = '';
  const {title,original_language,release_date,poster_path,overview,vote_average,vote_count,genres,budget,revenue} = data;
  const detailsEl = document.createElement('div');
  detailsEl.classList.add('details');
  detailsEl.innerHTML = `
  <div class="right_container">
        <div class="poster_container">
          <img class="poster" src="${IMG_URL}/t/p/w500${poster_path}">
        </div>
        <div class="column1">
          <div class="movie_name_container">
            <h2 class="movie_name">${title}</h2>
          </div>
          <div class="language_container">
            <p class="language">Language: ${original_language}</p>
          </div>
          <div class="genre_container">
            <p class="genre">Genres: </p>
          </div>
          <div class="release_container">
            <p class="release">Release Date: ${release_date}</p>
          </div>
          <div class="origin_container">
            <p class="origin">Origin: </p>
          </div>
        </div>
          <div class="column2">
          <div class="rating_container">
            <p class="rating">Rating: ${vote_average}</p>
            <p class="vote_count">Vote Count: ${vote_count}</p>
          </div>
          <div class="budget_container">
            <p class="budget">Budget: $${budget}</p>
          </div>
          <div class="revenue_container">
            <p class="revenue">Revenue: $${revenue}</p>
          </div>
        </div>
      </div>
      <div class="overview_container">
        <p class="description">Description: ${overview}</p>
      </div>
  
  
  `;
  main2.appendChild(detailsEl);
}



form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if(searchTerm){
    getMovies(SEARCH_URL+searchTerm);
  }
})


popular.addEventListener('click', (e) => {
  window.location.href = 'Popular.html';
})

top_rated.addEventListener('click', (e) => {
  window.location.href = 'Top-Rated.html';
})

upcoming.addEventListener('click', (e) => {
  window.location.href = 'Upcoming.html';
})