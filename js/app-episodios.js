const previous = document.getElementById('previous');
const next = document.getElementById('next');
const container = document.getElementById('container');
const pageNumberElement = document.getElementById('page-number');

let currentPage = 1;

function displayInfo(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            container.innerHTML = "";
            
            pageNumberElement.innerHTML = `${currentPage}/${data.info.pages}`;

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
                container.appendChild(card);
            });

            if (data.info.next) {
                next.style.display = 'block';
                next.onclick = () => {
                    currentPage++;
                    displayInfo(data.info.next);
                };
            } else {
                next.style.display = 'none';
            }

            if (data.info.prev) {
                previous.style.display = 'block';
                previous.onclick = () => {
                    currentPage--;
                    displayInfo(data.info.prev);
                };
            } else {
                previous.style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

window.onload = () => displayInfo(`https://rickandmortyapi.com/api/episode?page=${currentPage}`);