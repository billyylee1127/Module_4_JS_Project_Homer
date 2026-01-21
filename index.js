const searchInput = document.querySelector(`input`)
const searchIcon = document.querySelector(`.fa-magnifying-glass`)
const searchResultsEl = document.querySelector(`.search-results`)
const searchQuery = onSearchChange(event)


function onSearchChange(event) {
    console.log(event.target.value)
}

async function fetchMovies(searchQuery) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=95660dd5&s=${searchQuery}`)
    const data = await res.json()
    
    searchResultsEl.innerHTML = data.Search.map((movie) => searchHTML(movie)).join("")        
}

fetchMovies(searchQuery)





function searchHTML(movie) {
    return `<div class="movie-card">
            <div class="movie-card__container">
                <img src="${movie.Poster}">
                <h3>${movie.Title}</h3>
                <p><b>Type:</b>${movie.Type}</p>
                <p><b>Year:</b>${movie.Year}</p>
            </div>
        </div>` 
}