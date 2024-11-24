const previous = document.getElementById('previous');

const next = document.getElementById('next');

const container = document.getElementById('container');

const urlC = `https://rickandmortyapi.com/api/character`

const urlE = `https://rickandmortyapi.com/api/episode`

function displayInfoC() {
    fetch(urlC)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = ""; // Limpia el contenedor antes de agregar nuevos elementos
            data.results.forEach(character => {
                console.log(data)
                const page = document.getElementById('page-number');
                const card = document.createElement('div');
                page.innerHTML = `/${data.info.pages}`;
                card.className = 'card';
                card.innerHTML = `
                    <div class="content">
                        <div class="front">
                            <img src="${character.image}"/>
                        </div>
                        <div class="back">
                            <h2>${character.name}</h2>
                        </div>
                    </div>
                `;
                container.appendChild(card); // Agrega la tarjeta al contenedor
            });
            if (data.info.next) {
                next.onclick = () => displayInfoC();
                
            }
            
            
        })
        .catch(error => console.error('Error fetching data:', error));
}

/*function displayInfo() {
    fetch(urlE)
    .then (response => response.json())
    .then(data => {
        container.innerHTML = "";
        data.results.forEach(episode => {
            page.innerHTML
        })
    })
}*/


window.onload = () => displayInfoC(`https://rickandmortyapi.com/api/character?page=1`);