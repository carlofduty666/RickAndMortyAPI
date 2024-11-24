const previous = document.getElementById('previous');
const next = document.getElementById('next');
const container = document.getElementById('container');
const pageNumberElement = document.getElementById('page-number');

let currentPage = 1; // Variable para llevar el control de la página actual

function displayInfo(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos elementos
            
            // Actualiza el número de página
            pageNumberElement.innerHTML = `${currentPage}/${data.info.pages}`;

            // Agrega los personajes al contenedor
            data.results.forEach(episode => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="content">
                        <div class="front">
                            <h2>${episode.name}</h2>
                        </div>
                        <div class="back">
                            <h2>${episode.air_date}</h2>
                        </div>
                    </div>
                `;
                container.appendChild(card); // Agrega la tarjeta al contenedor
            });

            // Manejo del botón "Next"
            if (data.info.next) {
                next.style.display = 'block'; // Muestra el botón si hay más páginas
                next.onclick = () => {
                    currentPage++; // Incrementa la página actual
                    displayInfo(data.info.next); // Llama a displayInfo con la nueva URL
                };
            } else {
                next.style.display = 'none'; // Oculta el botón si no hay más páginas
            }

            // Manejo del botón "Previous"
            if (data.info.prev) {
                previous.style.display = 'block'; // Muestra el botón si hay una página anterior
                previous.onclick = () => {
                    currentPage--; // Decrementa la página actual
                    displayInfo(data.info.prev); // Llama a displayInfo con la URL anterior
                };
            } else {
                previous.style.display = 'none'; // Oculta el botón si no hay página anterior
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Llama a displayInfo con la URL inicial al cargar la página
window.onload = () => displayInfo(`https://rickandmortyapi.com/api/episode?page=${currentPage}`);