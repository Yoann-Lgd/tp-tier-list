function generateUID() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function creerCarteFilm(film) {
    const carteFilm = document.createElement('div');
    carteFilm.classList.add('carte-film');

    const uid = generateUID();
    carteFilm.setAttribute('uid', uid);

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
            image: film.image,
            uid: carteFilm.getAttribute('uid')
        };
        event.dataTransfer.setData('text/plain', JSON.stringify(filmData));
    });

    return carteFilm;
}
