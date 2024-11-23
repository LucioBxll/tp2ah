document.addEventListener('DOMContentLoaded', function() {
    const championsContainer = document.querySelector('#app .row');
    const paginationContainer = document.querySelector('#pagination');

    let currentPage = 1;
    const limit = 20;

    // Función para obtener el token del localStorage
    function getToken() {
        return localStorage.getItem('token');
    }

    // Función para crear los headers de la petición
    function createHeaders() {
        const token = getToken();
        return {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
        };
    }

    function createChampionCard(champion) {
        return `
        <div class="col s12 m6 l3">
            <div class="card amber accent-4">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${champion.imagen}" alt="${champion.nombre}">
                </div>
                <div class="card-content">
                    <span class="card-title activator amber accent-4 white-text">${champion.nombre.toUpperCase()}</span>
                </div>
                <div class="card-reveal amber accent-4 white-text">
                    <span class="card-title ">${champion.nombre.toUpperCase()}<i class="material-icons right">close</i></span>
                    <p>Origen: ${champion.origen}</p>
                    <p>Recurso: ${champion.recurso}</p>
                    <p>Líneas: ${champion.lineas.join(', ')}</p>
                    <p>Roles: ${champion.roles.join(', ')}</p>
                    <p>Dificultad: ${champion.dificultad_uso}</p>
                </div>
            </div>
        </div>
        `;
    }

    function loadChampions(page = 1, limit = 20) {
        fetch(`/api/champions?limit=${limit}&page=${page}`, {
            method: 'GET',
            headers: createHeaders()
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('No autorizado. Por favor, inicie sesión.');
                    }
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.champs) {
                    const championCards = data.champs.map(createChampionCard).join('');
                    championsContainer.innerHTML = championCards;
                    setupPagination(data.totalPages, page);
                } else {
                    console.error('Formato de datos inesperado:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                championsContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
            });
    }

    function setupPagination(totalPages, currentPage) {
        paginationContainer.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('pagination-button');
            button.disabled = i === currentPage;
            button.addEventListener('click', () => {
                loadChampions(i, limit);
            });
            paginationContainer.appendChild(button);
        }
    }

    function loadChampion(id) {
        fetch(`/api/champions/${id}`, {
            method: 'GET',
            headers: createHeaders()
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('No autorizado. Por favor, inicie sesión.');
                    }
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then(champion => {
                const championCard = createChampionCard(champion);
                championsContainer.innerHTML = championCard;
            })
            .catch(error => {
                console.error('Error:', error);
                championsContainer.innerHTML = `<p class="error-message">${error.message}</p>`;
            });
    }

    loadChampions();
});
