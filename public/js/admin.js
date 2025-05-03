// Assuming you're using Express + MongoDB with Mongoose
// This JS file would handle admin panel CRUD actions via API calls to your backend

// Connect this to admin.html via <script src="js/admin.js"></script>

// Example API base URL
const API_BASE = 'http://localhost:5000/api';

// ------------------ Software Listings CRUD ------------------

document.getElementById('addBtn').addEventListener('click', async () => {
    const name = document.getElementById('softwareName').value;
    const response = await fetch('http://localhost:5000/api/software/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });
    const result = await response.json();
    console.log(result);
  });
  
document.getElementById('addSoftwareForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
      name: document.getElementById('softwareName').value,
      company: document.getElementById('softwareCompany').value,
      category: document.getElementById('softwareCategory').value,
      features: document.getElementById('softwareFeatures').value.split(','), // assuming comma separated
      pricing: document.getElementById('softwarePricing').value,
      screenshots: document.getElementById('softwareScreenshots').value.split(','),
    };
  
    const res = await fetch('/api/software', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    console.log(result);
  });
  
// Fetch all software listings
function fetchSoftwareListings() {
    fetch(`${API_BASE}/softwares`)
        .then(res => res.json())
        .then(data => populateSoftwareTable(data))
        .catch(err => console.error(err));
}

function populateSoftwareTable(softwares) {
    const tbody = document.getElementById('software-table-body');
    tbody.innerHTML = '';
    softwares.forEach(sw => {
        const row = `<tr>
            <td>${sw._id}</td>
            <td>${sw.name}</td>
            <td>${sw.category}</td>
            <td>${sw.features.join(', ')}</td>
            <td>
                <button onclick="editSoftware('${sw._id}')">Edit</button>
                <button onclick="deleteSoftware('${sw._id}')">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Add or Update Software
function saveSoftware(e) {
    e.preventDefault();
    const id = document.getElementById('software-id').value;
    const softwareData = {
        name: document.getElementById('software-name').value,
        category: document.getElementById('software-category').value,
        description: document.getElementById('software-description').value,
        features: Array.from(document.querySelectorAll('.feature-input')).map(f => f.value),
        pricing: Array.from(document.querySelectorAll('.pricing-row')).map(p => ({
            plan: p.querySelector('.pricing-plan').value,
            price: p.querySelector('.pricing-price').value
        })),
        logo: document.getElementById('software-logo').value
    };

    const url = id ? `${API_BASE}/softwares/${id}` : `${API_BASE}/softwares`;
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(softwareData)
    })
        .then(res => res.json())
        .then(() => {
            fetchSoftwareListings();
            document.getElementById('software-form').style.display = 'none';
        });
}

// Edit Software
function editSoftware(id) {
    fetch(`${API_BASE}/softwares/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('software-id').value = data._id;
            document.getElementById('software-name').value = data.name;
            document.getElementById('software-category').value = data.category;
            document.getElementById('software-description').value = data.description;
            // Populate features and pricing too
            document.getElementById('software-form').style.display = 'block';
        });
}

// Delete Software
function deleteSoftware(id) {
    fetch(`${API_BASE}/softwares/${id}`, { method: 'DELETE' })
        .then(() => fetchSoftwareListings());
}


// ------------------ Categories CRUD ------------------

function fetchCategories() {
    fetch(`${API_BASE}/categories`)
        .then(res => res.json())
        .then(data => populateCategoriesTable(data));
}

function populateCategoriesTable(categories) {
    const tbody = document.getElementById('categories-table-body');
    tbody.innerHTML = '';
    categories.forEach(cat => {
        const row = `<tr>
            <td>${cat._id}</td>
            <td>${cat.name}</td>
            <td>${cat.softwareCount || 0}</td>
            <td>
                <button onclick="editCategory('${cat._id}')">Edit</button>
                <button onclick="deleteCategory('${cat._id}')">Delete</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function saveCategory(e) {
    e.preventDefault();
    const id = document.getElementById('category-id').value;
    const categoryData = {
        name: document.getElementById('category-name').value,
        description: document.getElementById('category-description').value
    };
    const url = id ? `${API_BASE}/categories/${id}` : `${API_BASE}/categories`;
    const method = id ? 'PUT' : 'POST';

    fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData)
    })
        .then(() => {
            fetchCategories();
            document.getElementById('category-form').style.display = 'none';
        });
}

function editCategory(id) {
    fetch(`${API_BASE}/categories/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('category-id').value = data._id;
            document.getElementById('category-name').value = data.name;
            document.getElementById('category-description').value = data.description;
            document.getElementById('category-form').style.display = 'block';
        });
}

function deleteCategory(id) {
    fetch(`${API_BASE}/categories/${id}`, { method: 'DELETE' })
        .then(() => fetchCategories());
}


// ------------------ Settings Update ------------------

function saveSettings(e) {
    e.preventDefault();
    const settingsData = {
        title: document.getElementById('site-title').value,
        description: document.getElementById('site-description').value,
        contactEmail: document.getElementById('contact-email').value,
        itemsPerPage: parseInt(document.getElementById('items-per-page').value)
    };

    fetch(`${API_BASE}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
    }).then(() => alert('Settings updated.'));
}


// ------------------ Event Listeners ------------------

document.getElementById('software-form-element').addEventListener('submit', saveSoftware);
document.getElementById('category-form-element').addEventListener('submit', saveCategory);
document.getElementById('settings-form').addEventListener('submit', saveSettings);

// On page load
fetchSoftwareListings();
fetchCategories();
