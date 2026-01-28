const searchInput = document.querySelector(`.search-input`)
const searchIcon = document.querySelector(`.fa-magnifying-glass`)
const searchResultsEl = document.querySelector(`.search-results__container`)


function onSearchChange(event) {
    const searchQuery = event.target.value
    fetchMovies(searchQuery)
}



function onFormSubmit(event) {
    event.preventDefault()
}

async function fetchMovies(searchQuery) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=95660dd5&s=${searchQuery}`)
    const data = await res.json()
    if (!data.Search) {
    searchResultsEl.innerHTML = "<p>No results found</p>";
    return;
}

    console.log(data.Search)

    const newestMovies = getTop6NewestMovies(data.Search);
    

searchResultsEl.innerHTML = newestMovies
    .map((movie) => searchHTML(movie))
    .join("");

function getTop6NewestMovies(movies) {
    return movies
        .sort((a, b) => Number(b.Year) - Number(a.Year))
}
}




    
    




function searchHTML(movie) {
    return `<div class="row__movie-card">
            <div class="movie-card__wrapper">
                <img src="${movie.Poster}">
                <h3> ${movie.Title}</h3>
                <p><b>Type:</b> ${movie.Type}</p>
                <p><b>Year:</b> ${movie.Year}</p>
            </div>
        </div>` 
}