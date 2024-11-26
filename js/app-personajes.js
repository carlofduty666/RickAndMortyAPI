const previous = document.getElementById('previous');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const container = document.getElementById('container');
const urlC = `https://rickandmortyapi.com/api/character`
const urlE = `https://rickandmortyapi.com/api/episode`
const pageNumber = document.getElementById('page-number');
let currentPage = 1;

function displayInfo(urlC) {
    fetch(urlC)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = "";
            data.results.forEach(character => {
                console.log(data)

                const page = document.getElementById('page-number');
                const card = document.createElement('div');

                /*page.innerHTML = `/${data.info.pages}`;*/

                pageNumber.innerHTML = `${currentPage}/${data.info.pages}`;

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
                container.appendChild(card);
            });
            next.onclick = () => data.info.next && (currentPage++, displayInfo(data.info.next));
            prev.onclick = () => data.info.prev && (currentPage--, displayInfo(data.info.prev));

            scrollToTop();
        })
        .catch(error => console.error('Error fetching data:', error));
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


displayInfo(`https://rickandmortyapi.com/api/character`);