const dropAreas = document.querySelectorAll('.drop-area');

// Fonction appelée lorsque la carte film commence
function dragStart(event) {
    event.preventDefault();
}

// Fonction appelée lorsque la carte film survole une zone de dépôt
function dragOver(event) {
    event.preventDefault();
}

// Fonction appelée lorsque la carte film quitte une zone de dépôt
function dragLeave(event) {
    event.preventDefault();
}

// Fonction appelée lorsque la carte de film est lâchée dans une zone de dépôt
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if(data){
        console.log(data);
        const filmData = JSON.parse(data);
        const filmUID = filmData.uid; 
        console.log(filmUID);
        const film = document.querySelector(`.carte-film[uid="${filmUID}"]`);
        const dropArea = event.target.closest('.drop-area');
        if (film && dropArea) {
            dropArea.appendChild(film);
        }
    }else{
        const tryData = event.dataTransfer.getData('text/plain');
        console.log(tryData);
        console.log('no datat');
    }
}

dropAreas.forEach(function(dropArea){
    dropArea.addEventListener('drop', drop);
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('dragenter', dragStart);
    dropArea.addEventListener('dragleave', dragLeave);
});