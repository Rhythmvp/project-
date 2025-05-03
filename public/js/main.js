document.addEventListener('DOMContentLoaded', () => {
    fetchSoftwares();
});

function fetchSoftwares() {
    fetch('http://localhost:5000/api/softwares')  // use your backend port if different
        .then(response => response.json())
        .then(data => {
            displaySoftwares(data);
        })
        .catch(error => {
            console.error('Error fetching software listings:', error);
        });
}

function displaySoftwares(softwares) {
    const softwareGrid = document.getElementById('software-grid');
    softwareGrid.innerHTML = '';

    softwares.forEach(software => {
        const card = document.createElement('div');
        card.className = 'software-card';

        card.innerHTML = `
            <div class="card-header">
                <img src="${software.logo || 'https://via.placeholder.com/300'}" alt="${software.name} Logo">
                <h3>${software.name}</h3>
                <p class="category">${software.category}</p>
            </div>
            <div class="card-body">
                <p>${software.description}</p>
                <a href="${software.website}" target="_blank">Visit Site</a>
            </div>
        `;

        softwareGrid.appendChild(card);
    });
}
