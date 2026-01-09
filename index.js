async function fetchMovies() {
    const data = await fetch("https://www.omdbapi.com/?apikey=95660dd5&s=fast")
    const response = await data.json()
    console.log(
    response.map(
        (data) => `<div class="movie-card">
        <div class="movie-card__container">
            <img src=".movie-card.json">
            <h3>Movie Title</h3>
            <p><b>Type:</b>movie</p>
            <p><b>Year:</b>2025</p>
        </div>
    </div>`
        )
    );
}

fetchMovies()