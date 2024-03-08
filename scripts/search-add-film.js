const rechercheInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const filmsAjoutesDiv = document.getElementById('filmsAjoutes');
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
    films.forEach((film) => {
        const carteFilm = creerCarteFilm(film);
        suggestions.appendChild(carteFilm);
    });
}


rechercheInput.addEventListener('input', async () => {
    const texteRecherche = rechercheInput.value.toLowerCase();
    if (texteRecherche.trim() !== '' && texteRecherche.length > 1) {
        const filmsSuggérés = await rechercherFilmsSuggérésTMDB(texteRecherche);
        afficherFilmsSuggérés(filmsSuggérés);
    } else {
        suggestions.innerHTML = '';
    }
});

suggestions.addEventListener('click', (event) => {
    const carteFilm = event.target.closest('.carte-film');
    if (carteFilm) {
        const filmAjoute = carteFilm.cloneNode(true);
        filmsAjoutesDiv.appendChild(filmAjoute);
        carteFilm.remove();

        filmAjoute.addEventListener('dragstart', (event) => {
            const filmData = {
                titre: filmAjoute.titre,
                image: filmAjoute.image,
                uid: filmAjoute.getAttribute('uid')
            };
            event.dataTransfer.setData('text/plain', JSON.stringify(filmData));
        });
    }
});

