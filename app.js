const img = document.getElementById('contenido');

const url = `https://rickandmortyapi.com/api`

function mostrarInformacion(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            contenido.innerHTML = "";
            data.results.forEach(personaje => {
                img.innerHTML += `
                    <div class="card">
                        <img src="${personaje.image}">
                        ${personaje.name}
                    </div>
                `;
            });
            next.onclick = () => mostrarInformacion(data.info.next);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

mostrarInformacion('https://rickandmortyapi.com/api/character');
