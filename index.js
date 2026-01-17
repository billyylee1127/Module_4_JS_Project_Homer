const searchInput = document.querySelector(`input`)
const searchIcon = document.querySelector(`.fa-magnifying-glass`)


async function fetchMovies(searchQuery) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=95660dd5&s=${searchQuery}`)
    const data = await res.json()
    const searchResultsEl = document.querySelector(`.search-results`)
    console.log(data) 

    searchResultsEl.innerHTML = data.Search.map((movie) => searchHTML(movie)).join("")        
}

fetchMovies(searchQuery)

searchInput.addEventListener(`keypress`, (event) => {
})



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