const rechercheInput = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const apiKey = window.apiKeyConfig;
const filmsAjoutesDiv = document.querySelector('.films-ajoutes');

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
    films.forEach((film, index) => {
        const elementFilm = creerCarteFilm(film, index);
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

suggestions.addEventListener('click', (event) => {
    const carteFilm = event.target.closest('.carte-film');
    if (carteFilm) {
        const filmAjoute = carteFilm.cloneNode(true);
        filmsAjoutesDiv.appendChild(filmAjoute);
        carteFilm.remove();
    }
});

function allowDrop(event) {
    event.preventDefault();
}

function creerCarteFilm(film, index) {
    const carteFilm = document.createElement('div');
    carteFilm.classList.add('carte-film');

    const image = document.createElement('img');
    image.src = film.image;
    image.alt = film.titre;

    const titre = document.createElement('p');
    titre.textContent = film.titre;

    carteFilm.appendChild(image);
    carteFilm.appendChild(titre);

    carteFilm.draggable = true;

    carteFilm.addEventListener('dragstart', (event) => {
        const filmData = {
            titre: film.titre,
            image: film.image
        };
        event.dataTransfer.setData('text/plain', JSON.stringify(filmData));
    });

    return carteFilm;
}

function drop(event, tier) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const film = JSON.parse(data);
    const dropArea = document.getElementById(`drop${tier}`);
    const films = dropArea.getElementsByClassName('carte-film');
    let isDuplicate = false;

    // Verifie si le film existe déjà dans la zone de dépôt
    Array.from(films).forEach((existingFilm) => {
        if (existingFilm.getElementsByTagName('p')[0].textContent === film.titre) {
            isDuplicate = true;
        }
    });

    if (isDuplicate) {
        console.error('Duplicate film found in drop area:', tier);
        return; // Annule l'opération si un doublon est trouvé
    }

    // ajoute le nouveau film s'il n'y a pas de doublon
    const newCarteFilm = creerCarteFilm(film, 0);
    dropArea.appendChild(newCarteFilm);
}
