let contacts = [];

function renderContacts() {
    const contactsList = document.getElementById('contacts_list');
    contactsList.innerHTML = '';

    const favoriteContacts = contacts.filter(contact => contact.favorite);
    const otherContacts = contacts.filter(contact => !contact.favorite).sort((a, b) => a.name.localeCompare(b.name));

    const allContacts = [...favoriteContacts, ...otherContacts];

    allContacts.forEach(contact => {
        const card = document.createElement('div');
        card.classList.add('contact_card');
        if (contact.favorite) card.classList.add('favorite');

        card.innerHTML = `
            <div>
                <strong>${contact.name}</strong><br>
                ${contact.phone}
            </div>
            <div>
                <button onclick="toggleFavorite('${contact.name}')">${contact.favorite ? '❤️' : '🤍'}</button>
                <button onclick="deleteContact('${contact.name}')">🗑</button>
            </div>
        `;

        contactsList.appendChild(card);
    });
}

function searchContacts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm));
    const contactsList = document.getElementById('contacts_list');
    contactsList.innerHTML = '';

    filteredContacts.forEach(contact => {
        const card = document.createElement('div');
        card.classList.add('contact_card');

        if (contact.favorite) card.classList.add('favorite');

        card.innerHTML = `
            <div>
                <strong>${contact.name}</strong><br>
                ${contact.phone}
            </div>
            <div>
                <button onclick="toggleFavorite('${contact.name}')">${contact.favorite ? '❤️' : '🤍'}</button>
                <button onclick="deleteContact('${contact.name}')">🗑</button>
            </div>
        `;
        
        contactsList.appendChild(card);
    });
}

document.getElementById('add').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'block';
});

document.getElementById('save_button').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const isFavorite = document.getElementById('favorite').checked;

    contacts.push({ name, phone, favorite: isFavorite });
    renderContacts();

    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('favorite').checked = false;
    closeModal();
});

function deleteContact(name) {
    contacts = contacts.filter(contact => contact.name !== name);
    renderContacts();
}

function toggleFavorite(name) {
    const contact = contacts.find(contact => contact.name === name);
    if (contact) {
        contact.favorite = !contact.favorite;
        renderContacts();
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

renderContacts();
