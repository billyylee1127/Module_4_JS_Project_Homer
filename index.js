const searchInput = document.querySelector(`.search-input`)
const searchIcon = document.querySelector(`.fa-magnifying-glass`)
const searchResultsEl = document.querySelector(`.search-results__container`)
const yearSortSelect = document.querySelector(`#year-sort`)



searchInput.addEventListener(`input`, onSearchChange)

yearSortSelect.addEventListener(`change`, () => {
    const searchQuery = document.querySelector(`.search-input`).value
    if (searchQuery) {
        fetchMovies(searchQuery)
    }
})



function onSearchChange(event) {
    const searchQuery = event.target.value.trim()
    if (searchQuery === ``) {
        searchResultsEl.innerHTML = ``
        return
    }
    fetchMovies(searchQuery)
}

function sortMovies(movies, sortOrder) {
    const getYear = movie =>Number(movie.Year.slice(0, 4))

  if (sortOrder === 'newest') {
    return [...movies].sort(
        (a, b) => Number(b.Year.slice(0, 4)) - Number(a.Year.slice(0, 4))
    )
  }

  if (sortOrder === 'oldest') {
    return [...movies].sort(
        (a, b) => Number(a.Year.slice(0, 4)) - Number(b.Year.slice(0, 4))
    )
  }
  return movies
}


async function fetchMovies(searchQuery) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=95660dd5&s=${searchQuery}`)
    const data = await res.json()
            
    if (!data.Search) {
    searchResultsEl.innerHTML = "<p>No results found</p>";
    return;
}
console.table(data.Search.map(m => m.Year))

const sortOrder = yearSortSelect.value    

console.log('Before sort:', data.Search.map(m => m.Year))

const sortedMovies = sortMovies(data.Search, yearSortSelect.value)

console.log('After sort:', sortedMovies.map(m => m.Year))


renderMovies(sortedMovies)
}



function renderMovies(movies) {
    searchResultsEl.innerHTML = ``

    movies.forEach(movie => {
    searchResultsEl.innerHTML += `
      <div class="movie-card__wrapper">
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : ''}" />
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </div>`
    })
}



// function searchHTML(movie) {
//     return `<div class="row__movie-card">
//             <div class="movie-card__wrapper">
//                 <img src="${movie.Poster}">
//                 <h3> ${movie.Title}</h3>
//                 <p><b>Type:</b> ${movie.Type}</p>
//                 <p><b>Year:</b> ${movie.Year}</p>
//             </div>
//         </div>` 
// }