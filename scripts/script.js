const rechercheInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const apiKey = window.apiKeyConfig;

async function rechercherFilmsSuggérésTMDB(titre) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${titre}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results.slice(0, 3).map((film) => ({
            titre: film.title,
            image: `https://image.tmdb.org/t/p/w500${film.poster_path}`
        }));
    } catch (error) {
        console.error('Erreur lors de la recherche de films:', error);
        return [];
    }
}

function afficherFilmsSuggérés(films) {
    suggestions.innerHTML = '';
    films.forEach(film => {
        const elementFilm = creerCarteFilm(film);
        suggestions.appendChild(elementFilm);
    });
}

rechercheInput.addEventListener('input', async () => {
    const texteRecherche = rechercheInput.value.toLowerCase();
    if (texteRecherche.trim() !== '') {
        const filmsSuggérés = await rechercherFilmsSuggérésTMDB(texteRecherche);
        afficherFilmsSuggérés(filmsSuggérés);
    } else {
        suggestions.innerHTML = '';
    }
});

function creerCarteFilm(film) {
    const carteFilm = document.createElement('div');
    carteFilm.classList.add('carte-film');
    
    const imageFilm = document.createElement('img');
    imageFilm.src = film.image;
    imageFilm.alt = film.titre;
    
    const titreFilm = document.createElement('p');
    titreFilm.textContent = film.titre;
    
    carteFilm.appendChild(imageFilm);
    carteFilm.appendChild(titreFilm);
    
    carteFilm.addEventListener('click', () => {
        console.log(`Vous avez cliqué sur le film : ${film.titre}`);
    });
    
    return carteFilm;
}
